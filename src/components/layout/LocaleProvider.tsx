"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/i18n";
import type { Messages } from "@/i18n/messages";
import { createTranslator, type TranslateFn } from "@/i18n/translate";

interface LocaleContextValue {
  locale: Locale;
  messages: Messages;
  t: TranslateFn;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}

export function LocaleProvider({
  locale,
  messages,
  children,
}: LocaleProviderProps) {
  const value = useMemo(
    () => ({
      locale,
      messages,
      t: createTranslator(messages),
    }),
    [locale, messages]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useI18n must be used within a LocaleProvider.");
  }

  return context;
}

