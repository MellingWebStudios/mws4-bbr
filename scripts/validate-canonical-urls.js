#!/usr/bin/env node

/**
 * Canonical URL Validation Tool
 * 
 * This script helps identify and fix canonical URL issues that cause
 * "Alternative page with proper canonical tag" problems in Google Search Console.
 * 
 * Usage:
 * node scripts/validate-canonical-urls.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read sitemap and validate all URLs
function validateSitemapUrls() {
  console.log('🔍 Validating canonical URLs in sitemap...\n');
  
  const sitemapPath = join(__dirname, '../public/sitemap.xml');
  const sitemapContent = readFileSync(sitemapPath, 'utf8');
  
  // Extract all URLs from sitemap
  const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
  
  const issues = [];
  const canonicalBase = 'https://www.birminghamboilerrepairs.uk';
  
  urls.forEach((url, index) => {
    const urlObj = new URL(url);
    
    // Check 1: Protocol must be HTTPS
    if (urlObj.protocol !== 'https:') {
      issues.push({
        line: index + 1,
        url,
        issue: 'Non-HTTPS protocol',
        fix: url.replace('http:', 'https:')
      });
    }
    
    // Check 2: Must use www subdomain
    if (urlObj.hostname !== 'www.birminghamboilerrepairs.uk') {
      issues.push({
        line: index + 1,
        url,
        issue: 'Missing www subdomain',
        fix: url.replace(urlObj.hostname, 'www.birminghamboilerrepairs.uk')
      });
    }
    
    // Check 3: Path must be lowercase (except for XML declarations)
    if (urlObj.pathname !== urlObj.pathname.toLowerCase()) {
      issues.push({
        line: index + 1,
        url,
        issue: 'Uppercase characters in path',
        fix: `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname.toLowerCase()}${urlObj.search}`
      });
    }
    
    // Check 4: No trailing slashes (except root)
    if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
      issues.push({
        line: index + 1,
        url,
        issue: 'Trailing slash on non-root path',
        fix: url.replace(/\/$/, '')
      });
    }
  });
  
  if (issues.length === 0) {
    console.log('✅ All URLs in sitemap are properly canonicalized!');
    return true;
  }
  
  console.log(`❌ Found ${issues.length} canonicalization issues:\n`);
  
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue.issue}`);
    console.log(`   URL: ${issue.url}`);
    console.log(`   Fix: ${issue.fix}\n`);
  });
  
  return false;
}

// Generate .htaccess rules for Apache servers (if needed)
function generateHtaccessRules() {
  console.log('📝 Generating .htaccess rules for canonical URL enforcement...\n');
  
  const htaccessRules = `# Canonical URL Enforcement for Birmingham Boiler Repairs
# Automatically generated - DO NOT EDIT MANUALLY

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://www.birminghamboilerrepairs.uk%{REQUEST_URI} [L,R=301]

# Force www subdomain
RewriteCond %{HTTP_HOST} ^birminghamboilerrepairs\.uk$ [NC]
RewriteRule ^(.*)$ https://www.birminghamboilerrepairs.uk/$1 [L,R=301]

# Force lowercase URLs for location and service pages
RewriteMap lc int:tolower
RewriteRule ^([A-Z][^/]*)/(.*)$ /\${lc:$1}/$2 [R=301,L]
RewriteRule ^([^/]*)/([A-Z][^/]*)/?$ /$1/\${lc:$2} [R=301,L]

# Remove trailing slashes (except root)
RewriteCond %{REQUEST_URI} !^/$
RewriteRule ^(.*)/$ /$1 [R=301,L]
`;

  writeFileSync(join(__dirname, '../.htaccess'), htaccessRules);
  console.log('✅ .htaccess file generated successfully!');
}

// Generate Nginx rules (if needed)
function generateNginxRules() {
  console.log('📝 Generating Nginx rules for canonical URL enforcement...\n');
  
  const nginxRules = `# Canonical URL Enforcement for Birmingham Boiler Repairs
# Add these rules to your Nginx server block

# Force HTTPS and www
if ($scheme != "https") {
    return 301 https://www.birminghamboilerrepairs.uk$request_uri;
}

if ($host != "www.birminghamboilerrepairs.uk") {
    return 301 https://www.birminghamboilerrepairs.uk$request_uri;
}

# Force lowercase URLs
location ~ ^/([A-Z][^/]*)/(.*)$ {
    return 301 /\${1,,,}/$2;
}

location ~ ^/([^/]*)/([A-Z][^/]*)/?$ {
    return 301 /$1/\${2,,,};
}

# Remove trailing slashes (except root)
location ~ ^(.+)/$ {
    return 301 $1;
}
`;

  writeFileSync(join(__dirname, '../nginx-canonical-rules.conf'), nginxRules);
  console.log('✅ Nginx rules generated successfully!');
}

// Generate a comprehensive redirect mapping
function generateRedirectMapping() {
  console.log('📝 Generating redirect mapping for common canonicalization issues...\n');
  
  // Common location variations that need fixing
  const locationVariations = [
    { from: 'Acocks-Green', to: 'acocks-green' },
    { from: 'Aston-Cross', to: 'aston-cross' },
    { from: 'Bartley-Green', to: 'bartley-green' },
    { from: 'Camp-Hill', to: 'camp-hill' },
    { from: 'Castle-Vale', to: 'castle-vale' },
    { from: 'Chad-Valley', to: 'chad-valley' },
    { from: 'Four-Oaks', to: 'four-oaks' },
    { from: 'Garretts-Green', to: 'garretts-green' },
    { from: 'Gospel-Oak', to: 'gospel-oak' },
    { from: 'Gosta-Green', to: 'gosta-green' },
    { from: 'Gravelly-Hill', to: 'gravelly-hill' },
    { from: 'Great-Barr', to: 'great-barr' },
    { from: 'Hall-Green', to: 'hall-green' },
    { from: 'Handsworth-Wood', to: 'handsworth-wood' },
    { from: 'Hay-Mills', to: 'hay-mills' },
    { from: 'High-Heath', to: 'high-heath' },
    { from: 'Hill-Hook', to: 'hill-hook' },
    { from: 'Hill-Wood', to: 'hill-wood' },
    { from: 'Hodge-Hill', to: 'hodge-hill' },
    { from: 'Kings-Heath', to: 'kings-heath' },
    { from: 'Kings-Norton', to: 'kings-norton' },
    { from: 'Old-Oscott', to: 'old-oscott' },
    { from: 'Perry-Barr', to: 'perry-barr' },
    { from: 'Perry-Beeches', to: 'perry-beeches' },
    { from: 'Pype-Hayes', to: 'pype-hayes' },
    { from: 'Selly-Oak', to: 'selly-oak' },
    { from: 'Selly-Park', to: 'selly-park' },
    { from: 'Shard-End', to: 'shard-end' },
    { from: 'Shenley-Fields', to: 'shenley-fields' },
    { from: 'Short-Heath', to: 'short-heath' },
    { from: 'Small-Heath', to: 'small-heath' },
    { from: 'South-Woodgate', to: 'south-woodgate' },
    { from: 'Stockland-Green', to: 'stockland-green' },
    { from: 'Sutton-Coldfield', to: 'sutton-coldfield' },
    { from: 'The-Parade', to: 'the-parade' },
    { from: 'Turves-Green', to: 'turves-green' },
    { from: 'Ward-End', to: 'ward-end' },
    { from: 'Weoley-Castle', to: 'weoley-castle' },
    { from: 'Yardley-Wood', to: 'yardley-wood' }
  ];
  
  const services = [
    'boiler-repairs',
    'boiler-servicing', 
    'gas-safety',
    'combination-boiler-repairs',
    'ferroli-specialists'
  ];
  
  let redirects = [];
  
  // Generate redirects for all case variations
  locationVariations.forEach(location => {
    // Location only redirects
    redirects.push({
      from: `https://birminghamboilerrepairs.uk/${location.from}`,
      to: `https://www.birminghamboilerrepairs.uk/${location.to}`,
      type: '301'
    });
    
    redirects.push({
      from: `https://www.birminghamboilerrepairs.uk/${location.from}`,
      to: `https://www.birminghamboilerrepairs.uk/${location.to}`,
      type: '301'
    });
    
    // Location + service redirects
    services.forEach(service => {
      redirects.push({
        from: `https://birminghamboilerrepairs.uk/${location.from}/${service}`,
        to: `https://www.birminghamboilerrepairs.uk/${location.to}/${service}`,
        type: '301'
      });
      
      redirects.push({
        from: `https://www.birminghamboilerrepairs.uk/${location.from}/${service}`,
        to: `https://www.birminghamboilerrepairs.uk/${location.to}/${service}`,
        type: '301'
      });
      
      // Also handle service case variations
      const serviceUpper = service.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('-');
      
      if (serviceUpper !== service) {
        redirects.push({
          from: `https://birminghamboilerrepairs.uk/${location.to}/${serviceUpper}`,
          to: `https://www.birminghamboilerrepairs.uk/${location.to}/${service}`,
          type: '301'
        });
        
        redirects.push({
          from: `https://www.birminghamboilerrepairs.uk/${location.to}/${serviceUpper}`,
          to: `https://www.birminghamboilerrepairs.uk/${location.to}/${service}`,
          type: '301'
        });
      }
    });
  });
  
  const redirectJson = JSON.stringify(redirects, null, 2);
  writeFileSync(join(__dirname, '../canonical-redirects.json'), redirectJson);
  
  console.log(`✅ Generated ${redirects.length} redirect rules!`);
  console.log('   Saved to: canonical-redirects.json\n');
  
  return redirects;
}

// Generate Next.js redirects for next.config.mjs
function generateNextJSRedirects() {
  console.log('📝 Generating Next.js redirect rules...\n');
  
  const nextJSRedirects = `
// Canonical URL enforcement redirects for Next.js
// Add these to your next.config.mjs redirects array

// Force lowercase location slugs
{
  source: '/:location((?:[A-Z][a-z-]*)+)/:path*',
  destination: '/:location/:path*',
  permanent: true,
  has: [
    {
      type: 'host',
      value: 'www.birminghamboilerrepairs.uk'
    }
  ],
  beforeFiles: true
},

// Force www subdomain
{
  source: '/:path*',
  has: [
    {
      type: 'host',
      value: 'birminghamboilerrepairs.uk'
    }
  ],
  destination: 'https://www.birminghamboilerrepairs.uk/:path*',
  permanent: true
}
`;

  writeFileSync(join(__dirname, '../nextjs-canonical-redirects.js'), nextJSRedirects);
  console.log('✅ Next.js redirect rules generated successfully!');
}

// Main execution
async function main() {
  console.log('🚀 Birmingham Boiler Repairs - Canonical URL Validation Tool\n');
  console.log('This tool helps resolve "Alternative page with proper canonical tag" issues.\n');
  
  const isValid = validateSitemapUrls();
  
  if (!isValid) {
    console.log('⚠️  Issues found. Generating fix tools...\n');
  }
  
  generateRedirectMapping();
  generateHtaccessRules();
  generateNginxRules();
  generateNextJSRedirects();
  
  console.log('\n🎉 Canonical URL validation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the generated redirect rules');
  console.log('2. Update your server configuration with appropriate rules');  
  console.log('3. Submit the corrected sitemap to Google Search Console');
  console.log('4. Request re-indexing of affected pages');
  console.log('5. Monitor Search Console for the next few weeks');
  
  console.log('\n📚 Files generated:');
  console.log('- .htaccess (Apache server rules)');
  console.log('- nginx-canonical-rules.conf (Nginx server rules)');
  console.log('- nextjs-canonical-redirects.js (Next.js redirect rules)');
  console.log('- canonical-redirects.json (Complete redirect mapping)');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { validateSitemapUrls, generateRedirectMapping };
