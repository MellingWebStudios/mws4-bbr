"use client"

import { useEffect } from "react"
import { Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, CheckCircle, Clock, ShieldCheck, PoundSterlingIcon as Pound } from "lucide-react"
import PricingCard from "@/components/pricing-card"
import TrustBadges from "@/components/trust-badges"
import ServiceCallout from "@/components/emergency-callout"
import LocalServiceAreas from "@/components/local-service-areas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MaintenanceTips from "@/components/maintenance-tips"
import LazyContentLoader from "@/components/lazy-content-loader"
import MobileHero from "@/components/mobile-hero"
import DesktopHero from "@/components/desktop-hero"
import MobileHeroImage from "@/components/server/mobile-hero-image"
import DesktopHeroImage from "@/components/server/desktop-hero-image"
import TrackedPhoneLink from "@/components/tracked-phone-link"

// Utility: throttle function
function throttle<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[];
  return function(this: any, ...args: any[]) {
    const now = Date.now();
    lastArgs = args;
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        last = Date.now();
        timeout = null;
        fn.apply(this, lastArgs);
      }, wait - (now - last));
    }
  } as T;
}

export default function Home() {
  // Add this useEffect for parallax scrolling
  useEffect(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const handleScroll = throttle(() => {
        document.documentElement.style.setProperty("--scrollY", `${window.scrollY}px`);
      }, 100);

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Mobile hero */}
      <section className="block md:hidden relative bg-gradient-to-b from-secondary to-secondary/90 text-white overflow-hidden">
        <div className="px-4 pt-7 pb-12">
          {/* Server-rendered LCP image with trust badge and animations */}
          <MobileHeroImage />
          {/* Interactive content with star rating and CTA */}
          <div className="relative z-10 mt-4">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2">
                <div className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs font-medium">4.9/5 • 120+ reviews</span>
              </div>
            </div>
            <MobileHero />
          </div>
        </div>
      </section>

      {/* Desktop hero */}
      <section className="hidden md:block relative bg-gradient-to-r from-secondary to-secondary/80 py-16 text-white overflow-hidden">
        {/* Creative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Server-rendered LCP image */}
            <DesktopHeroImage />
            {/* Interactive content with CTA */}
            <div className="w-full lg:w-7/12">
              <DesktopHero />
            </div>
          </div>
        </div>
      </section>

      {/* Value Strip */}
      <section className="hidden md:block bg-gray-100 py-3 dark:bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-0 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
            <div className="flex items-center justify-center text-center md:justify-start md:text-left w-full bg-white/70 rounded-lg px-4 py-2 stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">No VAT Charged</span>
            </div>
            <div className="flex items-center justify-center text-center md:justify-start md:text-left w-full bg-white/70 rounded-lg px-4 py-2 stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Same-Day Service</span>
            </div>
            <div className="flex items-center justify-center text-center md:justify-start md:text-left w-full bg-white/70 rounded-lg px-4 py-2 stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">No Call-Out Fee</span>
            </div>
            <div className="flex items-center justify-center text-center md:justify-start md:text-left w-full bg-white/70 rounded-lg px-4 py-2 stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Gas Safe Registered: 520077</span>
            </div>
            <div className="flex items-center justify-center text-center md:justify-start md:text-left w-full bg-white/70 rounded-lg px-4 py-2 stat-chip">
              <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">5-Star Rated Service</span>
            </div>
          </div>
        </div>
      </section>


      {/* Key Benefits Section 
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
      </section>*/}

      {/* Service Callout Section */}
      <ServiceCallout />

      <TrustBadges />

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Transparent Pricing, No Hidden Fees
            </h2>
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
                  features={[
                    "No call-out fee",
                    "No diagnosis fee",
                    "Parts extra if needed",
                    "Book before 12pm",
                  ]}
                  ctaText="Book a Repair"
                  ctaLink="tel:08003202345"
                  highlighted
                />
                <PricingCard
                  title="Weekend Repair"
                  price="£110"
                  features={[
                    "Saturday & Sunday",
                    "No call-out fee",
                    "No diagnosis fee",
                    "Parts extra if needed",
                  ]}
                  ctaText="Book a Repair"
                  ctaLink="tel:08003202345"
                />
                <PricingCard
                  title="Hourly Rate"
                  price="£75"
                  features={[
                    "First hour",
                    "£30 per ½ hr after",
                    "Capped rates",
                    "No hidden charges",
                  ]}
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
                  features={[
                    "30-minute service",
                    "Flue gas readings",
                    "Gas pressure checks",
                    "No VAT charged",
                  ]}
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
                  features={[
                    "Service + repair (≤1 hr)",
                    "Saves £30",
                    "Parts extra if needed",
                    "No VAT charged",
                  ]}
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
                  features={[
                    "Digital certificate",
                    "Reminder service",
                    "No VAT charged",
                    "Landlord certificates",
                  ]}
                  ctaText="Book an Inspection"
                  ctaLink="tel:08003202345"
                />
                <PricingCard
                  title="2 Appliances"
                  price="£50"
                  features={[
                    "Digital certificate",
                    "Reminder service",
                    "No VAT charged",
                    "Landlord certificates",
                  ]}
                  ctaText="Book an Inspection"
                  ctaLink="tel:08003202345"
                  highlighted
                />
                <PricingCard
                  title="3 Appliances"
                  price="£60"
                  features={[
                    "Digital certificate",
                    "Reminder service",
                    "No VAT charged",
                    "Landlord certificates",
                  ]}
                  ctaText="Book an Inspection"
                  ctaLink="tel:08003202345"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <Button
              asChild
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <Link href="/prices">View All Prices</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Maintenance Tips Section */}
      <MaintenanceTips />

      {/* Local Service Areas */}
      <LocalServiceAreas />

      {/* FAQ Section - Lazy Loaded */}
      <LazyContentLoader loadFAQ={true} />

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Don't just take our word for it
            </p>
          </div>

          <LazyContentLoader loadTestimonials={true} />

          <div className="mt-8 text-center">
            <Button
              asChild
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <Link
                href="https://www.google.com/search?sca_esv=0f29376999671a5e&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E4XbkKOA0vKAM72LYjMYjm1ZOIu5C5ZRlfrejaBtyWMT9-kuBdhAvFtxQYr0I-XwS929IxNRMtHb8NK0n-IR-kAoq-x4W15oqj9-OJCgq_pRJ0sL1w%3D%3D&q=Birmingham+Boiler+Repairs+Reviews&sa=X&ved=2ahUKEwjmzL2H7LyNAxUCVUEAHUSiFtYQ0bkNegQIJRAE&biw=1920&bih=989&dpr=1"
                target="_blank"
                rel="Birmingham "
              >
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
              <h2 className="text-3xl font-bold">
                Book your boiler service today
              </h2>
              <p className="mt-2 text-lg">
                Professional service, repairs, and inspections from Gas Safe
                engineers
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-primary text-gray-900 hover:bg-primary/90 w-full md:w-auto"
            >
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="homepage_bottom"
                trackingSource="final_cta"
                className="flex items-center justify-center gap-2"
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
