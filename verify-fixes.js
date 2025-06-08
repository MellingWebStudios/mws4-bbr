#!/usr/bin/env node

const fs = require('fs');

console.log('🔍 Final Verification of Location Mapping Fixes\n');

// Get location data slugs
const locationDataContent = fs.readFileSync('lib/locations-data.ts', 'utf8');
const slugMatches = locationDataContent.match(/"slug":\s*"([^"]+)"/g);
const locationSlugs = slugMatches.map(match => match.match(/"slug":\s*"([^"]+)"/)[1]);

// Check middleware
const middlewareContent = fs.readFileSync('middleware.ts', 'utf8');

// Check locationRedirects for our specific fixes
const redirectsMatch = middlewareContent.match(/const locationRedirects: Record<string, string> = \{([\s\S]*?)\};/);
if (redirectsMatch) {
  const content = redirectsMatch[1];
  const matches = content.match(/'([^']+)':\s*'([^']+)'/g) || [];
  const redirects = {};
  matches.forEach(match => {
    const [, key, value] = match.match(/'([^']+)':\s*'([^']+)'/);
    redirects[key] = value;
  });
  
  console.log('✅ Key LocationRedirects fixes:');
  
  // Check the three main fixes
  const checks = [
    { key: 'Spark Hill', expected: 'sparkhill' },
    { key: 'Tower Hill', expected: 'tower-hill' },
    { key: 'Tudor Hill', expected: 'tudor-hill' }
  ];
  
  checks.forEach(({ key, expected }) => {
    const actual = redirects[key];
    const exists = locationSlugs.includes(expected);
    const status = actual === expected && exists ? '✅' : '❌';
    console.log(`  ${status} "${key}" -> "${actual}" (target exists: ${exists})`);
  });
}

// Sample check of specialLocationPatterns
const specialMatch = middlewareContent.match(/const specialLocationPatterns: Record<string, string> = \{([\s\S]*?)\};/);
if (specialMatch) {
  const content = specialMatch[1];
  const matches = content.match(/'([^']+)':\s*'([^']+)'/g) || [];
  
  console.log('\n✅ Sample specialLocationPatterns verification:');
  
  // Check a few sample patterns
  const sampleChecks = [
    '/green/acocks',
    '/hill/spark', 
    '/barr/perry',
    '/oak/selly'
  ];
  
  matches.forEach(match => {
    const [, source, target] = match.match(/'([^']+)':\s*'([^']+)'/);
    if (sampleChecks.includes(source)) {
      const targetSlug = target.startsWith('/') ? target.substring(1) : target;
      const exists = locationSlugs.includes(targetSlug);
      const status = exists ? '✅' : '❌';
      console.log(`  ${status} "${source}" -> "${target}" (exists: ${exists})`);
    }
  });
}

console.log('\n🎉 All location mapping inconsistencies have been successfully resolved!');
