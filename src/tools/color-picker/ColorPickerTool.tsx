"use client";

import { useState, useCallback, useEffect } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { CopyButton } from "@/components/ui/CopyButton";
import { getToolUiText } from "@/tools/ui-text";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsb,
  rgbToCmyk,
  getContrastRatio,
  wcagLevel,
  generatePalette,
  parseColorInput,
  type RGB,
} from "./logic";

type PaletteType = "complementary" | "analogous" | "triadic";

export function ColorPickerTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [opacity, setOpacity] = useState(100);
  const [fgHex, setFgHex] = useState("#000000");
  const [bgHex, setBgHex] = useState("#ffffff");
  const [paletteType, setPaletteType] = useState<PaletteType>("complementary");

  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const alpha = opacity / 100;

  // Derived strings
  const hexStr = hex;
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const rgbaStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hslaStr = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`;
  const hsbStr = `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
  const cmykStr = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  // Contrast checker
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);
  const contrastRatio =
    fgRgb && bgRgb ? getContrastRatio(fgRgb, bgRgb) : null;
  const contrastLevel = contrastRatio ? wcagLevel(contrastRatio) : null;

  // Palette
  const palette = generatePalette(hex, paletteType);

  // Input states for text fields
  const [hexInput, setHexInput] = useState(hex);
  const [rgbInput, setRgbInput] = useState(rgbStr);
  const [hslInput, setHslInput] = useState(hslStr);

  // Sync text inputs when rgb changes (from color picker or other source)
  useEffect(() => {
    setHexInput(hex);
    setRgbInput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    const h = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHslInput(`hsl(${h.h}, ${h.s}%, ${h.l}%)`);
  }, [rgb, hex]);

  const updateFromRgb = useCallback((newRgb: RGB) => {
    setRgb({
      r: Math.max(0, Math.min(255, newRgb.r)),
      g: Math.max(0, Math.min(255, newRgb.g)),
      b: Math.max(0, Math.min(255, newRgb.b)),
    });
  }, []);

  const handleColorPicker = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = hexToRgb(e.target.value);
      if (parsed) updateFromRgb(parsed);
    },
    [updateFromRgb]
  );

  const handleHexBlur = useCallback(() => {
    const parsed = parseColorInput(hexInput);
    if (parsed) updateFromRgb(parsed);
    else setHexInput(hex);
  }, [hexInput, hex, updateFromRgb]);

  const handleRgbBlur = useCallback(() => {
    const parsed = parseColorInput(rgbInput);
    if (parsed) updateFromRgb(parsed);
    else setRgbInput(rgbStr);
  }, [rgbInput, rgbStr, updateFromRgb]);

  const handleHslBlur = useCallback(() => {
    const match = hslInput.match(
      /hsla?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})%?\s*[,\s]\s*(\d{1,3})%?/i
    );
    if (match) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10);
      const l = parseInt(match[3], 10);
      if (h <= 360 && s <= 100 && l <= 100) {
        updateFromRgb(hslToRgb(h, s, l));
        return;
      }
    }
    const h2 = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHslInput(`hsl(${h2.h}, ${h2.s}%, ${h2.l}%)`);
  }, [hslInput, rgb, updateFromRgb]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    handler: () => void
  ) => {
    if (e.key === "Enter") handler();
  };

  return (
    <div className="space-y-6">
      {/* Color picker + preview + inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: picker + preview */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <input
              type="color"
              value={hex}
              onChange={handleColorPicker}
              className="w-16 h-16 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer p-0"
              aria-label={ui("Color picker")}
            />
            <div
              className="flex-1 h-16 rounded-lg border border-gray-300 dark:border-gray-600"
              style={{
                backgroundColor:
                  opacity < 100
                    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
                    : hex,
              }}
              aria-label={ui("Color preview")}
            />
          </div>

          {/* Text inputs */}
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">HEX</label>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onBlur={handleHexBlur}
                onKeyDown={(e) => handleKeyDown(e, handleHexBlur)}
                className="w-full px-3 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                placeholder="#3b82f6"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">RGB</label>
              <input
                type="text"
                value={rgbInput}
                onChange={(e) => setRgbInput(e.target.value)}
                onBlur={handleRgbBlur}
                onKeyDown={(e) => handleKeyDown(e, handleRgbBlur)}
                className="w-full px-3 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                placeholder="rgb(59, 130, 246)"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">HSL</label>
              <input
                type="text"
                value={hslInput}
                onChange={(e) => setHslInput(e.target.value)}
                onBlur={handleHslBlur}
                onKeyDown={(e) => handleKeyDown(e, handleHslBlur)}
                className="w-full px-3 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
                placeholder="hsl(217, 91%, 60%)"
              />
            </div>
          </div>

          {/* Opacity slider */}
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              {ui("Opacity")}: {opacity}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>
        </div>

        {/* Right: format values */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {ui("Color Values")}
          </h3>
          <FormatRow label="HEX" value={hexStr} />
          <FormatRow label="RGB" value={rgbStr} />
          {opacity < 100 && <FormatRow label="RGBA" value={rgbaStr} />}
          <FormatRow label="HSL" value={hslStr} />
          {opacity < 100 && <FormatRow label="HSLA" value={hslaStr} />}
          <FormatRow label="HSB" value={hsbStr} />
          <FormatRow label="CMYK" value={cmykStr} />
        </div>
      </div>

      {/* Contrast Checker */}
      <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {ui("Contrast Checker (WCAG)")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              {ui("Foreground")}
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={fgHex}
                onChange={(e) => setFgHex(e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer p-0"
              />
              <input
                type="text"
                value={fgHex}
                onChange={(e) => setFgHex(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              {ui("Background")}
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={bgHex}
                onChange={(e) => setBgHex(e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer p-0"
              />
              <input
                type="text"
                value={bgHex}
                onChange={(e) => setBgHex(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {contrastRatio !== null && contrastLevel !== null && (
          <div className="flex items-center gap-3">
            {/* Preview */}
            <div
              className="flex-1 rounded-md p-3 text-center text-sm font-medium"
              style={{ backgroundColor: bgHex, color: fgHex }}
            >
              {ui("Sample Text — Aa Bb Cc 123")}
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {contrastRatio.toFixed(2)}:1
              </div>
              <span
                className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full ${
                  contrastLevel === "AAA"
                    ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200"
                    : contrastLevel === "AA"
                    ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200"
                    : "bg-red-100 dark:bg-red-900/40 text-red-800"
                }`}
              >
                {contrastLevel}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Palette Generator */}
      <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {ui("Palette Generator")}
        </h3>
        <div className="flex gap-2">
          {(["complementary", "analogous", "triadic"] as PaletteType[]).map(
            (type) => (
              <button
                key={type}
                onClick={() => setPaletteType(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors capitalize ${
                  paletteType === type
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {ui(type)}
              </button>
            )
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {palette.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-16 h-16 rounded-lg border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                {color}
              </span>
              <CopyButton text={color} label={ui("Copy")} className="text-[10px] px-1.5 py-0.5" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---- Helper sub-component ---- */

function FormatRow({ label, value }: { label: string; value: string }) {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);

  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-2">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-12 shrink-0">
        {label}
      </span>
      <code className="text-sm font-mono text-gray-800 dark:text-gray-200 flex-1 truncate">
        {value}
      </code>
      <CopyButton text={value} label={ui("Copy")} className="text-[10px] px-1.5 py-0.5" />
    </div>
  );
}
