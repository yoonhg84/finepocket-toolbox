"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import {
  ALL_EMOJIS,
  CATEGORIES,
  SKIN_TONES,
  searchEmojis,
  getEmojisByCategory,
  getRecentEmojis,
  addRecentEmoji,
  applySkinTone,
  supportsSkinTone,
  type EmojiCategory,
} from "./logic";

export function EmojiPickerTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>(CATEGORIES[0]);
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [skinToneIndex, setSkinToneIndex] = useState(0);
  const [showSkinTones, setShowSkinTones] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout>>();
  const skinToneRef = useRef<HTMLDivElement>(null);

  // Load recent emojis on mount
  useEffect(() => {
    setRecentEmojis(getRecentEmojis());
  }, []);

  // Close skin tone picker on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (skinToneRef.current && !skinToneRef.current.contains(e.target as Node)) {
        setShowSkinTones(false);
      }
    }
    if (showSkinTones) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSkinTones]);

  const skinToneModifier = SKIN_TONES[skinToneIndex].modifier;

  const filteredEmojis = useMemo(() => {
    if (search.trim()) {
      return searchEmojis(search, ALL_EMOJIS);
    }
    return getEmojisByCategory(activeCategory);
  }, [search, activeCategory]);

  const handleCopy = useCallback(
    async (emoji: string) => {
      const display = supportsSkinTone(emoji) ? applySkinTone(emoji, skinToneModifier) : emoji;
      const success = await copyToClipboard(display);
      if (success) {
        const updated = addRecentEmoji(display);
        setRecentEmojis(updated);
        setToast(display);
        if (toastTimeout.current) clearTimeout(toastTimeout.current);
        toastTimeout.current = setTimeout(() => setToast(null), 1500);
      }
    },
    [skinToneModifier]
  );

  const renderEmoji = (emoji: string) => {
    if (supportsSkinTone(emoji)) {
      return applySkinTone(emoji, skinToneModifier);
    }
    return emoji;
  };

  const CATEGORY_ICONS: Record<EmojiCategory, string> = {
    "Smileys & Emotion": "\u{1F600}",
    "Gestures & People": "\u{1F44B}",
    "Animals & Nature": "\u{1F43B}",
    "Food & Drink": "\u{1F354}",
    "Travel & Places": "\u{2708}\u{FE0F}",
    "Objects": "\u{1F4BB}",
    "Symbols": "\u{2764}\u{FE0F}",
    "Flags": "\u{1F3F3}\u{FE0F}",
  };

  return (
    <div className="space-y-4">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium animate-bounce-in">
          <span className="text-lg">{toast}</span>
          <span>{ui("Copied!")}</span>
        </div>
      )}

      {/* Search and skin tone row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ui("Search emojis...")}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Skin tone selector */}
        <div className="relative" ref={skinToneRef}>
          <button
            onClick={() => setShowSkinTones(!showSkinTones)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:bg-gray-800"
            title={ui("Skin tone")}
          >
            <span className="text-lg">
              {skinToneIndex === 0 ? "\u{270B}" : applySkinTone("\u{270B}", SKIN_TONES[skinToneIndex].modifier)}
            </span>
            <svg className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showSkinTones && (
            <div className="absolute right-0 top-full mt-1 z-40 flex gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-lg">
              {SKIN_TONES.map((tone, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSkinToneIndex(i);
                    setShowSkinTones(false);
                  }}
                  className={`text-2xl p-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    skinToneIndex === i
                      ? "bg-blue-100 dark:bg-blue-900/40 ring-2 ring-blue-400 dark:ring-blue-500"
                      : ""
                  }`}
                  title={tone.label}
                >
                  {i === 0 ? "\u{270B}" : applySkinTone("\u{270B}", tone.modifier)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category tabs */}
      {!search.trim() && (
        <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              <span className="hidden sm:inline">{ui(cat)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Recently used */}
      {!search.trim() && recentEmojis.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            {ui("Recently Used")}
          </h3>
          <div className="flex flex-wrap gap-1">
            {recentEmojis.map((emoji, i) => (
              <button
                key={`${emoji}-${i}`}
                onClick={() => handleCopy(emoji)}
                className="w-10 h-10 flex items-center justify-center text-2xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-90"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emoji grid */}
      <div>
        {search.trim() ? (
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            {ui("Search Results")} ({filteredEmojis.length})
          </h3>
        ) : (
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            {ui(activeCategory)}
          </h3>
        )}

        {filteredEmojis.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
            <span className="text-4xl mb-2">{"\u{1F50D}"}</span>
            <p className="text-sm">{ui("No emojis found")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-0.5">
            {filteredEmojis.map((emojiData) => (
              <button
                key={emojiData.emoji + emojiData.name}
                onClick={() => handleCopy(emojiData.emoji)}
                className="group relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-2xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
                title={emojiData.name}
              >
                {renderEmoji(emojiData.emoji)}
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 text-xs rounded px-2 py-1 whitespace-nowrap z-30 shadow-md">
                  {emojiData.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Inline style for bounce animation */}
      <style jsx>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.95); }
          50% { transform: translateX(-50%) translateY(2px) scale(1.02); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
