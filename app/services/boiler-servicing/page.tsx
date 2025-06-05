import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import ReviewsDisplay from "@/components/reviews-display"
import ServiceCallout from "@/components/emergency-callout"
import { RelatedServices, RelatedLocations } from "@/components/internal-links"
import { ServiceCrossLinks, SmartContentLinks } from "@/components/contextual-links"
import TrackedPhoneLink from "@/components/tracked-phone-link"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Professional Boiler Servicing Birmingham | Gas Safe Engineers",
  description:
    "Expert boiler servicing in Birmingham from Gas Safe registered engineers. Standard and full service options available with no hidden fees.",
  keywords: "boiler service Birmingham, annual boiler service, boiler maintenance, Gas Safe boiler service",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/boiler-servicing",
  },
}

export default function BoilerServicingPage() {
  const service = {
    id: "servicing",
    title: "Boiler Servicing",
    description:
      "Keep your boiler safe and efficient with expert servicing for all major brands. We offer both standard (£55) and full (£120) servicing options.",
    image: "/images/service_page_image.png",
    features: [
      "30-minute standard service",
      "Deep clean heat cell (full service)",
      "Flue gas readings",
      "Gas pressure checks",
    ],
    longDescription: `
      <p>Regular boiler servicing is essential to maintain efficiency, ensure safety, and extend the lifespan of your heating system. Our Gas Safe registered engineers provide comprehensive boiler servicing for all major brands.</p>
      
      <p>We offer two levels of service to meet your needs. Our standard service includes flue gas readings, gas pressure checks, and a thorough inspection of all key components. For boilers that haven't been serviced in several years, we recommend our full service, which includes a deep clean of the heat cell, recharging of the expansion vessel, and replacement of gaskets.</p>
      
      <p>All our services are carried out to manufacturer specifications, and we provide a detailed report of the work completed. Regular servicing can help prevent costly breakdowns and ensure your warranty remains valid.</p>
    `,
    pricing: [
      {
        title: "Standard Service",
        price: "£55",
        description: "30-minute service, flue gas readings, gas pressure checks. No VAT charged.",
      },
      {
        title: "Full Service",
        price: "£120",
        description: "Deep clean heat cell, recharge expansion vessel, replace gaskets. Recommended every 5 years.",
      },
      {
        title: "Service & Repair",
        price: "£99",
        description: "Service + repair (≤1 hr). Saves £30. Parts extra if needed. No VAT charged.",
      },
    ],
    faqs: [
      {
        question: "How often should I service my boiler?",
        answer:
          "We recommend an annual boiler service to maintain efficiency, ensure safety, and keep your manufacturer's warranty valid.",
      },
      {
        question: "What's the difference between standard and full service?",
        answer:
          "Our standard service covers essential checks and tests. The full service includes a deep clean of the heat cell, recharging the expansion vessel, and replacing gaskets - ideal for boilers that haven't been serviced in several years.",
      },
      {
        question: "Will servicing my boiler save me money?",
        answer:
          "Yes, regular servicing helps maintain your boiler's efficiency, which can reduce energy bills. It also helps prevent costly breakdowns and extends the lifespan of your boiler.",
      },
      {
        question: "How long does a boiler service take?",
        answer:
          "A standard service typically takes around 30 minutes, while a full service may take 1-2 hours depending on the condition of your boiler.",
      },
    ],
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.birminghamboilerrepairs.uk/services/boiler-servicing" />
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4">
                <Link href="/services" className="inline-flex items-center text-white hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Boiler Servicing in Birmingham</h1>
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
                        src={service.image || "images/service_page_image.png"}
                        alt={service.title}
                        fill
                        className="object-cover"
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
                      <Button asChild className="bg-secondary text-white hover:bg-secondary/90">
                        <TrackedPhoneLink
                          phone="08003202345"
                          trackingLocation="boiler_servicing_page"
                          trackingSource="service_pricing_cta"
                          className="flex items-center gap-2"
                          ariaLabel="Book a Service Now"
                        >
                          <Phone size={16} />
                          Book a Service Now
                        </TrackedPhoneLink>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Service Pricing</h2>
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
                <ReviewsDisplay serviceFilter="service" limit={4} showFilters={false} />
              </div>

              {/* Service Cross Links */}
              <div>
                <ServiceCrossLinks 
                  currentService="boiler-servicing" 
                  variant="banner"
                  className="mb-8"
                />
              </div>

              {/* Smart Content Links */}
              <div>
                <SmartContentLinks 
                  content="boiler servicing annual maintenance gas safe engineer birmingham efficiency safety"
                  currentService="boiler-servicing"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Related Services and Locations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Related Services */}
              <div>
                <RelatedServices 
                  currentService="boiler-servicing"
                  showDescription={true}
                  limit={3}
                />
              </div>

              {/* Locations offering this service */}
              <div>
                <RelatedLocations 
                  currentService="boiler-servicing"
                  limit={6}
                  showDescription={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold">Ready to book your boiler service?</h2>
                <p className="mt-2 text-lg">Ensure your boiler is running safely and efficiently</p>
              </div>
              <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
                <TrackedPhoneLink
                  phone="08003202345"
                  trackingLocation="boiler_servicing_page"
                  trackingSource="ready_to_book_cta"
                  className="flex items-center gap-2"
                  ariaLabel="Call Now: 0800 320 2345"
                >
                  <Phone size={18} />
                  Call Now: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
