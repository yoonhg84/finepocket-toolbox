import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - FinePocket Toolbox",
  description: "Learn about FinePocket Toolbox — free, browser-based developer and text tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">About FinePocket Toolbox</h1>

      <div className="prose max-w-none text-gray-600 dark:text-gray-400 space-y-4">
        <p>
          FinePocket Toolbox is a collection of free online tools designed for developers, writers,
          and anyone who works with text and data. Our mission is to provide fast, reliable, and
          private tools that respect your data.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8">100% Browser-Based</h2>
        <p>
          Every tool on this site runs entirely in your web browser. When you paste JSON to format,
          encode text to Base64, or generate a hash — all of that processing happens on your device.
          No data is ever transmitted to our servers or any third party.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8">No Sign-Up Required</h2>
        <p>
          You don&apos;t need to create an account, provide an email, or sign up for anything.
          Just open the tool you need and start using it immediately.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Free Forever</h2>
        <p>
          All tools are free to use. We sustain this project through non-intrusive advertising.
          We will never charge for access to any tool.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8">Open Web Standards</h2>
        <p>
          Our tools are built using modern web technologies including the Web Crypto API,
          native JavaScript encoding functions, and client-side file processing. No plugins
          or downloads required — if you have a modern browser, you&apos;re all set.
        </p>
      </div>
    </div>
  );
}
