import type { ReactElement } from "react";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const SOCIAL_IMAGE_ALT = `${SITE_NAME} social card`;
export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";

function clampText(value: string, maxLength: number): string {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildSocialImagePayload(input: {
  title?: string;
  description?: string;
  eyebrow?: string;
}) {
  return {
    title: clampText(input.title || "Fast browser-based tools with clear explanations.", 80),
    description: clampText(input.description || SITE_TAGLINE, 140),
    eyebrow: input.eyebrow ? clampText(input.eyebrow, 36) : undefined,
  };
}

export function renderSocialImage(input: {
  title?: string;
  description?: string;
  eyebrow?: string;
}): ReactElement {
  const { title, description, eyebrow } = buildSocialImagePayload(input);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background:
          "radial-gradient(circle at top left, #dbeafe 0%, #eff6ff 28%, #f8fafc 62%, #e2e8f0 100%)",
        color: "#0f172a",
        fontFamily: "sans-serif",
        padding: "56px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          borderRadius: "36px",
          border: "1px solid rgba(148, 163, 184, 0.28)",
          background: "rgba(255, 255, 255, 0.86)",
          padding: "44px",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#2563eb",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              background: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            FP
          </div>
          {SITE_NAME}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                borderRadius: "999px",
                background: "#eff6ff",
                color: "#1d4ed8",
                padding: "10px 18px",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              maxWidth: "960px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#334155",
              maxWidth: "900px",
              lineHeight: 1.35,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: "22px",
            color: "#475569",
          }}
        >
          <div>toolbox.finepocket.app</div>
        </div>
      </div>
    </div>
  );
}
