import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Currency Converter",

  description:
    "Convert between 30+ world currencies with live exchange rates. Free online currency converter with real-time rates, swap function, and popular conversion table.",

  whatIs:
    "A Currency Converter is a tool that calculates how much one currency is worth in another using current exchange rates. This free online converter supports over 30 major world currencies including USD, EUR, GBP, JPY, KRW, CNY, and many more. Simply enter an amount, choose your source and target currencies, and get an instant conversion. The tool displays the exchange rate in both directions (e.g., 1 USD = 0.92 EUR and 1 EUR = 1.09 USD) along with the converted amount. A one-click swap button lets you quickly reverse the conversion. Below the converter, a table of popular currency pairs provides at-a-glance reference rates. Exchange rates are fetched from a reliable open API and cached hourly to provide reasonably current data. Please note that exchange rates shown are for informational reference only and actual transaction rates at banks or exchange services may differ.",

  howToUse:
    "1. Enter the amount you want to convert in the 'Amount' field. 2. Select the source currency from the 'From' dropdown — you can type to search by currency name or code. 3. Select the target currency from the 'To' dropdown. 4. The converted amount, exchange rate, and reverse rate appear instantly. 5. Click the swap button between the two currency selectors to quickly reverse the direction. 6. Scroll down to see a table of popular conversion pairs with current rates. 7. The 'Last updated' timestamp shows when the exchange rates were last refreshed.",

  howItWorks:
    "The tool fetches live exchange rates from an open exchange-rate API via a server-side proxy that caches responses for one hour to ensure fast load times and reduce API calls. All rates are based on USD as the base currency. To convert between any two currencies, the tool divides the target currency's USD rate by the source currency's USD rate to obtain the cross rate, then multiplies the input amount by this rate. The conversion formula is: converted = amount * (toRate / fromRate). All arithmetic is performed in JavaScript using standard floating-point numbers, and results are formatted with appropriate decimal places for each currency (e.g., 0 decimals for JPY and KRW, 2 decimals for most others).",

  useCases: [
    "Check exchange rates before international travel or foreign purchases",
    "Compare prices of products listed in different currencies while shopping online",
    "Calculate salary or freelance payments when working with international clients",
    "Estimate costs for international money transfers or remittances",
    "Monitor exchange rate trends for popular currency pairs",
    "Convert budget amounts when planning events or purchases across countries",
  ],

  faq: [
    {
      q: "How current are the exchange rates?",
      a: "Exchange rates are fetched from an open API and cached for one hour. The 'Last updated' timestamp on the page shows exactly when the rates were last refreshed. For time-sensitive transactions, always confirm the rate with your bank or financial institution.",
    },
    {
      q: "Are these rates the same as what my bank offers?",
      a: "No. The rates shown here are mid-market (interbank) reference rates. Banks and exchange services typically add a margin or fee on top of the mid-market rate. The actual rate you receive for a transaction will differ. Always confirm with your financial institution before making transfers.",
    },
    {
      q: "Which currencies are supported?",
      a: "The converter supports over 30 major currencies including USD, EUR, GBP, JPY, KRW, CNY, CAD, AUD, CHF, HKD, SGD, TWD, THB, VND, INR, BRL, MXN, ZAR, SEK, NOK, DKK, NZD, RUB, TRY, AED, SAR, PHP, IDR, MYR, and PLN.",
    },
    {
      q: "Why do some currencies show no decimal places?",
      a: "Currencies like JPY (Japanese Yen), KRW (Korean Won), and VND (Vietnamese Dong) have very small unit values, so they are conventionally displayed without decimal places. Other currencies like USD and EUR use two decimal places as is standard.",
    },
    {
      q: "Is my data stored or sent to a server?",
      a: "The only network request is to fetch exchange rates from our API proxy. The amounts you enter and the conversions you perform are calculated entirely in your browser and are never stored, logged, or transmitted.",
    },
    {
      q: "Can I use these rates for financial decisions?",
      a: "Exchange rates shown are for reference only. Actual transaction rates may differ depending on your bank, payment provider, and the type of transaction. For important financial decisions, please confirm rates with your financial institution.",
    },
  ],
};
