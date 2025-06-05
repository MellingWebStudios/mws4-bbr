# Call Tracking Implementation Guide - V2 (Consolidated Events)

## Overview

This guide documents the **consolidated call tracking system** for Birmingham Boiler Repairs. We have successfully migrated from dual events to a **single `phone_call_click` event** for cleaner analytics and simplified tracking.

## Key Changes (December 2024)

✅ **CONSOLIDATED EVENTS**: Reduced from dual events (`phone_call` + `call_initiated`) to single `phone_call_click`
✅ **STANDARDIZED PARAMETERS**: Updated to use `call_location`, `call_source`, `engagement_type`, `phone_number`
✅ **MAINTAINED COVERAGE**: 143+ tracked implementations across entire website
✅ **BACKWARD COMPATIBILITY**: Legacy prop names still supported during transition

## Current Event Structure

**Single Event**: `phone_call_click`
```javascript
window.gtag('event', 'phone_call_click', {
  phone_number: '08003202345',           // Cleaned phone number
  call_location: 'homepage_hero',        // Where the call originated (REQUIRED)
  call_source: 'primary_cta',           // Specific context/source (optional)
  engagement_type: 'call_intent',       // Type of engagement (optional)
  event_category: 'engagement',          // Always 'engagement'
  event_label: 'Call from homepage_hero', // Human readable label
  value: 1                              // Conversion value
})
```

## Standardized Parameters

### 1. call_location (REQUIRED)
Identifies the page/section where call originated:
- `homepage_hero`, `contact_page_form`, `blog_post_sidebar`
- `navbar_desktop`, `footer_contact`, `emergency_callout`
- `gas_safety_page_service_info`, `boiler_faq_emergency_leak`

### 2. call_source (Optional)
Specific CTA or context within the location:
- `primary_cta`, `emergency_banner`, `service_info_cta`
- `header_icon`, `bottom_cta`, `sidebar_quick_contact`

### 3. engagement_type (Optional)
Type of user engagement:
- `call_intent` (default), `emergency_call`, `quote_request`
- `service_inquiry`, `urgent_repair`

### 4. phone_number
Automatically cleaned format (no spaces/special chars)

## Component Usage

### TrackedPhoneLink (Updated)
```tsx
<TrackedPhoneLink
  phone="0800 320 2345"
  trackingLocation="homepage_hero"      // REQUIRED - maps to call_location
  trackingSource="primary_cta"         // Optional - maps to call_source  
  engagementType="call_intent"         // Optional - maps to engagement_type
  className="btn-primary"
  ariaLabel="Call for emergency boiler repair"
>
  Call Now - Free Quote
</TrackedPhoneLink>
```

### TrackedCallButton (Updated)
```tsx
<TrackedCallButton
  phone="0800 320 2345"
  trackingLocation="contact_page_form"  // REQUIRED
  trackingSource="form_cta"            // Optional
  engagementType="quote_request"       // Optional
  label="Get Your Free Quote"
  size="lg"
  variant="default"
/>
```

## Implementation Status

### ✅ Core Infrastructure Updated
- `/lib/call-tracking.ts` - Single event tracking utility
- `/components/tracked-phone-link.tsx` - Updated component with new props
- `/components/tracked-call-button.tsx` - Updated button component

### 🔄 Component Migration Needed
All existing implementations need prop updates:
- `trackingLocation` → Required (maps to `call_location`)
- `trackingSource` → Optional (maps to `call_source`)
- Add `engagementType` → Optional (maps to `engagement_type`)
- Legacy `trackingCategory` → Deprecated but still works

### 📍 Tracked Locations (143+ implementations)

**Core Components:**
- Navbar (desktop & mobile)
- Footer contact sections  
- Emergency callout banners
- Sticky call bar (mobile)
- Desktop & mobile hero sections
- Contact page forms

**Service Pages:**
- Gas Safety Inspections
- Boiler Servicing
- Boiler Repairs
- Ferroli Specialists
- Service cards & CTAs

**Content Pages:**
- Blog system (main page, posts, categories, tags)
- About us page
- Privacy policy
- Locations pages
- Dynamic location-service pages

**Interactive Elements:**
- Chatbot emergency calls
- FAQ emergency responses
- Promo callouts
- Service cards

## Google Analytics 4 Setup

### 1. Event Tracking
Look for the new consolidated event:
- **Event Name**: `phone_call_click`
- **Event Category**: `engagement`
- **Custom Parameters**: `call_location`, `call_source`, `engagement_type`, `phone_number`

### 2. Conversion Setup
To track calls as conversions:
1. Go to **Admin** > **Events**
2. Find `phone_call_click`
3. Toggle "Mark as conversion"

### 3. Custom Reports
Create reports using the new parameters:
```
Dimensions:
- Event name: phone_call_click
- call_location (shows where calls originated)
- call_source (shows specific CTA clicked)
- engagement_type (shows user intent)

Metrics:
- Event count
- Users
- Sessions with events
```

## Migration Benefits

### 🎯 Cleaner Analytics
- Single event reduces data complexity
- Standardized parameters improve consistency
- Easier to create reports and dashboards

### 📊 Better Insights
- `call_location` provides clear page/section tracking
- `call_source` identifies best-performing CTAs
- `engagement_type` categorizes user intent

### 🔧 Easier Maintenance
- Simplified event structure
- Consistent parameter naming
- Reduced duplicate data

## Testing the Implementation

### Browser Console Test
1. Open browser dev tools (F12)
2. Click any phone number on the site
3. Look for: `📞 Phone call click tracked:`
4. Verify parameters: `call_location`, `call_source`, `engagement_type`

### Google Analytics Test
1. Go to **Reports** > **Realtime**
2. Click phone numbers on your site  
3. Watch for `phone_call_click` events
4. Check custom parameters are populated

## Sample Tracking Data

**Homepage Hero Button:**
```javascript
{
  event: 'phone_call_click',
  phone: '08003202345',
  call_location: 'homepage_hero',
  call_source: 'primary_cta', 
  engagement_type: 'call_intent'
}
```

**Emergency FAQ Call:**
```javascript
{
  event: 'phone_call_click', 
  phone: '08003202345',
  call_location: 'boiler_faq_emergency_leak',
  call_source: 'emergency_response',
  engagement_type: 'emergency_call'
}
```

**Blog Sidebar Contact:**
```javascript
{
  event: 'phone_call_click',
  phone: '08003202345', 
  call_location: 'blog_post_sidebar',
  call_source: 'quick_contact',
  engagement_type: 'call_intent'
}
```

## Key Analytics Insights

### Top Performing Locations
- Which pages/sections generate most calls
- Conversion rates by location
- User journey analysis

### CTA Performance  
- Most effective call-to-action copy
- Button placement optimization
- Source attribution analysis

### User Intent Analysis
- Emergency vs. planned service calls
- Quote requests vs. general inquiries
- Engagement type patterns

## Troubleshooting

### Events Not Appearing
1. Check browser console for tracking logs
2. Verify GA4 tracking ID is correct
3. Test with GA4 DebugView

### Wrong Parameters
1. Check component prop names match new structure
2. Verify `trackingLocation` is provided (required)
3. Check console logs show correct parameter mapping

### Missing Legacy Events
- Old `phone_call` and `call_initiated` events will no longer appear
- All tracking now uses single `phone_call_click` event
- Update any existing GA4 reports to use new event name

## Next Steps

1. **Update all existing implementations** to use new prop structure
2. **Test thoroughly** across all pages and components  
3. **Update GA4 reports** to use `phone_call_click` event
4. **Monitor analytics** for data consistency
5. **Set up new conversion goals** using consolidated event

This consolidated approach provides cleaner, more actionable analytics while maintaining comprehensive tracking coverage across your entire website.
