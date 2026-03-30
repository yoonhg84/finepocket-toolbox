"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useI18n } from "@/components/layout/LocaleProvider";
import { getToolUiText } from "@/tools/ui-text";
import {
  CURRENCIES,
  POPULAR_PAIRS,
  convertCurrency,
  formatCurrencyAmount,
  formatRate,
} from "./logic";

interface RatesData {
  base: string;
  lastUpdated: string;
  rates: Record<string, number>;
}

// ---------- Searchable Currency Dropdown ----------

function CurrencyDropdown({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (code: string) => void;
}) {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return CURRENCIES;
    const q = search.toLowerCase();
    return CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }, [search]);

  const selected = CURRENCIES.find((c) => c.code === value);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [locale]);

  const handleSelect = useCallback(
    (code: string) => {
      onChange(code);
      setOpen(false);
      setSearch("");
    },
    [onChange]
  );

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
      >
        {selected && (
          <>
            <span className="text-lg">{selected.flag}</span>
            <span className="font-medium dark:text-gray-100">{selected.code}</span>
            <span className="text-gray-500 dark:text-gray-400 truncate">{selected.name}</span>
          </>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-hidden">
          <div className="p-2 border-b border-gray-100 dark:border-gray-800">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={ui("Search currency...")}
              className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
                {ui("No currencies found")}
              </div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                    c.code === value ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : ""
                  }`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-medium dark:text-gray-100">{c.code}</span>
                  <span className="text-gray-500 dark:text-gray-400 truncate">{c.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Main Component ----------

export function CurrencyConverterTool() {
  const { locale } = useI18n();
  const ui = getToolUiText(locale);
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("KRW");
  const [ratesData, setRatesData] = useState<RatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch rates
  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/exchange-rates");
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data: RatesData = await res.json();
        if (!cancelled) {
          setRatesData(data);
        }
      } catch {
        if (!cancelled) {
          setError(
            locale === "ko"
              ? "환율 데이터를 불러오지 못했습니다. 연결 상태를 확인한 뒤 다시 시도하세요."
              : "Unable to load exchange rates. Please check your connection and try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRates();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Conversion result
  const result = useMemo(() => {
    if (!ratesData || amount <= 0) return null;
    return convertCurrency(amount, fromCurrency, toCurrency, ratesData.rates);
  }, [amount, fromCurrency, toCurrency, ratesData]);

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />
        <div className="h-48 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />
        <div className="h-32 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center">
        <p className="text-red-700 dark:text-red-300 font-medium mb-2">
          {ui("Could not load exchange rates")}
        </p>
        <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          {ui("Retry")}
        </button>
      </div>
    );
  }

  const fromInfo = CURRENCIES.find((c) => c.code === fromCurrency);
  const toInfo = CURRENCIES.find((c) => c.code === toCurrency);

  return (
    <div className="space-y-6">
      {/* Amount input */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {ui("Amount")}
        </label>
        <input
          id="amount"
          type="number"
          min={0}
          step="any"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Currency selectors with swap */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
        <CurrencyDropdown
          id="from-currency"
          label={ui("From")}
          value={fromCurrency}
          onChange={setFromCurrency}
        />

        <button
          type="button"
          onClick={handleSwap}
          className="mb-0.5 p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
          title={ui("Swap currencies")}
          aria-label={ui("Swap currencies")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>

        <CurrencyDropdown
          id="to-currency"
          label={ui("To")}
          value={toCurrency}
          onChange={setToCurrency}
        />
      </div>

      {/* Result */}
      {result && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-5">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {fromInfo?.flag} {formatCurrencyAmount(amount, fromCurrency)}{" "}
            {fromCurrency} =
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {toInfo?.flag} {formatCurrencyAmount(result.convertedAmount, toCurrency)}{" "}
            {toCurrency}
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>
              1 {fromCurrency} = {formatRate(result.rate)} {toCurrency}
            </span>
            <span>
              1 {toCurrency} = {formatRate(result.reverseRate)} {fromCurrency}
            </span>
          </div>
          {ratesData?.lastUpdated && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {ui("Last updated")}: {ratesData.lastUpdated}
            </p>
          )}
        </div>
      )}

      {/* YMYL Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-3">
        <p className="text-xs text-amber-800 dark:text-amber-200">
          {locale === "ko"
            ? "표시된 환율은 참고용입니다. 실제 거래 환율은 다를 수 있으므로 금융기관의 안내를 다시 확인하세요."
            : "Exchange rates shown are for reference only. Actual transaction rates may differ. Please confirm with your financial institution."}
        </p>
      </div>

      {/* Popular Conversions Table */}
      {ratesData && (
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {ui("Popular Exchange Rates")}
          </h3>
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {ui("Pair")}
                  </th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {ui("Rate")}
                  </th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600 dark:text-gray-400">
                    {ui("Reverse")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {POPULAR_PAIRS.map(([from, to]) => {
                  const pair = convertCurrency(
                    1,
                    from,
                    to,
                    ratesData.rates
                  );
                  if (!pair) return null;
                  const fromC = CURRENCIES.find(
                    (c) => c.code === from
                  );
                  const toC = CURRENCIES.find(
                    (c) => c.code === to
                  );
                  return (
                    <tr
                      key={`${from}-${to}`}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2 dark:text-gray-300">
                        {fromC?.flag} {from} / {toC?.flag} {to}
                      </td>
                      <td className="px-4 py-2 text-right font-mono dark:text-gray-300">
                        {formatRate(pair.rate)}
                      </td>
                      <td className="px-4 py-2 text-right font-mono dark:text-gray-300">
                        {formatRate(pair.reverseRate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
