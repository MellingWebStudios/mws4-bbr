"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, CheckCircle, Star, Clock, ShieldCheck, PoundSterlingIcon as Pound } from "lucide-react"
import PricingCard from "@/components/pricing-card"
import TestimonialCarousel from "@/components/testimonial-carousel"
import TrustBadges from "@/components/trust-badges"
import YouTubeSection from "@/components/youtube-section"
import ServiceCallout from "@/components/emergency-callout"
import LocalServiceAreas from "@/components/local-service-areas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MaintenanceTips from "@/components/maintenance-tips"
import BoilerFAQ from "@/components/boiler-faq"
import MobileHero from "@/components/mobile-hero"
import DesktopHero from "@/components/desktop-hero"

export default function Home() {
  // Add this useEffect for parallax scrolling
  useEffect(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const handleScroll = () => {
        document.documentElement.style.setProperty("--scrollY", `${window.scrollY}px`)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Mobile hero - visible on <md screens only */}
      <div className="block md:hidden">
        <MobileHero />
      </div>

      {/* Desktop hero - visible on ≥md screens */}
      <div className="hidden md:block">
        <DesktopHero />
      </div>

      {/* Value Strip - horizontal scrolling on mobile */}
      <section className="bg-gray-100 py-3 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-0 md:px-4">
          <div className="md:flex md:flex-wrap md:items-center md:justify-between md:gap-4 md:text-left stat-bar-scroll">
            <div className="flex items-center stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">No VAT Charged</span>
            </div>
            <div className="flex items-center stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Same-Day Service (before 12pm)</span>
            </div>
            <div className="flex items-center stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">No Call-Out Fee</span>
            </div>
            <div className="flex items-center stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Gas Safe Registered: 520077</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Clock className="h-8 w-8 text-secondary" />,
                title: "Same-Day Service",
                description: "Book before 12pm for same-day repairs",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
                title: "Gas Safe Registered",
                description: "All engineers fully qualified (520077)",
              },
              {
                icon: <Pound className="h-8 w-8 text-secondary" />,
                title: "No Hidden Fees",
                description: "Transparent pricing with no VAT",
              },
              {
                icon: <Star className="h-8 w-8 text-secondary" />,
                title: "Highly Rated",
                description: "4.9/5 stars from 120+ reviews",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
                title: "Ferroli Specialists",
                description: "Experts in fixing Ferroli boiler systems",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-3">{benefit.icon}</div>
                  <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Callout Section */}
      <ServiceCallout />

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Transparent Pricing, No Hidden Fees</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We believe in clear, upfront pricing with no surprises
            </p>
          </div>

          <Tabs defaultValue="repairs" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="repairs">Boiler Repairs</TabsTrigger>
              <TabsTrigger value="servicing">Boiler Servicing</TabsTrigger>
              <TabsTrigger value="safety">Gas Safety</TabsTrigger>
            </TabsList>
            <TabsContent value="repairs">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <PricingCard
                  title="Same-Day Repair"
                  price="£99"
                  features={["No call-out fee", "No diagnosis fee", "Parts extra if needed", "Book before 12pm"]}
                  ctaText="Book a Repair"
                  ctaLink="tel:08003202345"
                  highlighted
                />
                <PricingCard
                  title="Weekend Repair"
                  price="£110"
                  features={["Saturday & Sunday", "No call-out fee", "No diagnosis fee", "Parts extra if needed"]}
                  ctaText="Book a Repair"
                  ctaLink="tel:08003202345"
                />
                <PricingCard
                  title="Hourly Rate"
                  price="£75"
                  features={["First hour", "£30 per ½ hr after", "Capped rates", "No hidden charges"]}
                  ctaText="Book a Repair"
                  ctaLink="tel:08003202345"
                />
              </div>
            </TabsContent>
            <TabsContent value="servicing">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <PricingCard
                  title="Standard Service"
                  price="£55"
                  features={["30-minute service", "Flue gas readings", "Gas pressure checks", "No VAT charged"]}
                  ctaText="Book a Service"
                  ctaLink="tel:08003202345"
                />
                <PricingCard
                  title="Full Service"
                  price="£120"
                  features={[
                    "Deep clean heat cell",
                    "Recharge expansion vessel",
                    "Replace gaskets",
                    "Recommended every 5 years",
                  ]}
                  ctaText="Book a Service"
                  ctaLink="tel:08003202345"
                  highlighted
                />
                <PricingCard
                  title="Service & Repair"
                  price="£99"
                  features={["Service + repair (≤1 hr)", "Saves £30", "Parts extra if needed", "No VAT charged"]}
                  ctaText="Book a Service"
                  ctaLink="tel:08003202345"
                />
              </div>
            </TabsContent>
            <TabsContent value="safety">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <PricingCard
                  title="1 Appliance"
                  price="£45"
                  features={["Digital certificate", "Reminder service", "No VAT charged", "Landlord certificates"]}
                  ctaText="Book an Inspection"
                  ctaLink="tel:08003202345"
                />
                <PricingCard
                  title="2 Appliances"
                  price="£50"
                  features={["Digital certificate", "Reminder service", "No VAT charged", "Landlord certificates"]}
                  ctaText="Book an Inspection"
                  ctaLink="tel:08003202345"
                  highlighted
                />
                <PricingCard
                  title="3 Appliances"
                  price="£60"
                  features={["Digital certificate", "Reminder service", "No VAT charged", "Landlord certificates"]}
                  ctaText="Book an Inspection"
                  ctaLink="tel:08003202345"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              <Link href="/prices">View All Prices</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Maintenance Tips Section */}
      <MaintenanceTips />

      {/* Local Service Areas */}
      <LocalServiceAreas />

      {/* FAQ Section */}
      <BoilerFAQ />

      {/* YouTube Section */}
      <YouTubeSection />

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Don't just take our word for it</p>
          </div>

          <TestimonialCarousel />

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              <Link href="https://g.co/kgs/abcdef" target="_blank" rel="noopener noreferrer">
                Read More Google Reviews
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Book your boiler service today</h2>
              <p className="mt-2 text-lg">Professional service, repairs, and inspections from Gas Safe engineers</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90 w-full md:w-auto">
              <a href="tel:08003202345" className="flex items-center justify-center gap-2" aria-label="Call Now: 0800 320 2345">
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
