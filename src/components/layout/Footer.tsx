import Link from "next/link";
import { getServerTranslator } from "@/i18n/server";

export function Footer() {
  const t = getServerTranslator();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-[960px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-300">{t("footer.about")}</Link>
            <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300">{t("footer.terms")}</Link>
            <Link href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">{t("footer.contact")}</Link>
          </div>
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          {t("footer.browserOnly")}
        </p>
      </div>
    </footer>
  );
}
