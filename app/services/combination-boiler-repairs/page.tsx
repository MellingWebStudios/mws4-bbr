import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import ReviewsDisplay from "@/components/reviews-display"
import ServiceCallout from "@/components/emergency-callout"
import TrackedPhoneLink from "@/components/tracked-phone-link"
import Head from "next/head"
import BreadcrumbSchema from "@/components/breadcrumb-schema"
import FAQSchema from "@/components/faq-schema"
import Breadcrumb from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "Combination Boiler Repairs Birmingham | Expert Combi Boiler Fixes",
  description:
    "Professional combination boiler repairs in Birmingham. Expert diagnosis and repair of combi boiler heating and hot water problems. Same-day service available.",
  keywords: "combination boiler repair Birmingham, combi boiler repair, combination boiler fix, combi boiler heating problems",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/combination-boiler-repairs",
  },
  openGraph: {
    title: "Combination Boiler Repairs Birmingham | Expert Combi Boiler Fixes",
    description: "Professional combination boiler repairs in Birmingham. Expert diagnosis and repair of combi boiler heating and hot water problems. Same-day service available.",
    url: "https://www.birminghamboilerrepairs.uk/services/combination-boiler-repairs",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Combination Boiler Repairs Birmingham - Expert Combi Boiler Fixes",
      }
    ],
  },
}

export default function CombinationBoilerRepairsPage() {
  const service = {
    id: "combination-boiler-repairs",
    title: "Combination Boiler Repairs",
    description:
      "Specialist repairs for combination boilers. Expert diagnosis and repair of combi boiler issues including heating and hot water problems.",
    image: "/images/combi_repair_page.png",
    features: ["No call-out fee", "Same-day service available", "All major combi brands", "Hot water & heating repairs"],
    longDescription: `
  <p>Our combination boiler repair specialists provide expert diagnosis and repair services for all types of combi boiler problems. Whether you're experiencing issues with heating, hot water, or both, our Gas Safe registered engineers have the expertise to get your combination boiler working efficiently again.</p>
  
  <p>Combination boilers are complex systems that combine central heating and hot water production in one unit. When problems occur, they can affect both your heating and hot water supply. Our specialists understand the intricacies of combi boiler systems and can quickly diagnose issues such as low water pressure, no hot water, heating problems, and unusual noises.</p>
  
  <p>We offer same-day repairs when booked before 12pm and carry a comprehensive range of parts for all major combination boiler brands. With no call-out fees and transparent pricing, you can trust us to provide honest, professional service every time.</p>
`,
    pricing: [
      {
        title: "Combination Boiler Diagnosis",
        price: "£0",
        description: "Free diagnosis with any repair work carried out.",
      },
      {
        title: "Standard Combi Repair",
        price: "£75",
        description: "Professional repair for most combination boiler issues.",
      },
      {
        title: "Emergency Combi Repair",
        price: "£125",
        description: "Same-day emergency repairs for urgent combination boiler problems.",
      },
    ],
    faqs: [
      {
        question: "What are the most common combination boiler problems?",
        answer:
          "Common combi boiler issues include no hot water, low water pressure, heating not working, unusual noises, and error codes on the display. Our specialists can diagnose and repair all these problems.",
      },
      {
        question: "How quickly can you repair my combination boiler?",
        answer:
          "We offer same-day repairs when booked before 12pm. For emergency situations, we aim to have an engineer with you within 2-4 hours of your call.",
      },
      {
        question: "Do you repair all brands of combination boilers?",
        answer:
          "Yes, our engineers are trained to work on all major combination boiler brands including Worcester Bosch, Vaillant, Baxi, Ideal, Ferroli, and many others.",
      },
      {
        question: "What's included in your combination boiler repair service?",
        answer: "Our service includes free diagnosis, professional repair work, genuine parts where needed, testing, and a guarantee on all work completed.",
      },
    ],
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.birminghamboilerrepairs.uk/services/combination-boiler-repairs" />
      </Head>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.birminghamboilerrepairs.uk/" },
          { name: "Services", item: "https://www.birminghamboilerrepairs.uk/services" },
          { name: "Combination Boiler Repairs", item: "https://www.birminghamboilerrepairs.uk/services/combination-boiler-repairs" },
        ]}
      />
      <FAQSchema faqs={service.faqs} url="https://www.birminghamboilerrepairs.uk/services/combination-boiler-repairs" />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Combination Boiler Repairs", href: "/services/combination-boiler-repairs", isCurrent: true },
                  ]}
                />
                <Link href="/services" className="inline-flex items-center text-white hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Combination Boiler Repairs in Birmingham</h1>
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
                        src={service.image || "/images/combination_boiler_repairs.png"}
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
                      <TrackedPhoneLink
                        phone="08003202345"
                        trackingLocation="combination_boiler_repairs_page"
                        trackingSource="service_info_cta"
                        className="bg-secondary text-white hover:bg-secondary/90 flex items-center gap-2"
                        ariaLabel="Book Combination Boiler Repair"
                      >
                        <Phone size={16} />
                        Book Combination Boiler Repair
                      </TrackedPhoneLink>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Combination Boiler Repair Pricing</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {service.pricing.map((option, index) => (
                    <Card key={index} className="border shadow-md">
                      <CardContent className="p-6 text-center">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{option.title}</h3>
                        <div className="mb-4 flex items-baseline justify-center">
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
                <ReviewsDisplay limit={4} showFilters={false} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold">Need your combination boiler repaired?</h2>
                <p className="mt-2 text-lg">Same-day service available when booked before 12pm</p>
              </div>
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="combination_boiler_repairs_page"
                trackingSource="bottom_cta"
                className="bg-primary text-gray-900 hover:bg-primary/90 flex items-center gap-2"
                ariaLabel="Call Now: 0800 320 2345"
              >
                <Phone size={18} />
                Call Now: 0800 320 2345
              </TrackedPhoneLink>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
