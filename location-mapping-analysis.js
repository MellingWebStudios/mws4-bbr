#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read middleware.ts and extract all mappings
function extractMiddlewareMappings() {
  const middlewareContent = fs.readFileSync('middleware.ts', 'utf8');
  
  // Extract locationRedirects
  const locationRedirectsMatch = middlewareContent.match(/const locationRedirects: Record<string, string> = \{([\s\S]*?)\};/);
  const locationRedirects = {};
  if (locationRedirectsMatch) {
    const content = locationRedirectsMatch[1];
    const matches = content.match(/'([^']+)':\s*'([^']+)'/g);
    if (matches) {
      matches.forEach(match => {
        const [, key, value] = match.match(/'([^']+)':\s*'([^']+)'/);
        locationRedirects[key] = value;
      });
    }
  }

  // Extract specialLocationPatterns
  const specialPatternsMatch = middlewareContent.match(/const specialLocationPatterns: Record<string, string> = \{([\s\S]*?)\};/);
  const specialLocationPatterns = {};
  if (specialPatternsMatch) {
    const content = specialPatternsMatch[1];
    const matches = content.match(/'([^']+)':\s*'([^']+)'/g);
    if (matches) {
      matches.forEach(match => {
        const [, key, value] = match.match(/'([^']+)':\s*'([^']+)'/);
        specialLocationPatterns[key] = value;
      });
    }
  }

  // Extract validLocationSlugs
  const validSlugsMatch = middlewareContent.match(/const validLocationSlugs = \[([\s\S]*?)\];/);
  const validLocationSlugs = [];
  if (validSlugsMatch) {
    const content = validSlugsMatch[1];
    const matches = content.match(/'([^']+)'/g);
    if (matches) {
      matches.forEach(match => {
        const slug = match.replace(/'/g, '');
        validLocationSlugs.push(slug);
      });
    }
  }

  return { locationRedirects, specialLocationPatterns, validLocationSlugs };
}

// Read locations-data.ts and extract location slugs
function extractLocationDataSlugs() {
  const locationDataContent = fs.readFileSync('lib/locations-data.ts', 'utf8');
  
  const slugMatches = locationDataContent.match(/"slug":\s*"([^"]+)"/g);
  const locationSlugs = [];
  if (slugMatches) {
    slugMatches.forEach(match => {
      const slug = match.match(/"slug":\s*"([^"]+)"/)[1];
      locationSlugs.push(slug);
    });
  }
  
  return locationSlugs.sort();
}

function main() {
  console.log('🔍 Location Mapping Cross-Reference Analysis\n');
  console.log('='.repeat(60));
  
  const middleware = extractMiddlewareMappings();
  const locationDataSlugs = extractLocationDataSlugs();
  
  console.log(`\n📊 Summary:`);
  console.log(`- Location data slugs: ${locationDataSlugs.length}`);
  console.log(`- Middleware valid slugs: ${middleware.validLocationSlugs.length}`);
  console.log(`- Location redirects: ${Object.keys(middleware.locationRedirects).length}`);
  console.log(`- Special patterns: ${Object.keys(middleware.specialLocationPatterns).length}`);
  
  // 1. Check if all location data slugs are in validLocationSlugs
  console.log('\n🔍 Missing slugs in middleware validLocationSlugs:');
  const missingFromValid = locationDataSlugs.filter(slug => !middleware.validLocationSlugs.includes(slug));
  if (missingFromValid.length > 0) {
    missingFromValid.forEach(slug => console.log(`  ❌ "${slug}" - exists in location data but missing from validLocationSlugs`));
  } else {
    console.log('  ✅ All location data slugs are present in validLocationSlugs');
  }
  
  // 2. Check if validLocationSlugs contains invalid entries
  console.log('\n🔍 Invalid entries in middleware validLocationSlugs:');
  const invalidInValid = middleware.validLocationSlugs.filter(slug => !locationDataSlugs.includes(slug));
  if (invalidInValid.length > 0) {
    invalidInValid.forEach(slug => console.log(`  ❌ "${slug}" - in validLocationSlugs but missing from location data`));
  } else {
    console.log('  ✅ All validLocationSlugs entries have corresponding location data');
  }
  
  // 3. Check locationRedirects targets
  console.log('\n🔍 Invalid targets in locationRedirects:');
  const invalidRedirectTargets = [];
  Object.entries(middleware.locationRedirects).forEach(([source, target]) => {
    if (!locationDataSlugs.includes(target)) {
      invalidRedirectTargets.push({ source, target });
    }
  });
  if (invalidRedirectTargets.length > 0) {
    invalidRedirectTargets.forEach(({ source, target }) => 
      console.log(`  ❌ "${source}" -> "${target}" - target does not exist in location data`));
  } else {
    console.log('  ✅ All locationRedirects targets are valid');
  }
  
  // 4. Check specialLocationPatterns targets
  console.log('\n🔍 Invalid targets in specialLocationPatterns:');
  const invalidSpecialTargets = [];
  Object.entries(middleware.specialLocationPatterns).forEach(([source, target]) => {
    // Remove leading slash from target for comparison with location slugs
    const targetSlug = target.startsWith('/') ? target.substring(1) : target;
    if (!locationDataSlugs.includes(targetSlug)) {
      invalidSpecialTargets.push({ source, target });
    }
  });
  if (invalidSpecialTargets.length > 0) {
    invalidSpecialTargets.forEach(({ source, target }) => 
      console.log(`  ❌ "${source}" -> "${target}" - target does not exist in location data`));
  } else {
    console.log('  ✅ All specialLocationPatterns targets are valid');
  }
  
  // 5. Look for potential missing redirects
  console.log('\n🔍 Potential missing locationRedirects:');
  const potentialMissing = [];
  locationDataSlugs.forEach(slug => {
    const parts = slug.split('-');
    if (parts.length > 1) {
      const spacedName = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
      if (!middleware.locationRedirects[spacedName]) {
        potentialMissing.push({ slug, spacedName });
      }
    }
  });
  
  if (potentialMissing.length > 0) {
    console.log('  Locations that might need space-separated redirect entries:');
    potentialMissing.forEach(({ slug, spacedName }) => 
      console.log(`    📝 "${spacedName}": "${slug}"`));
  } else {
    console.log('  ✅ All multi-word locations appear to have redirects');
  }
  
  // 6. Summary of issues found
  console.log('\n📋 Issues Summary:');
  const totalIssues = missingFromValid.length + invalidInValid.length + invalidRedirectTargets.length + invalidSpecialTargets.length;
  
  if (totalIssues === 0) {
    console.log('  🎉 No mapping inconsistencies found!');
  } else {
    console.log(`  ⚠️  ${totalIssues} issues found that need attention:`);
    if (missingFromValid.length > 0) console.log(`    - ${missingFromValid.length} missing from validLocationSlugs`);
    if (invalidInValid.length > 0) console.log(`    - ${invalidInValid.length} invalid entries in validLocationSlugs`);
    if (invalidRedirectTargets.length > 0) console.log(`    - ${invalidRedirectTargets.length} invalid locationRedirects targets`);
    if (invalidSpecialTargets.length > 0) console.log(`    - ${invalidSpecialTargets.length} invalid specialLocationPatterns targets`);
  }
  
  console.log('\n' + '='.repeat(60));
}

if (require.main === module) {
  main();
}
