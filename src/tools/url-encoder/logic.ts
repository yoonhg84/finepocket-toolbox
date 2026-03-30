export function urlEncode(input: string, mode: "component" | "uri"): string {
  if (!input) return "";
  return mode === "component" ? encodeURIComponent(input) : encodeURI(input);
}

export function urlDecode(input: string): { result: string; error: string | null } {
  if (!input) return { result: "", error: null };
  try {
    return { result: decodeURIComponent(input), error: null };
  } catch {
    return {
      result: "",
      error: "Invalid percent-encoded string. Check for malformed sequences like %ZZ or incomplete encodings.",
    };
  }
}
