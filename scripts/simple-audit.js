#!/usr/bin/env node

/**
 * Simple Internal Link Audit Tool
 * Scans all files for internal links and identifies potential issues
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

// File extensions to scan
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mdx', '.md'];

// Patterns to find internal links
const LINK_PATTERNS = [
  /href=["']([^"']+)["']/g,
  /Link[^>]*href=["']([^"']+)["']/g,
  /router\.push\(["']([^"']+)["']\)/g,
];

// Simple URL validation
function checkUrlIssues(url) {
  const issues = [];
  
  // Check for spaces or URL encoded spaces
  if (/\s/.test(url) || /%20/.test(url)) {
    issues.push('Contains spaces or URL encoding');
  }
  
  // Check for duplicate segments
  const segments = url.split('/').filter(s => s);
  if (segments.length !== new Set(segments).size) {
    issues.push('Contains duplicate segments');
  }
  
  // Check for mixed case in location/service URLs
  if (url.match(/^\/[A-Z]/) || url.includes('/[A-Z]')) {
    issues.push('Contains uppercase characters');
  }
  
  // Check for underscores
  if (url.includes('_')) {
    issues.push('Contains underscores');
  }
  
  return issues;
}

class SimpleAuditor {
  constructor() {
    this.issues = [];
    this.scannedFiles = 0;
    this.totalLinks = 0;
  }

  scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', 'dist', '.git', 'coverage'].includes(entry.name)) {
          this.scanDirectory(fullPath);
        }
        continue;
      }

      if (SCAN_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
        this.scanFile(fullPath);
      }
    }
  }

  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      this.scannedFiles++;

      lines.forEach((line, lineIndex) => {
        LINK_PATTERNS.forEach(pattern => {
          let match;
          pattern.lastIndex = 0;
          
          while ((match = pattern.exec(line)) !== null) {
            const link = match[1];
            this.totalLinks++;
            
            if (link.startsWith('/') && !link.startsWith('//')) {
              this.validateLink(filePath, lineIndex + 1, link);
            }
          }
        });
      });
    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}:`, error.message);
    }
  }

  validateLink(filePath, lineNumber, link) {
    const cleanLink = link.split('?')[0].split('#')[0];
    const issues = checkUrlIssues(cleanLink);
    
    if (issues.length > 0) {
      this.issues.push({
        file: path.relative(projectRoot, filePath),
        line: lineNumber,
        link: link,
        issues: issues
      });
    }
  }

  generateReport() {
    console.log('\n=== Internal Link Audit Report ===\n');
    console.log(`Files scanned: ${this.scannedFiles}`);
    console.log(`Total internal links found: ${this.totalLinks}`);
    console.log(`Issues found: ${this.issues.length}\n`);

    if (this.issues.length === 0) {
      console.log('✅ No obvious link issues found!\n');
      return;
    }

    console.log('🔍 ISSUES FOUND:');
    console.log('-'.repeat(50));
    
    this.issues.forEach(issue => {
      console.log(`📁 ${issue.file}:${issue.line}`);
      console.log(`   Link: ${issue.link}`);
      console.log(`   Issues: ${issue.issues.join(', ')}`);
      console.log('');
    });

    console.log('\n📝 RECOMMENDATIONS:');
    console.log('- Fix URLs with spaces by using hyphens instead');
    console.log('- Remove duplicate segments from URLs');
    console.log('- Use lowercase for all internal URLs');
    console.log('- Replace underscores with hyphens');
    console.log('');
  }
}

// Run the audit
function main() {
  console.log('🔍 Starting simple internal link audit...\n');
  
  const auditor = new SimpleAuditor();
  auditor.scanDirectory(projectRoot);
  auditor.generateReport();
  
  process.exit(auditor.issues.length > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}
