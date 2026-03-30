"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  calculateCompoundInterest,
  formatNumber,
  type CompoundFrequency,
} from "./logic";

const CompoundAreaChart = dynamic(
  () => import("./CompoundAreaChart").then((m) => m),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const FREQUENCY_OPTIONS: { value: CompoundFrequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semi-annually", label: "Semi-Annually" },
  { value: "annually", label: "Annually" },
];

export function CompoundInterestTool() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");
  const [frequency, setFrequency] = useState<CompoundFrequency>("monthly");
  const [monthlyContrib, setMonthlyContrib] = useState("200");

  const result = useMemo(() => {
    const p = parseFloat(principal.replace(/,/g, ""));
    const r = parseFloat(rate);
    const y = parseInt(years, 10);
    const m = parseFloat(monthlyContrib.replace(/,/g, "")) || 0;
    if (isNaN(p) || isNaN(r) || isNaN(y)) return null;
    return calculateCompoundInterest(p, r, y, frequency, m);
  }, [principal, rate, years, frequency, monthlyContrib]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Investment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              type="text"
              value={principal}
              onChange={(e) =>
                setPrincipal(e.target.value.replace(/[^0-9.]/g, ""))
              }
              placeholder=""
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate: {rate}%
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
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Period: {years} years
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min="1"
              max="100"
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-sm text-gray-500">yr</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compounding Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value as CompoundFrequency)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {FREQUENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Contribution (optional)
          </label>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              type="text"
              value={monthlyContrib}
              onChange={(e) =>
                setMonthlyContrib(e.target.value.replace(/[^0-9.]/g, ""))
              }
              placeholder=""
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 pt-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">Final Amount</p>
              <p className="text-2xl font-bold text-green-700">
                ${formatNumber(result.finalAmount)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-blue-700">
                ${formatNumber(result.totalInvested)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-purple-700">
                ${formatNumber(result.totalInterest)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Growth Over Time
            </h3>
            <CompoundAreaChart yearByYear={result.yearByYear} />
          </div>

          {/* Year-by-Year Table */}
          <div className="max-h-96 overflow-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    Year
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    Total Invested
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    Interest Earned
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.yearByYear.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="px-3 py-1.5 text-gray-700">{row.year}</td>
                    <td className="px-3 py-1.5 text-right text-blue-600">
                      ${formatNumber(row.totalInvested)}
                    </td>
                    <td className="px-3 py-1.5 text-right text-purple-600">
                      ${formatNumber(row.interestEarned)}
                    </td>
                    <td className="px-3 py-1.5 text-right font-medium text-gray-900">
                      ${formatNumber(row.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* YMYL Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>Disclaimer:</strong> This calculator provides estimates for
            educational and informational purposes only. Actual investment
            returns vary and are not guaranteed. Past performance does not
            predict future results. Consult a financial professional before
            making investment decisions.
          </div>
        </div>
      )}
    </div>
  );
}
