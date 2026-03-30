import { notFound, permanentRedirect } from "next/navigation";
import { localizePath } from "@/i18n";
import { getRequestLocale } from "@/i18n/server";
import { getToolBySlug } from "@/lib/tools-registry";

export default function LegacyFinanceToolRedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = getToolBySlug(params.slug);

  if (!tool || tool.category !== "calculators") {
    notFound();
  }

  permanentRedirect(localizePath(tool.href, getRequestLocale()));
}
