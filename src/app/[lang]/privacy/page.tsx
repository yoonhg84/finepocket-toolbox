import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import { getRequestLocale } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getSitePageContent("privacy", getRequestLocale());

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <ContentPage
      content={getSitePageContent("privacy", getRequestLocale())}
      path="/privacy"
    />
  );
}
