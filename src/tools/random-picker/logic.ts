/**
 * Cryptographically secure random integer in [0, max)
 */
function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Cryptographically secure random float in [0, 1)
 */
function secureRandomFloat(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
}

/**
 * Spin the wheel — returns the winning index and the final rotation angle (degrees).
 */
export function spinWheel(itemCount: number): { winnerIndex: number; rotation: number } {
  if (itemCount <= 0) return { winnerIndex: 0, rotation: 0 };

  const winnerIndex = secureRandomInt(itemCount);
  const segmentAngle = 360 / itemCount;

  // The wheel has items laid out clockwise starting from the top (12 o'clock).
  // The pointer is at the top. We need to rotate so that the winning segment
  // ends up under the pointer. Add extra full rotations (5–9) for visual effect.
  const extraRotations = 5 + secureRandomInt(5);
  const targetAngle = segmentAngle * winnerIndex + segmentAngle * secureRandomFloat();
  const rotation = extraRotations * 360 + targetAngle;

  return { winnerIndex, rotation };
}

export type CoinResult = "heads" | "tails";

/**
 * Flip a coin — returns heads or tails.
 */
export function flipCoin(): CoinResult {
  return secureRandomInt(2) === 0 ? "heads" : "tails";
}

export interface DiceRollResult {
  dice: number[];
  total: number;
  diceType: number;
}

/**
 * Roll dice — returns individual die results and total.
 * @param count Number of dice (1–6)
 * @param sides Number of sides per die (4, 6, 8, 10, 12, or 20)
 */
export function rollDice(count: number, sides: number): DiceRollResult {
  const dice: number[] = [];
  for (let i = 0; i < count; i++) {
    dice.push(secureRandomInt(sides) + 1);
  }
  const total = dice.reduce((a, b) => a + b, 0);
  return { dice, total, diceType: sides };
}
