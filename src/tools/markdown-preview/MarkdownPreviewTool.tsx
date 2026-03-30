"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import { renderMarkdown, SAMPLE_MARKDOWN } from "./logic";

export function MarkdownPreviewTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [input, setInput] = useState(SAMPLE_MARKDOWN);
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);

  const html = useMemo(() => renderMarkdown(input), [input]);

  const loadSample = () => {
    setInput(SAMPLE_MARKDOWN);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <button
          onClick={loadSample}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
        >
          {ui("Load Sample")}
        </button>
        <CopyButton getText={() => html} label={ui("Copy HTML")} />
      </div>

      {/* Editor + Preview panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-2">
          <label
            htmlFor="md-editor"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Markdown
          </label>
          <textarea
            id="md-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui("Type or paste Markdown here...")}
            className="w-full h-[32rem] p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{ui("Preview")}</label>
          <div
            className="markdown-preview w-full h-[32rem] p-4 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* Markdown Cheatsheet */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
        <button
          onClick={() => setCheatsheetOpen(!cheatsheetOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <span>{ui("Markdown Cheatsheet")}</span>
          <svg
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${cheatsheetOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {cheatsheetOpen && (
          <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm mt-3">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 pr-4 font-medium text-gray-600 dark:text-gray-400">{ui("Element")}</th>
                  <th className="text-left py-2 font-medium text-gray-600 dark:text-gray-400">{ui("Syntax")}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <CheatRow element={ui("Heading 1")} syntax="# Heading" />
                <CheatRow element={ui("Heading 2")} syntax="## Heading" />
                <CheatRow element={ui("Heading 3")} syntax="### Heading" />
                <CheatRow element={ui("Bold")} syntax="**bold text**" />
                <CheatRow element={ui("Italic")} syntax="*italic text*" />
                <CheatRow element={ui("Strikethrough")} syntax="~~deleted~~" />
                <CheatRow element={ui("Link")} syntax="[title](https://url)" />
                <CheatRow element={ui("Image")} syntax="![alt](https://url)" />
                <CheatRow element={ui("Inline Code")} syntax="`code`" />
                <CheatRow element={ui("Code Block")} syntax="```language\ncode\n```" />
                <CheatRow element={ui("Blockquote")} syntax="> quote" />
                <CheatRow element={ui("Unordered List")} syntax="- item" />
                <CheatRow element={ui("Ordered List")} syntax="1. item" />
                <CheatRow element={ui("Horizontal Rule")} syntax="---" />
                <CheatRow element={ui("Table")} syntax="| H1 | H2 |\n|---|---|\n| A | B |" />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CheatRow({ element, syntax }: { element: string; syntax: string }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="py-1.5 pr-4 font-sans text-gray-700 dark:text-gray-300">{element}</td>
      <td className="py-1.5 text-gray-500 dark:text-gray-400 whitespace-pre-wrap">{syntax}</td>
    </tr>
  );
}
