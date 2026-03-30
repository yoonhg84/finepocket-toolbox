function normalizeAdSenseNumericId(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  return trimmed.replace(/^ca-pub-/, "").replace(/^pub-/, "").trim();
}

export function normalizeAdSensePublisherId(value?: string): string | null {
  const numericId = normalizeAdSenseNumericId(value);
  return numericId ? `pub-${numericId}` : null;
}

export function normalizeAdSenseClientId(value?: string): string | null {
  const numericId = normalizeAdSenseNumericId(value);
  return numericId ? `ca-pub-${numericId}` : null;
}

export function getAdSensePublisherId(): string | null {
  return normalizeAdSensePublisherId(
    process.env.ADSENSE_PUBLISHER_ID ?? process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  );
}

export function getAdSenseClientId(): string | null {
  return normalizeAdSenseClientId(
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? process.env.ADSENSE_PUBLISHER_ID
  );
}

export function getAdSenseToolSlot(): string | null {
  const slot =
    process.env.NEXT_PUBLIC_ADSENSE_TOOL_SLOT ?? process.env.ADSENSE_TOOL_SLOT;

  return slot?.trim() || null;
}
