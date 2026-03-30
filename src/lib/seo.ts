import type { Metadata } from "next";
import type { ToolMeta } from "./tools-registry";

export interface ToolContent {
  title: string;
  description: string;
  whatIs: string;
  howToUse: string;
  howItWorks: string;
  useCases: string[];
  faq: Array<{ q: string; a: string }>;
}

const SITE_NAME = "FinePocket Toolbox";
const SITE_URL = "https://toolbox.finepocket.app";

export function buildToolMetadata(tool: ToolMeta, content: ToolContent): Metadata {
  const title = `${content.title} - Free Online Tool | ${SITE_NAME}`;
  return {
    title,
    description: content.description,
    keywords: tool.keywords.join(", "),
    openGraph: {
      title,
      description: content.description,
      url: `${SITE_URL}${tool.href}`,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}${tool.href}`,
    },
  };
}

export function buildToolJsonLd(tool: ToolMeta, content: ToolContent) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: content.title,
    description: content.description,
    url: `${SITE_URL}${tool.href}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser",
  };
}

export function buildFaqJsonLd(faq: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
