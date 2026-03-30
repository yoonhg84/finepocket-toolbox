import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - FinePocket Toolbox",
  description: "Get in touch with the FinePocket Toolbox team for feedback, bug reports, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

      <div className="text-gray-600 space-y-6">
        <p>
          We&apos;d love to hear from you. Whether you have a question, found a bug, or want to
          suggest a new tool, feel free to reach out using any of the methods below.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">General Inquiries</h2>
          <p>
            For general questions, feedback, or suggestions, please email us at{" "}
            <a href="mailto:support@finepocket.app" className="text-blue-600 hover:underline">
              support@finepocket.app
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Bug Reports</h2>
          <p>
            Found something that doesn&apos;t work as expected? Please let us know by emailing{" "}
            <a href="mailto:support@finepocket.app" className="text-blue-600 hover:underline">
              support@finepocket.app
            </a>{" "}
            with the following details:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Which tool you were using</li>
            <li>What you expected to happen</li>
            <li>What actually happened</li>
            <li>Your browser name and version</li>
            <li>A screenshot if possible</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Feature Requests</h2>
          <p>
            Have an idea for a new tool or an improvement to an existing one? We&apos;re always
            looking for ways to make FinePocket Toolbox more useful. Send your ideas to{" "}
            <a href="mailto:support@finepocket.app" className="text-blue-600 hover:underline">
              support@finepocket.app
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Business & Partnerships</h2>
          <p>
            For advertising, sponsorship, or partnership opportunities, please contact us at{" "}
            <a href="mailto:support@finepocket.app" className="text-blue-600 hover:underline">
              support@finepocket.app
            </a>.
          </p>
        </section>

        <section className="bg-gray-50 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h2>
          <p>
            We typically respond within 1-2 business days. For urgent bug reports that affect tool
            functionality, we aim to respond within 24 hours.
          </p>
        </section>
      </div>
    </div>
  );
}
