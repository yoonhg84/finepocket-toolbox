import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { SitePageContent } from "@/content/site-pages";
import { localizePath } from "@/i18n";
import { getRequestLocale, getServerTranslator } from "@/i18n/server";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

interface ContentPageProps {
  content: SitePageContent;
  path: string;
  children?: ReactNode;
}

export function ContentPage({ content, path, children }: ContentPageProps) {
  const locale = getRequestLocale();
  const t = getServerTranslator(locale);
  const localizedPath = localizePath(path, locale);
  const breadcrumbItems = [
    { label: t("common.home"), href: localizePath("/", locale) },
    { label: content.title },
  ];

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: t("common.home"), href: localizePath("/", locale) },
              { name: content.title, href: localizedPath },
            ])
          ),
        }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {content.title}
      </h1>

      {content.lastUpdated && (
        <p className="mb-8 text-sm text-gray-400 dark:text-gray-500">
          {content.lastUpdatedLabel ?? "Last updated"}: {content.lastUpdated}
        </p>
      )}

      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        {content.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {content.email && (
          <p>
            <a
              href={`mailto:${content.email}`}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {content.email}
            </a>
          </p>
        )}
      </div>

      <div className="mt-8 space-y-8">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
              {section.title}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-1 pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      {children}

      {content.callout && (
        <section className="mt-8 rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {content.callout.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{content.callout.body}</p>
        </section>
      )}
    </div>
  );
}
