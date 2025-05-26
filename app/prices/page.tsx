import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boiler Repair & Service Prices | Birmingham Boiler Repairs",
  description:
    "Transparent pricing for boiler repairs, servicing and gas safety inspections in Birmingham. No hidden fees, no VAT charged.",
  keywords: "boiler repair prices Birmingham, boiler service cost, gas safety inspection price, no VAT boiler repair",
}

export default function PricesPage() {
  const pricingCategories = [
    {
      title: "Boiler Servicing",
      items: [
        {
          service: "Standard Boiler Service",
          price: "£55",
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
          price: "£75 first hr / £30 per ½ hr",
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
        { service: "Ferroli Service", price: "£55", description: "Specialized service for Ferroli boiler systems" },
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

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Ready to book a service?</h2>
              <p className="mt-2 text-lg">Contact us today for a fast, reliable service</p>
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
