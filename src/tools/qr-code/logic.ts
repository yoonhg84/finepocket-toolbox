// Pure JavaScript QR Code Generator
// Supports versions 1-10, byte mode encoding, error correction levels L/M/Q/H

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

// ── Version capacity table (byte mode, data codewords) ──────────────────────
// Each entry: [L, M, Q, H] = max data bytes for that EC level
const VERSION_DATA_CAPACITY: number[][] = [
  /*  v1 */ [17, 14, 11, 7],
  /*  v2 */ [32, 26, 20, 14],
  /*  v3 */ [53, 42, 32, 24],
  /*  v4 */ [78, 62, 46, 34],
  /*  v5 */ [106, 84, 60, 44],
  /*  v6 */ [134, 106, 74, 58],
  /*  v7 */ [154, 122, 86, 64],
  /*  v8 */ [192, 152, 108, 84],
  /*  v9 */ [230, 180, 130, 98],
  /* v10 */ [271, 213, 151, 119],
];

// Total codewords per version
// EC codewords per block for each version and EC level [version][ecIdx]
const EC_CODEWORDS_PER_BLOCK: number[][] = [
  /*  v1 */ [7, 10, 13, 17],
  /*  v2 */ [10, 16, 22, 28],
  /*  v3 */ [15, 26, 18, 22],
  /*  v4 */ [20, 18, 26, 16],
  /*  v5 */ [26, 24, 18, 22],
  /*  v6 */ [18, 16, 24, 28],
  /*  v7 */ [20, 18, 18, 26],
  /*  v8 */ [24, 22, 22, 26],
  /*  v9 */ [30, 22, 20, 24],
  /* v10 */ [18, 26, 24, 28],
];

// Block structure: [numBlocks1, dataPerBlock1, numBlocks2, dataPerBlock2]
// For versions where blocks have different sizes
const BLOCK_STRUCTURE: number[][][] = [
  /*  v1 */ [[1,19,0,0],[1,16,0,0],[1,13,0,0],[1,9,0,0]],
  /*  v2 */ [[1,34,0,0],[1,28,0,0],[1,22,0,0],[1,16,0,0]],
  /*  v3 */ [[1,55,0,0],[1,44,0,0],[2,17,0,0],[2,13,0,0]],
  /*  v4 */ [[1,80,0,0],[2,32,0,0],[2,24,0,0],[4,9,0,0]],
  /*  v5 */ [[1,108,0,0],[2,43,0,0],[2,15,2,16],[2,11,2,12]],
  /*  v6 */ [[2,68,0,0],[4,27,0,0],[4,19,0,0],[4,15,0,0]],
  /*  v7 */ [[2,78,0,0],[4,31,0,0],[2,14,4,15],[4,13,1,14]],
  /*  v8 */ [[2,97,0,0],[2,38,2,39],[4,18,2,19],[4,14,2,15]],
  /*  v9 */ [[2,116,0,0],[3,36,2,37],[4,16,4,17],[4,12,4,13]],
  /* v10 */ [[2,68,2,69],[4,43,1,44],[6,19,2,20],[6,15,2,16]],
];

// Alignment pattern positions per version (empty for v1)
const ALIGNMENT_POSITIONS: number[][] = [
  [],       // v1
  [6, 18],  // v2
  [6, 22],  // v3
  [6, 26],  // v4
  [6, 30],  // v5
  [6, 34],  // v6
  [6, 22, 38], // v7
  [6, 24, 42], // v8
  [6, 26, 46], // v9
  [6, 28, 52], // v10
];

const EC_LEVEL_INDEX: Record<ErrorCorrectionLevel, number> = { L: 0, M: 1, Q: 2, H: 3 };
const EC_LEVEL_BITS: Record<ErrorCorrectionLevel, number> = { L: 0b01, M: 0b00, Q: 0b11, H: 0b10 };

// ── Galois Field arithmetic (GF(256), primitive polynomial 0x11D) ───────────
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = x << 1;
    if (x >= 256) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGeneratorPoly(degree: number): Uint8Array {
  let gen = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(gen.length + 1);
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gfMul(gen[j], GF_EXP[i]);
      next[j + 1] ^= gen[j];
    }
    gen = next;
  }
  return gen;
}

function rsEncode(data: Uint8Array, ecCount: number): Uint8Array {
  const gen = rsGeneratorPoly(ecCount);
  const result = new Uint8Array(ecCount);
  for (let i = 0; i < data.length; i++) {
    const coeff = data[i] ^ result[0];
    // shift result left
    for (let j = 0; j < ecCount - 1; j++) {
      result[j] = result[j + 1];
    }
    result[ecCount - 1] = 0;
    if (coeff !== 0) {
      for (let j = 0; j < ecCount; j++) {
        result[j] ^= gfMul(gen[j], coeff);
      }
    }
  }
  return result;
}

// ── Data encoding (byte mode) ───────────────────────────────────────────────
function selectVersion(dataLen: number, ecLevel: ErrorCorrectionLevel): number {
  const ecIdx = EC_LEVEL_INDEX[ecLevel];
  for (let v = 0; v < 10; v++) {
    if (dataLen <= VERSION_DATA_CAPACITY[v][ecIdx]) return v + 1;
  }
  throw new Error("Data too long for QR versions 1-10");
}

function encodeData(text: string, version: number, ecLevel: ErrorCorrectionLevel): Uint8Array {
  const ecIdx = EC_LEVEL_INDEX[ecLevel];
  const utf8 = new TextEncoder().encode(text);
  const totalDataCodewords = VERSION_DATA_CAPACITY[version - 1][ecIdx];

  // Bit stream
  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  };

  // Mode indicator: byte mode = 0100
  pushBits(0b0100, 4);

  // Character count indicator
  const cciBits = version <= 9 ? 8 : 16;
  pushBits(utf8.length, cciBits);

  // Data
  for (let i = 0; i < utf8.length; i++) {
    pushBits(utf8[i], 8);
  }

  // Terminator (up to 4 bits)
  const totalBits = totalDataCodewords * 8;
  const termLen = Math.min(4, totalBits - bits.length);
  pushBits(0, termLen);

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad codewords
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < totalBits) {
    pushBits(padBytes[padIdx], 8);
    padIdx ^= 1;
  }

  // Convert bits to bytes
  const data = new Uint8Array(totalDataCodewords);
  for (let i = 0; i < totalDataCodewords; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      byte = (byte << 1) | bits[i * 8 + b];
    }
    data[i] = byte;
  }

  return data;
}

// ── Interleave blocks and add EC ────────────────────────────────────────────
function interleave(data: Uint8Array, version: number, ecLevel: ErrorCorrectionLevel): Uint8Array {
  const ecIdx = EC_LEVEL_INDEX[ecLevel];
  const ecPerBlock = EC_CODEWORDS_PER_BLOCK[version - 1][ecIdx];
  const [nb1, dpb1, nb2, dpb2] = BLOCK_STRUCTURE[version - 1][ecIdx];

  const dataBlocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];
  let offset = 0;

  for (let i = 0; i < nb1; i++) {
    const block = data.slice(offset, offset + dpb1);
    dataBlocks.push(block);
    ecBlocks.push(rsEncode(block, ecPerBlock));
    offset += dpb1;
  }
  for (let i = 0; i < nb2; i++) {
    const block = data.slice(offset, offset + dpb2);
    dataBlocks.push(block);
    ecBlocks.push(rsEncode(block, ecPerBlock));
    offset += dpb2;
  }

  // Interleave data codewords
  const result: number[] = [];
  const maxDataLen = Math.max(dpb1, dpb2);
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of dataBlocks) {
      if (i < block.length) result.push(block[i]);
    }
  }

  // Interleave EC codewords
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of ecBlocks) {
      if (i < block.length) result.push(block[i]);
    }
  }

  return new Uint8Array(result);
}

// ── Matrix construction ─────────────────────────────────────────────────────
function createMatrix(version: number): { matrix: number[][]; reserved: boolean[][] } {
  const size = 17 + version * 4;
  const matrix: number[][] = Array.from({ length: size }, () => new Array(size).fill(0));
  const reserved: boolean[][] = Array.from({ length: size }, () => new Array(size).fill(false));

  // Place finder patterns
  const placeFinderPattern = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r;
        const cc = col + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        reserved[rr][cc] = true;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[rr][cc] = 1;
          } else {
            matrix[rr][cc] = 0;
          }
        } else {
          matrix[rr][cc] = 0; // separator
        }
      }
    }
  };

  placeFinderPattern(0, 0);
  placeFinderPattern(0, size - 7);
  placeFinderPattern(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    reserved[6][i] = true;
    matrix[6][i] = i % 2 === 0 ? 1 : 0;
    reserved[i][6] = true;
    matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Alignment patterns
  const positions = ALIGNMENT_POSITIONS[version - 1];
  if (positions.length > 0) {
    for (const row of positions) {
      for (const col of positions) {
        // Skip if overlapping with finder pattern
        if (reserved[row][col]) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            reserved[row + r][col + c] = true;
            if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
              matrix[row + r][col + c] = 1;
            } else {
              matrix[row + r][col + c] = 0;
            }
          }
        }
      }
    }
  }

  // Dark module
  reserved[size - 8][8] = true;
  matrix[size - 8][8] = 1;

  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    reserved[8][i] = true;
    reserved[8][size - 1 - i] = true;
    reserved[i][8] = true;
    reserved[size - 1 - i][8] = true;
  }
  reserved[8][8] = true;

  // Reserve version info for v >= 7
  if (version >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        reserved[i][size - 11 + j] = true;
        reserved[size - 11 + j][i] = true;
      }
    }
  }

  return { matrix, reserved };
}

function placeData(matrix: number[][], reserved: boolean[][], codewords: Uint8Array): void {
  const size = matrix.length;
  let bitIdx = 0;
  const totalBits = codewords.length * 8;

  // Traverse right-to-left in 2-column strips, bottom-to-top then top-to-bottom alternating
  let col = size - 1;
  while (col >= 0) {
    if (col === 6) col--; // skip timing pattern column

    for (let direction = 0; direction < 2; direction++) {
      const actualCol = col - direction;
      if (actualCol < 0) continue;

      const rowRange = (col + 1) % 4 < 2
        ? Array.from({ length: size }, (_, i) => size - 1 - i)
        : Array.from({ length: size }, (_, i) => i);

      for (const row of rowRange) {
        if (!reserved[row][actualCol]) {
          if (bitIdx < totalBits) {
            const byteIdx = Math.floor(bitIdx / 8);
            const bitOffset = 7 - (bitIdx % 8);
            matrix[row][actualCol] = (codewords[byteIdx] >> bitOffset) & 1;
            bitIdx++;
          }
        }
      }
    }
    col -= 2;
  }
}

// ── Masking ─────────────────────────────────────────────────────────────────
type MaskFn = (row: number, col: number) => boolean;
const MASK_FUNCTIONS: MaskFn[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

function applyMask(matrix: number[][], reserved: boolean[][], maskIdx: number): number[][] {
  const size = matrix.length;
  const result = matrix.map((row) => [...row]);
  const fn = MASK_FUNCTIONS[maskIdx];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && fn(r, c)) {
        result[r][c] ^= 1;
      }
    }
  }
  return result;
}

// ── Format information ──────────────────────────────────────────────────────
const FORMAT_INFO_GENERATOR = 0b10100110111;
const FORMAT_INFO_MASK = 0b101010000010010;

function getFormatInfoBits(ecLevel: ErrorCorrectionLevel, maskIdx: number): number {
  const data = (EC_LEVEL_BITS[ecLevel] << 3) | maskIdx;
  let rem = data << 10;
  for (let i = 14; i >= 10; i--) {
    if (rem & (1 << i)) {
      rem ^= FORMAT_INFO_GENERATOR << (i - 10);
    }
  }
  return ((data << 10) | rem) ^ FORMAT_INFO_MASK;
}

function placeFormatInfo(matrix: number[][], ecLevel: ErrorCorrectionLevel, maskIdx: number): void {
  const size = matrix.length;
  const bits = getFormatInfoBits(ecLevel, maskIdx);

  // Around top-left finder
  const positions1 = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ];
  // Bottom-left and top-right
  const positions2 = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8],
    [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5],
    [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1],
  ];

  for (let i = 0; i < 15; i++) {
    const bit = (bits >> i) & 1;
    const [r1, c1] = positions1[i];
    matrix[r1][c1] = bit;
    const [r2, c2] = positions2[i];
    matrix[r2][c2] = bit;
  }
}

// ── Penalty scoring ─────────────────────────────────────────────────────────
function penaltyScore(matrix: number[][]): number {
  const size = matrix.length;
  let score = 0;

  // Rule 1: runs of 5+ same-color modules
  for (let r = 0; r < size; r++) {
    let run = 1;
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        run++;
      } else {
        if (run >= 5) score += run - 2;
        run = 1;
      }
    }
    if (run >= 5) score += run - 2;
  }
  for (let c = 0; c < size; c++) {
    let run = 1;
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        run++;
      } else {
        if (run >= 5) score += run - 2;
        run = 1;
      }
    }
    if (run >= 5) score += run - 2;
  }

  // Rule 2: 2x2 blocks of same color
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = matrix[r][c];
      if (v === matrix[r][c + 1] && v === matrix[r + 1][c] && v === matrix[r + 1][c + 1]) {
        score += 3;
      }
    }
  }

  // Rule 3: finder-like patterns
  const pattern1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const pattern2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 11; c++) {
      let match1 = true;
      let match2 = true;
      for (let k = 0; k < 11; k++) {
        if (matrix[r][c + k] !== pattern1[k]) match1 = false;
        if (matrix[r][c + k] !== pattern2[k]) match2 = false;
      }
      if (match1 || match2) score += 40;
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - 11; r++) {
      let match1 = true;
      let match2 = true;
      for (let k = 0; k < 11; k++) {
        if (matrix[r + k][c] !== pattern1[k]) match1 = false;
        if (matrix[r + k][c] !== pattern2[k]) match2 = false;
      }
      if (match1 || match2) score += 40;
    }
  }

  // Rule 4: proportion of dark modules
  let dark = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c] === 1) dark++;
    }
  }
  const total = size * size;
  const pct = (dark / total) * 100;
  const prev5 = Math.floor(pct / 5) * 5;
  const next5 = prev5 + 5;
  score += Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10;

  return score;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Generate a QR code matrix (2D array of booleans where true = dark module).
 */
export function generateQrMatrix(
  text: string,
  ecLevel: ErrorCorrectionLevel = "M"
): boolean[][] {
  if (!text) return [];

  const utf8 = new TextEncoder().encode(text);
  const version = selectVersion(utf8.length, ecLevel);
  const data = encodeData(text, version, ecLevel);
  const codewords = interleave(data, version, ecLevel);
  const { matrix, reserved } = createMatrix(version);

  placeData(matrix, reserved, codewords);

  // Try all 8 masks, pick the one with lowest penalty
  let bestMask = 0;
  let bestScore = Infinity;
  for (let m = 0; m < 8; m++) {
    const masked = applyMask(matrix, reserved, m);
    placeFormatInfo(masked, ecLevel, m);
    const score = penaltyScore(masked);
    if (score < bestScore) {
      bestScore = score;
      bestMask = m;
    }
  }

  const finalMatrix = applyMask(matrix, reserved, bestMask);
  placeFormatInfo(finalMatrix, ecLevel, bestMask);

  return finalMatrix.map((row) => row.map((v) => v === 1));
}

/**
 * Render a QR matrix to a canvas element.
 */
export function renderQrToCanvas(
  canvas: HTMLCanvasElement,
  matrix: boolean[][],
  size: number,
  fgColor: string = "#000000",
  bgColor: string = "#ffffff"
): void {
  const moduleCount = matrix.length;
  if (moduleCount === 0) return;

  const quietZone = 4; // 4-module quiet zone
  const totalModules = moduleCount + quietZone * 2;
  const scale = size / totalModules;

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = fgColor;
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (matrix[r][c]) {
        const x = Math.round((c + quietZone) * scale);
        const y = Math.round((r + quietZone) * scale);
        const w = Math.round((c + quietZone + 1) * scale) - x;
        const h = Math.round((r + quietZone + 1) * scale) - y;
        ctx.fillRect(x, y, w, h);
      }
    }
  }
}

/**
 * Export canvas as a PNG data URL.
 */
export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}

/**
 * Export canvas as a Blob for clipboard / download.
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to create blob"));
    }, "image/png");
  });
}
