import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { getCategoryHubContent } from "@/content/category-hubs";
import { getRequestLocale } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getCategoryHubContent("finance", getRequestLocale());

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: "/finance",
  });
}

export default function FinanceToolsPage() {
  const content = getCategoryHubContent("finance", getRequestLocale());
  return <CategoryHubPage content={content} />;
}
