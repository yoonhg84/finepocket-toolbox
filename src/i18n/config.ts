export const LOCALES = ["en", "de", "ja", "es", "fr", "pt", "ko"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  pt: "Português",
  ko: "한국어",
};
