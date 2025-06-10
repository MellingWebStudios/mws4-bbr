#!/bin/bash

echo "🔍 Checking locationRedirects mapping..."
echo "========================================"

# Extract location names that contain spaces from locations-data.ts
echo "📍 Extracting location names with spaces from location data..."
grep '"name":' lib/locations-data.ts | sed 's/.*"name": "//' | sed 's/".*//' | grep ' ' | sort > /tmp/location_names_with_spaces.txt
SPACE_NAMES_COUNT=$(wc -l < /tmp/location_names_with_spaces.txt)
echo "Found $SPACE_NAMES_COUNT location names with spaces"

# Extract locationRedirects keys from middleware.ts
echo -e "\n🛠️  Extracting locationRedirects keys from middleware.ts..."
sed -n '/const locationRedirects: Record<string, string> = {/,/};/p' middleware.ts | grep -o "'[^']*':" | sed "s/'//g" | sed 's/://' | sort > /tmp/location_redirects_keys.txt
REDIRECT_KEYS_COUNT=$(wc -l < /tmp/location_redirects_keys.txt)
echo "Found $REDIRECT_KEYS_COUNT locationRedirects keys"

# Find missing redirects
echo -e "\n❌ LOCATION NAMES WITH SPACES MISSING FROM locationRedirects:"
comm -23 /tmp/location_names_with_spaces.txt /tmp/location_redirects_keys.txt | head -10
MISSING_REDIRECTS=$(comm -23 /tmp/location_names_with_spaces.txt /tmp/location_redirects_keys.txt | wc -l)
echo "Total missing: $MISSING_REDIRECTS"

# Find extra redirects (keys that don't match any location names)
echo -e "\n➕ EXTRA locationRedirects (not matching any location names):"
comm -13 /tmp/location_names_with_spaces.txt /tmp/location_redirects_keys.txt
EXTRA_REDIRECTS=$(comm -13 /tmp/location_names_with_spaces.txt /tmp/location_redirects_keys.txt | wc -l)
echo "Total extra: $EXTRA_REDIRECTS"

echo -e "\n✅ SUMMARY:"
echo "Location names with spaces: $SPACE_NAMES_COUNT"
echo "LocationRedirects keys: $REDIRECT_KEYS_COUNT"
echo "Missing redirects: $MISSING_REDIRECTS"
echo "Extra redirects: $EXTRA_REDIRECTS"

if [ $MISSING_REDIRECTS -gt 0 ]; then
    echo -e "\n🚨 ISSUE: Some space-separated location names are missing redirects!"
    echo "This means URLs like '/Austin Village' won't redirect to '/austin-village'"
fi

# Clean up
rm -f /tmp/location_names_with_spaces.txt /tmp/location_redirects_keys.txt

echo -e "\n✨ LocationRedirects analysis complete!"
