import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "URL Encoder / Decoder",
  description:
    "Encode and decode URLs with percent-encoding instantly. Supports both encodeURIComponent and encodeURI modes. Free, fast, and runs entirely in your browser.",
  whatIs:
    "URL encoding (also known as percent-encoding) is a mechanism for converting characters that are not allowed in a URL into a safe representation using percent signs followed by two hexadecimal digits. For example, a space becomes %20 and an ampersand becomes %26. This is essential when passing user input, query parameters, or special characters in URLs, form submissions, and API requests. This tool supports both component-level encoding (encodeURIComponent) and full URI encoding (encodeURI) to handle different use cases.",
  howToUse:
    "Choose Encode or Decode mode. For encoding, paste your text and select a mode — encodeURIComponent (recommended for query parameters) or encodeURI (for full URLs). The output updates in real-time as you type. Click Copy to copy the result to your clipboard.",
  howItWorks:
    "The encoder uses the browser's built-in encodeURIComponent() or encodeURI() functions. encodeURIComponent encodes all characters except A-Z, a-z, 0-9, and - _ . ~ making it safe for query parameter values. encodeURI leaves URL-structural characters like :, /, ?, and # intact. The decoder uses decodeURIComponent() to reverse percent-encoded sequences back to readable text.",
  useCases: [
    "Encoding query string parameters before appending to URLs",
    "Decoding URLs from server logs or analytics reports",
    "Preparing form data for application/x-www-form-urlencoded submissions",
    "Safely embedding user-generated content in URL paths",
    "Debugging percent-encoded API request parameters",
    "Converting non-ASCII characters (Unicode) for URL-safe transmission",
  ],
  faq: [
    {
      q: "What is the difference between encodeURI and encodeURIComponent?",
      a: "encodeURI encodes a complete URI but leaves structural characters like ://?#[]@ intact. encodeURIComponent encodes everything except A-Z, a-z, 0-9, and -_.~ — use it for individual query parameter values to ensure special characters like & and = are properly escaped.",
    },
    {
      q: "When should I use URL encoding?",
      a: "Always encode user input or dynamic values before placing them in URLs. This prevents broken URLs from spaces or special characters, avoids injection attacks, and ensures non-ASCII characters (like Chinese or Arabic text) are transmitted correctly.",
    },
    {
      q: "Does this tool send my data to a server?",
      a: "No. All encoding and decoding is performed entirely in your browser using built-in JavaScript functions. Your data never leaves your device.",
    },
    {
      q: "Why does my URL have + instead of %20 for spaces?",
      a: "The + sign for spaces comes from the application/x-www-form-urlencoded format used in HTML form submissions. Standard percent-encoding uses %20. This tool uses standard percent-encoding (%20). If you need + for spaces, replace %20 with + after encoding.",
    },
  ],
};
