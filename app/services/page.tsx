import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import ServiceCallout from "@/components/emergency-callout"
import LocalServiceAreas from "@/components/local-service-areas"
import ServiceCard from "@/components/service-card"

export const metadata: Metadata = {
  title: "Boiler Repair & Service Birmingham | Same-Day Repairs",
  description:
    "Expert boiler repairs, servicing & gas safety inspections across Birmingham. Gas Safe registered engineers, no call-out fees, same-day service available.",
}

export default function ServicesPage() {
  const services = [
    {
      id: "repairs",
      title: "Boiler Repairs",
      description:
        "Prompt, reliable fixes for leaks, breakdowns and ongoing issues. Same-day service available when booked before 12pm.",
      image: "/placeholder.svg?height=300&width=400",
      features: ["No call-out fee", "No diagnosis fee", "Same-day & weekend options", "Parts for major brands stocked"],
      link: "/services/boiler-repairs",
    },
    {
      id: "servicing",
      title: "Boiler Servicing",
      description:
        "Keep your boiler safe and efficient with expert servicing for all major brands. We offer both standard (£55) and full (£120) servicing options.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "30-minute standard service",
        "Deep clean heat cell (full service)",
        "Flue gas readings",
        "Gas pressure checks",
      ],
      link: "/services/boiler-servicing",
    },
    {
      id: "gas-safety",
      title: "Gas Safety Inspections",
      description:
        "Certified checks to keep your home compliant and safe. Digital certificates provided with a reminder service.",
      image: "/placeholder.svg?height=300&width=400",
      features: ["£45 for 1 appliance", "£50 for 2 appliances", "£60 for 3 appliances", "Digital certificates"],
      link: "/services/gas-safety",
    },
    {
      id: "ferroli",
      title: "Ferroli Boiler Specialists",
      description:
        "Approved specialist for Ferroli repair & maintenance. Expert knowledge of Ferroli systems and components.",
      image: "/placeholder.svg?height=300&width=400",
      features: ["Specialist knowledge", "Approved technicians", "Genuine parts", "Extended warranties"],
      link: "/services/ferroli-specialists",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Our Boiler Services</h1>
            <p className="mt-4 text-lg">Professional boiler services from Gas Safe registered engineers</p>
          </div>
        </div>
      </section>

      {/* Service Callout */}
      <ServiceCallout />

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                id={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                features={service.features}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Areas We Cover</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Serving Birmingham and surrounding areas</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
              <Image src="/placeholder.svg?height=500&width=800" alt="Service Area Map" fill className="object-cover" />
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                We provide boiler services across:
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  "Birmingham City Centre",
                  "Edgbaston",
                  "Harborne",
                  "Selly Oak",
                  "Moseley",
                  "Kings Heath",
                  "Bromsgrove",
                  "Redditch",
                  "Dudley",
                  "Stourbridge",
                  "Kingswinford",
                  "Wolverhampton",
                  "Alvechurch",
                  "Halesowen",
                  "West Bromwich",
                  "Solihull",
                ].map((area, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <ArrowRight className="mr-2 h-4 w-4 text-secondary" />
                    {area}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Not sure if we cover your area? Give us a call and we'll let you know.
                </p>
                <Button asChild className="bg-primary text-gray-900 hover:bg-primary/90">
                  <Link href="tel:08003202345" className="flex items-center gap-2">
                    <Phone size={16} />
                    Call Now: 0800 320 2345
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Service Areas */}
      <LocalServiceAreas />

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Need urgent boiler repair?</h2>
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
