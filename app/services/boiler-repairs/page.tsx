import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import ReviewsDisplay from "@/components/reviews-display"
import ServiceCallout from "@/components/emergency-callout"
import FAQSchema from "@/components/faq-schema"
import RelatedServices from "@/components/related-services"
import Breadcrumb from "@/components/breadcrumb"
import BreadcrumbSchema from "@/components/breadcrumb-schema"
import TrackingButton from "@/components/tracking-button"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Professional Boiler Repairs Birmingham | Same-Day Service",
  description:
    "Expert boiler repair service in Birmingham with same-day availability. No call-out fee, transparent pricing, and Gas Safe registered engineers.",
  keywords: "boiler repairs Birmingham, emergency boiler repair, boiler breakdown service, same-day boiler repair",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/boiler-repairs",
  },
}

export default function BoilerRepairsPage() {
  const service = {
    id: "repairs",
    title: "Boiler Repairs",
    description:
      "Prompt, reliable fixes for leaks, breakdowns and ongoing issues. Same-day service available when booked before 12pm.",
    image: "images/service_boiler_repair.png",
    features: ["No call-out fee", "No diagnosis fee", "Same-day & weekend options", "Parts for major brands stocked"],
    longDescription: `
      <p>Our professional boiler repair service is designed to get your heating and hot water back up and running as quickly as possible. We understand that a broken boiler can be a major inconvenience, which is why we offer same-day service when booked before 12pm.</p>
      
      <p>Our Gas Safe registered engineers are experienced in diagnosing and repairing all types of boiler issues, from minor faults to complete breakdowns. We stock parts for all major brands including Worcester, Vaillant, Baxi, and Ferroli, allowing us to complete most repairs in a single visit.</p>
      
      <p>Unlike many other companies, we don't charge call-out fees or separate diagnosis charges. You only pay for the repair work itself, with our transparent pricing ensuring no nasty surprises.</p>
    `,
    pricing: [
      {
        title: "Same-Day Repair",
        price: "£99",
        description: "No call-out fee, no diagnosis fee. Parts extra if needed. Book before 12pm for same-day service.",
      },
      {
        title: "Weekend Repair",
        price: "£110",
        description: "Available Saturday & Sunday. No call-out fee, no diagnosis fee. Parts extra if needed.",
      },
      {
        title: "Hourly Rate",
        price: "£75 first hr / £30 per ½ hr",
        description: "For complex repairs. Capped rates, no hidden charges.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you attend to my boiler repair?",
        answer:
          "We offer same-day service when booked before 12pm, subject to availability. For emergency repairs, we prioritize appointments to get to you as quickly as possible.",
      },
      {
        question: "Do you charge a call-out fee?",
        answer: "No, we don't charge any call-out fees. You only pay for the repair work carried out.",
      },
      {
        question: "What boiler brands do you repair?",
        answer:
          "We repair all major boiler brands including Worcester, Vaillant, Baxi, Ideal, Ferroli, and many more. Our vans are stocked with common parts to complete repairs in a single visit.",
      },
      {
        question: "Do you provide a guarantee on repairs?",
        answer: "Yes, all our repair work comes with a 12-month guarantee for your peace of mind.",
      },
    ],
  }

  const allServices = [
    {
      title: "Boiler Repairs",
      description: "Same-day repairs for all boiler makes and models.",
      link: "/services/boiler-repairs",
    },
    {
      title: "Boiler Servicing",
      description: "Regular maintenance to keep your boiler efficient and safe.",
      link: "/services/boiler-servicing",
    },
    {
      title: "Gas Safety Inspections",
      description: "Certified checks for homeowners and landlords.",
      link: "/services/gas-safety",
    },
    {
      title: "Ferroli Specialists",
      description: "Expert service for Ferroli boiler systems.",
      link: "/services/ferroli-specialists",
    },
  ]

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.birminghamboilerrepairs.uk/services/boiler-repairs" />
      </Head>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.birminghamboilerrepairs.uk/" },
          { name: "Services", item: "https://www.birminghamboilerrepairs.uk/services" },
          { name: "Boiler Repairs", item: "https://www.birminghamboilerrepairs.uk/services/boiler-repairs" },
        ]}
      />
      <FAQSchema faqs={service.faqs} url="https://www.birminghamboilerrepairs.uk/services/boiler-repairs" />

      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: "Services", href: "/services" },
                  { label: "Boiler Repairs", href: "/services/boiler-repairs", isCurrent: true },
                ]}
              />
              <Link href="/services" className="inline-flex items-center text-white hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Boiler Repairs in Birmingham</h1>
            <p className="mt-4 text-lg">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Service Callout */}
      <ServiceCallout />

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            <Card className="overflow-hidden border shadow-md mb-8">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="relative h-64 w-full md:h-auto">
                    <Image
                      src="/images/service_boiler_repair.png"
                      alt={service.title}
                      fill
                      className="object-cover"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
                    <div
                      className="mb-6 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: service.longDescription }}
                    />
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
                    <TrackingButton
                      href="tel:08003202345"
                      eventName="call_button_click"
                      eventCategory="conversion"
                      eventLabel="boiler_repairs_page"
                      className="bg-secondary text-white hover:bg-secondary/90"
                    >
                      <Phone size={16} />
                      Book a Repair Now
                    </TrackingButton>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Repair Pricing</h2>
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

            {/* FAQs Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {service.faqs.map((faq, index) => (
                  <Card key={index} className="border shadow-md">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
              <ReviewsDisplay serviceFilter="repair" limit={3} showFilters={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Add Related Services section before the CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <RelatedServices currentService="Boiler Repairs" services={allServices} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Need a boiler repair?</h2>
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
    </>
  )
}
