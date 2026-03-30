import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { getMessages, type Locale } from "@/i18n";
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

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <Header />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
