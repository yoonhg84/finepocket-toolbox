import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import type { Locale } from "@/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const content = getSitePageContent("terms", params.lang);

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    locale: params.lang,
    path: "/terms",
  });
}

export default function TermsPage({ params }: { params: { lang: Locale } }) {
  return (
    <ContentPage
      content={getSitePageContent("terms", params.lang)}
      path="/terms"
      locale={params.lang}
    />
  );
}
