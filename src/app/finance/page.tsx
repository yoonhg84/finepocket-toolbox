import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { CATEGORY_HUBS } from "@/content/category-hubs";
import { buildPageMetadata } from "@/lib/seo";

const content = CATEGORY_HUBS.finance;

export const metadata = buildPageMetadata({
  title: content.title,
  description: content.description,
  path: "/finance",
});

export default function FinanceToolsPage() {
  return <CategoryHubPage content={content} />;
}
