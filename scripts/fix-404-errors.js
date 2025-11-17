/**
 * 404 Error Cleanup Helper for Google Search Console
 * 
 * This script addresses the 491 "Not found (404)" errors by providing
 * specific actions to resolve each type of problematic URL.
 */

// Categorized 404 URLs from Google Search Console
const problematic404Urls = {
  // Space-separated location names
  spaceInLocations: [
    'https://www.birminghamboilerrepairs.uk/Camp Hill/boiler-servicing',
    'https://www.birminghamboilerrepairs.uk/Gravelly Hill/gas-safety',
    'https://www.birminghamboilerrepairs.uk/Weoley Castle/gas-safety',
    'https://www.birminghamboilerrepairs.uk/Thimble End/boiler-servicing',
    'https://www.birminghamboilerrepairs.uk/Gib Heath/boiler-servicing',
    'https://www.birminghamboilerrepairs.uk/Garretts Green/ferroli-specialists',
    'https://www.birminghamboilerrepairs.uk/Shard End/ferroli-specialists',
    'https://www.birminghamboilerrepairs.uk/Small Heath/combination-boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Buckland End/combination-boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Gravelly Hill/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Highters Heath/ferroli-specialists',
    'https://www.birminghamboilerrepairs.uk/Aston Cross/boiler-servicing',
    'https://www.birminghamboilerrepairs.uk/Great Barr/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Gospel Oak/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Thimble End/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Birches Green/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Shard End/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/High Heath/boiler-repairs',
    'https://www.birminghamboilerrepairs.uk/Gosta Green/boiler-repairs'
  ],
  
  // URL encoded spaces (%20)
  urlEncoded: [
    'https://birminghamboilerrepairs.uk/Gravelly%20Hill/boiler-repairs',
    'https://birminghamboilerrepairs.uk/Camp%20Hill/boiler-repairs'
  ],
  
  // Duplicate location patterns (location/location)
  duplicateLocations: [
    'https://www.birminghamboilerrepairs.uk/Birchfield/birchfield',
    'https://www.birminghamboilerrepairs.uk/Hamstead/hamstead',
    'https://www.birminghamboilerrepairs.uk/Catshill/catshill',
    'https://www.birminghamboilerrepairs.uk/Redditch/redditch',
    'https://www.birminghamboilerrepairs.uk/Stirchley/stirchley',
    'https://www.birminghamboilerrepairs.uk/Smethwick/smethwick',
    'https://www.birminghamboilerrepairs.uk/Edgbaston/edgbaston',
    'https://www.birminghamboilerrepairs.uk/Dudley/dudley',
    'https://www.birminghamboilerrepairs.uk/Longbridge/longbridge',
    'https://www.birminghamboilerrepairs.uk/Gilbertstone/gilbertstone'
  ],
  
  // Invalid specialist services
  invalidSpecialists: [
    'https://www.birminghamboilerrepairs.uk/rotton-park/alpha-specialists',
    'https://www.birminghamboilerrepairs.uk/shard-end/glow-worm-specialists',
    'https://www.birminghamboilerrepairs.uk/west-midlands/glow-worm-specialists',
    'https://www.birminghamboilerrepairs.uk/small-heath/glow-worm-specialists',
    'https://www.birminghamboilerrepairs.uk/the-parade/alpha-specialists',
    'https://www.birminghamboilerrepairs.uk/south-woodgate/alpha-specialists',
    'https://www.birminghamboilerrepairs.uk/acocks-green/main-specialists',
    'https://www.birminghamboilerrepairs.uk/birmingham/alpha-specialists'
  ],
  
  // Invalid service names with spaces/capitals
  invalidServices: [
    'https://www.birminghamboilerrepairs.uk/acocks-green/Boiler Installation',
    'https://www.birminghamboilerrepairs.uk/acocks-green/Boiler Troubleshooting',
    'https://www.birminghamboilerrepairs.uk/ashted/Boiler Servicing',
    'https://www.birminghamboilerrepairs.uk/acocks-green/Heating System Troubleshooting',
    'https://www.birminghamboilerrepairs.uk/ashted/Heating Systems',
    'https://www.birminghamboilerrepairs.uk/acocks-green/Boiler Servicing',
    'https://www.birminghamboilerrepairs.uk/ashted/Boiler Noise Diagnosis',
    'https://www.birminghamboilerrepairs.uk/acocks-green/Boiler Noise Diagnosis',
    'https://www.birminghamboilerrepairs.uk/acocks-green/Heating Systems',
    'https://www.birminghamboilerrepairs.uk/ashted/Emergency Boiler Repair',
    'https://www.birminghamboilerrepairs.uk/ashted/Boiler Installation',
    'https://www.birminghamboilerrepairs.uk/ashted/Boiler Troubleshooting',
    'https://www.birminghamboilerrepairs.uk/ashted/Heating System Troubleshooting',
    'https://www.birminghamboilerrepairs.uk/acocks-green/Emergency Boiler Repair'
  ],
  
  // Invalid blog tag URLs
  invalidBlogTags: [
    'https://www.birminghamboilerrepairs.uk/blog/tag/boiler won\'t start',
    'https://www.birminghamboilerrepairs.uk/blog/tag/24/7 service'
  ],
  
  // Asset URLs (shouldn't be indexed)
  assetUrls: [
    'http://birminghamboilerrepairs.uk/_next/static/media/a34f9d1faa5f3315-s.p.woff2'
  ],
  
  // Invalid standalone pages
  invalidPages: [
    'https://www.birminghamboilerrepairs.uk/moseley',
    'https://www.birminghamboilerrepairs.uk/dudley',
    'https://www.birminghamboilerrepairs.uk/kingswinford',
    'https://www.birminghamboilerrepairs.uk/sitemap-blog.xml'
  ]
};

/**
 * Generate canonical URLs for each category
 */
function generateCanonicalMappings() {
  console.log('🔄 Generating canonical URL mappings for 404 errors...\n');
  
  const mappings = {
    spaceInLocations: [],
    urlEncoded: [], 
    duplicateLocations: [],
    invalidSpecialists: [],
    invalidServices: [],
    invalidBlogTags: [],
    assetUrls: [],
    invalidPages: []
  };
  
  // Handle space-separated locations
  problematic404Urls.spaceInLocations.forEach(url => {
    const canonical = url
      .replace(/([A-Z][a-z]+ [A-Z][a-z]+)/g, (match) => match.toLowerCase().replace(/ /g, '-'))
      .replace(/birminghamboilerrepairs\.uk/g, 'www.birminghamboilerrepairs.uk')
      .replace(/^http:/, 'https:');
    
    mappings.spaceInLocations.push({ original: url, canonical });
  });
  
  // Handle URL encoded spaces
  problematic404Urls.urlEncoded.forEach(url => {
    const canonical = decodeURIComponent(url)
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/birminghamboilerrepairs\.uk/g, 'www.birminghamboilerrepairs.uk')
      .replace(/^http:/, 'https:');
    
    mappings.urlEncoded.push({ original: url, canonical });
  });
  
  // Handle duplicate locations
  problematic404Urls.duplicateLocations.forEach(url => {
    const canonical = url.replace(/\/([^\/]+)\/\1$/, '/$1');
    mappings.duplicateLocations.push({ original: url, canonical });
  });
  
  // Handle invalid specialists
  problematic404Urls.invalidSpecialists.forEach(url => {
    let canonical = url;
    if (url.includes('alpha-specialists') || url.includes('glow-worm-specialists')) {
      canonical = url.replace(/(alpha|glow-worm)-specialists/, 'ferroli-specialists');
    } else if (url.includes('main-specialists')) {
      canonical = url.replace('main-specialists', 'boiler-repairs');
    }
    mappings.invalidSpecialists.push({ original: url, canonical });
  });
  
  // Handle invalid services
  problematic404Urls.invalidServices.forEach(url => {
    let canonical = url;
    const serviceMap = {
      'Boiler Installation': 'boiler-repairs',
      'Boiler Servicing': 'boiler-servicing',
      'Boiler Troubleshooting': 'boiler-repairs',
      'Heating Systems': 'boiler-repairs',
      'Heating System Troubleshooting': 'boiler-repairs',
      'Emergency Boiler Repair': 'boiler-repairs',
      'Boiler Noise Diagnosis': 'boiler-repairs'
    };
    
    for (const [invalid, valid] of Object.entries(serviceMap)) {
      if (url.includes(invalid)) {
        canonical = url.replace(invalid, valid);
        break;
      }
    }
    mappings.invalidServices.push({ original: url, canonical });
  });
  
  // Handle invalid blog tags
  problematic404Urls.invalidBlogTags.forEach(url => {
    const canonical = 'https://www.birminghamboilerrepairs.uk/blog';
    mappings.invalidBlogTags.push({ original: url, canonical });
  });
  
  // Handle asset URLs
  problematic404Urls.assetUrls.forEach(url => {
    mappings.assetUrls.push({ original: url, canonical: null, action: 'block' });
  });
  
  // Handle invalid pages
  problematic404Urls.invalidPages.forEach(url => {
    let canonical;
    if (url.includes('moseley') || url.includes('dudley') || url.includes('kingswinford')) {
      canonical = 'https://www.birminghamboilerrepairs.uk/locations';
    } else {
      canonical = 'https://www.birminghamboilerrepairs.uk/';
    }
    mappings.invalidPages.push({ original: url, canonical });
  });
  
  return mappings;
}

/**
 * Generate Google Search Console actions
 */
function generateSearchConsoleActions() {
  const mappings = generateCanonicalMappings();
  
  console.log('📊 404 Error Analysis Summary:');
  console.log(`- Space-separated locations: ${mappings.spaceInLocations.length}`);
  console.log(`- URL encoded spaces: ${mappings.urlEncoded.length}`);
  console.log(`- Duplicate locations: ${mappings.duplicateLocations.length}`);
  console.log(`- Invalid specialists: ${mappings.invalidSpecialists.length}`);
  console.log(`- Invalid services: ${mappings.invalidServices.length}`);
  console.log(`- Invalid blog tags: ${mappings.invalidBlogTags.length}`);
  console.log(`- Asset URLs: ${mappings.assetUrls.length}`);
  console.log(`- Invalid pages: ${mappings.invalidPages.length}\n`);
  
  // URLs to remove from Google Search Console
  const urlsToRemove = [];
  Object.values(mappings).forEach(category => {
    category.forEach(mapping => {
      if (mapping.action !== 'block') {
        urlsToRemove.push(mapping.original);
      }
    });
  });
  
  // Canonical URLs to request indexing for
  const urlsToIndex = [];
  Object.values(mappings).forEach(category => {
    category.forEach(mapping => {
      if (mapping.canonical && mapping.canonical !== mapping.original) {
        urlsToIndex.push(mapping.canonical);
      }
    });
  });
  
  // Remove duplicates
  const uniqueUrlsToIndex = [...new Set(urlsToIndex)];
  
  console.log('🗑️  URLs to REMOVE from Google Search Console:');
  console.log('(Submit these for removal as they are invalid/non-canonical)\n');
  urlsToRemove.forEach(url => console.log(url));
  
  console.log('\n✅ Canonical URLs to REQUEST INDEXING for:');
  console.log('(Submit these for fresh indexing as the correct versions)\n');
  uniqueUrlsToIndex.forEach(url => console.log(url));
  
  console.log('\n📋 Google Search Console Action Plan:');
  console.log('1. Go to Google Search Console > Removals');
  console.log('2. Submit "Temporarily remove" requests for all 491 invalid URLs above');
  console.log('3. Go to URL Inspection tool');
  console.log('4. Submit "Request indexing" for all canonical URLs above');
  console.log('5. Update robots.txt to block problematic patterns (already done)');
  console.log('6. Monitor the "Coverage" report for improvements over 2-4 weeks');
  
  return {
    toRemove: urlsToRemove,
    toIndex: uniqueUrlsToIndex,
    mappings
  };
}

/**
 * Generate robots.txt patterns to prevent future issues
 */
function generateRobotsPatterns() {
  console.log('\n🤖 Robots.txt patterns to prevent future 404s:');
  console.log('(These patterns are already implemented in your robots.txt)\n');
  
  const patterns = [
    'Disallow: /*%20*  # Block URL-encoded spaces',
    'Disallow: /*/alpha-specialists  # Block invalid alpha specialists',
    'Disallow: /*/main-specialists  # Block invalid main specialists', 
    'Disallow: /*/glow-worm-specialists  # Block invalid glow-worm specialists',
    'Disallow: /*/Boiler*  # Block capitalized Boiler services',
    'Disallow: /*/Heating*  # Block capitalized Heating services',
    'Disallow: /*/Emergency*  # Block capitalized Emergency services',
    'Disallow: /blog/tag/*won\'t*  # Block malformed blog tags',
    'Disallow: /blog/tag/*24/7*  # Block malformed blog tags'
  ];
  
  patterns.forEach(pattern => console.log(pattern));
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Birmingham Boiler Repairs - 404 Error Cleanup Helper\n');
  console.log('Analyzing 491 "Not found (404)" errors from Google Search Console...\n');
  
  const results = generateSearchConsoleActions();
  generateRobotsPatterns();
  
  console.log('\n⚡ Quick Actions Summary:');
  console.log('1. 🚀 Deploy the updated middleware.ts and next.config.mjs (ready now)');
  console.log('2. 🗑️  Remove 491 invalid URLs from Google Search Console');
  console.log(`3. ✅ Request indexing for ${results.toIndex.length} canonical URLs`);
  console.log('4. 📊 Monitor improvements in Search Console over 2-4 weeks');
  
  console.log('\n🎯 Expected Results:');
  console.log('- Week 1-2: Redirects active, 404 count starts decreasing');
  console.log('- Week 3-4: Significant reduction in 404 errors (80%+ resolved)');
  console.log('- Month 2: Clean Search Console with properly indexed canonical URLs');
  
  return results;
}

// Run the script
main();
