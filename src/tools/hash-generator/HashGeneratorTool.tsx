"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { FileUpload } from "@/components/ui/FileUpload";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import { generateHashes, generateHashesFromBuffer } from "./logic";

const ALGORITHMS = [
  { key: "md5", label: "MD5", bits: 128 },
  { key: "sha1", label: "SHA-1", bits: 160 },
  { key: "sha256", label: "SHA-256", bits: 256 },
  { key: "sha384", label: "SHA-384", bits: 384 },
  { key: "sha512", label: "SHA-512", bits: 512 },
] as const;

type Hashes = Record<string, string>;

export function HashGeneratorTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Hashes>({});
  const [uppercase, setUppercase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounced hash generation for text input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!input.trim()) {
      setHashes({});
      setFileName(null);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const result = await generateHashes(input);
        setHashes(result);
        setFileName(null);
      } catch {
        setHashes({});
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input]);

  const handleFileRead = useCallback((content: string, filename: string) => {
    // content is a data URL; we need raw bytes for hashing
    // Decode from data URL to ArrayBuffer
    const base64 = content.split(",")[1] ?? "";
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    setLoading(true);
    setFileName(filename);
    setInput("");
    generateHashesFromBuffer(bytes.buffer)
      .then(setHashes)
      .catch(() => setHashes({}))
      .finally(() => setLoading(false));
  }, []);

  const formatHash = (hash: string) => (uppercase ? hash.toUpperCase() : hash);
  const hasResults = Object.keys(hashes).length > 0;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label htmlFor="hash-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {ui("Text Input")}
        </label>
        <textarea
          id="hash-input"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ui("Text to hash…")}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        <span className="mx-4 text-sm text-gray-400 dark:text-gray-500">{ui("or")}</span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
      </div>

      <FileUpload
        onFileRead={handleFileRead}
        readAs="dataURL"
        label={ui("Drop a file here or click to browse")}
      />

      {fileName && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {ui("Hashing file:")} <span className="font-medium text-gray-700 dark:text-gray-300">{fileName}</span>
        </p>
      )}

      {/* Options */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          {ui("Uppercase output")}
        </label>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {ui("Computing hashes…")}
        </div>
      )}

      {/* Results Table */}
      {hasResults && !loading && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300 w-28">{ui("Algorithm")}</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300">{ui("Hash Value")}</th>
                <th className="px-4 py-2.5 w-20" />
              </tr>
            </thead>
            <tbody>
              {ALGORITHMS.map(({ key, label, bits }) => {
                const hash = hashes[key];
                if (!hash) return null;
                return (
                  <tr key={key} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                    <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                      <div>{label}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{bits} bit</div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs text-gray-800 dark:text-gray-200 break-all">
                        {formatHash(hash)}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <CopyButton getText={() => formatHash(hash)} label={ui("Copy")} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
