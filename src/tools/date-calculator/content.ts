import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Date Calculator",

  description:
    "Calculate the number of days between two dates or add and subtract days, weeks, months, or years from any date. Free online date calculator with business-day support.",

  whatIs:
    "A Date Calculator is a utility that performs two essential date arithmetic operations. In Add/Subtract mode, you pick a starting date and specify a number of days, weeks, months, or years to add or subtract, and the tool instantly shows the resulting date along with the day of the week. You can also toggle business-days-only mode, which skips Saturdays and Sundays so you can accurately calculate deadlines that count only working days. In Between Dates mode, you enter a start date and an end date, and the calculator tells you exactly how many days separate them, broken down into years, months, days, as well as total weeks and remaining days. An option to include both the start and end dates in the count handles the common 'fence-post' counting question. All computation runs entirely in your browser using native JavaScript Date objects, so no data is transmitted to any server.",

  howToUse:
    "1. Choose a mode using the tabs at the top: 'Add / Subtract' or 'Between Dates'. 2. In Add/Subtract mode, select a base date, enter the number of units, choose the unit (days, weeks, months, or years), pick whether to add or subtract, and optionally toggle the business-days-only switch. The result date appears instantly. 3. In Between Dates mode, pick a start date and an end date. The difference is displayed in total days, a year-month-day breakdown, and weeks plus remaining days. Toggle 'Include end date' if you want both boundary dates counted. 4. All results update in real time as you change any input.",

  howItWorks:
    "The Add/Subtract calculator uses JavaScript Date methods (setDate, setMonth, setFullYear) with careful edge-case handling. Adding months clamps to the last valid day of the target month, so January 31 plus one month correctly yields February 28 (or 29 in a leap year). Business-day addition iterates one day at a time, skipping Saturday (day 6) and Sunday (day 0). The Between Dates calculator computes total days by dividing the millisecond difference by 86,400,000, then derives a year-month-day breakdown by walking calendar fields, borrowing days from the previous month when necessary. All arithmetic is performed client-side with no external dependencies.",

  useCases: [
    "Calculate project deadlines by adding business days to a start date",
    "Find the exact number of days until an event, vacation, or due date",
    "Determine age in exact years, months, and days between two dates",
    "Count working days for payroll, leave, or contract duration calculations",
    "Plan shipping or delivery windows by adding calendar or business days",
    "Calculate the date N weeks or months from today for scheduling purposes",
  ],

  faq: [
    {
      q: "How does the business-days-only option work?",
      a: "When enabled, the calculator skips Saturdays and Sundays while counting. For example, adding 5 business days to a Friday yields the following Friday, because the two weekend days are not counted. Public holidays are not excluded because they vary by country and region.",
    },
    {
      q: "What happens when I add one month to January 31?",
      a: "The calculator clamps to the last valid day of the target month. January 31 plus one month becomes February 28 (or February 29 in a leap year), because February does not have a 31st. Similarly, March 31 plus one month becomes April 30.",
    },
    {
      q: "Does 'Include end date' change the total days count?",
      a: "Yes. By default, the difference between January 1 and January 3 is 2 days (January 2 and 3). With 'Include end date' toggled on, both boundary dates are counted, giving 3 days (January 1, 2, and 3). Use whichever convention your situation requires.",
    },
    {
      q: "Can I calculate dates far in the past or future?",
      a: "Yes. JavaScript's Date object supports dates from approximately 271,821 BCE to 275,760 CE. For practical purposes you can calculate any historical or future date you need.",
    },
    {
      q: "Is my data stored or sent to a server?",
      a: "No. All calculations run entirely in your browser using JavaScript. No data is transmitted, stored, or logged. The tool works offline once the page has loaded.",
    },
  ],
};
