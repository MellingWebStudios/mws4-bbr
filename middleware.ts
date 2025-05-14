import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle sitemap.xml and robots.txt dynamically if needed
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    // The files are already in the public directory, so Next.js will serve them automatically
    // This middleware is just a placeholder in case you need to add dynamic logic later
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/sitemap.xml", "/robots.txt"],
}
