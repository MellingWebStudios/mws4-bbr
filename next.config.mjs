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
