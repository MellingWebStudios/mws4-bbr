import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "http";

  // Skip redirect in development
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return NextResponse.next();
  }

  // Always force HTTPS + www (only if not already perfect)
  if (host !== "www.birminghamboilerrepairs.uk" || proto !== "https") {
    const redirectUrl = `https://www.birminghamboilerrepairs.uk${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
