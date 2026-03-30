import type { ToolContent } from "@/lib/seo";

export const content: ToolContent = {
  title: "JWT Decoder",

  description:
    "Decode and inspect JSON Web Tokens (JWT) instantly. View header, payload claims, expiration status, and signature — all in your browser.",

  whatIs:
    "A JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. JWTs are widely used for authentication and authorization in modern web applications, APIs, and single sign-on (SSO) systems. Each JWT consists of three Base64-URL encoded parts — a header (algorithm and token type), a payload (claims about the user or session), and a cryptographic signature. This free online JWT Decoder lets you paste any JWT and instantly see its decoded header, payload with human-readable claim descriptions, formatted timestamps, expiration status, and raw signature. All processing happens entirely in your browser — no tokens are sent to any server.",

  howToUse:
    "1. Paste your JWT into the input textarea. The token is decoded automatically as you type. 2. View the three decoded sections: Header (algorithm and type), Payload (all claims with descriptions), and Signature (raw encoded string). 3. Timestamp claims like exp, iat, and nbf are automatically shown as human-readable dates with relative time. 4. If the token has an exp claim, a badge shows whether the token is currently valid or expired. 5. Use the Copy button to copy the decoded payload to your clipboard.",

  howItWorks:
    "The tool splits the JWT on its two dot (.) separators to extract the three parts. Each of the first two parts (header and payload) is decoded from Base64-URL encoding back to a UTF-8 string and then parsed as JSON. The tool recognizes standard JWT claims (iss, sub, exp, iat, etc.) and displays their descriptions. Timestamp claims are converted from Unix epoch seconds to human-readable dates. Expiration is checked by comparing the exp claim against the current time. The signature part is displayed as-is since verifying it requires the signing key, which is not available client-side.",

  useCases: [
    "Debugging authentication flows by inspecting token contents during API development",
    "Verifying JWT claims and expiration times when troubleshooting access issues",
    "Inspecting OAuth 2.0 and OpenID Connect tokens during SSO integration",
    "Understanding token structure and claims for learning JWT-based authentication",
    "Checking token payloads before and after refresh to ensure correct claim updates",
    "Auditing JWT contents for security reviews without needing a backend tool",
    "Quickly validating that a token generator produces correctly structured JWTs",
  ],

  faq: [
    {
      q: "Is my JWT safe when I paste it here?",
      a: "Yes. All decoding happens directly in your browser using JavaScript. Your token is never sent to any server, stored, or logged. JWTs may contain sensitive information, so you should always prefer client-side tools like this one over server-based decoders for production tokens.",
    },
    {
      q: "Can this tool verify the JWT signature?",
      a: "No. Signature verification requires the signing secret (for HMAC algorithms) or the public key (for RSA/ECDSA). This tool decodes and inspects the token contents but cannot verify authenticity. For production systems, always verify signatures on your server.",
    },
    {
      q: "What does it mean if my token is expired?",
      a: "If the exp (expiration) claim timestamp is in the past, the token is expired and should be rejected by any compliant server. You may need to refresh the token using a refresh token or re-authenticate to get a new one.",
    },
    {
      q: "Why are some claims not recognized?",
      a: "This tool recognizes standard JWT claims defined in RFC 7519 and common claims from OAuth 2.0 and OpenID Connect. Custom claims added by your application will still be displayed but without a description. The tool shows all claims regardless of whether they are standard.",
    },
    {
      q: "What is the difference between iat, nbf, and exp?",
      a: "iat (Issued At) is when the token was created. nbf (Not Before) is the earliest time the token should be accepted. exp (Expiration) is the latest time the token should be accepted. Together, they define the token's validity window.",
    },
  ],
};
