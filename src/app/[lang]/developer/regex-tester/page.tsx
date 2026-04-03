import dynamic from "next/dynamic";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import type { Locale } from "@/i18n";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { buildToolMetadata, buildToolJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { getLocalizedToolPageContent } from "@/content/tool-page-content";
import { content as baseContent } from "@/tools/regex-tester/content";

const RegexTesterTool = dynamic(
  () =>
    import("@/tools/regex-tester/RegexTesterTool").then((m) => ({
      default: m.RegexTesterTool,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" />
    ),
  }
);

const tool = ALL_TOOLS.find((t) => t.slug === "regex-tester")!;
export function generateMetadata({ params }: { params: { lang: Locale } }) {
  return buildToolMetadata(
    tool,
    getLocalizedToolPageContent(tool.slug, params.lang, baseContent),
    params.lang
  );
}

export default function Page({ params }: { params: { lang: Locale } }) {
  const content = getLocalizedToolPageContent(tool.slug, params.lang, baseContent);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildToolJsonLd(tool, content, params.lang)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(content.faq)),
        }}
      />
      <ToolPageLayout tool={tool} content={content} locale={params.lang}>
        <RegexTesterTool />
      </ToolPageLayout>
    </>
  );
}
