// URL validation utility to prevent malformed internal links
import { slugify } from './slug';
import { locations, services } from './locations-data';

// Get all valid location slugs
const validLocationSlugs = new Set(locations.map(location => location.slug));

// Get all valid service slugs  
const validServiceSlugs = new Set(services.map(service => service.slug));

// Additional valid pages that aren't locations or services
const validPages = new Set([
  'about',
  'contact', 
  'prices',
  'services',
  'blog',
  'privacy-policy',
  'sitemap-viewer',
  'emergency'
]);

/**
 * Validates if a URL path is properly formatted
 */
export function isValidUrlPath(path: string): boolean {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Empty path (home) is valid
  if (!cleanPath) return true;
  
  const segments = cleanPath.split('/');
  
  // Single segment URLs
  if (segments.length === 1) {
    const segment = segments[0];
    return validPages.has(segment) || validLocationSlugs.has(segment);
  }
  
  // Two segment URLs (location/service)
  if (segments.length === 2) {
    const [locationSlug, serviceSlug] = segments;
    return validLocationSlugs.has(locationSlug) && validServiceSlugs.has(serviceSlug);
  }
  
  // More than 2 segments are invalid for our structure
  return false;
}

/**
 * Normalizes a URL path to canonical format
 */
export function normalizeUrlPath(path: string): string | null {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Empty path stays empty
  if (!cleanPath) return '/';
  
  const segments = cleanPath.split('/');
  
  // Handle single segment
  if (segments.length === 1) {
    const segment = segments[0];
    
    // Check if it's a valid page
    if (validPages.has(segment)) {
      return `/${segment}`;
    }
    
    // Try to find matching location by slug
    if (validLocationSlugs.has(segment)) {
      return `/${segment}`;
    }
    
    // Try to find location by name (case insensitive)
    const matchingLocation = locations.find(loc => 
      loc.name.toLowerCase() === segment.toLowerCase() ||
      slugify(loc.name) === segment.toLowerCase()
    );
    
    if (matchingLocation) {
      return `/${matchingLocation.slug}`;
    }
    
    return null; // Invalid
  }
  
  // Handle two segments (location/service)
  if (segments.length === 2) {
    const [locationSegment, serviceSegment] = segments;
    
    // Find matching location
    let matchingLocation = locations.find(loc => loc.slug === locationSegment);
    
    if (!matchingLocation) {
      // Try by name
      matchingLocation = locations.find(loc => 
        loc.name.toLowerCase() === locationSegment.toLowerCase() ||
        slugify(loc.name) === locationSegment.toLowerCase()
      );
    }
    
    if (!matchingLocation) return null;
    
    // Find matching service
    let matchingService = services.find(svc => svc.slug === serviceSegment);
    
    if (!matchingService) {
      // Try by name
      matchingService = services.find(svc => 
        svc.name.toLowerCase() === serviceSegment.toLowerCase() ||
        slugify(svc.name) === serviceSegment.toLowerCase()
      );
    }
    
    if (!matchingService) return null;
    
    return `/${matchingLocation.slug}/${matchingService.slug}`;
  }
  
  return null; // Invalid for more than 2 segments
}

/**
 * Detects if a path has duplicate segments
 */
export function hasDuplicateSegments(path: string): boolean {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (!cleanPath) return false;
  
  const segments = cleanPath.split('/');
  return segments.length !== new Set(segments).size;
}

/**
 * Removes duplicate segments from a path
 */
export function removeDuplicateSegments(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (!cleanPath) return '/';
  
  const segments = cleanPath.split('/');
  const uniqueSegments = [...new Set(segments)];
  
  return '/' + uniqueSegments.join('/');
}

/**
 * Checks if a path contains spaces or other invalid characters
 */
export function hasInvalidCharacters(path: string): boolean {
  // Allow alphanumeric, hyphens, forward slashes, and URL encoding
  const validPattern = /^[a-zA-Z0-9\-\/%]+$/;
  return !validPattern.test(path);
}

/**
 * Comprehensive URL validation and normalization
 */
export function validateAndNormalizeUrl(path: string): {
  isValid: boolean;
  normalizedPath: string | null;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Check for invalid characters
  if (hasInvalidCharacters(path)) {
    issues.push('Contains invalid characters');
  }
  
  // Check for duplicate segments
  if (hasDuplicateSegments(path)) {
    issues.push('Contains duplicate segments');
    path = removeDuplicateSegments(path);
  }
  
  // Decode URL-encoded characters
  try {
    path = decodeURIComponent(path);
  } catch (e) {
    issues.push('Invalid URL encoding');
    return { isValid: false, normalizedPath: null, issues };
  }
  
  // Normalize to canonical format
  const normalizedPath = normalizeUrlPath(path);
  
  if (!normalizedPath) {
    issues.push('Invalid URL structure');
    return { isValid: false, normalizedPath: null, issues };
  }
  
  return {
    isValid: issues.length === 0,
    normalizedPath,
    issues
  };
}
