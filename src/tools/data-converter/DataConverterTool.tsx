"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import {
  DATA_UNITS,
  convertDataUnit,
  type DataUnit,
} from "./logic";

export function DataConverterTool() {
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
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label
              htmlFor="data-value"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Value
            </label>
            <input
              id="data-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a value"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="any"
            />
          </div>
          <div className="sm:w-48">
            <label
              htmlFor="data-unit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Unit
            </label>
            <select
              id="data-unit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as DataUnit)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {DATA_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">
            Conversion Results
          </h3>
          <CopyButton text={copyText} label="Copy All" />
        </div>

        <div className="divide-y divide-gray-100">
          {results.map((row) => (
            <div
              key={row.unit.id}
              className={`flex items-center justify-between px-4 py-2.5 ${
                row.unit.id === fromUnit
                  ? "bg-blue-50 border-l-2 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-sm text-gray-600">{row.unit.label}</span>
              <span className="text-sm font-mono font-medium text-gray-900">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> All units use binary (×1024) conversion.
          1 KB = 1,024 Bytes, 1 MB = 1,024 KB, 1 GB = 1,024 MB, and so on.
        </p>
      </div>
    </div>
  );
}
