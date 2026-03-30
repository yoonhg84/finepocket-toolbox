export interface TipResult {
  tipAmount: number;
  totalAmount: number;
  tipPerPerson: number;
  totalPerPerson: number;
  roundedTotal: number;
  roundedTipPerPerson: number;
  roundedTotalPerPerson: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  numberOfPeople: number
): TipResult {
  if (billAmount <= 0 || tipPercent < 0 || numberOfPeople < 1) {
    return {
      tipAmount: 0,
      totalAmount: 0,
      tipPerPerson: 0,
      totalPerPerson: 0,
      roundedTotal: 0,
      roundedTipPerPerson: 0,
      roundedTotalPerPerson: 0,
    };
  }

  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const tipPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = totalAmount / numberOfPeople;

  // Round up total to nearest dollar
  const roundedTotal = Math.ceil(totalAmount);
  const roundedTotalPerPerson = Math.ceil(totalPerPerson);
  const roundedTipPerPerson =
    roundedTotalPerPerson - billAmount / numberOfPeople;

  return {
    tipAmount,
    totalAmount,
    tipPerPerson,
    totalPerPerson,
    roundedTotal,
    roundedTipPerPerson,
    roundedTotalPerPerson,
  };
}

export function formatCurrency(amount: number): string {
  if (!isFinite(amount)) return "$0.00";
  return `$${amount.toFixed(2)}`;
}
