import { locations, services } from '@/lib/locations-data'

// Types for internal linking
export interface InternalLinkSuggestion {
  text: string
  href: string
  type: 'service' | 'location' | 'service-location' | 'general'
  priority: number
  description?: string
  anchor?: string
}

export interface LinkingContext {
  currentLocation?: string
  currentService?: string
  pageType: 'home' | 'service' | 'location' | 'service-location' | 'general'
  content?: string
}

// Get geographical proximity score (simplified - in production use actual coordinates)
function getProximityScore(location1: string, location2: string): number {
  // For now, return a random score between 0.5-1.0
  // In production, this would calculate actual distance
  return 0.5 + Math.random() * 0.5
}

// Get service compatibility score
function getServiceCompatibilityScore(service1: string, service2: string): number {
  const compatibilityMap: { [key: string]: { [key: string]: number } } = {
    'boiler-repairs': {
      'boiler-servicing': 0.9,
      'gas-safety': 0.7,
      'ferroli-specialists': 0.6
    },
    'boiler-servicing': {
      'boiler-repairs': 0.8,
      'gas-safety': 0.9,
      'ferroli-specialists': 0.6
    },
    'gas-safety': {
      'boiler-repairs': 0.7,
      'boiler-servicing': 0.9,
      'ferroli-specialists': 0.5
    },
    'ferroli-specialists': {
      'boiler-repairs': 0.8,
      'boiler-servicing': 0.7,
      'gas-safety': 0.5
    }
  }

  return compatibilityMap[service1]?.[service2] || 0.3
}

// Generate internal link suggestions
export function generateInternalLinks(context: LinkingContext): InternalLinkSuggestion[] {
  const suggestions: InternalLinkSuggestion[] = []
  
  // 1. Related Services in Same Location
  if (context.currentService && context.currentLocation) {
    const currentLocationData = locations.find(l => l.slug === context.currentLocation)
    const otherServices = services.filter(s => s.slug !== context.currentService)
    
    otherServices.forEach(service => {
      const compatibilityScore = getServiceCompatibilityScore(context.currentService!, service.slug)
      suggestions.push({
        text: `${service.name} in ${currentLocationData?.name}`,
        href: `/${context.currentLocation}/${service.slug}`,
        type: 'service-location',
        priority: compatibilityScore * 10,
        description: service.description
      })
    })
  }

  // 2. Same Service in Nearby Locations
  if (context.currentService && context.currentLocation) {
    const nearbyLocations = locations
      .filter(l => l.slug !== context.currentLocation)
      .map(location => ({
        location,
        proximityScore: getProximityScore(context.currentLocation!, location.slug)
      }))
      .sort((a, b) => b.proximityScore - a.proximityScore)
      .slice(0, 6)

    const currentServiceData = services.find(s => s.slug === context.currentService)
    
    nearbyLocations.forEach(({ location, proximityScore }) => {
      suggestions.push({
        text: `${currentServiceData?.name} in ${location.name}`,
        href: `/${location.slug}/${context.currentService}`,
        type: 'service-location',
        priority: proximityScore * 8,
        description: `${currentServiceData?.description} Available in ${location.name} ${location.postcode}`
      })
    })
  }

  // 3. Service Overview Pages
  if (context.currentService) {
    const currentServiceData = services.find(s => s.slug === context.currentService)
    suggestions.push({
      text: `${currentServiceData?.name} - All Areas`,
      href: `/services/${context.currentService}`,
      type: 'service',
      priority: 7,
      description: `Learn more about our ${currentServiceData?.name.toLowerCase()} service`
    })

    // Service-specific landing pages for locations
    if (context.currentLocation) {
      suggestions.push({
        text: `${currentServiceData?.name} Service Areas`,
        href: `/locations/${context.currentService}`,
        type: 'service',
        priority: 6,
        description: `All areas where we provide ${currentServiceData?.name.toLowerCase()}`
      })
    }
  }

  // 4. Location Overview Pages
  if (context.currentLocation) {
    const currentLocationData = locations.find(l => l.slug === context.currentLocation)
    suggestions.push({
      text: `All Services in ${currentLocationData?.name}`,
      href: `/${context.currentLocation}`,
      type: 'location',
      priority: 7,
      description: `Complete list of heating services available in ${currentLocationData?.name}`
    })
  }

  // 5. General High-Value Pages
  suggestions.push(
    {
      text: 'Areas We Cover',
      href: '/locations',
      type: 'general',
      priority: 5,
      description: 'Complete list of all locations we serve across Birmingham'
    },
    {
      text: 'Service Pricing',
      href: '/prices',
      type: 'general',
      priority: 6,
      description: 'Transparent pricing for all our heating services'
    },
    {
      text: 'About Our Engineers',
      href: '/about',
      type: 'general',
      priority: 4,
      description: 'Meet our Gas Safe registered team'
    }
  )

  // 6. Context-Specific Content Links
  if (context.content) {
    // Generate content-based suggestions
    const contentSuggestions = generateContentBasedLinks(context.content, context)
    suggestions.push(...contentSuggestions)
  }

  // Sort by priority and return
  return suggestions
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 12) // Limit to top 12 suggestions
}

// Generate links based on content analysis
function generateContentBasedLinks(content: string, context: LinkingContext): InternalLinkSuggestion[] {
  const suggestions: InternalLinkSuggestion[] = []
  const contentLower = content.toLowerCase()

  // Service mentions
  services.forEach(service => {
    const serviceVariations = [
      service.name.toLowerCase(),
      service.slug.replace('-', ' '),
      service.description.toLowerCase()
    ]

    const mentioned = serviceVariations.some(variation => 
      contentLower.includes(variation)
    )

    if (mentioned && service.slug !== context.currentService) {
      const href = context.currentLocation 
        ? `/${context.currentLocation}/${service.slug}`
        : `/services/${service.slug}`
      
      suggestions.push({
        text: service.name,
        href,
        type: context.currentLocation ? 'service-location' : 'service',
        priority: 8,
        description: service.description,
        anchor: service.name.toLowerCase().replace(/\s+/g, '-')
      })
    }
  })

  // Location mentions
  locations.forEach(location => {
    const locationVariations = [
      location.name.toLowerCase(),
      location.postcode.toLowerCase(),
      ...location.landmarks.map(l => l.toLowerCase())
    ]

    const mentioned = locationVariations.some(variation => 
      contentLower.includes(variation)
    )

    if (mentioned && location.slug !== context.currentLocation) {
      const href = context.currentService 
        ? `/${location.slug}/${context.currentService}`
        : `/${location.slug}`
      
      suggestions.push({
        text: location.name,
        href,
        type: context.currentService ? 'service-location' : 'location',
        priority: 7,
        description: location.blurb,
        anchor: location.name.toLowerCase().replace(/\s+/g, '-')
      })
    }
  })

  // Emergency/urgent keywords
  const urgentKeywords = ['emergency', 'urgent', 'same day', 'weekend', 'breakdown']
  const hasUrgentContent = urgentKeywords.some(keyword => contentLower.includes(keyword))
  
  if (hasUrgentContent) {
    suggestions.push({
      text: 'Emergency Repair Services',
      href: context.currentLocation ? `/${context.currentLocation}/boiler-repairs` : '/services/boiler-repairs',
      type: 'service-location',
      priority: 9,
      description: 'Same-day emergency boiler repairs'
    })
  }

  // Safety keywords
  const safetyKeywords = ['safety', 'gas safe', 'carbon monoxide', 'inspection']
  const hasSafetyContent = safetyKeywords.some(keyword => contentLower.includes(keyword))
  
  if (hasSafetyContent) {
    suggestions.push({
      text: 'Gas Safety Inspections',
      href: context.currentLocation ? `/${context.currentLocation}/gas-safety` : '/services/gas-safety',
      type: 'service-location',
      priority: 8,
      description: 'Annual gas safety checks for homeowners and landlords'
    })
  }

  return suggestions
}

// Generate smart anchor links for content
export function generateAnchorLinks(content: string): Array<{ text: string; anchor: string }> {
  const anchors: Array<{ text: string; anchor: string }> = []
  
  // Find headings in content (simplified - would need proper HTML parsing in production)
  const headingMatches = content.match(/<h[2-6][^>]*>([^<]+)<\/h[2-6]>/gi)
  
  if (headingMatches) {
    headingMatches.forEach(match => {
      const text = match.replace(/<[^>]*>/g, '').trim()
      const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      anchors.push({ text, anchor })
    })
  }

  return anchors
}

// Generate footer link structure
export function generateFooterLinks() {
  return {
    services: services.map(service => ({
      text: service.name,
      href: `/services/${service.slug}`,
      description: service.description
    })),
    popularLocations: locations.slice(0, 12).map(location => ({
      text: location.name,
      href: `/${location.slug}`,
      description: location.blurb
    })),
    serviceAreas: services.slice(0, 2).flatMap(service =>
      locations.slice(0, 6).map(location => ({
        text: `${service.name} in ${location.name}`,
        href: `/${location.slug}/${service.slug}`,
        description: `${service.description} in ${location.name}`
      }))
    ),
    quickLinks: [
      { text: 'All Services', href: '/services', description: 'Complete service overview' },
      { text: 'Areas Covered', href: '/locations', description: 'All coverage areas' },
      { text: 'Pricing', href: '/prices', description: 'Transparent pricing' },
      { text: 'About Us', href: '/about', description: 'Our team and expertise' },
      { text: 'Contact', href: '/contact', description: 'Get in touch' }
    ]
  }
}

// Utility to get related content suggestions
export function getRelatedContentSuggestions(
  currentLocation?: string,
  currentService?: string,
  limit: number = 6
): InternalLinkSuggestion[] {
  const context: LinkingContext = {
    currentLocation,
    currentService,
    pageType: currentLocation && currentService ? 'service-location' : 
              currentService ? 'service' : 
              currentLocation ? 'location' : 'general'
  }

  return generateInternalLinks(context).slice(0, limit)
}

// Generate sitemap-style link structure
export function generateSitemapLinks() {
  const links: Array<{ url: string; priority: number; lastmod: string }> = []
  const today = new Date().toISOString().split('T')[0]

  // Service pages
  services.forEach(service => {
    links.push({
      url: `/services/${service.slug}`,
      priority: 0.8,
      lastmod: today
    })
  })

  // Location pages
  locations.forEach(location => {
    links.push({
      url: `/${location.slug}`,
      priority: 0.7,
      lastmod: today
    })
  })

  // Service-location combinations
  locations.forEach(location => {
    services.forEach(service => {
      links.push({
        url: `/${location.slug}/${service.slug}`,
        priority: 0.8,
        lastmod: today
      })
    })
  })

  return links.sort((a, b) => b.priority - a.priority)
}
