"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import { textToAsciiArt, getAvailableFonts, getAsciiArtWidth } from "./logic";

const FONTS = getAvailableFonts();

export function AsciiArtTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [text, setText] = useState("");
  const [font, setFont] = useState(FONTS[0]);

  const asciiArt = useMemo(() => {
    if (!text.trim()) return "";
    return textToAsciiArt(text, font);
  }, [text, font]);

  const artWidth = useMemo(() => getAsciiArtWidth(asciiArt), [asciiArt]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label
          htmlFor="ascii-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {ui("Text Input")}
        </label>
        <input
          id="ascii-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={ui("Type your text here…")}
          maxLength={40}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {text.length} / 40 {ui("characters")}
        </p>
      </div>

      {/* Font Selector */}
      <div>
        <label
          htmlFor="font-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {ui("Font")}
        </label>
        <select
          id="font-select"
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full sm:w-64 rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Output Section */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {ui("Output")}
          </label>
          <div className="flex items-center gap-3">
            {asciiArt && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {ui("Width")}: {artWidth} {ui("chars")}
              </span>
            )}
            {asciiArt && (
              <CopyButton getText={() => asciiArt} label={ui("Copy")} />
            )}
          </div>
        </div>
        <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-900 dark:bg-gray-950 overflow-x-auto">
          <pre className="p-4 text-green-400 dark:text-green-300 font-mono text-xs sm:text-sm leading-tight min-h-[120px] whitespace-pre">
            {asciiArt || (
              <span className="text-gray-500 dark:text-gray-600 italic">
                {ui("Your ASCII art will appear here…")}
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
