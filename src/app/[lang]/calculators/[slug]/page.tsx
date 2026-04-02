import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import { getLocalizedToolPageContent } from "@/content/tool-page-content";
import { getRequestLocale } from "@/i18n/server";
import {
  buildFaqJsonLd,
  buildToolJsonLd,
  buildToolMetadata,
  type ToolContent,
} from "@/lib/seo";
import { getToolBySlug } from "@/lib/tools-registry";
import { content as ageCalculatorContent } from "@/tools/age-calculator/content";
import { content as bmiCalculatorContent } from "@/tools/bmi-calculator/content";
import { content as dataConverterContent } from "@/tools/data-converter/content";
import { content as dateCalculatorContent } from "@/tools/date-calculator/content";
import { content as percentageCalculatorContent } from "@/tools/percentage-calculator/content";
import { content as tipCalculatorContent } from "@/tools/tip-calculator/content";
import { content as randomPickerContent } from "@/tools/random-picker/content";
import { content as unitConverterContent } from "@/tools/unit-converter/content";

const loading = () => (
  <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />
);

const CALCULATOR_COMPONENTS = {
  "age-calculator": dynamic(
    () =>
      import("@/tools/age-calculator/AgeCalculatorTool").then((m) => ({
        default: m.AgeCalculatorTool,
      })),
    { ssr: false, loading }
  ),
  "bmi-calculator": dynamic(
    () =>
      import("@/tools/bmi-calculator/BmiCalculatorTool").then((m) => ({
        default: m.BmiCalculatorTool,
      })),
    { ssr: false, loading }
  ),
  "data-converter": dynamic(
    () =>
      import("@/tools/data-converter/DataConverterTool").then((m) => ({
        default: m.DataConverterTool,
      })),
    { ssr: false, loading }
  ),
  "date-calculator": dynamic(
    () =>
      import("@/tools/date-calculator/DateCalculatorTool").then((m) => ({
        default: m.DateCalculatorTool,
      })),
    { ssr: false, loading }
  ),
  "random-picker": dynamic(
    () =>
      import("@/tools/random-picker/RandomPickerTool").then((m) => ({
        default: m.RandomPickerTool,
      })),
    { ssr: false, loading }
  ),
  "percentage-calculator": dynamic(
    () =>
      import("@/tools/percentage-calculator/PercentageCalculatorTool").then(
        (m) => ({
          default: m.PercentageCalculatorTool,
        })
      ),
    { ssr: false, loading }
  ),
  "tip-calculator": dynamic(
    () =>
      import("@/tools/tip-calculator/TipCalculatorTool").then((m) => ({
        default: m.TipCalculatorTool,
      })),
    { ssr: false, loading }
  ),
  "unit-converter": dynamic(
    () =>
      import("@/tools/unit-converter/UnitConverterTool").then((m) => ({
        default: m.UnitConverterTool,
      })),
    { ssr: false, loading }
  ),
} as const;

type CalculatorToolSlug = keyof typeof CALCULATOR_COMPONENTS;

const CALCULATOR_CONTENT: Record<CalculatorToolSlug, ToolContent> = {
  "age-calculator": ageCalculatorContent,
  "bmi-calculator": bmiCalculatorContent,
  "data-converter": dataConverterContent,
  "date-calculator": dateCalculatorContent,
  "percentage-calculator": percentageCalculatorContent,
  "random-picker": randomPickerContent,
  "tip-calculator": tipCalculatorContent,
  "unit-converter": unitConverterContent,
};

function isCalculatorToolSlug(slug: string): slug is CalculatorToolSlug {
  return slug in CALCULATOR_COMPONENTS;
}

function getCalculatorPageData(slug: string) {
  if (!isCalculatorToolSlug(slug)) {
    return null;
  }

  const tool = getToolBySlug(slug);
  if (!tool || tool.category !== "calculators") {
    return null;
  }

  return {
    tool,
    ToolComponent: CALCULATOR_COMPONENTS[slug],
    baseContent: CALCULATOR_CONTENT[slug],
  };
}

export function generateStaticParams() {
  return Object.keys(CALCULATOR_COMPONENTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const pageData = getCalculatorPageData(params.slug);
  if (!pageData) {
    return {};
  }

  return buildToolMetadata(
    pageData.tool,
    getLocalizedToolPageContent(
      pageData.tool.slug,
      getRequestLocale(),
      pageData.baseContent
    )
  );
}

export default function CalculatorToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const pageData = getCalculatorPageData(params.slug);
  if (!pageData) {
    notFound();
  }

  const content = getLocalizedToolPageContent(
    pageData.tool.slug,
    getRequestLocale(),
    pageData.baseContent
  );
  const ToolComponent = pageData.ToolComponent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildToolJsonLd(pageData.tool, content)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(content.faq)),
        }}
      />
      <ToolPageLayout tool={pageData.tool} content={content}>
        <ToolComponent />
      </ToolPageLayout>
    </>
  );
}
