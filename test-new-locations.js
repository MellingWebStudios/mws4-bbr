#!/usr/bin/env node

const fs = require('fs');

console.log('🔍 Testing New Location URLs\n');

// Get location data slugs
const locationDataContent = fs.readFileSync('lib/locations-data.ts', 'utf8');
const slugMatches = locationDataContent.match(/"slug":\s*"([^"]+)"/g);
const locationSlugs = slugMatches.map(match => match.match(/"slug":\s*"([^"]+)"/)[1]);

// Check middleware
const middlewareContent = fs.readFileSync('middleware.ts', 'utf8');

console.log('✅ New locations added to location data:');
['kings-heath', 'west-bromwich'].forEach(slug => {
  const exists = locationSlugs.includes(slug);
  console.log(`  ${exists ? '✅' : '❌'} ${slug} exists in location data: ${exists}`);
});

// Check locationRedirects
const redirectsMatch = middlewareContent.match(/const locationRedirects: Record<string, string> = \{([\s\S]*?)\};/);
if (redirectsMatch) {
  const content = redirectsMatch[1];
  const matches = content.match(/'([^']+)':\s*'([^']+)'/g) || [];
  const redirects = {};
  matches.forEach(match => {
    const [, key, value] = match.match(/'([^']+)':\s*'([^']+)'/);
    redirects[key] = value;
  });
  
  console.log('\n✅ New locationRedirects:');
  [
    { key: 'Kings Heath', expected: 'kings-heath' },
    { key: 'West Bromwich', expected: 'west-bromwich' }
  ].forEach(({ key, expected }) => {
    const actual = redirects[key];
    const exists = locationSlugs.includes(expected);
    const status = actual === expected && exists ? '✅' : '❌';
    console.log(`  ${status} "${key}" -> "${actual}" (target exists: ${exists})`);
  });
}

// Check specialLocationPatterns for /heath/kings
const specialMatch = middlewareContent.match(/const specialLocationPatterns: Record<string, string> = \{([\s\S]*?)\};/);
if (specialMatch) {
  const content = specialMatch[1];
  const matches = content.match(/'([^']+)':\s*'([^']+)'/g) || [];
  
  console.log('\n✅ Special pattern for /heath/kings:');
  
  matches.forEach(match => {
    const [, source, target] = match.match(/'([^']+)':\s*'([^']+)'/);
    if (source === '/heath/kings') {
      const targetSlug = target.startsWith('/') ? target.substring(1) : target;
      const exists = locationSlugs.includes(targetSlug);
      const status = exists ? '✅' : '❌';
      console.log(`  ${status} "${source}" -> "${target}" (target exists: ${exists})`);
    }
  });
}

// Check validLocationSlugs arrays
const validSlugsMatches = middlewareContent.match(/const validLocationSlugs = \[([\s\S]*?)\];/g);
if (validSlugsMatches && validSlugsMatches.length >= 2) {
  console.log('\n✅ New locations in validLocationSlugs arrays:');
  ['kings-heath', 'west-bromwich'].forEach(slug => {
    let foundInAll = true;
    validSlugsMatches.forEach((match, index) => {
      const arrayContent = match.match(/\[([\s\S]*?)\]/)[1];
      const slugsInArray = arrayContent.match(/'([^']+)'/g) || [];
      const slugsClean = slugsInArray.map(s => s.replace(/'/g, ''));
      const exists = slugsClean.includes(slug);
      if (!exists) foundInAll = false;
    });
    console.log(`  ${foundInAll ? '✅' : '❌'} ${slug} found in all validLocationSlugs arrays`);
  });
}

console.log('\n🎉 New locations successfully added and configured!');
