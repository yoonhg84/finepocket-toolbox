import { NextResponse } from "next/server";
import { getAdSensePublisherId } from "@/lib/adsense";

const GOOGLE_SELLER_ACCOUNT_ID = "f08c47fec0942fa0";

export function GET() {
  const publisherId = getAdSensePublisherId();
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
