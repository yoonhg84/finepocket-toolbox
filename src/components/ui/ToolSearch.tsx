"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ALL_TOOLS, getToolHref } from "@/lib/tools-registry";
import { getLocalizedToolText } from "@/i18n/tools";
import { useI18n } from "@/components/layout/LocaleProvider";

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale, t } = useI18n();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_TOOLS.filter((tool) => {
      const localized = getLocalizedToolText(tool, t);
      return (
        localized.name.toLowerCase().includes(q) ||
        localized.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }, [query, t]);

  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const navigate = (index: number) => {
    const tool = results[index];
    if (tool) {
      router.push(getToolHref(tool, locale));
      setOpen(false);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      navigate(activeIndex);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
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
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("home.searchPlaceholder", undefined, "Search tools...")}
          className="w-full pl-10 pr-16 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-colors"
          aria-label={t("home.searchPlaceholder", undefined, "Search tools...")}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-autocomplete="list"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-1.5 py-0.5 text-xs text-gray-400 dark:text-gray-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      {open && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
        >
          {results.map((tool, i) => {
            const localized = getLocalizedToolText(tool, t);
            return (
              <li
                key={tool.slug}
                role="option"
                aria-selected={i === activeIndex}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={() => navigate(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded shrink-0">
                  {tool.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-medium truncate">{localized.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {localized.shortDescription}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
