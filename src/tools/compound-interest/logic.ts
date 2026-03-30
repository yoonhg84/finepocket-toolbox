export type CompoundFrequency =
  | "daily"
  | "monthly"
  | "quarterly"
  | "semi-annually"
  | "annually";

export interface YearRow {
  year: number;
  totalInvested: number;
  interestEarned: number;
  balance: number;
}

export interface CompoundResult {
  finalAmount: number;
  totalInterest: number;
  totalInvested: number;
  yearByYear: YearRow[];
}

const FREQUENCY_MAP: Record<CompoundFrequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  "semi-annually": 2,
  annually: 1,
};

/**
 * Compound interest with optional regular monthly contributions.
 *
 * A = P(1 + r/n)^(nt) + PMT * ((1 + r/n)^(nt) - 1) / (r/n)
 *
 * For year-by-year breakdown, we compute iteratively.
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  frequency: CompoundFrequency,
  monthlyContribution: number = 0
): CompoundResult | null {
  if (principal < 0 || years <= 0 || annualRate < 0) return null;

  const n = FREQUENCY_MAP[frequency];
  const r = annualRate / 100;
  const ratePerPeriod = r / n;

  const yearByYear: YearRow[] = [];
  let balance = principal;
  let totalContributions = principal;

  for (let y = 1; y <= years; y++) {
    // Simulate each compounding period within this year
    const periodsPerYear = n;
    for (let p = 0; p < periodsPerYear; p++) {
      // Add interest for this period
      balance *= 1 + ratePerPeriod;

      // Add monthly contributions proportionally
      // If compounding is more frequent than monthly, distribute monthly contrib
      if (frequency === "daily") {
        balance += (monthlyContribution * 12) / 365;
        totalContributions += (monthlyContribution * 12) / 365;
      } else if (frequency === "monthly") {
        balance += monthlyContribution;
        totalContributions += monthlyContribution;
      } else if (frequency === "quarterly") {
        balance += monthlyContribution * 3;
        totalContributions += monthlyContribution * 3;
      } else if (frequency === "semi-annually") {
        balance += monthlyContribution * 6;
        totalContributions += monthlyContribution * 6;
      } else {
        // annually
        balance += monthlyContribution * 12;
        totalContributions += monthlyContribution * 12;
      }
    }

    yearByYear.push({
      year: y,
      totalInvested: Math.round(totalContributions * 100) / 100,
      interestEarned:
        Math.round((balance - totalContributions) * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  const finalAmount = Math.round(balance * 100) / 100;
  const totalInterest =
    Math.round((finalAmount - totalContributions) * 100) / 100;

  return {
    finalAmount,
    totalInterest,
    totalInvested: Math.round(totalContributions * 100) / 100,
    yearByYear,
  };
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}
