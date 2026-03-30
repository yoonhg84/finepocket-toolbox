import { NextResponse } from "next/server";

const GOOGLE_SELLER_ACCOUNT_ID = "f08c47fec0942fa0";

function normalizePublisherId(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  return trimmed.startsWith("pub-") ? trimmed : `pub-${trimmed}`;
}

export function GET() {
  const publisherId = normalizePublisherId(process.env.ADSENSE_PUBLISHER_ID);
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, ${GOOGLE_SELLER_ACCOUNT_ID}\n`
    : [
        "# FinePocket Toolbox ads.txt",
        "# Set ADSENSE_PUBLISHER_ID to your AdSense publisher ID to publish the authorized seller record.",
      ].join("\n") + "\n";

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
