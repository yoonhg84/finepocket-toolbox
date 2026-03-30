/**
 * Pure logic functions for Date Calculator tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

export interface AddSubtractResult {
  resultDate: Date;
  formattedDate: string;
  dayOfWeek: string;
}

export interface DateDiffResult {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  weeks: number;
  remainingDays: number;
}

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Format a Date as "Month DD, YYYY" */
export function formatDate(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** Get the day-of-week name */
export function getDayOfWeek(date: Date): string {
  return DAY_NAMES[date.getDay()];
}

/** Format as YYYY-MM-DD for input[type=date] */
export function toInputDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse a YYYY-MM-DD string into a local Date */
export function parseInputDate(str: string): Date | null {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

/**
 * Add calendar days to a date.
 */
function addCalendarDays(base: Date, days: number): Date {
  const result = new Date(base);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add business days (Mon-Fri) to a date.
 * Positive values go forward, negative values go backward.
 */
function addBusinessDays(base: Date, days: number): Date {
  const result = new Date(base);
  const direction = days >= 0 ? 1 : -1;
  let remaining = Math.abs(days);

  while (remaining > 0) {
    result.setDate(result.getDate() + direction);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) {
      remaining--;
    }
  }
  return result;
}

/**
 * Add weeks to a date.
 */
function addWeeks(base: Date, weeks: number, businessOnly: boolean): Date {
  if (businessOnly) {
    return addBusinessDays(base, weeks * 5);
  }
  return addCalendarDays(base, weeks * 7);
}

/**
 * Add months to a date, clamping to month-end when necessary.
 * e.g. Jan 31 + 1 month = Feb 28 (or 29 in leap year)
 */
function addMonths(base: Date, months: number): Date {
  const result = new Date(base);
  const targetMonth = result.getMonth() + months;
  const originalDay = result.getDate();

  result.setMonth(targetMonth);

  // If the day changed (e.g. 31 -> 3), it overflowed to next month
  // Roll back to last day of the intended month
  if (result.getDate() !== originalDay) {
    result.setDate(0); // last day of previous month
  }

  return result;
}

/**
 * Add years to a date, handling Feb 29 -> Feb 28 for non-leap years.
 */
function addYears(base: Date, years: number): Date {
  return addMonths(base, years * 12);
}

export type TimeUnit = "days" | "weeks" | "months" | "years";

/**
 * Add or subtract a duration from a base date.
 */
export function addSubtractDate(
  base: Date,
  amount: number,
  unit: TimeUnit,
  operation: "add" | "subtract",
  businessDaysOnly: boolean
): AddSubtractResult {
  const signedAmount = operation === "subtract" ? -amount : amount;

  let resultDate: Date;

  switch (unit) {
    case "days":
      resultDate = businessDaysOnly
        ? addBusinessDays(base, signedAmount)
        : addCalendarDays(base, signedAmount);
      break;
    case "weeks":
      resultDate = addWeeks(base, signedAmount, businessDaysOnly);
      break;
    case "months":
      resultDate = addMonths(base, signedAmount);
      break;
    case "years":
      resultDate = addYears(base, signedAmount);
      break;
  }

  return {
    resultDate,
    formattedDate: formatDate(resultDate),
    dayOfWeek: getDayOfWeek(resultDate),
  };
}

/**
 * Calculate the difference between two dates.
 * If includeEndDate is true, the count includes both start and end day.
 */
export function dateDifference(
  start: Date,
  end: Date,
  includeEndDate: boolean
): DateDiffResult {
  // Ensure start <= end for consistent calculation
  const d1 = start < end ? start : end;
  const d2 = start < end ? end : start;

  // Total calendar days
  const msPerDay = 86400000;
  let totalDays = Math.round(
    (d2.getTime() - d1.getTime()) / msPerDay
  );
  if (includeEndDate) totalDays += 1;

  // Weeks + remaining
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Years, months, days breakdown
  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();

  if (includeEndDate) {
    days += 1;
  }

  // Normalize days
  if (days < 0) {
    months--;
    // Days in the previous month of d2
    const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Normalize months overflow from days adjustment
  if (days >= getDaysInMonth(d2.getFullYear(), d2.getMonth())) {
    days -= getDaysInMonth(d2.getFullYear(), d2.getMonth());
    months++;
  }

  // Normalize months
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    totalDays,
    years,
    months,
    days,
    weeks,
    remainingDays,
  };
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
