import { NextRequest, NextResponse } from 'next/server'
import { locations, services } from '@/lib/locations-data'

// This API route handles redirect suggestions for 404 pages
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  
  if (!path) {
    return NextResponse.json({ suggestions: [] })
  }

  const suggestions: Array<{ url: string; title: string; reason: string }> = []

  // Analyze the path for common patterns
  const pathSegments = path.split('/').filter(Boolean)
  
  if (pathSegments.length === 2) {
    const [locationSlug, serviceSlug] = pathSegments

    // Check if it's a known location
    const location = locations.find(loc => 
      loc.slug === locationSlug || 
      loc.name.toLowerCase().replace(/\s+/g, '-') === locationSlug
    )

    if (location) {
      // Brand specialist mappings
      const brandMappings: Record<string, string> = {
        'alpha-specialists': 'alpha-boiler-specialists',
        'main-specialists': 'main-boiler-specialists', 
        'glow-worm-specialists': 'glowworm-specialists'
      }

      if (brandMappings[serviceSlug]) {
        suggestions.push({
          url: `/${location.slug}/${brandMappings[serviceSlug]}`,
          title: `${brandMappings[serviceSlug].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} in ${location.name}`,
          reason: 'Updated brand specialist page'
        })
      }

      // Service name mappings (title case to slug)
      const serviceNameMappings: Record<string, string> = {
        'Boiler Installation': 'boiler-repairs',
        'Boiler Troubleshooting': 'boiler-repairs',
        'Boiler Servicing': 'boiler-servicing',
        'Heating System Troubleshooting': 'boiler-repairs',
        'Heating Systems': 'boiler-repairs',
        'Emergency Boiler Repair': 'boiler-repairs',
        'Boiler Noise Diagnosis': 'boiler-repairs'
      }

      if (serviceNameMappings[serviceSlug]) {
        suggestions.push({
          url: `/${location.slug}/${serviceNameMappings[serviceSlug]}`,
          title: `${serviceNameMappings[serviceSlug].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} in ${location.name}`,
          reason: 'Correct service page'
        })
      }

      // General service suggestions for this location
      if (suggestions.length === 0) {
        suggestions.push(
          {
            url: `/${location.slug}/boiler-repairs`,
            title: `Boiler Repairs in ${location.name}`,
            reason: 'Most popular service'
          },
          {
            url: `/${location.slug}/boiler-servicing`, 
            title: `Boiler Servicing in ${location.name}`,
            reason: 'Regular maintenance service'
          }
        )
      }
    }
  }

  // Single segment paths
  if (pathSegments.length === 1) {
    const segment = pathSegments[0]

    // Check if it's a location that exists
    const location = locations.find(loc => 
      loc.slug === segment || 
      loc.name.toLowerCase().replace(/\s+/g, '-') === segment
    )

    if (location) {
      suggestions.push({
        url: `/${location.slug}`,
        title: `${location.name} - Boiler Repairs`,
        reason: 'Correct location page'
      })
    }

    // Check for service pages
    const service = services.find(svc => svc.slug === segment)
    if (service) {
      suggestions.push({
        url: `/services/${service.slug}`,
        title: service.name,
        reason: 'Service overview page'
      })
    }

    // Special cases
    if (segment === 'sitemap-viewer') {
      suggestions.push({
        url: '/sitemap-viewer',
        title: 'Sitemap Viewer',
        reason: 'Page now available'
      })
    }
  }

  // Generic fallbacks if no specific suggestions
  if (suggestions.length === 0) {
    suggestions.push(
      {
        url: '/services',
        title: 'All Services',
        reason: 'Browse all available services'
      },
      {
        url: '/locations',
        title: 'All Locations',
        reason: 'Find services in your area'
      },
      {
        url: '/contact',
        title: 'Contact Us',
        reason: 'Get direct help'
      }
    )
  }

  return NextResponse.json({ suggestions })
}
