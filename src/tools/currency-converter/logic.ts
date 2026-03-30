/**
 * Pure logic functions for Currency Converter tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

export interface CurrencyInfo {
  code: string;
  name: string;
  flag: string;
}

export interface ConversionResult {
  convertedAmount: number;
  rate: number;
  reverseRate: number;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "EUR", name: "Euro", flag: "\u{1F1EA}\u{1F1FA}" },
  { code: "GBP", name: "British Pound", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "JPY", name: "Japanese Yen", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "KRW", name: "South Korean Won", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "CNY", name: "Chinese Yuan", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "CAD", name: "Canadian Dollar", flag: "\u{1F1E8}\u{1F1E6}" },
  { code: "AUD", name: "Australian Dollar", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "CHF", name: "Swiss Franc", flag: "\u{1F1E8}\u{1F1ED}" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "\u{1F1ED}\u{1F1F0}" },
  { code: "SGD", name: "Singapore Dollar", flag: "\u{1F1F8}\u{1F1EC}" },
  { code: "TWD", name: "New Taiwan Dollar", flag: "\u{1F1F9}\u{1F1FC}" },
  { code: "THB", name: "Thai Baht", flag: "\u{1F1F9}\u{1F1ED}" },
  { code: "VND", name: "Vietnamese Dong", flag: "\u{1F1FB}\u{1F1F3}" },
  { code: "INR", name: "Indian Rupee", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "BRL", name: "Brazilian Real", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "MXN", name: "Mexican Peso", flag: "\u{1F1F2}\u{1F1FD}" },
  { code: "ZAR", name: "South African Rand", flag: "\u{1F1FF}\u{1F1E6}" },
  { code: "SEK", name: "Swedish Krona", flag: "\u{1F1F8}\u{1F1EA}" },
  { code: "NOK", name: "Norwegian Krone", flag: "\u{1F1F3}\u{1F1F4}" },
  { code: "DKK", name: "Danish Krone", flag: "\u{1F1E9}\u{1F1F0}" },
  { code: "NZD", name: "New Zealand Dollar", flag: "\u{1F1F3}\u{1F1FF}" },
  { code: "RUB", name: "Russian Ruble", flag: "\u{1F1F7}\u{1F1FA}" },
  { code: "TRY", name: "Turkish Lira", flag: "\u{1F1F9}\u{1F1F7}" },
  { code: "AED", name: "UAE Dirham", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "SAR", name: "Saudi Riyal", flag: "\u{1F1F8}\u{1F1E6}" },
  { code: "PHP", name: "Philippine Peso", flag: "\u{1F1F5}\u{1F1ED}" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "\u{1F1EE}\u{1F1E9}" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "\u{1F1F2}\u{1F1FE}" },
  { code: "PLN", name: "Polish Zloty", flag: "\u{1F1F5}\u{1F1F1}" },
];

/**
 * Convert an amount from one currency to another using USD-based rates.
 */
export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  rates: Record<string, number>
): ConversionResult | null {
  const fromRate = rates[fromCode];
  const toRate = rates[toCode];

  if (fromRate == null || toRate == null || fromRate === 0) return null;

  // Convert: amount in FROM -> USD -> TO
  const rate = toRate / fromRate;
  const reverseRate = fromRate / toRate;
  const convertedAmount = amount * rate;

  return { convertedAmount, rate, reverseRate };
}

/**
 * Format a currency amount with appropriate decimal places.
 * Currencies like JPY, KRW, VND use 0 decimals.
 */
export function formatCurrencyAmount(
  amount: number,
  currencyCode: string
): string {
  const zeroDecimalCurrencies = [
    "JPY",
    "KRW",
    "VND",
    "IDR",
    "CLP",
    "ISK",
    "HUF",
  ];
  const decimals = zeroDecimalCurrencies.includes(currencyCode) ? 0 : 2;

  return amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format an exchange rate with sufficient precision.
 */
export function formatRate(rate: number): string {
  if (rate >= 100) return rate.toFixed(2);
  if (rate >= 1) return rate.toFixed(4);
  return rate.toFixed(6);
}

/** Popular conversion pairs for the table */
export const POPULAR_PAIRS = [
  ["USD", "EUR"],
  ["USD", "GBP"],
  ["USD", "JPY"],
  ["USD", "KRW"],
  ["USD", "CNY"],
  ["EUR", "GBP"],
  ["EUR", "JPY"],
  ["GBP", "JPY"],
  ["USD", "CAD"],
  ["USD", "AUD"],
  ["USD", "CHF"],
  ["USD", "INR"],
];
