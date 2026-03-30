import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Unit Converter",

  description:
    "Convert between units of length, weight, temperature, volume, area, speed, data, and time. Free, fast, and accurate unit conversion tool with instant results.",

  whatIs:
    "A unit converter is an essential tool that translates measurements from one unit system to another. Whether you are converting centimeters to inches, kilograms to pounds, Celsius to Fahrenheit, or liters to gallons, this free online Unit Converter covers 8 major measurement categories with over 60 units. It supports both metric and imperial systems, making it useful for science, engineering, cooking, travel, fitness, and everyday life. All conversions are calculated instantly in your browser, with results shown for every unit in the selected category at once — so you never have to run the same conversion twice.",

  howToUse:
    "1. Select a measurement category using the tabs at the top (Length, Weight, Temperature, Volume, Area, Speed, Data, or Time). 2. Enter a numeric value in the input field. 3. Choose your source unit from the 'From' dropdown and your target unit from the 'To' dropdown. 4. The converted result appears instantly. Use the swap button (⇅) to quickly reverse the conversion direction. 5. Below the main converter, a full table shows your value converted to every unit in the category simultaneously.",

  howItWorks:
    "Each measurement category has a designated base unit (e.g., meters for length, grams for weight, seconds for time). When you enter a value, the tool first converts it to the base unit using a known ratio, then converts from the base unit to every target unit. Temperature is handled differently because conversions between Celsius, Fahrenheit, and Kelvin require formulas rather than simple multiplication. For example, °F = °C × 9/5 + 32. All calculations are performed client-side using JavaScript, ensuring your data never leaves your browser.",

  useCases: [
    "Converting recipe measurements between metric and US customary units (grams to ounces, liters to cups)",
    "Converting height and weight between metric and imperial for health and fitness tracking",
    "Calculating distances between kilometers and miles for travel planning",
    "Converting temperatures between Celsius and Fahrenheit for weather, cooking, or science",
    "Translating area measurements for real estate (square feet to square meters, acres to hectares)",
    "Converting speed units for automotive, aviation, or marine applications (mph, km/h, knots)",
    "Converting data storage and transfer sizes (MB to GB, TB to PB) for IT and cloud computing",
    "Converting time durations for project planning (hours to days, weeks to months)",
  ],

  faq: [
    {
      q: "How accurate are the conversions?",
      a: "The conversions use standard ratios defined by international measurement standards (SI, US customary). Results are accurate to at least 10 significant digits, which exceeds the precision needed for virtually all practical applications. Temperature conversions use exact formulas.",
    },
    {
      q: "What is the difference between metric and imperial units?",
      a: "The metric system (SI) uses units like meters, grams, and liters with base-10 prefixes (kilo = 1000, centi = 1/100). The imperial system uses units like feet, pounds, and gallons with historical conversion factors. Most of the world uses metric, while the US primarily uses imperial for everyday measurements.",
    },
    {
      q: "Why is temperature conversion different from other units?",
      a: "Most unit conversions involve simple multiplication by a ratio (e.g., 1 inch = 2.54 cm). Temperature scales, however, have different zero points, so conversions require both multiplication and addition. For example, to convert Celsius to Fahrenheit: °F = °C × 9/5 + 32.",
    },
    {
      q: "Is a month always 30 days in the time converter?",
      a: "For simplicity and consistency, the time converter uses 30 days for a month and 365 days for a year. These are standard approximations used in most time conversion tools. For exact date calculations involving specific calendar months, use a dedicated date calculator.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. All conversions happen entirely in your browser using JavaScript. No data is sent to any server, stored, or logged. The tool works completely offline once the page is loaded.",
    },
    {
      q: "Can I convert between units in different categories?",
      a: "No — you can only convert between units within the same category. For example, you can convert meters to feet (both length units), but not meters to kilograms (length vs weight). Cross-category conversions are physically meaningless.",
    },
  ],
};
