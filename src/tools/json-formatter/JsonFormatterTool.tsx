"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { TabGroup } from "@/components/ui/TabGroup";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { FileUpload } from "@/components/ui/FileUpload";
import { getToolUiText } from "@/tools/ui-text";
import { formatJson, minifyJson, validateJson, sortJsonKeys } from "./logic";

type Mode = "format" | "minify" | "validate" | "sort";
type Indent = 2 | 4 | "tab";

const TABS = [
  { id: "format", label: "Format" },
  { id: "minify", label: "Minify" },
  { id: "validate", label: "Validate" },
  { id: "sort", label: "Sort Keys" },
];

const INDENT_OPTIONS: { value: Indent; label: string }[] = [
  { value: 2, label: "2 spaces" },
  { value: 4, label: "4 spaces" },
  { value: "tab", label: "Tab" },
];

const SAMPLE_JSON = JSON.stringify(
  {
    name: "FinePocket Toolbox",
    version: "1.0.0",
    description: "A collection of free developer and text tools",
    author: {
      name: "FinePocket",
      url: "https://finepocket.app",
      social: {
        github: "finepocket",
        twitter: "@finepocket",
      },
    },
    features: [
      "JSON Formatter",
      "Base64 Encoder",
      "Hash Generator",
      "URL Encoder",
    ],
    config: {
      theme: "light",
      maxFileSize: 10485760,
      supportedFormats: ["json", "xml", "yaml"],
      analytics: { enabled: true, provider: "plausible" },
    },
    tags: ["developer", "tools", "free", "online"],
    isPublic: true,
    createdAt: "2025-01-15T09:30:00Z",
  },
  null,
  2
);

export function JsonFormatterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("format");
  const [indent, setIndent] = useState<Indent>(2);

  const process = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    switch (mode) {
      case "format": {
        const indentValue = indent === "tab" ? "\t" : indent;
        const { result, error: err } = formatJson(input, indentValue);
        setOutput(result);
        setError(err);
        break;
      }
      case "minify": {
        const { result, error: err } = minifyJson(input);
        setOutput(result);
        setError(err);
        break;
      }
      case "validate": {
        const { valid, error: err } = validateJson(input);
        setOutput(valid ? ui("Valid JSON") : ui("Invalid JSON"));
        setError(err);
        break;
      }
      case "sort": {
        try {
          const parsed = JSON.parse(input);
          const sorted = sortJsonKeys(parsed);
          const indentValue = indent === "tab" ? "\t" : indent;
          setOutput(JSON.stringify(sorted, null, indentValue));
          setError(null);
        } catch (err) {
          setOutput("");
          setError(
            err instanceof SyntaxError ? err.message : String(err)
          );
        }
        break;
      }
    }
  }, [input, mode, indent, ui]);

  useEffect(() => {
    process();
  }, [process]);

  const handleFileRead = useCallback((content: string) => {
    setInput(content);
  }, []);

  const loadSample = () => {
    setInput(SAMPLE_JSON);
  };

  return (
    <div className="space-y-4">
      <TabGroup
        tabs={TABS.map((tab) => ({ ...tab, label: ui(tab.label) }))}
        activeTab={mode}
        onChange={(id) => setMode(id as Mode)}
      />

      {/* Indent selector — only in format and sort modes */}
      {(mode === "format" || mode === "sort") && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{ui("Indent:")}</span>
          <div className="flex gap-1">
            {INDENT_OPTIONS.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setIndent(opt.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                  indent === opt.value
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {ui(opt.label)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="json-input"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {ui("Input")}
            </label>
            <button
              onClick={loadSample}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
            >
              {ui("Load Sample")}
            </button>
          </div>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui('Paste JSON here, e.g. {"key": "value"}')}
            className="w-full h-80 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
            spellCheck={false}
          />
          <FileUpload
            accept=".json,application/json"
            onFileRead={handleFileRead}
            label={ui("Drop a .json file here or click to browse")}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {ui("Output")}
          </label>
          <pre
            className={`w-full h-80 p-3 font-mono text-sm border rounded-lg overflow-auto ${
              mode === "validate" && !error && input.trim()
                ? "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-800 dark:text-green-200"
                : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            }`}
          >
            <code>{output}</code>
          </pre>

          <ErrorMessage message={error} />

          <div className="flex gap-2">
            <CopyButton
              text={output}
              label={ui("Copy")}
            />
            <DownloadButton
              content={output}
              filename="formatted.json"
              mimeType="application/json"
              label={ui("Download")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
