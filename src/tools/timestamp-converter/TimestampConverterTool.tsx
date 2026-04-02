"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  timestampToFormats,
  dateToTimestamp,
  getCurrentTimestamp,
  getDateInfo,
} from "./logic";

export function TimestampConverterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);

  // Live clock state
  const [now, setNow] = useState(getCurrentTimestamp);

  // Timestamp -> Date
  const [tsInput, setTsInput] = useState("");
  const [tsFormats, setTsFormats] = useState<ReturnType<typeof timestampToFormats> | null>(null);
  const [tsDateInfo, setTsDateInfo] = useState<ReturnType<typeof getDateInfo> | null>(null);
  const [tsError, setTsError] = useState("");

  // Date -> Timestamp
  const [dateInput, setDateInput] = useState("");
  const [dateResult, setDateResult] = useState<{ seconds: number; milliseconds: number } | null>(null);
  const [dateError, setDateError] = useState("");

  // Live clock tick
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getCurrentTimestamp());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timestamp to date conversion
  const handleTsConvert = useCallback((value: string) => {
    setTsInput(value);
    const trimmed = value.trim();
    if (!trimmed) {
      setTsFormats(null);
      setTsDateInfo(null);
      setTsError("");
      return;
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      setTsError("Please enter a valid number");
      setTsFormats(null);
      setTsDateInfo(null);
      return;
    }
    try {
      const formats = timestampToFormats(num);
      const ms = Math.abs(num) > 1e12 ? num : num * 1000;
      const info = getDateInfo(new Date(ms));
      setTsFormats(formats);
      setTsDateInfo(info);
      setTsError("");
    } catch {
      setTsError("Invalid timestamp");
      setTsFormats(null);
      setTsDateInfo(null);
    }
  }, []);

  // Date to timestamp conversion
  const handleDateConvert = useCallback((value: string) => {
    setDateInput(value);
    if (!value.trim()) {
      setDateResult(null);
      setDateError("");
      return;
    }
    try {
      const result = dateToTimestamp(value);
      setDateResult(result);
      setDateError("");
    } catch {
      setDateError("Invalid date format");
      setDateResult(null);
    }
  }, []);

  // Snap to now
  const handleNow = () => {
    const current = getCurrentTimestamp();
    handleTsConvert(String(current.seconds));
  };

  const nowDate = new Date(now.milliseconds);
  const nowInfo = getDateInfo(nowDate);

  return (
    <div className="space-y-8">
      {/* ===== Live Clock Section ===== */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {ui("Live Clock")}
          </h3>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Unix Seconds */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{ui("Unix Timestamp (seconds)")}</div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                {now.seconds}
              </span>
              <CopyButton getText={() => String(now.seconds)} label={ui("Copy")} />
            </div>
          </div>

          {/* Unix Milliseconds */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{ui("Unix Timestamp (ms)")}</div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                {now.milliseconds}
              </span>
              <CopyButton getText={() => String(now.milliseconds)} label={ui("Copy")} />
            </div>
          </div>

          {/* ISO 8601 */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">ISO 8601</div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm text-gray-800 dark:text-gray-200 truncate">
                {nowDate.toISOString()}
              </span>
              <CopyButton getText={() => nowDate.toISOString()} label={ui("Copy")} />
            </div>
          </div>

          {/* Timezone */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{ui("Timezone")}</div>
            <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
              {nowInfo.timezoneName} ({nowInfo.utcOffset})
            </div>
          </div>
        </div>
      </div>

      {/* ===== Timestamp to Date Section ===== */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {ui("Unix Timestamp")} &rarr; {ui("Human Date")}
        </h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={tsInput}
            onChange={(e) => handleTsConvert(e.target.value)}
            placeholder={ui("Enter Unix timestamp (e.g. 1705312200)")}
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            onClick={handleNow}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            {ui("Now")}
          </button>
        </div>

        {tsError && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">{tsError}</p>
        )}

        {tsFormats && (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300 w-36">
                      {ui("Format")}
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300">
                      {ui("Value")}
                    </th>
                    <th className="px-4 py-2.5 w-20" />
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "ISO 8601", value: tsFormats.iso8601 },
                    { label: "RFC 2822", value: tsFormats.rfc2822 },
                    { label: ui("Local Time"), value: tsFormats.localString },
                    { label: "UTC", value: tsFormats.utcString },
                    { label: ui("Relative"), value: tsFormats.relative },
                  ].map(({ label, value }) => (
                    <tr key={label} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">{label}</td>
                      <td className="px-4 py-3">
                        <code className="font-mono text-xs text-gray-800 dark:text-gray-200 break-all">
                          {value}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <CopyButton getText={() => value} label={ui("Copy")} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Date Info */}
            {tsDateInfo && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                {[
                  { label: ui("Day of Year"), value: String(tsDateInfo.dayOfYear) },
                  { label: ui("Week Number"), value: String(tsDateInfo.weekNumber) },
                  { label: ui("Leap Year"), value: tsDateInfo.isLeapYear ? ui("Yes") : ui("No") },
                  { label: ui("Timezone"), value: `${tsDateInfo.timezoneName}` },
                  { label: ui("UTC Offset"), value: tsDateInfo.utcOffset },
                  { label: ui("Seconds since Epoch"), value: tsDateInfo.secondsSinceEpoch.toLocaleString() },
                  { label: ui("Minutes since Epoch"), value: tsDateInfo.minutesSinceEpoch.toLocaleString() },
                  { label: ui("Hours since Epoch"), value: tsDateInfo.hoursSinceEpoch.toLocaleString() },
                  { label: ui("Days since Epoch"), value: tsDateInfo.daysSinceEpoch.toLocaleString() },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
                    <div className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== Date to Timestamp Section ===== */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {ui("Human Date")} &rarr; {ui("Unix Timestamp")}
        </h3>

        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => handleDateConvert(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 mb-4"
        />

        {dateError && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">{dateError}</p>
        )}

        {dateResult && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300 w-36">
                    {ui("Format")}
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300">
                    {ui("Value")}
                  </th>
                  <th className="px-4 py-2.5 w-20" />
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                    {ui("Seconds")}
                  </td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
                      {dateResult.seconds}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CopyButton getText={() => String(dateResult.seconds)} label={ui("Copy")} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                  <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                    {ui("Milliseconds")}
                  </td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
                      {dateResult.milliseconds}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CopyButton getText={() => String(dateResult.milliseconds)} label={ui("Copy")} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
