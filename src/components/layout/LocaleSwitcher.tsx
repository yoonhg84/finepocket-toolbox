"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LOCALE_COOKIE_NAME,
  LOCALE_LABELS,
  localizePath,
  type Locale,
} from "@/i18n";
import { useI18n } from "./LocaleProvider";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, t } = useI18n();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextLocale: Locale) => {
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLocale;
    startTransition(() => {
      const search = searchParams.toString();
      const nextPath = `${localizePath(pathname, nextLocale)}${
        search ? `?${search}` : ""
      }`;
      router.replace(nextPath);
    });
  };

  return (
    <label className="relative">
      <span className="sr-only">{t("common.selectLanguage")}</span>
      <select
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
        aria-label={t("common.selectLanguage")}
        disabled={isPending}
        className="appearance-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 pr-8 text-sm text-gray-700 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500"
      >
        {Object.entries(LOCALE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400 dark:text-gray-500">
        ▾
      </span>
    </label>
  );
}
