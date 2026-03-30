import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { getCategoryHubContent } from "@/content/category-hubs";
import { getRequestLocale } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getCategoryHubContent("calculators", getRequestLocale());

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: "/calculators",
  });
}

export default function CalculatorToolsPage() {
  const content = getCategoryHubContent("calculators", getRequestLocale());
  return <CategoryHubPage content={content} />;
}
