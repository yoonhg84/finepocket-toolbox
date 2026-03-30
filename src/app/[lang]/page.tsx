import Link from "next/link";
import type { TranslateFn } from "@/i18n";
import { getRequestLocale, getServerTranslator } from "@/i18n/server";
import { getLocalizedToolText } from "@/i18n/tools";
import {
  ALL_TOOLS,
  getCategoryHref,
  getToolHref,
  getToolsByCategory,
} from "@/lib/tools-registry";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const locale = getRequestLocale();
  const t = getServerTranslator(locale);

  return buildPageMetadata({
    title: t("home.subtitle"),
    description: t("home.heroDescription"),
    path: "/",
  });
}

const devTools = getToolsByCategory("developer");
const textTools = getToolsByCategory("text");
const financeTools = getToolsByCategory("finance");
const calculatorTools = getToolsByCategory("calculators");

function ToolGrid({
  tools,
  t,
  locale,
}: {
  tools: typeof ALL_TOOLS;
  t: TranslateFn;
  locale: ReturnType<typeof getRequestLocale>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => {
        const localized = getLocalizedToolText(tool, t);

        return (
          <Link
            key={tool.slug}
            href={getToolHref(tool, locale)}
            className="block p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30">
                {tool.icon}
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {localized.name}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{localized.shortDescription}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default function Home() {
  const locale = getRequestLocale();
  const t = getServerTranslator(locale);

  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FinePocket Toolbox",
            url: `https://toolbox.finepocket.app/${locale}`,
            inLanguage: locale,
            description:
              "Free online developer, text, and finance tools. All processing happens in your browser.",
          }),
        }}
      />

      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("home.subtitle")}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("home.heroStats", { count: ALL_TOOLS.length })}
        </p>
      </section>

      <section className="mb-12">
        <Link
          href={getCategoryHref("finance", locale)}
          className="mb-6 inline-block text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
        >
          {t("nav.financeTools")}
        </Link>
        <ToolGrid tools={financeTools} t={t} locale={locale} />
      </section>

      <section className="mb-12">
        <Link
          href={getCategoryHref("calculators", locale)}
          className="mb-6 inline-block text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
        >
          {t("nav.calculatorTools")}
        </Link>
        <ToolGrid tools={calculatorTools} t={t} locale={locale} />
      </section>

      <section className="mb-12">
        <Link
          href={getCategoryHref("developer", locale)}
          className="mb-6 inline-block text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
        >
          {t("nav.developerTools")}
        </Link>
        <ToolGrid tools={devTools} t={t} locale={locale} />
      </section>

      <section className="mb-12">
        <Link
          href={getCategoryHref("text", locale)}
          className="mb-6 inline-block text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
        >
          {t("nav.textTools")}
        </Link>
        <ToolGrid tools={textTools} t={t} locale={locale} />
      </section>

      <section className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t("home.privacyTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{t("home.privacyDescription")}</p>
      </section>
    </div>
  );
}
