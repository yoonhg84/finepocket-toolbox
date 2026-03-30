import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Age Calculator",
  description:
    "Calculate your exact age in years, months, and days. See total days lived, next birthday countdown, zodiac sign, Chinese zodiac, and more — all free and instant.",
  whatIs:
    "An Age Calculator is a comprehensive date-based tool that computes your exact age down to the day and provides a wealth of additional time-related information. Enter your date of birth and instantly see your age broken down into years, months, and days, along with the total number of days, hours, and minutes you have been alive. The tool also counts down the days until your next birthday so you always know how far away your celebration is. Beyond the numbers, it tells you which day of the week you were born on, your Western zodiac sign based on your birth month and day, and your Chinese zodiac animal based on your birth year. For those who need to measure the time between any two dates — not just birth to today — the bonus date interval calculator handles that as well, showing years, months, days, and total days between any pair of dates. The calculator correctly handles leap years, varying month lengths, and edge cases like being born on February 29. All processing happens entirely in your browser using the native JavaScript Date API, so your personal date of birth is never transmitted to any server.",
  howToUse:
    "Select your date of birth using the date picker at the top of the tool. As soon as you choose a date, all results update instantly: your exact age in years, months, and days; the total days, hours, and minutes lived; the number of days until your next birthday; the day of the week you were born; your Western zodiac sign; and your Chinese zodiac animal. To calculate the interval between two arbitrary dates, scroll down to the Date Interval section, pick a start date and an end date, and the tool will display the difference in years, months, days, and total days.",
  howItWorks:
    "The age calculation subtracts the birth date components (year, month, day) from today's date, borrowing from months and years when the day or month of the current date is earlier than the birth date — the same way you would calculate age by hand. Total days are computed by dividing the millisecond difference between the two Date objects by 86,400,000 (milliseconds in a day). The zodiac sign lookup compares the birth month and day against the standard date ranges for each of the twelve Western zodiac signs. The Chinese zodiac is determined by the birth year modulo 12, mapped to the traditional twelve-animal cycle. Leap years are handled natively by the JavaScript Date constructor.",
  useCases: [
    "Find your exact age for official documents, insurance forms, or applications",
    "Count down the days until your next birthday celebration",
    "Discover what day of the week you or a loved one was born on",
    "Look up your Western zodiac sign and Chinese zodiac animal",
    "Calculate the precise duration between two historical or future dates",
    "Determine how many total days, hours, or minutes you have been alive",
  ],
  faq: [
    {
      q: "How does the calculator handle leap years?",
      a: "The tool uses the JavaScript Date API, which correctly accounts for leap years. February 29 births are handled properly — the next birthday calculation checks whether the upcoming year is a leap year and adjusts accordingly.",
    },
    {
      q: "What zodiac system does the tool use?",
      a: "The Western zodiac is based on the tropical zodiac with standard date ranges (e.g., Aries: March 21 – April 19). The Chinese zodiac uses the traditional twelve-animal cycle based on the Gregorian birth year. Note that the Chinese calendar New Year falls on a different date each year, so the Chinese zodiac may differ slightly for January or February births.",
    },
    {
      q: "Can I calculate someone else's age?",
      a: "Yes. Simply enter any date of birth and the calculator shows the age for that date. It works for historical dates as well as recent ones.",
    },
    {
      q: "How accurate is the total days calculation?",
      a: "Total days are computed by subtracting the two dates in milliseconds and dividing by 86,400,000. This gives a precise day count that accounts for leap years. The only edge case is daylight saving time transitions, which can shift the count by a few hours but not a full day.",
    },
    {
      q: "Is my date of birth stored or sent anywhere?",
      a: "No. All calculations run entirely in your browser using JavaScript. Your date of birth is never sent to a server, stored in a database, or logged in any way. The tool works fully offline after the page loads.",
    },
    {
      q: "What happens if I pick a future date as my birth date?",
      a: "If you select a future date, the calculator will show negative or zero values for age fields. The tool is designed for past dates representing actual birth dates.",
    },
  ],
};
