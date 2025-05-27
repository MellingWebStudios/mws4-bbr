import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { locations, services, getServiceBySlug } from "@/lib/locations-data"
import LocationServiceCard from "@/components/location-service-card"
import { notFound } from "next/navigation"
import Breadcrumb from "@/components/breadcrumb"

type Props = {
  params: {
    service: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.service)

  if (!service) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    }
  }

  return {
    title: `${service.name} Locations | Birmingham Boiler Repairs`,
    description: `Find ${service.name.toLowerCase()} services near you. We cover Birmingham, Solihull, Dudley, Bromsgrove, Wolverhampton and surrounding areas. Call 0800 320 2345.`,
    alternates: {
      canonical: `https://www.birminghamboilerrepairs.uk/locations/${service.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }))
}

export default function ServiceLocationsPage({ params }: Props) {
  const service = getServiceBySlug(params.service)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/services" },
                  { label: service.name, href: `/services/${service.slug}`, isCurrent: false },
                  { label: "Locations", href: `/locations/${service.slug}`, isCurrent: true },
                ]}
              />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{service.name} Locations</h1>
            <p className="mt-4 text-lg">Find {service.name.toLowerCase()} services in your area</p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Areas We Cover for {service.name}</h2>
            <p className="mt-2 text-gray-600">
              We provide {service.name.toLowerCase()} services across the West Midlands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationServiceCard key={location.slug} location={location} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Need {service.name}?</h2>
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
