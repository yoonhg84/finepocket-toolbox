import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE_NAME,
  detectLocaleFromAcceptLanguage,
  getLocaleFromPathname,
  localizePath,
  normalizeLocale,
} from "@/i18n";

function resolveRequestLocale(request: NextRequest) {
  const cookieLocale = normalizeLocale(
    request.cookies.get(LOCALE_COOKIE_NAME)?.value
  );
  if (cookieLocale) return cookieLocale;

  return detectLocaleFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const pathnameLocale = getLocaleFromPathname(request.nextUrl.pathname);

  if (!pathnameLocale) {
    const locale = resolveRequestLocale(request);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizePath(request.nextUrl.pathname, locale);

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE_NAME, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", pathnameLocale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set(LOCALE_COOKIE_NAME, pathnameLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
