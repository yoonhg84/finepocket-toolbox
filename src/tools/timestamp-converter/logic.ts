export interface TimestampFormats {
  iso8601: string;
  rfc2822: string;
  localString: string;
  utcString: string;
  relative: string;
}

export interface DateInfo {
  dayOfYear: number;
  weekNumber: number;
  isLeapYear: boolean;
  secondsSinceEpoch: number;
  minutesSinceEpoch: number;
  hoursSinceEpoch: number;
  daysSinceEpoch: number;
  timezoneName: string;
  utcOffset: string;
}

/**
 * Auto-detect whether a timestamp is in seconds or milliseconds.
 * Timestamps above 1e12 are treated as milliseconds.
 */
function normalizeToMs(ts: number): number {
  if (Math.abs(ts) > 1e12) return ts;
  return ts * 1000;
}

export function timestampToFormats(ts: number): TimestampFormats {
  const ms = normalizeToMs(ts);
  const date = new Date(ms);

  return {
    iso8601: date.toISOString(),
    rfc2822: date.toUTCString().replace("GMT", "+0000"),
    localString: date.toLocaleString(),
    utcString: date.toUTCString(),
    relative: getRelativeTime(ts),
  };
}

export function dateToTimestamp(dateStr: string): { seconds: number; milliseconds: number } {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  const ms = date.getTime();
  return {
    seconds: Math.floor(ms / 1000),
    milliseconds: ms,
  };
}

export function getRelativeTime(ts: number): string {
  const ms = normalizeToMs(ts);
  const now = Date.now();
  const diffMs = now - ms;
  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs < 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  let label: string;
  if (seconds < 5) {
    return "just now";
  } else if (seconds < 60) {
    label = `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (minutes < 60) {
    label = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else if (hours < 24) {
    label = `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (days < 7) {
    label = `${days} day${days !== 1 ? "s" : ""}`;
  } else if (weeks < 5) {
    label = `${weeks} week${weeks !== 1 ? "s" : ""}`;
  } else if (months < 12) {
    label = `${months} month${months !== 1 ? "s" : ""}`;
  } else {
    label = `${years} year${years !== 1 ? "s" : ""}`;
  }

  return isFuture ? `in ${label}` : `${label} ago`;
}

export function getCurrentTimestamp(): { seconds: number; milliseconds: number } {
  const now = Date.now();
  return {
    seconds: Math.floor(now / 1000),
    milliseconds: now,
  };
}

export function getDateInfo(date: Date): DateInfo {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // ISO week number
  const tempDate = new Date(date.getTime());
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / oneDay + 1) / 7);

  const year = date.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const epochMs = date.getTime();
  const secondsSinceEpoch = Math.floor(epochMs / 1000);
  const minutesSinceEpoch = Math.floor(epochMs / 60000);
  const hoursSinceEpoch = Math.floor(epochMs / 3600000);
  const daysSinceEpoch = Math.floor(epochMs / 86400000);

  const offsetMinutes = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const utcOffset = `UTC${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMins).padStart(2, "0")}`;

  let timezoneName: string;
  try {
    timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timezoneName = "Unknown";
  }

  return {
    dayOfYear,
    weekNumber,
    isLeapYear,
    secondsSinceEpoch,
    minutesSinceEpoch,
    hoursSinceEpoch,
    daysSinceEpoch,
    timezoneName,
    utcOffset,
  };
}
