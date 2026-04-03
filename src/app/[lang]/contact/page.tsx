import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import type { Locale } from "@/i18n";
import { buildContactPageJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { lang: Locale } }) {
  const content = getSitePageContent("contact", params.lang);

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    locale: params.lang,
    path: "/contact",
  });
}

export default function ContactPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const content = getSitePageContent("contact", params.lang);

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
              locale: params.lang,
            })
          ),
        }}
      />
      <ContentPage content={content} path="/contact" locale={params.lang} />
    </>
  );
}
