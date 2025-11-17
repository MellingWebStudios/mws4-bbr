const { locations, services } = require('./locations-data')

// Priority locations based on size/importance (main Birmingham areas)
const PRIORITY_LOCATIONS = [
  'birmingham-city-centre',
  'edgbaston',
  'selly-oak',
  'kings-heath',
  'moseley',
  'handsworth',
  'erdington',
  'small-heath',
  'sparkhill',
  'acocks-green',
  'shard-end',
  'aston',
  'lozells',
  'newtown',
  'nechells',
  'bordesley-green',
  'alum-rock',
  'saltley',
  'washwood-heath',
  'ward-end',
  'hodge-hill',
  'stechford',
  'yardley',
  'tyseley',
  'hay-mills',
  'olton',
  'sheldon'
];

// Main services that should be indexed for all locations
const MAIN_SERVICES = [
  'boiler-repairs',
  'boiler-servicing', 
  'gas-safety',
  'combination-boiler-repairs',
  'combination-boiler-services'
];

// Specialist services (should only be indexed for priority locations)
const SPECIALIST_SERVICES = [
  'ferroli-specialists',
  'worcester-bosch-specialists',
  'vaillant-specialists',
  'ideal-boilers-specialists',
  'baxi-specialists',
  'alpha-boiler-specialists',
  'main-boiler-specialists',
  'vokera-specialists',
  'viessmann-specialists',
  'intergas-specialists',
  'glowworm-specialists',
  'atag-specialists',
  'biasi-specialists',
  'potterton-specialists',
  'ariston-specialists',
  'heatline-specialists'
];

/**
 * Determine if a location+service combination should be indexed
 */
function shouldIndexPage(locationSlug, serviceSlug) {
  const isMainService = MAIN_SERVICES.includes(serviceSlug);
  const isPriorityLocation = PRIORITY_LOCATIONS.includes(locationSlug);
  const isSpecialistService = SPECIALIST_SERVICES.includes(serviceSlug);

  // Always index main services for all locations
  if (isMainService) {
    return true;
  }

  // Only index specialist services for priority locations
  if (isSpecialistService && isPriorityLocation) {
    return true;
  }

  // Don't index specialist services for non-priority locations
  return false;
}

/**
 * Get the robots meta tag for a page
 */
export function getRobotsMetaTag(locationSlug: string, serviceSlug: string): string {
  const shouldIndex = shouldIndexPage(locationSlug, serviceSlug);
  return shouldIndex ? 'index, follow' : 'noindex, follow';
}

/**
 * Check if a page should be included in the sitemap
 */
export function shouldIncludeInSitemap(locationSlug: string, serviceSlug: string): boolean {
  return shouldIndexPage(locationSlug, serviceSlug);
}

/**
 * Calculate the total number of pages that should be indexed
 */
export function getIndexablePageCount(): number {
  let count = 0;
  
  // Count main services for all locations (152 × 5 = 760)
  count += locations.length * MAIN_SERVICES.length;
  
  // Count specialist services for priority locations only (27 × 16 = 432)
  count += PRIORITY_LOCATIONS.length * SPECIALIST_SERVICES.length;
  
  return count;
}

/**
 * Get indexing strategy summary
 */
export function getIndexingStrategy() {
  const totalPossiblePages = locations.length * services.length;
  const indexablePages = getIndexablePageCount();
  const blockedPages = totalPossiblePages - indexablePages;
  
  return {
    totalPossiblePages,
    indexablePages,
    blockedPages,
    strategy: {
      mainServices: {
        count: MAIN_SERVICES.length,
        locations: locations.length,
        pages: locations.length * MAIN_SERVICES.length
      },
      specialistServices: {
        count: SPECIALIST_SERVICES.length,
        priorityLocations: PRIORITY_LOCATIONS.length,
        pages: PRIORITY_LOCATIONS.length * SPECIALIST_SERVICES.length
      }
    }
  };
}

// console.log('Indexing Strategy Summary:', getIndexingStrategy());
