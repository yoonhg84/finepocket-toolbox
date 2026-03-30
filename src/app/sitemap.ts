import type { MetadataRoute } from "next";
import { LOCALES, localizePath } from "@/i18n";
import { ALL_TOOLS } from "@/lib/tools-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolbox.finepocket.app";
  const lastModified = new Date();
  const staticPages = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/developer", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/text", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/finance", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/contact", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const localizedStaticPages = LOCALES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}${localizePath(page.path, locale)}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  const localizedToolPages = LOCALES.flatMap((locale) =>
    ALL_TOOLS.map((tool) => ({
      url: `${baseUrl}${localizePath(tool.href, locale)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...localizedStaticPages, ...localizedToolPages];
}
