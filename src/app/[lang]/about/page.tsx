import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import type { Locale } from "@/i18n";
import { buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const content = getSitePageContent("about", params.lang);

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    locale: params.lang,
    path: "/about",
  });
}

export default function AboutPage({ params }: { params: { lang: Locale } }) {
  const content = getSitePageContent("about", params.lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />
      <ContentPage content={content} path="/about" locale={params.lang} />
    </>
  );
}
