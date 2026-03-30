import Link from "next/link";
import { ALL_TOOLS, getToolsByCategory } from "@/lib/tools-registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinePocket Toolbox - Free Online Developer & Text Tools",
  description:
    "Free online tools for developers and writers. JSON formatter, Base64 encoder, hash generator, word counter, and more. All tools run entirely in your browser.",
};

const devTools = getToolsByCategory("developer");
const textTools = getToolsByCategory("text");

export default function Home() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FinePocket Toolbox",
            url: "https://toolbox.finepocket.app",
            description:
              "Free online developer and text tools. All processing happens in your browser.",
          }),
        }}
      />

      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Online Developer & Text Tools
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {ALL_TOOLS.length} powerful tools that run entirely in your browser.
          No data is sent to any server. No sign-up required.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Developer Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devTools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="block p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-mono bg-gray-100 px-2 py-1 rounded group-hover:bg-blue-50">
                  {tool.icon}
                </span>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {tool.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {textTools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="block p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-mono bg-gray-100 px-2 py-1 rounded group-hover:bg-blue-50">
                  {tool.icon}
                </span>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {tool.name}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center py-8 bg-gray-50 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Your Privacy Matters
        </h2>
        <p className="text-gray-600">
          All tools process data entirely in your browser. Nothing is uploaded to
          any server. Your data stays on your device.
        </p>
      </section>
    </div>
  );
}
