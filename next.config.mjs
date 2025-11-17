import createBundleAnalyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import remarkHtml from 'remark-html';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    serverActions: {},
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  
  async redirects() {
    return [
      // CANONICAL URL ENFORCEMENT - Must come first to catch all variations
      
      // Force www subdomain - handles both http and https
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'birminghamboilerrepairs.uk'
          }
        ],
        destination: 'https://www.birminghamboilerrepairs.uk/:path*',
        permanent: true,
      },
      
      // Force lowercase location slugs - catches capitalized location names
      {
        source: '/:location([A-Z][a-zA-Z-]*[a-z])/:service*',
        destination: '/:location/:service*',
        permanent: true,
      },
      
      // Specific capitalized location patterns from Search Console data
      {
        source: '/Highgate/:service*',
        destination: '/highgate/:service*',
        permanent: true,
      },
      {
        source: '/California/:service*',
        destination: '/california/:service*',
        permanent: true,
      },
      {
        source: '/Ridgacre/:service*',
        destination: '/ridgacre/:service*',
        permanent: true,
      },
      {
        source: '/Soho/:service*',
        destination: '/soho/:service*',
        permanent: true,
      },
      {
        source: '/Greet/:service*',
        destination: '/greet/:service*',
        permanent: true,
      },
      {
        source: '/Peddimore/:service*',
        destination: '/peddimore/:service*',
        permanent: true,
      },
      {
        source: '/Smithfield/:service*',
        destination: '/smithfield/:service*',
        permanent: true,
      },
      {
        source: '/Hamstead/:service*',
        destination: '/hamstead/:service*',
        permanent: true,
      },
      {
        source: '/Billesley/:service*',
        destination: '/billesley/:service*',
        permanent: true,
      },
      {
        source: '/Hopwood/:service*',
        destination: '/hopwood/:service*',
        permanent: true,
      },
      {
        source: '/Aston/:service*',
        destination: '/aston/:service*',
        permanent: true,
      },
      {
        source: '/Gilbertstone/:service*',
        destination: '/gilbertstone/:service*',
        permanent: true,
      },
      {
        source: '/Eastside/:service*',
        destination: '/eastside/:service*',
        permanent: true,
      },
      {
        source: '/Pheasey/:service*',
        destination: '/pheasey/:service*',
        permanent: true,
      },
      {
        source: '/Quinton/:service*',
        destination: '/quinton/:service*',
        permanent: true,
      },
      {
        source: '/Bournbrook/:service*',
        destination: '/bournbrook/:service*',
        permanent: true,
      },
      {
        source: '/Edgbaston/:service*',
        destination: '/edgbaston/:service*',
        permanent: true,
      },
      {
        source: '/Catshill/:service*',
        destination: '/catshill/:service*',
        permanent: true,
      },
      {
        source: '/Bordesley/:service*',
        destination: '/bordesley/:service*',
        permanent: true,
      },
      {
        source: '/Sparkhill/:service*',
        destination: '/sparkhill/:service*',
        permanent: true,
      },
      {
        source: '/Redditch/:service*',
        destination: '/redditch/:service*',
        permanent: true,
      },
      {
        source: '/Frankley/:service*',
        destination: '/frankley/:service*',
        permanent: true,
      },
      {
        source: '/Rednal/:service*',
        destination: '/rednal/:service*',
        permanent: true,
      },
      {
        source: '/Erdington/:service*',
        destination: '/erdington/:service*',
        permanent: true,
      },
      {
        source: '/Stirchley/:service*',
        destination: '/stirchley/:service*',
        permanent: true,
      },
      {
        source: '/Parkhall/:service*',
        destination: '/parkhall/:service*',
        permanent: true,
      },
      {
        source: '/Bournville/:service*',
        destination: '/bournville/:service*',
        permanent: true,
      },
      {
        source: '/Birchfield/:service*',
        destination: '/birchfield/:service*',
        permanent: true,
      },
      {
        source: '/Pelham/:service*',
        destination: '/pelham/:service*',
        permanent: true,
      },
      {
        source: '/Lickey/:service*',
        destination: '/lickey/:service*',
        permanent: true,
      },
      {
        source: '/Birmingham/:service*',
        destination: '/birmingham/:service*',
        permanent: true,
      },
      {
        source: '/Roughley/:service*',
        destination: '/roughley/:service*',
        permanent: true,
      },
      {
        source: '/Stechford/:service*',
        destination: '/stechford/:service*',
        permanent: true,
      },
      {
        source: '/Tyburn/:service*',
        destination: '/tyburn/:service*',
        permanent: true,
      },
      {
        source: '/Deritend/:service*',
        destination: '/deritend/:service*',
        permanent: true,
      },
      {
        source: '/Tardebigge/:service*',
        destination: '/tardebigge/:service*',
        permanent: true,
      },
      {
        source: '/Oakenshaw/:service*',
        destination: '/oakenshaw/:service*',
        permanent: true,
      },
      {
        source: '/Northfield/:service*',
        destination: '/northfield/:service*',
        permanent: true,
      },
      {
        source: '/Smethwick/:service*',
        destination: '/smethwick/:service*',
        permanent: true,
      },
      {
        source: '/Dudley/:service*',
        destination: '/dudley/:service*',
        permanent: true,
      },
      
      // Handle space-separated location names (from 404 analysis)
      {
        source: '/Camp Hill/:service*',
        destination: '/camp-hill/:service*',
        permanent: true,
      },
      {
        source: '/Gravelly Hill/:service*',
        destination: '/gravelly-hill/:service*',
        permanent: true,
      },
      {
        source: '/Weoley Castle/:service*',
        destination: '/weoley-castle/:service*',
        permanent: true,
      },
      {
        source: '/Thimble End/:service*',
        destination: '/thimble-end/:service*',
        permanent: true,
      },
      {
        source: '/Gib Heath/:service*',
        destination: '/gib-heath/:service*',
        permanent: true,
      },
      {
        source: '/Garretts Green/:service*',
        destination: '/garretts-green/:service*',
        permanent: true,
      },
      {
        source: '/Shard End/:service*',
        destination: '/shard-end/:service*',
        permanent: true,
      },
      {
        source: '/Small Heath/:service*',
        destination: '/small-heath/:service*',
        permanent: true,
      },
      {
        source: '/Buckland End/:service*',
        destination: '/buckland-end/:service*',
        permanent: true,
      },
      {
        source: '/Highters Heath/:service*',
        destination: '/highters-heath/:service*',
        permanent: true,
      },
      {
        source: '/Aston Cross/:service*',
        destination: '/aston-cross/:service*',
        permanent: true,
      },
      {
        source: '/Great Barr/:service*',
        destination: '/great-barr/:service*',
        permanent: true,
      },
      {
        source: '/Gospel Oak/:service*',
        destination: '/gospel-oak/:service*',
        permanent: true,
      },
      {
        source: '/Birches Green/:service*',
        destination: '/birches-green/:service*',
        permanent: true,
      },
      {
        source: '/High Heath/:service*',
        destination: '/high-heath/:service*',
        permanent: true,
      },
      {
        source: '/Gosta Green/:service*',
        destination: '/gosta-green/:service*',
        permanent: true,
      },
      {
        source: '/Gun Quarter/:service*',
        destination: '/gun-quarter/:service*',
        permanent: true,
      },
      {
        source: '/Old Oscott/:service*',
        destination: '/old-oscott/:service*',
        permanent: true,
      },
      {
        source: '/Harts Green/:service*',
        destination: '/harts-green/:service*',
        permanent: true,
      },
      {
        source: '/Austin Village/:service*',
        destination: '/austin-village/:service*',
        permanent: true,
      },
      {
        source: '/Ten Acres/:service*',
        destination: '/ten-acres/:service*',
        permanent: true,
      },
      {
        source: '/Brandwood End/:service*',
        destination: '/brandwood-end/:service*',
        permanent: true,
      },
      {
        source: '/Hill Wood/:service*',
        destination: '/hill-wood/:service*',
        permanent: true,
      },
      {
        source: '/Astwood Bank/:service*',
        destination: '/astwood-bank/:service*',
        permanent: true,
      },
      {
        source: '/Bordesley Green/:service*',
        destination: '/bordesley-green/:service*',
        permanent: true,
      },
      {
        source: '/Reddicap Heath/:service*',
        destination: '/reddicap-heath/:service*',
        permanent: true,
      },
      {
        source: '/Hay Mills/:service*',
        destination: '/hay-mills/:service*',
        permanent: true,
      },
      {
        source: '/Bartley Green/:service*',
        destination: '/bartley-green/:service*',
        permanent: true,
      },
      {
        source: '/Rowley Regis/:service*',
        destination: '/rowley-regis/:service*',
        permanent: true,
      },
      {
        source: '/Tile Cross/:service*',
        destination: '/tile-cross/:service*',
        permanent: true,
      },
      {
        source: '/Perry Beeches/:service*',
        destination: '/perry-beeches/:service*',
        permanent: true,
      },
      {
        source: '/Kings Norton/:service*',
        destination: '/kings-norton/:service*',
        permanent: true,
      },
      {
        source: '/Hall Green/:service*',
        destination: '/hall-green/:service*',
        permanent: true,
      },
      {
        source: '/Chad Valley/:service*',
        destination: '/chad-valley/:service*',
        permanent: true,
      },
      {
        source: '/Yardley Wood/:service*',
        destination: '/yardley-wood/:service*',
        permanent: true,
      },
      {
        source: '/Stockland Green/:service*',
        destination: '/stockland-green/:service*',
        permanent: true,
      },
      {
        source: '/Kings Heath/:service*',
        destination: '/kings-heath/:service*',
        permanent: true,
      },
      {
        source: '/West Heath/:service*',
        destination: '/west-heath/:service*',
        permanent: true,
      },
      {
        source: '/Over Green/:service*',
        destination: '/over-green/:service*',
        permanent: true,
      },
      
      // Handle duplicate location patterns (location/location)
      {
        source: '/birchfield/birchfield',
        destination: '/birchfield',
        permanent: true,
      },
      {
        source: '/hamstead/hamstead', 
        destination: '/hamstead',
        permanent: true,
      },
      {
        source: '/catshill/catshill',
        destination: '/catshill',
        permanent: true,
      },
      {
        source: '/redditch/redditch',
        destination: '/redditch',
        permanent: true,
      },
      {
        source: '/stirchley/stirchley',
        destination: '/stirchley',
        permanent: true,
      },
      {
        source: '/smethwick/smethwick',
        destination: '/smethwick',
        permanent: true,
      },
      {
        source: '/edgbaston/edgbaston',
        destination: '/edgbaston',
        permanent: true,
      },
      {
        source: '/dudley/dudley',
        destination: '/dudley',
        permanent: true,
      },
      {
        source: '/longbridge/longbridge',
        destination: '/longbridge',
        permanent: true,
      },
      {
        source: '/gilbertstone/gilbertstone',
        destination: '/gilbertstone',
        permanent: true,
      },
      
      // Handle invalid specialist services - redirect to valid services
      {
        source: '/:location/alpha-specialists',
        destination: '/:location/ferroli-specialists',
        permanent: true,
      },
      {
        source: '/:location/main-specialists',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      {
        source: '/:location/glow-worm-specialists',
        destination: '/:location/ferroli-specialists',
        permanent: true,
      },
      
      // Handle invalid service names with spaces
      {
        source: '/:location/Boiler Installation',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      {
        source: '/:location/Boiler Servicing',
        destination: '/:location/boiler-servicing',
        permanent: true,
      },
      {
        source: '/:location/Boiler Troubleshooting',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      {
        source: '/:location/Heating Systems',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      {
        source: '/:location/Heating System Troubleshooting',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      {
        source: '/:location/Emergency Boiler Repair',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      {
        source: '/:location/Boiler Noise Diagnosis',
        destination: '/:location/boiler-repairs',
        permanent: true,
      },
      
      // Block problematic paths that shouldn't be indexed
      {
        source: '/moseley',
        destination: '/locations',
        permanent: true,
      },
      {
        source: '/kingswinford',
        destination: '/locations',
        permanent: true,
      },
      
      // High-traffic legacy URL patterns with 301 redirects
      {
        source: '/boiler-repairs-birmingham',
        destination: '/birmingham/boiler-repairs',
        permanent: true,
      },
      {
        source: '/boiler-servicing-birmingham', 
        destination: '/birmingham/boiler-servicing',
        permanent: true,
      },
      {
        source: '/gas-safety-birmingham',
        destination: '/birmingham/gas-safety',
        permanent: true,
      },
      
      // Location-service combinations that may have been indexed
      {
        source: '/selly-park-boiler-repairs',
        destination: '/selly-park/boiler-repairs',
        permanent: true,
      },
      {
        source: '/hall-green-boiler-repairs',
        destination: '/hall-green/boiler-repairs',
        permanent: true,
      },
      {
        source: '/acocks-green-boiler-repairs',
        destination: '/acocks-green/boiler-repairs',
        permanent: true,
      },
      {
        source: '/small-heath-boiler-repairs',
        destination: '/small-heath/boiler-repairs',
        permanent: true,
      },
      {
        source: '/erdington-boiler-repairs',
        destination: '/erdington/boiler-repairs',
        permanent: true,
      },
      {
        source: '/handsworth-boiler-repairs',
        destination: '/handsworth/boiler-repairs',
        permanent: true,
      },
      
      // Common service patterns
      {
        source: '/emergency-boiler-repair',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/24-hour-boiler-repair',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/gas-engineer',
        destination: '/services/gas-safety',
        permanent: true,
      },
      {
        source: '/heating-engineer',
        destination: '/services/boiler-repairs',
        permanent: true,
      },
      
      // Legacy page structures
      {
        source: '/pages/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/site/:path*',
        destination: '/:path*',
        permanent: true,
      },
      
      // Common CMS patterns that might exist
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/admin/:path*',
        destination: '/',
        permanent: true,
      },
      
      // Duplicate slug patterns - catch variations like /location/location
      {
        source: '/selly-park/selly-park/:path*',
        destination: '/selly-park/:path*',
        permanent: true,
      },
      {
        source: '/hall-green/hall-green/:path*',
        destination: '/hall-green/:path*',
        permanent: true,
      },
      {
        source: '/acocks-green/acocks-green/:path*',
        destination: '/acocks-green/:path*',
        permanent: true,
      },
      {
        source: '/birmingham/birmingham/:path*',
        destination: '/birmingham/:path*',
        permanent: true,
      },
      
      // Service duplicates
      {
        source: '/services/boiler-repairs/boiler-repairs',
        destination: '/services/boiler-repairs',
        permanent: true,
      },
      {
        source: '/services/boiler-servicing/boiler-servicing',
        destination: '/services/boiler-servicing',
        permanent: true,
      },
      {
        source: '/services/gas-safety/gas-safety',
        destination: '/services/gas-safety',
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkHtml],
    rehypePlugins: [],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));
