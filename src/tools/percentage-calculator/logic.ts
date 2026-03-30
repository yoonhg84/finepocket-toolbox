export interface BasicResult {
  result: number;
}

export interface ReverseResult {
  percentage: number;
}

export interface ChangeResult {
  change: number;
  isIncrease: boolean;
}

export interface ApplyResult {
  result: number;
  difference: number;
}

/** What is Y% of X? */
export function calcBasicPercentage(x: number, y: number): BasicResult {
  return { result: x * y / 100 };
}

/** X is what % of Y? */
export function calcReversePercentage(x: number, y: number): ReverseResult {
  if (y === 0) return { percentage: 0 };
  return { percentage: (x / y) * 100 };
}

/** % change from X to Y */
export function calcPercentageChange(from: number, to: number): ChangeResult {
  if (from === 0) return { change: 0, isIncrease: to >= 0 };
  const change = ((to - from) / Math.abs(from)) * 100;
  return { change, isIncrease: change >= 0 };
}

/** Apply Y% to X (add or subtract) */
export function calcApplyPercentage(
  x: number,
  y: number,
  mode: "add" | "subtract"
): ApplyResult {
  const factor = mode === "add" ? 1 + y / 100 : 1 - y / 100;
  const result = x * factor;
  const difference = Math.abs(result - x);
  return { result, difference };
}

/** Format a number for display (up to 6 decimal places, strip trailing zeros) */
export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  const fixed = n.toFixed(6);
  return parseFloat(fixed).toLocaleString("en-US", {
    maximumFractionDigits: 6,
  });
}
