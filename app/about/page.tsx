import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, CheckCircle } from "lucide-react"
import TrustBadges from "@/components/trust-badges"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Birmingham Boiler Repairs | Gas Safe Engineers",
  description:
    "Family-run Gas Safe registered boiler repair company established in 2010. Meet our team of experienced engineers serving Birmingham and surrounding areas.",
  keywords: "Birmingham boiler repairs, gas safe engineers, family-run business, boiler repair team, about us",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/about",
  },
}

export default function AboutPage() {
  const team = [
    {
      name: "Dave",
      role: "Breakdown Engineer",
      bio: "Extensive fault-finding expertise; front-line problem-solver.",
      image: "/images/dave_about_us.png",
    },
    {
      name: "Jordon",
      role: "Service Engineer",
      bio: "Specialist in servicing, repairs & gas inspections.",
      image: "/images/jordon_about_us.png",
    },
    {
      name: "Andy",
      role: "Gas Service Engineer",
      bio: "Gas-safety focused and customer-care driven.",
      image: "/images/andy_about_us.png",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">About Birmingham Boiler Repairs</h1>
            <p className="mt-4 text-lg">Family-run business with over 10 years of experience</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
              <Image
                src="/images/about_us_page.png"
                alt="Birmingham Boiler Repairs Team"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Birmingham Boiler Repairs is a family-run, Gas Safe registered company (No. 520077) established in
                  2010. We specialize in boiler repairs, servicing, and gas safety inspections across Birmingham and
                  surrounding areas.
                </p>
                <p>
                  Our team of experienced engineers takes pride in providing fast, reliable service with transparent
                  pricing. We're known for our same-day call-outs (when booked before 12pm) and our vans are stocked
                  with parts for all major brands including Worcester, Vaillant, Baxi, Ferroli, and Ideal. We are
                  specialists and experts in fixing Ferroli boilers, with extensive training and experience in
                  diagnosing and repairing these complex systems.
                </p>
                <p>
                  What sets us apart is our commitment to customer satisfaction and our no-nonsense approach to pricing
                  - we don't charge VAT, there are no hidden fees, and we're always upfront about costs.
                </p>
              </div>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild className="bg-primary text-gray-900 hover:bg-primary/90">
                  <Link href="/services">Our Services</Link>
                </Button>
                <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Our experienced Gas Safe registered engineers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="mb-4 text-sm font-medium text-secondary">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Accreditations</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We're proud to be recognized by industry leaders
            </p>
          </div>

          <TrustBadges />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start">
              <CheckCircle className="mr-3 h-6 w-6 text-secondary" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Gas Safe Registered</h3>
                <p className="text-gray-600 dark:text-gray-400">Registration number: 520077</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="mr-3 h-6 w-6 text-secondary" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Competitive Pricing</h3>
                <p className="text-gray-600 dark:text-gray-400">No VAT charged on any services</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="mr-3 h-6 w-6 text-secondary" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Same-Day Service</h3>
                <p className="text-gray-600 dark:text-gray-400">When booked before 12pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Ready to work with us?</h2>
              <p className="mt-2 text-lg">Contact our team for all your boiler needs</p>
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
