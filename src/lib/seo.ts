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

export const SITE_NAME = "FinePocket Toolbox";
export const ORGANIZATION_NAME = "FinePocket";
export const SITE_URL = "https://toolbox.finepocket.app";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/apple-icon.png`;

interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
}

function buildAbsoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = buildAbsoluteUrl(path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 180,
          height: 180,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

export function buildToolMetadata(tool: ToolMeta, content: ToolContent): Metadata {
  const title = `${content.title} - Free Online Tool`;

  return buildPageMetadata({
    title,
    description: content.description,
    path: tool.href,
    keywords: tool.keywords,
  });
}

export function buildToolJsonLd(tool: ToolMeta, content: ToolContent) {
  const applicationCategory =
    tool.category === "developer"
      ? "DeveloperApplication"
      : tool.category === "finance"
        ? "FinanceApplication"
        : "UtilitiesApplication";

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: content.title,
    description: content.description,
    url: buildAbsoluteUrl(tool.href),
    applicationCategory,
    operatingSystem: "Any",
    isAccessibleForFree: true,
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
      ...(item.href ? { item: buildAbsoluteUrl(item.href) } : {}),
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    email: "support@finepocket.app",
  };
}
