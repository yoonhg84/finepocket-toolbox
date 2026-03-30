import dynamic from "next/dynamic";
import { ToolPageLayout } from "@/components/tool/ToolPageLayout";
import { ALL_TOOLS } from "@/lib/tools-registry";
import { buildToolMetadata, buildToolJsonLd, buildFaqJsonLd } from "@/lib/seo";
import { content } from "@/tools/base64/content";

const Base64Tool = dynamic(
  () => import("@/tools/base64/Base64Tool").then((m) => ({ default: m.Base64Tool })),
  { ssr: false, loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg" /> }
);

const tool = ALL_TOOLS.find((t) => t.slug === "base64")!;
export const metadata = buildToolMetadata(tool, content);

export default function Page() {
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
