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
      // OPTIMIZED REDIRECTS - Single hop to final destination
      // Each redirect goes directly to the final canonical URL to prevent chains
      
      // High-traffic legacy URL patterns with direct 301 redirects
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
      
      // Location-service combinations - Direct to final pages
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
      
      // Emergency service patterns - Direct to contact
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
      
      // ANTI-CHAIN REDIRECTS - Prevent middleware from creating chains
      // These handle duplicate segments directly to avoid middleware processing
      
      // Exact duplicate patterns - single hop resolution
      {
        source: '/selly-park/selly-park',
        destination: '/selly-park',
        permanent: true,
      },
      {
        source: '/hall-green/hall-green',
        destination: '/hall-green',
        permanent: true,
      },
      {
        source: '/acocks-green/acocks-green',
        destination: '/acocks-green',
        permanent: true,
      },
      {
        source: '/small-heath/small-heath',
        destination: '/small-heath',
        permanent: true,
      },
      {
        source: '/erdington/erdington',
        destination: '/erdington',
        permanent: true,
      },
      {
        source: '/handsworth/handsworth',
        destination: '/handsworth',
        permanent: true,
      },
      
      // Service duplicate patterns with direct resolution
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
      
      // Complex duplicate patterns (wildcards handled carefully)
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
      
      // Case variation redirects - Direct to lowercase canonical
      {
        source: '/Selly-Park',
        destination: '/selly-park',
        permanent: true,
      },
      {
        source: '/SELLY-PARK',
        destination: '/selly-park',
        permanent: true,
      },
      {
        source: '/Hall-Green',
        destination: '/hall-green',
        permanent: true,
      },
      {
        source: '/HALL-GREEN',
        destination: '/hall-green',
        permanent: true,
      },
      {
        source: '/Birmingham',
        destination: '/birmingham',
        permanent: true,
      },
      {
        source: '/BIRMINGHAM',
        destination: '/birmingham',
        permanent: true,
      },
      {
        source: '/Boiler-Repairs',
        destination: '/services/boiler-repairs',
        permanent: true,
      },
      {
        source: '/BOILER-REPAIRS',
        destination: '/services/boiler-repairs',
        permanent: true,
      },
      
      // Legacy CMS and admin patterns - Direct to homepage
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
      
      // Legacy page structure redirects - Single hop
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
