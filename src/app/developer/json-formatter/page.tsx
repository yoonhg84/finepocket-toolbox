import dynamic from "next/dynamic";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { buildToolMetadata, buildToolJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { content } from "@/tools/json-formatter/content";

const JsonFormatterTool = dynamic(
  () =>
    import("@/tools/json-formatter/JsonFormatterTool").then((m) => ({
      default: m.JsonFormatterTool,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const tool = ALL_TOOLS.find((t) => t.slug === "json-formatter")!;
export const metadata = buildToolMetadata(tool, content);

export default function Page() {
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
        <JsonFormatterTool />
      </ToolPageLayout>
    </>
  );
}
