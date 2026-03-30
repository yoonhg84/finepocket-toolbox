export type RepaymentMethod = "equal-payment" | "equal-principal" | "bullet";
export type Currency = "KRW" | "USD";

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

/**
 * Equal Payment (원리금균등상환)
 * PMT = P * r(1+r)^n / ((1+r)^n - 1)
 */
function calculateEqualPayment(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  const schedule: AmortizationRow[] = [];

  if (monthlyRate === 0) {
    const monthlyPayment = principal / months;
    let balance = principal;
    for (let m = 1; m <= months; m++) {
      balance -= monthlyPayment;
      schedule.push({
        month: m,
        payment: monthlyPayment,
        principal: monthlyPayment,
        interest: 0,
        balance: Math.max(balance, 0),
      });
    }
    return {
      monthlyPayment,
      totalPayment: principal,
      totalInterest: 0,
      schedule,
    };
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);

  let balance = principal;
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const principalPart = monthlyPayment - interest;
    balance -= principalPart;
    totalInterest += interest;

    schedule.push({
      month: m,
      payment: Math.round(monthlyPayment),
      principal: Math.round(principalPart),
      interest: Math.round(interest),
      balance: Math.max(Math.round(balance), 0),
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(monthlyPayment * months),
    totalInterest: Math.round(totalInterest),
    schedule,
  };
}

/**
 * Equal Principal (원금균등상환)
 * Monthly principal = P/n, monthly interest = remaining * r
 */
function calculateEqualPrincipal(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  const schedule: AmortizationRow[] = [];
  const monthlyPrincipal = principal / months;
  let balance = principal;
  let totalInterest = 0;
  let totalPayment = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const payment = monthlyPrincipal + interest;
    balance -= monthlyPrincipal;
    totalInterest += interest;
    totalPayment += payment;

    schedule.push({
      month: m,
      payment: Math.round(payment),
      principal: Math.round(monthlyPrincipal),
      interest: Math.round(interest),
      balance: Math.max(Math.round(balance), 0),
    });
  }

  return {
    monthlyPayment: Math.round(schedule[0]?.payment ?? 0),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    schedule,
  };
}

/**
 * Bullet (만기일시상환)
 * Interest only monthly, principal at end
 */
function calculateBullet(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  const schedule: AmortizationRow[] = [];
  const monthlyInterest = principal * monthlyRate;
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const isLast = m === months;
    const payment = isLast
      ? monthlyInterest + principal
      : monthlyInterest;
    const principalPart = isLast ? principal : 0;
    const balance = isLast ? 0 : principal;
    totalInterest += monthlyInterest;

    schedule.push({
      month: m,
      payment: Math.round(payment),
      principal: Math.round(principalPart),
      interest: Math.round(monthlyInterest),
      balance,
    });
  }

  return {
    monthlyPayment: Math.round(monthlyInterest),
    totalPayment: Math.round(principal + totalInterest),
    totalInterest: Math.round(totalInterest),
    schedule,
  };
}

export function calculateLoan(
  principal: number,
  annualRate: number,
  months: number,
  method: RepaymentMethod
): LoanResult | null {
  if (principal <= 0 || months <= 0 || annualRate < 0) return null;

  const monthlyRate = annualRate / 100 / 12;

  switch (method) {
    case "equal-payment":
      return calculateEqualPayment(principal, monthlyRate, months);
    case "equal-principal":
      return calculateEqualPrincipal(principal, monthlyRate, months);
    case "bullet":
      return calculateBullet(principal, monthlyRate, months);
  }
}

export function formatCurrency(value: number, currency: Currency): string {
  if (currency === "KRW") {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}
