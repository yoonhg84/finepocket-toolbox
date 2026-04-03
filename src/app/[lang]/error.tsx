"use client";

import { useI18n } from "@/components/layout/LocaleProvider";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-gray-300 dark:text-gray-600">
          500
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {t("errorPage.title", undefined, "Something went wrong")}
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {t(
            "errorPage.description",
            undefined,
            "An unexpected error occurred. Please try again."
          )}
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
        >
          {t("errorPage.retry", undefined, "Try again")}
        </button>
      </div>
    </div>
  );
}
