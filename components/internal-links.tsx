import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Wrench, Settings, Shield, Cog } from 'lucide-react'
import { locations, services } from '@/lib/locations-data'
import { slugify } from '@/lib/slug'

// Interface for internal link item
interface InternalLinkItem {
  title: string
  href: string
  description?: string
  icon?: React.ReactNode
}

// Props for different internal link sections
interface RelatedServicesProps {
  currentService?: string
  currentLocation?: string
  showDescription?: boolean
  limit?: number
  className?: string
}

interface RelatedLocationsProps {
  currentLocation?: string
  currentService?: string
  showDescription?: boolean
  limit?: number
  className?: string
}

interface NearbyAreasProps {
  currentLocation: string
  currentService?: string
  limit?: number
  className?: string
}

interface ServiceLinksProps {
  location?: string
  variant?: 'grid' | 'list' | 'compact'
  showPricing?: boolean
  className?: string
}

// Service icons mapping
const serviceIcons = {
  'boiler-repairs': <Wrench className="h-5 w-5" />,
  'boiler-servicing': <Settings className="h-5 w-5" />,
  'gas-safety': <Shield className="h-5 w-5" />,
  'ferroli-specialists': <Cog className="h-5 w-5" />
}

// Get nearby locations based on current location
function getNearbyLocations(currentLocationSlug: string, limit: number = 6) {
  const currentLocation = locations.find(loc => loc.slug === currentLocationSlug)
  if (!currentLocation) return []

  // Filter out current location and return nearby ones
  // For now, we'll just return random locations - in production you might want to implement geographical proximity
  return locations
    .filter(loc => loc.slug !== currentLocationSlug)
    .slice(0, limit)
}

// Get related services excluding current one
function getRelatedServices(currentServiceSlug?: string) {
  return services.filter(service => service.slug !== currentServiceSlug)
}

// Related Services Component
export function RelatedServices({ 
  currentService, 
  currentLocation, 
  showDescription = true, 
  limit = 3,
  className = ''
}: RelatedServicesProps) {
  const currentLocationData = currentLocation ? locations.find(l => l.slug === currentLocation) : null
  const relatedServices = getRelatedServices(currentService)
    .filter(service => service.slug !== currentService)
    .filter(service => !currentLocation || service.slug !== currentLocation) // Prevent /location/location
    .slice(0, limit)
  
  if (relatedServices.length === 0) return null

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-secondary" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Related Services{currentLocationData ? ` in ${currentLocationData.name}` : ''}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedServices.map((service) => (
          <Card key={service.slug} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-secondary">
                  {serviceIcons[service.slug as keyof typeof serviceIcons]}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    <Link 
                      href={currentLocation ? `/${currentLocation}/${service.slug}` : `/services/${service.slug}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {service.name}
                    </Link>
                  </h4>
                  {showDescription && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {service.description}
                    </p>
                  )}
                  <Link 
                    href={currentLocation ? `/${currentLocation}/${service.slug}` : `/services/${service.slug}`}
                    className="inline-flex items-center text-sm text-secondary hover:text-secondary/80 font-medium"
                  >
                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Related Locations Component
export function RelatedLocations({ 
  currentLocation, 
  currentService, 
  showDescription = false, 
  limit = 6,
  className = ''
}: RelatedLocationsProps) {
  const currentServiceData = currentService ? services.find(s => s.slug === currentService) : null
  const nearbyLocations = currentLocation 
    ? getNearbyLocations(currentLocation, limit) 
    : locations.slice(0, limit)
  
  // Only allow valid service slugs
  const validServiceSlugs = services.map(s => s.slug);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-secondary" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {currentServiceData ? `${currentServiceData.name} in Nearby Areas` : 'Areas We Cover'}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {nearbyLocations
          .filter(location => location.slug !== currentLocation && location.slug !== currentService) // Prevent /location/location
          .map((location) => {
            // Prevent /location/[invalidService]
            if (currentService && !validServiceSlugs.includes(currentService)) return null;
            return (
              <Card key={location.slug} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                    <Link 
                      href={currentService ? `/${location.slug}/${currentService}` : `/${location.slug}`}
                      className="hover:text-secondary transition-colors"
                    >
                      {location.name}
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{location.postcode}</p>
                  {showDescription && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {location.blurb}
                    </p>
                  )}
                  <Link 
                    href={currentService ? `/${location.slug}/${currentService}` : `/${location.slug}`}
                    className="inline-flex items-center text-xs text-secondary hover:text-secondary/80 font-medium"
                  >
                    View details <ArrowRight className="ml-1 h-2 w-2" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  )
}

// Utility to check for valid slugs (no spaces, all lowercase, no duplicate segments)
function isValidSlug(slug: string) {
  return slug === slug.toLowerCase() && !slug.includes(' ');
}

// Service Links Grid Component
export function ServiceLinksGrid({ 
  location, 
  variant = 'grid', 
  showPricing = false,
  className = ''
}: ServiceLinksProps) {
  const baseHref = location ? `/${location}` : '/services';
  const gridClass = variant === 'compact' 
    ? 'grid grid-cols-2 gap-3' 
    : variant === 'list' 
    ? 'space-y-3' 
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Our Services{location ? ` in ${locations.find(l => l.slug === location)?.name || location}` : ''}
      </h3>
      <div className={gridClass}>
        {services
          .filter(service => service.slug !== location)
          .filter(service => !location || service.slug !== location) // Prevent /location/location
          .filter(service => isValidSlug(service.slug) && (!location || isValidSlug(location)))
          .map((service) => (
            <Card key={service.slug} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className={variant === 'compact' ? 'p-3' : 'p-4'}>
                <div className="flex items-start gap-3">
                  <div className="text-secondary">
                    {serviceIcons[service.slug as keyof typeof serviceIcons]}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-gray-900 dark:text-white mb-2 ${variant === 'compact' ? 'text-sm' : ''}`}> 
                      <Link 
                        href={`${baseHref}/${service.slug}`}
                        className="hover:text-secondary transition-colors"
                      >
                        {service.name}
                      </Link>
                    </h4>
                    {variant !== 'compact' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {service.description}
                      </p>
                    )}
                    {showPricing && service.pricing && service.pricing.length > 0 && (
                      <p className="text-sm font-medium text-secondary mb-3">
                        From {service.pricing[0].price}
                      </p>
                    )}
                    <div className="space-y-2">
                      {variant !== 'compact' && service.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <div className="w-1 h-1 bg-secondary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link 
                      href={`${baseHref}/${service.slug}`}
                      className={`inline-flex items-center text-secondary hover:text-secondary/80 font-medium mt-3 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}
                    >
                      {variant === 'compact' ? 'Book' : 'Book now'} <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

// Contextual Links Component - for embedding within content
export function ContextualLinks({ 
  items, 
  title = "Related Information",
  className = '' 
}: { 
  items: InternalLinkItem[]
  title?: string 
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <Link 
            key={index}
            href={item.href}
            className="flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors p-2 rounded hover:bg-white dark:hover:bg-gray-700"
          >
            {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
            <span>{item.title}</span>
            <ArrowRight className="ml-auto h-3 w-3" />
          </Link>
        ))}
      </div>
    </div>
  )
}

// Footer Links Section Component
export function FooterInternalLinks({ className = '' }: { className?: string }) {
  // Filter valid services and locations
  const validServices = services.filter(service => isValidSlug(service.slug));
  const validLocations = locations.filter(location => isValidSlug(location.slug));

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${className}`}>
      {/* Services Column */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Our Services</h4>
        <ul className="space-y-2">
          {validServices.map((service) => (
            <li key={service.slug}>
              <Link 
                href={`/services/${service.slug}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Locations Column */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Areas</h4>
        <ul className="space-y-2">
          {validLocations.slice(0, 8).map((location) => (
            <li key={location.slug}>
              <Link 
                href={`/${location.slug}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
              >
                {location.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Service Areas Column */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Service Combinations</h4>
        <ul className="space-y-2">
          {validServices.slice(0, 2).map((service) => 
            validLocations.slice(0, 4).map((location) => {
              // Prevent /[location]/[location] and double-slug links
              if (service.slug === location.slug) return null;
              return (
                <li key={`${service.slug}-${location.slug}`}>
                  <Link 
                    href={`/${location.slug}/${service.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
                  >
                    {service.name} in {location.name}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Quick Links Column */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/locations"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
            >
              Areas Covered
            </Link>
          </li>
          <li>
            <Link 
              href="/services"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
            >
              All Services
            </Link>
          </li>
          <li>
            <Link 
              href="/prices"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link 
              href="/about"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-secondary transition-colors"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
