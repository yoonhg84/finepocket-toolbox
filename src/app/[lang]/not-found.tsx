import Link from "next/link";
import { getRequestLocale, getServerTranslator } from "@/i18n/server";
import { localizePath } from "@/i18n";

export default function NotFound() {
  const locale = getRequestLocale();
  const t = getServerTranslator(locale);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-gray-300 dark:text-gray-600">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {t("notFound.title")}
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {t("notFound.description")}
        </p>
        <Link
          href={localizePath("/", locale)}
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
        >
          {t("common.home", undefined, "Home")}
        </Link>
      </div>
    </div>
  );
}
