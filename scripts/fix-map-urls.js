#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Fixing broken Google Maps URLs...\n');

// Read the locations data file
const locationsDataPath = './lib/locations-data.ts';
let content = fs.readFileSync(locationsDataPath, 'utf8');

console.log('📊 Before fix:');
const beforeCount = (content.match(/goo\.gl\/maps/g) || []).length;
console.log(`   - Found ${beforeCount} broken goo.gl map URLs`);

// Function to generate a proper Google Maps URL
function generateMapUrl(locationName, postcode) {
  // Create a search query for Google Maps
  const query = encodeURIComponent(`${locationName}, ${postcode}, UK`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// Regular expression to find location objects and extract name, postcode, and mapUrl
const locationRegex = /{[\s\S]*?"slug":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"postcode":\s*"([^"]+)"[\s\S]*?"mapUrl":\s*"https:\/\/goo\.gl\/maps\/[^"]+"/g;

let match;
let replacements = 0;

while ((match = locationRegex.exec(content)) !== null) {
  const [fullMatch, slug, name, postcode] = match;
  const newMapUrl = generateMapUrl(name, postcode);
  
  // Replace the old mapUrl with the new one
  const updatedMatch = fullMatch.replace(
    /"mapUrl":\s*"https:\/\/goo\.gl\/maps\/[^"]+"/,
    `"mapUrl": "${newMapUrl}"`
  );
  
  content = content.replace(fullMatch, updatedMatch);
  replacements++;
  
  console.log(`✅ Fixed: ${name} -> ${newMapUrl}`);
}

console.log(`\n📈 Results:`);
console.log(`   - Fixed ${replacements} broken map URLs`);

// Verify the fix
const afterCount = (content.match(/goo\.gl\/maps/g) || []).length;
console.log(`   - Remaining goo.gl URLs: ${afterCount}`);

if (afterCount === 0) {
  console.log('   ✅ All goo.gl URLs have been replaced!');
} else {
  console.log('   ⚠️  Some goo.gl URLs may still remain');
}

// Write the updated content back to the file
fs.writeFileSync(locationsDataPath, content);

console.log(`\n🎉 Successfully updated ${locationsDataPath}`);
console.log('🔗 All mapUrl properties now use proper Google Maps search URLs');
