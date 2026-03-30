"use client";

import { useState, useMemo } from "react";
import { TabGroup } from "@/components/ui/TabGroup";
import {
  addSubtractDate,
  dateDifference,
  toInputDateString,
  parseInputDate,
  formatDate,
  getDayOfWeek,
  type TimeUnit,
} from "./logic";

type Mode = "add-subtract" | "between";

const TABS = [
  { id: "add-subtract", label: "Add / Subtract" },
  { id: "between", label: "Between Dates" },
];

const UNIT_OPTIONS: { value: TimeUnit; label: string }[] = [
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
  { value: "months", label: "Months" },
  { value: "years", label: "Years" },
];

export function DateCalculatorTool() {
  const [mode, setMode] = useState<Mode>("add-subtract");

  // Add/Subtract state
  const [baseDate, setBaseDate] = useState(toInputDateString(new Date()));
  const [amount, setAmount] = useState(30);
  const [unit, setUnit] = useState<TimeUnit>("days");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [businessOnly, setBusinessOnly] = useState(false);

  // Between Dates state
  const [startDate, setStartDate] = useState(toInputDateString(new Date()));
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return toInputDateString(d);
  });
  const [includeEndDate, setIncludeEndDate] = useState(false);

  // Add/Subtract result
  const addSubResult = useMemo(() => {
    const base = parseInputDate(baseDate);
    if (!base || amount < 0) return null;
    return addSubtractDate(base, amount, unit, operation, businessOnly);
  }, [baseDate, amount, unit, operation, businessOnly]);

  // Between Dates result
  const diffResult = useMemo(() => {
    const start = parseInputDate(startDate);
    const end = parseInputDate(endDate);
    if (!start || !end) return null;
    return dateDifference(start, end, includeEndDate);
  }, [startDate, endDate, includeEndDate]);

  return (
    <div className="space-y-4">
      <TabGroup
        tabs={TABS}
        activeTab={mode}
        onChange={(id) => setMode(id as Mode)}
      />

      {mode === "add-subtract" && (
        <div className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="base-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Base Date
              </label>
              <input
                id="base-date"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                min={0}
                value={amount}
                onChange={(e) =>
                  setAmount(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <div className="flex gap-1">
                {UNIT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setUnit(opt.value)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                      unit === opt.value
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operation
              </label>
              <div className="flex gap-1">
                {(["add", "subtract"] as const).map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperation(op)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                      operation === op
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {op === "add" ? "+ Add" : "- Subtract"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Business days toggle — only for days and weeks */}
          {(unit === "days" || unit === "weeks") && (
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={businessOnly}
                onChange={(e) => setBusinessOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Business days only (exclude Sat &amp; Sun)
            </label>
          )}

          {/* Result */}
          {addSubResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-sm text-gray-600 mb-1">Result Date</p>
              <p className="text-2xl font-bold text-gray-900">
                {addSubResult.formattedDate}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {addSubResult.dayOfWeek}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {amount} {unit}
                {businessOnly ? " (business days)" : ""}{" "}
                {operation === "add" ? "after" : "before"}{" "}
                {(() => {
                  const d = parseInputDate(baseDate);
                  return d ? formatDate(d) : baseDate;
                })()}
              </p>
            </div>
          )}
        </div>
      )}

      {mode === "between" && (
        <div className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Include end date in count
          </label>

          {/* Result */}
          {diffResult && (
            <div className="space-y-4">
              {/* Total days highlight */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 mb-1">Total Days</p>
                <p className="text-4xl font-bold text-gray-900">
                  {diffResult.totalDays.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {diffResult.weeks.toLocaleString()} weeks and{" "}
                  {diffResult.remainingDays} days
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {diffResult.years}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {diffResult.years === 1 ? "Year" : "Years"}
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {diffResult.months}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {diffResult.months === 1 ? "Month" : "Months"}
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {diffResult.days}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {diffResult.days === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>

              {/* Date info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Start</p>
                  <p className="font-medium text-gray-800">
                    {(() => {
                      const d = parseInputDate(startDate);
                      return d
                        ? `${formatDate(d)} (${getDayOfWeek(d)})`
                        : startDate;
                    })()}
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500">End</p>
                  <p className="font-medium text-gray-800">
                    {(() => {
                      const d = parseInputDate(endDate);
                      return d
                        ? `${formatDate(d)} (${getDayOfWeek(d)})`
                        : endDate;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
