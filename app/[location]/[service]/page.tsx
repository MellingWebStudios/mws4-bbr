import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, MapPin, Clock, Shield, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCallout from "@/components/emergency-callout";
import ReviewsDisplay from "@/components/reviews-display";
import Breadcrumb from "@/components/breadcrumb";
import { RelatedServices, RelatedLocations, ServiceLinksGrid } from "@/components/internal-links";
import { ServiceCrossLinks, SmartContentLinks } from "@/components/contextual-links";
import { getRelatedContentSuggestions } from "@/lib/internal-linking";
import {
  getLocationBySlug,
  getServiceBySlug,
  locations,
  services,
} from "@/lib/locations-data";
import businessInfo from "@/lib/business-info";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/breadcrumb-schema";
import TrackedPhoneLink from "@/components/tracked-phone-link";
import React from "react";
import { reviews } from "@/lib/reviews-data";
import Head from "next/head";
import { generateUniqueContent, generateLocationServiceFAQs } from '@/lib/content-enrichment';

type Props = {
  params: {
    location: string;
    service: string;
  };
};

// LocalBusinessSchema component for structured data
function LocalBusinessSchema({ location }: { location: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessInfo.name,
    image: `${businessInfo.website}/images/boiler-mascot-logo-512.png`,
    priceRange: "££",
    telephone: businessInfo.phone.international,
    email: businessInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: location?.name || businessInfo.address.locality,
      addressRegion: businessInfo.address.region,
      postalCode: location?.postcode || businessInfo.address.postalCode,
      addressCountry: "GB",
    },
    url: businessInfo.website,
    openingHours: "Mo-Fr 09:00-17:00",
    geo: location
      ? {
          "@type": "GeoCoordinates",
          latitude: location.latitude || undefined,
          longitude: location.longitude || undefined,
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12",
    },
    sameAs: [
      businessInfo.socialMedia.google,
      businessInfo.socialMedia.facebook,
      businessInfo.socialMedia.instagram,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

// SEO meta: OpenGraph, Twitter Card, canonical, etc
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: locationSlug, service: serviceSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const title = `${location.name} ${service.name} | Same Day | Fixed Price`;
  const description = `Expert ${service.name.toLowerCase()} in ${location.name} ${location.postcode}. Same-day appointments, no call-out charges, Gas Safe registered. Emergency repairs available 24/7. Call 0800 320 2345!`;
  // Ensure canonical URL is always lowercase and properly formatted
  const url = `https://www.birminghamboilerrepairs.uk/${location.slug.toLowerCase()}/${service.slug.toLowerCase()}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: businessInfo.name,
      type: "website",
      images: [
        {
          url: `${businessInfo.website}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${location.name} - Birmingham Boiler Repairs`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${businessInfo.website}/og-image.png`],
    },
  };
}

export async function generateStaticParams() {
  return locations.flatMap((location) =>
    services.map((service) => ({
      location: location.slug,
      service: service.slug,
    }))
  );
}

export default async function LocationServicePage({ params }: Props) {
  const { location: locationSlug, service: serviceSlug } = await params;

  const location = getLocationBySlug(locationSlug);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) notFound();

  // Fallback reviews logic
  const reviewsExist = reviews.some(
    (review) => review.location?.toLowerCase() === location.name.toLowerCase()
  );
  const fallbackLocationFilter = reviewsExist
    ? location.name.toLowerCase()
    : "birmingham";

  const introText = `When you need ${service.name.toLowerCase()} in ${location.name}, our Gas Safe engineers are just minutes away. Serving the ${location.postcode} area and surroundings including ${location.landmarks.join(
    " and "
  )}, we provide fast, reliable ${service.name.toLowerCase()} for all boiler makes and models. With no call-out charges and transparent pricing, we've helped hundreds of ${location.name} homeowners restore heating and hot water quickly, often on the same day.`;

  // Extract brand slug if this is a brand specialist service
  const brandSlug = serviceSlug.includes('-specialists') ? serviceSlug : undefined;
  
  // Generate unique content for this specific location-service combination
  const uniqueContent = generateUniqueContent(location, service, brandSlug);
  const faqs = generateLocationServiceFAQs(location, service, brandSlug);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://www.birminghamboilerrepairs.uk/${locationSlug}/${serviceSlug}`}
        />
      </Head>
      <div className="flex flex-col">
        {/* SEO Structured Data */}
        <LocalBusinessSchema location={location} />

        {/* Breadcrumb Schema */}
        <BreadcrumbSchema
          items={[
            { name: "Home", item: businessInfo.website + "/" },
            {
              name: location.name,
              item: `${businessInfo.website}/${location.slug}`,
            },
            {
              name: service.name,
              item: `${businessInfo.website}/${location.slug}/${service.slug}`,
            },
          ]}
        />

        {/* Hero Section */}
        <section className="relative bg-secondary py-16 text-white md:py-20 lg:py-24">
          {/* Decorative background element */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Breadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: location.name, href: `/${location.slug}` },
                    {
                      label: service.name,
                      href: `/${location.slug}/${service.slug}`,
                      isCurrent: true,
                    },
                  ]}
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {service.name} <span className="text-primary">in</span>{" "}
                {location.name}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
                {service.description}
              </p>
              <div className="mt-8 inline-block h-1 w-20 rounded bg-white/30" />
            </div>
          </div>
        </section>

        {/* Service Callout */}
        <ServiceCallout />

        {/* Main Content */}
        <section id="map" className="py-16 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12">
              {/* Map + Features */}
              <Card className="overflow-hidden border shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Map Section - Responsive height */}
                    <div className="relative h-[250px] w-full md:h-full min-h-[300px] order-2 md:order-1">
                      <div className="absolute inset-0 z-0">
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=${location.mapEmbedId}`}
                          width="600"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full rounded-bl-2xl md:rounded-bl-2xl md:rounded-tl-2xl"
                          title={`Map of ${service.name} in ${location.name}`}
                        />
                      </div>
                      {/* Subtle overlay for readability on small screens */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-gray-900/80 dark:via-gray-900/30 pointer-events-none" />
                    </div>

                    {/* Content Section - Enhanced hierarchy and visuals */}
                    <div className="p-8 flex flex-col order-1 md:order-2 justify-between h-full">
                      <div>
                        <h2 className="mb-3 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                          {service.name} in{" "}
                          <span className="text-primary">{location.name}</span>
                        </h2>
                        <p className="mb-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                          {introText}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                          What’s included
                        </h3>
                        <ul className="space-y-2">
                          {service.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-3 mb-6 bg-primary/10 dark:bg-secondary/20 p-3 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          Serving all {location.name} postcodes:{" "}
                          <span className="font-semibold">{location.postcode}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-center">
                        <Button
                          asChild
                          className="bg-primary text-primary-foreground hover:bg-yellow-400 py-4 px-8 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <TrackedPhoneLink
                            phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                            trackingLocation="location_service_page"
                            trackingSource={`${location.slug}_${service.slug}_pricing_cta`}
                            className="flex items-center justify-center gap-2"
                            ariaLabel={`Call Now: ${businessInfo.phone.freephone}`}
                          >
                            <Phone size={20} className="animate-pulse" />
                            Book Now: {businessInfo.phone.freephone}
                          </TrackedPhoneLink>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <div>
                <h2 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white text-center">
                  {service.name} Pricing in {location.name}
                </h2>
                <div className="flex justify-center mb-8">
                  <span className="inline-block h-1 w-24 rounded bg-primary/70" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {service.pricing.map((option: any, index: number) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hover:scale-105 transition-transform duration-200 px-8 py-10"
                    >
                      {option.popular && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-lg z-10">
                          Most Popular
                        </span>
                      )}
                      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {option.title}
                      </h3>
                      <div className="mb-4 flex items-end justify-center gap-2">
                        <span className="inline-block rounded-xl bg-primary text-primary-foreground px-6 py-2 text-3xl font-extrabold shadow-sm">
                          {option.price}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold ml-1">
                          No VAT
                        </span>
                      </div>
                      <p className="mb-6 text-gray-600 dark:text-gray-400 text-base min-h-[48px]">
                        {option.description}
                      </p>
                      <Button
                        asChild
                        className="mt-auto w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 rounded-lg shadow transition-all duration-200"
                      >
                        <TrackedPhoneLink
                          phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                          trackingLocation="location_service_page"
                          trackingSource={`${location.slug}_${service.slug}_${option.title.toLowerCase().replace(/\s+/g, '_')}_cta`}
                          className="flex items-center justify-center gap-2"
                          ariaLabel={`Book ${option.title} for ${option.price}`}
                        >
                          <Phone size={18} />
                          Book Now
                        </TrackedPhoneLink>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  Transparent pricing. No call-out fees. All work guaranteed.
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-2">
                <ReviewsDisplay
                  serviceFilter={
                    service.slug === "boiler-repairs"
                      ? "repair"
                      : service.slug === "boiler-servicing"
                      ? "service"
                      : service.slug === "gas-safety"
                      ? "gas-safety"
                      : "all"
                  }
                  locationFilter={fallbackLocationFilter}
                  limit={4}
                  showFilters={false}
                />
              </div>

              {/* Related Services Cross-Links */}
              <ServiceCrossLinks 
                currentService={service.slug}
                currentLocation={location.slug}
                variant="banner"
                className="my-8"
              />

              {/* Related Services in Same Location */}
              <RelatedServices 
                currentService={service.slug}
                currentLocation={location.slug}
                showDescription={true}
                limit={3}
                className="my-8"
              />

              {/* Same Service in Nearby Areas */}
              <RelatedLocations 
                currentLocation={location.slug}
                currentService={service.slug}
                showDescription={false}
                limit={6}
                className="my-8"
              />

              {/* Smart Content-Based Links */}
              <SmartContentLinks 
                content={introText}
                currentLocation={location.slug}
                currentService={service.slug}
                className="my-6"
              />

              {/* Local Areas Served */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Areas We Serve in {location.name}
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Our {service.name.toLowerCase()} services are available
                  throughout {location.name} and surrounding areas. We cover all{" "}
                  {location.postcode} postcodes and nearby locations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border shadow-md">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        Why Choose Us in {location.name}
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Local engineers based in {location.name}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Fast response times throughout {location.postcode}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Familiar with local boiler issues
                          </span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                          <span className="text-gray-700 dark:text-gray-300">
                            5-star rated by {location.name} customers
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  {/* Only show other locations, never self-link */}
                  {locations.filter(l => l.slug !== location.slug).slice(0, 1).map((l) => (
                    <Card className="border shadow-md" key={l.slug}>
                      <CardContent className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                          Find Us in {l.name}
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                          We're conveniently located to serve all of {l.name} and surrounding areas.
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <Link
                            href={l.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <MapPin size={16} />
                            View on Google Maps
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Location-Specific Content */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Why Choose Our {service.name} in {location.name}?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Local {location.name} Expertise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {uniqueContent.locationSpecificIntro}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {uniqueContent.secondaryInsight}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {uniqueContent.serviceUrgency}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {uniqueContent.processDescription}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      Emergency repairs: {uniqueContent.emergencyAvailability}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {brandSlug && uniqueContent.brandExpertise && (
                <Card className="mb-12 border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {brandSlug.replace('-specialists', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Specialists in {location.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {uniqueContent.brandExpertise}
                    </p>
                    
                    {uniqueContent.commonIssues.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                          Common {brandSlug.replace('-specialists', '').replace('-', ' ')} Issues We Fix in {location.name}:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {uniqueContent.commonIssues.map((issue, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Local Stock:</strong> {uniqueContent.localStockInfo}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Warranty:</strong> {uniqueContent.warrantyDetails}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-3 gap-6">
                {uniqueContent.uniqueSellingPoints.map((point, index) => (
                  <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        {index === 0 && <Star className="h-6 w-6 text-primary" />}
                        {index === 1 && <Clock className="h-6 w-6 text-primary" />}
                        {index === 2 && <Shield className="h-6 w-6 text-primary" />}
                        {index >= 3 && <CheckCircle className="h-6 w-6 text-primary" />}
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {point}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Frequently Asked Questions About {service.name} in {location.name}
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900 dark:text-white">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Still Have Questions About {service.name} in {location.name}?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Our friendly team is here to help with any questions about {service.name.toLowerCase()} in the {location.postcode} area. 
                      Call us for expert advice and transparent pricing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <TrackedPhoneLink
                          phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                          trackingLocation="location_service_page"
                          trackingSource={`${location.slug}_${service.slug}_faq_cta`}
                          className="flex items-center gap-2"
                          ariaLabel="Call for expert advice"
                        >
                          <Phone size={18} />
                          Call for Expert Advice
                        </TrackedPhoneLink>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href="/contact" className="flex items-center gap-2">
                          <MapPin size={18} />
                          Get Free Quote
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Tips Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Seasonal Maintenance Tips for {location.name} Residents
              </h2>
              
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Current Season Priority
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Right now in {location.name}, focus on {uniqueContent.seasonalRelevance} to ensure optimal performance.
                      </p>
                      
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        Maintenance Recommendations:
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {uniqueContent.maintenanceTips} for properties in the {location.postcode} area.
                      </p>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-6">
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Local {location.name} Considerations:
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Service area includes {uniqueContent.locationLandmarks}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {uniqueContent.guaranteeInfo}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Emergency callouts available throughout {location.postcode}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-secondary to-secondary/90 py-20 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between space-y-8 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:flex-row md:space-y-0 md:p-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight">
                  Need{" "}
                  <span className="text-primary">{service.name}</span> in{" "}
                  {location.name}?
                </h2>
                <p className="mt-3 text-lg text-white/90">
                  We offer same-day service when booked before 12pm
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-primary text-primary-foreground px-8 text-lg font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
              >
                <TrackedPhoneLink
                  phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                  trackingLocation="location_service_page"
                  trackingSource={`${location.slug}_${service.slug}_cta`}
                  className="flex items-center gap-3"
                  ariaLabel={`Call Now: ${businessInfo.phone.freephone}`}
                >
                  <Phone size={20} className="animate-pulse" />
                  <span>Call Now: {businessInfo.phone.freephone}</span>
                </TrackedPhoneLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
