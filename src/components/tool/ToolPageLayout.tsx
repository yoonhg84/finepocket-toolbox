import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { localizePath } from "@/i18n";
import { getRequestLocale, getServerTranslator } from "@/i18n/server";
import { getAdSenseClientId, getAdSenseToolSlot } from "@/lib/adsense";
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
  const locale = getRequestLocale();
  const t = getServerTranslator(locale);
  const localizedTool = getLocalizedToolText(tool, t);
  const categoryLabel = t(getCategoryLabelKey(tool.category));
  const categoryHref = getCategoryHref(tool.category, locale);
  const adsenseClientId = getAdSenseClientId();
  const adsenseToolSlot = getAdSenseToolSlot();
  const showAdSlot =
    tool.slug !== "bmi-calculator" &&
    Boolean(adsenseClientId) &&
    Boolean(adsenseToolSlot);
  const breadcrumbItems = [
    { label: t("common.home"), href: localizePath("/", locale) },
    { label: categoryLabel, href: categoryHref },
    { label: localizedTool.name },
  ];

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: t("common.home"), href: localizePath("/", locale) },
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

      {tool.category === "finance" && (
        <section className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/25 dark:text-amber-100">
          <h2 className="font-semibold">
            {t("toolPage.financeNoticeTitle", undefined, "Reference-only finance estimates")}
          </h2>
          <p className="mt-1 text-amber-800 dark:text-amber-200">
            {t(
              "toolPage.financeNoticeBody",
              undefined,
              "Rates, fees, taxes, and provider-specific rules can change the real result. Use these tools for planning and comparison, then confirm terms with the relevant institution."
            )}
          </p>
        </section>
      )}

      {tool.slug === "bmi-calculator" && (
        <section className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900 dark:border-teal-700 dark:bg-teal-900/25 dark:text-teal-100">
          <h2 className="font-semibold">
            {t("toolPage.healthNoticeTitle", undefined, "For informational purposes only")}
          </h2>
          <p className="mt-1 text-teal-800 dark:text-teal-200">
            {t(
              "toolPage.healthNoticeBody",
              undefined,
              "BMI is a general screening tool and does not account for muscle mass, bone density, age, or gender. It is not a medical diagnosis. Please consult a qualified healthcare professional for personalized health advice."
            )}
          </p>
        </section>
      )}

      <div className="mb-8">{children}</div>

      {showAdSlot && adsenseClientId && adsenseToolSlot ? (
        <section className="my-8">
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            {t(
              "toolPage.adDisclosure",
              undefined,
              "Advertising may support this site. Primary controls stay separate from ad placements."
            )}
          </p>
          <AdSlot
            clientId={adsenseClientId}
            slot={adsenseToolSlot}
            className="min-h-[120px]"
          />
        </section>
      ) : null}

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
