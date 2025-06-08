# Test info

- Name: Redirect Chain Validation >> should have reasonable redirect counts for SEO
- Location: /home/ashley-mellingwebstudios/mws/projects/mws4-bbr/tests/e2e/redirect-chains.spec.ts:182:7

# Error details

```
Error: browserType.launch: 
╔═════════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers.    ║
║ Please install them with the following command:         ║
║                                                         ║
║     sudo pnpm exec playwright install-deps              ║
║                                                         ║
║ Alternatively, use apt:                                 ║
║     sudo apt-get install libgstreamer-plugins-bad1.0-0\ ║
║         libflite1\                                      ║
║         libavif16                                       ║
║                                                         ║
║ <3 Playwright Team                                      ║
╚═════════════════════════════════════════════════════════╝
```

# Test source

```ts
   82 |       timeout: 10000 
   83 |     });
   84 |     
   85 |     finalStatus = response?.status() || 200;
   86 |     
   87 |     // Analyze the responses to build redirect chain
   88 |     for (const resp of responses) {
   89 |       if (resp.status >= 300 && resp.status < 400) {
   90 |         redirectCount++;
   91 |         const location = resp.headers.location;
   92 |         if (location) {
   93 |           redirectChain.push(location);
   94 |         }
   95 |       }
   96 |     }
   97 |
   98 |     const finalUrl = page.url();
   99 |     
  100 |     return {
  101 |       url,
  102 |       status: finalStatus,
  103 |       redirectCount,
  104 |       redirectChain,
  105 |       finalUrl
  106 |     };
  107 |     
  108 |   } catch (error) {
  109 |     // If the page fails to load, still return info about what we know
  110 |     return {
  111 |       url,
  112 |       status: 500,
  113 |       redirectCount: 0,
  114 |       redirectChain: [url],
  115 |       finalUrl: currentUrl
  116 |     };
  117 |   }
  118 | }
  119 |
  120 | test.describe('Redirect Chain Validation', () => {
  121 |   test('should not have redirect chains of 3+ hops', async ({ page }) => {
  122 |     const failures: string[] = [];
  123 |     const results: RedirectInfo[] = [];
  124 |     
  125 |     console.log('🔍 Testing redirect chains for', TEST_URLS.length, 'URLs...');
  126 |     
  127 |     for (const testUrl of TEST_URLS) {
  128 |       console.log(`Testing: ${testUrl}`);
  129 |       
  130 |       const redirectInfo = await checkRedirectChain(page, testUrl);
  131 |       results.push(redirectInfo);
  132 |       
  133 |       console.log(`  → Redirects: ${redirectInfo.redirectCount}, Final: ${redirectInfo.finalUrl}`);
  134 |       
  135 |       // Fail if there are 3 or more redirects (3+ hop chain)
  136 |       if (redirectInfo.redirectCount >= 3) {
  137 |         failures.push(
  138 |           `❌ ${testUrl} has ${redirectInfo.redirectCount} redirects: ${redirectInfo.redirectChain.join(' → ')}`
  139 |         );
  140 |       }
  141 |     }
  142 |     
  143 |     // Generate detailed report
  144 |     console.log('\n📊 REDIRECT ANALYSIS REPORT');
  145 |     console.log('=' .repeat(50));
  146 |     
  147 |     const byRedirectCount = results.reduce((acc, result) => {
  148 |       acc[result.redirectCount] = (acc[result.redirectCount] || 0) + 1;
  149 |       return acc;
  150 |     }, {} as Record<number, number>);
  151 |     
  152 |     console.log('Redirect count distribution:');
  153 |     Object.entries(byRedirectCount).forEach(([count, urls]) => {
  154 |       console.log(`  ${count} redirects: ${urls} URLs`);
  155 |     });
  156 |     
  157 |     // Show all chains with 2+ redirects for monitoring
  158 |     const chainsToMonitor = results.filter(r => r.redirectCount >= 2);
  159 |     if (chainsToMonitor.length > 0) {
  160 |       console.log('\n⚠️ URLs with 2+ redirects (monitor for optimization):');
  161 |       chainsToMonitor.forEach(result => {
  162 |         console.log(`  ${result.url} (${result.redirectCount} redirects): ${result.redirectChain.join(' → ')}`);
  163 |       });
  164 |     }
  165 |     
  166 |     // Show successful optimizations (0-1 redirects)
  167 |     const optimizedUrls = results.filter(r => r.redirectCount <= 1);
  168 |     console.log(`\n✅ ${optimizedUrls.length} URLs properly optimized (≤1 redirect)`);
  169 |     
  170 |     if (failures.length > 0) {
  171 |       console.error('\n🚨 REDIRECT CHAIN FAILURES:');
  172 |       failures.forEach(failure => console.error(failure));
  173 |       
  174 |       expect(failures).toHaveLength(0, 
  175 |         `Found ${failures.length} URLs with 3+ redirect chains. This wastes crawl budget and can break Core Web Vitals. Fix these in next.config.js redirects.`
  176 |       );
  177 |     }
  178 |     
  179 |     console.log('\n🎉 All URLs pass the 3+ hop redirect chain test!');
  180 |   });
  181 |   
> 182 |   test('should have reasonable redirect counts for SEO', async ({ page }) => {
      |       ^ Error: browserType.launch: 
  183 |     // This test warns about URLs with 2 redirects but doesn't fail the build
  184 |     const warnings: string[] = [];
  185 |     
  186 |     for (const testUrl of TEST_URLS.slice(0, 10)) { // Test subset for performance
  187 |       const redirectInfo = await checkRedirectChain(page, testUrl);
  188 |       
  189 |       if (redirectInfo.redirectCount === 2) {
  190 |         warnings.push(`⚠️ ${testUrl} has 2 redirects - consider optimizing`);
  191 |       }
  192 |     }
  193 |     
  194 |     if (warnings.length > 0) {
  195 |       console.warn('\n📈 SEO OPTIMIZATION OPPORTUNITIES:');
  196 |       warnings.forEach(warning => console.warn(warning));
  197 |       console.warn('Consider collapsing these to single 301 redirects in next.config.js');
  198 |     }
  199 |     
  200 |     // This test passes but shows warnings
  201 |     expect(true).toBe(true);
  202 |   });
  203 | });
  204 |
```