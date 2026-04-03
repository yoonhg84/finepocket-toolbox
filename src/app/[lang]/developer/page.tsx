import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { getCategoryHubContent } from "@/content/category-hubs";
import type { Locale } from "@/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const content = getCategoryHubContent("developer", params.lang);

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    locale: params.lang,
    path: "/developer",
  });
}

export default function DeveloperToolsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const content = getCategoryHubContent("developer", params.lang);
  return <CategoryHubPage content={content} locale={params.lang} />;
}
