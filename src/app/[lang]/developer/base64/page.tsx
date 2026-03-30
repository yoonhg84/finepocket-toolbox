import dynamic from "next/dynamic";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { buildToolMetadata, buildToolJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { getLocalizedToolPageContent } from "@/content/tool-page-content";
import { getRequestLocale } from "@/i18n/server";
import { content as baseContent } from "@/tools/base64/content";

const Base64Tool = dynamic(
  () => import("@/tools/base64/Base64Tool").then((m) => ({ default: m.Base64Tool })),
  { ssr: false, loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" /> }
);

const tool = ALL_TOOLS.find((t) => t.slug === "base64")!;
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolJsonLd(tool, content)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(content.faq)) }}
      />
      <ToolPageLayout tool={tool} content={content}>
        <Base64Tool />
      </ToolPageLayout>
    </>
  );
}
