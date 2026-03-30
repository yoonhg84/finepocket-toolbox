import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerTranslator } from "@/i18n/server";
import { getLocalizedToolText } from "@/i18n/tools";
import {
  getCategoryHref,
  getCategoryLabelKey,
  type ToolMeta,
} from "@/lib/tools-registry";
import type { ToolContent } from "@/lib/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { RelatedTools } from "./RelatedTools";
import { FaqSection } from "./FaqSection";
import { SeoSection } from "./SeoSection";

interface ToolPageLayoutProps {
  tool: ToolMeta;
  content: ToolContent;
  children: React.ReactNode;
}

export function ToolPageLayout({ tool, content, children }: ToolPageLayoutProps) {
  const t = getServerTranslator();
  const localizedTool = getLocalizedToolText(tool, t);
  const categoryLabel = t(getCategoryLabelKey(tool.category));
  const categoryHref = getCategoryHref(tool.category);
  const breadcrumbItems = [
    { label: t("common.home"), href: "/" },
    { label: categoryLabel, href: categoryHref },
    { label: localizedTool.name },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: t("common.home"), href: "/" },
              { name: categoryLabel, href: categoryHref },
              { name: localizedTool.name },
            ])
          ),
        }}
      />
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{localizedTool.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {localizedTool.shortDescription}{" "}
        <span className="text-gray-400 dark:text-gray-500">{t("toolPage.browserBased")}</span>
      </p>

      <div className="mb-8">{children}</div>

      {/* AdSense placeholder */}
      <div className="my-8" aria-hidden="true" />

      <SeoSection title={t("seo.whatIs", { toolName: localizedTool.name })} content={content.whatIs} />
      <SeoSection title={t("seo.howToUse")} content={content.howToUse} />
      <SeoSection title={t("seo.howItWorks")} content={content.howItWorks} />

      {content.useCases.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t("seo.useCases")}</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
            {content.useCases.map((uc, i) => (
              <li key={i}>{uc}</li>
            ))}
          </ul>
        </section>
      )}

      <FaqSection items={content.faq} title={t("seo.faq")} />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
