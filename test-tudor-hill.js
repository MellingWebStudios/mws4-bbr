// Test script to validate Tudor Hill URL encoding fixes
console.log('Testing Tudor Hill URL encoding...');

// Test URL decoding patterns
const testUrls = [
  '/Tudor%20Hill',
  '/tudor%20hill', 
  '/Tudor%20Hill/boiler-repairs',
  '/tudor%20hill/boiler-repairs',
  '/TUDOR%20HILL',
  '/Tudor Hill',
  '/tudor hill'
];

const locationRedirects = {
  'Tudor Hill': 'tudor-hill'
};

testUrls.forEach(url => {
  console.log(`\nTesting: ${url}`);
  
  // Extract location part
  const locationMatch = url.match(/^\/([^\/]+)(?:\/(.+))?$/);
  if (locationMatch) {
    const [, locationPart, servicePart] = locationMatch;
    
    // Try to decode
    let decodedLocation;
    try {
      decodedLocation = decodeURIComponent(locationPart);
      console.log(`  Decoded: "${decodedLocation}"`);
    } catch (error) {
      decodedLocation = locationPart;
      console.log(`  Decode failed, using original: "${decodedLocation}"`);
    }
    
    // Check direct match
    if (locationRedirects[decodedLocation]) {
      console.log(`  ✓ Direct match found: ${decodedLocation} → ${locationRedirects[decodedLocation]}`);
      const expectedUrl = servicePart ? `/${locationRedirects[decodedLocation]}/${servicePart}` : `/${locationRedirects[decodedLocation]}`;
      console.log(`  Expected redirect: ${url} → ${expectedUrl}`);
    } else {
      // Check case-insensitive
      const decodedLower = decodedLocation.toLowerCase();
      const matchingKey = Object.keys(locationRedirects).find(key => key.toLowerCase() === decodedLower);
      
      if (matchingKey) {
        console.log(`  ✓ Case-insensitive match found: ${decodedLocation} → ${locationRedirects[matchingKey]}`);
        const expectedUrl = servicePart ? `/${locationRedirects[matchingKey]}/${servicePart}` : `/${locationRedirects[matchingKey]}`;
        console.log(`  Expected redirect: ${url} → ${expectedUrl}`);
      } else {
        console.log(`  ✗ No match found for: "${decodedLocation}"`);
      }
    }
  }
});

console.log('\n✅ Test completed!');
