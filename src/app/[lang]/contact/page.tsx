import { ContentPage } from "@/components/site/ContentPage";
import { getSitePageContent } from "@/content/site-pages";
import { getRequestLocale } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const content = getSitePageContent("contact", getRequestLocale());

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.description,
    path: "/contact",
  });
}

export default function ContactPage() {
  return <ContentPage content={getSitePageContent("contact", getRequestLocale())} />;
}
