// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const isWWW = host.startsWith("www.");
  const isHTTPS = req.headers.get("x-forwarded-proto") === "https";

  // Redirect if not HTTPS or not WWW
  if (!isHTTPS || !isWWW) {
    url.hostname = "www.birminghamboilerrepairs.uk";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
