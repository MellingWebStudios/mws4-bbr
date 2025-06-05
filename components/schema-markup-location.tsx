import businessInfo from "@/lib/business-info"

// Extended schema markup for location-specific pages
interface LocationSchemaProps {
  location?: {
    name: string;
    postcode: string;
    landmarks: string[];
  };
  nearbyAreas?: string[];
}

export default function LocationSchemaMarkup({ location, nearbyAreas = [] }: LocationSchemaProps) {
  // If no location provided, show main areas only
  const serviceAreas = location 
    ? [location.name, ...nearbyAreas]
    : ["Birmingham", "Solihull", "Dudley", "Bromsgrove"];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            // Location-specific LocalBusiness Schema
            {
              "@type": "HVACBusiness",
              "@id": `${businessInfo.website}/#business-${location?.name?.toLowerCase().replace(/\s+/g, '-') || 'main'}`,
              name: location ? `${businessInfo.name} - ${location.name}` : businessInfo.name,
              url: businessInfo.website,
              logo: `${businessInfo.website}/images/boiler-mascot-logo-56.webp`,
              description: location 
                ? `Professional boiler service, repairs & inspections in ${location.name} ${location.postcode}. Gas Safe engineers, no call-out fee.`
                : "Professional boiler service, repairs & inspections from Gas Safe engineers in Birmingham.",
              telephone: businessInfo.phone.international[0],
              email: businessInfo.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: businessInfo.address.street,
                addressLocality: businessInfo.address.locality,
                postalCode: businessInfo.address.postalCode,
                addressRegion: businessInfo.address.region,
                addressCountry: businessInfo.address.country,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "52.4584",
                longitude: "-1.9651",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              // Location-specific service areas (much smaller list)
              areaServed: serviceAreas.slice(0, 10).map(area => ({ "@type": "City", name: area })),
              sameAs: [
                businessInfo.socialMedia.google,
                businessInfo.socialMedia.facebook,
                businessInfo.socialMedia.instagram,
              ],
            },

            // Location-specific Service
            location && {
              "@type": "Service",
              "@id": `${businessInfo.website}/${location.name.toLowerCase().replace(/\s+/g, '-')}/#service`,
              name: `Boiler Repairs ${location.name}`,
              provider: {
                "@id": `${businessInfo.website}/#business-${location.name.toLowerCase().replace(/\s+/g, '-')}`,
              },
              description: `Expert boiler repairs and servicing in ${location.name} ${location.postcode}. Same-day service available.`,
              areaServed: {
                "@type": "City", 
                name: location.name
              },
              serviceType: "Boiler Repair",
              offers: {
                "@type": "Offer",
                price: "99",
                priceCurrency: "GBP",
                description: "Same-day boiler repair service"
              },
            },

            // Local landmarks schema if location provided
            location && location.landmarks.length > 0 && {
              "@type": "Place",
              "@id": `${businessInfo.website}/${location.name.toLowerCase().replace(/\s+/g, '-')}/#place`,
              name: location.name,
              containedInPlace: {
                "@type": "City",
                name: "Birmingham"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `Services near ${location.landmarks[0]}`,
                itemListElement: location.landmarks.slice(0, 3).map((landmark, index) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: `Boiler Service near ${landmark}`,
                  },
                  description: `Professional boiler repairs and servicing near ${landmark}`,
                  areaServed: {
                    "@type": "Place",
                    name: landmark
                  }
                }))
              }
            }
          ].filter(Boolean), // Remove null entries
        }),
      }}
    />
  )
}
