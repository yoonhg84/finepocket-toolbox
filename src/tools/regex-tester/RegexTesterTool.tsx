"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  testRegex,
  replaceWithRegex,
  buildHighlightedHtml,
  PRESETS,
} from "./logic";

type FlagKey = "g" | "i" | "m" | "s" | "u";

const ALL_FLAGS: { key: FlagKey; label: string; title: string }[] = [
  { key: "g", label: "g", title: "Global — find all matches" },
  { key: "i", label: "i", title: "Case-insensitive" },
  { key: "m", label: "m", title: "Multiline — ^ and $ match line boundaries" },
  { key: "s", label: "s", title: "DotAll — dot matches newlines" },
  { key: "u", label: "u", title: "Unicode — full Unicode matching" },
];

export function RegexTesterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Record<FlagKey, boolean>>({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
  });
  const [testStr, setTestStr] = useState("");
  const [replacement, setReplacement] = useState("");
  const [showPresets, setShowPresets] = useState(false);

  const flagStr = useMemo(
    () =>
      (Object.keys(flags) as FlagKey[])
        .filter((k) => flags[k])
        .join(""),
    [flags]
  );

  const toggleFlag = (key: FlagKey) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute matches
  const { matches, error } = useMemo(
    () => testRegex(pattern, flagStr, testStr),
    [pattern, flagStr, testStr]
  );

  // Compute highlighted HTML
  const { html: highlightedHtml } = useMemo(
    () => buildHighlightedHtml(pattern, flagStr, testStr),
    [pattern, flagStr, testStr]
  );

  // Compute replacement result
  const { result: replaceResult, error: replaceError } = useMemo(
    () => replaceWithRegex(pattern, flagStr, testStr, replacement),
    [pattern, flagStr, testStr, replacement]
  );

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setPattern(preset.pattern);
    setTestStr(preset.example);
    // Parse preset flags
    const newFlags: Record<FlagKey, boolean> = {
      g: false,
      i: false,
      m: false,
      s: false,
      u: false,
    };
    for (const c of preset.flags) {
      if (c in newFlags) newFlags[c as FlagKey] = true;
    }
    setFlags(newFlags);
    setShowPresets(false);
  };

  return (
    <div className="space-y-4">
      {/* Pattern + Flags */}
      <div className="space-y-2">
        <label
          htmlFor="regex-pattern"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {ui("Pattern")}
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-0 flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <span className="pl-3 text-gray-400 dark:text-gray-500 font-mono text-sm select-none">
              /
            </span>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder={ui("Enter regex pattern...")}
              className="flex-1 min-w-0 py-2 px-1 font-mono text-sm bg-transparent focus:outline-none dark:text-gray-100"
              spellCheck={false}
            />
            <span className="pr-3 text-gray-400 dark:text-gray-500 font-mono text-sm select-none">
              /{flagStr}
            </span>
          </div>

          {/* Flag checkboxes */}
          <div className="flex items-center gap-1">
            {ALL_FLAGS.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFlag(f.key)}
                title={f.title}
                className={`w-8 h-8 text-sm font-mono font-bold rounded-md border transition-colors ${
                  flags[f.key]
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="relative">
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {ui("Presets")} {showPresets ? "▲" : "▼"}
        </button>
        {showPresets && (
          <div className="absolute z-10 mt-1 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 grid grid-cols-2 sm:grid-cols-3 gap-1">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 text-xs text-left rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors truncate dark:text-gray-300"
                title={preset.pattern}
              >
                {preset.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <ErrorMessage message={error} />

      {/* Test string */}
      <div className="space-y-2">
        <label
          htmlFor="test-string"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {ui("Test String")}
        </label>
        <textarea
          id="test-string"
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder={ui("Enter text to test against the regex...")}
          className="w-full h-32 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
          spellCheck={false}
        />
      </div>

      {/* Highlighted output */}
      {testStr && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {ui("Match Highlighting")}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {locale === "ko"
                ? `${matches.length}개 일치`
                : `${matches.length} match${matches.length !== 1 ? "es" : ""} found`}
            </span>
          </div>
          <div
            className="w-full min-h-[4rem] p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {/* Match details table */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {ui("Match Details")}
          </span>
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400 w-16">
                    #
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400 w-20">
                    {ui("Index")}
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {ui("Full Match")}
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {ui("Groups")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">
                      {m.index}
                    </td>
                    <td className="px-3 py-2 font-mono text-blue-700 dark:text-blue-300 break-all">
                      {m.fullMatch}
                    </td>
                    <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400 break-all">
                      {m.groups.length > 0
                        ? m.groups.map((g, gi) => (
                            <span
                              key={gi}
                              className="inline-block mr-2 px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                            >
                              ${gi + 1}: {g}
                            </span>
                          ))
                        : <span className="text-gray-400 dark:text-gray-500">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Replace section */}
      <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
        <label
          htmlFor="replacement"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {ui("Replacement (optional)")}
        </label>
        <input
          id="replacement"
          type="text"
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          placeholder={ui("Enter replacement string (use $1, $2 for groups)...")}
          className="w-full p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
          spellCheck={false}
        />
        {replacement && testStr && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {ui("Replace Result")}
              </span>
              <CopyButton text={replaceResult} label={ui("Copy Result")} />
            </div>
            <pre className="w-full min-h-[3rem] p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 whitespace-pre-wrap break-all">
              {replaceResult}
            </pre>
            <ErrorMessage message={replaceError} />
          </div>
        )}
      </div>
    </div>
  );
}
