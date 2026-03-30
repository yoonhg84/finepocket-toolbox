import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "BMI Calculator",

  description:
    "Calculate your Body Mass Index (BMI) instantly with metric or imperial units. See your BMI category, healthy weight range, and BMI Prime score. Free online tool.",

  whatIs:
    "Body Mass Index (BMI) is a simple numerical value calculated from your height and weight. It provides a quick screening measure to categorize individuals into weight status groups: Underweight (below 18.5), Normal weight (18.5 to 24.9), Overweight (25.0 to 29.9), and Obese (30.0 and above). While BMI does not directly measure body fat, it correlates with more accurate body fat measurements and is widely used by healthcare professionals as an initial assessment tool. This calculator supports both metric (cm/kg) and imperial (ft-in/lbs) units and computes your BMI, category, BMI Prime, and healthy weight range entirely in your browser.",

  howToUse:
    "1. Select your preferred unit system: Metric (centimeters and kilograms) or Imperial (feet-inches and pounds). 2. Enter your height using the provided fields. 3. Enter your weight. 4. Your BMI result, category, BMI Prime, and healthy weight range will appear instantly. The visual gauge bar shows where your BMI falls on the spectrum from underweight to obese.",

  howItWorks:
    "BMI is calculated using the formula: BMI = weight (kg) / height (m)^2. For imperial units, height is first converted from feet and inches to centimeters, and weight from pounds to kilograms. BMI Prime is the ratio of your BMI to the upper limit of the normal range (25), where a value of 1.0 or less indicates normal weight. The healthy weight range is computed by solving the BMI formula for weight at BMI values of 18.5 and 24.9 for your given height. All calculations run entirely in your browser.",

  useCases: [
    "Quick health screening to understand your weight status relative to height",
    "Tracking weight management progress over time with a standardized metric",
    "Setting realistic weight goals based on your healthy BMI weight range",
    "Pre-visit health assessment before consulting a healthcare professional",
    "Fitness and nutrition planning using BMI as a baseline reference",
    "Educational purposes to understand the relationship between height, weight, and health categories",
  ],

  faq: [
    {
      q: "How accurate is BMI?",
      a: "BMI is a useful screening tool but has limitations. It does not distinguish between muscle and fat mass, so muscular individuals may have a high BMI despite being healthy. It also may not be accurate for pregnant women, the elderly, or growing children. Always consult a healthcare professional for a comprehensive health assessment.",
    },
    {
      q: "What is BMI Prime?",
      a: "BMI Prime is the ratio of your actual BMI to the upper limit of normal BMI (25.0). A BMI Prime of 1.0 means you are at the upper boundary of normal weight. Values below 1.0 indicate normal or underweight, while values above 1.0 indicate overweight or obese status.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. All calculations are performed entirely in your browser using JavaScript. No health data is sent to any server or stored anywhere.",
    },
    {
      q: "Does BMI apply to children?",
      a: "Standard BMI categories are designed for adults aged 20 and older. For children and teens, BMI is interpreted using age- and sex-specific percentile charts. This calculator uses adult categories only.",
    },
    {
      q: "What units can I use?",
      a: "You can choose between Metric (centimeters for height, kilograms for weight) and Imperial (feet and inches for height, pounds for weight). The calculator handles all conversions automatically.",
    },
  ],
};
