import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import { getRequestLocale } from "@/i18n/server";
import { buildContactPageJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getSitePageContent("contact", getRequestLocale());

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    path: "/contact",
  });
}

export default function ContactPage() {
  const content = getSitePageContent("contact", getRequestLocale());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildContactPageJsonLd({
              title: content.title,
              description: content.description,
              email: content.email,
            })
          ),
        }}
      />
      <ContentPage content={content} path="/contact" />
    </>
  );
}
