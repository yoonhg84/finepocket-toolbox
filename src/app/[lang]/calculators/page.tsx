import { CategoryHubPage } from "@/components/category/CategoryHubPage";
import { getCategoryHubContent } from "@/content/category-hubs";
import type { Locale } from "@/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const content = getCategoryHubContent("calculators", params.lang);

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    locale: params.lang,
    path: "/calculators",
  });
}

export default function CalculatorToolsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const content = getCategoryHubContent("calculators", params.lang);
  return <CategoryHubPage content={content} locale={params.lang} />;
}
