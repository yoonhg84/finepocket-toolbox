import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALES,
  type Locale,
} from "./config";
import { getMessages, type Messages } from "./messages";
import { createTranslator, type TranslateFn } from "./translate";

const SUPPORTED_LOCALES = new Set<string>(LOCALES);

function normalizeLocale(value?: string | null): Locale | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.has(normalized) ? (normalized as Locale) : null;
}

function detectLocaleFromHeader(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  for (const part of acceptLanguage.split(",")) {
    const locale = normalizeLocale(part.split(";")[0]);
    if (locale) return locale;
  }

  return DEFAULT_LOCALE;
}

export function getRequestLocale(): Locale {
  const cookieLocale = normalizeLocale(cookies().get(LOCALE_COOKIE_NAME)?.value);
  if (cookieLocale) return cookieLocale;

  return detectLocaleFromHeader(headers().get("accept-language"));
}

export function getRequestMessages(): Messages {
  return getMessages(getRequestLocale());
}

export function getServerTranslator(locale = getRequestLocale()): TranslateFn {
  return createTranslator(getMessages(locale));
}
