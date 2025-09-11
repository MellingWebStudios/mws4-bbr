import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Boiler Repair & Service Prices | Birmingham Boiler Repairs",
  description:
    "Transparent pricing for boiler repairs, servicing and gas safety inspections in Birmingham. No hidden fees, no VAT charged.",
  keywords: "boiler repair prices Birmingham, boiler service cost, gas safety inspection price, no VAT boiler repair",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/prices",
  },
  openGraph: {
    title: "Boiler Repair & Service Prices | Birmingham Boiler Repairs",
    description: "Transparent pricing for boiler repairs, servicing and gas safety inspections in Birmingham. No hidden fees, no VAT charged.",
    url: "https://www.birminghamboilerrepairs.uk/prices",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birmingham Boiler Repairs Prices - Gas Safe Engineers",
      }
    ],
  },
}

export default function PricesPage() {
  const pricingCategories = [
    {
      title: "Boiler Servicing",
      items: [
        {
          service: "Standard Boiler Service",
          price: "£60",
          description: "30-min service, flue readings, gas-pressure checks",
        },
        {
          service: "Full Boiler Service",
          price: "£120",
          description: "Deep clean heat cell, recharge expansion vessel, replace gaskets (recommended every 5 yrs)",
        },
        {
          service: "Service & Repair (≤1 hr)",
          price: "£99",
          description: "Saves £30 if repair done during service; parts extra",
        },
      ],
    },
    {
      title: "Boiler Repairs",
      items: [
        { service: "Same-Day Repair", price: "£99", description: "No call-out or diagnosis fee; parts extra" },
        { service: "Weekend Repair", price: "£110", description: "Same benefits as above" },
        {
          service: "Boiler Repair (hourly)",
          price: "£75 first hr / £35 per ½ hr",
          description: "Capped if job runs over an 2½ hour",
        },
      ],
    },
    {
      title: "Gas Safety Inspections",
      items: [
        { service: "1 Appliance", price: "£45", description: "Paperless certificate" },
        { service: "2 Appliances", price: "£50", description: "Paperless certificate" },
        { service: "3 Appliances", price: "£60", description: "Paperless certificate" },
        {
          service: "Add boiler service",
          price: "£45",
          description: "When combined with gas safety inspection (Save £10)",
        },
      ],
    },
    {
      title: "Ferroli Specialists",
      items: [
        { service: "Ferroli Repair", price: "£75", description: "Specialist diagnosis and repair for Ferroli boilers"},
        { service: "Ferroli Repair (same day)", price: "£95", description: "Same-day service for Ferroli boiler repairs" },
        { service: "Ferroli Service", price: "£60", description: "Specialized service for Ferroli boiler systems" },
        { service: "Full Ferroli Service", price: "£120", description: "Comprehensive service for Ferroli boiler systems" },
      ],
    },
  ]

  const benefits = [
    "No VAT charged on any services",
    "No hidden fees or surprise charges",
    "Same-day service when booked before 12pm",
    "All work carried out by Gas Safe registered engineers",
    "Parts stocked for all major boiler brands",
    "Both card and cash payments accepted",
  ]

  const gasInspectionFaqs = [
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
  ]

  const smokeAlarmFaqs = [
    {
      question: "When was it compulsory to need a smoke alarm for rented properties?",
      answer: "October 1st, 2015"
    },
    {
      question: "Where should smoke alarms be fitted?",
      answer: "They should be fitted on each floor like a hallway or the landing in a well-ventilated space, at least 30 cm away from a wall or a light fitting."
    },
    {
      question: "Whose responsibility is it for a smoke alarm?",
      answer: "It is the landlords responsibility to ensure a smoke alarm is fitted correctly and is in date."
    },
    {
      question: "Whose responsibility is it for the maintenance of my smoke alarm?",
      answer: "It is a landlord's responsibility to replace and maintain the smoke alarm via yearly checks and a gas engineer will test them on the annual gas inspection. Note it is the tenants responsibility to ensure the smoke alarm works also by testing it at regular intervals (weekly) and if it's not working to report it to the landlord. If a battery needs replacing then the tenant can also replace the battery."
    },
    {
      question: "What if the smoke alarm doesn't appear to have an expiry day or date of installation?",
      answer: "You have to be vigilant and assume that the smoke alarm is out of date and replace it."
    },
    {
      question: "Can a gas inspection (CP12) fail if I haven't got a smoke alarm?",
      answer: "Yes it will fail. It is part of the test on a gas inspection. If it's not working or is missing. Then it is a failed inspection. However if you are doing a gas inspection to sell your property then you don't legally need one as you aren't renting to tenants."
    },
    {
      question: "Can I as a landlord be fined for failure to supply a smoke alarm?",
      answer: "Yes, up to £5,000"
    }
  ]

  const carbonMonoxideFaqs = [
    {
      question: "When was it compulsory to need a carbon monoxide alarm for a rented property?",
      answer: "1st October 2022"
    },
    {
      question: "Where shall I install the CO alarm?",
      answer: "1-3 meters of a gas appliance (except cookers and hobs) at head height level where possible."
    },
    {
      question: "Can I be fined if I don't have a CO alarm?",
      answer: "Yes up to £5000"
    },
    {
      question: "Can a gas inspection (Cp12) fail if there isn't a CO alarm?",
      answer: "Yes. However if you're having a gas inspection to sell your house you won't legally need one. As you aren't renting to tenants."
    },
    {
      question: "What if I can't see the expiry date?",
      answer: "Best practice is to assume it's expired and replace it."
    },
    {
      question: "Can I put a CO alarm on top of my boiler?",
      answer: "No. it must be fitted at head height if possible. 1-3m away from the boiler on a shelf or fixed to a wall."
    },
    {
      question: "Do I need a CO alarm if I'm a homeowner?",
      answer: "No law mandates co alarms for homeowners. However it is recommended."
    },
    {
      question: "Do I need to fit a CO alarm if fitting or replacing a new boiler?",
      answer: "Yes for private homeowners and landlords. This would be fitted by the gas safe Installer at the time of installation."
    },
    {
      question: "Who is responsible for the CO alarm and testing?",
      answer: "The landlord is responsible to ensure it's fitted and working correctly. The gas engineer will test this once a year along the gas inspection. The tenant should test the alarm at regular intervals, usually once a week and report any faults to the landlord."
    },
    {
      question: "Can I fit a CO alarm in the bathroom if the boiler is there?",
      answer: "This is a bit of a grey area. But technically no due to steam. But can be fitted close to the bathroom."
    },
    {
      question: "Do I need a CO alarm for a gas cooker or a gas hob?",
      answer: "No. it's not a legal requirement, a co alarm isn't required for them solely. If a boiler is in the same room then a co alarm will be fitted more closely to the boiler."
    },
    {
      question: "What do I do if my carbon monoxide alarm goes off?",
      answer: "Stay calm. Ventilate the property by opening doors or Windows. If it's safe to do so turn the gas appliances off. Shut off the gas. Vacate the property. Contact a local gas safe engineer to find out the cause of why the alarm is going off. Get medical help if you are suffering from side effects of carbon monoxide poisoning."
    },
    {
      question: "What is carbon monoxide?",
      answer: "Carbon monoxide is a colourless, tasteless, odourless, non-irritating gas produced as a by-product during incomplete combustion of fuels due to there being insufficient oxygen present. Complete combustion occurs when sufficient oxygen is present and leads to the production of carbon dioxide. Most combustion processes (natural or man-made) produce some carbon monoxide."
    },
    {
      question: "What are the side effects of carbon monoxide poisoning?",
      answer: "When breathed in, carbon monoxide enters the blood through the lungs and attaches to the body's oxygen carrier, haemoglobin. This reduces the amount of oxygen that can be carried round the body. A brief exposure to small amounts of carbon monoxide may cause headache, flushing, nausea, dizziness, vertigo, muscle pain or personality changes. Exposure to higher amounts may cause movement problems, weakness, confusion, lung and heart problems, loss of consciousness and death. Exposure to small amounts of carbon monoxide for a long time may lead to flu like symptoms with tiredness, headaches, nausea, dizziness, personality changes, memory problems, loss of vision and dementia. It can be hard to tell the difference between the effects of being exposed to carbon monoxide at low levels for a long time and other common illnesses."
    },
    {
      question: "How can I prevent the possibility of carbon monoxide?",
      answer: "Fit a carbon monoxide alarm in any room with a gas appliance that burns fossil fuels. Regularly service your gas appliances. Check to see if the CO alarm works periodically (weekly) by pressing the button until the alarm sounds."
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Our Prices</h1>
            <p className="mt-4 text-lg">Transparent pricing with no hidden fees or VAT</p>
          </div>
        </div>
      </section>

      {/* Price Promise Section */}
      <section className="bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Price Promise</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We believe in transparent pricing with no hidden costs. All prices shown are the final amount you'll pay -
              we don't charge VAT.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tables Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {pricingCategories.map((category, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                <Table>
                  <TableCaption>All prices are final - No VAT charged</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Service</TableHead>
                      <TableHead className="w-[150px]">Price</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{item.service}</TableCell>
                        <TableCell className="text-secondary">{item.price}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basic FAQ Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "Do you charge for call-outs?",
                answer:
                  "No, we don't charge any call-out fees. You only pay for the service or repair work carried out.",
              },
              {
                question: "How quickly can you attend?",
                answer: "We offer same-day service when booked before 12pm, subject to availability.",
              },
              {
                question: "Do you charge VAT?",
                answer:
                  "No, we don't charge VAT on any of our services, making our pricing more transparent and affordable.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept both card and cash payments for your convenience.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Comprehensive Service Guide</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Everything you need to know about gas safety, boiler maintenance, and safety requirements
            </p>
          </div>

          {/* Gas Inspections FAQ */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Gas Inspections</h3>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {gasInspectionFaqs.map((faq, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Smoke Alarms FAQ */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Smoke Alarms</h3>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {smokeAlarmFaqs.map((faq, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Carbon Monoxide Alarms FAQ */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Carbon Monoxide Alarms</h3>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {carbonMonoxideFaqs.map((faq, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Ready to book a service?</h2>
              <p className="mt-2 text-lg">Contact us today for a fast, reliable service</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
              <TrackedPhoneLink 
                phone="08003202345" 
                trackingLocation="prices_page"
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
  )
}
