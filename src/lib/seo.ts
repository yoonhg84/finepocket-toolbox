import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  INDEXABLE_LOCALES,
  isIndexableLocale,
  localizePath,
  type Locale,
} from "@/i18n";
import { getRequestLocale } from "@/i18n/server";
import type { ToolMeta } from "./tools-registry";

const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  ko: "ko_KR",
  ja: "ja_JP",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  pt: "pt_BR",
};

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
export const SITE_TAGLINE =
  "Free online developer, text, finance, and calculator tools with privacy-first defaults and no sign-up required.";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/opengraph-image`;

interface PageMetadataInput {
  title: string;
  description: string;
  locale?: Locale;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  socialEyebrow?: string;
}

function buildAbsoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

function buildLocalizedAbsoluteUrl(path: string | undefined, locale: Locale): string {
  return buildAbsoluteUrl(localizePath(path ?? "/", locale));
}

function buildSocialImageUrl(input: {
  title: string;
  description: string;
  socialEyebrow?: string;
}): string {
  const url = new URL("/api/og", SITE_URL);
  url.searchParams.set("title", input.title);
  url.searchParams.set("description", input.description);

  if (input.socialEyebrow) {
    url.searchParams.set("eyebrow", input.socialEyebrow);
  }

  return url.toString();
}

export function buildPageMetadata({
  title,
  description,
  locale = getRequestLocale(),
  path,
  keywords,
  type = "website",
  socialEyebrow,
}: PageMetadataInput): Metadata {
  const url = buildLocalizedAbsoluteUrl(path, locale);
  const socialImageUrl = buildSocialImageUrl({ title, description, socialEyebrow });
  const languageAlternates = Object.fromEntries(
    INDEXABLE_LOCALES.map((alternateLocale) => [
      alternateLocale,
      buildLocalizedAbsoluteUrl(path, alternateLocale),
    ])
  );

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        ...languageAlternates,
        "x-default": buildLocalizedAbsoluteUrl(path, DEFAULT_LOCALE),
      },
    },
    robots: isIndexableLocale(locale)
      ? undefined
      : {
          index: false,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: OG_LOCALE_MAP[locale] ?? locale,
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageUrl],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  developer: "Developer Tools",
  text: "Text Tools",
  finance: "Finance Tools",
  calculators: "Calculator Tools",
};

export function buildToolMetadata(
  tool: ToolMeta,
  content: ToolContent,
  locale = getRequestLocale()
): Metadata {
  const title = `${content.title} - Free Online Tool`;

  return buildPageMetadata({
    title,
    description: content.description,
    locale,
    path: tool.href,
    keywords: tool.keywords,
    socialEyebrow: CATEGORY_LABELS[tool.category] ?? tool.category,
  });
}

export function buildToolJsonLd(
  tool: ToolMeta,
  content: ToolContent,
  locale = getRequestLocale()
) {
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
    url: buildLocalizedAbsoluteUrl(tool.href, locale),
    inLanguage: locale,
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

export function buildItemListJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: buildAbsoluteUrl(item.href),
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@finepocket.app",
      url: `${SITE_URL}/en/contact`,
      availableLanguage: ["English", "Korean"],
    },
  };
}

export function buildWebsiteJsonLd(
  description: string,
  locale = getRequestLocale()
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: buildLocalizedAbsoluteUrl("/", locale),
    inLanguage: locale,
    description,
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildContactPageJsonLd(input: {
  title: string;
  description: string;
  email?: string;
  locale?: Locale;
}) {
  const locale = input.locale ?? getRequestLocale();

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.title,
    description: input.description,
    url: buildLocalizedAbsoluteUrl("/contact", locale),
    inLanguage: locale,
    mainEntity: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
      ...(input.email ? { email: input.email } : {}),
    },
  };
}
