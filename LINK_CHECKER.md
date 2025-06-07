# Link Checker Documentation

This project includes a comprehensive link checking system to identify broken links, redirects, and other link issues.

## Quick Start

```bash
# 1. Start the development server
npm run dev

# 2. In a new terminal, run the link checker
npm run test:links
```

## Scripts Available

- `npm run test:links` - **Recommended**: Comprehensive TypeScript link checker with detailed reporting
- `npm run test:links:js` - JavaScript version of the link checker
- `npm run test:links:simple` - Simple linkinator output (all links, not just broken ones)

## What Gets Checked

The link checker will:

✅ **Crawl all pages** starting from `http://localhost:3000`  
✅ **Follow internal links** recursively  
✅ **Check external links** (with some exclusions)  
✅ **Detect 404s, 500s, and other HTTP errors**  
✅ **Identify redirect chains**  
✅ **Report connection timeouts**  
✅ **Skip problematic domains** (social media, etc.)  

## Output Files

After running the link checker, you'll find these files:

### `broken-links.json` 📋
Main report containing:
- Summary statistics
- List of broken links with status codes
- Warning links (redirects)
- Parent page information

### `all-links.json` 🔍
Complete link results for debugging (includes successful links)

### `link-check-summary.json` 📊
Quick summary with top issues

### `link-check-error.json` ❌
Error details if the link checker crashes

## Configuration

### Linkinator Config (`linkinator.json`)

```json
{
  "recurse": true,
  "verbosity": "ERROR",
  "concurrency": 10,
  "timeout": 30000,
  "retry": true,
  "retryErrors": true,
  "retryErrorsCount": 2,
  "skip": [
    "linkedin\\.com",
    "twitter\\.com",
    "facebook\\.com",
    "instagram\\.com",
    "youtube\\.com"
  ],
  "linksToSkip": [
    "^mailto:",
    "^tel:",
    "^javascript:",
    "^#"
  ]
}
```

### Customizing Skipped Domains

To skip additional domains, add them to the `skip` array in `linkinator.json`:

```json
"skip": [
  "example\\.com",
  "another-domain\\.com"
]
```

### Customizing Skipped Link Types

To skip additional link patterns, add them to `linksToSkip`:

```json
"linksToSkip": [
  "^mailto:",
  "^tel:",
  "^javascript:",
  "\\?.*utm_",
  "\\#anchor-links"
]
```

## Common Issues & Solutions

### 🚨 "Connection refused" errors
- Make sure your development server is running (`npm run dev`)
- Wait for the server to fully start before running link check

### 🚨 "Timeout" errors
- Increase timeout in `linkinator.json`
- Check if external services are down
- Consider adding slow domains to the skip list

### 🚨 "Too many redirects"
- Check for redirect loops in your application
- Review redirect configurations in Next.js

### 🚨 False positives from social media
- Social media sites often block automated requests
- These domains are already skipped by default

## Example Workflow

```bash
# Terminal 1: Start development server
npm run dev

# Terminal 2: Run link check
npm run test:links

# Check results
cat broken-links.json
```

## Integration with CI/CD

The link checker exits with code 1 if broken links are found, making it suitable for CI/CD:

```yaml
# GitHub Actions example
- name: Start server
  run: npm run dev &
  
- name: Wait for server
  run: npx wait-on http://localhost:3000
  
- name: Check links
  run: npm run test:links
```

## Understanding the Output

### Exit Codes
- `0` = No broken links found ✅
- `1` = Broken links found or error occurred ❌

### Status Code Meanings
- `200-299` = Success ✅
- `300-399` = Redirects ⚠️
- `400-499` = Client errors (404, etc.) ❌
- `500-599` = Server errors ❌
- `BROKEN` = Connection failed ❌

## Troubleshooting

1. **Ensure dev server is running**: The link checker needs `http://localhost:3000` to be accessible
2. **Check network connectivity**: External link checking requires internet access
3. **Review skip patterns**: Some domains may need to be skipped due to bot protection
4. **Increase timeout**: Some external services may be slow to respond

## Advanced Usage

### Custom Link Checker Script

You can modify `scripts/check-links.ts` to:
- Change timeout settings
- Add custom retry logic
- Filter results differently
- Add custom reporting formats

### Running Against Production

```bash
# Update the URL in check-links.ts, then:
npm run test:links
```
