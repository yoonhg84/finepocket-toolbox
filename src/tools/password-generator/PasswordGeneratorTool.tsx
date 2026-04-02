"use client";

import { useState, useCallback, useEffect } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  generatePassword,
  generatePassphrase,
  calculateStrength,
  type PasswordOptions,
  type PassphraseOptions,
  type StrengthResult,
} from "./logic";

const STRENGTH_COLORS: Record<string, string> = {
  weak: "bg-red-500",
  fair: "bg-yellow-500",
  good: "bg-blue-500",
  strong: "bg-green-500",
};

const STRENGTH_TEXT_COLORS: Record<string, string> = {
  weak: "text-red-600 dark:text-red-400",
  fair: "text-yellow-600 dark:text-yellow-400",
  good: "text-blue-600 dark:text-blue-400",
  strong: "text-green-600 dark:text-green-400",
};

type Mode = "password" | "passphrase";

export function PasswordGeneratorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);

  const [mode, setMode] = useState<Mode>("password");

  // Password options
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [count, setCount] = useState(1);

  // Passphrase options
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);

  // Results
  const [passwords, setPasswords] = useState<string[]>([]);
  const [strength, setStrength] = useState<StrengthResult | null>(null);

  const generate = useCallback(() => {
    const results: string[] = [];
    if (mode === "password") {
      const opts: PasswordOptions = {
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        excludeAmbiguous,
      };
      for (let i = 0; i < count; i++) {
        results.push(generatePassword(opts));
      }
    } else {
      const opts: PassphraseOptions = { wordCount, separator, capitalize };
      for (let i = 0; i < count; i++) {
        results.push(generatePassphrase(opts));
      }
    }
    setPasswords(results);
    if (results.length > 0) {
      setStrength(calculateStrength(results[0]));
    }
  }, [mode, length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, count, wordCount, separator, capitalize]);

  // Auto-generate on option change
  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setMode("password")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
            mode === "password"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {ui("Password")}
        </button>
        <button
          onClick={() => setMode("passphrase")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
            mode === "passphrase"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {ui("Passphrase")}
        </button>
      </div>

      {/* Options */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-4">
        {mode === "password" ? (
          <>
            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ui("Length")}
                </label>
                <input
                  type="number"
                  min={8}
                  max={128}
                  value={length}
                  onChange={(e) => setLength(Math.min(128, Math.max(8, Number(e.target.value) || 8)))}
                  className="w-16 rounded border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm text-center font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <input
                type="range"
                min={8}
                max={128}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                <span>8</span>
                <span>128</span>
              </div>
            </div>

            {/* Character Toggles */}
            <div className="grid grid-cols-2 gap-3">
              <ToggleOption
                label={ui("Uppercase (A-Z)")}
                checked={uppercase}
                onChange={setUppercase}
              />
              <ToggleOption
                label={ui("Lowercase (a-z)")}
                checked={lowercase}
                onChange={setLowercase}
              />
              <ToggleOption
                label={ui("Numbers (0-9)")}
                checked={numbers}
                onChange={setNumbers}
              />
              <ToggleOption
                label={ui("Symbols (!@#$...)")}
                checked={symbols}
                onChange={setSymbols}
              />
            </div>

            {/* Exclude Ambiguous */}
            <ToggleOption
              label={ui("Exclude ambiguous characters (0, O, l, 1, I)")}
              checked={excludeAmbiguous}
              onChange={setExcludeAmbiguous}
            />
          </>
        ) : (
          <>
            {/* Word Count */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ui("Word Count")}
                </label>
                <input
                  type="number"
                  min={3}
                  max={10}
                  value={wordCount}
                  onChange={(e) => setWordCount(Math.min(10, Math.max(3, Number(e.target.value) || 3)))}
                  className="w-16 rounded border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm text-center font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <input
                type="range"
                min={3}
                max={10}
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                <span>3</span>
                <span>10</span>
              </div>
            </div>

            {/* Separator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {ui("Separator")}
              </label>
              <div className="flex gap-2">
                {[
                  { value: "-", label: "Hyphen (-)" },
                  { value: " ", label: "Space" },
                  { value: ".", label: "Dot (.)" },
                  { value: "_", label: "Underscore (_)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSeparator(opt.value)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                      separator === opt.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {ui(opt.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Capitalize */}
            <ToggleOption
              label={ui("Capitalize words")}
              checked={capitalize}
              onChange={setCapitalize}
            />
          </>
        )}

        {/* Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {ui("Count")}
          </label>
          <div className="flex gap-2">
            {[1, 3, 5, 10].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  count === n
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generate}
        className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        {ui("Generate")}
      </button>

      {/* Strength Meter */}
      {strength && passwords.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {ui("Strength")}
            </span>
            <span className={`text-sm font-semibold ${STRENGTH_TEXT_COLORS[strength.level]}`}>
              {ui(strength.label)}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${STRENGTH_COLORS[strength.level]}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {passwords.length > 0 && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {passwords.map((pw, i) => (
            <div
              key={`${pw}-${i}`}
              className={`flex items-center gap-3 px-4 py-3 ${
                i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""
              }`}
            >
              <code className="flex-1 font-mono text-sm text-gray-800 dark:text-gray-200 break-all select-all">
                {pw}
              </code>
              <CopyButton getText={() => pw} label={ui("Copy")} />
            </div>
          ))}
          {passwords.length > 1 && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50">
              <CopyButton
                getText={() => passwords.join("\n")}
                label={ui("Copy All")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ToggleOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
      />
      {label}
    </label>
  );
}
