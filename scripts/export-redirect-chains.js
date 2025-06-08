#!/usr/bin/env node

/**
 * Export Redirect Chains CSV
 * Generates a CSV file with all redirect patterns for analysis
 */

const fs = require('fs');
const path = require('path');

// Import the redirect configuration from next.config.mjs
async function loadRedirectConfig() {
  try {
    // Read the next.config.mjs file
    const configPath = path.join(__dirname, '..', 'next.config.mjs');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Extract the redirects array using regex (since it's not a pure JSON)
    const redirectsMatch = configContent.match(/async redirects\(\) \{[\s\S]*?return \[([\s\S]*?)\];[\s\S]*?\}/);
    
    if (!redirectsMatch) {
      throw new Error('Could not find redirects configuration');
    }
    
    const redirectsArrayContent = redirectsMatch[1];
    
    // Parse each redirect object using regex
    const redirectRegex = /\{[\s\S]*?source:\s*['"`]([^'"`]+)['"`][\s\S]*?destination:\s*['"`]([^'"`]+)['"`][\s\S]*?permanent:\s*(true|false)[\s\S]*?\}/g;
    
    const redirects = [];
    let match;
    
    while ((match = redirectRegex.exec(redirectsArrayContent)) !== null) {
      redirects.push({
        source: match[1],
        destination: match[2],
        permanent: match[3] === 'true'
      });
    }
    
    return redirects;
  } catch (error) {
    console.error('Error loading redirect config:', error.message);
    return [];
  }
}

// Analyze redirects for potential chains
function analyzeRedirectChains(redirects) {
  const redirectMap = new Map();
  
  // Build a map of source -> destination
  redirects.forEach(redirect => {
    redirectMap.set(redirect.source, redirect.destination);
  });
  
  const chains = [];
  
  redirects.forEach(redirect => {
    const chain = [redirect.source];
    let current = redirect.destination;
    let hopCount = 0;
    const maxHops = 10; // Prevent infinite loops
    
    // Follow the chain
    while (redirectMap.has(current) && hopCount < maxHops) {
      chain.push(current);
      current = redirectMap.get(current);
      hopCount++;
    }
    
    // Add final destination
    chain.push(current);
    
    chains.push({
      originalSource: redirect.source,
      finalDestination: current,
      hopCount: hopCount + 1, // +1 for the initial redirect
      fullChain: chain,
      permanent: redirect.permanent,
      chainLength: chain.length,
      hasChain: chain.length > 2,
      isProblematic: chain.length > 3 // 3+ hop chains are problematic
    });
  });
  
  return chains;
}

// Generate CSV content
function generateCSV(chains) {
  const headers = [
    'Original Source',
    'Final Destination', 
    'Hop Count',
    'Chain Length',
    'Has Chain (2+ hops)',
    'Problematic (3+ hops)',
    'Permanent',
    'Full Chain'
  ];
  
  const rows = chains.map(chain => [
    chain.originalSource,
    chain.finalDestination,
    chain.hopCount,
    chain.chainLength,
    chain.hasChain ? 'YES' : 'NO',
    chain.isProblematic ? 'YES' : 'NO',
    chain.permanent ? 'YES' : 'NO',
    chain.fullChain.join(' → ')
  ]);
  
  // Escape CSV values
  const escapeCSV = (value) => {
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };
  
  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(escapeCSV).join(','))
  ].join('\n');
  
  return csvContent;
}

// Generate analysis report
function generateAnalysisReport(chains) {
  const report = {
    totalRedirects: chains.length,
    directRedirects: chains.filter(c => c.chainLength === 2).length,
    twoHopChains: chains.filter(c => c.chainLength === 3).length,
    threeHopChains: chains.filter(c => c.chainLength === 4).length,
    longerChains: chains.filter(c => c.chainLength > 4).length,
    problematicChains: chains.filter(c => c.isProblematic).length
  };
  
  const longestChain = chains.reduce((max, chain) => 
    chain.chainLength > max.chainLength ? chain : max, chains[0]);
  
  const problematicChains = chains.filter(c => c.isProblematic);
  
  return {
    ...report,
    longestChain,
    problematicChains,
    efficiency: ((report.directRedirects / report.totalRedirects) * 100).toFixed(1),
    needsOptimization: report.twoHopChains + report.threeHopChains + report.longerChains
  };
}

// Main execution
async function main() {
  console.log('🔍 Analyzing redirect chains...\n');
  
  const redirects = await loadRedirectConfig();
  
  if (redirects.length === 0) {
    console.error('❌ No redirects found in configuration');
    process.exit(1);
  }
  
  console.log(`Found ${redirects.length} redirect rules`);
  
  const chains = analyzeRedirectChains(redirects);
  const analysis = generateAnalysisReport(chains);
  
  // Generate CSV
  const csvContent = generateCSV(chains);
  const csvPath = path.join(__dirname, '..', 'redirect-chains-analysis.csv');
  fs.writeFileSync(csvPath, csvContent);
  
  // Generate JSON analysis
  const analysisPath = path.join(__dirname, '..', 'redirect-chains-report.json');
  fs.writeFileSync(analysisPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    analysis,
    chains
  }, null, 2));
  
  // Print summary
  console.log('\n📊 REDIRECT CHAIN ANALYSIS');
  console.log('=' .repeat(40));
  console.log(`Total redirects: ${analysis.totalRedirects}`);
  console.log(`Direct redirects (optimal): ${analysis.directRedirects}`);
  console.log(`2-hop chains: ${analysis.twoHopChains}`);
  console.log(`3-hop chains: ${analysis.threeHopChains}`);
  console.log(`4+ hop chains: ${analysis.longerChains}`);
  console.log(`Efficiency: ${analysis.efficiency}%`);
  
  if (analysis.problematicChains.length > 0) {
    console.log(`\n🚨 ${analysis.problematicChains.length} PROBLEMATIC CHAINS (3+ hops):`);
    analysis.problematicChains.forEach(chain => {
      console.log(`  ${chain.originalSource} → ${chain.finalDestination} (${chain.hopCount} hops)`);
    });
  }
  
  if (analysis.longestChain) {
    console.log(`\n📏 Longest chain: ${analysis.longestChain.chainLength} hops`);
    console.log(`   ${analysis.longestChain.fullChain.join(' → ')}`);
  }
  
  console.log(`\n📄 Files generated:`);
  console.log(`   CSV: ${csvPath}`);
  console.log(`   Analysis: ${analysisPath}`);
  
  if (analysis.problematicChains.length > 0) {
    console.log(`\n⚠️  Found ${analysis.problematicChains.length} problematic redirect chains!`);
    console.log('   These should be optimized to prevent crawl budget waste.');
    process.exit(1);
  }
  
  console.log('\n✅ All redirect chains are optimized!');
}

if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}

module.exports = {
  loadRedirectConfig,
  analyzeRedirectChains,
  generateCSV,
  generateAnalysisReport
};
