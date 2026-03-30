"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import { calculateTip, formatCurrency } from "./logic";

const PRESET_TIPS = [15, 18, 20, 25];

export function TipCalculatorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [people, setPeople] = useState(1);
  const [roundUp, setRoundUp] = useState(false);

  const activeTip = isCustom ? parseFloat(customTip) || 0 : tipPercent;

  const result = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    return calculateTip(bill, activeTip, people);
  }, [billAmount, activeTip, people]);

  const handlePreset = (pct: number) => {
    setTipPercent(pct);
    setIsCustom(false);
    setCustomTip("");
  };

  const handleCustom = (val: string) => {
    setCustomTip(val);
    setIsCustom(true);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Bill Amount */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {ui("Bill Amount")}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
            $
          </span>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder=""
            min="0"
            step="0.01"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Tip Percentage */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {ui("Tip Percentage")}
        </label>
        <div className="flex gap-2 flex-wrap mb-3">
          {PRESET_TIPS.map((pct) => (
            <button
              key={pct}
              onClick={() => handlePreset(pct)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isCustom && tipPercent === pct
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{ui("Custom:")}</span>
          <div className="relative flex-1">
            <input
              type="number"
              value={customTip}
              onChange={(e) => handleCustom(e.target.value)}
              placeholder={ui("Enter %")}
              min="0"
              max="100"
              step="1"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isCustom
                  ? "border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                  : "border-gray-300 dark:border-gray-600 dark:bg-gray-800"
              } dark:text-gray-100`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Number of People */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {ui("Split Between")}
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPeople(Math.max(1, people - 1))}
            disabled={people <= 1}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            -
          </button>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{people}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {people === 1 ? ui("person") : ui("people")}
            </div>
          </div>
          <button
            onClick={() => setPeople(Math.min(20, people + 1))}
            disabled={people >= 20}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Round Up Toggle */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {ui("Round Up")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {ui("Round each person's total to the nearest dollar")}
            </div>
          </div>
          <button
            onClick={() => setRoundUp(!roundUp)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              roundUp ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
            role="switch"
            aria-checked={roundUp}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                roundUp ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Results */}
      {parseFloat(billAmount) > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{ui("Tip Amount")}</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(result.tipAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{ui("Total")}</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(
                  roundUp ? result.roundedTotal : result.totalAmount
                )}
              </span>
            </div>
            {people > 1 && (
              <>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{ui("Tip / Person")}</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(
                      roundUp
                        ? result.roundedTipPerPerson
                        : result.tipPerPerson
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{ui("Total / Person")}</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(
                      roundUp
                        ? result.roundedTotalPerPerson
                        : result.totalPerPerson
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 border-t border-blue-100 dark:border-blue-800 px-5 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {people > 1 ? ui("Each Person Pays") : ui("You Pay")}
              </span>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {formatCurrency(
                  roundUp
                    ? result.roundedTotalPerPerson
                    : result.totalPerPerson
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
