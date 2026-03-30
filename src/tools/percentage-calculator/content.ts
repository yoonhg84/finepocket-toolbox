import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Percentage Calculator",
  description:
    "Calculate percentages, reverse percentages, percentage changes, and apply discounts or markups instantly. Free online percentage calculator with four calculation modes.",
  whatIs:
    "A Percentage Calculator is a versatile math tool that handles every common percentage operation in one place. Instead of memorizing formulas or reaching for a spreadsheet, you simply enter your numbers and get an instant answer. This calculator offers four distinct modes: Basic mode answers 'What is Y% of X?' — useful for calculating tips, sales tax, or exam scores. Reverse mode answers 'X is what percent of Y?' — perfect for figuring out what fraction one number represents of another. Change mode calculates the percentage increase or decrease between two values, which is essential for comparing prices, tracking stock performance, or measuring growth metrics. Finally, Discount/Markup mode applies a percentage to a base number, instantly showing you the final price after a discount or the total cost after a markup. All calculations happen in real time right in your browser, so there is no waiting and no data sent to any server. Whether you are a student solving homework problems, a shopper comparing deals, a business analyst reviewing quarterly figures, or anyone who works with numbers, this tool eliminates the guesswork from percentage math.",
  howToUse:
    "All four calculation sections are visible on the page simultaneously — no tabs or hidden panels. For Basic mode, enter the base number (X) and the percentage (Y), and the result appears instantly. For Reverse mode, enter the part value and the whole value to find what percentage the part represents. For Change mode, enter the original value and the new value to see the percentage increase or decrease. For Discount/Markup mode, enter the original price and the percentage, then choose whether to apply it as a discount or a markup. Each section shows its result in large text so you can read it at a glance.",
  howItWorks:
    "Basic percentage uses the formula: result = X × Y / 100. Reverse percentage divides the part by the whole and multiplies by 100: result = (X / Y) × 100. Percentage change calculates the difference between two values relative to the original: result = ((New − Old) / |Old|) × 100. Discount mode multiplies by (1 − Y/100) while markup mode multiplies by (1 + Y/100). All arithmetic is performed using JavaScript's native floating-point numbers, and results are formatted to up to six decimal places with trailing zeros removed for clarity.",
  useCases: [
    "Calculate sale prices and discounts while shopping",
    "Determine exam scores and grade percentages for school",
    "Analyze percentage growth or decline in sales, revenue, or stock prices",
    "Figure out what portion one number is of another for budgeting",
    "Compute tax amounts, tips, and surcharges quickly",
    "Apply markup percentages for retail pricing and profit margins",
  ],
  faq: [
    {
      q: "How do I calculate what percentage one number is of another?",
      a: "Use the Reverse mode. Enter the part as X and the whole as Y. The calculator divides X by Y and multiplies by 100. For example, if X = 25 and Y = 200, the answer is 12.5%, because 25 is 12.5% of 200.",
    },
    {
      q: "What is the difference between percentage change and percentage of a number?",
      a: "Percentage of a number (Basic mode) answers 'What is Y% of X?'. Percentage change (Change mode) answers 'How much did a value increase or decrease in percentage terms?'. For example, 20% of 50 is 10, but the percentage change from 50 to 60 is 20% because the value increased by 10, which is 20% of the original 50.",
    },
    {
      q: "Can I calculate compound or successive percentages?",
      a: "This tool calculates one percentage operation at a time. For successive discounts (e.g., 20% off then 10% off), apply the first discount, note the result, then use that result as the input for the second calculation. A dedicated compound interest calculator would be more suitable for investment growth over time.",
    },
    {
      q: "Why does the percentage change show a different sign for negative starting values?",
      a: "The calculator uses the absolute value of the original number in the denominator to ensure consistent direction. An increase from -100 to -50 is reported as a 50% increase, because the value moved 50 units toward zero relative to the magnitude of the starting value.",
    },
    {
      q: "Is my data stored or sent to a server?",
      a: "No. All calculations run entirely in your browser using JavaScript. No data is transmitted, stored, or logged. The tool works offline once the page has loaded.",
    },
    {
      q: "How accurate are the results?",
      a: "Results are computed using JavaScript's 64-bit floating-point arithmetic (IEEE 754 double precision), which provides approximately 15–17 significant decimal digits of precision. For everyday percentage calculations this is more than sufficient. Results are displayed with up to six decimal places.",
    },
  ],
};
