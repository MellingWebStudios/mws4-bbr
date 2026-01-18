# Birmingham Boiler Repairs - AI Coding Instructions

## Architecture Overview

This is a **Next.js 15 App Router** SEO-first local business site generating hundreds of hyper-local pages for boiler services across Birmingham. Deployed on **Fly.io** (production) with Vercel for previews.

### Core URL Structure
```
/                         → Homepage
/[location]               → Location pages (e.g., /acocks-green, /selly-oak)
/[location]/[service]     → Location+Service combos (e.g., /erdington/boiler-repairs)
/services/[service]       → Static service pages (pre-built folders, NOT dynamic routes)
```

### Key Data Files
- [lib/locations-data.ts](lib/locations-data.ts) - **Central source of truth** for all 100+ locations and services. All dynamic pages derive from `locations` and `services` arrays.
- [config/businessInfo.ts](config/businessInfo.ts) - Business contact details, phone numbers, Gas Safe number. Import via `@/lib/business-info`.
- [lib/content-enrichment.ts](lib/content-enrichment.ts) - Location-specific content (`localInsights`) and brand-specific boiler info.

## Critical Patterns

### Dynamic Routes & Static Generation
Location pages use `generateStaticParams()` to pre-render at build time:
```typescript
// app/[location]/page.tsx
export async function generateStaticParams() {
  return locations.map((location) => ({ location: location.slug }));
}
```
Always ensure new locations added to `locations-data.ts` follow the `Location` interface.

### Middleware URL Normalization
[middleware.ts](middleware.ts) handles complex redirect logic:
- Location name → slug redirects (`/Selly Oak` → `/selly-oak`)
- Duplicate segment removal (`/selly-park/selly-park/` → `/selly-park`)
- Always uses canonical domain for production redirects
- **Never redirect** static assets, API routes, or `fly.dev` internal domains

### Internal Linking Strategy
Use components from [components/internal-links.tsx](components/internal-links.tsx):
- `RelatedServices`, `RelatedLocations`, `ServiceLinksGrid`
- URL validation via [lib/url-validator.ts](lib/url-validator.ts) - prevents malformed `/location/location` paths

### Schema Markup & SEO
- Each page must include appropriate structured data (`BreadcrumbSchema`, `LocalBusinessSchema`)
- Canonical URLs always lowercase: `https://www.birminghamboilerrepairs.uk/{slug}`
- Use `generateMetadata()` for dynamic meta tags

## Development Commands

```bash
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Build + auto-generates sitemap (postbuild script)
fly deploy                  # Deploy to production on Fly.io
pnpm audit:links            # Check for broken internal links
pnpm test:redirects         # Verify redirect rules
```

## Contact Form Flow

1. Client form: [components/contact-form.tsx](components/contact-form.tsx) with honeypot spam protection
2. API route: [app/api/contact/route.ts](app/api/contact/route.ts) validates & forwards to FastAPI backend
3. Backend: External `mws4-bbr-api.fly.dev` handles email sending via SendGrid
4. Password protected via `FORM_PASSWORD` env var

## Component Conventions

- **UI components**: shadcn/ui in [components/ui/](components/ui/) - always use these for buttons, cards, forms
- **Tracked interactions**: Use `TrackedPhoneLink` for phone clicks (GA4 tracking)
- **Hero sections**: Mobile/desktop split (`mobile-hero.tsx`, `desktop-hero.tsx`)
- **Server components by default** - use `"use client"` only when needed for interactivity

## Adding New Locations/Services

1. Add to `locations` array in [lib/locations-data.ts](lib/locations-data.ts) with all required fields
2. Optionally add local insights to [lib/content-enrichment.ts](lib/content-enrichment.ts)
3. Run `pnpm build` to generate static pages and update sitemap
4. Run `pnpm audit:links` to verify no broken links

## Environment Variables

Required for production:
- `WEBSITE_URL` - Canonical domain (https://www.birminghamboilerrepairs.uk)
- `FORM_PASSWORD` - Contact form backend auth
- `SENDGRID_API_KEY` - Email sending (legacy, now via backend)
