import Link from "next/link";
import { type Locale } from "@/i18n";
import { getServerTranslator } from "@/i18n/server";
import { getLocalizedToolText } from "@/i18n/tools";
import { getRelatedTools, getToolHref } from "@/lib/tools-registry";

interface RelatedToolsProps {
  currentSlug: string;
  locale: Locale;
}

export function RelatedTools({ currentSlug, locale }: RelatedToolsProps) {
  const related = getRelatedTools(currentSlug, 4);
  const t = getServerTranslator(locale);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t("seo.relatedTools")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {related.map((tool) => {
          const localized = getLocalizedToolText(tool, t);

          return (
            <Link
              key={tool.slug}
              href={getToolHref(tool, locale)}
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-900/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="font-mono text-sm mr-2">{tool.icon}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{localized.name}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{localized.shortDescription}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
