"use client";

import { useState, useMemo, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { TabGroup } from "@/components/ui/TabGroup";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  CATEGORIES,
  convert,
  convertToAll,
  formatValue,
  type CategoryId,
} from "./logic";

export function UnitConverterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [categoryId, setCategoryId] = useState<CategoryId>("length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnitId, setFromUnitId] = useState("m");
  const [toUnitId, setToUnitId] = useState("ft");

  const categoryTabs = CATEGORIES.map((c) => ({
    id: c.id,
    label: ui(c.label),
  }));

  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId)!,
    [categoryId]
  );

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [inputValue]);

  const mainResult = useMemo(
    () => convert(categoryId, numericValue, fromUnitId, toUnitId),
    [categoryId, numericValue, fromUnitId, toUnitId]
  );

  const allResults = useMemo(
    () => convertToAll(categoryId, numericValue, fromUnitId),
    [categoryId, numericValue, fromUnitId]
  );

  const handleCategoryChange = useCallback(
    (id: string) => {
      const newCategory = CATEGORIES.find((c) => c.id === id);
      if (!newCategory) return;
      setCategoryId(id as CategoryId);
      setFromUnitId(newCategory.units[0].id);
      setToUnitId(
        newCategory.units.length > 1
          ? newCategory.units[1].id
          : newCategory.units[0].id
      );
      setInputValue("1");
    },
    []
  );

  const handleSwap = useCallback(() => {
    const currentResult = mainResult;
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
    setInputValue(
      Number.isFinite(currentResult) ? String(currentResult) : "1"
    );
  }, [fromUnitId, toUnitId, mainResult]);

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  const copyText = allResults
    .map((r) => `${r.formatted} ${r.unit.symbol}`)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="overflow-x-auto -mx-1 px-1">
        <TabGroup
          tabs={categoryTabs}
          activeTab={categoryId}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Main Converter */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          {/* From */}
          <div className="flex-1 space-y-1">
            <label
              htmlFor="unit-from-value"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {ui("Value")}
            </label>
            <input
              id="unit-from-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={ui("Enter a value")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              step="any"
            />
          </div>

          <div className="sm:w-40 space-y-1">
            <label
              htmlFor="unit-from"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {ui("From")}
            </label>
            <select
              id="unit-from"
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-100"
            >
                  {category.units.map((u) => (
                    <option key={u.id} value={u.id}>
                  {ui(u.label)} ({u.symbol})
                    </option>
                  ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="self-center sm:self-end px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title={ui("Swap units")}
            aria-label={ui("Swap units")}
          >
            <span className="text-lg leading-none">⇅</span>
          </button>

          {/* To */}
          <div className="flex-1 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {ui("Result")}
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-900 dark:text-gray-100 min-h-[38px] flex items-center">
              {formatValue(mainResult)}
            </div>
          </div>

          <div className="sm:w-40 space-y-1">
            <label
              htmlFor="unit-to"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {ui("To")}
            </label>
            <select
              id="unit-to"
              value={toUnitId}
              onChange={(e) => setToUnitId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-100"
            >
                  {category.units.map((u) => (
                    <option key={u.id} value={u.id}>
                  {ui(u.label)} ({u.symbol})
                    </option>
                  ))}
            </select>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          {numericValue} {fromUnit?.symbol} = {formatValue(mainResult)}{" "}
          {toUnit?.symbol}
        </div>
      </div>

      {/* Full Conversion Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko"
              ? `${ui(category.label)} 전체 변환`
              : `All ${category.label} Conversions`}
          </h3>
          <CopyButton text={copyText} label={ui("Copy All")} />
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {allResults.map((row) => (
            <div
              key={row.unit.id}
              className={`flex items-center justify-between px-4 py-2.5 ${
                row.unit.id === fromUnitId
                  ? "bg-blue-50 dark:bg-blue-900/30 border-l-2 border-blue-500"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {ui(row.unit.label)}{" "}
                <span className="text-gray-400 dark:text-gray-500">({row.unit.symbol})</span>
              </span>
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-gray-100">
                {row.formatted}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
