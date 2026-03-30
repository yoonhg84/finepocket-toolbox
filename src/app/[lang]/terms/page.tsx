import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import { getRequestLocale } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getSitePageContent("terms", getRequestLocale());

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    path: "/terms",
  });
}

export default function TermsPage() {
  return <ContentPage content={getSitePageContent("terms", getRequestLocale())} />;
}
