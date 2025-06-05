import businessInfo from "@/lib/business-info"

// Core minimal schema markup for all pages - reduced areaServed list
export default function CoreSchemaMarkup() {
  // Only include top-level areas to reduce size
  const coreAreas = [
    "Birmingham",
    "Solihull", 
    "Dudley",
    "Bromsgrove",
    "Redditch",
    "Sutton Coldfield",
    "West Midlands"
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            // LocalBusiness Schema - Core only
            {
              "@type": "HVACBusiness",
              "@id": `${businessInfo.website}/#business`,
              name: businessInfo.name,
              url: businessInfo.website,
              logo: `${businessInfo.website}/images/boiler-mascot-logo-56.webp`,
              image: `${businessInfo.website}/images/engineers-team-enhanced.svg`,
              description:
                "Professional boiler service, repairs & inspections from Gas Safe engineers in Birmingham. No call-out fee, clear pricing, no VAT charged.",
              telephone: businessInfo.phone.international[0],
              email: businessInfo.email,
              priceRange: "£45-£120",
              currenciesAccepted: "GBP",
              paymentAccepted: "Cash, Credit Card",
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
              // Reduced areaServed list
              areaServed: coreAreas.map(area => ({ "@type": "City", name: area })),
              sameAs: [
                businessInfo.socialMedia.google,
                businessInfo.socialMedia.facebook,
                businessInfo.socialMedia.instagram,
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Boiler Services",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Boiler Repairs",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Same-Day Boiler Repair",
                        },
                        price: "99",
                        priceCurrency: "GBP",
                        description: "Same-day boiler repair service when booked before 12pm",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Standard Boiler Service",
                        },
                        price: "55",
                        priceCurrency: "GBP",
                        description: "30-minute boiler service with flue readings and gas pressure checks",
                      },
                    ],
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "120",
                bestRating: "5",
                worstRating: "1",
              },
            },

            // Core Service Schemas
            {
              "@type": "Service",
              "@id": `${businessInfo.website}/services/boiler-repairs`,
              name: "Boiler Repairs Birmingham",
              url: `${businessInfo.website}/services/boiler-repairs`,
              provider: {
                "@id": `${businessInfo.website}/#business`,
              },
              description:
                "Prompt, reliable fixes for leaks, breakdowns and ongoing issues. Same-day service available when booked before 12pm.",
              areaServed: {
                "@type": "City",
                name: "Birmingham",
              },
              serviceType: "Boiler Repair",
              offers: {
                "@type": "Offer",
                price: "99",
                priceCurrency: "GBP",
              },
            },

            {
              "@type": "Service",
              "@id": `${businessInfo.website}/services/boiler-servicing`,
              name: "Boiler Servicing Birmingham",
              url: `${businessInfo.website}/services/boiler-servicing`,
              provider: {
                "@id": `${businessInfo.website}/#business`,
              },
              description:
                "Keep your boiler safe and efficient with expert servicing for all major brands. We offer both standard (£55) and full (£120) servicing options.",
              areaServed: {
                "@type": "City",
                name: "Birmingham",
              },
              serviceType: "Boiler Servicing",
              offers: {
                "@type": "Offer",
                price: "55",
                priceCurrency: "GBP",
              },
            },
          ],
        }),
      }}
    />
  )
}
