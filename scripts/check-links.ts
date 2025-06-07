#!/usr/bin/env tsx

import * as linkinator from 'linkinator';
import fs from 'fs';
import path from 'path';

interface BrokenLinksReport {
  timestamp: string;
  summary: {
    total: number;
    broken: number;
    warnings: number;
    passed: number;
  };
  brokenLinks: any[];
  warnings: any[];
}

async function checkLinks(): Promise<void> {
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
    
    const results: any[] = [];
    const brokenLinks: any[] = [];
    const warningLinks: any[] = [];

    checker.on('link', (result: any) => {
      results.push(result);
      
      // Categorize and log results
      if (result.status === 200) {
        console.log(`✅ [${result.status}] ${result.url}`);
      } else if (result.status && result.status >= 400) {
        console.log(`❌ [${result.status}] ${result.url} (${result.statusText || 'Error'})`);
        brokenLinks.push(result);
      } else if (result.status && result.status >= 300 && result.status < 400) {
        console.log(`⚠️ [${result.status}] ${result.url} (${result.statusText || 'Redirect'})`);
        warningLinks.push(result);
      } else if (result.state === 'BROKEN') {
        console.log(`💥 [BROKEN] ${result.url} (${result.failureDetails || 'Unknown error'})`);
        brokenLinks.push(result);
      } else if (result.state === 'SKIPPED') {
        console.log(`⏭️ [SKIPPED] ${result.url}`);
      } else {
        console.log(`❓ [${result.status || 'UNKNOWN'}] ${result.url}`);
      }
    });

    // Start the check
    await checker.check(options);

    // Generate timestamp
    const timestamp = new Date().toISOString();
    
    // Create broken links report
    const brokenLinksReport: BrokenLinksReport = {
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

    // Save reports
    const reportsDir = path.join(process.cwd());
    
    // Save broken links report (main output)
    fs.writeFileSync(
      path.join(reportsDir, 'broken-links.json'), 
      JSON.stringify(brokenLinksReport, null, 2)
    );

    // Save full results for debugging
    fs.writeFileSync(
      path.join(reportsDir, 'all-links.json'), 
      JSON.stringify(results, null, 2)
    );

    // Save summary report
    const summaryReport = {
      timestamp,
      summary: brokenLinksReport.summary,
      topIssues: brokenLinks.slice(0, 10).map(link => ({
        url: link.url,
        status: link.status,
        parent: link.parent
      }))
    };

    fs.writeFileSync(
      path.join(reportsDir, 'link-check-summary.json'), 
      JSON.stringify(summaryReport, null, 2)
    );

    // Console summary
    console.log('\n📊 Link Check Summary:');
    console.log(`Total links checked: ${results.length}`);
    console.log(`✅ Passed: ${brokenLinksReport.summary.passed}`);
    console.log(`⚠️ Warnings (redirects): ${warningLinks.length}`);
    console.log(`❌ Broken: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.log('\n💥 Broken Links Found:');
      brokenLinks.slice(0, 10).forEach(link => {
        console.log(`  - ${link.url}`);
        console.log(`    Status: ${link.status || 'BROKEN'}`);
        console.log(`    Parent: ${link.parent || 'Unknown'}`);
        if (link.failureDetails) {
          console.log(`    Error: ${link.failureDetails}`);
        }
        console.log('');
      });
      
      if (brokenLinks.length > 10) {
        console.log(`  ... and ${brokenLinks.length - 10} more broken links`);
      }
      
      console.log(`\n📝 Full report saved to: broken-links.json`);
      console.log(`📝 Summary saved to: link-check-summary.json`);
      console.log(`📝 All links saved to: all-links.json`);
      
      // Exit with error code for CI/CD
      process.exit(1);
    } else {
      console.log('\n🎉 No broken links found!');
      console.log(`📝 Report saved to: broken-links.json`);
      console.log(`📝 Summary saved to: link-check-summary.json`);
    }

  } catch (error) {
    console.error('❌ Error during link checking:', error);
    
    // Save error report
    const errorReport = {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
    
    fs.writeFileSync(
      path.join(process.cwd(), 'link-check-error.json'), 
      JSON.stringify(errorReport, null, 2)
    );
    
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

// Run the check
checkLinks().catch(console.error);
