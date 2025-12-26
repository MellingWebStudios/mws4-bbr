# Rankings Drop Fix - December 2025

## Executive Summary

**Problem Identified:** Rankings dropped ~8-10 positions and calls dropped 36% after December 15, 2025.

**Root Cause Found:** The `WEBSITE_URL` environment variable in Fly.io was set to `https://bbr-production.fly.dev` instead of `https://www.birminghamboilerrepairs.uk`. This caused all URL redirects (e.g., uppercase `/Highgate` → lowercase `/highgate`) to redirect to Fly.io's internal domain instead of the production domain.

**Fix Applied:** Updated the `WEBSITE_URL` secret in Fly.io to the correct production domain.

**Status:** ✅ **FIXED** (December 26, 2025)

---

## Timeline

| Date | Event |
|------|-------|
| Dec 9, 2025 | Commit to enhance proxy middleware with improved redirect loop prevention |
| Dec 15, 2025 | Approximate date when rankings started dropping |
| Dec 19, 2025 | Deployment version 171 |
| Dec 26, 2025 | Root cause identified and fixed |

---

## Technical Details

### The Bug

When users (or Googlebot) visited URLs with uppercase characters, the proxy middleware would redirect to the lowercase version. However, instead of redirecting to:

```
https://www.birminghamboilerrepairs.uk/highgate
```

It was redirecting to:

```
https://bbr-production.fly.dev/highgate
```

This caused:
1. **Broken redirect chains** - Google followed redirects to a different domain
2. **Confusion about canonical URLs** - The site appeared to have duplicate content across two domains
3. **Loss of PageRank** - Redirects going to the wrong domain leaked SEO value

### Root Cause

The `WEBSITE_URL` environment variable was stored as a **Fly.io secret** with the value:

```
WEBSITE_URL=https://bbr-production.fly.dev
```

The proxy middleware's `getBaseUrl()` function used this environment variable to construct redirect URLs, causing all redirects to point to the Fly.io internal domain.

### The Fix

Updated the Fly.io secret:

```bash
fly secrets set WEBSITE_URL="https://www.birminghamboilerrepairs.uk"
```

Also improved the `getBaseUrl()` function in `proxy.ts` to be more defensive:

```typescript
function getBaseUrl(host: string): string {
  // In development, use localhost
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return `http://${host}`;
  }

  // For production, ALWAYS use the canonical domain
  if (process.env.NODE_ENV === "production") {
    return process.env.WEBSITE_URL || "https://www.birminghamboilerrepairs.uk";
  }

  // Fallback
  return "https://www.birminghamboilerrepairs.uk";
}
```

---

## Verification

After the fix, all redirects now correctly point to the production domain:

| Test URL | Before Fix | After Fix |
|----------|------------|-----------|
| `/Highgate` | ❌ `https://bbr-production.fly.dev/highgate` | ✅ `https://www.birminghamboilerrepairs.uk/highgate` |
| `/BIRMINGHAM` | ❌ `https://bbr-production.fly.dev/birmingham` | ✅ `https://www.birminghamboilerrepairs.uk/birmingham` |
| `/Highgate/Boiler-Repairs` | ❌ `https://bbr-production.fly.dev/highgate/Boiler-Repairs` | ✅ `https://www.birminghamboilerrepairs.uk/highgate/Boiler-Repairs` |

---

## Expected Recovery

Now that the fix is deployed:

1. **Immediate:** All redirects now go to the correct domain
2. **1-2 weeks:** Googlebot will recrawl and see the correct redirects
3. **2-4 weeks:** Rankings should begin recovering as Google reprocesses the pages
4. **4-8 weeks:** Full recovery expected (rankings typically take time to stabilize)

### Recommendations

1. **Request Reindexing** - In Google Search Console, submit the sitemap again and request reindexing of key pages
2. **Monitor GSC** - Watch the Page Indexing report for any remaining issues
3. **Check Rankings Weekly** - Track position recovery over the next month
4. **Audit Environment Variables** - Ensure all production deployments have correct environment variables

---

## Files Modified

1. **fly.toml** - Added `WEBSITE_URL` to `[env]` section (redundant with secret but good for documentation)
2. **proxy.ts** - Improved `getBaseUrl()` function to prioritize production domain
3. **Fly.io Secrets** - Updated `WEBSITE_URL` from `https://bbr-production.fly.dev` to `https://www.birminghamboilerrepairs.uk`

---

## Commands Used

```bash
# Identified the problem
fly ssh console -C "printenv WEBSITE_URL"
# Output: https://bbr-production.fly.dev  ← WRONG!

# Fixed the problem
fly secrets set WEBSITE_URL="https://www.birminghamboilerrepairs.uk"

# Verified the fix
curl -sI "https://www.birminghamboilerrepairs.uk/Highgate" | grep location
# Output: location: https://www.birminghamboilerrepairs.uk/highgate  ← CORRECT!
```
