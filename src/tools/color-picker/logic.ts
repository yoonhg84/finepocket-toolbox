/**
 * Pure logic functions for Color Picker / Converter tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSB {
  h: number;
  s: number;
  b: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

/**
 * Parse a hex color string (#RGB, #RRGGBB) to RGB.
 */
export function hexToRgb(hex: string): RGB | null {
  const cleaned = hex.replace(/^#/, "");
  let r: number, g: number, b: number;

  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else if (cleaned.length === 6) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  } else {
    return null;
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

/**
 * Convert RGB values to a hex string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL.
 * Returns h in [0,360), s and l in [0,100].
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === rn) {
      h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
    } else if (max === gn) {
      h = ((bn - rn) / delta + 2) * 60;
    } else {
      h = ((rn - gn) / delta + 4) * 60;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB.
 * Expects h in [0,360), s and l in [0,100].
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100;
  const ln = l / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let rn = 0,
    gn = 0,
    bn = 0;

  if (h < 60) {
    rn = c;
    gn = x;
  } else if (h < 120) {
    rn = x;
    gn = c;
  } else if (h < 180) {
    gn = c;
    bn = x;
  } else if (h < 240) {
    gn = x;
    bn = c;
  } else if (h < 300) {
    rn = x;
    bn = c;
  } else {
    rn = c;
    bn = x;
  }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

/**
 * Convert RGB to HSB (HSV).
 * Returns h in [0,360), s and b in [0,100].
 */
export function rgbToHsb(r: number, g: number, b: number): HSB {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    if (max === rn) {
      h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
    } else if (max === gn) {
      h = ((bn - rn) / delta + 2) * 60;
    } else {
      h = ((rn - gn) / delta + 4) * 60;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
}

/**
 * Convert RGB to CMYK.
 * Returns c, m, y, k in [0,100].
 */
export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const k = 1 - Math.max(rn, gn, bn);
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Calculate relative luminance of an RGB color (WCAG 2.1).
 */
function relativeLuminance(rgb: RGB): number {
  const [rs, gs, bs] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate WCAG contrast ratio between foreground and background colors.
 */
export function getContrastRatio(fg: RGB, bg: RGB): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determine WCAG compliance level based on contrast ratio.
 * AAA >= 7:1, AA >= 4.5:1, otherwise Fail.
 */
export function wcagLevel(ratio: number): "AAA" | "AA" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

/**
 * Generate a color palette based on a hex color.
 */
export function generatePalette(
  hex: string,
  type: "complementary" | "analogous" | "triadic"
): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  switch (type) {
    case "complementary": {
      const comp = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
      return [hex, rgbToHex(comp.r, comp.g, comp.b)];
    }
    case "analogous": {
      const a1 = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l);
      const a2 = hslToRgb((hsl.h + 330) % 360, hsl.s, hsl.l);
      return [
        rgbToHex(a2.r, a2.g, a2.b),
        hex,
        rgbToHex(a1.r, a1.g, a1.b),
      ];
    }
    case "triadic": {
      const t1 = hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l);
      const t2 = hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l);
      return [
        hex,
        rgbToHex(t1.r, t1.g, t1.b),
        rgbToHex(t2.r, t2.g, t2.b),
      ];
    }
  }
}

/**
 * Parse a color input string in various formats: hex, rgb(), hsl().
 */
export function parseColorInput(input: string): RGB | null {
  const trimmed = input.trim();

  // Hex format
  if (trimmed.startsWith("#") || /^[0-9a-fA-F]{3,6}$/.test(trimmed)) {
    const hex = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    return hexToRgb(hex);
  }

  // rgb(r, g, b) or rgb(r g b)
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/i
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    if (r <= 255 && g <= 255 && b <= 255) {
      return { r, g, b };
    }
  }

  // hsl(h, s%, l%) or hsl(h s% l%)
  const hslMatch = trimmed.match(
    /^hsla?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})%?\s*[,\s]\s*(\d{1,3})%?/i
  );
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseInt(hslMatch[2], 10);
    const l = parseInt(hslMatch[3], 10);
    if (h <= 360 && s <= 100 && l <= 100) {
      return hslToRgb(h, s, l);
    }
  }

  return null;
}
