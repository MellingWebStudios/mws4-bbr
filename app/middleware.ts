// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL = "www.birminghamboilerrepairs.uk";

export function middleware(req: NextRequest) {
  const host  = req.headers.get("host") ?? "";
  const proto = req.headers.get("x-forwarded-proto") ?? "http";

  // Skip redirects in local dev
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return NextResponse.next();
  }

  // Force HTTPS + WWW
  if (host !== CANONICAL || proto !== "https") {
    const redirect =
      `https://${CANONICAL}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(redirect, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
