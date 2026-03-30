/** Split input into words, handling camelCase, PascalCase, snake_case, kebab-case, spaces, etc. */
function splitWords(s: string): string[] {
  return s
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase boundaries
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // ABCDef → ABC Def
    .replace(/[_\-./]+/g, " ") // delimiters to spaces
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function toUpperCase(s: string): string {
  return s.toUpperCase();
}

export function toLowerCase(s: string): string {
  return s.toLowerCase();
}

export function toTitleCase(s: string): string {
  return s.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export function toSentenceCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)(\w)/g, (_, prefix, char) => prefix + char.toUpperCase());
}

export function toCamelCase(s: string): string {
  const words = splitWords(s);
  return words
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

export function toPascalCase(s: string): string {
  return splitWords(s)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toKebabCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toLowerCase())
    .join("-");
}

export function toConstantCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toUpperCase())
    .join("_");
}

export function toDotCase(s: string): string {
  return splitWords(s)
    .map((w) => w.toLowerCase())
    .join(".");
}
