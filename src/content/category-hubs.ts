import type { ToolCategory } from "@/lib/tools-registry";

export interface CategoryHubContent {
  category: ToolCategory;
  title: string;
  description: string;
  intro: string[];
  tasksTitle: string;
  tasks: string[];
  valueTitle: string;
  valuePoints: string[];
  toolsTitle: string;
  toolsDescription: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  guideTitle: string;
  guidePoints: string[];
}

export const CATEGORY_HUBS: Record<ToolCategory, CategoryHubContent> = {
  developer: {
    category: "developer",
    title: "Developer Tools",
    description:
      "Browser-based utilities for inspecting, formatting, validating, and transforming data during development work.",
    intro: [
      "The developer category is built for tasks that usually interrupt flow: cleaning JSON, checking regular expressions, decoding tokens, generating hashes, or comparing text during debugging and review.",
      "Each tool is designed to open fast, work locally when possible, and provide enough explanation below the interface that a result can be trusted and understood without leaving the page.",
    ],
    tasksTitle: "Common tasks in this category",
    tasks: [
      "Validate and format API payloads before shipping or debugging",
      "Inspect tokens, encoded strings, and hashes during auth or integration work",
      "Compare payloads, snippets, and text outputs during review",
      "Convert values quickly without switching to a local script or IDE extension",
    ],
    valueTitle: "Why these pages are useful",
    valuePoints: [
      "Fast browser-based workflows for one-off developer tasks",
      "Explanatory content that helps newer team members understand the output",
      "Related tool links that keep similar debugging workflows close together",
      "No account wall before trying a tool",
    ],
    toolsTitle: "Browse all developer tools",
    toolsDescription:
      "These utilities focus on common debugging, inspection, encoding, and transformation tasks for web and application development.",
    faqTitle: "Developer tools FAQ",
    faq: [
      {
        q: "Are these tools suitable for sensitive payloads?",
        a: "Many developer tools on the site run entirely in the browser, which is helpful for sensitive debugging data. When a feature depends on a remote data source, the page should make that explicit.",
      },
      {
        q: "Can these tools replace IDE plugins?",
        a: "They are best used for quick checks, debugging sessions, and shareable browser workflows. They do not aim to replace a full local development environment.",
      },
      {
        q: "Which pages are most useful for API debugging?",
        a: "JSON Formatter, JWT Decoder, Base64 Encoder or Decoder, URL Encoder or Decoder, and Diff Checker are the strongest starting points for API payload inspection and troubleshooting.",
      },
    ],
    guideTitle: "Good next expansions for this category",
    guidePoints: [
      "Short guides that compare related tools for common debugging jobs",
      "Examples of typical API troubleshooting workflows",
      "Reference articles that explain JSON, JWT, Base64, and regex patterns in plain English",
    ],
  },
  text: {
    category: "text",
    title: "Text Tools",
    description:
      "Utilities for counting, transforming, previewing, and generating text without losing the original structure or formatting.",
    intro: [
      "The text category is for editing workflows where speed matters more than opening a full editor. These tools help with word counts, casing changes, placeholder copy, and Markdown rendering.",
      "The goal is to make common text operations predictable, especially for writing, documentation, content review, and quick collaboration tasks.",
    ],
    tasksTitle: "Common tasks in this category",
    tasks: [
      "Check length limits before publishing or sending content",
      "Convert text between common casing formats for naming or cleanup",
      "Preview Markdown before posting it to docs or issue trackers",
      "Generate placeholder copy for designs and drafts",
    ],
    valueTitle: "Why these pages are useful",
    valuePoints: [
      "Simple interfaces for repetitive text transformations",
      "Clear output that can be copied immediately into another workflow",
      "Browser-based tools that work well on both desktop and mobile",
      "Complementary tools grouped together by writing and editing intent",
    ],
    toolsTitle: "Browse all text tools",
    toolsDescription:
      "These pages support copy editing, writing, content QA, and lightweight formatting workflows.",
    faqTitle: "Text tools FAQ",
    faq: [
      {
        q: "Who are these text tools for?",
        a: "They are useful for writers, marketers, students, developers, support teams, and anyone who needs quick text cleanup or preview workflows without opening heavier software.",
      },
      {
        q: "Do text tools store what I write?",
        a: "Most text tools are intended to run in the browser so you can paste, review, and copy content quickly. The privacy and tool page notes explain when a tool uses only local processing.",
      },
      {
        q: "Which text tool should I start with?",
        a: "Word Counter is best for measuring length, Case Converter is best for quick transformations, Markdown Previewer is best for rendered output checks, and Lorem Ipsum Generator is best for placeholder content.",
      },
    ],
    guideTitle: "Good next expansions for this category",
    guidePoints: [
      "Short guides for choosing between common casing formats",
      "Markdown examples for documentation and README workflows",
      "Best-practice articles around character limits and readability checks",
    ],
  },
  finance: {
    category: "finance",
    title: "Finance & Calculators",
    description:
      "Reference calculators and conversion tools for planning payments, comparing rates, and answering everyday money or measurement questions.",
    intro: [
      "The finance category is where higher-intent planning tools live: loan calculations, compound interest, percentages, currency conversion, and related utility calculators. These pages are designed to answer a question quickly while still giving enough context to understand the result.",
      "Because finance-related pages carry higher trust expectations, the content emphasizes formulas, assumptions, and reference-only disclaimers instead of presenting outputs as professional advice.",
    ],
    tasksTitle: "Common tasks in this category",
    tasks: [
      "Estimate loan payments before comparing lenders or repayment methods",
      "Model savings growth or recurring investment contributions",
      "Check percentages, discounts, or date differences during planning",
      "Convert currencies or units while researching costs across countries",
    ],
    valueTitle: "Why these pages are useful",
    valuePoints: [
      "High-intent pages built around practical planning questions",
      "Plain-language explanations of formulas and repayment logic",
      "Reference disclaimers that set expectations for financial decisions",
      "Related calculators grouped together for deeper comparison workflows",
    ],
    toolsTitle: "Browse all finance and calculator tools",
    toolsDescription:
      "These tools focus on budgeting, planning, conversions, and quick reference calculations. They are useful for exploration and comparison, not a substitute for professional advice.",
    faqTitle: "Finance and calculator FAQ",
    faq: [
      {
        q: "Are these calculators financial advice?",
        a: "No. They are reference tools for estimation and planning. Actual rates, fees, taxes, and lending decisions depend on providers and personal circumstances.",
      },
      {
        q: "Why are finance pages important for trust?",
        a: "Visitors use them for decisions that can affect money, so the page should explain formulas, assumptions, and limitations clearly instead of presenting the output as unquestionable.",
      },
      {
        q: "Which finance pages are strongest for high-intent visitors?",
        a: "Loan Calculator, Compound Interest Calculator, and Currency Converter usually match clearer commercial or planning intent than general-purpose utility pages.",
      },
    ],
    guideTitle: "Good next expansions for this category",
    guidePoints: [
      "Mortgage, APR, refinance, and credit card payoff calculators",
      "Country-specific finance explainers that add context to the tools",
      "Comparison guides that explain when to use one calculator versus another",
    ],
  },
};
