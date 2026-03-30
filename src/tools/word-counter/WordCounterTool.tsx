"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { analyzeText, getKeywordDensity, fleschReadingEase } from "./logic";

export function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => analyzeText(text), [text]);
  const keywords = useMemo(() => getKeywordDensity(text, 10), [text]);
  const readability = useMemo(() => fleschReadingEase(text), [text]);

  const statItems = [
    { label: "Characters", value: stats.characters },
    { label: "No Spaces", value: stats.charactersNoSpaces },
    { label: "Words", value: stats.words },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading Time", value: `${stats.readingTimeMin} min` },
    { label: "Speaking Time", value: `${stats.speakingTimeMin} min` },
  ];

  const reportText = [
    `Word Count Report`,
    `─────────────────`,
    `Characters: ${stats.characters}`,
    `Characters (no spaces): ${stats.charactersNoSpaces}`,
    `Words: ${stats.words}`,
    `Sentences: ${stats.sentences}`,
    `Paragraphs: ${stats.paragraphs}`,
    `Reading Time: ${stats.readingTimeMin} min`,
    `Speaking Time: ${stats.speakingTimeMin} min`,
    `Readability: ${readability.score} (${readability.label})`,
    ``,
    `Top Keywords:`,
    ...keywords.map((k) => `  ${k.word}: ${k.count} (${k.percentage}%)`),
  ].join("\n");

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full min-h-[300px] p-4 border border-gray-300 rounded-lg text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          spellCheck={false}
        />
        <div className="flex gap-2 mt-2">
          <CopyButton getText={() => text} label="Copy Text" />
          <DownloadButton content={reportText} filename="word-count-report.txt" label="Download Report" />
          {text.length > 0 && (
            <button
              onClick={() => setText("")}
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-200 rounded-lg p-3 text-center"
          >
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Readability Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Flesch Reading Ease
        </h3>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-gray-900">
            {text.trim() ? readability.score : "—"}
          </div>
          <div>
            <span
              className={`inline-block px-2.5 py-1 text-sm font-medium rounded-full ${
                readability.score >= 70
                  ? "bg-green-100 text-green-700"
                  : readability.score >= 50
                    ? "bg-yellow-100 text-yellow-700"
                    : text.trim()
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-500"
              }`}
            >
              {text.trim() ? readability.label : "N/A"}
            </span>
          </div>
          {text.trim() && (
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    readability.score >= 70
                      ? "bg-green-500"
                      : readability.score >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${readability.score}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyword Density Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Keyword Density (Top 10)
        </h3>
        {keywords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">
                    #
                  </th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">
                    Keyword
                  </th>
                  <th className="text-right py-2 pr-4 font-medium text-gray-500">
                    Count
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500">
                    Density
                  </th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, i) => (
                  <tr key={kw.word} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 pr-4 text-gray-400">{i + 1}</td>
                    <td className="py-2 pr-4 font-mono text-gray-900">{kw.word}</td>
                    <td className="py-2 pr-4 text-right text-gray-700">{kw.count}</td>
                    <td className="py-2 text-right text-gray-700">{kw.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            Start typing to see keyword density analysis.
          </p>
        )}
      </div>
    </div>
  );
}
