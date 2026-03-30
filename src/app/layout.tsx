import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getAdSenseClientId } from "@/lib/adsense";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { getRequestLocale } from "@/i18n/server";
import { ORGANIZATION_NAME, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  metadataBase: new URL("https://toolbox.finepocket.app"),
  applicationName: SITE_NAME,
  creator: ORGANIZATION_NAME,
  publisher: ORGANIZATION_NAME,
  referrer: "strict-origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getRequestLocale();
  const adsenseClientId = getAdSenseClientId();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.googlefc=window.googlefc||{};window.googlefc.callbackQueue=window.googlefc.callbackQueue||[];",
          }}
        />
        {adsenseClientId ? (
          <>
            <meta name="google-adsense-account" content={adsenseClientId} />
            <script
              async
              crossOrigin="anonymous"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            />
          </>
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
