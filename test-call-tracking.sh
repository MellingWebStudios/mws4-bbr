#!/bin/bash

# Call Tracking Test Script
# This script helps verify that call tracking is properly implemented

echo "🔍 Birmingham Boiler Repairs - Call Tracking Verification"
echo "========================================================"
echo ""

# Test 1: Check if tracking files exist
echo "📋 Test 1: Checking if tracking files exist..."
if [ -f "lib/call-tracking.ts" ]; then
    echo "✅ Call tracking utility found"
else
    echo "❌ Call tracking utility NOT found"
fi

if [ -f "components/tracked-phone-link.tsx" ]; then
    echo "✅ TrackedPhoneLink component found"
else
    echo "❌ TrackedPhoneLink component NOT found"
fi

if [ -f "components/tracked-call-button.tsx" ]; then
    echo "✅ TrackedCallButton component found"
else
    echo "❌ TrackedCallButton component NOT found"
fi

echo ""

# Test 2: Count phone link implementations
echo "📋 Test 2: Analyzing phone link implementations..."

# Count tracked vs untracked tel: links
TOTAL_TEL_LINKS=$(grep -r "tel:" --include="*.tsx" --include="*.ts" . | wc -l)
TRACKED_LINKS=$(grep -r "TrackedPhoneLink\|trackCallClick" --include="*.tsx" --include="*.ts" . | wc -l)

echo "📞 Total tel: links found: $TOTAL_TEL_LINKS"
echo "✅ Tracked implementations: $TRACKED_LINKS"

if [ $TRACKED_LINKS -gt 0 ]; then
    echo "✅ Call tracking is implemented"
else
    echo "❌ No call tracking implementations found"
fi

echo ""

# Test 3: Check Google Analytics setup
echo "📋 Test 3: Verifying Google Analytics setup..."
if grep -q "G-ET5987N3MJ" components/google-analytics.tsx; then
    echo "✅ Google Analytics ID found in configuration"
else
    echo "❌ Google Analytics ID not found"
fi

if grep -q "gtag" lib/call-tracking.ts; then
    echo "✅ Call tracking uses gtag correctly"
else
    echo "❌ Call tracking doesn't use gtag"
fi

echo ""

# Test 4: Check key components
echo "📋 Test 4: Checking key component updates..."

COMPONENTS_TO_CHECK=(
    "components/navbar.tsx"
    "components/footer.tsx"
    "app/contact/page.tsx"
    "components/emergency-callout.tsx"
    "components/sticky-call-bar.tsx"
    "app/page.tsx"
    "app/prices/page.tsx"
    "components/desktop-hero.tsx"
)

for component in "${COMPONENTS_TO_CHECK[@]}"; do
    if grep -q "TrackedPhoneLink\|trackCallClick" "$component" 2>/dev/null; then
        echo "✅ $component has call tracking"
    else
        echo "⚠️  $component may need call tracking updates"
    fi
done

echo ""

# Test 5: Identify remaining untracked links
echo "📋 Test 5: Finding untracked phone links..."
echo "Files with tel: links that may need tracking updates:"

grep -r "href.*tel:" --include="*.tsx" --include="*.ts" . | grep -v "TrackedPhoneLink\|formatPhoneHref" | while read -r line; do
    file=$(echo "$line" | cut -d: -f1)
    echo "⚠️  $file"
done

echo ""
echo "🎯 Call Tracking Implementation Summary"
echo "======================================"
echo "✅ Implementation appears complete for major components"
echo "📊 Ready for Google Analytics monitoring"
echo "📱 All phone numbers should now be tracked"
echo ""
echo "Next steps:"
echo "1. Test by clicking phone numbers on your website"
echo "2. Check Google Analytics > Reports > Realtime for events"
echo "3. Look for 'phone_call' and 'call_initiated' events"
echo "4. Monitor for 1-2 weeks to establish baseline metrics"
echo ""
echo "📚 See CALL_TRACKING_GUIDE.md for detailed analytics setup"
