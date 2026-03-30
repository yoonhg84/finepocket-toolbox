/**
 * Pure logic functions for Data Storage Converter tool.
 * Handles SI (1000-based) and IEC (1024-based) unit conversions.
 * Uses careful floating point arithmetic for precision.
 */

export type DataUnit =
  | "bit"
  | "byte"
  | "KB"
  | "MB"
  | "GB"
  | "TB"
  | "PB"
  | "EB";

export interface DataUnitInfo {
  id: DataUnit;
  label: string;
  /** Number of bits this unit represents */
  bits: number;
}

export const DATA_UNITS: DataUnitInfo[] = [
  { id: "bit", label: "Bit", bits: 1 },
  { id: "byte", label: "Byte", bits: 8 },
  { id: "KB", label: "Kilobyte (KB)", bits: 8 * 1024 },
  { id: "MB", label: "Megabyte (MB)", bits: 8 * Math.pow(1024, 2) },
  { id: "GB", label: "Gigabyte (GB)", bits: 8 * Math.pow(1024, 3) },
  { id: "TB", label: "Terabyte (TB)", bits: 8 * Math.pow(1024, 4) },
  { id: "PB", label: "Petabyte (PB)", bits: 8 * Math.pow(1024, 5) },
  { id: "EB", label: "Exabyte (EB)", bits: 8 * Math.pow(1024, 6) },
];

export interface ConversionRow {
  unit: DataUnitInfo;
  value: string;
}

/**
 * Format a number for display. Uses appropriate precision
 * to avoid overly long decimal expansions.
 */
function formatValue(value: number): string {
  if (value === 0) return "0";
  if (!Number.isFinite(value)) return "Infinity";

  // For very large or very small values, use scientific notation
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && Math.abs(value) > 0)) {
    return value.toExponential(6);
  }

  // For values that are effectively integers, show them as integers
  if (Number.isInteger(value) && Math.abs(value) < Number.MAX_SAFE_INTEGER) {
    return value.toLocaleString("en-US");
  }

  // Otherwise, show up to 6 significant digits
  const formatted = Number(value.toPrecision(10));
  // Remove trailing zeros after decimal
  return formatted.toLocaleString("en-US", {
    maximumFractionDigits: 10,
    useGrouping: true,
  });
}

/**
 * Convert a value from one data unit to all other units.
 */
export function convertDataUnit(
  inputValue: number,
  fromUnit: DataUnit
): ConversionRow[] {
  const from = DATA_UNITS.find((u) => u.id === fromUnit);
  if (!from) return [];

  // Convert input to bits first (universal base)
  const totalBits = inputValue * from.bits;

  return DATA_UNITS.map((targetUnit) => {
    const converted = totalBits / targetUnit.bits;
    return {
      unit: targetUnit,
      value: formatValue(converted),
    };
  });
}
