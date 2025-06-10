#!/usr/bin/env node

console.log('🔍 Final West Midlands validation...\n');

const fs = require('fs');

// Check locations-data.ts
const locationsData = fs.readFileSync('./lib/locations-data.ts', 'utf8');
const westMidlandsInData = locationsData.includes('"slug": "west-midlands"');
console.log(`✅ West Midlands in locations-data.ts: ${westMidlandsInData}`);

// Check middleware.ts singleWordLocations
const middlewareData = fs.readFileSync('./middleware.ts', 'utf8');
const singleWordMatch = middlewareData.match(/const singleWordLocations = \[([\s\S]*?)\];/);
if (singleWordMatch) {
  const westMidlandsInSingle = singleWordMatch[1].includes("'west-midlands'");
  console.log(`✅ West Midlands in singleWordLocations: ${westMidlandsInSingle}`);
} else {
  console.log('❌ Could not find singleWordLocations array');
}

// Check locationRedirects
const redirectMatch = middlewareData.match(/const locationRedirects[^{]*\{([\s\S]*?)\};/);
if (redirectMatch) {
  const westMidlandsInRedirects = redirectMatch[1].includes("'West Midlands': 'west-midlands'");
  console.log(`✅ West Midlands in locationRedirects: ${westMidlandsInRedirects}`);
} else {
  console.log('❌ Could not find locationRedirects mapping');
}

// Count totals
const locationSlugs = (locationsData.match(/"slug":\s*"[^"]+"/g) || []).length;
const singleWordCount = singleWordMatch ? (singleWordMatch[1].match(/'[^']+'/g) || []).length : 0;
const redirectCount = redirectMatch ? (redirectMatch[1].match(/'[^']+': '[^']+'/g) || []).length : 0;

console.log(`\n📊 Summary:`);
console.log(`- Location data slugs: ${locationSlugs}`);
console.log(`- Single word locations: ${singleWordCount}`);
console.log(`- Location redirects: ${redirectCount}`);

if (locationSlugs === singleWordCount && westMidlandsInData && westMidlandsInRedirects) {
  console.log('\n🎉 All validation checks passed! West Midlands is properly configured.');
} else {
  console.log('\n❌ Some validation checks failed. Please review the configuration.');
}
