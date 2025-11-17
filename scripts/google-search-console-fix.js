/**
 * Google Search Console Canonical URL Fix Helper
 * 
 * This script helps you resolve the "Alternative page with proper canonical tag" issue
 * by generating a list of canonical URLs to submit for re-indexing in Google Search Console.
 */

// URLs from your Google Search Console that need canonical fixes
const problematicUrls = [
  'https://birminghamboilerrepairs.uk/Highgate/gas-safety',
  'https://birminghamboilerrepairs.uk/soho/ferroli-specialists',
  'https://birminghamboilerrepairs.uk/shard-end/gas-safety',
  'https://www.birminghamboilerrepairs.uk/California/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Ridgacre/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Soho/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Ridgacre/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Greet/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Soho/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Peddimore/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Peddimore/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Smithfield/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Hamstead/gas-safety',
  'https://www.birminghamboilerrepairs.uk/Billesley/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Hopwood/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Hopwood/boiler-repairs',
  'https://birminghamboilerrepairs.uk/Smithfield/gas-safety',
  'https://birminghamboilerrepairs.uk/smithfield/gas-safety',
  'https://birminghamboilerrepairs.uk/short-heath/boiler-servicing',
  'https://birminghamboilerrepairs.uk/handsworth-wood/ferroli-specialists',
  'https://www.birminghamboilerrepairs.uk/Aston/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Gilbertstone/boiler-servicing',
  'https://birminghamboilerrepairs.uk/gosta-green/boiler-repairs',
  'https://birminghamboilerrepairs.uk/Soho/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/California/gas-safety',
  'https://birminghamboilerrepairs.uk/greet/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Eastside/boiler-servicing',
  'https://birminghamboilerrepairs.uk/handsworth-wood/boiler-repairs',
  'https://birminghamboilerrepairs.uk/handsworth/boiler-repairs',
  'https://birminghamboilerrepairs.uk/high-heath/gas-safety',
  'https://birminghamboilerrepairs.uk/harborne/gas-safety',
  'https://birminghamboilerrepairs.uk/Billesley/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Pheasey/boiler-repairs',
  'https://birminghamboilerrepairs.uk/soho/gas-safety',
  'https://birminghamboilerrepairs.uk/Quinton/boiler-servicing',
  'https://birminghamboilerrepairs.uk/shenley-fields/ferroli-specialists',
  'https://birminghamboilerrepairs.uk/Quinton/boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Soho/combination-boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Bournbrook/combination-boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Edgbaston/gas-safety',
  'https://birminghamboilerrepairs.uk/Catshill/boiler-servicing',
  'https://birminghamboilerrepairs.uk/sparkhill/boiler-servicing',
  'https://www.birminghamboilerrepairs.uk/Greet/combination-boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Bordesley/combination-boiler-repairs',
  'https://birminghamboilerrepairs.uk/Redditch/combination-boiler-repairs',
  'https://www.birminghamboilerrepairs.uk/Sparkhill/boiler-servicing',
  'https://birminghamboilerrepairs.uk/Frankley/boiler-servicing',
  'https://birminghamboilerrepairs.uk/aston/boiler-servicing',
  'https://birminghamboilerrepairs.uk/small-heath/boiler-repairs',
  'https://birminghamboilerrepairs.uk/shenley-fields/gas-safety',
  'https://birminghamboilerrepairs.uk/Rednal/boiler-repairs'
];

/**
 * Generate canonical URLs for all problematic URLs
 */
function generateCanonicalUrls() {
  console.log('🔄 Converting problematic URLs to canonical format...\n');
  
  const canonicalUrls = problematicUrls.map(url => {
    // Parse the URL
    const urlObj = new URL(url);
    
    // Force canonical domain
    const canonicalHost = 'www.birminghamboilerrepairs.uk';
    const canonicalProtocol = 'https:';
    
    // Force lowercase path
    const canonicalPath = urlObj.pathname.toLowerCase();
    
    // Construct canonical URL
    const canonicalUrl = `${canonicalProtocol}//${canonicalHost}${canonicalPath}`;
    
    return {
      original: url,
      canonical: canonicalUrl,
      needsChange: url !== canonicalUrl
    };
  });
  
  return canonicalUrls;
}

/**
 * Generate submission lists for Google Search Console
 */
function generateSubmissionLists() {
  const urlMappings = generateCanonicalUrls();
  const uniqueCanonicalUrls = [...new Set(urlMappings.map(m => m.canonical))];
  
  console.log('📊 Summary:');
  console.log(`- Total problematic URLs: ${urlMappings.length}`);
  console.log(`- Unique canonical URLs: ${uniqueCanonicalUrls.length}`);
  console.log(`- URLs that need redirects: ${urlMappings.filter(m => m.needsChange).length}\n`);
  
  // List for Google Search Console URL removal
  const urlsToRemove = urlMappings
    .filter(m => m.needsChange)
    .map(m => m.original);
  
  console.log('🗑️  URLs to REMOVE from Google Search Console:');
  console.log('(Submit these for removal as they are non-canonical duplicates)\n');
  urlsToRemove.forEach(url => console.log(url));
  
  console.log('\n✅ Canonical URLs to RE-INDEX in Google Search Console:');
  console.log('(Submit these for fresh indexing as the preferred versions)\n');
  uniqueCanonicalUrls.forEach(url => console.log(url));
  
  console.log('\n📋 Action Plan for Google Search Console:');
  console.log('1. Go to Google Search Console > Removals');
  console.log('2. Submit "Temporarily remove" requests for all non-canonical URLs above');
  console.log('3. Go to URL Inspection tool');
  console.log('4. Submit "Request indexing" for all canonical URLs above');
  console.log('5. Wait 24-48 hours for redirects to take effect');
  console.log('6. Monitor the "Page indexing" report for improvements');
  
  return {
    toRemove: urlsToRemove,
    toIndex: uniqueCanonicalUrls,
    mappings: urlMappings
  };
}

/**
 * Generate a robots.txt validation
 */
function validateRobotsConfiguration() {
  console.log('\n🤖 Robots.txt validation:');
  console.log('Ensure your robots.txt contains:');
  console.log('```');
  console.log('User-agent: *');
  console.log('Allow: /');
  console.log('Disallow: /api/');
  console.log('Disallow: /_next/');
  console.log('');
  console.log('Sitemap: https://www.birminghamboilerrepairs.uk/sitemap.xml');
  console.log('```\n');
}

/**
 * Generate htaccess rules for canonical enforcement
 */
function generateHtaccessRules() {
  console.log('🔧 Apache .htaccess rules for canonical URL enforcement:');
  console.log('```apache');
  console.log('RewriteEngine On');
  console.log('');
  console.log('# Force HTTPS');
  console.log('RewriteCond %{HTTPS} off');
  console.log('RewriteRule ^(.*)$ https://www.birminghamboilerrepairs.uk%{REQUEST_URI} [L,R=301]');
  console.log('');
  console.log('# Force www subdomain');
  console.log('RewriteCond %{HTTP_HOST} ^birminghamboilerrepairs\\.uk$ [NC]');
  console.log('RewriteRule ^(.*)$ https://www.birminghamboilerrepairs.uk/$1 [L,R=301]');
  console.log('');
  console.log('# Force lowercase URLs');
  console.log('RewriteCond %{REQUEST_URI} [A-Z]');
  console.log('RewriteRule ^(.*)$ ${lc:$1} [R=301,L]');
  console.log('```\n');
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Birmingham Boiler Repairs - Google Search Console Fix Helper\n');
  console.log('This tool helps resolve "Alternative page with proper canonical tag" issues.\n');
  
  const results = generateSubmissionLists();
  validateRobotsConfiguration();
  generateHtaccessRules();
  
  console.log('⚡ Quick Actions:');
  console.log('1. Deploy the updated middleware.ts with canonical redirects');
  console.log('2. Test a few URLs to ensure redirects work correctly');
  console.log('3. Submit URL removals and indexing requests in Search Console');
  console.log('4. Monitor improvements over the next 2-4 weeks');
  console.log('');
  console.log('💡 Pro tip: Focus on high-traffic URLs first for faster impact!');
  
  return results;
}

// Run the script
main();
