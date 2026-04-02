import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/de/", "/ja/", "/es/", "/fr/", "/pt/"],
      },
    ],
    sitemap: "https://toolbox.finepocket.app/sitemap.xml",
  };
}
