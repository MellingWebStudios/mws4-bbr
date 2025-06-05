import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Info, Lightbulb } from 'lucide-react'
import { locations, services } from '@/lib/locations-data'

interface ContextualLink {
  text: string
  href: string
  type: 'internal' | 'service' | 'location' | 'info'
  description?: string
}

interface ContextualLinkingProps {
  content: string
  currentLocation?: string
  currentService?: string
  className?: string
}

interface InlineServiceLinkProps {
  serviceSlug: string
  location?: string
  text?: string
  showPrice?: boolean
  className?: string
}

interface InlineLocationLinkProps {
  locationSlug: string
  service?: string
  text?: string
  className?: string
}

interface ServiceCrossLinksProps {
  currentService: string
  currentLocation?: string
  variant?: 'banner' | 'sidebar' | 'inline'
  className?: string
}

// Inline Service Link Component
export function InlineServiceLink({ 
  serviceSlug, 
  location, 
  text, 
  showPrice = false,
  className = '' 
}: InlineServiceLinkProps) {
  const service = services.find(s => s.slug === serviceSlug)
  if (!service) return null

  const href = location ? `/${location}/${serviceSlug}` : `/services/${serviceSlug}`
  const linkText = text || service.name
  const price = showPrice && service.pricing?.[0]?.price ? ` (from ${service.pricing[0].price})` : ''

  return (
    <Link 
      href={href}
      className={`inline-flex items-center text-secondary hover:text-secondary/80 font-medium transition-colors underline decoration-dotted ${className}`}
      title={service.description}
    >
      {linkText}{price}
      <ExternalLink className="ml-1 h-3 w-3" />
    </Link>
  )
}

// Inline Location Link Component
export function InlineLocationLink({ 
  locationSlug, 
  service, 
  text,
  className = '' 
}: InlineLocationLinkProps) {
  const location = locations.find(l => l.slug === locationSlug)
  if (!location) return null

  const href = service ? `/${locationSlug}/${service}` : `/${locationSlug}`
  const linkText = text || location.name

  return (
    <Link 
      href={href}
      className={`inline-flex items-center text-secondary hover:text-secondary/80 font-medium transition-colors underline decoration-dotted ${className}`}
      title={location.blurb}
    >
      {linkText}
      <ExternalLink className="ml-1 h-3 w-3" />
    </Link>
  )
}

// Service Cross-Links Component
export function ServiceCrossLinks({ 
  currentService, 
  currentLocation,
  variant = 'banner',
  className = '' 
}: ServiceCrossLinksProps) {
  const service = services.find(s => s.slug === currentService)
  const otherServices = services.filter(s => s.slug !== currentService)
  
  if (!service || otherServices.length === 0) return null

  if (variant === 'sidebar') {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-secondary" />
            <h4 className="font-semibold text-sm">Related Services</h4>
          </div>
          <div className="space-y-2">
            {otherServices.slice(0, 3).map((otherService) => (
              <Link
                key={otherService.slug}
                href={currentLocation ? `/${currentLocation}/${otherService.slug}` : `/services/${otherService.slug}`}
                className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {otherService.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {otherService.pricing?.[0]?.price || 'Get quote'}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`my-4 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded ${className}`}>
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              You might also need: {' '}
            </span>
            {otherServices.slice(0, 2).map((otherService, index) => (
              <React.Fragment key={otherService.slug}>
                {index > 0 && <span className="text-gray-500"> or </span>}
                <InlineServiceLink 
                  serviceSlug={otherService.slug}
                  location={currentLocation}
                  showPrice={true}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default banner variant
  return (
    <div className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Complete Your Heating Maintenance
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Save money by combining {service.name.toLowerCase()} with our other services
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {otherServices.slice(0, 3).map((otherService) => (
            <Button
              key={otherService.slug}
              variant="outline"
              size="sm"
              asChild
              className="text-xs"
            >
              <Link href={currentLocation ? `/${currentLocation}/${otherService.slug}` : `/services/${otherService.slug}`}>
                {otherService.name}
                {otherService.pricing?.[0]?.price && (
                  <span className="ml-1 text-secondary">
                    {otherService.pricing[0].price}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Smart Content Linking Component
export function SmartContentLinks({ 
  content, 
  currentLocation, 
  currentService,
  className = '' 
}: ContextualLinkingProps) {
  // This would parse content and automatically add internal links
  // For now, we'll return a static set of suggested links based on context
  
  const suggestedLinks: ContextualLink[] = []

  // Add service-related links
  if (currentService) {
    const relatedServices = services.filter(s => s.slug !== currentService)
    relatedServices.forEach(service => {
      suggestedLinks.push({
        text: `${service.name}${currentLocation ? ` in ${currentLocation}` : ''}`,
        href: currentLocation ? `/${currentLocation}/${service.slug}` : `/services/${service.slug}`,
        type: 'service',
        description: service.description
      })
    })
  }

  // Add location-related links
  if (currentLocation) {
    const nearbyLocations = locations
      .filter(l => l.slug !== currentLocation)
      .slice(0, 3)
    
    nearbyLocations.forEach(location => {
      suggestedLinks.push({
        text: `${currentService ? services.find(s => s.slug === currentService)?.name : 'Services'} in ${location.name}`,
        href: currentService ? `/${location.slug}/${currentService}` : `/${location.slug}`,
        type: 'location',
        description: location.blurb
      })
    })
  }

  if (suggestedLinks.length === 0) return null

  return (
    <Card className={`mt-6 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-secondary" />
          <h4 className="font-semibold text-gray-900 dark:text-white">You might also be interested in</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedLinks.slice(0, 6).map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded text-sm text-gray-700 dark:text-gray-300 hover:text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title={link.description}
            >
              <ArrowRight className="h-3 w-3 text-gray-400" />
              {link.text}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Breadcrumb Enhancement Component
interface EnhancedBreadcrumbProps {
  items: Array<{
    label: string
    href: string
    isCurrent?: boolean
  }>
  showRelatedLinks?: boolean
  currentLocation?: string
  currentService?: string
  className?: string
}

export function EnhancedBreadcrumb({ 
  items, 
  showRelatedLinks = false,
  currentLocation,
  currentService,
  className = '' 
}: EnhancedBreadcrumbProps) {
  return (
    <div className={className}>
      {/* Standard breadcrumb would go here */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-400">/</span>}
            {item.isCurrent ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Related quick links */}
      {showRelatedLinks && (currentLocation || currentService) && (
        <div className="mt-2 flex flex-wrap gap-2">
          {currentService && currentLocation && (
            <>
              <Link
                href={`/${currentLocation}`}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 hover:text-secondary"
              >
                All services in {locations.find(l => l.slug === currentLocation)?.name}
              </Link>
              <Link
                href={`/services/${currentService}`}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 hover:text-secondary"
              >
                {services.find(s => s.slug === currentService)?.name} in all areas
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
