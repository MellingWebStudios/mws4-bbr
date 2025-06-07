// Safe internal link component with built-in URL validation
import React from 'react';
import Link from 'next/link';
import { validateAndNormalizeUrl } from '@/lib/url-validator';

interface SafeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // For additional props
}

/**
 * SafeLink component that validates URLs before rendering
 * Prevents 404s by ensuring all internal links are properly formatted
 */
export function SafeLink({ href, children, className, ...props }: SafeLinkProps) {
  // Skip validation for external links
  if (!href.startsWith('/') || href.startsWith('//')) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  // Validate and normalize internal URLs
  const validation = validateAndNormalizeUrl(href);
  
  // In development, log issues for debugging
  if (process.env.NODE_ENV === 'development' && validation.issues.length > 0) {
    console.warn(`SafeLink validation issues for "${href}":`, validation.issues);
    if (validation.normalizedPath && validation.normalizedPath !== href) {
      console.warn(`Consider using normalized URL: "${validation.normalizedPath}"`);
    }
  }

  // Use normalized path if available and valid, otherwise use original href
  const safeHref = validation.normalizedPath || href;

  return (
    <Link href={safeHref} className={className} {...props}>
      {children}
    </Link>
  );
}

// Helper function to build location URLs safely
export function buildLocationUrl(locationSlug: string, serviceSlug?: string): string {
  const basePath = `/${locationSlug}`;
  
  if (serviceSlug) {
    return `${basePath}/${serviceSlug}`;
  }
  
  return basePath;
}

// Helper function to build service URLs safely
export function buildServiceUrl(serviceSlug: string, locationSlug?: string): string {
  if (locationSlug) {
    return `/${locationSlug}/${serviceSlug}`;
  }
  
  return `/services/${serviceSlug}`;
}

// Enhanced internal link builder with validation
export function createInternalLink(
  type: 'location' | 'service' | 'location-service',
  params: {
    locationSlug?: string;
    serviceSlug?: string;
    locationName?: string;
    serviceName?: string;
  }
): string {
  let href = '';

  switch (type) {
    case 'location':
      if (!params.locationSlug) {
        throw new Error('locationSlug is required for location links');
      }
      href = buildLocationUrl(params.locationSlug);
      break;

    case 'service':
      if (!params.serviceSlug) {
        throw new Error('serviceSlug is required for service links');
      }
      href = buildServiceUrl(params.serviceSlug, params.locationSlug);
      break;

    case 'location-service':
      if (!params.locationSlug || !params.serviceSlug) {
        throw new Error('Both locationSlug and serviceSlug are required for location-service links');
      }
      href = buildLocationUrl(params.locationSlug, params.serviceSlug);
      break;

    default:
      throw new Error(`Unknown link type: ${type}`);
  }

  // Validate the generated URL
  const validation = validateAndNormalizeUrl(href);
  
  if (!validation.isValid) {
    console.error(`Generated invalid URL: ${href}`, validation.issues);
    // Return a safe fallback
    return '/';
  }

  return validation.normalizedPath || href;
}

export default SafeLink;
