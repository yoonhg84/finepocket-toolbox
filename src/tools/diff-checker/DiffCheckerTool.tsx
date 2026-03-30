"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { TabGroup } from "@/components/ui/TabGroup";
import { getToolUiText } from "@/tools/ui-text";
import { computeLineDiff, computeWordDiff, type Change, type DiffStats } from "./logic";

type ViewMode = "inline" | "side-by-side";

const VIEW_TABS = [
  { id: "inline", label: "Inline" },
  { id: "side-by-side", label: "Side-by-side" },
];

export function DiffCheckerTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [changes, setChanges] = useState<Change[] | null>(null);
  const [stats, setStats] = useState<DiffStats | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("inline");

  const handleCompare = useCallback(() => {
    if (!original && !modified) {
      setChanges(null);
      setStats(null);
      return;
    }

    const result =
      viewMode === "inline"
        ? computeWordDiff(original, modified)
        : computeLineDiff(original, modified);

    setChanges(result.changes);
    setStats(result.stats);
  }, [original, modified, viewMode]);

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setChanges(null);
    setStats(null);
  };

  const handleViewChange = (id: string) => {
    setViewMode(id as ViewMode);
    // Re-run comparison with new mode if there are existing results
    if (changes) {
      const result =
        id === "inline"
          ? computeWordDiff(original, modified)
          : computeLineDiff(original, modified);
      setChanges(result.changes);
      setStats(result.stats);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="space-y-2">
          <label
            htmlFor="diff-original"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {ui("Original")}
          </label>
          <textarea
            id="diff-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder={ui("Paste original text here...")}
            className="w-full h-80 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
            spellCheck={false}
          />
        </div>

        {/* Modified */}
        <div className="space-y-2">
          <label
            htmlFor="diff-modified"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {ui("Modified")}
          </label>
          <textarea
            id="diff-modified"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder={ui("Paste modified text here...")}
            className="w-full h-80 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Action buttons and view mode */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleCompare}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {ui("Compare")}
        </button>
        <button
          onClick={handleClear}
          className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {ui("Clear")}
        </button>
        <div className="ml-auto">
          <TabGroup
            tabs={VIEW_TABS.map((tab) => ({ ...tab, label: ui(tab.label) }))}
            activeTab={viewMode}
            onChange={handleViewChange}
          />
        </div>
      </div>

      {/* Results area */}
      {changes && (
        <div className="space-y-4">
          {/* Stats bar */}
          {stats && (
            <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
              <span className="text-green-700 dark:text-green-300 font-medium">
                {locale === "ko"
                  ? `+${stats.additions} 추가`
                  : `+${stats.additions} addition${stats.additions !== 1 ? "s" : ""}`}
              </span>
              <span className="text-red-700 dark:text-red-300 font-medium">
                {locale === "ko"
                  ? `-${stats.deletions} 삭제`
                  : `-${stats.deletions} deletion${stats.deletions !== 1 ? "s" : ""}`}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {locale === "ko"
                  ? `총 ${stats.changes}건 변경`
                  : `${stats.changes} total change${stats.changes !== 1 ? "s" : ""}`}
              </span>
            </div>
          )}

          {/* Diff output */}
          {viewMode === "inline" ? (
            <InlineDiffView changes={changes} />
          ) : (
            <SideBySideDiffView
              changes={changes}
              originalLabel={ui("Original")}
              modifiedLabel={ui("Modified")}
            />
          )}
        </div>
      )}
    </div>
  );
}

function InlineDiffView({ changes }: { changes: Change[] }) {
  return (
    <pre className="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-white dark:bg-gray-800 dark:text-gray-100 max-h-[32rem]">
      {changes.map((part, i) => {
        let className = "";
        if (part.added) className = "diff-added";
        else if (part.removed) className = "diff-removed";

        return (
          <span key={i} className={className}>
            {part.value}
          </span>
        );
      })}
    </pre>
  );
}

function SideBySideDiffView({
  changes,
  originalLabel,
  modifiedLabel,
}: {
  changes: Change[];
  originalLabel: string;
  modifiedLabel: string;
}) {
  // Build left (original) and right (modified) line arrays
  const leftLines: Array<{ text: string; type: "unchanged" | "removed" | "empty" }> = [];
  const rightLines: Array<{ text: string; type: "unchanged" | "added" | "empty" }> = [];

  for (let i = 0; i < changes.length; i++) {
    const part = changes[i];
    const lines = part.value.replace(/\n$/, "").split("\n");

    if (!part.added && !part.removed) {
      // Unchanged lines go to both sides
      for (const line of lines) {
        leftLines.push({ text: line, type: "unchanged" });
        rightLines.push({ text: line, type: "unchanged" });
      }
    } else if (part.removed) {
      // Check if next part is an addition (forms a change pair)
      const next = changes[i + 1];
      if (next?.added) {
        const addedLines = next.value.replace(/\n$/, "").split("\n");
        const maxLen = Math.max(lines.length, addedLines.length);
        for (let j = 0; j < maxLen; j++) {
          leftLines.push(
            j < lines.length
              ? { text: lines[j], type: "removed" }
              : { text: "", type: "empty" }
          );
          rightLines.push(
            j < addedLines.length
              ? { text: addedLines[j], type: "added" }
              : { text: "", type: "empty" }
          );
        }
        i++; // Skip next (added) part
      } else {
        for (const line of lines) {
          leftLines.push({ text: line, type: "removed" });
          rightLines.push({ text: "", type: "empty" });
        }
      }
    } else if (part.added) {
      for (const line of lines) {
        leftLines.push({ text: "", type: "empty" });
        rightLines.push({ text: line, type: "added" });
      }
    }
  }

  const lineClassName = (type: string) => {
    switch (type) {
      case "removed":
        return "diff-removed";
      case "added":
        return "diff-added";
      case "empty":
        return "bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-0 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto max-h-[32rem] font-mono text-sm">
      {/* Left (original) */}
      <div className="border-r border-gray-300 dark:border-gray-600">
        <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 text-xs font-medium text-gray-500 dark:text-gray-400">
          {originalLabel}
        </div>
        <div>
          {leftLines.map((line, i) => (
            <div
              key={i}
              className={`px-3 py-0.5 min-h-[1.5rem] whitespace-pre-wrap break-all ${lineClassName(line.type)}`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}
        </div>
      </div>

      {/* Right (modified) */}
      <div>
        <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 text-xs font-medium text-gray-500 dark:text-gray-400">
          {modifiedLabel}
        </div>
        <div>
          {rightLines.map((line, i) => (
            <div
              key={i}
              className={`px-3 py-0.5 min-h-[1.5rem] whitespace-pre-wrap break-all ${lineClassName(line.type)}`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
