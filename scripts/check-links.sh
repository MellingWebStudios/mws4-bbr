#!/bin/bash

echo "🔍 Starting comprehensive link check..."

# Run linkinator and capture output
echo "Running linkinator..."
npx linkinator http://localhost:3000 --config linkinator.json --json > all-links-temp.json 2>&1

# Check if linkinator ran (it returns 1 if broken links found, but that's expected)
if [ ! -f "all-links-temp.json" ]; then
    echo "❌ Linkinator failed to create output file"
    exit 1
fi

echo "Processing results..."

# Use Node.js to process the JSON and filter broken links
node -e "
const fs = require('fs');
const path = require('path');

try {
  const rawData = fs.readFileSync('all-links-temp.json', 'utf8');
  const lines = rawData.trim().split('\n');
  
  const results = [];
  const brokenLinks = [];
  const warnings = [];
  
  // Parse each line as JSON (linkinator outputs JSONL format)
  lines.forEach(line => {
    try {
      if (line.trim()) {
        const result = JSON.parse(line);
        results.push(result);
        
        // Categorize results
        if (result.status && result.status >= 400) {
          brokenLinks.push(result);
          console.log(\`❌ [\${result.status}] \${result.url} (\${result.statusText || 'Error'})\`);
        } else if (result.status && result.status >= 300 && result.status < 400) {
          warnings.push(result);
          console.log(\`⚠️ [\${result.status}] \${result.url} (\${result.statusText || 'Redirect'})\`);
        } else if (result.state === 'BROKEN') {
          brokenLinks.push(result);
          console.log(\`💥 [BROKEN] \${result.url} (\${result.failureDetails || 'Unknown error'})\`);
        } else if (result.status === 200) {
          console.log(\`✅ [\${result.status}] \${result.url}\`);
        } else if (result.state === 'SKIPPED') {
          console.log(\`⏭️ [SKIPPED] \${result.url}\`);
        }
      }
    } catch (e) {
      // Skip malformed lines
    }
  });
  
  // Generate report
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    summary: {
      total: results.length,
      broken: brokenLinks.length,
      warnings: warnings.length,
      passed: results.length - brokenLinks.length - warnings.length
    },
    brokenLinks: brokenLinks.map(link => ({
      url: link.url,
      status: link.status,
      statusText: link.statusText,
      parent: link.parent,
      failureDetails: link.failureDetails,
      state: link.state
    })),
    warnings: warnings.map(link => ({
      url: link.url,
      status: link.status,
      statusText: link.statusText,
      parent: link.parent
    }))
  };
  
  // Save reports
  fs.writeFileSync('broken-links.json', JSON.stringify(report, null, 2));
  fs.writeFileSync('all-links.json', JSON.stringify(results, null, 2));
  
  // Console summary
  console.log('');
  console.log('📊 Link Check Summary:');
  console.log(\`Total links checked: \${results.length}\`);
  console.log(\`✅ Passed: \${report.summary.passed}\`);
  console.log(\`⚠️ Warnings (redirects): \${warnings.length}\`);
  console.log(\`❌ Broken: \${brokenLinks.length}\`);
  
  if (brokenLinks.length > 0) {
    console.log('');
    console.log('💥 Broken Links Found:');
    brokenLinks.slice(0, 10).forEach(link => {
      console.log(\`  - \${link.url}\`);
      console.log(\`    Status: \${link.status || 'BROKEN'}\`);
      console.log(\`    Parent: \${link.parent || 'Unknown'}\`);
      if (link.failureDetails) {
        console.log(\`    Error: \${link.failureDetails}\`);
      }
      console.log('');
    });
    
    if (brokenLinks.length > 10) {
      console.log(\`  ... and \${brokenLinks.length - 10} more broken links\`);
    }
    
    console.log('📝 Full report saved to: broken-links.json');
    process.exit(1);
  } else {
    console.log('');
    console.log('🎉 No broken links found!');
    console.log('📝 Report saved to: broken-links.json');
  }
} catch (error) {
  console.error('❌ Error processing results:', error.message);
  process.exit(1);
}
"

# Clean up temp file
rm -f all-links-temp.json

echo "✅ Link check complete!"
