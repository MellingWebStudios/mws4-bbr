#!/usr/bin/env node

// Quick test to reproduce Dave's exact spam scenario

async function testDaveSpamExample() {
  console.log('🧪 Testing Dave\'s exact spam example...\n');

  const spamData = {
    name: 'jTXFiJxJxuGUGOkaVyQXxTK',
    email: 'edlakeshoremed@aol.com', 
    phone: '6637226100',
    message: 'KatYaVoClpEgBMHnL',
    boilerBrand: 'Vaillant',
    boilerModel: 'YDNAeVyFTVtaCAVdRyObaAYC',
    problemType: 'radiator-issues',
    urgency: 'normal',
    formStartTime: Date.now() - 15000, // 15 seconds ago
    submitTime: Date.now()
  };

  try {
    const response = await fetch('http://localhost:3000/api/contact-resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spamData)
    });

    const result = await response.json();
    
    console.log('📤 Submitted Dave\'s spam data:');
    console.log(`   Name: ${spamData.name}`);
    console.log(`   Message: ${spamData.message}`);
    console.log(`   Boiler Model: ${spamData.boilerModel}`);
    console.log('');
    
    if (response.ok && result.success) {
      console.log('❌ PROBLEM: Spam was NOT blocked!');
      console.log('Response:', result);
    } else {
      console.log('✅ SUCCESS: Spam was blocked!');
      console.log('🛡️  Protection triggered:', result.errors || result.message);
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testDaveSpamExample();
