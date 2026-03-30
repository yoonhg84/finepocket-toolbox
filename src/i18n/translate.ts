import { EN_MESSAGES, type Messages } from "./messages";

export type TranslateParams = Record<string, number | string>;
export type TranslateFn = (
  key: string,
  params?: TranslateParams,
  fallback?: string
) => string;

function getNestedValue(tree: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[segment];
  }, tree);
}

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;

  return template.replace(/\{(\w+)\}/g, (_, token) => {
    const value = params[token];
    return value === undefined ? `{${token}}` : String(value);
  });
}

export function createTranslator(
  messages: Messages,
  fallbackMessages: Messages = EN_MESSAGES
): TranslateFn {
  return (key, params, fallback) => {
    const localized = getNestedValue(messages, key);
    const english = getNestedValue(fallbackMessages, key);
    const template =
      typeof localized === "string"
        ? localized
        : typeof english === "string"
          ? english
          : fallback ?? key;

    return interpolate(template, params);
  };
}

