#!/usr/bin/env node

const { linkinator } = require('linkinator');
const fs = require('fs');
const path = require('path');

async function checkLinks() {
  console.log('🔍 Starting comprehensive link check...');
  
  const options = {
    path: 'http://localhost:3000',
    port: 3000,
    recurse: true,
    skip: [
      'linkedin\\.com',
      'twitter\\.com', 
      'facebook\\.com',
      'instagram\\.com',
      'youtube\\.com',
      'pinterest\\.com',
      'tiktok\\.com',
      'snapchat\\.com'
    ],
    linksToSkip: [
      '^mailto:',
      '^tel:',
      '^javascript:',
      '^#',
      '\\?.*utm_',
      '\\?.*fbclid='
    ],
    concurrency: 10,
    timeout: 30000,
    retry: true,
    retryErrors: true,
    retryErrorsCount: 2,
    retryErrorsJitter: 1000,
    silent: false
  };

  try {
    const checker = new linkinator.LinkChecker();
    
    const results = [];
    const brokenLinks = [];
    const warningLinks = [];

    checker.on('link', (result) => {
      results.push(result);
      
      // Log progress
      if (result.status === 200) {
        console.log(`✅ [${result.status}] ${result.url}`);
      } else if (result.status >= 400) {
        console.log(`❌ [${result.status}] ${result.url} (${result.statusText || 'Error'})`);
        brokenLinks.push(result);
      } else if (result.status >= 300) {
        console.log(`⚠️ [${result.status}] ${result.url} (${result.statusText || 'Redirect'})`);
        warningLinks.push(result);
      } else if (result.state === 'BROKEN') {
        console.log(`💥 [BROKEN] ${result.url} (${result.failureDetails || 'Unknown error'})`);
        brokenLinks.push(result);
      } else if (result.state === 'SKIPPED') {
        console.log(`⏭️ [SKIPPED] ${result.url}`);
      }
    });

    // Start the check
    const finalResult = await checker.check(options);

    // Generate reports
    const timestamp = new Date().toISOString();
    
    // Broken links report (main focus)
    const brokenLinksReport = {
      timestamp,
      summary: {
        total: results.length,
        broken: brokenLinks.length,
        warnings: warningLinks.length,
        passed: results.length - brokenLinks.length - warningLinks.length
      },
      brokenLinks: brokenLinks.map(link => ({
        url: link.url,
        status: link.status,
        statusText: link.statusText,
        parent: link.parent,
        failureDetails: link.failureDetails,
        state: link.state
      })),
      warnings: warningLinks.map(link => ({
        url: link.url,
        status: link.status,
        statusText: link.statusText,
        parent: link.parent
      }))
    };

    // Save broken links report
    fs.writeFileSync(
      path.join(process.cwd(), 'broken-links.json'), 
      JSON.stringify(brokenLinksReport, null, 2)
    );

    // Save full results for debugging
    fs.writeFileSync(
      path.join(process.cwd(), 'all-links.json'), 
      JSON.stringify(results, null, 2)
    );

    // Console summary
    console.log('\n📊 Link Check Summary:');
    console.log(`Total links checked: ${results.length}`);
    console.log(`✅ Passed: ${results.length - brokenLinks.length - warningLinks.length}`);
    console.log(`⚠️ Warnings (redirects): ${warningLinks.length}`);
    console.log(`❌ Broken: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.log('\n💥 Broken Links Found:');
      brokenLinks.forEach(link => {
        console.log(`  - ${link.url} (Status: ${link.status || 'BROKEN'}, Parent: ${link.parent})`);
      });
      console.log(`\n📝 Full report saved to: broken-links.json`);
      process.exit(1); // Exit with error code
    } else {
      console.log('\n🎉 No broken links found!');
      console.log(`📝 Report saved to: broken-links.json`);
    }

  } catch (error) {
    console.error('❌ Error during link checking:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Link check interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Link check terminated');
  process.exit(0);
});

checkLinks().catch(console.error);
