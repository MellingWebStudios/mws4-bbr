#!/usr/bin/env node

console.log('🔧 Testing Location Fixes for HTTP 308 Redirect Issues\n');

const fs = require('fs');

// Test 1: Check if Wolverhampton and Solihull are now in locations data
console.log('📋 Test 1: Checking location data...');
try {
  const locationsDataContent = fs.readFileSync('./lib/locations-data.ts', 'utf8');
  
  const hasWolverhampton = locationsDataContent.includes('"slug": "wolverhampton"');
  const hasSolihull = locationsDataContent.includes('"slug": "solihull"');
  const hasBirmingham = locationsDataContent.includes('"slug": "birmingham"');
  
  console.log(`   ✅ Birmingham exists: ${hasBirmingham}`);
  console.log(`   ✅ Wolverhampton exists: ${hasWolverhampton}`);
  console.log(`   ✅ Solihull exists: ${hasSolihull}`);
  
  if (hasWolverhampton && hasSolihull && hasBirmingham) {
    console.log('   🎉 All required locations are present!\n');
  } else {
    console.log('   ❌ Some locations are missing!\n');
  }
} catch (error) {
  console.log(`   ❌ Error reading locations data: ${error.message}\n`);
}

// Test 2: Check if problematic redirects are removed from middleware
console.log('📋 Test 2: Checking middleware redirects...');
try {
  const middlewareContent = fs.readFileSync('./middleware.ts', 'utf8');
  
  const hasWolverhamptonRedirect = middlewareContent.includes("'/wolverhampton': '/birmingham'");
  const hasSolihullRedirect = middlewareContent.includes("'/solihull': '/birmingham'");
  
  console.log(`   ✅ Wolverhampton redirect removed: ${!hasWolverhamptonRedirect}`);
  console.log(`   ✅ Solihull redirect removed: ${!hasSolihullRedirect}`);
  
  if (!hasWolverhamptonRedirect && !hasSolihullRedirect) {
    console.log('   🎉 Problematic redirects have been removed!\n');
  } else {
    console.log('   ❌ Some problematic redirects still exist!\n');
  }
} catch (error) {
  console.log(`   ❌ Error reading middleware: ${error.message}\n`);
}

// Test 3: Check if duplicate Birmingham redirects are removed from next.config.mjs
console.log('📋 Test 3: Checking next.config.mjs redirects...');
try {
  const nextConfigContent = fs.readFileSync('./next.config.mjs', 'utf8');
  
  const hasBirminghamDupe1 = nextConfigContent.includes("source: '/birmingham/birmingham'");
  const hasBirminghamDupe2 = nextConfigContent.includes("source: '/birmingham/birmingham/:path*'");
  
  console.log(`   ✅ Birmingham duplicate redirect 1 removed: ${!hasBirminghamDupe1}`);
  console.log(`   ✅ Birmingham duplicate redirect 2 removed: ${!hasBirminghamDupe2}`);
  
  if (!hasBirminghamDupe1 && !hasBirminghamDupe2) {
    console.log('   🎉 Duplicate Birmingham redirects have been removed!\n');
  } else {
    console.log('   ❌ Some duplicate Birmingham redirects still exist!\n');
  }
} catch (error) {
  console.log(`   ❌ Error reading next.config.mjs: ${error.message}\n`);
}

console.log('🏁 Test completed!');
console.log('\n📝 Next steps:');
console.log('   1. Start the development server: npm run dev');
console.log('   2. Test these URLs in browser:');
console.log('      - http://localhost:3000/wolverhampton');
console.log('      - http://localhost:3000/solihull');
console.log('      - http://localhost:3000/birmingham');
console.log('   3. Check that they return 200 status codes instead of 308 redirects');
