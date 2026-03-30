import { NextResponse } from "next/server";

const GOOGLE_SELLER_ACCOUNT_ID = "f08c47fec0942fa0";

function normalizePublisherId(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  return trimmed.startsWith("pub-") ? trimmed : `pub-${trimmed}`;
}

export function GET() {
  const publisherId = normalizePublisherId(process.env.ADSENSE_PUBLISHER_ID);
  if (!publisherId) {
    return new NextResponse("ads.txt is not configured.\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  const body = `google.com, ${publisherId}, DIRECT, ${GOOGLE_SELLER_ACCOUNT_ID}\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
