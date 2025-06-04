import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Dev environment: skip redirects
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return NextResponse.next();
  }

  // Force www + https in production
  if (host !== "www.birminghamboilerrepairs.uk") {
    url.hostname = "www.birminghamboilerrepairs.uk";
    url.protocol = "https:";
    url.port = ""; // ✅ prevent :3000 from leaking into redirects
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
