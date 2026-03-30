"use client";

import { useState } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  toDotCase,
} from "./logic";

interface CaseOption {
  label: string;
  fn: (s: string) => string;
  example: string;
}

const CASE_OPTIONS: CaseOption[] = [
  { label: "UPPERCASE", fn: toUpperCase, example: "HELLO WORLD" },
  { label: "lowercase", fn: toLowerCase, example: "hello world" },
  { label: "Title Case", fn: toTitleCase, example: "Hello World" },
  { label: "Sentence case", fn: toSentenceCase, example: "Hello world" },
  { label: "camelCase", fn: toCamelCase, example: "helloWorld" },
  { label: "PascalCase", fn: toPascalCase, example: "HelloWorld" },
  { label: "snake_case", fn: toSnakeCase, example: "hello_world" },
  { label: "kebab-case", fn: toKebabCase, example: "hello-world" },
  { label: "CONSTANT_CASE", fn: toConstantCase, example: "HELLO_WORLD" },
  { label: "dot.case", fn: toDotCase, example: "hello.world" },
];

export function CaseConverterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState<string | null>(null);

  const handleConvert = (option: CaseOption) => {
    setActiveCase(option.label);
    setOutput(input ? option.fn(input) : "");
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label htmlFor="case-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {ui("Input")}
        </label>
        <textarea
          id="case-input"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ui("Type or paste your text here…")}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Case buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CASE_OPTIONS.map((option) => (
          <button
            key={option.label}
            onClick={() => handleConvert(option)}
            className={`px-3 py-2.5 text-sm font-medium rounded-md border transition-colors ${
              activeCase === option.label
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            title={`Example: ${option.example}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="case-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {ui("Output")}
            {activeCase && <span className="text-gray-400 dark:text-gray-500 ml-1">({activeCase})</span>}
          </label>
          <CopyButton getText={() => output} label={ui("Copy")} />
        </div>
        <textarea
          id="case-output"
          rows={5}
          value={output}
          readOnly
          placeholder={ui("Converted text will appear here…")}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 text-sm dark:text-gray-100"
        />
      </div>
    </div>
  );
}
