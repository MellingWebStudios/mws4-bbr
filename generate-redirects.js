#!/usr/bin/env node

const fs = require('fs');

// Read the locations data file
const content = fs.readFileSync('./lib/locations-data.ts', 'utf8');

// Extract all location objects using regex
const locationPattern = /\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
const redirects = {};

let match;
while ((match = locationPattern.exec(content)) !== null) {
  const slug = match[1];
  const name = match[2];
  
  // Only include names that contain spaces
  if (name.includes(' ')) {
    redirects[name] = slug;
  }
}

// Sort by name for better organization
const sortedNames = Object.keys(redirects).sort();

console.log('// Generated location redirects mapping from locations-data.ts');
console.log('const locationRedirects: Record<string, string> = {');
console.log('  // Handle space-separated location names to proper slugs');

sortedNames.forEach(name => {
  console.log(`  '${name}': '${redirects[name]}',`);
});

console.log('};');

// Also output summary
console.error(`\n✅ Generated ${sortedNames.length} redirects for space-separated location names`);
