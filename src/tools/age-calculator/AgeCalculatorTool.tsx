"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import { calculateAge, calculateDateInterval, formatDate } from "./logic";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}

export function AgeCalculatorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [birthDate, setBirthDate] = useState("");
  const [intervalStart, setIntervalStart] = useState("");
  const [intervalEnd, setIntervalEnd] = useState("");

  const ageResult = useMemo(() => {
    if (!birthDate) return null;
    const date = new Date(birthDate + "T00:00:00");
    if (isNaN(date.getTime())) return null;
    return calculateAge(date);
  }, [birthDate]);

  const intervalResult = useMemo(() => {
    if (!intervalStart || !intervalEnd) return null;
    const start = new Date(intervalStart + "T00:00:00");
    const end = new Date(intervalEnd + "T00:00:00");
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
    return calculateDateInterval(start, end);
  }, [intervalStart, intervalEnd]);

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      {/* Date of Birth Input */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {ui("Date of Birth")}
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={todayStr}
          className="w-full sm:w-auto px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {ageResult && (
        <>
          {/* Exact Age */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3">
              {ui("Your Age")}
            </h3>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                {ageResult.years}
              </span>
              <span className="text-lg text-blue-600 dark:text-blue-400">{ui("years")}</span>
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                {ageResult.months}
              </span>
              <span className="text-lg text-blue-600 dark:text-blue-400">{ui("months")}</span>
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                {ageResult.days}
              </span>
              <span className="text-lg text-blue-600 dark:text-blue-400">{ui("days")}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label={ui("Total Days")}
              value={ageResult.totalDays.toLocaleString()}
            />
            <StatCard
              label={ui("Total Hours")}
              value={ageResult.totalHours.toLocaleString()}
            />
            <StatCard
              label={ui("Total Minutes")}
              value={ageResult.totalMinutes.toLocaleString()}
            />
            <StatCard
              label={ui("Next Birthday")}
              value={
                ageResult.nextBirthdayDays === 0
                  ? ui("Today!")
                  : `${ageResult.nextBirthdayDays}`
              }
              sub={
                ageResult.nextBirthdayDays === 0
                  ? undefined
                  : locale === "ko"
                    ? `${ageResult.nextBirthdayDays}일 남음`
                    : `day${ageResult.nextBirthdayDays === 1 ? "" : "s"} away`
              }
            />
            <StatCard label={ui("Born On")} value={ageResult.dayOfWeek} />
            <StatCard
              label={ui("Zodiac")}
              value={ageResult.zodiacSign}
              sub={
                locale === "ko"
                  ? `${ageResult.chineseZodiac} (띠)`
                  : `${ageResult.chineseZodiac} (Chinese)`
              }
            />
          </div>

          {/* Additional Info */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {ui("Details")}
            </h3>
            <InfoRow
              label={ui("Date of Birth")}
              value={formatDate(new Date(birthDate + "T00:00:00"))}
            />
            <InfoRow label={ui("Day of Week")} value={ageResult.dayOfWeek} />
            <InfoRow label={ui("Western Zodiac")} value={ageResult.zodiacSign} />
            <InfoRow
              label={ui("Chinese Zodiac")}
              value={ageResult.chineseZodiac}
            />
            <InfoRow
              label={ui("Next Birthday In")}
              value={
                ageResult.nextBirthdayDays === 0
                  ? ui("Today!")
                  : locale === "ko"
                    ? `${ageResult.nextBirthdayDays}일`
                    : `${ageResult.nextBirthdayDays} day${ageResult.nextBirthdayDays === 1 ? "" : "s"}`
              }
            />
          </div>
        </>
      )}

      {/* Date Interval Calculator */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {ui("Date Interval Calculator")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {ui("Calculate the time between any two dates")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {ui("Start Date")}
            </label>
            <input
              type="date"
              value={intervalStart}
              onChange={(e) => setIntervalStart(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {ui("End Date")}
            </label>
            <input
              type="date"
              value={intervalEnd}
              onChange={(e) => setIntervalEnd(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {intervalResult && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              label={ui("Years")}
              value={intervalResult.years.toString()}
            />
            <StatCard
              label={ui("Months")}
              value={intervalResult.months.toString()}
            />
            <StatCard
              label={ui("Days")}
              value={intervalResult.days.toString()}
            />
            <StatCard
              label={ui("Total Days")}
              value={intervalResult.totalDays.toLocaleString()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
