#!/usr/bin/env node

/**
 * Internal Link Audit Tool
 * Scans all files for internal links and validates them against known URL patterns
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

// File extensions to scan
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mdx', '.md'];

// Patterns to find internal links
const LINK_PATTERNS = [
  // href attributes
  /href=["']([^"']+)["']/g,
  // Next.js Link components
  /Link[^>]*href=["']([^"']+)["']/g,
  // Router navigation
  /router\.push\(["']([^"']+)["']\)/g,
  // Redirect calls
  /redirect\(["']([^"']+)["']\)/g,
  // pathname references
  /pathname:\s*["']([^"']+)["']/g,
];

// Simple URL validation (without importing the complex validator)
function hasUrlIssues(url) {
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
  
  // Check for mixed case
  if (url !== url.toLowerCase()) {
    issues.push('Contains uppercase characters');
  }
  
  // Check for underscores
  if (url.includes('_')) {
    issues.push('Contains underscores');
  }
  
  return issues;
}

class InternalLinkAuditor {
  private issues: LinkIssue[] = [];
  private scannedFiles = 0;
  private totalLinks = 0;

  async scanDirectory(dir: string): Promise<void> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip node_modules, .next, and other build directories
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', 'dist', '.git', 'coverage'].includes(entry.name)) {
          await this.scanDirectory(fullPath);
        }
        continue;
      }

      // Only scan relevant file types
      if (SCAN_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
        await this.scanFile(fullPath);
      }
    }
  }

  async scanFile(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      this.scannedFiles++;

      lines.forEach((line, lineIndex) => {
        LINK_PATTERNS.forEach(pattern => {
          let match;
          pattern.lastIndex = 0; // Reset regex state
          
          while ((match = pattern.exec(line)) !== null) {
            const link = match[1];
            this.totalLinks++;
            
            // Only check internal links (start with / but not //)
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

  validateLink(filePath: string, lineNumber: number, link: string): void {
    // Remove query parameters and fragments for validation
    const cleanLink = link.split('?')[0].split('#')[0];
    
    const validation = validateAndNormalizeUrl(cleanLink);
    
    if (!validation.isValid || validation.issues.length > 0) {
      this.issues.push({
        file: path.relative(projectRoot, filePath),
        line: lineNumber,
        link: link,
        issues: validation.issues,
        suggestedFix: validation.normalizedPath || undefined
      });
    }
  }

  generateReport(): void {
    console.log('\n=== Internal Link Audit Report ===\n');
    console.log(`Files scanned: ${this.scannedFiles}`);
    console.log(`Total internal links found: ${this.totalLinks}`);
    console.log(`Issues found: ${this.issues.length}\n`);

    if (this.issues.length === 0) {
      console.log('✅ No link issues found! All internal links appear to be valid.\n');
      return;
    }

    // Group issues by type
    const issuesByType: Record<string, LinkIssue[]> = {};
    
    this.issues.forEach(issue => {
      issue.issues.forEach(issueType => {
        if (!issuesByType[issueType]) {
          issuesByType[issueType] = [];
        }
        issuesByType[issueType].push(issue);
      });
    });

    // Report by issue type
    Object.entries(issuesByType).forEach(([issueType, issues]) => {
      console.log(`\n🔍 ${issueType.toUpperCase()} (${issues.length} occurrences):`);
      console.log('─'.repeat(50));
      
      issues.forEach(issue => {
        console.log(`📁 ${issue.file}:${issue.line}`);
        console.log(`   Link: ${issue.link}`);
        if (issue.suggestedFix) {
          console.log(`   ✨ Suggested fix: ${issue.suggestedFix}`);
        }
        console.log('');
      });
    });

    // Generate fix suggestions
    console.log('\n📝 RECOMMENDED ACTIONS:\n');
    
    const duplicateIssues = this.issues.filter(i => i.issues.includes('Contains duplicate segments'));
    if (duplicateIssues.length > 0) {
      console.log('1. Fix duplicate segment URLs:');
      duplicateIssues.forEach(issue => {
        console.log(`   ${issue.file}:${issue.line} - Change "${issue.link}" to "${issue.suggestedFix}"`);
      });
      console.log('');
    }

    const invalidCharIssues = this.issues.filter(i => i.issues.includes('Contains invalid characters'));
    if (invalidCharIssues.length > 0) {
      console.log('2. Fix URLs with invalid characters (spaces, etc.):');
      invalidCharIssues.forEach(issue => {
        console.log(`   ${issue.file}:${issue.line} - Change "${issue.link}" to "${issue.suggestedFix}"`);
      });
      console.log('');
    }

    const structureIssues = this.issues.filter(i => i.issues.includes('Invalid URL structure'));
    if (structureIssues.length > 0) {
      console.log('3. Review URL structure:');
      structureIssues.forEach(issue => {
        console.log(`   ${issue.file}:${issue.line} - Review: "${issue.link}"`);
      });
      console.log('');
    }
  }

  async saveReport(): Promise<void> {
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        filesScanned: this.scannedFiles,
        totalLinks: this.totalLinks,
        totalIssues: this.issues.length
      },
      issues: this.issues
    };

    const reportPath = path.join(projectRoot, 'internal-link-audit.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📊 Detailed report saved to: ${reportPath}\n`);
  }
}

// Run the audit
async function main() {
  console.log('🔍 Starting internal link audit...\n');
  
  const auditor = new InternalLinkAuditor();
  
  // Scan the entire project
  await auditor.scanDirectory(projectRoot);
  
  // Generate and display report
  auditor.generateReport();
  
  // Save detailed report
  await auditor.saveReport();
  
  // Exit with error code if issues found
  process.exit(auditor.issues.length > 0 ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Error running link audit:', error);
    process.exit(1);
  });
}

export { InternalLinkAuditor };
