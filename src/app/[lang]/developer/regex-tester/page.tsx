import dynamic from "next/dynamic";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { buildToolMetadata, buildToolJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { getLocalizedToolPageContent } from "@/content/tool-page-content";
import { getRequestLocale } from "@/i18n/server";
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
export function generateMetadata() {
  return buildToolMetadata(
    tool,
    getLocalizedToolPageContent(tool.slug, getRequestLocale(), baseContent)
  );
}

export default function Page() {
  const content = getLocalizedToolPageContent(
    tool.slug,
    getRequestLocale(),
    baseContent
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildToolJsonLd(tool, content)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(content.faq)),
        }}
      />
      <ToolPageLayout tool={tool} content={content}>
        <RegexTesterTool />
      </ToolPageLayout>
    </>
  );
}
