/**
 * Pure logic functions for JSON Formatter tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

interface JsonResult {
  result: string;
  error: string | null;
}

interface ValidateResult {
  valid: boolean;
  error: string | null;
}

/**
 * Extract a human-readable error position from a JSON.parse SyntaxError message.
 * Browsers format the message differently, so we try multiple patterns.
 */
function extractErrorPosition(err: unknown): string | null {
  if (!(err instanceof SyntaxError)) return null;
  const msg = err.message;

  // Chrome / V8:  "... at position 42"  or  "... at line 3 column 5"
  const posMatch = msg.match(/at position (\d+)/);
  if (posMatch) return `at character ${posMatch[1]}`;

  const lineColMatch = msg.match(/at line (\d+) column (\d+)/);
  if (lineColMatch) return `at line ${lineColMatch[1]}, column ${lineColMatch[2]}`;

  // Firefox:  "... at line 3 column 5 of the JSON data"
  const ffMatch = msg.match(/line (\d+) column (\d+)/);
  if (ffMatch) return `at line ${ffMatch[1]}, column ${ffMatch[2]}`;

  return null;
}

function buildErrorMessage(err: unknown): string {
  if (!(err instanceof SyntaxError)) return String(err);
  const position = extractErrorPosition(err);
  const base = err.message;
  return position ? `${base}` : base;
}

/**
 * Beautify / pretty-print JSON with a given indent.
 * @param indent - number of spaces (2, 4) or '\t' for tab
 */
export function formatJson(
  input: string,
  indent: number | string = 2
): JsonResult {
  if (!input.trim()) {
    return { result: "", error: null };
  }
  try {
    const parsed = JSON.parse(input);
    const result = JSON.stringify(parsed, null, indent);
    return { result, error: null };
  } catch (err) {
    return { result: "", error: buildErrorMessage(err) };
  }
}

/**
 * Minify JSON by removing all unnecessary whitespace.
 */
export function minifyJson(input: string): JsonResult {
  if (!input.trim()) {
    return { result: "", error: null };
  }
  try {
    const parsed = JSON.parse(input);
    const result = JSON.stringify(parsed);
    return { result, error: null };
  } catch (err) {
    return { result: "", error: buildErrorMessage(err) };
  }
}

/**
 * Validate JSON and return whether it is valid, with error details if not.
 */
export function validateJson(input: string): ValidateResult {
  if (!input.trim()) {
    return { valid: true, error: null };
  }
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (err) {
    return { valid: false, error: buildErrorMessage(err) };
  }
}

/**
 * Recursively sort object keys alphabetically.
 * Arrays are preserved in order; each element is recursively sorted if it's an object.
 */
export function sortJsonKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortJsonKeys);
  }

  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(obj as Record<string, unknown>).sort();
  for (const key of keys) {
    sorted[key] = sortJsonKeys((obj as Record<string, unknown>)[key]);
  }
  return sorted;
}
