import businessInfo from "@/lib/business-info"

// Ultra-minimal schema markup - only essential LocalBusiness data
export default function UltraLightSchemaMarkup() {
  return (
    <>
      {/* Critical business schema only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HVACBusiness",
            "@id": `${businessInfo.website}/#business`,
            name: businessInfo.name,
            url: businessInfo.website,
            telephone: businessInfo.phone.international[0],
            email: businessInfo.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: businessInfo.address.locality,
              postalCode: businessInfo.address.postalCode,
              addressCountry: businessInfo.address.country,
            },
            // Only top 3 core areas
            areaServed: [
              { "@type": "City", name: "Birmingham" },
              { "@type": "City", name: "Solihull" },
              { "@type": "City", name: "West Midlands" }
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "120",
            },
          }),
        }}
      />
      
      {/* Lazy-load additional schema after page load */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Load additional schema after critical rendering
            if (typeof window !== 'undefined') {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  var additionalSchema = document.createElement('script');
                  additionalSchema.type = 'application/ld+json';
                  additionalSchema.innerHTML = JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "@id": "${businessInfo.website}/services/boiler-repairs",
                    "name": "Boiler Repairs Birmingham",
                    "provider": { "@id": "${businessInfo.website}/#business" },
                    "serviceType": "Boiler Repair",
                    "offers": { "@type": "Offer", "price": "99", "priceCurrency": "GBP" }
                  });
                  document.head.appendChild(additionalSchema);
                }, 1000);
              });
            }
          `
        }}
      />
    </>
  )
}
