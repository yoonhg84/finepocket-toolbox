"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { TabGroup } from "@/components/ui/TabGroup";
import { getToolUiText } from "@/tools/ui-text";
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
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
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
        tabs={TABS.map((tab) => ({ ...tab, label: locale === "ko" ? (tab.id === "add-subtract" ? "더하기 / 빼기" : "날짜 사이") : tab.label }))}
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {ui("Base Date")}
              </label>
              <input
                id="base-date"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {ui("Amount")}
              </label>
              <input
                id="amount"
                type="number"
                min={0}
                value={amount}
                onChange={(e) =>
                  setAmount(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {ui("Unit")}
              </label>
              <div className="flex gap-1">
                {UNIT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setUnit(opt.value)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                      unit === opt.value
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {ui(opt.label)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {ui("Operation")}
              </label>
              <div className="flex gap-1">
                {(["add", "subtract"] as const).map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperation(op)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                      operation === op
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {op === "add" ? ui("+ Add") : ui("- Subtract")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Business days toggle — only for days and weeks */}
          {(unit === "days" || unit === "weeks") && (
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={businessOnly}
                onChange={(e) => setBusinessOnly(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              {ui("Business days only (exclude Sat & Sun)")}
            </label>
          )}

          {/* Result */}
          {addSubResult && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-5">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ui("Result Date")}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {addSubResult.formattedDate}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {addSubResult.dayOfWeek}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {locale === "ko"
                  ? `${amount}${unit === "days" ? "일" : unit === "weeks" ? "주" : unit === "months" ? "개월" : "년"}${businessOnly ? " (영업일 기준)" : ""} ${operation === "add" ? "후" : "전"}`
                  : `${amount} ${unit}${businessOnly ? " (business days)" : ""} ${operation === "add" ? "after" : "before"}`}{" "}
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {ui("Start Date")}
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {ui("End Date")}
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            {ui("Include end date in count")}
          </label>

          {/* Result */}
          {diffResult && (
            <div className="space-y-4">
              {/* Total days highlight */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ui("Total Days")}</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {diffResult.totalDays.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {locale === "ko"
                    ? `${diffResult.weeks.toLocaleString()}주 ${diffResult.remainingDays}일`
                    : `${diffResult.weeks.toLocaleString()} weeks and ${diffResult.remainingDays} days`}
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {diffResult.years}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{diffResult.years === 1 ? ui("Year") : ui("Years")}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {diffResult.months}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{diffResult.months === 1 ? ui("Month") : ui("Months")}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {diffResult.days}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{diffResult.days === 1 ? ui("Day") : ui("Days")}</p>
                </div>
              </div>

              {/* Date info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ui("Start")}</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {(() => {
                      const d = parseInputDate(startDate);
                      return d
                        ? `${formatDate(d)} (${getDayOfWeek(d)})`
                        : startDate;
                    })()}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ui("End")}</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
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
