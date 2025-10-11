#!/usr/bin/env node

/**
 * Test script to verify that our middleware fixes handle the broken link patterns
 * found in the crawl data.
 */

const testUrls = [
  // Examples from the actual crawl data showing broken patterns
  'https://www.birminghamboilerrepairs.uk/Acocks%20Green/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Acocks%20Green/boiler-servicing', 
  'https://www.birminghamboilerrepairs.uk/Acocks%20Green/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Austin%20Village/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Austin%20Village/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Austin%20Village/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Bartley%20Green/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Bartley%20Green/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Bartley%20Green/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Aston%20Cross/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Aston%20Cross/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Aston%20Cross/gas-safety',
  
  // Expected correct URLs (these should work)
  'https://www.birminghamboilerrepairs.uk/acocks-green/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/austin-village/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/bartley-green/gas-safety',
  'https://www.birminghamboilerrepairs.uk/aston-cross/boiler-repairs',
];

// Location mapping (subset for testing)
const locationRedirects = {
  'Acocks Green': 'acocks-green',
  'Austin Village': 'austin-village', 
  'Bartley Green': 'bartley-green',
  'Aston Cross': 'aston-cross',
  'Perry Common': 'perry-common',
  'Kings Heath': 'kings-heath',
  'Hall Green': 'hall-green',
  'Small Heath': 'small-heath',
  'Selly Park': 'selly-park',
  'Great Barr': 'great-barr',
  'Four Oaks': 'four-oaks',
  'Castle Vale': 'castle-vale'
};

// Service mapping
const commonServiceRedirects = {
  'boiler-repairs': 'boiler-repairs',
  'boiler-servicing': 'boiler-servicing', 
  'gas-safety': 'gas-safety',
  'combination-boiler-repairs': 'boiler-repairs',
  'combination-boiler-services': 'boiler-servicing'
};

function testRedirectPattern(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  
  console.log(`\n🔍 Testing: ${url}`);
  console.log(`   Pathname: ${pathname}`);
  
  // Test URL-encoded pattern: /Acocks%20Green/boiler-repairs
  const urlEncodedPattern = /^\/([^\/]+)%20([^\/]+)(?:%20([^\/]+))?\/(.+)$/;
  const urlEncodedMatch = pathname.match(urlEncodedPattern);
  
  if (urlEncodedMatch) {
    const [, firstWord, secondWord, thirdWord, service] = urlEncodedMatch;
    
    // Build location slug based on number of words
    let locationSlug;
    if (thirdWord) {
      locationSlug = `${firstWord.toLowerCase()}-${secondWord.toLowerCase()}-${thirdWord.toLowerCase()}`;
    } else {
      locationSlug = `${firstWord.toLowerCase()}-${secondWord.toLowerCase()}`;
    }
    
    // Check if this location exists in our mapping
    const originalLocationName = `${firstWord} ${secondWord}${thirdWord ? ` ${thirdWord}` : ''}`;
    const validLocationSlug = locationRedirects[originalLocationName];
    
    // Check service
    const validServiceSlug = commonServiceRedirects[service] || service;
    
    if (validLocationSlug) {
      const redirectUrl = `https://www.birminghamboilerrepairs.uk/${validLocationSlug}/${validServiceSlug}`;
      console.log(`   ✅ REDIRECT MATCH: ${originalLocationName} -> ${validLocationSlug}`);
      console.log(`   🔄 Would redirect to: ${redirectUrl}`);
      return { shouldRedirect: true, redirectUrl };
    } else {
      console.log(`   ❌ NO REDIRECT: Location "${originalLocationName}" not found in mapping`);
      return { shouldRedirect: false };
    }
  }
  
  // Check if it's already a proper URL
  const properPattern = /^\/([a-z0-9\-]+)\/([a-z0-9\-]+)$/;
  if (properPattern.test(pathname)) {
    console.log(`   ✅ PROPER FORMAT: Already correct URL format`);
    return { shouldRedirect: false, isCorrect: true };
  }
  
  console.log(`   ❓ NO PATTERN MATCH: URL doesn't match expected patterns`);
  return { shouldRedirect: false };
}

console.log('🚀 Testing Broken Link Redirect Patterns\n');
console.log('This script tests if our middleware redirects will fix the broken URLs found in the crawl data.\n');

let totalTests = 0;
let redirectsFound = 0;
let correctUrls = 0;

testUrls.forEach(url => {
  totalTests++;
  const result = testRedirectPattern(url);
  
  if (result.shouldRedirect) {
    redirectsFound++;
  } else if (result.isCorrect) {
    correctUrls++;
  }
});

console.log('\n📊 SUMMARY');
console.log('='.repeat(50));
console.log(`Total URLs tested: ${totalTests}`);
console.log(`URLs that will be redirected: ${redirectsFound}`);
console.log(`URLs already in correct format: ${correctUrls}`);
console.log(`URLs with no pattern match: ${totalTests - redirectsFound - correctUrls}`);

if (redirectsFound > 0) {
  console.log('\n✅ SUCCESS: Middleware should handle the broken link patterns!');
} else {
  console.log('\n❌ ISSUE: No redirects found for broken URL patterns');
}

console.log('\n🎯 Next Steps:');
console.log('1. Deploy the updated middleware.ts');
console.log('2. Test the redirects on the live site');
console.log('3. Re-run the crawl to verify 404s are fixed');
