import businessInfo from "@/lib/business-info"

export default function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            // LocalBusiness Schema
            {
              "@type": "HVACBusiness",
              "@id": `${businessInfo.website}/#business`,
              name: businessInfo.name,
              url: businessInfo.website,
              logo: `${businessInfo.website}/images/boiler-mascot-logo-56.webp`,
              image: `${businessInfo.website}/images/boiler-mascot-logo-512.png`,
              description:
                "Professional boiler service, repairs & inspections from Gas Safe engineers in Birmingham. No call-out fee, clear pricing, no VAT charged.",
              telephone: businessInfo.phone.international[0],
              email: businessInfo.email,
              priceRange: "££",
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
              areaServed: businessInfo.areasCovered.map(area => ({ "@type": "City", name: area })),
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
                          name: "Weekend Boiler Repair",
                        },
                        price: "110",
                        priceCurrency: "GBP",
                        description: "Weekend boiler repair service",
                      },
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Boiler Servicing",
                    itemListElement: [
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
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Full Boiler Service",
                        },
                        price: "120",
                        priceCurrency: "GBP",
                        description: "Deep clean heat cell, recharge expansion vessel, replace gaskets",
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

            // Service Schema - Boiler Repairs
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

            // Service Schema - Boiler Servicing
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

            // Service Schema - Gas Safety Inspections
            {
              "@type": "Service",
              "@id": `${businessInfo.website}/services/gas-safety`,
              name: "Gas Safety Inspections Birmingham",
              url: `${businessInfo.website}/services/gas-safety`,
              provider: {
                "@id": `${businessInfo.website}/#business`,
              },
              description:
                "Certified checks to keep your home compliant and safe. Digital certificates provided with a reminder service.",
              areaServed: {
                "@type": "City",
                name: "Birmingham",
              },
              serviceType: "Gas Safety Inspection",
              offers: {
                "@type": "Offer",
                price: "45",
                priceCurrency: "GBP",
              },
            },

            // Service Schema - Ferroli Specialists
            {
              "@type": "Service",
              "@id": `${businessInfo.website}/services/ferroli-specialists`,
              name: "Ferroli Boiler Specialists Birmingham",
              url: `${businessInfo.website}/services/ferroli-specialists`,
              provider: {
                "@id": `${businessInfo.website}/#business`,
              },
              description:
                "Approved specialist for Ferroli repair & maintenance. We are experts in fixing Ferroli boilers with specialist knowledge of Ferroli systems and components.",
              areaServed: {
                "@type": "City",
                name: "Birmingham",
              },
              serviceType: "Ferroli Boiler Service",
              offers: {
                "@type": "Offer",
                price: "65",
                priceCurrency: "GBP",
              },
            },

            // FAQPage Schema
            {
              "@type": "FAQPage",
              "@id": `${businessInfo.website}/#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Why won't my boiler fire up?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "If your boiler won't fire up, check these common causes: low pressure (check the pressure gauge), power supply issues (check the fuse box), thermostat settings (ensure it's calling for heat), or a frozen condensate pipe (common in winter). If you've checked these and your boiler still won't fire up, you likely need a professional repair.",
                  },
                },
                {
                  "@type": "Question",
                  name: "No hot water but heating works - what's wrong?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "When you have heating but no hot water, the most common causes are: diverter valve failure (common in combi boilers), hot water temperature settings too low, airlock in the hot water system, or a faulty hot water sensor. This typically requires a professional diagnosis as it often involves internal boiler components.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why is my boiler making banging or gurgling noises?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Unusual noises from your boiler can indicate several issues: kettling (limescale build-up causing overheating), air in the system (needs bleeding), pump issues (worn bearings or debris), or water pressure problems. While bleeding radiators might help with some noises, persistent sounds usually require professional attention.",
                  },
                },
                {
                  "@type": "Question",
                  name: "My boiler is leaking water - is this dangerous?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A leaking boiler should be addressed promptly. Possible causes include: pressure valve release (if pressure is too high), corroded internal components, loose pipe connections, or damaged seals or pump. Important: If you notice a significant leak, turn off your boiler and water supply, and call us immediately.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you charge for call-outs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, we don't charge any call-out fees. You only pay for the service or repair work carried out.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How quickly can you attend?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer same-day service when booked before 12pm, subject to availability.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you charge VAT?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, we don't charge VAT on any of our services, making our pricing more transparent and affordable.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What payment methods do you accept?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We accept both card and cash payments for your convenience.",
                  },
                },
              ],
            },

            // Reviews with AggregateRating
            {
              "@type": "Product",
              "@id": `${businessInfo.website}/#services`,
              name: `${businessInfo.name} Services`,
              description: "Professional boiler service, repairs & inspections from Gas Safe engineers in Birmingham.",
              brand: {
                "@type": "Brand",
                name: businessInfo.name,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "120",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Julie R.",
                  },
                  datePublished: "2023-11-15",
                  reviewBody:
                    "What a great service! The engineer arrived within 15 minutes of the scheduled time and fixed our boiler quickly. He explained everything clearly and left the area spotless. Renewed my faith in tradesmen.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Mark T.",
                  },
                  datePublished: "2023-10-22",
                  reviewBody:
                    "Called in the morning about my broken boiler, and they had an engineer at my house by lunchtime. The repair was completed efficiently and at the price quoted. No surprises, no hidden costs. Excellent service from start to finish.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Sarah P.",
                  },
                  datePublished: "2023-09-18",
                  reviewBody:
                    "Professional, punctual and reasonably priced. The engineer diagnosed the issue quickly and had the parts needed in his van. He took the time to show me how to maintain my boiler properly. My go-to for all boiler issues now.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
              ],
            },
          ],
        }),
      }}
    />
  )
}
