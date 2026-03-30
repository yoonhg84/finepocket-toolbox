import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import { getRequestLocale } from "@/i18n/server";
import { buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getSitePageContent("about", getRequestLocale());

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    path: "/about",
  });
}

export default function AboutPage() {
  const content = getSitePageContent("about", getRequestLocale());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />
      <ContentPage content={content} path="/about" />
    </>
  );
}
