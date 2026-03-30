/**
 * Pure logic functions for JWT Decoder tool.
 * No UI dependencies — all functions are deterministic and side-effect free.
 */

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  error?: string;
}

/**
 * Decode a Base64-URL encoded string to a UTF-8 string.
 * Handles the URL-safe alphabet (+/- replaced by -/_) and missing padding.
 */
export function base64UrlDecode(str: string): string {
  // Restore standard Base64 characters
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if missing
  const pad = base64.length % 4;
  if (pad === 2) base64 += "==";
  else if (pad === 3) base64 += "=";

  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    // Fallback for non-UTF8 content
    return atob(base64);
  }
}

/**
 * Decode a JWT string into its three parts.
 */
export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();

  if (!trimmed) {
    return { header: {}, payload: {}, signature: "", error: undefined };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      header: {},
      payload: {},
      signature: "",
      error: `Invalid JWT structure: expected 3 parts separated by dots, got ${parts.length}.`,
    };
  }

  let header: Record<string, unknown>;
  try {
    header = JSON.parse(base64UrlDecode(parts[0]));
  } catch {
    return {
      header: {},
      payload: {},
      signature: parts[2] || "",
      error: "Failed to decode JWT header. The header is not valid Base64-URL encoded JSON.",
    };
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return {
      header,
      payload: {},
      signature: parts[2] || "",
      error: "Failed to decode JWT payload. The payload is not valid Base64-URL encoded JSON.",
    };
  }

  return {
    header,
    payload,
    signature: parts[2],
    error: undefined,
  };
}

/**
 * Check whether a JWT payload's `exp` claim indicates expiration.
 */
export function isExpired(payload: Record<string, unknown>): boolean {
  if (typeof payload.exp !== "number") return false;
  return Date.now() / 1000 > payload.exp;
}

/**
 * Format a Unix timestamp (seconds) to a human-readable date string.
 */
export function formatTimestamp(ts: number): string {
  try {
    const date = new Date(ts * 1000);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return "Invalid timestamp";
  }
}

/**
 * Return a relative time string like "2 hours ago" or "in 3 days".
 */
export function relativeTime(ts: number): string {
  const now = Date.now() / 1000;
  const diff = ts - now;
  const absDiff = Math.abs(diff);

  if (absDiff < 60) return diff >= 0 ? "in a few seconds" : "a few seconds ago";
  if (absDiff < 3600) {
    const mins = Math.floor(absDiff / 60);
    return diff >= 0 ? `in ${mins} minute${mins > 1 ? "s" : ""}` : `${mins} minute${mins > 1 ? "s" : ""} ago`;
  }
  if (absDiff < 86400) {
    const hrs = Math.floor(absDiff / 3600);
    return diff >= 0 ? `in ${hrs} hour${hrs > 1 ? "s" : ""}` : `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(absDiff / 86400);
  return diff >= 0 ? `in ${days} day${days > 1 ? "s" : ""}` : `${days} day${days > 1 ? "s" : ""} ago`;
}

/**
 * Descriptions for standard and common JWT claims.
 */
export const CLAIM_DESCRIPTIONS: Record<string, string> = {
  iss: "Issuer — identifies the principal that issued the JWT",
  sub: "Subject — identifies the principal that is the subject of the JWT",
  aud: "Audience — identifies the recipients that the JWT is intended for",
  exp: "Expiration Time — time after which the JWT must not be accepted",
  nbf: "Not Before — time before which the JWT must not be accepted",
  iat: "Issued At — time at which the JWT was issued",
  jti: "JWT ID — unique identifier for the JWT",
  name: "Full Name — display name of the user",
  email: "Email — email address of the user",
  role: "Role — role or permission level of the user",
  roles: "Roles — list of roles or permission levels",
  scope: "Scope — space-separated list of granted scopes/permissions",
  azp: "Authorized Party — the party to which the ID token was issued",
  nonce: "Nonce — value used to associate a client session with an ID token",
  at_hash: "Access Token Hash — hash of the access token",
  c_hash: "Code Hash — hash of the authorization code",
  auth_time: "Authentication Time — time when the user last authenticated",
  acr: "Authentication Context Class Reference",
  amr: "Authentication Methods References",
  typ: "Type — type of the token (usually in header)",
  alg: "Algorithm — signing algorithm (usually in header)",
  kid: "Key ID — identifier for the key used to sign the token",
  sid: "Session ID — unique session identifier",
  org_id: "Organization ID — identifier for the organization",
  permissions: "Permissions — list of permissions granted to the token bearer",
  email_verified: "Email Verified — whether the user's email has been verified",
  phone_number: "Phone Number — phone number of the user",
  picture: "Picture — URL of the user's profile picture",
  given_name: "Given Name — first name of the user",
  family_name: "Family Name — last name of the user",
  locale: "Locale — user's preferred locale",
  updated_at: "Updated At — time the user's information was last updated",
};

/** Claims that contain Unix timestamps. */
export const TIMESTAMP_CLAIMS = new Set(["exp", "nbf", "iat", "auth_time", "updated_at"]);
