/**
 * Pure logic functions for Unit Converter tool.
 * Each category has a base unit. All conversions go through the base unit.
 * Temperature is special — it uses formulas instead of ratios.
 */

export type CategoryId =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "area"
  | "speed"
  | "data"
  | "time";

export interface UnitDef {
  id: string;
  label: string;
  symbol: string;
  /** Ratio to base unit (multiply input by this to get base). Ignored for temperature. */
  toBase: number;
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  baseUnit: string;
  units: UnitDef[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: "length",
    label: "Length",
    baseUnit: "m",
    units: [
      { id: "mm", label: "Millimeter", symbol: "mm", toBase: 0.001 },
      { id: "cm", label: "Centimeter", symbol: "cm", toBase: 0.01 },
      { id: "m", label: "Meter", symbol: "m", toBase: 1 },
      { id: "km", label: "Kilometer", symbol: "km", toBase: 1000 },
      { id: "in", label: "Inch", symbol: "in", toBase: 0.0254 },
      { id: "ft", label: "Foot", symbol: "ft", toBase: 0.3048 },
      { id: "yd", label: "Yard", symbol: "yd", toBase: 0.9144 },
      { id: "mi", label: "Mile", symbol: "mi", toBase: 1609.344 },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    baseUnit: "g",
    units: [
      { id: "mg", label: "Milligram", symbol: "mg", toBase: 0.001 },
      { id: "g", label: "Gram", symbol: "g", toBase: 1 },
      { id: "kg", label: "Kilogram", symbol: "kg", toBase: 1000 },
      { id: "oz", label: "Ounce", symbol: "oz", toBase: 28.3495 },
      { id: "lb", label: "Pound", symbol: "lb", toBase: 453.592 },
      { id: "ton", label: "Metric Ton", symbol: "t", toBase: 1e6 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    baseUnit: "C",
    units: [
      { id: "C", label: "Celsius", symbol: "°C", toBase: 1 },
      { id: "F", label: "Fahrenheit", symbol: "°F", toBase: 1 },
      { id: "K", label: "Kelvin", symbol: "K", toBase: 1 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    baseUnit: "ml",
    units: [
      { id: "ml", label: "Milliliter", symbol: "ml", toBase: 1 },
      { id: "l", label: "Liter", symbol: "L", toBase: 1000 },
      { id: "gal", label: "US Gallon", symbol: "gal", toBase: 3785.41 },
      { id: "floz", label: "US Fluid Ounce", symbol: "fl oz", toBase: 29.5735 },
      { id: "cup", label: "US Cup", symbol: "cup", toBase: 236.588 },
      { id: "tbsp", label: "Tablespoon", symbol: "tbsp", toBase: 14.7868 },
      { id: "tsp", label: "Teaspoon", symbol: "tsp", toBase: 4.92892 },
    ],
  },
  {
    id: "area",
    label: "Area",
    baseUnit: "m2",
    units: [
      { id: "mm2", label: "Square Millimeter", symbol: "mm²", toBase: 1e-6 },
      { id: "cm2", label: "Square Centimeter", symbol: "cm²", toBase: 1e-4 },
      { id: "m2", label: "Square Meter", symbol: "m²", toBase: 1 },
      { id: "km2", label: "Square Kilometer", symbol: "km²", toBase: 1e6 },
      { id: "in2", label: "Square Inch", symbol: "in²", toBase: 6.4516e-4 },
      { id: "ft2", label: "Square Foot", symbol: "ft²", toBase: 0.092903 },
      { id: "acre", label: "Acre", symbol: "ac", toBase: 4046.86 },
      { id: "ha", label: "Hectare", symbol: "ha", toBase: 10000 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    baseUnit: "ms",
    units: [
      { id: "ms", label: "Meters per Second", symbol: "m/s", toBase: 1 },
      { id: "kmh", label: "Kilometers per Hour", symbol: "km/h", toBase: 1 / 3.6 },
      { id: "mph", label: "Miles per Hour", symbol: "mph", toBase: 0.44704 },
      { id: "knot", label: "Knot", symbol: "kn", toBase: 0.514444 },
      { id: "fts", label: "Feet per Second", symbol: "ft/s", toBase: 0.3048 },
    ],
  },
  {
    id: "data",
    label: "Data",
    baseUnit: "B",
    units: [
      { id: "B", label: "Byte", symbol: "B", toBase: 1 },
      { id: "KB", label: "Kilobyte", symbol: "KB", toBase: 1024 },
      { id: "MB", label: "Megabyte", symbol: "MB", toBase: Math.pow(1024, 2) },
      { id: "GB", label: "Gigabyte", symbol: "GB", toBase: Math.pow(1024, 3) },
      { id: "TB", label: "Terabyte", symbol: "TB", toBase: Math.pow(1024, 4) },
      { id: "PB", label: "Petabyte", symbol: "PB", toBase: Math.pow(1024, 5) },
    ],
  },
  {
    id: "time",
    label: "Time",
    baseUnit: "s",
    units: [
      { id: "ms", label: "Millisecond", symbol: "ms", toBase: 0.001 },
      { id: "s", label: "Second", symbol: "s", toBase: 1 },
      { id: "min", label: "Minute", symbol: "min", toBase: 60 },
      { id: "h", label: "Hour", symbol: "h", toBase: 3600 },
      { id: "day", label: "Day", symbol: "day", toBase: 86400 },
      { id: "week", label: "Week", symbol: "wk", toBase: 604800 },
      { id: "month", label: "Month (30 days)", symbol: "mo", toBase: 2592000 },
      { id: "year", label: "Year (365 days)", symbol: "yr", toBase: 31536000 },
    ],
  },
];

// --- Temperature conversion helpers ---

function celsiusToBase(value: number): number {
  return value; // Celsius IS the base
}

function fahrenheitToBase(value: number): number {
  return (value - 32) * (5 / 9);
}

function kelvinToBase(value: number): number {
  return value - 273.15;
}

function baseToCelsius(base: number): number {
  return base;
}

function baseToFahrenheit(base: number): number {
  return base * (9 / 5) + 32;
}

function baseToKelvin(base: number): number {
  return base + 273.15;
}

const tempToBase: Record<string, (v: number) => number> = {
  C: celsiusToBase,
  F: fahrenheitToBase,
  K: kelvinToBase,
};

const tempFromBase: Record<string, (v: number) => number> = {
  C: baseToCelsius,
  F: baseToFahrenheit,
  K: baseToKelvin,
};

// --- Main conversion ---

/**
 * Format a number for display with appropriate precision.
 */
export function formatValue(value: number): string {
  if (value === 0) return "0";
  if (!Number.isFinite(value)) return "Infinity";

  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && Math.abs(value) > 0)) {
    return value.toExponential(6);
  }

  if (Number.isInteger(value) && Math.abs(value) < Number.MAX_SAFE_INTEGER) {
    return value.toLocaleString("en-US");
  }

  const formatted = Number(value.toPrecision(10));
  return formatted.toLocaleString("en-US", {
    maximumFractionDigits: 10,
    useGrouping: true,
  });
}

export interface ConversionResult {
  unit: UnitDef;
  value: number;
  formatted: string;
}

/**
 * Convert a value from one unit to another within a category.
 * Returns the numeric result.
 */
export function convert(
  categoryId: CategoryId,
  value: number,
  fromUnitId: string,
  toUnitId: string
): number {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return 0;

  // Temperature special case
  if (categoryId === "temperature") {
    const toBaseFn = tempToBase[fromUnitId];
    const fromBaseFn = tempFromBase[toUnitId];
    if (!toBaseFn || !fromBaseFn) return 0;
    return fromBaseFn(toBaseFn(value));
  }

  const from = category.units.find((u) => u.id === fromUnitId);
  const to = category.units.find((u) => u.id === toUnitId);
  if (!from || !to) return 0;

  const baseValue = value * from.toBase;
  return baseValue / to.toBase;
}

/**
 * Convert a value from one unit to ALL units in the category.
 */
export function convertToAll(
  categoryId: CategoryId,
  value: number,
  fromUnitId: string
): ConversionResult[] {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return [];

  return category.units.map((targetUnit) => {
    const result = convert(categoryId, value, fromUnitId, targetUnit.id);
    return {
      unit: targetUnit,
      value: result,
      formatted: formatValue(result),
    };
  });
}
