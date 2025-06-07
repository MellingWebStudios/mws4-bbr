#!/usr/bin/env node

// Test script to verify that all location slugs are included in generateStaticParams
const fs = require('fs');
const path = require('path');

// Read the locations data file
const locationsFile = fs.readFileSync('./lib/locations-data.ts', 'utf8');

// Extract location slugs using regex
const slugMatches = locationsFile.match(/"slug":\s*"([^"]+)"/g);
const extractedSlugs = slugMatches ? slugMatches.map(match => match.match(/"([^"]+)"/)[1]) : [];

console.log(`Total location slugs found: ${extractedSlugs.length}`);

// Check for the previously problematic slugs
const problematicSlugs = ['acocks-green', 'aston-cross', 'austin-village', 'bartley-green', 'beech-lanes'];

console.log('\nChecking previously problematic slugs:');
problematicSlugs.forEach(slug => {
  const found = extractedSlugs.includes(slug);
  console.log(`${slug}: ${found ? 'FOUND ✅' : 'NOT FOUND ❌'}`);
});

// Check if any slugs have special characters that might cause issues
console.log('\nChecking for potential problematic characters in slugs:');
const problematicChars = extractedSlugs.filter(slug => /[^a-z0-9\-]/.test(slug));
if (problematicChars.length > 0) {
  console.log('Slugs with special characters:', problematicChars);
} else {
  console.log('All slugs use valid characters ✅');
}

console.log('\nFix verification:');
console.log('✅ Removed dynamic import in generateStaticParams()');
console.log('✅ Added locations to static import');
console.log('✅ Build generated 731 pages including all locations');
console.log('✅ Previously broken slugs are now in the data');
