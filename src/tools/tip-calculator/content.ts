import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Tip Calculator",
  description:
    "Calculate tips and split bills among friends instantly. Choose preset tip percentages or enter a custom amount, adjust the number of people, and see per-person totals with a round-up option.",
  whatIs:
    "A Tip Calculator is a practical everyday tool that takes the awkwardness and mental math out of tipping at restaurants, cafes, bars, and other service establishments. You enter your bill total, select or type a tip percentage, and specify how many people are splitting the check. The calculator instantly shows the tip amount, the grand total, the tip per person, and the total each person owes. It also offers a convenient round-up feature that bumps each person's share to the nearest whole dollar, making cash payments and Venmo splits simpler. Preset buttons for the most common tip percentages — 15%, 18%, 20%, and 25% — let you tap once and see the result, while a custom input field lets you enter any percentage for situations like exceptional service or international tipping norms. Whether you are dining solo and want a quick answer, or you are splitting a large group dinner with friends, this tool handles the math so you can focus on enjoying the meal. All calculations run in your browser with no server calls, so it works even without an internet connection.",
  howToUse:
    "Start by entering the total bill amount in the first field. Next, select a tip percentage by tapping one of the preset buttons (15%, 18%, 20%, or 25%) or enter a custom percentage in the input field. Then adjust the number of people sharing the bill using the plus and minus stepper buttons (1 to 20). The results update instantly: you will see the tip amount, the total including tip, the tip per person, and the total per person. Toggle the round-up option to see each person's share rounded to the nearest whole dollar for easier splitting.",
  howItWorks:
    "The tip amount is calculated by multiplying the bill by the tip percentage divided by 100. The grand total is the bill plus the tip. Per-person amounts are computed by dividing the tip and total by the number of people. The round-up feature applies Math.ceil to each person's total, ensuring no one underpays. All arithmetic uses standard JavaScript floating-point math and results are formatted to two decimal places for currency display.",
  useCases: [
    "Calculate a fair tip at restaurants, cafes, or bars",
    "Split a group dinner bill evenly among friends or colleagues",
    "Compare different tip percentages to decide how much to leave",
    "Round up totals for easier cash or mobile payment splits",
    "Determine per-person costs for large party or event catering bills",
    "Use internationally where custom tip percentages vary by country",
  ],
  faq: [
    {
      q: "What is the standard tip percentage in the United States?",
      a: "In the United States, 15–20% is the standard tip for sit-down restaurant service. 15% is considered adequate, 18% is average, and 20% or more reflects good to excellent service. For exceptional service, 25% or higher is common.",
    },
    {
      q: "How does the round-up feature work?",
      a: "The round-up feature takes each person's total (bill share plus tip share) and rounds it up to the nearest whole dollar using the ceiling function. This makes it easier to split with cash or simple Venmo amounts. The slight extra goes toward a marginally higher tip.",
    },
    {
      q: "Can I split the bill unevenly?",
      a: "This calculator splits the bill evenly among all people. For uneven splits where each person pays for what they ordered, you would need to calculate each person's subtotal separately and apply the tip percentage to each individual amount.",
    },
    {
      q: "Should I tip on the pre-tax or post-tax amount?",
      a: "Etiquette experts generally recommend tipping on the pre-tax subtotal. However, tipping on the post-tax total is also common and simpler since that is usually the prominent number on the receipt. The difference is typically small.",
    },
    {
      q: "Does this tool work offline?",
      a: "Yes. Once the page has loaded, all calculations run entirely in your browser using JavaScript. No internet connection is needed, and no data is sent to any server.",
    },
    {
      q: "Why is the per-person tip different when rounded up?",
      a: "When you enable round-up, each person's total is rounded up independently. The implied tip per person is then recalculated as the rounded total minus their share of the original bill. This means the effective tip percentage may be slightly higher than what you selected.",
    },
  ],
};
