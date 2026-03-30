import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/i18n";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) {
    notFound();
  }

  return children;
}
