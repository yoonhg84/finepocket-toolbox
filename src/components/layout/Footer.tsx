import { ConsentSettingsLink } from "@/components/layout/ConsentSettingsLink";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n";
import { getServerTranslator } from "@/i18n/server";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getServerTranslator(locale);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-[1080px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <Link href={localizePath("/about", locale)} className="text-gray-500 hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300">{t("footer.about")}</Link>
            <Link href={localizePath("/privacy", locale)} className="text-gray-500 hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300">{t("footer.privacy")}</Link>
            <Link href={localizePath("/terms", locale)} className="text-gray-500 hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300">{t("footer.terms")}</Link>
            <Link href={localizePath("/contact", locale)} className="text-gray-500 hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300">{t("footer.contact")}</Link>
            <ConsentSettingsLink
              label={t(
                "footer.privacyChoices",
                undefined,
                "Privacy & cookie settings"
              )}
              className="text-gray-500 hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300"
            />
          </div>
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          {t("footer.browserOnly")}
        </p>
      </div>
    </footer>
  );
}
