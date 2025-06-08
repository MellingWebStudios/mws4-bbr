#!/usr/bin/env node

console.log('🔍 Testing West Midlands URL\n');

// Test the new West Midlands URL
const testUrl = 'https://www.birminghamboilerrepairs.uk/west-midlands';

// Read middleware to extract patterns
const fs = require('fs');
const middlewareContent = fs.readFileSync('middleware.ts', 'utf8');

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

// Test the URL
const urlObj = new URL(testUrl);
const pathname = urlObj.pathname;
const slug = pathname.slice(1); // Remove leading slash

console.log(`📍 ${testUrl}`);
console.log(`   Pathname: ${pathname}`);
console.log(`   Slug: ${slug}`);

if (validLocationSlugs.includes(slug)) {
  console.log(`   ✅ Valid location slug found!`);
  console.log(`   📍 Would serve location page for: ${slug}`);
} else {
  console.log(`   ❌ Location slug not found in validLocationSlugs`);
}

// Check if it exists in location data
const locationDataContent = fs.readFileSync('lib/locations-data.ts', 'utf8');
const locationSlugsMatch = locationDataContent.match(/"slug":\s*"([^"]+)"/g);
const locationSlugs = locationSlugsMatch.map(match => match.match(/"slug":\s*"([^"]+)"/)[1]);

if (locationSlugs.includes(slug)) {
  console.log(`   ✅ Location exists in location data`);
} else {
  console.log(`   ❌ Location missing from location data`);
}

console.log('\n🎉 West Midlands URL test complete!');
