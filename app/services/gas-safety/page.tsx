import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import ReviewsDisplay from "@/components/reviews-display"
import ServiceCallout from "@/components/emergency-callout"
import PromoCallout from "@/components/promo-callout"

export const metadata: Metadata = {
  title: "Gas Safety Inspections Birmingham | Landlord Certificates",
  description:
    "Professional Gas Safety Inspections and Landlord Certificates in Birmingham. Digital certificates, competitive pricing, Gas Safe registered engineers.",
  keywords: "gas safety inspection Birmingham, landlord gas safety certificate, CP12 certificate, gas safety check",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/gas-safety",
  },
}

export default function GasSafetyPage() {
  const service = {
    id: "gas-safety",
    title: "Gas Safety Inspections",
    description:
      "Certified checks to keep your home compliant and safe. Digital certificates provided with a reminder service.",
    image: "/images/services_gas_safety_page.png",
    features: ["£45 for 1 appliance", "£50 for 2 appliances", "£60 for 3 appliances", "Digital certificates"],
    longDescription: `
      <p>Gas Safety Inspections (also known as CP12 or Landlord Gas Safety Certificates) are a legal requirement for landlords and provide peace of mind for homeowners. Our Gas Safe registered engineers conduct thorough inspections of all gas appliances to ensure they're operating safely and efficiently.</p>
      
      <p>We check for gas leaks, ensure proper ventilation, test gas pressures, and verify that all safety devices are functioning correctly. After the inspection, we provide a digital certificate that can be easily shared with tenants, letting agents, or local authorities.</p>
      
      <p>For landlords, we offer a reminder service to ensure you never miss your annual inspection, helping you stay compliant with regulations. Homeowners can also benefit from regular gas safety checks to ensure the safety of their family and property.</p>
      <p>For maximum convenience and value, add a boiler service to your gas safety inspection for just £45 - saving you £10 off the regular price. This combined service ensures both your boiler's efficiency and the safety of all your gas appliances in a single visit.</p>
    `,
    pricing: [
      {
        title: "1 Appliance",
        price: "£45",
        description: "Digital certificate, reminder service, no VAT charged, landlord certificates.",
      },
      {
        title: "2 Appliances",
        price: "£50",
        description: "Digital certificate, reminder service, no VAT charged, landlord certificates.",
      },
      {
        title: "3 Appliances",
        price: "£60",
        description: "Digital certificate, reminder service, no VAT charged, landlord certificates.",
      },
      {
        title: "Add Boiler Service",
        price: "£45",
        description: "Save £10 when you combine with any gas safety inspection. Regular price £55.",
      },
    ],
    faqs: [
      {
        question: "How often do I need a Gas Safety Inspection?",
        answer:
          "For landlords, Gas Safety Inspections are legally required annually. For homeowners, while not legally required, we recommend annual inspections for safety.",
      },
      {
        question: "What appliances need to be checked?",
        answer:
          "All gas appliances need to be checked, including boilers, gas fires, gas cookers, and gas water heaters.",
      },
      {
        question: "How long does a Gas Safety Inspection take?",
        answer:
          "A typical inspection takes about 30-45 minutes per appliance, depending on accessibility and condition.",
      },
      {
        question: "What happens if an appliance fails the inspection?",
        answer:
          "If an appliance fails, we'll explain why and provide options for repair or replacement. For serious safety issues, we may need to disconnect the appliance and issue a warning notice.",
      },
      {
        question: "Is it worth combining a boiler service with my gas safety inspection?",
        answer:
          "Yes, combining these services offers excellent value. You'll save £10 compared to booking separately, and both essential maintenance tasks are completed in a single visit, saving you time. The combined service ensures both your boiler's efficiency and the safety of all your gas appliances.",
      },
    ],
  }

  return (
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
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Gas Safety Inspections in Birmingham</h1>
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
                      src={service.image || "/images/services_gas_safety_page.png"}
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
                      <a href="tel:08003202345" className="flex items-center gap-2" aria-label="Book an Inspection Now">
                        <Phone size={16} />
                        Book an Inspection Now
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Inspection Pricing</h2>
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

              {/* Special Offer Callout */}
              <div className="mt-8">
                <PromoCallout
                  title="SPECIAL OFFER: Combined Gas Safety & Boiler Service"
                  description="Book a gas safety inspection and add a boiler service for just £45 extra - saving £10 off the regular price. Get both essential services completed in a single visit by our Gas Safe engineers."
                  ctaText="Book Combined Service"
                  ctaLink="tel:08003202345"
                  variant="highlight"
                />
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
              <ReviewsDisplay serviceFilter="gas-safety" limit={3} showFilters={false} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Need a Gas Safety Inspection?</h2>
              <p className="mt-2 text-lg">Ensure your gas appliances are safe and compliant</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
              <a href="tel:08003202345" className="flex items-center gap-2" aria-label="Call Now: 0800 320 2345">
                <Phone size={18} />
                Call Now: 0800 320 2345
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
