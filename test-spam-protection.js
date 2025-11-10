#!/usr/bin/env node

/**
 * Test script for spam protection in contact form
 * This script tests various spam scenarios to ensure the protection is working
 */

const BASE_URL = 'http://localhost:3000';

async function testSpamProtection() {
  console.log('🚀 Testing Contact Form Spam Protection\n');

  // Test cases
  const testCases = [
    {
      name: '✅ Valid Submission',
      data: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '07123456789',
        message: 'Hello, my boiler is not working properly. It started making strange noises yesterday and now there is no hot water. Could you please help?',
        boilerBrand: 'worcester-bosch',
        boilerModel: 'Greenstar 30CDi',
        problemType: 'no-hot-water',
        urgency: 'urgent',
        formStartTime: Date.now() - 30000, // 30 seconds ago
        submitTime: Date.now()
      },
      expectSuccess: true,
      description: 'Valid customer enquiry should pass'
    },
    {
      name: '🍯 Honeypot Triggered',
      data: {
        name: 'Bot User',
        email: 'bot@spam.com',
        phone: '07123456789',
        message: 'I need help with my boiler',
        website: 'https://spam-site.com', // Honeypot field filled
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: true, // Should return success but not send email
      description: 'Bot filling honeypot field should be silently blocked'
    },
    {
      name: '🤖 Random String Name',
      data: {
        name: 'jTXFiJxJxuGUGOkaVyQXxTK', // Similar to the spam example
        email: 'test@example.com',
        phone: '07123456789',
        message: 'I need help with my boiler heating system please',
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Random character string name should be rejected'
    },
    {
      name: '📝 Random String Message',
      data: {
        name: 'John Smith',
        email: 'test@example.com',
        phone: '07123456789',
        message: 'KatYaVoClpEgBMHnL', // Similar to spam message
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Random character message should be rejected'
    },
    {
      name: '🔧 Random Boiler Model',
      data: {
        name: 'John Smith',
        email: 'test@example.com',
        phone: '07123456789',
        message: 'My boiler is not working properly, can you help?',
        boilerModel: 'YDNAeVyFTVtaCAVdRyObaAYC', // Random string like spam
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Random boiler model should be rejected'
    },
    {
      name: '⚡ Too Fast Submission',
      data: {
        name: 'John Smith',
        email: 'test@example.com',
        phone: '07123456789',
        message: 'My boiler needs repair please help me',
        formStartTime: Date.now() - 5000, // Only 5 seconds to fill form
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Form filled too quickly should be rejected'
    },
    {
      name: '📞 Invalid Phone Format',
      data: {
        name: 'John Smith',
        email: 'test@example.com',
        phone: '123', // Too short
        message: 'My boiler is broken and needs fixing soon',
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Invalid phone number should be rejected'
    },
    {
      name: '📧 Invalid Email',
      data: {
        name: 'John Smith',
        email: 'not-an-email',
        phone: '07123456789',
        message: 'My boiler is broken and needs fixing soon',
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Invalid email should be rejected'
    },
    {
      name: '💬 Poor Quality Message',
      data: {
        name: 'John Smith',
        email: 'test@example.com',
        phone: '07123456789',
        message: 'xyz abc def', // No meaningful content
        formStartTime: Date.now() - 20000,
        submitTime: Date.now()
      },
      expectSuccess: false,
      description: 'Low quality message should be rejected'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`);
      console.log(`Description: ${testCase.description}`);

      const response = await fetch(`${BASE_URL}/api/contact-resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });

      const result = await response.json();
      const isSuccess = response.ok && result.success;

      if (isSuccess === testCase.expectSuccess) {
        console.log('✅ PASSED');
        passed++;
      } else {
        console.log('❌ FAILED');
        console.log(`Expected success: ${testCase.expectSuccess}, Got success: ${isSuccess}`);
        console.log('Response:', result);
        failed++;
      }

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.log('❌ ERROR:', error.message);
      failed++;
    }
    
    console.log('─'.repeat(50));
  }

  // Rate limiting test
  console.log('\n🚦 Testing Rate Limiting...');
  const rateLimitData = {
    name: 'Rate Limit Test',
    email: 'rate@test.com',
    phone: '07123456789',
    message: 'This is a rate limit test message',
    formStartTime: Date.now() - 20000,
    submitTime: Date.now()
  };

  let rateLimitTriggered = false;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/contact-resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rateLimitData)
      });

      if (response.status === 429) {
        console.log(`✅ Rate limit triggered after ${i + 1} requests`);
        rateLimitTriggered = true;
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log('Error in rate limit test:', error.message);
    }
  }

  if (rateLimitTriggered) {
    passed++;
  } else {
    console.log('❌ Rate limiting not working properly');
    failed++;
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed === 0) {
    console.log('\n🎉 All spam protection tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the spam protection implementation.');
  }
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await fetch(`${BASE_URL}/api/contact-resend`, {
      method: 'OPTIONS'
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function main() {
  const isServerRunning = await checkServer();
  
  if (!isServerRunning) {
    console.log('❌ Server is not running. Please start the development server first:');
    console.log('   npm run dev');
    console.log('   or');
    console.log('   pnpm dev');
    process.exit(1);
  }

  await testSpamProtection();
}

main().catch(console.error);
