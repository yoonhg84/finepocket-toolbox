"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { getToolUiText } from "@/tools/ui-text";
import { urlEncode, urlDecode } from "./logic";

type Direction = "encode" | "decode";
type EncodeMode = "component" | "uri";

export function UrlEncoderTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [direction, setDirection] = useState<Direction>("encode");
  const [mode, setMode] = useState<EncodeMode>("component");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setError(null);
      if (!input) {
        setOutput("");
        return;
      }

      if (direction === "encode") {
        setOutput(urlEncode(input, mode));
      } else {
        const { result, error: decodeError } = urlDecode(input);
        setOutput(result);
        setError(decodeError);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, direction, mode]);

  return (
    <div className="space-y-4">
      {/* Direction Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDirection("encode")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            direction === "encode"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {ui("Encode")}
        </button>
        <button
          onClick={() => setDirection("decode")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            direction === "decode"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {ui("Decode")}
        </button>
      </div>

      {/* Mode Selector (only for encoding) */}
      {direction === "encode" && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">{ui("Mode:")}</span>
          <label className="flex items-center gap-1.5 text-sm cursor-pointer select-none">
            <input
              type="radio"
              name="encode-mode"
              checked={mode === "component"}
              onChange={() => setMode("component")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">encodeURIComponent</span>
            <span className="text-gray-400 dark:text-gray-500">{ui("(recommended)")}</span>
          </label>
          <label className="flex items-center gap-1.5 text-sm cursor-pointer select-none">
            <input
              type="radio"
              name="encode-mode"
              checked={mode === "uri"}
              onChange={() => setMode("uri")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">encodeURI</span>
          </label>
        </div>
      )}

      {/* Input */}
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {direction === "encode" ? ui("Text to Encode") : ui("URL to Decode")}
        </label>
        <textarea
          id="url-input"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "encode"
              ? locale === "ko"
                ? `${ui("Enter text to encode…")} 예: 안녕하세요 세계!`
                : `${ui("Enter text to encode…")} e.g. Hello World! こんにちは`
              : locale === "ko"
                ? `${ui("Enter URL-encoded text…")} 예: Hello%20World%21`
                : "Enter URL-encoded text… e.g. Hello%20World%21"
          }
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <ErrorMessage message={error} />

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="url-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {direction === "encode"
              ? ui("Encoded Output")
              : ui("Decoded Output")}
          </label>
          <CopyButton getText={() => output} label={ui("Copy")} />
        </div>
        <textarea
          id="url-output"
          rows={5}
          value={output}
          readOnly
          placeholder={ui("Output will appear here…")}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 font-mono text-sm dark:text-gray-100"
        />
      </div>
    </div>
  );
}
