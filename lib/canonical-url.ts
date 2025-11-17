/**
 * Utility functions for generating canonical URLs
 * Ensures consistent URL formatting across the site
 */

/**
 * Generates a canonical URL with proper formatting
 * - Always uses HTTPS
 * - Always includes www
 * - Always uses lowercase paths
 * - Removes trailing slashes except for root
 */
export function generateCanonicalUrl(path: string = ""): string {
  const baseUrl = "https://www.birminghamboilerrepairs.uk";
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // Convert to lowercase for consistency
  const lowercasePath = normalizedPath.toLowerCase();
  
  // Remove trailing slash unless it's the root path
  const cleanPath = lowercasePath === "/" ? "/" : lowercasePath.replace(/\/$/, "");
  
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generates a canonical URL for location pages
 */
export function generateLocationCanonicalUrl(locationSlug: string): string {
  return generateCanonicalUrl(`/${locationSlug.toLowerCase()}`);
}

/**
 * Generates a canonical URL for location service pages
 */
export function generateLocationServiceCanonicalUrl(locationSlug: string, serviceSlug: string): string {
  return generateCanonicalUrl(`/${locationSlug.toLowerCase()}/${serviceSlug.toLowerCase()}`);
}

/**
 * Validates if a URL matches the canonical format
 */
export function isCanonicalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Check protocol
    if (urlObj.protocol !== "https:") return false;
    
    // Check hostname
    if (urlObj.hostname !== "www.birminghamboilerrepairs.uk") return false;
    
    // Check if path is lowercase
    if (urlObj.pathname !== urlObj.pathname.toLowerCase()) return false;
    
    // Check trailing slash (should not have unless root)
    if (urlObj.pathname !== "/" && urlObj.pathname.endsWith("/")) return false;
    
    return true;
  } catch {
    return false;
  }
}
