
// Canonical URL enforcement redirects for Next.js
// Add these to your next.config.mjs redirects array

// Force lowercase location slugs
{
  source: '/:location((?:[A-Z][a-z-]*)+)/:path*',
  destination: '/:location/:path*',
  permanent: true,
  has: [
    {
      type: 'host',
      value: 'www.birminghamboilerrepairs.uk'
    }
  ],
  beforeFiles: true
},

// Force www subdomain
{
  source: '/:path*',
  has: [
    {
      type: 'host',
      value: 'birminghamboilerrepairs.uk'
    }
  ],
  destination: 'https://www.birminghamboilerrepairs.uk/:path*',
  permanent: true
}
