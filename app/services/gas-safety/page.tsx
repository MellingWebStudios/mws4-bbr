import Link from "next/link"
import Image from "next/image"
import { Phone, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import ReviewsDisplay from "@/components/reviews-display"
import ServiceCallout from "@/components/emergency-callout"
import PromoCallout from "@/components/promo-callout"
import TrackedPhoneLink from "@/components/tracked-phone-link"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Gas Safety Inspections Birmingham | Landlord Certificates",
  description:
    "Professional Gas Safety Inspections and Landlord Certificates in Birmingham. Digital certificates, competitive pricing, Gas Safe registered engineers.",
  keywords: "gas safety inspection Birmingham, landlord gas safety certificate, CP12 certificate, gas safety check",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/services/gas-safety",
  },
  openGraph: {
    title: "Gas Safety Inspections Birmingham | Landlord Certificates",
    description: "Professional Gas Safety Inspections and Landlord Certificates in Birmingham. Digital certificates, competitive pricing, Gas Safe registered engineers.",
    url: "https://www.birminghamboilerrepairs.uk/services/gas-safety",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gas Safety Inspections Birmingham - Landlord Certificates",
      }
    ],
  },
}

export default function GasSafetyPage() {
  const service = {
    id: "gas-safety",
    title: "Gas Safety Inspections",
    description:
      "Certified checks to keep your home compliant and safe. Digital certificates provided with a reminder service.",
    image: "/images/services_gas_safety_page.webp",
    features: ["£50 for 1 appliance", "£55 for 2 appliances", "£60 for 3 appliances", "Digital certificates"],
    longDescription: `
      <p>Gas Safety Inspections (also known as CP12 or Landlord Gas Safety Certificates) are a legal requirement for landlords and provide peace of mind for homeowners. Our Gas Safe registered engineers conduct thorough inspections of all gas appliances to ensure they're operating safely and efficiently.</p>
      
      <p>We check for gas leaks, ensure proper ventilation, test gas pressures, and verify that all safety devices are functioning correctly. After the inspection, we provide a digital certificate that can be easily shared with tenants, letting agents, or local authorities.</p>
      
      <p>For landlords, we offer a reminder service to ensure you never miss your annual inspection, helping you stay compliant with regulations. Homeowners can also benefit from regular gas safety checks to ensure the safety of their family and property.</p>
      <p>For maximum convenience and value, add a boiler service to your gas safety inspection for just £50 - saving you £10 off the regular price. This combined service ensures both your boiler's efficiency and the safety of all your gas appliances in a single visit.</p>
    `,
    pricing: [
      {
        title: "1 Appliance",
        price: "£50",
        description: "Digital certificate, reminder service, no VAT charged, landlord certificates.",
      },
      {
        title: "2 Appliances",
        price: "£55",
        description: "Digital certificate, reminder service, no VAT charged, landlord certificates.",
      },
      {
        title: "3 Appliances",
        price: "£60",
        description: "Digital certificate, reminder service, no VAT charged, landlord certificates.",
      },
      {
        title: "Add Boiler Service",
        price: "£50",
        description: "Save £10 when you combine with any gas safety inspection. Regular price £60.",
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
    <>
      <Head>
        <link rel="canonical" href="https://www.birminghamboilerrepairs.uk/services/gas-safety" />
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
                        src={service.image || "/images/services_gas_safety_page.webp"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                      <div
                        className="mb-6 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: service.longDescription }}
                      />
                      <div className="mb-6">
                        <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">What's included:</h4>
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
                        trackingLocation="gas_safety_page"
                        trackingSource="service_info_cta"
                        className="bg-secondary text-white hover:bg-secondary/90 flex items-center gap-2"
                        ariaLabel="Book an Inspection Now"
                      >
                        <Phone size={16} />
                        Book an Inspection Now
                      </TrackedPhoneLink>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Inspection Pricing</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {service.pricing.map((option, index) => (
                    <Card key={index} className="border shadow-md">
                      <CardContent className="p-6">
                        <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{option.title}</h4>
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
                    description="Book a gas safety inspection and add a boiler service for just £50 extra - saving £10 off the regular price. Get both essential services completed in a single visit by our Gas Safe engineers."
                    ctaText="Book Combined Service"
                    ctaLink="tel:08003202345"
                    variant="highlight"
                  />
                </div>
              </div>

              {/* FAQs Section */}
              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {service.faqs.map((faq, index) => (
                    <Card key={index} className="border shadow-md">
                      <CardContent className="p-6">
                        <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Comprehensive Gas Safety Guide */}
              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Complete Gas Safety Guide</h3>
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                  Everything landlords and homeowners need to know about gas safety inspections, legal requirements, and compliance.
                </p>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[
                    {
                      question: "When should a gas inspection be done?",
                      answer: "Every 12 months. It can be done up to 2 months before its due date and still keep the original due date."
                    },
                    {
                      question: "Do I need to do another gas inspection if I have a new tenant moving in?",
                      answer: "Yes, you will need a new gas safety check before a new tenant moves in, even if the previous check is still valid, according to the Health and Safety Executive. The law requires a gas safety check to be carried out annually, and a copy of the Landlord Gas Safety Record (LGSR) must be provided to new tenants at the start of their tenancy. (This is due to the likely event of previous tenants tampering with gas appliances and making them unsafe if they have been given a section 21)"
                    },
                    {
                      question: "Do I need to give the tenant a copy of the certificate?",
                      answer: "Yes, you will need to send a copy of the certificate to the tenants within 28 days. If the tenant is new then this needs to be given before they move in. Advise this is done by email as you can prove that you have sent it, where you cannot prove you have left a paper copy, if it's thrown away."
                    },
                    {
                      question: "Do I need to put the name of the landlord on the gas certificate?",
                      answer: "Yes, this is very important in case you need to issue a section 21 to remove a tenant. The certificate may not be valid if the correct details are not on the landlord details ie property owner or the estate agent details."
                    },
                    {
                      question: "I'm a homeowner. Do I need to do an annual gas inspection?",
                      answer: "Homeowners do not legally need an annual gas safety check. However, if you are buying or selling a property it's advisable to get one done to prove the property is safe. A lot of estate agents and solicitors already ask for this and ask for proof if the boiler has been regularly serviced."
                    },
                    {
                      question: "What happens if a gas inspection is overdue?",
                      answer: "If a gas safety inspection is overdue, a landlord could face significant legal and financial repercussions, including substantial fines, potential imprisonment, and even criminal charges in the event of an accident. Additionally, landlords may be unable to legally evict a tenant using a Section 21 notice."
                    },
                    {
                      question: "What happens if I can't get in to do a gas inspection?",
                      answer: "If a tenant refuses or prevents a landlord from accessing a property for a mandatory gas safety inspection, the landlord must take reasonable steps to arrange the inspection and document all attempts. If these attempts fail, the landlord can pursue legal action, potentially including a court order for access or, in extreme cases, eviction. Give the tenant ample time to arrange a gas inspection. And document all attempts to arrange."
                    },
                    {
                      question: "Is a gas inspection the same as having a boiler service?",
                      answer: "No, a boiler service is different to an annual gas safety check – a yearly inspection of all gas appliances in a property. Gas safety checks are a legal requirement for landlords. A boiler service focuses solely on the boiler, and involves an engineer testing and cleaning certain components."
                    },
                    {
                      question: "Do I need to get the boiler serviced yearly as a landlord?",
                      answer: "There is no lawful time frame for how often a boiler should be serviced. The law states that a landlord must ensure a boiler is safe and operates correctly in line with manufacturer standards. However if the boiler is new then it would need servicing to keep the warranty of the boiler which could be cost effective in the long run. If it isn't new then it's normally at the discretion of the engineer if he feels the boiler needs servicing if it's been poorly maintained in the past. Advise regular servicing but maybe not yearly to show proof as a landlord you are looking after your property."
                    }
                  ].map((faq, index) => (
                    <Card key={index} className="border shadow-md">
                      <CardContent className="p-6">
                        <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
                <ReviewsDisplay serviceFilter="gas-safety" limit={4} showFilters={false} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
              <div>
                <h3 className="text-3xl font-bold">Need a Gas Safety Inspection?</h3>
                <p className="mt-2 text-lg">Ensure your gas appliances are safe and compliant</p>
              </div>
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="gas_safety_page"
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
