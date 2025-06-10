#!/bin/bash

echo "🔍 Cross-referencing location data with middleware..."
echo "=================================================="

# Extract location slugs from locations-data.ts
echo "📍 Extracting location slugs from locations-data.ts..."
grep '"slug":' lib/locations-data.ts | sed 's/.*"slug": "//' | sed 's/".*//' | sort > /tmp/location_data_slugs.txt
LOCATION_COUNT=$(wc -l < /tmp/location_data_slugs.txt)
echo "Found $LOCATION_COUNT location slugs in location data"

# Extract singleWordLocations from middleware.ts
echo -e "\n🛠️  Extracting singleWordLocations from middleware.ts..."
sed -n '/const singleWordLocations = \[/,/\];/p' middleware.ts | grep -o "'[^']*'" | sed "s/'//g" | sort > /tmp/middleware_slugs.txt
MIDDLEWARE_COUNT=$(wc -l < /tmp/middleware_slugs.txt)
echo "Found $MIDDLEWARE_COUNT slugs in middleware singleWordLocations"

# Compare the lists
echo -e "\n❌ MISSING FROM MIDDLEWARE:"
comm -23 /tmp/location_data_slugs.txt /tmp/middleware_slugs.txt | head -20
MISSING_COUNT=$(comm -23 /tmp/location_data_slugs.txt /tmp/middleware_slugs.txt | wc -l)
echo "Total missing: $MISSING_COUNT"

echo -e "\n➕ EXTRA IN MIDDLEWARE (not in location data):"
comm -13 /tmp/location_data_slugs.txt /tmp/middleware_slugs.txt
EXTRA_COUNT=$(comm -13 /tmp/location_data_slugs.txt /tmp/middleware_slugs.txt | wc -l)
echo "Total extra: $EXTRA_COUNT"

echo -e "\n✅ SUMMARY:"
echo "Location data slugs: $LOCATION_COUNT"
echo "Middleware slugs: $MIDDLEWARE_COUNT"
echo "Missing from middleware: $MISSING_COUNT"
echo "Extra in middleware: $EXTRA_COUNT"

if [ $MISSING_COUNT -gt 0 ]; then
    echo -e "\n🚨 ISSUE: Some location slugs are missing from middleware!"
    echo "This will cause 404s in production."
fi

# Check for west-midlands specifically
echo -e "\n🔍 Checking for west-midlands:"
if grep -q "west-midlands" /tmp/location_data_slugs.txt; then
    echo "✅ west-midlands found in location data"
else
    echo "❌ west-midlands NOT found in location data"
fi

if grep -q "west-midlands" /tmp/middleware_slugs.txt; then
    echo "✅ west-midlands found in middleware"
else
    echo "❌ west-midlands NOT found in middleware"
fi

# Clean up
rm -f /tmp/location_data_slugs.txt /tmp/middleware_slugs.txt

echo -e "\n✨ Analysis complete!"
