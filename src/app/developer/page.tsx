import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { CATEGORY_HUBS } from "@/content/category-hubs";
import { buildPageMetadata } from "@/lib/seo";

const content = CATEGORY_HUBS.developer;

export const metadata = buildPageMetadata({
  title: content.title,
  description: content.description,
  path: "/developer",
});

export default function DeveloperToolsPage() {
  return <CategoryHubPage content={content} />;
}
