import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Text Diff Checker",

  description:
    "Compare two texts and find differences instantly. Free online diff checker with line-by-line and inline comparison views.",

  whatIs:
    "A Text Diff Checker is a tool that compares two pieces of text and highlights the differences between them. It is essential for developers reviewing code changes, writers tracking document revisions, and anyone who needs to quickly identify what was added, removed, or modified between two versions of text. This free online diff checker runs entirely in your browser, supports both line-by-line and inline diff views, and provides a clear visual summary of all additions and deletions with color-coded highlighting.",

  howToUse:
    "1. Paste your original text into the left textarea labeled 'Original'. 2. Paste the modified text into the right textarea labeled 'Modified'. 3. Click the 'Compare' button to generate the diff. 4. Toggle between 'Inline' and 'Side-by-side' views to see the differences in your preferred format. 5. Review the stats bar for a quick summary of additions and deletions. 6. Click 'Clear' to reset both inputs and start over.",

  howItWorks:
    "The tool uses the widely-trusted 'diff' library to perform line-level and word-level comparison algorithms. When you click Compare, the tool tokenizes both inputs into lines (or words for inline mode), computes the longest common subsequence to identify unchanged regions, and then marks the remaining segments as additions or deletions. Results are displayed with green highlighting for added content and red highlighting for removed content. All processing happens client-side in your browser — no data is sent to any server.",

  useCases: [
    "Reviewing code changes before committing to version control",
    "Comparing configuration files across environments (staging vs production)",
    "Tracking document revisions and identifying editorial changes",
    "Verifying API response differences between versions",
    "Checking translation files for missing or changed strings",
    "Comparing SQL migration scripts to detect unintended schema changes",
  ],

  faq: [
    {
      q: "Is my data safe when using this diff checker?",
      a: "Yes, completely. All text comparison happens directly in your web browser using JavaScript. Your data is never transmitted to any server, stored, or logged. You can verify this by checking your browser's network inspector — no outgoing requests are made during comparison.",
    },
    {
      q: "What is the difference between Inline and Side-by-side views?",
      a: "Inline view shows all changes in a single column with additions and deletions interleaved, similar to a unified diff format. Side-by-side view shows the original text on the left and the modified text on the right, making it easier to compare corresponding sections visually. Choose the view that best fits your workflow.",
    },
    {
      q: "Can I compare very large texts?",
      a: "Yes, the tool can handle texts up to several megabytes in size, limited only by your browser's available memory. For extremely large files (10MB+), you may experience a slight delay during comparison. The tool is optimized for typical use cases like code files, configuration files, and documents.",
    },
    {
      q: "Does it support comparing files directly?",
      a: "Currently, you need to paste the text content into both textareas. You can copy text from any source — text editors, terminal output, web pages, or files — and paste it directly into the input fields. File drag-and-drop support may be added in a future update.",
    },
  ],
};
