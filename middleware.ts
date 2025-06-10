import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { slugify } from '@/lib/slug';
import { validateAndNormalizeUrl, hasDuplicateSegments, removeDuplicateSegments } from '@/lib/url-validator';

// Location name to slug mappings for redirects
const locationRedirects: Record<string, string> = {
  // Handle space-separated location names to proper slugs
  'Acocks Green': 'acocks-green',
  'Aston Cross': 'aston-cross',
  'Aston Fields': 'aston-fields',
  'Astwood Bank': 'astwood-bank',
  'Austin Village': 'austin-village',
  'Bartley Green': 'bartley-green',
  'Beech Lanes': 'beech-lanes',
  'Birches Green': 'birches-green',
  'Bordesley Green': 'bordesley-green',
  'Brandwood End': 'brandwood-end',
  'Browns Green': 'browns-green',
  'Buckland End': 'buckland-end',
  'Camp Hill': 'camp-hill',
  'Castle Vale': 'castle-vale',
  'Chad Valley': 'chad-valley',
  'Cofton Common': 'cofton-common',
  'Falcon Lodge': 'falcon-lodge',
  'Four Oaks': 'four-oaks',
  'Fox Hollies': 'fox-hollies',
  'Garretts Green': 'garretts-green',
  'Gib Heath': 'gib-heath',
  'Glebe Farm': 'glebe-farm',
  'Gospel Oak': 'gospel-oak',
  'Gosta Green': 'gosta-green',
  'Gravelly Hill': 'gravelly-hill',
  'Great Barr': 'great-barr',
  'Grimstock Hill': 'grimstock-hill',
  'Gun Quarter': 'gun-quarter',
  'Hall Green': 'hall-green',
  'Handsworth Wood': 'handsworth-wood',
  'Harts Green': 'harts-green',
  'Hay Mills': 'hay-mills',
  'High Heath': 'high-heath',
  'Highters Heath': 'highters-heath',
  'Hill Hook': 'hill-hook',
  'Hill Wood': 'hill-wood',
  'Hodge Hill': 'hodge-hill',
  'Old Oscott': 'old-oscott',
  'Over Green': 'over-green',
  'Perry Barr': 'perry-barr',
  'Perry Beeches': 'perry-beeches',
  'Perry Common': 'perry-common',
  'Pype Hayes': 'pype-hayes',
  'Reddicap Heath': 'reddicap-heath',
  'Rotton Park': 'rotton-park',
  'Rowney Green': 'rowney-green',
  'Selly Oak': 'selly-oak',
  'Selly Park': 'selly-park',
  'Shard End': 'shard-end',
  'Shenley Fields': 'shenley-fields',
  'Shenley Green': 'shenley-green',
  'Short Heath': 'short-heath',
  'Showell Green': 'showell-green',
  'Small Heath': 'small-heath',
  'South Woodgate': 'south-woodgate',
  'South Yardley': 'south-yardley',
  'Spring Vale': 'spring-vale',
  'Stockland Green': 'stockland-green',
  'Sutton Coldfield': 'sutton-coldfield',
  'Ten Acres': 'ten-acres',
  'The Parade': 'the-parade',
  'Thimble End': 'thimble-end',
  'Tile Cross': 'tile-cross',
  'Tower Hill': 'tower-hill',
  'Tudor Hill': 'tudor-hill',
  'Turves Green': 'turves-green',
  'West Midlands': 'west-midlands',
  'Yardley Wood': 'yardley-wood'
};

// Get the base URL for redirects, supporting multiple environments
function getBaseUrl(host: string): string {
  // In development, use localhost
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return `http://${host}`;
  }
  
  // Check if we have a WEBSITE_URL environment variable
  if (process.env.WEBSITE_URL) {
    return process.env.WEBSITE_URL;
  }
  
  // Fall back to the original hardcoded domain
  return "https://www.birminghamboilerrepairs.uk";
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const pathname = req.nextUrl.pathname;

  // Skip redirect in development
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return NextResponse.next();
  }

  // Early check for duplicate segments (e.g., /selly-park/selly-park/)
  if (hasDuplicateSegments(pathname)) {
    const cleanedPath = removeDuplicateSegments(pathname);
    const baseUrl = getBaseUrl(host);
    const redirectUrl = `${baseUrl}${cleanedPath}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Check for URLs with spaces or invalid characters that need normalization
  const urlValidation = validateAndNormalizeUrl(pathname);
  if (!urlValidation.isValid && urlValidation.normalizedPath) {
    const baseUrl = getBaseUrl(host);
    const redirectUrl = `${baseUrl}${urlValidation.normalizedPath}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
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

    // Common 404 patterns observed
    '/Selly Park': '/selly-park',
    '/Selly%20Park': '/selly-park',
    '/selly park': '/selly-park',
    '/SELLY-PARK': '/selly-park',
    '/Selly-Park': '/selly-park',
    '/selly_park': '/selly-park',
    '/sellpark': '/selly-park',
    
    // Other common location misspellings
    '/Acocks Green': '/acocks-green',
    '/Acocks%20Green': '/acocks-green',
    '/acocks green': '/acocks-green',
    '/Hall Green': '/hall-green',
    '/Hall%20Green': '/hall-green',
    '/hall green': '/hall-green',
    '/Small Heath': '/small-heath',
    '/Small%20Heath': '/small-heath',
    '/small heath': '/small-heath',
    
    // Service variations
    '/boiler repair': '/services/boiler-repairs',
    '/boiler%20repair': '/services/boiler-repairs',
    '/boiler_repair': '/services/boiler-repairs',
    '/boilerrepair': '/services/boiler-repairs',
    '/boiler service': '/services/boiler-servicing',
    '/boiler%20service': '/services/boiler-servicing',
    '/boiler_service': '/services/boiler-servicing',
    '/boilerservice': '/services/boiler-servicing',
  };

  // Check for exact legacy redirects
  if (legacyRedirects[pathname]) {
    const baseUrl = getBaseUrl(host);
    const redirectUrl = `${baseUrl}${legacyRedirects[pathname]}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301); // Changed from 308 to 301
  }

  // Handle location redirects - both URL-encoded and regular location names
  for (const [locationName, slug] of Object.entries(locationRedirects)) {
    const encodedLocationName = encodeURIComponent(locationName);
    
    // Handle URL-encoded location names: /Austin%20Village -> /austin-village
    if (pathname === `/${encodedLocationName}`) {
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${slug}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301); // changed from 308 to 301
    }
    
    // Handle regular location names: /Austin Village -> /austin-village
    if (pathname === `/${locationName}`) {
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${slug}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301); // changed from 308 to 301
    }
    
    // Handle URL-encoded location+service patterns: /Austin%20Village/boiler-repairs -> /austin-village/boiler-repairs
    const encodedServicePattern = new RegExp(`^/${encodedLocationName}/(.+)$`);
    const encodedServiceMatch = pathname.match(encodedServicePattern);
    if (encodedServiceMatch) {
      const [, service] = encodedServiceMatch;
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${slug}/${service}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301); // changed from 308 to 301
    }
    
    // Handle regular location+service patterns: /Austin Village/boiler-repairs -> /austin-village/boiler-repairs
    const servicePattern = new RegExp(`^/${locationName}/(.+)$`);
    const serviceMatch = pathname.match(servicePattern);
    if (serviceMatch) {
      const [, service] = serviceMatch;
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${slug}/${service}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301); // changed from 308 to 301
    }
  }

  // Handle old service-location patterns: /service-location -> /location/service
  const serviceLocationPattern = /^\/([^\/]+)-([^\/]+)$/;
  const serviceLocationMatch = pathname.match(serviceLocationPattern);
  if (serviceLocationMatch) {
    const [, service, location] = serviceLocationMatch;
    
    // Exclude legitimate page URLs that contain hyphens
    const excludedPages = [
      'privacy-policy',
      'sitemap-viewer'
    ];
    
    // Don't redirect if this is actually a legitimate page URL
    if (!excludedPages.some(page => pathname === `/${page}`)) {
      // Common service patterns that should redirect
      const serviceMap: Record<string, string> = {
        'boiler-repair': 'boiler-repairs',
        'boiler-service': 'boiler-servicing',
        'gas-safety': 'gas-safety',
        'ferroli': 'ferroli-specialists'
      };
      
      const mappedService = serviceMap[service] || service;
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${location}/${mappedService}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301); // Changed from 308 to 301
    }
  }

  // Check for location-only URLs and redirect to the correct slug
  const locationOnlyPattern = /^\/([^\/]+)$/;
  const locationOnlyMatch = pathname.match(locationOnlyPattern);
  if (locationOnlyMatch) {
    const [, locationName] = locationOnlyMatch;
    // Decode URL-encoded location names
    const decodedLocationName = decodeURIComponent(locationName);
    // Only redirect if the decoded name is in the mapping (i.e., is a space-separated name) and the path is not already the slug
    if (
      locationRedirects[decodedLocationName] &&
      pathname !== `/${locationRedirects[decodedLocationName]}` &&
      decodedLocationName !== locationRedirects[decodedLocationName]
    ) {
      const locationSlug = locationRedirects[decodedLocationName];
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${locationSlug}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301); // Changed from 308 to 301
    }
  }

  // Handle case-insensitive single-word location redirects (e.g., /Smithfield -> /smithfield)
  const singleWordLocations = [
    'acocks-green', 'ashted', 'aston', 'aston-cross', 'aston-fields', 'astwood-bank',
    'austin-village', 'bartley-green', 'beech-lanes', 'billesley', 'birches-green',
    'birchfield', 'birmingham', 'boldmere', 'bordesley', 'bordesley-green', 'bournbrook',
    'bournville', 'brandwood-end', 'bromford', 'bromsgrove', 'browns-green', 'buckland-end',
    'california', 'camp-hill', 'castle-vale', 'catshill', 'chad-valley', 'churchfield',
    'cofton-common', 'cotteridge', 'deritend', 'dodford', 'eastside', 'edgbaston',
    'erdington', 'falcon-lodge', 'finstall', 'four-oaks', 'fox-hollies', 'frankley',
    'garretts-green', 'gib-heath', 'gilbertstone', 'glebe-farm', 'gospel-oak',
    'gosta-green', 'gravelly-hill', 'great-barr', 'greet', 'grimstock-hill', 'gun-quarter',
    'hall-green', 'hamstead', 'handsworth', 'handsworth-wood', 'harborne', 'harts-green',
    'hawkesley', 'hay-mills', 'high-heath', 'highgate', 'highters-heath', 'hill-hook',
    'hill-wood', 'hodge-hill', 'hopwood', 'lickey', 'oakenshaw', 'old-oscott',
    'over-green', 'parkhall', 'peddimore', 'pelham', 'perry-barr', 'perry-beeches',
    'perry-common', 'pheasey', 'pype-hayes', 'queslett', 'quinton', 'reddicap-heath',
    'redditch', 'rednal', 'ridgacre', 'rotton-park', 'roughley', 'rowney-green', 'rubery', 'saltley',
    'sarehole', 'selly-oak', 'selly-park', 'shard-end', 'sheldon', 'shenley-fields',
    'shenley-green', 'short-heath', 'showell-green', 'small-heath', 'smithfield', 'soho',
    'south-yardley', 'south-woodgate', 'southside', 'sparkbrook', 'sparkhill',
    'spring-vale', 'springfield', 'stechford', 'stirchley', 'stockfield', 'stockland-green',
    'streetly', 'sutton-coldfield', 'tardebigge', 'ten-acres', 'the-parade',
    'theatreland', 'thimble-end', 'tile-cross', 'tower-hill', 'tudor-hill', 'turves-green',
    'tyburn', 'tyseley', 'walkwood', 'webheath', 'west-midlands', 'wirehill', 'wythall', 'yardley',
    'yardley-wood'
  ];

  const caseInsensitivePattern = /^\/([^\/]+)\/?$/;
  const caseInsensitiveMatch = pathname.match(caseInsensitivePattern);
  if (caseInsensitiveMatch) {
    const [, locationInput] = caseInsensitiveMatch;
    const lowercaseLocation = locationInput.toLowerCase();
    
    // Check if this is a valid single-word location that needs case correction
    if (singleWordLocations.includes(lowercaseLocation) && locationInput !== lowercaseLocation) {
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${lowercaseLocation}${req.nextUrl.search}`;
      // Use 301 for canonicalization
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // Handle case-insensitive location+service patterns (e.g., /Smithfield/boiler-repairs -> /smithfield/boiler-repairs)
  const caseInsensitiveServicePattern = /^\/([^\/]+)\/(.+)$/;
  const caseInsensitiveServiceMatch = pathname.match(caseInsensitiveServicePattern);
  if (caseInsensitiveServiceMatch) {
    const [, locationInput, service] = caseInsensitiveServiceMatch;
    const lowercaseLocation = locationInput.toLowerCase();
    
    // Check if this is a valid single-word location that needs case correction
    if (singleWordLocations.includes(lowercaseLocation) && locationInput !== lowercaseLocation) {
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${lowercaseLocation}/${service}${req.nextUrl.search}`;
      // Use 301 for canonicalization
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // Only enforce HTTPS + www for the production domain (www.birminghamboilerrepairs.uk)
  // For other domains (like Fly.io staging), allow them to work without redirects
  if (process.env.NODE_ENV === "production" && 
      !host.includes("localhost") && 
      !host.includes("127.0.0.1") &&
      !host.includes("fly.dev") && // Don't redirect staging domains
      (host !== "www.birminghamboilerrepairs.uk" || proto !== "https")) {
    const redirectUrl = `https://www.birminghamboilerrepairs.uk${pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // List of legitimate page routes that should not be redirected
  const legitimatePageRoutes = [
    'services', 'blog', 'about', 'contact', 'prices', 'guides', 
    'locations', 'privacy-policy', 'sitemap-viewer'
  ];

  // Catch-all redirect for unmatched slugs - only redirect if it's a potential location slug
  const pathSegment = pathname.slice(1); // Remove leading slash
  const regex = /^[a-z0-9\-]+$/; // Only lowercase for consistency
  
  // Only redirect if it looks like a location slug and isn't already a known page
  if (regex.test(pathSegment) && pathSegment.length > 2) {
    // Don't redirect legitimate page routes
    if (legitimatePageRoutes.includes(pathSegment)) {
      return NextResponse.next();
    }
    
    // Check if this might be a valid location by seeing if it's in our single word locations
    if (singleWordLocations.includes(pathSegment.toLowerCase())) {
      // This is a valid location, let it pass through to Next.js routing
      return NextResponse.next();
    }
    
    // For other unmatched slugs, redirect to the main page instead of creating broken links
    const baseUrl = getBaseUrl(host);
    return NextResponse.redirect(`${baseUrl}/`, 301);
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
