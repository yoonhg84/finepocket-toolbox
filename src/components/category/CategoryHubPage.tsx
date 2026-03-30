import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { CategoryHubContent } from "@/content/category-hubs";
import { localizePath } from "@/i18n";
import { getRequestLocale, getServerTranslator } from "@/i18n/server";
import { getLocalizedToolText } from "@/i18n/tools";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { getToolHref, getToolsByCategory } from "@/lib/tools-registry";

interface CategoryHubPageProps {
  content: CategoryHubContent;
}

export function CategoryHubPage({ content }: CategoryHubPageProps) {
  const locale = getRequestLocale();
  const t = getServerTranslator(locale);
  const tools = getToolsByCategory(content.category);
  const breadcrumbItems = [
    { label: t("common.home"), href: localizePath("/", locale) },
    { label: content.title },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: t("common.home"), href: localizePath("/", locale) },
              { name: content.title },
            ])
          ),
        }}
      />

      <Breadcrumb items={breadcrumbItems} />

      <section className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {content.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {content.description}
        </p>
        <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {content.tasksTitle}
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {content.tasks.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/80">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {content.valueTitle}
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {content.valuePoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {content.toolsTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-5">
          {content.toolsDescription}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const localized = getLocalizedToolText(tool, t);

            return (
              <Link
                key={tool.slug}
                href={getToolHref(tool, locale)}
                className="block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {tool.icon}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {localized.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {localized.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {content.faqTitle}
        </h2>
        <div className="space-y-4">
          {content.faq.map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {item.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/80">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {content.guideTitle}
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {content.guidePoints.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500 dark:bg-violet-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
