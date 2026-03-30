"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  DATA_UNITS,
  convertDataUnit,
  type DataUnit,
} from "./logic";

export function DataConverterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<DataUnit>("GB");

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [inputValue]);

  const results = useMemo(
    () => convertDataUnit(numericValue, fromUnit),
    [numericValue, fromUnit]
  );

  const copyText = results
    .map((r) => `${r.value} ${r.unit.label}`)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label
              htmlFor="data-value"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {ui("Value")}
            </label>
            <input
              id="data-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={ui("Enter a value")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              min="0"
              step="any"
            />
          </div>
          <div className="sm:w-48">
            <label
              htmlFor="data-unit"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {ui("Unit")}
            </label>
            <select
              id="data-unit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as DataUnit)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              {DATA_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {ui(u.label)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {ui("Conversion Results")}
          </h3>
          <CopyButton text={copyText} label={ui("Copy All")} />
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {results.map((row) => (
            <div
              key={row.unit.id}
              className={`flex items-center justify-between px-4 py-2.5 ${
                row.unit.id === fromUnit
                  ? "bg-blue-50 dark:bg-blue-900/30 border-l-2 border-blue-500"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">{ui(row.unit.label)}</span>
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-gray-100">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>{ui("Note:")}</strong> {ui("All units use binary (×1024) conversion.")}
          1 KB = 1,024 Bytes, 1 MB = 1,024 KB, 1 GB = 1,024 MB, and so on.
        </p>
      </div>
    </div>
  );
}
