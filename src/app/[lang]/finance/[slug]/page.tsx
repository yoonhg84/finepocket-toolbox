import { notFound, permanentRedirect } from "next/navigation";
import { localizePath, type Locale } from "@/i18n";
import { getToolBySlug } from "@/lib/tools-registry";

export default function LegacyFinanceToolRedirectPage({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const tool = getToolBySlug(params.slug);

  if (!tool || tool.category !== "calculators") {
    notFound();
  }

  permanentRedirect(localizePath(tool.href, params.lang));
}
