import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FinePocket Toolbox",
  description: "Privacy policy for FinePocket Toolbox. We do not collect or store your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: March 2026</p>

      <div className="text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Overview</h2>
          <p>
            FinePocket Toolbox is committed to protecting your privacy. All tools on this website
            process data entirely within your web browser. We do not collect, store, or transmit
            any data you input into our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Processing</h2>
          <p>
            When you use any tool on FinePocket Toolbox, all processing occurs client-side using
            JavaScript in your browser. Your data never leaves your device. We have no servers
            that receive, process, or store user-submitted data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cookies</h2>
          <p>
            We do not use cookies for tracking purposes. If advertising is enabled, our advertising
            partners (such as Google AdSense) may use cookies to serve relevant ads. You can manage
            cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h2>
          <p>
            We may use privacy-respecting analytics to understand general usage patterns such as
            page views and popular tools. This data is aggregated and does not identify individual
            users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Third-Party Services</h2>
          <p>
            This site is hosted on Vercel. Advertising may be served by Google AdSense. These
            services have their own privacy policies. No user-submitted tool data is shared with
            these services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at
            privacy@finepocket.app.
          </p>
        </section>
      </div>
    </div>
  );
}
