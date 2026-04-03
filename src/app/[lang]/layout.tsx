import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { createTranslator, getMessages, type Locale } from "@/i18n";
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

  const locale = params.lang as Locale;
  const messages = getMessages(locale);
  const t = createTranslator(messages);

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none"
      >
        {t("common.skipToContent", undefined, "Skip to content")}
      </a>
      <Header />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer locale={locale} />
    </LocaleProvider>
  );
}
