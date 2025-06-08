#!/usr/bin/env node

const http = require('http');

async function checkStatusCode(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js HTTP Client'
      }
    };

    const req = http.request(options, (res) => {
      resolve({
        url: url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        location: res.headers.location || 'N/A'
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testUrls() {
  const testUrls = [
    'http://localhost:3002/birmingham',
    'http://localhost:3002/wolverhampton', 
    'http://localhost:3002/solihull'
  ];

  console.log('🧪 Testing HTTP Status Codes for Location Fixes\n');

  for (const url of testUrls) {
    try {
      const result = await checkStatusCode(url);
      const status = result.statusCode === 200 ? '✅' : result.statusCode === 308 ? '❌' : '⚠️';
      console.log(`${status} ${url}`);
      console.log(`   Status: ${result.statusCode} ${result.statusMessage}`);
      if (result.location !== 'N/A') {
        console.log(`   Redirect: ${result.location}`);
      }
      console.log('');
    } catch (error) {
      console.log(`❌ ${url}`);
      console.log(`   Error: ${error.message}\n`);
    }
  }

  console.log('🏁 Status Code Test Complete!');
  console.log('\n📊 Expected Results:');
  console.log('   ✅ = 200 OK (fixed!)');
  console.log('   ❌ = 308 Permanent Redirect (still broken)');
  console.log('   ⚠️ = Other status code');
}

testUrls().catch(console.error);
