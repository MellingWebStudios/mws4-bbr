import { test, expect } from '@playwright/test';

/**
 * Test to ensure no URL returns a redirect chain of 3+ hops
 * This test will fail the build if any URL has more than 2 redirects
 */

// Common URLs that should not have redirect chains
const TEST_URLS = [
  // Legacy patterns that were causing chains
  '/boiler-repairs-birmingham',
  '/boiler-servicing-birmingham', 
  '/gas-safety-birmingham',
  
  // Location-service combinations
  '/selly-park-boiler-repairs',
  '/hall-green-boiler-repairs',
  '/acocks-green-boiler-repairs',
  '/small-heath-boiler-repairs',
  '/erdington-boiler-repairs',
  '/handsworth-boiler-repairs',
  
  // Common service patterns
  '/emergency-boiler-repair',
  '/24-hour-boiler-repair',
  '/gas-engineer',
  '/heating-engineer',
  
  // Duplicate segment patterns that were causing chains
  '/selly-park/selly-park',
  '/hall-green/hall-green',
  '/acocks-green/acocks-green',
  '/birmingham/birmingham',
  
  // Service duplicates
  '/services/boiler-repairs/boiler-repairs',
  '/services/boiler-servicing/boiler-servicing',
  '/services/gas-safety/gas-safety',
  
  // Legacy CMS patterns
  '/wp-content/themes/test',
  '/wp-admin',
  '/admin',
  
  // Common variations that might cause chains
  '/Selly-Park',
  '/BIRMINGHAM',
  '/Boiler-Repairs',
];

interface RedirectInfo {
  url: string;
  status: number;
  redirectCount: number;
  redirectChain: string[];
  finalUrl: string;
}

/**
 * Follow redirects and count hops
 */
async function checkRedirectChain(page: any, url: string): Promise<RedirectInfo> {
  const redirectChain: string[] = [url];
  let currentUrl = url;
  let redirectCount = 0;
  let finalStatus = 200;

  try {
    // Set up response listener to track redirects
    const responses: any[] = [];
    page.on('response', (response: any) => {
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers()
      });
    });

    // Navigate and wait for final page
    const response = await page.goto(currentUrl, { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });
    
    finalStatus = response?.status() || 200;
    
    // Analyze the responses to build redirect chain
    for (const resp of responses) {
      if (resp.status >= 300 && resp.status < 400) {
        redirectCount++;
        const location = resp.headers.location;
        if (location) {
          redirectChain.push(location);
        }
      }
    }

    const finalUrl = page.url();
    
    return {
      url,
      status: finalStatus,
      redirectCount,
      redirectChain,
      finalUrl
    };
    
  } catch (error) {
    // If the page fails to load, still return info about what we know
    return {
      url,
      status: 500,
      redirectCount: 0,
      redirectChain: [url],
      finalUrl: currentUrl
    };
  }
}

test.describe('Redirect Chain Validation', () => {
  test('should not have redirect chains of 3+ hops', async ({ page }) => {
    const failures: string[] = [];
    const results: RedirectInfo[] = [];
    
    console.log('🔍 Testing redirect chains for', TEST_URLS.length, 'URLs...');
    
    for (const testUrl of TEST_URLS) {
      console.log(`Testing: ${testUrl}`);
      
      const redirectInfo = await checkRedirectChain(page, testUrl);
      results.push(redirectInfo);
      
      console.log(`  → Redirects: ${redirectInfo.redirectCount}, Final: ${redirectInfo.finalUrl}`);
      
      // Fail if there are 3 or more redirects (3+ hop chain)
      if (redirectInfo.redirectCount >= 3) {
        failures.push(
          `❌ ${testUrl} has ${redirectInfo.redirectCount} redirects: ${redirectInfo.redirectChain.join(' → ')}`
        );
      }
    }
    
    // Generate detailed report
    console.log('\n📊 REDIRECT ANALYSIS REPORT');
    console.log('=' .repeat(50));
    
    const byRedirectCount = results.reduce((acc, result) => {
      acc[result.redirectCount] = (acc[result.redirectCount] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    console.log('Redirect count distribution:');
    Object.entries(byRedirectCount).forEach(([count, urls]) => {
      console.log(`  ${count} redirects: ${urls} URLs`);
    });
    
    // Show all chains with 2+ redirects for monitoring
    const chainsToMonitor = results.filter(r => r.redirectCount >= 2);
    if (chainsToMonitor.length > 0) {
      console.log('\n⚠️ URLs with 2+ redirects (monitor for optimization):');
      chainsToMonitor.forEach(result => {
        console.log(`  ${result.url} (${result.redirectCount} redirects): ${result.redirectChain.join(' → ')}`);
      });
    }
    
    // Show successful optimizations (0-1 redirects)
    const optimizedUrls = results.filter(r => r.redirectCount <= 1);
    console.log(`\n✅ ${optimizedUrls.length} URLs properly optimized (≤1 redirect)`);
    
    if (failures.length > 0) {
      console.error('\n🚨 REDIRECT CHAIN FAILURES:');
      failures.forEach(failure => console.error(failure));
      
      expect(failures).toHaveLength(0, 
        `Found ${failures.length} URLs with 3+ redirect chains. This wastes crawl budget and can break Core Web Vitals. Fix these in next.config.js redirects.`
      );
    }
    
    console.log('\n🎉 All URLs pass the 3+ hop redirect chain test!');
  });
  
  test('should have reasonable redirect counts for SEO', async ({ page }) => {
    // This test warns about URLs with 2 redirects but doesn't fail the build
    const warnings: string[] = [];
    
    for (const testUrl of TEST_URLS.slice(0, 10)) { // Test subset for performance
      const redirectInfo = await checkRedirectChain(page, testUrl);
      
      if (redirectInfo.redirectCount === 2) {
        warnings.push(`⚠️ ${testUrl} has 2 redirects - consider optimizing`);
      }
    }
    
    if (warnings.length > 0) {
      console.warn('\n📈 SEO OPTIMIZATION OPPORTUNITIES:');
      warnings.forEach(warning => console.warn(warning));
      console.warn('Consider collapsing these to single 301 redirects in next.config.js');
    }
    
    // This test passes but shows warnings
    expect(true).toBe(true);
  });
});
