"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import {
  calculateLoan,
  formatCurrency,
  type RepaymentMethod,
  type Currency,
  type LoanResult,
} from "./logic";

const LoanPieChart = dynamic(() => import("./LoanPieChart").then((m) => m), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />,
});

const LoanLineChart = dynamic(() => import("./LoanLineChart").then((m) => m), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />,
});

type TermUnit = "months" | "years";

const METHOD_OPTIONS: { value: RepaymentMethod; label: string; labelKr: string }[] = [
  { value: "equal-payment", label: "Equal Payment", labelKr: "원리금균등" },
  { value: "equal-principal", label: "Equal Principal", labelKr: "원금균등" },
  { value: "bullet", label: "Bullet", labelKr: "만기일시" },
];

export function LoanCalculatorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [amount, setAmount] = useState("100000000");
  const [currency, setCurrency] = useState<Currency>("KRW");
  const [rate, setRate] = useState("5");
  const [termValue, setTermValue] = useState("30");
  const [termUnit, setTermUnit] = useState<TermUnit>("years");
  const [method, setMethod] = useState<RepaymentMethod>("equal-payment");
  const [showSchedule, setShowSchedule] = useState(false);

  const months =
    termUnit === "years"
      ? Math.round(parseFloat(termValue) * 12)
      : Math.round(parseFloat(termValue));

  const result: LoanResult | null = useMemo(() => {
    const p = parseFloat(amount.replace(/,/g, ""));
    const r = parseFloat(rate);
    if (isNaN(p) || isNaN(r) || isNaN(months)) return null;
    return calculateLoan(p, r, months, method);
  }, [amount, rate, months, method]);

  const fmt = (v: number) => formatCurrency(v, currency);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {ui("Loan Amount")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder=""
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="KRW">&#8361; KRW</option>
              <option value="USD">$ USD</option>
            </select>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {locale === "ko" ? `연 이자율: ${rate}%` : `Annual Interest Rate: ${rate}%`}
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="0"
              max="100"
              step="0.1"
              className="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {locale === "ko"
              ? `대출 기간: ${termValue} ${termUnit === "years" ? "년" : "개월"}`
              : `Loan Term: ${termValue} ${termUnit}`}
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min="1"
              max={termUnit === "years" ? "40" : "480"}
              step="1"
              value={termValue}
              onChange={(e) => setTermValue(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={termValue}
              onChange={(e) => setTermValue(e.target.value)}
              min="1"
              className="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <select
              value={termUnit}
              onChange={(e) => {
                const newUnit = e.target.value as TermUnit;
                if (newUnit === "months" && termUnit === "years") {
                  setTermValue(String(Math.round(parseFloat(termValue) * 12)));
                } else if (newUnit === "years" && termUnit === "months") {
                  setTermValue(
                    String(Math.round(parseFloat(termValue) / 12))
                  );
                }
                setTermUnit(newUnit);
              }}
              className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="years">{ui("Years")}</option>
              <option value="months">{ui("Months")}</option>
            </select>
          </div>
        </div>

        {/* Repayment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {ui("Repayment Method")}
          </label>
          <div className="flex gap-1">
            {METHOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMethod(opt.value)}
                className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                  method === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span className="block">
                  {locale === "ko" ? ui(opt.label) : opt.label}
                </span>
                {locale !== "ko" && (
                  <span className="block text-[10px] opacity-75">
                    {opt.labelKr}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 pt-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {method === "equal-principal"
                  ? ui("First Monthly Payment")
                  : ui("Monthly Payment")}
              </p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {fmt(result.monthlyPayment)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{ui("Total Payment")}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {fmt(result.totalPayment)}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{ui("Total Interest")}</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {fmt(result.totalInterest)}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {ui("Principal vs Interest")}
              </h3>
              <LoanPieChart
                principal={result.totalPayment - result.totalInterest}
                interest={result.totalInterest}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {ui("Balance Over Time")}
              </h3>
              <LoanLineChart schedule={result.schedule} />
            </div>
          </div>

          {/* Amortization Schedule */}
          <div>
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              {showSchedule ? ui("Hide") : ui("Show")} {ui("Amortization Schedule")} (
              {result.schedule.length} {locale === "ko" ? "개월" : "months"})
            </button>
            {showSchedule && (
              <div className="mt-3 max-h-96 overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                        {ui("Month")}
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                        {ui("Payment")}
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                        {ui("Principal")}
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                        {ui("Interest")}
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                        {ui("Balance")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-3 py-1.5 text-gray-700 dark:text-gray-300">
                          {row.month}
                        </td>
                        <td className="px-3 py-1.5 text-right text-gray-900 dark:text-gray-100">
                          {fmt(row.payment)}
                        </td>
                        <td className="px-3 py-1.5 text-right text-blue-600 dark:text-blue-400">
                          {fmt(row.principal)}
                        </td>
                        <td className="px-3 py-1.5 text-right text-red-500 dark:text-red-400">
                          {fmt(row.interest)}
                        </td>
                        <td className="px-3 py-1.5 text-right text-gray-700 dark:text-gray-300">
                          {fmt(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* YMYL Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
            <strong>{ui("Disclaimer:")}</strong>{" "}
            {locale === "ko"
              ? "이 계산기는 참고용 추정 결과만 제공합니다. 실제 대출 조건, 납입금, 이자는 달라질 수 있습니다. 대출 의사결정 전에는 금융 전문가와 상담하세요."
              : "This calculator provides estimates for informational purposes only. Actual loan terms, payments, and interest may vary. Consult a financial professional before making borrowing decisions."}
          </div>
        </div>
      )}
    </div>
  );
}
