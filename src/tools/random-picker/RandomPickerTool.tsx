"use client";

import { useState, useRef, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import { spinWheel, flipCoin, rollDice } from "./logic";
import type { CoinResult, DiceRollResult } from "./logic";

type TabMode = "wheel" | "coin" | "dice";

const WHEEL_COLORS = [
  "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#06b6d4",
  "#84cc16", "#e11d48", "#0ea5e9", "#a855f7", "#22c55e",
  "#eab308", "#d946ef", "#2dd4bf", "#fb923c", "#818cf8",
];

const DICE_TYPES = [
  { sides: 4, label: "d4" },
  { sides: 6, label: "d6" },
  { sides: 8, label: "d8" },
  { sides: 10, label: "d10" },
  { sides: 12, label: "d12" },
  { sides: 20, label: "d20" },
];

// ─── Wheel Spinner ───────────────────────────────────────────────

function WheelSpinner({ ui }: { ui: (s: string) => string }) {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const addItem = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setItems((prev) => [...prev, trimmed]);
      setInputValue("");
    }
  }, [inputValue]);

  const addBulkItems = useCallback(() => {
    const newItems = bulkText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (newItems.length) {
      setItems((prev) => [...prev, ...newItems]);
      setBulkText("");
      setBulkMode(false);
    }
  }, [bulkText]);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSpin = useCallback(() => {
    if (items.length < 2 || spinning) return;
    setSpinning(true);
    setResult(null);

    const { winnerIndex, rotation } = spinWheel(items.length);
    const newRotation = currentRotation + rotation;
    setCurrentRotation(newRotation);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(-${newRotation}deg)`;
    }

    setTimeout(() => {
      setResult(items[winnerIndex]);
      setSpinning(false);
    }, 4200);
  }, [items, spinning, currentRotation]);

  // Build conic-gradient
  const gradient = items.length >= 2
    ? items
        .map((_, i) => {
          const start = (i / items.length) * 100;
          const end = ((i + 1) / items.length) * 100;
          const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
          return `${color} ${start}% ${end}%`;
        })
        .join(", ")
    : "#d1d5db 0% 100%";

  return (
    <div className="space-y-4">
      {/* Item Input */}
      <div className="space-y-3">
        {!bulkMode ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder={ui("Type an option and press Enter")}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={addItem}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                         transition-colors"
            >
              {ui("Add")}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <textarea
              rows={4}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={ui("One item per line")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={addBulkItems}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                         transition-colors"
            >
              {ui("Add All")}
            </button>
          </div>
        )}

        <button
          onClick={() => setBulkMode(!bulkMode)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          {bulkMode ? ui("Single input mode") : ui("Bulk input mode (one per line)")}
        </button>
      </div>

      {/* Item List */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: WHEEL_COLORS[i % WHEEL_COLORS.length] }}
            >
              {item}
              <button
                onClick={() => removeItem(i)}
                className="ml-0.5 hover:text-gray-200 transition-colors"
                aria-label={`${ui("Remove")} ${item}`}
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={() => { setItems([]); setResult(null); }}
            className="text-xs text-red-500 dark:text-red-400 hover:underline"
          >
            {ui("Clear All")}
          </button>
        </div>
      )}

      {/* Wheel + Spin */}
      <div className="flex flex-col items-center gap-4">
        {/* Pointer */}
        <div className="relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10
                        w-0 h-0 border-l-[10px] border-l-transparent
                        border-r-[10px] border-r-transparent
                        border-t-[20px] border-t-red-600 dark:border-t-red-500"
          />
          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg
                       relative overflow-hidden"
            style={{
              background: `conic-gradient(${gradient})`,
              transform: `rotate(-${currentRotation}deg)`,
            }}
          >
            {/* Segment Labels */}
            {items.length >= 2 &&
              items.map((item, i) => {
                const segAngle = 360 / items.length;
                const midAngle = segAngle * i + segAngle / 2;
                const rad = (midAngle * Math.PI) / 180;
                const labelRadius = 0.35;
                const x = 50 + labelRadius * 100 * Math.sin(rad);
                const y = 50 - labelRadius * 100 * Math.cos(rad);
                return (
                  <div
                    key={i}
                    className="absolute text-white text-[10px] sm:text-xs font-bold drop-shadow-md
                               pointer-events-none select-none"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${midAngle}deg)`,
                      maxWidth: "60px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        </div>

        <button
          onClick={handleSpin}
          disabled={items.length < 2 || spinning}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                     hover:from-purple-700 hover:to-pink-700
                     disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600
                     text-white font-bold text-lg shadow-lg
                     transition-all transform hover:scale-105 active:scale-95
                     disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {spinning ? ui("Spinning...") : ui("Spin!")}
        </button>

        {items.length < 2 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ui("Add at least 2 items to spin")}
          </p>
        )}
      </div>

      {/* Result */}
      {result && !spinning && (
        <div aria-live="polite" className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50
                        dark:from-purple-900/30 dark:to-pink-900/30
                        border border-purple-200 dark:border-purple-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{ui("The winner is...")}</p>
          <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{result}</p>
        </div>
      )}
    </div>
  );
}

// ─── Coin Flip ───────────────────────────────────────────────────

interface FlipRecord {
  result: CoinResult;
  id: number;
}

function CoinFlip({ ui }: { ui: (s: string) => string }) {
  const [flipping, setFlipping] = useState(false);
  const [currentResult, setCurrentResult] = useState<CoinResult | null>(null);
  const [history, setHistory] = useState<FlipRecord[]>([]);
  const [flipKey, setFlipKey] = useState(0);
  const idRef = useRef(0);

  const handleFlip = useCallback(() => {
    if (flipping) return;
    setFlipping(true);
    setCurrentResult(null);
    setFlipKey((k) => k + 1);

    setTimeout(() => {
      const result = flipCoin();
      setCurrentResult(result);
      setFlipping(false);
      idRef.current += 1;
      setHistory((prev) => [{ result, id: idRef.current }, ...prev].slice(0, 10));
    }, 1500);
  }, [flipping]);

  const headsCount = history.filter((h) => h.result === "heads").length;
  const tailsCount = history.filter((h) => h.result === "tails").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-6">
        {/* Coin */}
        <div
          className="w-40 h-40 sm:w-48 sm:h-48"
          style={{ perspective: "600px" }}
        >
          <div
            key={flipKey}
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              animation: flipping ? "coinFlip 1.5s ease-out forwards" : "none",
              transform: currentResult === "tails" ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Heads */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center
                         bg-gradient-to-br from-yellow-400 to-yellow-600
                         border-4 border-yellow-700 shadow-xl"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-5xl sm:text-6xl font-bold text-yellow-900 select-none">H</span>
            </div>
            {/* Tails */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center
                         bg-gradient-to-br from-amber-300 to-amber-500
                         border-4 border-amber-700 shadow-xl"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <span className="text-5xl sm:text-6xl font-bold text-amber-900 select-none">T</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleFlip}
          disabled={flipping}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500
                     hover:from-yellow-600 hover:to-amber-600
                     disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600
                     text-white font-bold text-lg shadow-lg
                     transition-all transform hover:scale-105 active:scale-95
                     disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {flipping ? ui("Flipping...") : ui("Flip Coin")}
        </button>
      </div>

      {/* Result */}
      {currentResult && !flipping && (
        <div aria-live="polite" className="text-center p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50
                        dark:from-yellow-900/20 dark:to-amber-900/20
                        border border-yellow-200 dark:border-yellow-700">
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 capitalize">
            {currentResult === "heads" ? ui("Heads") : ui("Tails")}
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{ui("History")}</h3>
            <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>{ui("Heads")}: {headsCount}</span>
              <span>{ui("Tails")}: {tailsCount}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {history.map((h) => (
              <span
                key={h.id}
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                  ${h.result === "heads"
                    ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700"
                    : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                  }`}
              >
                {h.result === "heads" ? "H" : "T"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes coinFlip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(${currentResult === "tails" ? "900" : "720"}deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Dice Roll ───────────────────────────────────────────────────

interface RollRecord {
  dice: number[];
  total: number;
  diceType: number;
  id: number;
}

function DiceRoll({ ui }: { ui: (s: string) => string }) {
  const [diceCount, setDiceCount] = useState(1);
  const [diceType, setDiceType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<DiceRollResult | null>(null);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [rollKey, setRollKey] = useState(0);
  const idRef = useRef(0);

  const handleRoll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setRollKey((k) => k + 1);

    setTimeout(() => {
      const result = rollDice(diceCount, diceType);
      setCurrentRoll(result);
      setRolling(false);
      idRef.current += 1;
      setHistory((prev) => [{ ...result, id: idRef.current }, ...prev].slice(0, 10));
    }, 800);
  }, [rolling, diceCount, diceType]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {ui("Number of Dice")}
          </label>
          <select
            value={diceCount}
            onChange={(e) => setDiceCount(Number(e.target.value))}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {ui("Dice Type")}
          </label>
          <select
            value={diceType}
            onChange={(e) => setDiceType(Number(e.target.value))}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {DICE_TYPES.map((d) => (
              <option key={d.sides} value={d.sides}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dice Display + Roll Button */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3 flex-wrap justify-center">
          {currentRoll ? (
            currentRoll.dice.map((value, i) => (
              <div
                key={`${rollKey}-${i}`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white dark:bg-gray-800
                           border-2 border-gray-300 dark:border-gray-600
                           shadow-lg flex items-center justify-center
                           text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100"
                style={{
                  animation: rolling ? "diceShake 0.8s ease-out" : "none",
                }}
              >
                {value}
              </div>
            ))
          ) : (
            Array.from({ length: diceCount }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-100 dark:bg-gray-800
                           border-2 border-dashed border-gray-300 dark:border-gray-600
                           flex items-center justify-center
                           text-2xl text-gray-400 dark:text-gray-500"
              >
                ?
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {currentRoll && currentRoll.dice.length > 1 && !rolling && (
          <p aria-live="polite" className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {ui("Total")}: <span className="text-blue-600 dark:text-blue-400">{currentRoll.total}</span>
          </p>
        )}

        <button
          onClick={handleRoll}
          disabled={rolling}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600
                     hover:from-blue-700 hover:to-indigo-700
                     disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600
                     text-white font-bold text-lg shadow-lg
                     transition-all transform hover:scale-105 active:scale-95
                     disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {rolling ? ui("Rolling...") : ui("Roll!")}
        </button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{ui("History")}</h3>
          <div className="space-y-1">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400
                           px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <span className="font-medium text-gray-500 dark:text-gray-500">
                  {h.dice.length}d{h.diceType}
                </span>
                <span className="text-gray-400 dark:text-gray-600">|</span>
                <span>
                  [{h.dice.join(", ")}]
                </span>
                {h.dice.length > 1 && (
                  <>
                    <span className="text-gray-400 dark:text-gray-600">=</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{h.total}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes diceShake {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-4px, -2px) rotate(-8deg); }
          20% { transform: translate(4px, 2px) rotate(8deg); }
          30% { transform: translate(-3px, 3px) rotate(-6deg); }
          40% { transform: translate(3px, -3px) rotate(6deg); }
          50% { transform: translate(-2px, 2px) rotate(-4deg); }
          60% { transform: translate(2px, -2px) rotate(4deg); }
          70% { transform: translate(-1px, 1px) rotate(-2deg); }
          80% { transform: translate(1px, -1px) rotate(2deg); }
          90% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────

export function RandomPickerTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [activeTab, setActiveTab] = useState<TabMode>("wheel");

  const tabs: { key: TabMode; label: string; icon: string }[] = [
    { key: "wheel", label: ui("Wheel Spinner"), icon: "🎡" },
    { key: "coin", label: ui("Coin Flip"), icon: "🪙" },
    { key: "dice", label: ui("Dice Roll"), icon: "🎲" },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-sm font-medium
                        transition-all duration-200
              ${activeTab === tab.key
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-6">
        {activeTab === "wheel" && <WheelSpinner ui={ui} />}
        {activeTab === "coin" && <CoinFlip ui={ui} />}
        {activeTab === "dice" && <DiceRoll ui={ui} />}
      </div>
    </div>
  );
}
