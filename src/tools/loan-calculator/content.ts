import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Loan Calculator",

  description:
    "Calculate monthly loan payments, total interest, and view a full amortization schedule. Supports equal payment, equal principal, and bullet repayment methods.",

  whatIs:
    "A loan calculator is an essential financial planning tool that helps you understand the true cost of borrowing money. Whether you are taking out a mortgage, car loan, personal loan, or business loan, this calculator shows your monthly payment, total amount paid over the life of the loan, and total interest cost. It supports three common repayment methods: Equal Payment (fixed monthly payments where principal and interest shift over time), Equal Principal (fixed principal portion with decreasing interest), and Bullet (interest-only payments with principal due at maturity). The interactive amortization schedule and charts help you visualize how your loan balance decreases over time.",

  howToUse:
    "1. Enter the loan amount and select your currency (KRW or USD). 2. Set the annual interest rate using the slider or input field. 3. Choose the loan term in months or years. 4. Select a repayment method: Equal Payment, Equal Principal, or Bullet. 5. View your monthly payment, total payment, total interest, and visual breakdowns including a pie chart and balance-over-time line chart. 6. Scroll down to see the full month-by-month amortization schedule.",

  howItWorks:
    "For Equal Payment (fixed installment), the calculator uses the standard annuity formula: PMT = P x r(1+r)^n / ((1+r)^n - 1), where P is principal, r is the monthly interest rate, and n is the number of months. For Equal Principal, each monthly principal portion is P/n, with interest calculated on the remaining balance. For Bullet repayment, only interest is paid monthly, and the entire principal is due in the final month. All calculations run entirely in your browser.",

  useCases: [
    "Planning mortgage payments and comparing different loan terms",
    "Comparing repayment methods to find the one with the lowest total interest cost",
    "Budgeting for car loans or personal loans by understanding monthly obligations",
    "Analyzing how extra payments can shorten loan duration and reduce interest",
    "Business loan planning with different repayment structures",
    "Understanding the amortization schedule to see how principal and interest change over time",
  ],

  faq: [
    {
      q: "Which repayment method is cheapest?",
      a: "Equal Principal repayment typically results in the lowest total interest because the principal decreases faster, reducing the interest charged each month. However, it starts with higher monthly payments compared to Equal Payment. Bullet repayment has the highest total interest since the full principal remains outstanding for the entire term.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. All calculations are performed entirely in your browser using JavaScript. No financial data is sent to any server or stored anywhere.",
    },
    {
      q: "Can I calculate mortgages with this tool?",
      a: "Yes. This calculator works for any fixed-rate loan including mortgages, car loans, personal loans, and business loans. Simply enter the loan amount, interest rate, and term.",
    },
    {
      q: "What is the difference between Equal Payment and Equal Principal?",
      a: "Equal Payment keeps your monthly payment the same throughout the loan — early payments are mostly interest, shifting to mostly principal later. Equal Principal keeps the principal portion constant each month, so total payments decrease over time as the interest portion shrinks.",
    },
    {
      q: "Does this account for taxes and insurance?",
      a: "No. This calculator shows principal and interest only. For a full mortgage payment estimate, you would need to add property taxes, homeowner's insurance, and any mortgage insurance separately. Consult a financial professional for comprehensive planning.",
    },
  ],
};
