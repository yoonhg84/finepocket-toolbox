import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - FinePocket Toolbox",
  description: "Terms of service for FinePocket Toolbox.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: March 2026</p>

      <div className="text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceptance of Terms</h2>
          <p>
            By accessing and using FinePocket Toolbox, you agree to be bound by these terms of
            service. If you do not agree with any part of these terms, please do not use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Use of Services</h2>
          <p>
            FinePocket Toolbox provides free online tools for text and data processing. These tools
            are provided &quot;as is&quot; without warranty of any kind. You may use these tools for
            personal and commercial purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Disclaimer</h2>
          <p>
            We make no guarantees about the accuracy, reliability, or completeness of the results
            produced by our tools. You are responsible for verifying the output of any tool before
            using it in production or critical applications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Limitation of Liability</h2>
          <p>
            FinePocket Toolbox shall not be liable for any direct, indirect, incidental, or
            consequential damages arising from the use or inability to use our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the site
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
