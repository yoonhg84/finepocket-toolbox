"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import {
  generateQrMatrix,
  renderQrToCanvas,
  canvasToDataUrl,
  canvasToBlob,
  type ErrorCorrectionLevel,
} from "./logic";

const EC_LEVELS: { value: ErrorCorrectionLevel; label: string; detail: string }[] = [
  { value: "L", label: "L", detail: "7%" },
  { value: "M", label: "M", detail: "15%" },
  { value: "Q", label: "Q", detail: "25%" },
  { value: "H", label: "H", detail: "30%" },
];

export function QrCodeTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);

  const [text, setText] = useState("");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ecLevel, setEcLevel] = useState<ErrorCorrectionLevel>("M");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!text.trim()) {
      const ctx = canvas.getContext("2d");
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
      }
      setError(null);
      return;
    }

    try {
      const matrix = generateQrMatrix(text, ecLevel);
      renderQrToCanvas(canvas, matrix, size, fgColor, bgColor);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : ui("Failed to generate QR code"));
      const ctx = canvas.getContext("2d");
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
      }
    }
  }, [text, size, fgColor, bgColor, ecLevel]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(generate, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [generate]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;
    const url = canvasToDataUrl(canvas);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  }, [text]);

  const handleCopy = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;
    try {
      const blob = await canvasToBlob(canvas);
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy data URL as text
      const url = canvasToDataUrl(canvas);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const hasContent = text.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label
          htmlFor="qr-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {ui("Text / URL")}
        </label>
        <textarea
          id="qr-input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={ui("Enter text or URL to encode…")}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Size slider */}
        <div>
          <label
            htmlFor="qr-size"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {ui("Size")}: {size}px
          </label>
          <input
            id="qr-size"
            type="range"
            min={100}
            max={500}
            step={10}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            <span>100px</span>
            <span>500px</span>
          </div>
        </div>

        {/* Error Correction Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {ui("Error Correction")}
          </label>
          <div className="flex gap-1">
            {EC_LEVELS.map(({ value, label, detail }) => (
              <button
                key={value}
                onClick={() => setEcLevel(value)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  ecLevel === value
                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div>{label}</div>
                <div className={`text-[10px] ${ecLevel === value ? "text-blue-100" : "text-gray-400 dark:text-gray-500"}`}>
                  {detail}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Foreground Color */}
        <div>
          <label
            htmlFor="qr-fg-color"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {ui("Foreground Color")}
          </label>
          <div className="flex items-center gap-2">
            <input
              id="qr-fg-color"
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={fgColor}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setFgColor(v);
              }}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label
            htmlFor="qr-bg-color"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {ui("Background Color")}
          </label>
          <div className="flex items-center gap-2">
            <input
              id="qr-bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setBgColor(v);
              }}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* QR Code Preview */}
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            role="img"
            aria-label={text.trim() ? `QR code: ${text.trim().slice(0, 100)}` : "QR code"}
            className="block max-w-full h-auto rounded"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={!hasContent || !!error}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
            {ui("Download PNG")}
          </button>

          <button
            onClick={handleCopy}
            disabled={!hasContent || !!error}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copied ? ui("Copied!") : ui("Copy to Clipboard")}
          </button>
        </div>
      </div>
    </div>
  );
}
