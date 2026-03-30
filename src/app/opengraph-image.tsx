import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const alt = `${SITE_NAME} social card`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
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
            FinePocket Toolbox
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                fontSize: "68px",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                fontWeight: 800,
                maxWidth: "860px",
              }}
            >
              Fast browser-based tools with clear explanations.
            </div>
            <div
              style={{
                fontSize: "28px",
                color: "#334155",
                maxWidth: "840px",
                lineHeight: 1.35,
              }}
            >
              {SITE_TAGLINE}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "14px",
              fontSize: "22px",
              color: "#475569",
            }}
          >
            <div style={{ padding: "10px 16px", borderRadius: "999px", background: "#eff6ff" }}>
              Developer
            </div>
            <div style={{ padding: "10px 16px", borderRadius: "999px", background: "#eff6ff" }}>
              Text
            </div>
            <div style={{ padding: "10px 16px", borderRadius: "999px", background: "#eff6ff" }}>
              Finance
            </div>
            <div style={{ padding: "10px 16px", borderRadius: "999px", background: "#eff6ff" }}>
              Calculators
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
