#!/bin/bash

# Call Tracking Migration Script - V2 Event Consolidation
# Migrates from dual events to single phone_call_click event
# Updates prop structure for TrackedPhoneLink and TrackedCallButton components

echo "🔄 Call Tracking V2 Migration Script"
echo "==================================="
echo ""

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 MIGRATION CHECKLIST:"
echo ""
echo "✅ Core infrastructure updated:"
echo "   - /lib/call-tracking.ts (single phone_call_click event)" 
echo "   - /components/tracked-phone-link.tsx (new prop structure)"
echo "   - /components/tracked-call-button.tsx (new prop structure)"
echo ""

echo "🔍 CHECKING CURRENT IMPLEMENTATIONS..."
echo ""

# Find all TrackedPhoneLink usages
echo "📱 TrackedPhoneLink implementations found:"
TRACKED_LINKS=$(grep -r "TrackedPhoneLink" --include="*.tsx" --include="*.ts" . | grep -v node_modules | grep -v ".git" | wc -l)
echo "   Total: $TRACKED_LINKS occurrences"

# Check for specific prop patterns that need updating
echo ""
echo "🔧 PROP MIGRATION NEEDED:"

# Find old prop structure
OLD_PROPS=$(grep -r "trackingLocation.*trackingSource" --include="*.tsx" . | grep -v node_modules | wc -l)
echo "   Files using old prop structure: $OLD_PROPS"

# Find missing required props
echo ""
echo "⚠️  REQUIRED PROP CHECK:"
MISSING_LOCATION=$(grep -r "<TrackedPhoneLink" --include="*.tsx" . | grep -v "trackingLocation" | grep -v node_modules | wc -l)
if [[ $MISSING_LOCATION -gt 0 ]]; then
    echo "   ❌ $MISSING_LOCATION implementations missing trackingLocation prop"
else
    echo "   ✅ All implementations have trackingLocation prop"
fi

echo ""
echo "📊 IMPLEMENTATION BREAKDOWN:"

# Count by component type
NAVBAR_COUNT=$(grep -r "TrackedPhoneLink" --include="*navbar*" . | grep -v node_modules | wc -l)
FOOTER_COUNT=$(grep -r "TrackedPhoneLink" --include="*footer*" . | grep -v node_modules | wc -l)
SERVICE_COUNT=$(grep -r "TrackedPhoneLink" --include="*/services/*" . | grep -v node_modules | wc -l)
BLOG_COUNT=$(grep -r "TrackedPhoneLink" --include="*/blog/*" . | grep -v node_modules | wc -l)
LOCATION_COUNT=$(grep -r "TrackedPhoneLink" --include="*/location*" . | grep -v node_modules | wc -l)

echo "   Navbar: $NAVBAR_COUNT"
echo "   Footer: $FOOTER_COUNT" 
echo "   Service pages: $SERVICE_COUNT"
echo "   Blog system: $BLOG_COUNT"
echo "   Location pages: $LOCATION_COUNT"

echo ""
echo "🎯 NEW PROP STRUCTURE EXAMPLES:"
echo ""
echo "OLD (deprecated but still works):"
echo '<TrackedPhoneLink'
echo '  phone="0800 320 2345"'
echo '  trackingLocation="homepage_hero"'  
echo '  trackingSource="primary_cta"'
echo '  trackingCategory="engagement"'
echo '>'

echo ""
echo "NEW (recommended V2 structure):"
echo '<TrackedPhoneLink'
echo '  phone="0800 320 2345"'
echo '  trackingLocation="homepage_hero"      // REQUIRED - maps to call_location'
echo '  trackingSource="primary_cta"         // Optional - maps to call_source'
echo '  engagementType="call_intent"         // NEW - maps to engagement_type'
echo '>'

echo ""
echo "📋 MIGRATION TASKS:"
echo ""
echo "1. ✅ Update core tracking library (/lib/call-tracking.ts)"
echo "2. ✅ Update TrackedPhoneLink component" 
echo "3. ✅ Update TrackedCallButton component"
echo "4. 🔄 Add engagementType prop to implementations (optional)"
echo "5. 🔄 Test all phone links send phone_call_click events"
echo "6. 🔄 Update Google Analytics reports to use new event"
echo "7. 🔄 Update documentation and guides"

echo ""
echo "🧪 TESTING COMMANDS:"
echo ""
echo "# Test event tracking in browser console:"
echo "1. Open any page with phone links"
echo "2. Open browser dev tools (F12)"
echo "3. Click phone numbers"
echo "4. Look for: '📞 Phone call click tracked:'"
echo "5. Verify parameters: call_location, call_source, engagement_type"

echo ""
echo "# Test Google Analytics:"
echo "1. Go to GA4 > Reports > Realtime"
echo "2. Click phone numbers on site"
echo "3. Look for 'phone_call_click' events"
echo "4. Check custom parameters are populated"

echo ""
echo "📁 FILES TO REVIEW:"
echo ""

# List key files that likely need updates
echo "Core components:"
echo "   components/navbar.tsx"
echo "   components/footer.tsx"
echo "   components/emergency-callout.tsx"
echo "   components/sticky-call-bar.tsx"

echo ""
echo "Service pages:"
echo "   app/services/*/page.tsx"
echo "   components/service-card.tsx"

echo ""
echo "Content pages:"
echo "   app/blog/*/page.tsx"
echo "   app/[location]/*/page.tsx"
echo "   app/contact/page.tsx"

echo ""
echo "🎉 MIGRATION BENEFITS:"
echo ""
echo "✅ Cleaner analytics (single event vs dual)"
echo "✅ Standardized parameter names"
echo "✅ Better user intent tracking"
echo "✅ Easier report creation"
echo "✅ Reduced data complexity"

echo ""
echo "⚠️  IMPORTANT NOTES:"
echo ""
echo "- Legacy prop names still work during transition"
echo "- trackingLocation is now REQUIRED for new prop structure"
echo "- Old phone_call/call_initiated events are no longer sent"
echo "- All tracking now uses single phone_call_click event"
echo "- engagementType is optional but recommended for better insights"

echo ""
echo "🔗 DOCUMENTATION:"
echo "   See: CALL_TRACKING_GUIDE_V2.md for full implementation details"

echo ""
echo "Migration script complete! 🎯"
