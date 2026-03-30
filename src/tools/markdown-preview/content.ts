import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Markdown Previewer",

  description:
    "Write Markdown and preview rendered HTML in real-time. Free online Markdown editor with live preview, syntax cheatsheet, and HTML export.",

  whatIs:
    "Markdown is a lightweight markup language created by John Gruber that lets you write formatted text using plain-text syntax. It is the standard for documentation on GitHub, GitLab, Stack Overflow, and countless other platforms. This free online Markdown Previewer gives you a live, side-by-side editing experience: type or paste Markdown on the left, and instantly see the beautifully rendered HTML output on the right. It supports all standard Markdown features including headings, bold, italic, links, images, code blocks, tables, blockquotes, and horizontal rules. Everything runs entirely in your browser — no data is sent to any server.",

  howToUse:
    "1. Type or paste your Markdown content into the editor on the left side. 2. The rendered HTML preview updates in real-time on the right side as you type. 3. Click 'Load Sample' to see a comprehensive Markdown example covering all common syntax elements. 4. Use the 'Copy HTML' button to copy the rendered HTML output to your clipboard. 5. Expand the 'Markdown Cheatsheet' section at the bottom for a quick reference of common syntax.",

  howItWorks:
    "The tool uses the 'marked' library — a fast, standards-compliant Markdown parser — to convert your Markdown input into HTML. The resulting HTML is then sanitized using DOMPurify to remove any potentially dangerous elements (such as inline scripts or event handlers), ensuring safe rendering. The sanitized HTML is displayed in the preview panel using React's dangerouslySetInnerHTML with custom CSS styling for proper typography, code blocks, tables, and other elements. All processing is performed client-side in real-time using useMemo for optimal performance.",

  useCases: [
    "Previewing README.md files before pushing to GitHub or GitLab",
    "Writing and formatting blog posts or documentation in Markdown",
    "Drafting technical documentation with code examples and tables",
    "Learning Markdown syntax with instant visual feedback",
    "Preparing formatted content for static site generators like Hugo or Jekyll",
    "Converting Markdown notes to HTML for email newsletters or web pages",
  ],

  faq: [
    {
      q: "Is my data safe when using this Markdown previewer?",
      a: "Yes, completely. All Markdown parsing and HTML rendering happens directly in your web browser using JavaScript. Your content is never transmitted to any server, stored, or logged. Additionally, the rendered HTML is sanitized with DOMPurify to prevent any potentially harmful scripts from executing.",
    },
    {
      q: "What Markdown features are supported?",
      a: "The tool supports all standard Markdown syntax including headings (H1-H6), bold, italic, strikethrough, links, images, ordered and unordered lists, blockquotes, inline code, fenced code blocks, tables (GFM-style), horizontal rules, and task lists. It follows the GitHub Flavored Markdown (GFM) specification for maximum compatibility.",
    },
    {
      q: "Can I export or copy the rendered HTML?",
      a: "Yes! Click the 'Copy HTML' button to copy the raw HTML output to your clipboard. You can then paste it into any HTML-compatible editor, email client, or CMS. The copied HTML includes all the structural tags and can be styled with your own CSS.",
    },
    {
      q: "Why does my Markdown look different here than on GitHub?",
      a: "While the tool follows GFM (GitHub Flavored Markdown) standards, minor rendering differences may occur due to different CSS styling. GitHub applies its own stylesheet (Primer CSS) to rendered Markdown. The core structure and HTML output will be equivalent, but visual details like font sizes, spacing, and colors may vary slightly.",
    },
  ],
};
