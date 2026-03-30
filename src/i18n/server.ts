import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE_NAME,
  type Locale,
} from "./config";
import { getMessages, type Messages } from "./messages";
import {
  detectLocaleFromAcceptLanguage,
  normalizeLocale,
} from "./routing";
import { createTranslator, type TranslateFn } from "./translate";

export function getRequestLocale(): Locale {
  const headerLocale = normalizeLocale(headers().get("x-locale"));
  if (headerLocale) return headerLocale;

  const cookieLocale = normalizeLocale(cookies().get(LOCALE_COOKIE_NAME)?.value);
  if (cookieLocale) return cookieLocale;

  return detectLocaleFromAcceptLanguage(headers().get("accept-language"));
}

export function getRequestMessages(): Messages {
  return getMessages(getRequestLocale());
}

export function getServerTranslator(locale = getRequestLocale()): TranslateFn {
  return createTranslator(getMessages(locale));
}
