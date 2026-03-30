import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Case Converter",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Instant, free, and entirely browser-based.",
  whatIs:
    "A Case Converter is a text transformation tool that changes the letter casing and word-separation style of your text. It supports common programming naming conventions like camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case, as well as natural-language styles like Title Case and Sentence case. Developers, writers, and content creators use it daily to reformat identifiers, headings, and variable names.",
  howToUse:
    "Paste or type your text in the input area, then click any of the 10 conversion buttons below it. The converted result appears instantly in the output area. Use the Copy button next to the output to copy the result to your clipboard.",
  howItWorks:
    "The converter first tokenizes your input by detecting word boundaries — it recognizes camelCase transitions, underscores, hyphens, dots, and whitespace as separators. Each word is then recombined using the target casing rules and delimiter for the chosen format.",
  useCases: [
    "Converting variable names between camelCase, snake_case, and kebab-case",
    "Formatting headings and titles in Title Case or Sentence case",
    "Generating CONSTANT_CASE names for environment variables and constants",
    "Normalizing copy-pasted text that arrived in ALL CAPS",
    "Creating URL-friendly slugs with kebab-case formatting",
  ],
  faq: [
    {
      q: "What is the difference between camelCase and PascalCase?",
      a: "camelCase starts with a lowercase letter and capitalizes each subsequent word (e.g., myVariableName). PascalCase capitalizes every word including the first (e.g., MyVariableName). camelCase is common for variables and functions; PascalCase is typical for class and component names.",
    },
    {
      q: "When should I use snake_case vs kebab-case?",
      a: "snake_case uses underscores between words and is the standard in Python, Ruby, and database column names. kebab-case uses hyphens and is commonly used in URLs, CSS class names, and file names. Choose whichever matches the convention of your language or context.",
    },
    {
      q: "Does this tool handle Unicode or non-English text?",
      a: "The tool works best with ASCII/Latin characters. Basic Unicode text will be preserved, but word-boundary detection for non-Latin scripts (e.g., CJK characters) may not behave as expected.",
    },
    {
      q: "Does my text get sent to a server?",
      a: "No. All conversions happen entirely in your browser using JavaScript. Your text never leaves your device.",
    },
  ],
};
