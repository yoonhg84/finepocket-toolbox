"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { getToolUiText } from "@/tools/ui-text";
import { generateWords, generateSentences, generateParagraphs } from "./logic";

type Unit = "words" | "sentences" | "paragraphs";

export function LoremIpsumTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [quantity, setQuantity] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [wrapHtml, setWrapHtml] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = useCallback(() => {
    const clamped = Math.max(1, Math.min(100, quantity));

    switch (unit) {
      case "words":
        setOutput(generateWords(clamped, startWithLorem));
        break;
      case "sentences":
        setOutput(generateSentences(clamped, startWithLorem));
        break;
      case "paragraphs":
        setOutput(generateParagraphs(clamped, startWithLorem, wrapHtml));
        break;
    }
  }, [unit, quantity, startWithLorem, wrapHtml]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Unit selector */}
        <div>
          <label
            htmlFor="unit"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
          >
            {ui("Unit")}
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="words">{ui("Words")}</option>
            <option value="sentences">{ui("Sentences")}</option>
            <option value="paragraphs">{ui("Paragraphs")}</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
          >
            {ui("Quantity")}
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1))
              )
            }
            className="w-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            {ui('Start with "Lorem ipsum"')}
          </label>
          {unit === "paragraphs" && (
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              {ui("Wrap in HTML <p> tags")}
            </label>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {ui("Generate")}
        </button>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{ui("Output")}</label>
        <textarea
          value={output}
          readOnly
          placeholder={ui("Click Generate to create Lorem Ipsum text...")}
          className="w-full h-64 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-y bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck={false}
        />
        <div className="flex gap-2">
          <CopyButton text={output} label={ui("Copy")} />
          <DownloadButton
            content={output}
            filename="lorem-ipsum.txt"
            mimeType="text/plain"
            label={ui("Download")}
          />
        </div>
      </div>
    </div>
  );
}
