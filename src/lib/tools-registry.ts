export interface ToolMeta {
  slug: string;
  category: "developer" | "text" | "finance";
  name: string;
  shortDescription: string;
  href: string;
  keywords: string[];
  icon: string;
}

export const ALL_TOOLS: ToolMeta[] = [
  {
    slug: "json-formatter",
    category: "developer",
    name: "JSON Formatter / Validator",
    shortDescription: "Format, validate, and beautify JSON data instantly",
    href: "/developer/json-formatter",
    keywords: ["json formatter", "json validator", "json beautifier", "json pretty print"],
    icon: "{ }",
  },
  {
    slug: "base64",
    category: "developer",
    name: "Base64 Encoder / Decoder",
    shortDescription: "Encode and decode Base64 strings, files, and images",
    href: "/developer/base64",
    keywords: ["base64 encode", "base64 decode", "base64 converter"],
    icon: "B64",
  },
  {
    slug: "jwt-decoder",
    category: "developer",
    name: "JWT Decoder",
    shortDescription: "Decode and inspect JSON Web Tokens instantly",
    href: "/developer/jwt-decoder",
    keywords: ["jwt decoder", "jwt debugger", "json web token decoder"],
    icon: "JWT",
  },
  {
    slug: "url-encoder",
    category: "developer",
    name: "URL Encoder / Decoder",
    shortDescription: "Encode and decode URLs with percent-encoding",
    href: "/developer/url-encoder",
    keywords: ["url encoder", "url decoder", "percent encoding"],
    icon: "%",
  },
  {
    slug: "regex-tester",
    category: "developer",
    name: "Regex Tester",
    shortDescription: "Test regular expressions with real-time matching",
    href: "/developer/regex-tester",
    keywords: ["regex tester", "regex101", "regular expression tester"],
    icon: ".*",
  },
  {
    slug: "hash-generator",
    category: "developer",
    name: "Hash Generator",
    shortDescription: "Generate MD5, SHA-1, SHA-256, and other hashes",
    href: "/developer/hash-generator",
    keywords: ["md5 hash generator", "sha256 generator", "hash generator online"],
    icon: "#",
  },
  {
    slug: "diff-checker",
    category: "developer",
    name: "Text Diff Checker",
    shortDescription: "Compare two texts and find differences",
    href: "/developer/diff-checker",
    keywords: ["diff checker", "text compare", "text diff online"],
    icon: "±",
  },
  {
    slug: "color-picker",
    category: "developer",
    name: "Color Picker / Converter",
    shortDescription: "Pick colors and convert between HEX, RGB, HSL formats",
    href: "/developer/color-picker",
    keywords: ["color picker", "hex to rgb", "color converter"],
    icon: "🎨",
  },
  {
    slug: "word-counter",
    category: "text",
    name: "Word / Character Counter",
    shortDescription: "Count words, characters, sentences, and reading time",
    href: "/text/word-counter",
    keywords: ["word counter", "character counter", "word count online"],
    icon: "Aa",
  },
  {
    slug: "case-converter",
    category: "text",
    name: "Case Converter",
    shortDescription: "Convert text to UPPER, lower, Title, camelCase, and more",
    href: "/text/case-converter",
    keywords: ["case converter", "uppercase converter", "title case converter"],
    icon: "Aa",
  },
  {
    slug: "lorem-ipsum",
    category: "text",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder text for your designs",
    href: "/text/lorem-ipsum",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator"],
    icon: "Li",
  },
  {
    slug: "markdown-preview",
    category: "text",
    name: "Markdown Previewer",
    shortDescription: "Write Markdown and preview rendered HTML in real-time",
    href: "/text/markdown-preview",
    keywords: ["markdown preview", "markdown editor online", "markdown to html"],
    icon: "MD",
  },
  // Finance & Calculator tools
  {
    slug: "percentage-calculator",
    category: "finance",
    name: "Percentage Calculator",
    shortDescription: "Calculate percentages, discounts, and percentage changes instantly",
    href: "/finance/percentage-calculator",
    keywords: ["percentage calculator", "percent calculator", "percentage change", "discount calculator"],
    icon: "%",
  },
  {
    slug: "tip-calculator",
    category: "finance",
    name: "Tip Calculator",
    shortDescription: "Calculate tips and split bills among friends easily",
    href: "/finance/tip-calculator",
    keywords: ["tip calculator", "gratuity calculator", "bill splitter", "tip calculator for restaurant"],
    icon: "💰",
  },
  {
    slug: "age-calculator",
    category: "finance",
    name: "Age Calculator",
    shortDescription: "Calculate your exact age in years, months, days, and more",
    href: "/finance/age-calculator",
    keywords: ["age calculator", "how old am I", "birthday calculator", "age in days"],
    icon: "🎂",
  },
  {
    slug: "data-converter",
    category: "finance",
    name: "Data Storage Converter",
    shortDescription: "Convert between bytes, KB, MB, GB, TB and other data units",
    href: "/finance/data-converter",
    keywords: ["byte converter", "MB to GB", "data unit converter", "storage converter"],
    icon: "💾",
  },
  {
    slug: "unit-converter",
    category: "finance",
    name: "Unit Converter",
    shortDescription: "Convert length, weight, temperature, volume, and more",
    href: "/finance/unit-converter",
    keywords: ["unit converter", "cm to inches", "kg to lbs", "metric converter"],
    icon: "📏",
  },
  {
    slug: "bmi-calculator",
    category: "finance",
    name: "BMI Calculator",
    shortDescription: "Calculate your Body Mass Index and check your weight status",
    href: "/finance/bmi-calculator",
    keywords: ["BMI calculator", "body mass index", "BMI chart", "weight calculator"],
    icon: "⚖️",
  },
  {
    slug: "loan-calculator",
    category: "finance",
    name: "Loan Calculator",
    shortDescription: "Calculate monthly payments, total interest, and amortization schedule",
    href: "/finance/loan-calculator",
    keywords: ["loan calculator", "mortgage calculator", "EMI calculator", "loan payment calculator"],
    icon: "🏦",
  },
  {
    slug: "compound-interest",
    category: "finance",
    name: "Compound Interest Calculator",
    shortDescription: "Calculate compound interest growth with regular contributions",
    href: "/finance/compound-interest",
    keywords: ["compound interest calculator", "investment calculator", "savings calculator"],
    icon: "📈",
  },
  {
    slug: "date-calculator",
    category: "finance",
    name: "Date Calculator",
    shortDescription: "Calculate days between dates or add/subtract days from a date",
    href: "/finance/date-calculator",
    keywords: ["date calculator", "days between dates", "date difference", "add days to date"],
    icon: "📅",
  },
  {
    slug: "currency-converter",
    category: "finance",
    name: "Currency Converter",
    shortDescription: "Convert between 30+ world currencies with live exchange rates",
    href: "/finance/currency-converter",
    keywords: ["currency converter", "exchange rate", "USD to KRW", "currency calculator"],
    icon: "💱",
  },
];

export function getRelatedTools(currentSlug: string, count = 3): ToolMeta[] {
  const current = ALL_TOOLS.find((t) => t.slug === currentSlug);
  if (!current) return ALL_TOOLS.slice(0, count);

  const sameCategory = ALL_TOOLS.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  );
  const otherCategory = ALL_TOOLS.filter(
    (t) => t.category !== current.category
  );

  return [...sameCategory, ...otherCategory].slice(0, count);
}

export function getToolsByCategory(category: string): ToolMeta[] {
  return ALL_TOOLS.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}
