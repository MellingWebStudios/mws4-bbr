# Phone Call Tracking Fix

## Issue Identified
Found 3 untracked phone links that were NOT firing `phone_call_click` events:

1. `/app/not-found.tsx` - 404 page emergency contact link
2. `/app/[...catchAll]/page.tsx` - Catch-all page call button
3. `/app/review-us/page.tsx` - "Need Help" call button

## Fix Applied
Replaced all raw `<a href="tel:...">` and `<Link href="tel:...">` tags with `TrackedPhoneLink` components.

### Changes Made:

#### 1. `/app/not-found.tsx`
- **Before**: `<a href="tel:08003202345">0800 320 2345</a>`
- **After**: `<TrackedPhoneLink phone="0800 320 2345" trackingLocation="404_page" trackingSource="emergency_contact">0800 320 2345</TrackedPhoneLink>`

#### 2. `/app/[...catchAll]/page.tsx`
- **Before**: `<Link href="tel:08003202345"><Button>0800 320 2345</Button></Link>`
- **After**: `<Button asChild><TrackedPhoneLink phone="0800 320 2345" trackingLocation="catch_all_page" trackingSource="emergency_contact">0800 320 2345</TrackedPhoneLink></Button>`

#### 3. `/app/review-us/page.tsx`
- **Before**: `<Link href={`tel:${businessInfo.phone.freephone}`}>Call {businessInfo.phone.freephone}</Link>`
- **After**: `<TrackedPhoneLink phone={businessInfo.phone.freephone} trackingLocation="review_us_page" trackingSource="need_help_section">Call {businessInfo.phone.freephone}</TrackedPhoneLink>`

## Expected Impact
These three pages likely get significant traffic:
- 404 page: Users hitting broken/old URLs
- Catch-all page: Users hitting non-existent paths  
- Review page: Users coming from review flows

The untracked phone clicks from these pages could easily account for the missing 30+ weekly calls (45 → 14).

## Testing
1. Navigate to any broken URL (triggers catch-all or 404)
2. Click the phone number
3. Check browser console for: `📞 Phone call click tracked:`
4. Verify GA4 receives `phone_call_click` events with proper parameters

## Next Steps
1. Deploy changes to production
2. Monitor GA4 for increased `phone_call_click` events
3. Check if weekly call numbers return to normal (~45)
4. Consider creating a comprehensive audit script to find any other untracked links
