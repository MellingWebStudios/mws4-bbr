#!/usr/bin/env node

// Test the duplicate segment detection logic
const { hasDuplicateSegments, removeDuplicateSegments } = require('./lib/url-validator.ts');

const testUrls = [
  '/acocks-green/acocks-green/',
  '/birmingham/birmingham/',
  '/hall-green/hall-green/',
  '/selly-park/selly-park/',
  '/selly-park/selly-park',
  '/Redditch/redditch',
  '/normal-url',
  '/location/service'
];

console.log('Testing duplicate segment detection:');
console.log('=====================================');

testUrls.forEach(url => {
  const hasDuplicates = hasDuplicateSegments(url);
  const cleaned = hasDuplicates ? removeDuplicateSegments(url) : 'no change needed';
  
  console.log(`URL: ${url}`);
  console.log(`  Has duplicates: ${hasDuplicates}`);
  console.log(`  Cleaned: ${cleaned}`);
  console.log('');
});
