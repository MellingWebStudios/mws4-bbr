import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ServiceCallout from "@/components/emergency-callout"
import ReviewsDisplay from "@/components/reviews-display"
import Breadcrumb from "@/components/breadcrumb"
import { getLocationBySlug, getServiceBySlug, locations, services } from "@/lib/locations-data"
import { notFound } from "next/navigation"
import BreadcrumbSchema from "@/components/breadcrumb-schema"

type Props = {
  params: {
    location: string
    service: string
  }
}

// Generate metadata dynamically based on location and service
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocationBySlug(params.location)
  const service = getServiceBySlug(params.service)

  if (!location || !service) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    }
  }

  return {
    title: `${service.name} in ${location.name} | Same-Day Service | Gas Safe`,
    description: `Expert ${service.name.toLowerCase()} in ${location.name} ${location.postcode}. No call-out fee, fixed pricing, all major brands. Gas Safe registered engineers. Call 0800 320 2345.`,
    alternates: {
      canonical: `https://www.birminghamboilerrepairs.com/${location.slug}/${service.slug}`,
    },
  }
}

// Generate static params for all location/service combinations
export async function generateStaticParams() {
  const params = []

  for (const location of locations) {
    for (const service of services) {
      params.push({
        location: location.slug,
        service: service.slug,
      })
    }
  }

  return params
}

export default function LocationServicePage({ params }: Props) {
  const location = getLocationBySlug(params.location)
  const service = getServiceBySlug(params.service)

  // If location or service not found, return 404
  if (!location || !service) {
    notFound()
  }

  // Generate a location-specific intro paragraph
  const introText = `When you need ${service.name.toLowerCase()} in ${location.name}, our Gas Safe engineers are just minutes away. Serving the ${location.postcode} area and surroundings including ${location.landmarks.join(" and ")}, we provide fast, reliable ${service.name.toLowerCase()} for all boiler makes and models. With no call-out charges and transparent pricing, we've helped hundreds of ${location.name} homeowners restore heating and hot water quickly, often on the same day.`

  return (
    <div className="flex flex-col">
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.birminghamboilerrepairs.com/" },
          { name: location.name, item: `https://www.birminghamboilerrepairs.com/${location.slug}` },
          {
            name: service.name,
            item: `https://www.birminghamboilerrepairs.com/${location.slug}/${service.slug}`,
          },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: location.name, href: `/${location.slug}`, isCurrent: false },
                  { label: service.name, href: `/${location.slug}/${service.slug}`, isCurrent: true },
                ]}
              />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {service.name} in {location.name}
            </h1>
            <p className="mt-4 text-lg">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Service Callout */}
      <ServiceCallout />

      {/* Main Content Section */}
      <section id="map" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {/* Location-specific content */}
            <Card className="overflow-hidden border shadow-md mb-8">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="relative h-64 w-full md:h-auto">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=${location.mapEmbedId}`}
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                      {service.name} in {location.name}
                    </h2>
                    <p className="mb-6 text-gray-600 dark:text-gray-400">{introText}</p>
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">What's included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-secondary" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Serving all {location.name} postcodes: {location.postcode}
                      </span>
                    </div>
                    <Button asChild className="bg-secondary text-white hover:bg-secondary/90">
                      <Link href="tel:08003202345" className="flex items-center gap-2">
                        <Phone size={16} />
                        Book Now: 0800 320 2345
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                {service.name} Pricing in {location.name}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {service.pricing.map((option, index) => (
                  <Card key={index} className="border shadow-md">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{option.title}</h3>
                      <div className="mb-4 flex items-baseline">
                        <span className="text-3xl font-bold text-secondary">{option.price}</span>
                        <span className="ml-1 text-sm text-gray-500">No VAT</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reviews Section - filtered by location */}
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
                Our {service.name.toLowerCase()} services are available throughout {location.name} and surrounding
                areas. We cover all {location.postcode} postcodes and nearby locations.
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
                        <span className="text-gray-700 dark:text-gray-300">Familiar with local boiler issues</span>
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
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Find Us in {location.name}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      We're conveniently located to serve all of {location.name} and surrounding areas.
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

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">
                Need {service.name} in {location.name}?
              </h2>
              <p className="mt-2 text-lg">We offer same-day service when booked before 12pm</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
              <Link href="tel:08003202345" className="flex items-center gap-2">
                <Phone size={18} />
                Call Now: 0800 320 2345
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
