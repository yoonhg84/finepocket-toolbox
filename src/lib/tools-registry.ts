import { localizePath, type Locale } from "@/i18n";

export type ToolCategory = "developer" | "text" | "finance" | "calculators";

export interface ToolMeta {
  slug: string;
  category: ToolCategory;
  name: string;
  shortDescription: string;
  href: string;
  keywords: string[];
  icon: string;
  hubOrder?: number;
  relatedSlugs?: string[];
}

export const CATEGORY_META: Record<
  ToolCategory,
  { href: string; labelKey: string }
> = {
  developer: {
    href: "/developer",
    labelKey: "nav.developerTools",
  },
  text: {
    href: "/text",
    labelKey: "nav.textTools",
  },
  finance: {
    href: "/finance",
    labelKey: "nav.financeTools",
  },
  calculators: {
    href: "/calculators",
    labelKey: "nav.calculatorTools",
  },
};

export const ALL_TOOLS: ToolMeta[] = [
  {
    slug: "json-formatter",
    category: "developer",
    name: "JSON Formatter / Validator",
    shortDescription: "Format, validate, and beautify JSON data instantly",
    href: "/developer/json-formatter",
    keywords: ["json formatter", "json validator", "json beautifier", "json pretty print"],
    icon: "{ }",
    relatedSlugs: ["diff-checker", "regex-tester", "base64"],
  },
  {
    slug: "base64",
    category: "developer",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode and decode Base64 strings, files, and images",
    href: "/developer/base64",
    keywords: ["base64 encode", "base64 decode", "base64 converter"],
    icon: "B64",
    relatedSlugs: ["url-encoder", "jwt-decoder", "json-formatter"],
  },
  {
    slug: "jwt-decoder",
    category: "developer",
    name: "JWT Decoder",
    shortDescription: "Decode and inspect JSON Web Tokens instantly",
    href: "/developer/jwt-decoder",
    keywords: ["jwt decoder", "jwt debugger", "json web token decoder"],
    icon: "JWT",
    relatedSlugs: ["base64", "json-formatter", "url-encoder"],
  },
  {
    slug: "url-encoder",
    category: "developer",
    name: "URL Encoder / Decoder",
    shortDescription: "Encode and decode URLs with percent-encoding",
    href: "/developer/url-encoder",
    keywords: ["url encoder", "url decoder", "percent encoding"],
    icon: "%",
    relatedSlugs: ["base64", "json-formatter", "regex-tester"],
  },
  {
    slug: "regex-tester",
    category: "developer",
    name: "Regex Tester",
    shortDescription: "Test regular expressions with real-time matching",
    href: "/developer/regex-tester",
    keywords: ["regex tester", "regex101", "regular expression tester"],
    icon: ".*",
    relatedSlugs: ["diff-checker", "json-formatter", "url-encoder"],
  },
  {
    slug: "hash-generator",
    category: "developer",
    name: "Hash Generator",
    shortDescription: "Generate MD5, SHA-1, SHA-256, and other hashes",
    href: "/developer/hash-generator",
    keywords: ["md5 hash generator", "sha256 generator", "hash generator online"],
    icon: "#",
    relatedSlugs: ["base64", "json-formatter", "diff-checker"],
  },
  {
    slug: "diff-checker",
    category: "developer",
    name: "Text Diff Checker",
    shortDescription: "Compare two texts and find differences",
    href: "/developer/diff-checker",
    keywords: ["diff checker", "text compare", "text diff online"],
    icon: "±",
    relatedSlugs: ["json-formatter", "markdown-preview", "case-converter"],
  },
  {
    slug: "color-picker",
    category: "developer",
    name: "Color Picker / Converter",
    shortDescription: "Pick colors and convert between HEX, RGB, HSL formats",
    href: "/developer/color-picker",
    keywords: ["color picker", "hex to rgb", "color converter"],
    icon: "🎨",
    relatedSlugs: ["markdown-preview", "base64", "json-formatter"],
  },
  {
    slug: "word-counter",
    category: "text",
    name: "Word / Character Counter",
    shortDescription: "Count words, characters, sentences, and reading time",
    href: "/text/word-counter",
    keywords: ["word counter", "character counter", "word count online"],
    icon: "Wc",
    relatedSlugs: ["case-converter", "markdown-preview", "lorem-ipsum"],
  },
  {
    slug: "case-converter",
    category: "text",
    name: "Case Converter",
    shortDescription: "Convert text to UPPER, lower, Title, camelCase, and more",
    href: "/text/case-converter",
    keywords: ["case converter", "uppercase converter", "title case converter"],
    icon: "Aa",
    relatedSlugs: ["word-counter", "markdown-preview", "lorem-ipsum"],
  },
  {
    slug: "lorem-ipsum",
    category: "text",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder text for your designs",
    href: "/text/lorem-ipsum",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator"],
    icon: "¶",
    relatedSlugs: ["markdown-preview", "word-counter", "case-converter"],
  },
  {
    slug: "markdown-preview",
    category: "text",
    name: "Markdown Previewer",
    shortDescription: "Write Markdown and preview rendered HTML in real-time",
    href: "/text/markdown-preview",
    keywords: ["markdown preview", "markdown editor online", "markdown to html"],
    icon: "M↓",
    relatedSlugs: ["word-counter", "case-converter", "lorem-ipsum"],
  },
  // Finance & Calculator tools
  {
    slug: "percentage-calculator",
    category: "calculators",
    name: "Percentage Calculator",
    shortDescription: "Calculate percentages, discounts, and percentage changes instantly",
    href: "/calculators/percentage-calculator",
    keywords: ["percentage calculator", "percent calculator", "percentage change", "discount calculator"],
    icon: "%",
    hubOrder: 1,
    relatedSlugs: ["tip-calculator", "loan-calculator", "currency-converter"],
  },
  {
    slug: "tip-calculator",
    category: "calculators",
    name: "Tip Calculator",
    shortDescription: "Calculate tips and split bills among friends easily",
    href: "/calculators/tip-calculator",
    keywords: ["tip calculator", "gratuity calculator", "bill splitter", "tip calculator for restaurant"],
    icon: "💰",
    hubOrder: 4,
    relatedSlugs: ["percentage-calculator", "date-calculator", "currency-converter"],
  },
  {
    slug: "age-calculator",
    category: "calculators",
    name: "Age Calculator",
    shortDescription: "Calculate your exact age in years, months, days, and more",
    href: "/calculators/age-calculator",
    keywords: ["age calculator", "how old am I", "birthday calculator", "age in days"],
    icon: "🎂",
    hubOrder: 5,
    relatedSlugs: ["date-calculator", "bmi-calculator", "unit-converter"],
  },
  {
    slug: "data-converter",
    category: "calculators",
    name: "Data Storage Converter",
    shortDescription: "Convert between bytes, KB, MB, GB, TB and other data units",
    href: "/calculators/data-converter",
    keywords: ["byte converter", "MB to GB", "data unit converter", "storage converter"],
    icon: "💾",
    hubOrder: 7,
    relatedSlugs: ["unit-converter", "json-formatter", "base64"],
  },
  {
    slug: "unit-converter",
    category: "calculators",
    name: "Unit Converter",
    shortDescription: "Convert length, weight, temperature, volume, and more",
    href: "/calculators/unit-converter",
    keywords: ["unit converter", "cm to inches", "kg to lbs", "metric converter"],
    icon: "📏",
    hubOrder: 3,
    relatedSlugs: ["date-calculator", "data-converter", "bmi-calculator"],
  },
  {
    slug: "bmi-calculator",
    category: "calculators",
    name: "BMI Calculator",
    shortDescription: "Calculate your Body Mass Index and check your weight status",
    href: "/calculators/bmi-calculator",
    keywords: ["BMI calculator", "body mass index", "BMI chart", "weight calculator"],
    icon: "⚖️",
    hubOrder: 6,
    relatedSlugs: ["age-calculator", "unit-converter", "date-calculator"],
  },
  {
    slug: "loan-calculator",
    category: "finance",
    name: "Loan Calculator",
    shortDescription: "Calculate monthly payments, total interest, and amortization schedule",
    href: "/finance/loan-calculator",
    keywords: ["loan calculator", "mortgage calculator", "EMI calculator", "loan payment calculator"],
    icon: "🏦",
    hubOrder: 1,
    relatedSlugs: ["compound-interest", "currency-converter", "percentage-calculator"],
  },
  {
    slug: "compound-interest",
    category: "finance",
    name: "Compound Interest Calculator",
    shortDescription: "Calculate compound interest growth with regular contributions",
    href: "/finance/compound-interest",
    keywords: ["compound interest calculator", "investment calculator", "savings calculator"],
    icon: "📈",
    hubOrder: 2,
    relatedSlugs: ["loan-calculator", "currency-converter", "percentage-calculator"],
  },
  {
    slug: "date-calculator",
    category: "calculators",
    name: "Date Calculator",
    shortDescription: "Calculate days between dates or add/subtract days from a date",
    href: "/calculators/date-calculator",
    keywords: ["date calculator", "days between dates", "date difference", "add days to date"],
    icon: "📅",
    hubOrder: 2,
    relatedSlugs: ["age-calculator", "unit-converter", "tip-calculator"],
  },
  {
    slug: "currency-converter",
    category: "finance",
    name: "Currency Converter",
    shortDescription: "Convert between 30+ world currencies with live exchange rates",
    href: "/finance/currency-converter",
    keywords: ["currency converter", "exchange rate", "USD to KRW", "currency calculator"],
    icon: "💱",
    hubOrder: 3,
    relatedSlugs: ["loan-calculator", "compound-interest", "percentage-calculator"],
  },
];

const TOOL_ORDER = new Map(ALL_TOOLS.map((tool, index) => [tool.slug, index]));

function sortTools(tools: ToolMeta[]): ToolMeta[] {
  return [...tools].sort((left, right) => {
    const hubOrderDelta = (left.hubOrder ?? Number.MAX_SAFE_INTEGER) - (right.hubOrder ?? Number.MAX_SAFE_INTEGER);
    if (hubOrderDelta !== 0) return hubOrderDelta;

    return (TOOL_ORDER.get(left.slug) ?? 0) - (TOOL_ORDER.get(right.slug) ?? 0);
  });
}

export function getRelatedTools(currentSlug: string, count = 3): ToolMeta[] {
  const current = ALL_TOOLS.find((t) => t.slug === currentSlug);
  if (!current) return ALL_TOOLS.slice(0, count);

  const manualMatches = (current.relatedSlugs ?? [])
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolMeta => tool !== undefined && tool.slug !== currentSlug);
  const sameCategory = sortTools(
    ALL_TOOLS.filter((t) => t.category === current.category && t.slug !== currentSlug)
  );
  const otherCategory = sortTools(
    ALL_TOOLS.filter((t) => t.category !== current.category)
  );

  const deduped = new Map<string, ToolMeta>();
  [...manualMatches, ...sameCategory, ...otherCategory].forEach((tool) => {
    deduped.set(tool.slug, tool);
  });

  return Array.from(deduped.values()).slice(0, count);
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return sortTools(ALL_TOOLS.filter((t) => t.category === category));
}

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getCategoryHref(category: ToolCategory, locale?: Locale): string {
  const href = CATEGORY_META[category].href;
  return locale ? localizePath(href, locale) : href;
}

export function getCategoryLabelKey(category: ToolCategory): string {
  return CATEGORY_META[category].labelKey;
}

export function getToolHref(tool: ToolMeta, locale?: Locale): string {
  return locale ? localizePath(tool.href, locale) : tool.href;
}
