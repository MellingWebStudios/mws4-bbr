import businessInfo from "@/lib/business-info"

// Minimal location-specific schema markup
interface LocationSchemaProps {
  location?: {
    name: string;
    slug: string;
    postcode: string;
    landmarks: string[];
  };
}

export default function MinimalLocationSchemaMarkup({ location }: LocationSchemaProps) {
  if (!location) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${businessInfo.website}/#business-${location.slug}`,
          name: `${businessInfo.name} - ${location.name}`,
          description: `Professional boiler service in ${location.name} ${location.postcode}. Gas Safe engineers available.`,
          image: `${businessInfo.website}/images/boiler-mascot-logo-512.png`,
          priceRange: "££",
          telephone: businessInfo.phone.international[0],
          areaServed: {
            "@type": "City", 
            name: location.name
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: businessInfo.address.street,
            addressLocality: location.name,
            postalCode: location.postcode,
            addressCountry: "GB",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "120",
          },
        }),
      }}
    />
  )
}
