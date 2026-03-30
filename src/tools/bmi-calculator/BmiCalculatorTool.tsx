"use client";

import { useState } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import {
  calculateBmi,
  imperialToCm,
  lbsToKg,
  kgToLbs,
  type BmiResult,
} from "./logic";

type UnitSystem = "metric" | "imperial";

const CATEGORY_COLORS: Record<string, string> = {
  Underweight: "text-blue-600 dark:text-blue-400",
  Normal: "text-green-600 dark:text-green-400",
  Overweight: "text-yellow-600 dark:text-yellow-400",
  Obese: "text-red-600 dark:text-red-400",
};

export function BmiCalculatorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");

  let result: BmiResult | null = null;

  if (unit === "metric") {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (h > 0 && w > 0) {
      result = calculateBmi(h, w);
    }
  } else {
    const ft = parseFloat(feet) || 0;
    const inc = parseFloat(inches) || 0;
    const lb = parseFloat(weightLbs);
    if ((ft > 0 || inc > 0) && lb > 0) {
      result = calculateBmi(imperialToCm(ft, inc), lbsToKg(lb));
    }
  }

  const gaugePercent = result
    ? Math.min(Math.max(((result.bmi - 10) / 35) * 100, 0), 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex gap-2">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              unit === u
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {u === "metric" ? ui("Metric (cm / kg)") : ui("Imperial (ft-in / lbs)")}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {unit === "metric" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {ui("Height (cm)")}
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder=""
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {ui("Height")}
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  placeholder=""
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">ft</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  placeholder=""
                  min="0"
                  max="11"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">in</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {ui("Weight")} ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={unit === "metric" ? weightKg : weightLbs}
            onChange={(e) =>
              unit === "metric"
                ? setWeightKg(e.target.value)
                : setWeightLbs(e.target.value)
            }
            placeholder={unit === "metric" ? "70" : "154"}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5 pt-2">
          {/* BMI Score */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{ui("Your BMI")}</p>
            <p className="text-5xl font-bold text-gray-900 dark:text-gray-100">{result.bmi}</p>
            <p
              className={`text-lg font-semibold mt-1 ${CATEGORY_COLORS[result.category]}`}
            >
              {ui(result.category)}
            </p>
          </div>

          {/* Gauge Bar */}
          <div className="px-2">
            <div className="relative">
              <div className="h-4 rounded-full overflow-hidden flex">
                <div className="bg-blue-400 flex-1" />
                <div className="bg-green-400 flex-[2]" />
                <div className="bg-yellow-400 flex-1" />
                <div className="bg-red-400 flex-1" />
              </div>
              {/* Pointer */}
              <div
                className="absolute top-full -translate-x-1/2 transition-all duration-300"
                style={{ left: `${gaugePercent}%` }}
              >
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-gray-800 dark:border-b-gray-200 mx-auto" />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-3 px-0.5">
              <span>{ui("Underweight")}</span>
              <span>{ui("Normal")}</span>
              <span>{ui("Overweight")}</span>
              <span>{ui("Obese")}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{ui("BMI Prime")}</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {result.bmiPrime}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                {ui("Healthy Weight Range")}
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {unit === "metric"
                  ? `${result.healthyWeightRange.min} - ${result.healthyWeightRange.max} kg`
                  : `${Math.round(kgToLbs(result.healthyWeightRange.min) * 10) / 10} - ${Math.round(kgToLbs(result.healthyWeightRange.max) * 10) / 10} lbs`}
              </p>
            </div>
          </div>

          {/* YMYL Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
            <strong>{ui("Disclaimer:")}</strong>{" "}
            {locale === "ko"
              ? "BMI는 참고용 지표입니다. 정확한 건강 평가는 의료 전문가와 상담하세요. 근육량이 많은 사람, 임신부, 고령자, 성장기 아동에게는 정확하지 않을 수 있습니다."
              : "BMI is a reference indicator only. Consult a healthcare professional for accurate health assessment. May not be accurate for muscular individuals, pregnant women, elderly, or growing children."}
          </div>
        </div>
      )}
    </div>
  );
}
