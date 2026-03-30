import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { CATEGORY_HUBS } from "@/content/category-hubs";
import { buildPageMetadata } from "@/lib/seo";

const content = CATEGORY_HUBS.text;

export const metadata = buildPageMetadata({
  title: content.title,
  description: content.description,
  path: "/text",
});

export default function TextToolsPage() {
  return <CategoryHubPage content={content} />;
}
