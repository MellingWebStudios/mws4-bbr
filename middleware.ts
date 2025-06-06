import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const pathname = req.nextUrl.pathname;

  // Skip redirect in development
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return NextResponse.next();
  }

  // Handle high-value legacy URL redirects with 308 (permanent)
  const legacyRedirects: Record<string, string> = {
    // Common legacy patterns that might be causing 404s
    '/home': '/',
    '/index': '/',
    '/index.html': '/',
    '/index.php': '/',
    '/default.html': '/',
    '/main': '/',
    
    // Service redirects - old to new patterns
    '/boiler-repair': '/services/boiler-repairs',
    '/boiler-service': '/services/boiler-servicing', 
    '/boiler-repairs': '/services/boiler-repairs',
    '/boiler-servicing': '/services/boiler-servicing',
    '/gas-safety-certificates': '/services/gas-safety',
    '/gas-certificates': '/services/gas-safety',
    '/landlord-certificates': '/services/gas-safety',
    '/ferroli': '/services/ferroli-specialists',
    '/ferroli-repairs': '/services/ferroli-specialists',
    
    // Location redirects - common misspellings/variations
    '/birmingham-boiler-repairs': '/birmingham',
    '/birmingham-boiler-repair': '/birmingham',
    '/solihull': '/birmingham', // Redirect nearby area to main Birmingham page
    '/coventry': '/birmingham',
    '/wolverhampton': '/birmingham',
    
    // Old page structure
    '/service': '/services',
    '/repair': '/services/boiler-repairs',
    '/pricing': '/prices',
    '/quote': '/contact',
    '/estimate': '/contact',
    '/booking': '/contact',
    '/emergency': '/contact',
    '/about-us': '/about',
    '/contact-us': '/contact',
    
    // Blog redirects
    '/news': '/blog',
    '/articles': '/blog',
    '/tips': '/blog',
    
    // Remove trailing variations
    '/services/': '/services',
    '/contact/': '/contact',
    '/about/': '/about',
    '/prices/': '/prices',
  };

  // Check for exact legacy redirects
  if (legacyRedirects[pathname]) {
    const redirectUrl = `https://www.birminghamboilerrepairs.uk${legacyRedirects[pathname]}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Handle old service-location patterns: /service-location -> /location/service
  const serviceLocationPattern = /^\/([^\/]+)-([^\/]+)$/;
  const serviceLocationMatch = pathname.match(serviceLocationPattern);
  if (serviceLocationMatch) {
    const [, service, location] = serviceLocationMatch;
    
    // Common service patterns that should redirect
    const serviceMap: Record<string, string> = {
      'boiler-repair': 'boiler-repairs',
      'boiler-service': 'boiler-servicing',
      'gas-safety': 'gas-safety',
      'ferroli': 'ferroli-specialists'
    };
    
    const mappedService = serviceMap[service] || service;
    const redirectUrl = `https://www.birminghamboilerrepairs.uk/${location}/${mappedService}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Always force HTTPS + www (only if not already perfect)
  if (host !== "www.birminghamboilerrepairs.uk" || proto !== "https") {
    const redirectUrl = `https://www.birminghamboilerrepairs.uk${pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     * - .well-known (security files)
     * - Static assets (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|css|js)$).*)',
  ],
};
