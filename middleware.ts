import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  PENDING_COMPANY_COOKIE,
} from "@/lib/session/constants";

const AUTH_PAGES = new Set(["/login", "/signup"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return NextResponse.next();
  }

  const hasAccessToken = Boolean(
    request.cookies.get(ACCESS_TOKEN_COOKIE)?.value,
  );
  const hasPendingCompany = Boolean(
    request.cookies.get(PENDING_COMPANY_COOKIE)?.value,
  );

  if (pathname.startsWith("/dashboard")) {
    if (hasAccessToken) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = hasPendingCompany ? "/select-company" : "/login";
    return NextResponse.redirect(url);
  }

  if (pathname === "/select-company") {
    if (hasAccessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (!hasPendingCompany) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (AUTH_PAGES.has(pathname)) {
    if (hasAccessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (hasPendingCompany) {
      const url = request.nextUrl.clone();
      url.pathname = "/select-company";
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/") {
    if (hasAccessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (hasPendingCompany) {
      const url = request.nextUrl.clone();
      url.pathname = "/select-company";
      return NextResponse.redirect(url);
    }

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
