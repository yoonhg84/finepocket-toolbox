export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
  dayOfWeek: string;
  zodiacSign: string;
  chineseZodiac: string;
}

export interface DateInterval {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ZODIAC_SIGNS: Array<{ sign: string; start: [number, number] }> = [
  { sign: "Capricorn", start: [1, 1] },
  { sign: "Aquarius", start: [1, 20] },
  { sign: "Pisces", start: [2, 19] },
  { sign: "Aries", start: [3, 21] },
  { sign: "Taurus", start: [4, 20] },
  { sign: "Gemini", start: [5, 21] },
  { sign: "Cancer", start: [6, 21] },
  { sign: "Leo", start: [7, 23] },
  { sign: "Virgo", start: [8, 23] },
  { sign: "Libra", start: [9, 23] },
  { sign: "Scorpio", start: [10, 23] },
  { sign: "Sagittarius", start: [11, 22] },
  { sign: "Capricorn", start: [12, 22] },
];

const CHINESE_ZODIAC = [
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
];

export function getZodiacSign(month: number, day: number): string {
  // month is 1-based
  for (let i = ZODIAC_SIGNS.length - 1; i >= 0; i--) {
    const [m, d] = ZODIAC_SIGNS[i].start;
    if (month > m || (month === m && day >= d)) {
      return ZODIAC_SIGNS[i].sign;
    }
  }
  return "Capricorn";
}

export function getChineseZodiac(year: number): string {
  return CHINESE_ZODIAC[year % 12];
}

export function calculateAge(birthDate: Date, referenceDate?: Date): AgeResult {
  const today = referenceDate ?? new Date();
  const birth = new Date(birthDate);

  // Calculate years, months, days
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    // Days in the previous month of the reference date
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Total days
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor(
    (today.getTime() - birth.getTime()) / msPerDay
  );
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Next birthday
  const thisYearBirthday = new Date(
    today.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );
  let nextBirthday = thisYearBirthday;
  if (thisYearBirthday <= today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birth.getMonth(),
      birth.getDate()
    );
  }
  const nextBirthdayDays = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / msPerDay
  );

  const dayOfWeek = DAYS_OF_WEEK[birth.getDay()];
  const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());
  const chineseZodiac = getChineseZodiac(birth.getFullYear());

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    nextBirthdayDays,
    dayOfWeek,
    zodiacSign,
    chineseZodiac,
  };
}

export function calculateDateInterval(
  startDate: Date,
  endDate: Date
): DateInterval {
  let start = startDate;
  let end = endDate;
  if (start > end) {
    [start, end] = [end, start];
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((end.getTime() - start.getTime()) / msPerDay);

  return { years, months, days, totalDays };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
