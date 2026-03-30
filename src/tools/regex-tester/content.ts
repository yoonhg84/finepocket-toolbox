import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "Regex Tester",

  description:
    "Test regular expressions with real-time matching, highlighting, and replacement. Free online regex tester with presets for common patterns.",

  whatIs:
    "Regular expressions (regex) are powerful pattern-matching sequences used to search, validate, and manipulate text in virtually every programming language and text editor. This free online Regex Tester lets you write a regex pattern, set flags (global, case-insensitive, multiline, dotAll, unicode), and instantly see all matches highlighted in your test string. It displays match details including capture groups, match indices, and total match count. You can also test find-and-replace operations with regex substitution. Everything runs entirely in your browser using the native JavaScript RegExp engine — no data is sent to any server.",

  howToUse:
    "1. Enter your regular expression pattern in the pattern field. 2. Toggle the desired flags (g, i, m, s, u) using the checkboxes next to the pattern. 3. Type or paste your test string into the textarea below. 4. Matches are highlighted in real time in the output area. 5. View match details (index, full match, captured groups) in the table below. 6. Optionally enter a replacement string to preview regex substitution. 7. Use preset buttons to quickly load common patterns like email, URL, or phone number with example text.",

  howItWorks:
    "The tool constructs a JavaScript RegExp object from your pattern and selected flags, then executes it against the test string using exec() in a loop (for global matches) or a single exec() call. Matches are extracted with their indices and capture groups. For the highlighted output, the tool escapes HTML entities in the original text and wraps matched portions in <mark> tags. The replace feature uses String.prototype.replace() with the constructed regex. Invalid patterns are caught and displayed as friendly error messages.",

  useCases: [
    "Testing and debugging regular expressions before embedding them in application code",
    "Validating input patterns for forms — emails, phone numbers, dates, URLs, credit cards",
    "Extracting structured data from unstructured text using capture groups",
    "Learning regex syntax interactively with instant visual feedback and presets",
    "Building find-and-replace transformations for text processing scripts",
    "Verifying regex behavior across different flag combinations (case-insensitive, multiline, etc.)",
    "Prototyping data validation rules for backend or frontend form handlers",
  ],

  faq: [
    {
      q: "Is my data safe?",
      a: "Yes. All regex processing happens directly in your browser using JavaScript's built-in RegExp engine. Your test strings are never sent to any server, stored, or logged. You can verify this with your browser's network inspector.",
    },
    {
      q: "Which regex flavor does this tool use?",
      a: "This tool uses the JavaScript (ECMAScript) regex engine built into your browser. Most standard regex features — character classes, quantifiers, lookaheads, lookbehinds (in modern browsers), backreferences, and named groups — are fully supported.",
    },
    {
      q: "What do the flags mean?",
      a: "g (global) finds all matches instead of stopping at the first. i (case-insensitive) ignores letter case. m (multiline) makes ^ and $ match line boundaries. s (dotAll) makes the dot (.) match newline characters. u (unicode) enables full Unicode matching and proper surrogate pair handling.",
    },
    {
      q: "Why is my regex causing the browser to hang?",
      a: "Some patterns with nested quantifiers can cause catastrophic backtracking — exponential time complexity on certain inputs. For example, (a+)+b on a string of many 'a's without a 'b'. Simplify nested quantifiers or use atomic groups / possessive quantifiers where possible.",
    },
    {
      q: "Can I use lookbehind assertions?",
      a: "Lookbehind assertions (?<=...) and (?<!...) are supported in modern browsers (Chrome 62+, Firefox 78+, Safari 16.4+, Edge 79+). If your browser doesn't support them, you'll see a syntax error message.",
    },
  ],
};
