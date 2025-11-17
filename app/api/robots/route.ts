import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block API routes and private areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Block problematic paths that were causing 404s
Disallow: /*%20*
Disallow: /*/alpha-specialists
Disallow: /*/main-specialists
Disallow: /*/glow-worm-specialists
Disallow: /*/Boiler*
Disallow: /*/Heating*
Disallow: /*/Emergency*

# Block invalid blog tag URLs
Disallow: /blog/tag/*won't*
Disallow: /blog/tag/*24/7*

# Block duplicate location patterns
Disallow: /*/birchfield
Disallow: /*/hamstead
Disallow: /*/catshill
Disallow: /*/redditch
Disallow: /*/stirchley
Disallow: /*/smethwick
Disallow: /*/edgbaston
Disallow: /*/dudley
Disallow: /*/longbridge
Disallow: /*/gilbertstone

# Sitemap location
Sitemap: https://www.birminghamboilerrepairs.uk/sitemap.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}
