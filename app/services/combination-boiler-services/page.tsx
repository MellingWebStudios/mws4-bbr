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
  title: "Combination Boiler Services Birmingham | Professional Combi Boiler Servicing",
  description:
    "Professional combination boiler servicing in Birmingham. Keep your combi boiler running efficiently with our comprehensive service options from £55.",
  keywords: "combination boiler service Birmingham, combi boiler servicing, combination boiler maintenance, combi boiler service",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/combination-boiler-services",
  },
  openGraph: {
    title: "Combination Boiler Services Birmingham | Professional Combi Boiler Servicing",
    description: "Professional combination boiler servicing in Birmingham. Keep your combi boiler running efficiently with our comprehensive service options from £55.",
    url: "https://www.birminghamboilerrepairs.uk/services/combination-boiler-services",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Combination Boiler Services Birmingham - Professional Combi Boiler Servicing",
      }
    ],
  },
}

export default function CombinationBoilerServicesPage() {
  const service = {
    id: "combination-boiler-services",
    title: "Combination Boiler Services",
    description:
      "Professional servicing for combination boilers. Keep your combi boiler running efficiently with our comprehensive service options.",
    image: "/images/combi_service_page.png",
    features: ["Standard service £55", "Full service £120", "Efficiency checks", "Hot water flow testing"],
    longDescription: `
  <p>Regular servicing is essential for keeping your combination boiler running safely and efficiently. Our professional combination boiler service includes comprehensive checks of both the heating and hot water functions, ensuring your combi boiler operates at peak performance.</p>
  
  <p>We offer two service levels: our standard service (£55) covers essential safety checks, gas pressure testing, and basic maintenance, while our full service (£120) includes additional deep cleaning of the heat exchanger, detailed efficiency testing, and hot water flow rate analysis.</p>
  
  <p>All our combination boiler services are carried out by Gas Safe registered engineers who understand the specific requirements of combi boiler systems. Regular servicing not only ensures safety but can also help identify potential issues before they become costly repairs, ultimately saving you money and ensuring reliable heating and hot water all year round.</p>
`,
    pricing: [
      {
        title: "Standard Combi Service",
        price: "£55",
        description: "Essential safety checks and basic maintenance for your combination boiler.",
      },
      {
        title: "Full Combi Service",
        price: "£120",
        description: "Comprehensive service including deep cleaning and efficiency testing.",
      },
      {
        title: "Annual Service Plan",
        price: "£45",
        description: "Save money with our annual service plan - only £45 per service.",
      },
    ],
    faqs: [
      {
        question: "How often should I service my combination boiler?",
        answer:
          "We recommend servicing your combination boiler annually to ensure it operates safely and efficiently. Regular servicing can also help maintain your boiler's warranty.",
      },
      {
        question: "What's the difference between standard and full combination boiler service?",
        answer:
          "Our standard service covers essential safety checks and basic maintenance, while the full service includes additional deep cleaning, detailed efficiency testing, and hot water performance analysis.",
      },
      {
        question: "Will servicing my combination boiler save me money?",
        answer:
          "Yes, regular servicing can improve efficiency by up to 15%, reducing your energy bills. It also helps prevent costly breakdowns by identifying issues early.",
      },
      {
        question: "How long does a combination boiler service take?",
        answer: "A standard service typically takes 30-45 minutes, while a full service can take 60-90 minutes depending on the condition and complexity of your combination boiler.",
      },
    ],
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.birminghamboilerrepairs.uk/services/combination-boiler-services" />
      </Head>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.birminghamboilerrepairs.uk/" },
          { name: "Services", item: "https://www.birminghamboilerrepairs.uk/services" },
          { name: "Combination Boiler Services", item: "https://www.birminghamboilerrepairs.uk/services/combination-boiler-services" },
        ]}
      />
      <FAQSchema faqs={service.faqs} url="https://www.birminghamboilerrepairs.uk/services/combination-boiler-services" />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Combination Boiler Services", href: "/services/combination-boiler-services", isCurrent: true },
                  ]}
                />
                <Link href="/services" className="inline-flex items-center text-white hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Combination Boiler Services in Birmingham</h1>
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
                        src={service.image || "/images/combination_boiler_services.png"}
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
                        trackingLocation="combination_boiler_services_page"
                        trackingSource="service_info_cta"
                        className="bg-secondary text-white hover:bg-secondary/90 flex items-center gap-2"
                        ariaLabel="Book Combination Boiler Service"
                      >
                        <Phone size={16} />
                        Book Combination Boiler Service
                      </TrackedPhoneLink>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Combination Boiler Service Pricing</h2>
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
                <h2 className="text-3xl font-bold">Ready to service your combination boiler?</h2>
                <p className="mt-2 text-lg">Book your annual service to keep your combi boiler running efficiently</p>
              </div>
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="combination_boiler_services_page"
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
