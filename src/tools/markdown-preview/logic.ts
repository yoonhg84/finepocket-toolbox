/**
 * Pure logic functions for Markdown Previewer tool.
 * No UI dependencies — rendering is deterministic for the same input.
 */

import { marked } from "marked";
import DOMPurify from "dompurify";

/**
 * Render a Markdown string to sanitized HTML.
 * Uses `marked` for Markdown→HTML conversion, then `DOMPurify` to strip
 * any potentially dangerous tags or attributes.
 */
export function renderMarkdown(input: string): string {
  if (!input.trim()) return "";
  const rawHtml = marked.parse(input, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml);
}

/**
 * A comprehensive sample Markdown document demonstrating common syntax.
 */
export const SAMPLE_MARKDOWN = `# Markdown Previewer

Welcome to the **Markdown Previewer**! This sample demonstrates all common Markdown syntax.

---

## Text Formatting

This is a paragraph with **bold text**, *italic text*, and ***bold italic***. You can also use ~~strikethrough~~ for deleted content.

Here is some \`inline code\` within a sentence.

## Links & Images

- [Visit FinePocket](https://finepocket.app) — an external link
- ![Placeholder Image](https://via.placeholder.com/300x100?text=Sample+Image)

## Lists

### Unordered List
- First item
- Second item
  - Nested item A
  - Nested item B
- Third item

### Ordered List
1. Step one
2. Step two
3. Step three

## Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

## Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

## Table

| Feature       | Status | Notes              |
|---------------|--------|--------------------|
| Headers       | ✅     | H1 through H6      |
| Bold / Italic | ✅     | Standard formatting |
| Code Blocks   | ✅     | Syntax highlighting |
| Tables        | ✅     | GFM-style tables    |
| Images        | ✅     | Inline images       |

## Horizontal Rule

---

## Task List (GFM)

- [x] Write sample Markdown
- [x] Add all common elements
- [ ] Ship the previewer

That's it! Start editing the left panel to see your Markdown rendered in real-time.
`;
