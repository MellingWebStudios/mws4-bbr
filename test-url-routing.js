#!/usr/bin/env node

console.log('🔍 URL Routing Test Simulation\n');

// Simulate the middleware logic for the URLs you mentioned
const testUrls = [
  'https://www.birminghamboilerrepairs.uk/kings-heath',
  'https://www.birminghamboilerrepairs.uk/west-bromwich', 
  'https://www.birminghamboilerrepairs.uk/heath/kings'
];

// Read middleware to extract patterns
const fs = require('fs');
const middlewareContent = fs.readFileSync('middleware.ts', 'utf8');

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

console.log('Testing URL routing behavior:\n');

testUrls.forEach(url => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  
  console.log(`📍 ${url}`);
  console.log(`   Pathname: ${pathname}`);
  
  // Check if it matches a special pattern
  if (specialLocationPatterns[pathname]) {
    console.log(`   ✅ Matches special pattern: ${pathname} -> ${specialLocationPatterns[pathname]}`);
    console.log(`   🔄 Would redirect to: https://www.birminghamboilerrepairs.uk${specialLocationPatterns[pathname]}`);
  } 
  // Check if it's a direct location slug
  else {
    const slug = pathname.slice(1); // Remove leading slash
    if (validLocationSlugs.includes(slug)) {
      console.log(`   ✅ Valid location slug: ${slug}`);
      console.log(`   📍 Would serve location page for: ${slug}`);
    } else {
      console.log(`   ❌ No pattern match, would likely 404`);
    }
  }
  console.log('');
});

console.log('🎉 URL routing test complete!');
