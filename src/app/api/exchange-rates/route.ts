import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

interface ExchangeRateResponse {
  result: string;
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch exchange rates" },
        { status: 502 }
      );
    }

    const data: ExchangeRateResponse = await res.json();

    if (data.result !== "success") {
      return NextResponse.json(
        { error: "Exchange rate API returned an error" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      base: data.base_code,
      lastUpdated: data.time_last_update_utc,
      rates: data.rates,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch exchange rates. Please try again later." },
      { status: 500 }
    );
  }
}
