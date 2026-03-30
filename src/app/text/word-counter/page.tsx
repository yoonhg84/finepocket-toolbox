import dynamic from "next/dynamic";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { buildToolMetadata, buildToolJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { content } from "@/tools/word-counter/content";

const WordCounterTool = dynamic(
  () =>
    import("@/tools/word-counter/WordCounterTool").then((m) => ({
      default: m.WordCounterTool,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const tool = ALL_TOOLS.find((t) => t.slug === "word-counter")!;
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
        <WordCounterTool />
      </ToolPageLayout>
    </>
  );
}
