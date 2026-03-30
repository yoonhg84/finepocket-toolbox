import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

const SUPPORTED_LOCALES = new Set<string>(LOCALES);

function normalizePath(path = "/"): string {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function normalizeLocale(value?: string | null): Locale | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.has(normalized) ? (normalized as Locale) : null;
}

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.has(value);
}

export function detectLocaleFromAcceptLanguage(
  acceptLanguage?: string | null
): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  for (const part of acceptLanguage.split(",")) {
    const locale = normalizeLocale(part.split(";")[0]);
    if (locale) return locale;
  }

  return DEFAULT_LOCALE;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = normalizePath(pathname).split("/");
  return normalizeLocale(segments[1]);
}

export function stripLocalePrefix(pathname: string): string {
  const normalizedPath = normalizePath(pathname);
  const locale = getLocaleFromPathname(normalizedPath);

  if (!locale) return normalizedPath;

  const strippedPath = normalizedPath.slice(locale.length + 1);
  return strippedPath ? strippedPath : "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  const normalizedPath = stripLocalePrefix(pathname);
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}
