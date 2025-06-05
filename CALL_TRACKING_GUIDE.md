# Call Tracking Implementation Guide

## Overview
We've implemented a comprehensive call tracking system that monitors when users click on phone numbers throughout your Birmingham Boiler Repairs website. All call interactions are sent to Google Analytics 4 for detailed analysis.

## What's Being Tracked

### Phone Number Clicks
Every phone number click on your website now sends detailed tracking data to Google Analytics, including:

- **Phone Number**: The actual number clicked (cleaned format)
- **Location**: Where on the site the click occurred (e.g., "navbar", "footer", "hero")
- **Source**: Specific element clicked (e.g., "header_cta", "emergency_phone_icon")
- **Category**: Type of engagement ("engagement" or "conversion")

### Tracking Events Sent

1. **phone_call** - Main engagement event
2. **call_initiated** - Conversion tracking event

## Components Updated

### New Tracking Components
- `TrackedPhoneLink` - Wraps any phone link with tracking
- `TrackedCallButton` - Enhanced call button with tracking
- Enhanced `CallNowButton` - Updated existing component

### Updated Components
- ✅ Navbar (desktop & mobile)
- ✅ Footer (freephone & mobile)
- ✅ Contact page (all phone links)
- ✅ Emergency callout section
- ✅ Sticky call bar (mobile)
- ✅ Homepage bottom CTA
- ✅ Prices page CTA
- ✅ Desktop hero section
- ✅ Chatbot call buttons

## Viewing Analytics in Google Analytics 4

### 1. Real-time Reports
- Go to **Reports** > **Realtime**
- Look for "phone_call" and "call_initiated" events
- Test by clicking phone numbers on your site

### 2. Events Report
- Go to **Reports** > **Engagement** > **Events**
- Look for:
  - `phone_call` (main tracking event)
  - `call_initiated` (conversion event)

### 3. Custom Exploration
Create a custom report:
1. Go to **Explore** > **Free Form**
2. Add these dimensions:
   - Event name
   - Custom parameter: call_location
   - Custom parameter: call_source
   - Custom parameter: phone_number
3. Add metrics:
   - Event count
   - Total users

### 4. Conversion Tracking
To set up call tracking as a conversion:
1. Go to **Admin** > **Events**
2. Find "call_initiated" event
3. Toggle "Mark as conversion"

## Sample Analytics Data

When someone clicks a phone number, you'll see events like:

```
Event: phone_call
Parameters:
- event_category: engagement
- event_label: Call 0800 320 2345
- phone_number: 08003202345
- call_location: navbar_desktop
- call_source: header_cta
- contact_method: phone
- engagement_type: call_intent
```

## Key Metrics to Track

### High-Level Metrics
- Total phone call clicks per day/week/month
- Call-to-visit conversion rate
- Most effective call-to-action locations

### Detailed Analysis
- **Best Performing Locations**: Which parts of your site generate most calls
- **Device Analysis**: Mobile vs desktop call patterns
- **Page Performance**: Which pages drive the most phone calls
- **Time Analysis**: Peak calling times and days

### Business Insights
- **Conversion Funnel**: Track user journey from visit to call
- **ROI Tracking**: Measure marketing campaign effectiveness
- **User Behavior**: Understand how users interact with phone CTAs

## Testing the Implementation

### Quick Test
1. Visit your website
2. Open browser dev tools (F12)
3. Go to Console tab
4. Click any phone number
5. Look for console message: "📞 Call tracking event sent:"

### Google Analytics Test
1. Open Google Analytics 4
2. Go to **Reports** > **Realtime**
3. Click phone numbers on your site
4. Watch for events appearing in real-time report

## Phone Numbers Tracked

- **Freephone**: 0800 320 2345
- **Mobile**: 07807 776 411

## Tracking Locations

| Location | Description |
|----------|-------------|
| navbar_desktop | Main navigation call button |
| navbar_mobile | Mobile navigation icon |
| footer | Footer contact section |
| contact_page | Contact page phone numbers |
| emergency_callout | Emergency service section |
| sticky_call_bar | Mobile bottom call bar |
| homepage_bottom | Homepage final CTA |
| prices_page | Pricing page CTA |
| desktop_hero | Main hero section |
| chatbot | AI chatbot call buttons |
| locations_page | Location listing page CTAs |
| boiler_servicing_page | Boiler servicing service page |
| boiler_repairs_page | Boiler repairs service page |
| gas_safety_page | Gas safety inspection page |
| ferroli_specialists_page | Ferroli specialists page |
| service_card | Individual service cards |
| location_service_page | Dynamic location service pages |
| about_page | About us page contact |
| privacy_policy_page | Privacy policy contact info |
| blog_page | Main blog page CTAs |
| blog_post | Individual blog post CTAs |
| blog_tag_page | Blog tag archive pages |
| blog_category_page | Blog category archive pages |
| locations_service_page | Service-specific location pages |
| boiler_faq | FAQ section emergency calls |
| call_now_button | Generic call button component |

## Advanced Analytics Setup

### Create Custom Dashboard
1. Go to **Reports** > **Library**
2. Create new collection
3. Add these reports:
   - Call events overview
   - Call sources breakdown
   - Call location performance
   - Device-based call analysis

### Set Up Alerts
1. Go to **Admin** > **Intelligence**
2. Create custom alerts for:
   - Sudden drop in call events
   - Unusual spikes in calls from specific sources
   - Weekly call volume reports

### Export Data
Set up regular exports of call tracking data for:
- Monthly business reports
- ROI analysis
- Performance tracking

## Troubleshooting

### No Events Showing
1. Check browser console for errors
2. Verify Google Analytics tracking ID
3. Test with Google Analytics Debugger extension

### Events Not Tagged Properly
1. Check console logs for tracking data
2. Verify custom parameters in GA4
3. Check component implementations

### Missing Locations
Some components may not be updated yet. Check the components list above and update manually if needed.

## Next Steps

1. **Monitor for 1-2 weeks** to establish baseline metrics
2. **Set up conversion goals** for call events
3. **Create custom reports** for business insights
4. **Optimize CTAs** based on performance data
5. **Set up automated reporting** for monthly business reviews

This comprehensive call tracking system will give you detailed insights into how users interact with your phone numbers and help optimize your website for maximum call conversions.
