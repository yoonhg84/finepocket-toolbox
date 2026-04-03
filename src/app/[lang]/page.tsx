import Link from "next/link";
import type { Locale, TranslateFn } from "@/i18n";
import { getServerTranslator } from "@/i18n/server";
import { getLocalizedToolText } from "@/i18n/tools";
import {
  ALL_TOOLS,
  getCategoryHref,
  getToolHref,
  getToolsByCategory,
} from "@/lib/tools-registry";
import { buildPageMetadata, buildWebsiteJsonLd, buildOrganizationJsonLd } from "@/lib/seo";
import { ToolSearch } from "@/components/ui/ToolSearch";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const t = getServerTranslator(locale);

  return buildPageMetadata({
    title: t("home.subtitle"),
    description: t("home.heroDescription"),
    locale,
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
  locale: Locale;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {tools.map((tool) => {
        const localized = getLocalizedToolText(tool, t);

        return (
          <Link
            key={tool.slug}
            href={getToolHref(tool, locale)}
            className="block p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
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

function CategoryHeading({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400 group"
    >
      {label}
      <svg
        className="h-6 w-6 text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default function Home({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const t = getServerTranslator(locale);

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebsiteJsonLd(t("home.heroDescription"), locale)
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />

      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("home.subtitle")}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          {t("home.heroStats", { count: ALL_TOOLS.length })}
        </p>
        <ToolSearch />
      </section>

      <section className="mb-12">
        <CategoryHeading href={getCategoryHref("developer", locale)} label={t("nav.developerTools")} />
        <ToolGrid tools={devTools} t={t} locale={locale} />
      </section>

      <section className="mb-12">
        <CategoryHeading href={getCategoryHref("text", locale)} label={t("nav.textTools")} />
        <ToolGrid tools={textTools} t={t} locale={locale} />
      </section>

      <section className="mb-12">
        <CategoryHeading href={getCategoryHref("finance", locale)} label={t("nav.financeTools")} />
        <ToolGrid tools={financeTools} t={t} locale={locale} />
      </section>

      <section className="mb-12">
        <CategoryHeading href={getCategoryHref("calculators", locale)} label={t("nav.calculatorTools")} />
        <ToolGrid tools={calculatorTools} t={t} locale={locale} />
      </section>
    </div>
  );
}
