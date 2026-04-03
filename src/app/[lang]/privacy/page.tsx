import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import type { Locale } from "@/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const content = getSitePageContent("privacy", params.lang);

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    locale: params.lang,
    path: "/privacy",
  });
}

export default function PrivacyPage({ params }: { params: { lang: Locale } }) {
  return (
    <ContentPage
      content={getSitePageContent("privacy", params.lang)}
      path="/privacy"
      locale={params.lang}
    />
  );
}
