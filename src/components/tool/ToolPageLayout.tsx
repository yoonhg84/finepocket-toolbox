import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { ToolMeta } from "@/lib/tools-registry";
import type { ToolContent } from "@/lib/seo";
import { RelatedTools } from "./RelatedTools";
import { FaqSection } from "./FaqSection";
import { SeoSection } from "./SeoSection";

interface ToolPageLayoutProps {
  tool: ToolMeta;
  content: ToolContent;
  children: React.ReactNode;
}

const categoryLabels: Record<string, string> = {
  developer: "Developer Tools",
  text: "Text Tools",
};

export function ToolPageLayout({ tool, content, children }: ToolPageLayoutProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryLabels[tool.category] || tool.category },
    { label: tool.name },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
      <p className="text-gray-600 mb-6">
        {content.description}{" "}
        <span className="text-gray-400">Free, browser-based, no sign-up required.</span>
      </p>

      <div className="mb-8">{children}</div>

      {/* AdSense placeholder */}
      <div className="my-8" aria-hidden="true" />

      <SeoSection title={`What is ${tool.name}?`} content={content.whatIs} />
      <SeoSection title="How to Use" content={content.howToUse} />
      <SeoSection title="How It Works" content={content.howItWorks} />

      {content.useCases.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Common Use Cases</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {content.useCases.map((uc, i) => (
              <li key={i}>{uc}</li>
            ))}
          </ul>
        </section>
      )}

      <FaqSection items={content.faq} />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
