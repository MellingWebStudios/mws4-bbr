import { getLocationBySlug, services } from "@/lib/locations-data";
import businessInfo from "@/lib/business-info";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import BreadcrumbSchema from "@/components/breadcrumb-schema";
import ReviewsDisplay from "@/components/reviews-display";
import ServiceCallout from "@/components/emergency-callout";
import React from "react";

type Props = {
  params: { location: string };
};

export async function generateStaticParams() {
  const { locations } = await import("@/lib/locations-data");
  return locations.map((location: any) => ({ location: location.slug }));
}

export default async function LocationPage({ params }: Props) {
  const location = getLocationBySlug(params.location);
  if (!location) notFound();

  const introText = `Our Gas Safe engineers are just minutes away, serving the ${location.postcode} area and surroundings including ${location.landmarks.join(", ")}. We provide fast, reliable boiler and heating services for all makes and models. No call-out charges and transparent pricing.`;

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", item: businessInfo.website + "/" },
          { name: location.name, item: `${businessInfo.website}/${location.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-secondary py-16 text-white md:py-20 lg:py-24">
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
                  { label: location.name, href: `/${location.slug}`, isCurrent: true },
                ]}
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Boiler & Heating Services in <span className="text-primary">{location.name}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
              {introText}
            </p>
            <div className="mt-8 inline-block h-1 w-20 rounded bg-white/30" />
          </div>
        </div>
      </section>

      <ServiceCallout />

      {/* Main Content: Map + Features */}
      <section id="map" className="py-16 scroll-mt-24">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 gap-12">
      {/* Map + Features */}
      <Card className="overflow-hidden border shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Map Section */}
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
                  title={`Map of ${location.name}`}
                />
              </div>
              {/* Subtle overlay for readability on small screens */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-gray-900/80 dark:via-gray-900/30 pointer-events-none" />
            </div>
            {/* Content Section */}
            <div className="p-8 flex flex-col order-1 md:order-2 justify-between h-full">
              <div>
                <h2 className="mb-3 text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Boiler & Heating Services in{" "}
                  <span className="text-primary">{location.name}</span>
                </h2>
                <p className="mb-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  {introText}
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Why Choose Us
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Local engineers based in {location.name}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Fast response times throughout {location.postcode}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Familiar with local boiler issues
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      5-star rated by {location.name} customers
                    </span>
                  </li>
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
                  <a
                    href={`tel:${businessInfo.phone.freephone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2"
                    aria-label={`Call Now: ${businessInfo.phone.freephone}`}
                  >
                    <Phone size={20} className="animate-pulse" />
                    Book Now: {businessInfo.phone.freephone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
            </Card>

            {/* Services List */}
            <div>
              <h2 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white text-center">
                Services Available in {location.name}
              </h2>
              <div className="flex justify-center mb-8">
                <span className="inline-block h-1 w-24 rounded bg-primary/70" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service: any) => (
                  <div
                    key={service.slug}
                    className="relative flex flex-col items-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hover:scale-105 transition-transform duration-200 px-8 py-10"
                  >
                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-400 text-base min-h-[48px]">
                      {service.description}
                    </p>
                    <Button
                      asChild
                      className="mt-auto w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 rounded-lg shadow transition-all duration-200"
                    >
                      <Link
                        href={`/${location.slug}/${service.slug}`}
                        aria-label={`View ${service.name} in ${location.name}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <MapPin size={16} />
                        View Service
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-2">
              <ReviewsDisplay
                locationFilter={location.name.toLowerCase()}
                limit={3}
                showFilters={false}
              />
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
                Need a boiler or heating service in{" "}
                <span className="text-primary">{location.name}</span>?
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
