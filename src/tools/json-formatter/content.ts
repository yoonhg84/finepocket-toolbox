import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "JSON Formatter & Validator",

  description:
    "Format, validate, minify, and sort JSON data online. Free browser-based JSON beautifier with syntax error detection.",

  whatIs:
    "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is the de facto standard for data exchange between web services, APIs, configuration files, and modern applications. This free online JSON Formatter & Validator tool lets you paste or upload raw JSON and instantly beautify it with proper indentation, validate its syntax with precise error reporting, minify it for production use by stripping whitespace, or sort all object keys alphabetically for consistent diffing and readability. Everything runs entirely in your browser — no data is ever sent to a server.",

  howToUse:
    "1. Paste your JSON into the input area on the left, or click 'Load Sample' to try a demo. You can also drag-and-drop a .json file using the file upload zone. 2. Choose a mode from the tabs: Format (beautify), Minify (compress), Validate (check syntax), or Sort Keys (alphabetical ordering). 3. When in Format mode, select your preferred indentation — 2 spaces, 4 spaces, or tabs. 4. The output appears instantly on the right. 5. Copy the result to your clipboard or download it as a .json file using the buttons below the output.",

  howItWorks:
    "The tool uses the browser's built-in JSON.parse() to parse your input and JSON.stringify() with configurable indentation to produce formatted output. Validation catches SyntaxError exceptions and extracts the error position (line and character) from the browser's error message, giving you precise feedback about where the problem lies. The Sort Keys feature performs a recursive depth-first traversal of the parsed object, sorting keys at every nesting level while preserving array order. All processing happens client-side in JavaScript — your data never leaves your browser.",

  useCases: [
    "Debugging API responses by formatting raw JSON payloads into readable structures",
    "Validating JSON configuration files (package.json, tsconfig.json, etc.) before deployment",
    "Minifying JSON data to reduce payload size for network transmission or storage",
    "Sorting object keys alphabetically to produce consistent diffs in version control",
    "Converting single-line JSON logs into human-readable multi-line format for analysis",
    "Preparing clean, well-formatted JSON examples for documentation and technical writing",
    "Quickly checking the structure and nesting of complex JSON data from databases or APIs",
  ],

  faq: [
    {
      q: "Is my data safe?",
      a: "Yes, completely. All JSON processing happens directly in your web browser using JavaScript. Your data is never transmitted to any server, stored, or logged. You can verify this by using the tool with your network inspector open — no outgoing requests are made.",
    },
    {
      q: "What is the maximum JSON size this tool can handle?",
      a: "The tool can handle JSON files up to several megabytes in size, limited only by your browser's available memory. For most practical use cases — API responses, config files, data exports — it works seamlessly. Extremely large files (50MB+) may cause the browser to slow down.",
    },
    {
      q: "Why does my JSON fail validation?",
      a: "Common reasons include trailing commas after the last item in an object or array (not allowed in JSON), single quotes instead of double quotes around strings, unquoted property names, comments (JSON does not support comments), and missing or extra brackets. The error message will indicate the approximate position of the issue.",
    },
    {
      q: "What is the difference between Format and Minify?",
      a: "Format (beautify) adds indentation and line breaks to make JSON human-readable. Minify removes all unnecessary whitespace and line breaks to produce the most compact representation, which is ideal for APIs, network payloads, and storage where file size matters.",
    },
    {
      q: "Can I use this tool for JSONL or JSON5?",
      a: "This tool validates and formats strict JSON as defined by the JSON specification (RFC 8259). It does not support JSON5 extensions like comments, trailing commas, or single-quoted strings. For JSONL (JSON Lines), you would need to process each line separately.",
    },
  ],
};
