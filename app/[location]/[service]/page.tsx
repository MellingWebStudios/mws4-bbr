import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCallout from "@/components/emergency-callout";
import ReviewsDisplay from "@/components/reviews-display";
import Breadcrumb from "@/components/breadcrumb";
import {
  getLocationBySlug,
  getServiceBySlug,
  locations,
  services,
} from "@/lib/locations-data";
import businessInfo from "@/lib/business-info";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/breadcrumb-schema";
import React from "react";

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
    image: `${businessInfo.website}/logo.png`, // Update if you have a logo
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
    priceRange: "££",
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

  const title = `${service.name} in ${location.name} | Same-Day Service | Gas Safe`;
  const description = `Expert ${service.name.toLowerCase()} in ${location.name} ${location.postcode}. No call-out fee, fixed pricing, all major brands. Gas Safe registered engineers. Call 0800 320 2345.`;
  const url = `https://www.birminghamboilerrepairs.com/${location.slug}/${service.slug}`;

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
      images: [`${businessInfo.website}/og-image.png`], // Set if you have OG images
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${businessInfo.website}/og-image.png`], // Set if you have OG images
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

  const introText = `When you need ${service.name.toLowerCase()} in ${location.name}, our Gas Safe engineers are just minutes away. Serving the ${location.postcode} area and surroundings including ${location.landmarks.join(
    " and "
  )}, we provide fast, reliable ${service.name.toLowerCase()} for all boiler makes and models. With no call-out charges and transparent pricing, we've helped hundreds of ${location.name} homeowners restore heating and hot water quickly, often on the same day.`;

  return (
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
            <Card className="overflow-hidden border shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Map Section - Responsive height */}
                  <div className="relative h-[250px] w-full md:h-full min-h-[300px] order-2 md:order-1">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=${location.mapEmbedId}`}
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                      title={`Map of ${service.name} in ${location.name}`}
                    />
                  </div>

                  {/* Content Section - Better spacing and hierarchy */}
                  <div className="p-6 md:p-8 flex flex-col order-1 md:order-2">
                    <h2 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {service.name} in {location.name}
                    </h2>

                    <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {introText}
                    </p>

                    <div className="mb-6 flex-grow">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                        What's included:
                      </h3>

                      <ul className="space-y-3">
                        {service.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="mr-3 h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 mb-6 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Serving all {location.name} postcodes:{" "}
                        {location.postcode}
                      </span>
                    </div>

                    <Button
                      asChild
                      className="bg-secondary text-white hover:bg-secondary/90 py-6 rounded-lg text-base font-medium shadow-sm transition-all duration-300 hover:shadow-md w-full md:w-auto"
                    >
                      <a
                        href={`tel:${businessInfo.phone.freephone.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2"
                        aria-label={`Call Now: ${businessInfo.phone.freephone}`}
                      >
                        <Phone size={18} />
                        Book Now: {businessInfo.phone.freephone}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                {service.name} Pricing in {location.name}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {service.pricing.map((option: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center px-8 py-10"
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {option.title}
                    </h3>
                    <div className="mb-4 flex items-center justify-center gap-2">
                      <span className="inline-block rounded-full bg-yellow-100 text-yellow-700 px-5 py-2 text-2xl font-bold shadow">
                        {option.price}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        No VAT
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-base">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                {location.name} Customer Reviews
              </h2>
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
                locationFilter={location.name.toLowerCase()}
                limit={3}
                showFilters={false}
              />
            </div>

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
                <Card className="border shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      Find Us in {location.name}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      We're conveniently located to serve all of {location.name}{" "}
                      and surrounding areas.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link
                        href={location.mapUrl}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-secondary to-secondary/90 py-20 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:flex-row md:space-y-0 md:p-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight">
                Need <span className="text-primary">{service.name}</span> in{" "}
                {location.name}?
              </h2>
              <p className="mt-3 text-lg text-white/90">
                We offer same-day service when booked before 12pm
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden bg-primary px-8 text-lg font-semibold text-gray-900 shadow-md transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
            >
              <a
                href={`tel:${businessInfo.phone.freephone.replace(/\s/g, "")}`}
                className="flex items-center gap-3"
                aria-label={`Call Now: ${businessInfo.phone.freephone}`}
              >
                <Phone size={20} className="animate-pulse" />
                <span>Call Now: {businessInfo.phone.freephone}</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
