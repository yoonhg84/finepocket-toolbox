/**
 * Pure logic functions for Regex Tester tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

export interface RegexMatch {
  fullMatch: string;
  groups: string[];
  index: number;
}

/**
 * Test a regex pattern against a string and return all matches.
 */
export function testRegex(
  pattern: string,
  flags: string,
  testStr: string
): { matches: RegexMatch[]; error: string | null } {
  if (!pattern || !testStr) {
    return { matches: [], error: null };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes("g")) {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(testStr)) !== null) {
        matches.push({
          fullMatch: match[0],
          groups: match.slice(1),
          index: match.index,
        });
        // Prevent infinite loop on zero-length matches
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(testStr);
      if (match) {
        matches.push({
          fullMatch: match[0],
          groups: match.slice(1),
          index: match.index,
        });
      }
    }

    return { matches, error: null };
  } catch (err) {
    return {
      matches: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Replace matches of a regex pattern in a string.
 */
export function replaceWithRegex(
  pattern: string,
  flags: string,
  testStr: string,
  replacement: string
): { result: string; error: string | null } {
  if (!pattern || !testStr) {
    return { result: testStr, error: null };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const result = testStr.replace(regex, replacement);
    return { result, error: null };
  } catch (err) {
    return {
      result: testStr,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Escape HTML special characters so that raw text can be safely used
 * inside innerHTML without XSS risk.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Build an HTML string with <mark> tags highlighting all regex matches.
 */
export function buildHighlightedHtml(
  pattern: string,
  flags: string,
  testStr: string
): { html: string; error: string | null } {
  if (!pattern || !testStr) {
    return { html: escapeHtml(testStr), error: null };
  }

  try {
    const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
    let lastIndex = 0;
    let html = "";
    let match: RegExpExecArray | null;

    while ((match = regex.exec(testStr)) !== null) {
      // Text before the match
      html += escapeHtml(testStr.slice(lastIndex, match.index));
      // The matched text wrapped in <mark>
      html += `<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">${escapeHtml(match[0])}</mark>`;
      lastIndex = match.index + match[0].length;

      if (match[0].length === 0) {
        regex.lastIndex++;
        if (regex.lastIndex > testStr.length) break;
      }
    }

    html += escapeHtml(testStr.slice(lastIndex));
    return { html, error: null };
  } catch (err) {
    return {
      html: escapeHtml(testStr),
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export interface RegexPreset {
  name: string;
  pattern: string;
  flags: string;
  example: string;
}

export const PRESETS: RegexPreset[] = [
  {
    name: "Email",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "gi",
    example: "Contact us at hello@example.com or support@finepocket.app for help.",
  },
  {
    name: "URL",
    pattern: "https?://[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=%]+",
    flags: "gi",
    example: "Visit https://example.com or http://sub.domain.org/path?q=1 for more info.",
  },
  {
    name: "IPv4 Address",
    pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b",
    flags: "g",
    example: "Server IPs: 192.168.1.1, 10.0.0.255, 172.16.254.1, 999.999.999.999 (invalid).",
  },
  {
    name: "Phone Number (US)",
    pattern: "\\+?1?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}",
    flags: "g",
    example: "Call (555) 123-4567 or +1-800-555-0199 or 555.867.5309 today.",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",
    flags: "g",
    example: "Events: 2025-01-15, 2025-12-31, 2025-06-01, invalid: 2025-13-40.",
  },
  {
    name: "Hex Color",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    flags: "gi",
    example: "Colors: #fff, #FF5733, #00aacc, #123, not a color: #ZZZZZZ.",
  },
  {
    name: "HTML Tag",
    pattern: "<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?\\/?>",
    flags: "gi",
    example: '<div class="main"><p>Hello</p><br/><img src="a.png" /></div>',
  },
  {
    name: "Credit Card",
    pattern: "\\b(?:\\d{4}[\\s-]?){3}\\d{4}\\b",
    flags: "g",
    example: "Cards: 4111 1111 1111 1111, 5500-0000-0000-0004, 378282246310005.",
  },
  {
    name: "Username",
    pattern: "\\b[a-zA-Z][a-zA-Z0-9_-]{2,15}\\b",
    flags: "g",
    example: "Users: john_doe, alice-99, Bob, x (too short), thisusernameiswaytoolongg.",
  },
  {
    name: "Strong Password",
    pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
    flags: "",
    example: "Weak: abc123, Strong: MyP@ss1word, Test: Hello@World9.",
  },
  {
    name: "UUID",
    pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
    flags: "gi",
    example: "ID: 550e8400-e29b-41d4-a716-446655440000 and 6ba7b810-9dad-11d1-80b4-00c04fd430c8.",
  },
  {
    name: "JSON String Key",
    pattern: '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"\\s*:',
    flags: "g",
    example: '{"name": "Alice", "age": 30, "is_active": true}',
  },
];
