import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { slugify } from '@/lib/slug';
import { validateAndNormalizeUrl, hasDuplicateSegments, removeDuplicateSegments } from '@/lib/url-validator';
import { locations } from '@/lib/locations-data';

// Location name to slug mappings for redirects
const locationRedirects: Record<string, string> = {
  // Handle space-separated location names to proper slugs
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
  'Kings Heath': 'kings-heath',
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
  'Spark Hill': 'sparkhill',
  'Spring Vale': 'spring-vale',
  'Tower Hill': 'tower-hill',
  'Tudor Hill': 'tudor-hill',
  'Stockland Green': 'stockland-green',
  'Sutton Coldfield': 'sutton-coldfield',
  'Ten Acres': 'ten-acres',
  'The Parade': 'the-parade',
  'Thimble End': 'thimble-end',
  'Tile Cross': 'tile-cross',
  'Turves Green': 'turves-green',
  'West Bromwich': 'west-bromwich',
  'West Midlands': 'west-midlands',
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

  // Skip redirect in development - temporarily disabled to test URL encoding fixes
  // if (host.includes("localhost") || host.includes("127.0.0.1")) {
  //   return NextResponse.next();
  // }

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
    '/coventry': '/birmingham',

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

    '/selly-oaks': '/selly-oak',
    '/sellyoaks': '/selly-oak',
    '/selly-oaks/boiler-repairs': '/selly-oak/boiler-repairs',
    '/sellyoaks/boiler-repairs': '/selly-oak/boiler-repairs',
    '/oak/selly': '/selly-oak',
    '/oaks/selly': '/selly-oak',
    '/oak-selly': '/selly-oak',
    '/oaks-selly': '/selly-oak',
    '/sellyoak': '/selly-oak', // Common typo, just in case
    '/sellyoak/boiler-repairs': '/selly-oak/boiler-repairs',

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

  // Special handling for location patterns that look like service-location but are actually split location names
  const specialLocationPatterns: Record<string, string> = {
    // Only keeping entries that point to valid location slugs
    '/green/acocks': '/acocks-green',
    '/green/hall': '/hall-green',
    '/park/selly': '/selly-park',
    '/oak/selly': '/selly-oak',
    '/hill/spark': '/sparkhill',
    '/barr/perry': '/perry-barr',
    '/common/perry': '/perry-common',
    '/vale/castle': '/castle-vale',
    '/village/austin': '/austin-village',
    '/green/bartley': '/bartley-green',
    '/lanes/beech': '/beech-lanes',
    '/green/birches': '/birches-green',
    '/end/brandwood': '/brandwood-end',
    '/oaks/four': '/four-oaks',
    '/barr/great': '/great-barr',
    // Adding other valid split location patterns
    '/heath/small': '/small-heath',
    '/wood/yardley': '/yardley-wood',
    '/green/bordesley': '/bordesley-green',
    '/green/browns': '/browns-green',
    '/end/buckland': '/buckland-end',
    '/hill/camp': '/camp-hill',
    '/valley/chad': '/chad-valley',
    '/common/cofton': '/cofton-common',
    '/lodge/falcon': '/falcon-lodge',
    '/hollies/fox': '/fox-hollies',
    '/green/garretts': '/garretts-green',
    '/heath/gib': '/gib-heath',
    '/farm/glebe': '/glebe-farm',
    '/oak/gospel': '/gospel-oak',
    '/green/gosta': '/gosta-green',
    '/hill/gravelly': '/gravelly-hill',
    '/wood/handsworth': '/handsworth-wood',
    '/green/harts': '/harts-green',
    '/mills/hay': '/hay-mills',
    '/heath/high': '/high-heath',
    '/heath/highters': '/highters-heath',
    '/hook/hill': '/hill-hook',
    '/wood/hill': '/hill-wood',
    '/hill/hodge': '/hodge-hill',
    '/heath/kings': '/kings-heath',
    '/green/over': '/over-green',
    '/beeches/perry': '/perry-beeches',
    '/hayes/pype': '/pype-hayes',
    '/heath/reddicap': '/reddicap-heath',
    '/park/rotton': '/rotton-park',
    '/green/rowney': '/rowney-green',
    '/end/shard': '/shard-end',
    '/fields/shenley': '/shenley-fields',
    '/green/shenley': '/shenley-green',
    '/heath/short': '/short-heath',
    '/green/showell': '/showell-green',
    '/woodgate/south': '/south-woodgate',
    '/yardley/south': '/south-yardley',
    '/vale/spring': '/spring-vale',
    '/green/stockland': '/stockland-green',
    '/coldfield/sutton': '/sutton-coldfield',
    '/acres/ten': '/ten-acres',
    '/parade/the': '/the-parade',
    '/end/thimble': '/thimble-end',
    '/cross/tile': '/tile-cross',
    '/green/turves': '/turves-green'
  };

  // Check for these special patterns first
  if (specialLocationPatterns[pathname]) {
    const baseUrl = getBaseUrl(host);
    const redirectUrl = `${baseUrl}${specialLocationPatterns[pathname]}${req.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
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
    
    // Decode URL-encoded location names (handles %20, etc.)
    let decodedLocationName;
    try {
      decodedLocationName = decodeURIComponent(locationName);
    } catch (error) {
      // If decoding fails, use the original name
      decodedLocationName = locationName;
    }
    
    // Check if the decoded name matches any location in our redirect mapping
    if (locationRedirects[decodedLocationName]) {
      const locationSlug = locationRedirects[decodedLocationName];
      // Only redirect if the current path is not already the correct slug
      if (pathname !== `/${locationSlug}`) {
        const baseUrl = getBaseUrl(host);
        const redirectUrl = `${baseUrl}/${locationSlug}${req.nextUrl.search}`;
        return NextResponse.redirect(redirectUrl, 301);
      }
    }
    
    // Also check for case-insensitive matches (e.g., "beech lanes" vs "Beech Lanes")
    const decodedLocationNameLower = decodedLocationName.toLowerCase();
    const matchingLocation = Object.keys(locationRedirects).find(
      key => key.toLowerCase() === decodedLocationNameLower
    );
    
    if (matchingLocation && locationRedirects[matchingLocation]) {
      const locationSlug = locationRedirects[matchingLocation];
      // Only redirect if the current path is not already the correct slug
      if (pathname !== `/${locationSlug}`) {
        const baseUrl = getBaseUrl(host);
        const redirectUrl = `${baseUrl}/${locationSlug}${req.nextUrl.search}`;
        return NextResponse.redirect(redirectUrl, 301);
      }
    }
  }

  // Handle case-insensitive single-word location redirects (e.g., /Smithfield -> /smithfield)
  // Only for locations that are actually single words without hyphens
  const singleWordLocations = [
    'ashted', 'aston', 'billesley', 'birchfield', 'birmingham', 'boldmere', 'bordesley', 
    'bournbrook', 'bournville', 'bromford', 'california', 'catshill', 'churchfield',
    'cotteridge', 'deritend', 'dodford', 'eastside', 'edgbaston', 'erdington', 'finstall', 
    'frankley', 'greet', 'hamstead', 'handsworth', 'harborne', 'hawkesley', 'highgate', 
    'hopwood', 'lickey', 'oakenshaw', 'parkhall', 'peddimore', 'pelham', 'pheasey', 
    'queslett', 'quinton', 'rednal', 'ridgacre', 'roughley', 'rubery', 'saltley',
    'sarehole', 'sheldon', 'smithfield', 'soho', 'southside', 'sparkbrook', 'sparkhill',
    'springfield', 'stechford', 'stirchley', 'stockfield', 'streetly', 'tardebigge', 
    'theatreland', 'tyburn', 'tyseley', 'walkwood', 'webheath', 'wirehill', 'wythall', 'yardley'
  ];

  const caseInsensitivePattern = /^\/([^\/]+)\/?$/;
  const caseInsensitiveMatch = pathname.match(caseInsensitivePattern);
  if (caseInsensitiveMatch) {
    const [, locationInput] = caseInsensitiveMatch;
    const lowercaseLocation = locationInput.toLowerCase();

    // Only redirect if this is a single-word location that needs case correction
    // and doesn't contain hyphens (which are already handled above)
    if (!locationInput.includes('-') && 
        singleWordLocations.includes(lowercaseLocation) && 
        locationInput !== lowercaseLocation) {
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${lowercaseLocation}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // Handle case-insensitive location+service patterns (e.g., /Smithfield/boiler-repairs -> /smithfield/boiler-repairs)
  // Also handle URL-encoded location+service patterns (e.g., /Beech%20Lanes/boiler-repairs -> /beech-lanes/boiler-repairs)
  const caseInsensitiveServicePattern = /^\/([^\/]+)\/(.+)$/;
  const caseInsensitiveServiceMatch = pathname.match(caseInsensitiveServicePattern);
  if (caseInsensitiveServiceMatch) {
    const [, locationInput, service] = caseInsensitiveServiceMatch;
    
    // First try to decode URL-encoded location names
    let decodedLocationInput;
    try {
      decodedLocationInput = decodeURIComponent(locationInput);
    } catch (error) {
      decodedLocationInput = locationInput;
    }
    
    // Check if the decoded location matches any location in our redirect mapping
    if (locationRedirects[decodedLocationInput]) {
      const locationSlug = locationRedirects[decodedLocationInput];
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${locationSlug}/${service}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301);
    }
    
    // Also check for case-insensitive matches
    const decodedLocationInputLower = decodedLocationInput.toLowerCase();
    const matchingLocation = Object.keys(locationRedirects).find(
      key => key.toLowerCase() === decodedLocationInputLower
    );
    
    if (matchingLocation && locationRedirects[matchingLocation]) {
      const locationSlug = locationRedirects[matchingLocation];
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${locationSlug}/${service}${req.nextUrl.search}`;
      return NextResponse.redirect(redirectUrl, 301);
    }
    
    // Finally, check if this is a valid single-word location that needs case correction
    const lowercaseLocation = locationInput.toLowerCase();
    if (singleWordLocations.includes(lowercaseLocation) && locationInput !== lowercaseLocation) {
      const baseUrl = getBaseUrl(host);
      const redirectUrl = `${baseUrl}/${lowercaseLocation}/${service}${req.nextUrl.search}`;
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

  // Known page routes that should NOT be redirected
  const knownPageRoutes = [
    'blog', 'about', 'contact', 'services', 'locations', 'prices',
    'guides', 'privacy-policy', 'sitemap-viewer'
  ];

  // Complete list of valid location slugs for catch-all checking
  const validLocationSlugs = [
    'acocks-green', 'ashted', 'aston', 'aston-cross', 'aston-fields', 'astwood-bank',
    'austin-village', 'bartley-green', 'beech-lanes', 'billesley', 'birches-green',
    'birchfield', 'birmingham', 'boldmere', 'bordesley', 'bordesley-green', 'bournbrook',
    'bournville', 'brandwood-end', 'bromford', 'browns-green', 'buckland-end',
    'california', 'camp-hill', 'castle-vale', 'catshill', 'chad-valley', 'churchfield',
    'cofton-common', 'cotteridge', 'deritend', 'dodford', 'eastside', 'edgbaston',
    'erdington', 'falcon-lodge', 'finstall', 'four-oaks', 'fox-hollies', 'frankley',
    'garretts-green', 'gib-heath', 'gilbertstone', 'glebe-farm', 'gospel-oak',
    'gosta-green', 'gravelly-hill', 'great-barr', 'greet', 'grimstock-hill', 'gun-quarter',
    'hall-green', 'hamstead', 'handsworth', 'handsworth-wood', 'harborne', 'harts-green',
    'hawkesley', 'hay-mills', 'high-heath', 'highgate', 'highters-heath', 'hill-hook',
    'hill-wood', 'hodge-hill', 'hopwood', 'kings-heath', 'lickey', 'oakenshaw', 'old-oscott',
    'over-green', 'parkhall', 'peddimore', 'pelham', 'perry-barr', 'perry-beeches',
    'perry-common', 'pheasey', 'pype-hayes', 'queslett', 'quinton', 'reddicap-heath',
    'rednal', 'ridgacre', 'rotton-park', 'roughley', 'rowney-green', 'rubery', 'saltley',
    'sarehole', 'selly-oak', 'selly-park', 'shard-end', 'sheldon', 'shenley-fields',
    'shenley-green', 'short-heath', 'showell-green', 'small-heath', 'smithfield', 'soho',
    'solihull', 'south-yardley', 'south-woodgate', 'southside', 'sparkbrook', 'sparkhill',
    'spring-vale', 'springfield', 'stechford', 'stirchley', 'stockfield', 'stockland-green',
    'streetly', 'sutton-coldfield', 'tardebigge', 'ten-acres', 'the-parade',
    'theatreland', 'thimble-end', 'tile-cross', 'tower-hill', 'tudor-hill', 'turves-green',
    'tyburn', 'tyseley', 'walkwood', 'webheath', 'west-bromwich', 'west-midlands', 'wirehill', 'wolverhampton', 'wythall', 'yardley',
    'yardley-wood'
  ];

  // Catch-all redirect for unmatched slugs - only redirect if it's a potential location slug
  const pathSegment = pathname.slice(1); // Remove leading slash
  const regex = /^[a-z0-9\-]+$/; // Only lowercase for consistency

  // Only redirect if it looks like a location slug and isn't already a known page
  if (regex.test(pathSegment) && pathSegment.length > 2) {
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
