import { ImageResponse } from "next/og";
import {
  renderSocialImage,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
} from "@/lib/social-image";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return new ImageResponse(
    renderSocialImage({
      title: searchParams.get("title") || undefined,
      description: searchParams.get("description") || undefined,
      eyebrow: searchParams.get("eyebrow") || undefined,
    }),
    {
      ...SOCIAL_IMAGE_SIZE,
      headers: {
        "content-type": SOCIAL_IMAGE_CONTENT_TYPE,
        "cache-control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
      },
    }
  );
}
