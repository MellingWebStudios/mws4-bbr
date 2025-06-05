const http = require('http');

// Test homepage
function testPage(path, description) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const sizeKB = (Buffer.byteLength(data, 'utf8') / 1024).toFixed(2);
        console.log(`${description}: ${sizeKB} kB`);
        
        // Count JSON-LD blocks
        const jsonLdBlocks = (data.match(/<script type="application\/ld\+json">/g) || []).length;
        console.log(`  - JSON-LD blocks: ${jsonLdBlocks}`);
        
        // Check for location arrays in schema
        const locationMatches = data.match(/"areaServed":\s*\[[^\]]*\]/g);
        if (locationMatches) {
          const areaServedLength = locationMatches[0].split(',').length;
          console.log(`  - Areas served count: ${areaServedLength}`);
        }
        
        console.log('---');
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error(`Error testing ${description}: ${e.message}`);
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing HTML sizes after schema optimization...\n');
  
  await testPage('/', 'Homepage');
  await testPage('/birmingham', 'Birmingham location page');
  await testPage('/acocks-green', 'Acocks Green location page');
  
  console.log('Testing complete!');
}

runTests();
