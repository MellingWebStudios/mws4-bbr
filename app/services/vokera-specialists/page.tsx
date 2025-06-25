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
  title: "Vokera Boiler Specialists Birmingham | Expert Repairs & Servicing",
  description:
    "Approved Vokera specialists in Birmingham. Expert knowledge of Vokera systems and components with genuine parts and extended warranties.",
  keywords: "Vokera boiler repair Birmingham, Vokera specialist, Vokera boiler service, Vokera parts",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/vokera-specialists",
  },
  openGraph: {
    title: "Vokera Boiler Specialists Birmingham | Expert Repairs & Servicing",
    description: "Approved Vokera specialists in Birmingham. Expert knowledge of Vokera systems and components with genuine parts and extended warranties.",
    url: "https://www.birminghamboilerrepairs.uk/services/vokera-specialists",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vokera Specialists Birmingham - Expert Repairs & Servicing",
      }
    ],
  },
}

export default function VokeraSpecialistsPage() {
  const service = {
    id: "vokera",
    title: "Vokera Specialists",
    description:
      "Approved specialists and experts in fixing Vokera boilers. Expert knowledge of Vokera systems and components.",
    image: "/images/vokera_service.png",
    features: ["Specialist knowledge", "Approved technicians", "Genuine parts", "Extended warranties"],
    longDescription: `
  <p>As approved Vokera specialists, we are experts in fixing Vokera boilers and offer professional repair and maintenance services for all Vokera boiler models. Our engineers have received specialized training directly from Vokera, ensuring they have in-depth knowledge of these systems and their unique components.</p>
  
  <p>Vokera boilers can present specific challenges that general heating engineers may not be familiar with. Our specialist knowledge allows us to diagnose and repair Vokera-specific issues quickly and effectively, saving you time and money.</p>
  
  <p>We stock genuine Vokera parts and can offer extended warranties on our repair work. Whether you need a simple service, a complex repair, or advice on your Vokera boiler, our specialist team is here to help.</p>
`,
    pricing: [
      {
        title: "Vokera Boiler Service",
        price: "£55",
        description: "Professional service for Vokera boiler systems.",
      },
      {
        title: "Vokera Boiler Repair",
        price: "£75",
        description: "Specialist diagnosis and repair for Vokera boilers.",
      },
      {
        title: "Vokera Boiler Service & Repair",
        price: "£99",
        description: "Combined service and repair for Vokera boilers.",
      },
    ],
    faqs: [
      {
        question: "Why do I need a Vokera specialist for my boiler?",
        answer:
          "Vokera boilers have unique designs and components that require specialist knowledge. Our approved technicians understand Vokera-specific issues and have access to genuine parts, ensuring more effective and lasting repairs.",
      },
      {
        question: "Do you offer warranties on Vokera boiler repairs?",
        answer:
          "Yes, we offer extended warranties on our Vokera boiler repair work, giving you peace of mind that your boiler is protected.",
      },
      {
        question: "Can you service all Vokera boiler models?",
        answer:
          "Yes, our technicians are trained to service and repair all Vokera boiler models, from older units to the latest designs.",
      },
      {
        question: "Are your Vokera boiler parts genuine?",
        answer: "Yes, we only use genuine Vokera parts to ensure the best performance and longevity of your boiler.",
      },
    ],
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.birminghamboilerrepairs.uk/services/vokera-specialists" />
      </Head>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.birminghamboilerrepairs.uk/" },
          { name: "Services", item: "https://www.birminghamboilerrepairs.uk/services" },
          { name: "Vokera Specialists", item: "https://www.birminghamboilerrepairs.uk/services/vokera-specialists" },
        ]}
      />
      <FAQSchema faqs={service.faqs} url="https://www.birminghamboilerrepairs.uk/services/vokera-specialists" />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Vokera Specialists", href: "/services/vokera-specialists", isCurrent: true },
                  ]}
                />
                <Link href="/services" className="inline-flex items-center text-white hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Vokera Specialists in Birmingham</h1>
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
                        src={service.image || "/images/vokera.png"}
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
                        trackingLocation="vokera_specialists_page"
                        trackingSource="service_info_cta"
                        className="bg-secondary text-white hover:bg-secondary/90 flex items-center gap-2"
                        ariaLabel="Contact a Vokera Specialist"
                      >
                        <Phone size={16} />
                        Contact a Vokera Specialist
                      </TrackedPhoneLink>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Vokera Specialist Pricing</h2>
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
                <h2 className="text-3xl font-bold">Need help with your Vokera boiler?</h2>
                <p className="mt-2 text-lg">Contact our specialist team for expert assistance</p>
              </div>
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="vokera_specialists_page"
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
