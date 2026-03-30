"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import {
  calcBasicPercentage,
  calcReversePercentage,
  calcPercentageChange,
  calcApplyPercentage,
  formatNumber,
} from "./logic";

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      {children}
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? ""}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          step="any"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultDisplay({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "green" | "red" | "blue";
}) {
  const colors = {
    green: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300",
    red: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300",
    blue: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300",
  };
  const colorClass = accent
    ? colors[accent]
    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100";

  return (
    <div className={`rounded-md border px-4 py-3 ${colorClass}`}>
      <div className="text-xs font-medium opacity-70 mb-0.5">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

export function PercentageCalculatorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  // Basic mode
  const [basicX, setBasicX] = useState("");
  const [basicY, setBasicY] = useState("");

  // Reverse mode
  const [revX, setRevX] = useState("");
  const [revY, setRevY] = useState("");

  // Change mode
  const [changeFrom, setChangeFrom] = useState("");
  const [changeTo, setChangeTo] = useState("");

  // Apply mode
  const [applyX, setApplyX] = useState("");
  const [applyY, setApplyY] = useState("");
  const [applyMode, setApplyMode] = useState<"add" | "subtract">("subtract");

  const basicResult = useMemo(() => {
    const x = parseFloat(basicX);
    const y = parseFloat(basicY);
    if (isNaN(x) || isNaN(y)) return null;
    return calcBasicPercentage(x, y);
  }, [basicX, basicY]);

  const reverseResult = useMemo(() => {
    const x = parseFloat(revX);
    const y = parseFloat(revY);
    if (isNaN(x) || isNaN(y) || y === 0) return null;
    return calcReversePercentage(x, y);
  }, [revX, revY]);

  const changeResult = useMemo(() => {
    const from = parseFloat(changeFrom);
    const to = parseFloat(changeTo);
    if (isNaN(from) || isNaN(to) || from === 0) return null;
    return calcPercentageChange(from, to);
  }, [changeFrom, changeTo]);

  const applyResult = useMemo(() => {
    const x = parseFloat(applyX);
    const y = parseFloat(applyY);
    if (isNaN(x) || isNaN(y)) return null;
    return calcApplyPercentage(x, y, applyMode);
  }, [applyX, applyY, applyMode]);

  return (
    <div className="space-y-6">
      {/* Basic Percentage */}
      <SectionCard
        title={ui("What is Y% of X?")}
        description={ui("Find a percentage of any number")}
      >
        <div className="flex items-end gap-3 flex-wrap">
          <NumberInput
            label={ui("Number (X)")}
            value={basicX}
            onChange={setBasicX}
          />
          <NumberInput
            label={ui("Percentage (Y)")}
            value={basicY}
            onChange={setBasicY}
            suffix="%"
          />
        </div>
        {basicResult !== null && (
          <div className="mt-4">
            <ResultDisplay
              label={
                locale === "ko"
                  ? `${basicX}의 ${basicY}%`
                  : `${basicY}% of ${basicX}`
              }
              value={formatNumber(basicResult.result)}
              accent="blue"
            />
          </div>
        )}
      </SectionCard>

      {/* Reverse Percentage */}
      <SectionCard
        title={ui("X is what % of Y?")}
        description={ui("Find what percentage one number is of another")}
      >
        <div className="flex items-end gap-3 flex-wrap">
          <NumberInput
            label={ui("Part (X)")}
            value={revX}
            onChange={setRevX}
          />
          <NumberInput
            label={ui("Whole (Y)")}
            value={revY}
            onChange={setRevY}
          />
        </div>
        {reverseResult !== null && (
          <div className="mt-4">
            <ResultDisplay
              label={
                locale === "ko"
                  ? `${revX}는 ${revY}의 몇 %인가요`
                  : `${revX} is what % of ${revY}`
              }
              value={`${formatNumber(reverseResult.percentage)}%`}
              accent="blue"
            />
          </div>
        )}
      </SectionCard>

      {/* Percentage Change */}
      <SectionCard
        title={ui("Percentage Change")}
        description={ui("Calculate the % increase or decrease between two values")}
      >
        <div className="flex items-end gap-3 flex-wrap">
          <NumberInput
            label={ui("From (original)")}
            value={changeFrom}
            onChange={setChangeFrom}
          />
          <NumberInput
            label={ui("To (new)")}
            value={changeTo}
            onChange={setChangeTo}
          />
        </div>
        {changeResult !== null && (
          <div className="mt-4">
            <ResultDisplay
              label={
                locale === "ko"
                  ? `${changeFrom}에서 ${changeTo}(으)로 변화`
                  : `Change from ${changeFrom} to ${changeTo}`
              }
              value={`${changeResult.isIncrease ? "+" : ""}${formatNumber(changeResult.change)}%`}
              accent={changeResult.isIncrease ? "green" : "red"}
            />
          </div>
        )}
      </SectionCard>

      {/* Discount / Markup */}
      <SectionCard
        title={ui("Apply Percentage (Discount / Markup)")}
        description={ui("Add or subtract a percentage from a number")}
      >
        <div className="flex items-end gap-3 flex-wrap">
          <NumberInput
            label={ui("Original value")}
            value={applyX}
            onChange={setApplyX}
          />
          <NumberInput
            label={ui("Percentage")}
            value={applyY}
            onChange={setApplyY}
            suffix="%"
          />
          <div className="flex-shrink-0">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {ui("Mode")}
            </label>
            <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setApplyMode("subtract")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  applyMode === "subtract"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {ui("Discount")}
              </button>
              <button
                onClick={() => setApplyMode("add")}
                className={`px-3 py-2 text-sm font-medium border-l border-gray-300 dark:border-gray-600 transition-colors ${
                  applyMode === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {ui("Markup")}
              </button>
            </div>
          </div>
        </div>
        {applyResult !== null && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ResultDisplay
              label={ui(applyMode === "subtract" ? "After discount" : "After markup")}
              value={formatNumber(applyResult.result)}
              accent="blue"
            />
            <ResultDisplay
              label={ui(applyMode === "subtract" ? "You save" : "Added")}
              value={formatNumber(applyResult.difference)}
              accent={applyMode === "subtract" ? "green" : "red"}
            />
          </div>
        )}
      </SectionCard>
    </div>
  );
}
