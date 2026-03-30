"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { generateWords, generateSentences, generateParagraphs } from "./logic";

type Unit = "words" | "sentences" | "paragraphs";

export function LoremIpsumTool() {
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
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Unit
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-700 block mb-1"
          >
            Quantity
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
            className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Start with &quot;Lorem ipsum&quot;
          </label>
          {unit === "paragraphs" && (
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Wrap in HTML &lt;p&gt; tags
            </label>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate
        </button>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Output</label>
        <textarea
          value={output}
          readOnly
          placeholder="Click Generate to create Lorem Ipsum text..."
          className="w-full h-64 p-3 font-mono text-sm border border-gray-300 rounded-lg resize-y bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck={false}
        />
        <div className="flex gap-2">
          <CopyButton text={output} label="Copy" />
          <DownloadButton
            content={output}
            filename="lorem-ipsum.txt"
            mimeType="text/plain"
            label="Download"
          />
        </div>
      </div>
    </div>
  );
}
