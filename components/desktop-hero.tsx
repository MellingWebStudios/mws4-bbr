"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ShieldCheck, Clock, CheckCircle } from "lucide-react"

export default function DesktopHero() {
  return (
    <section className="relative bg-gradient-to-r from-secondary to-secondary/80 py-16 text-white overflow-hidden">
      {/* Background patterns and shapes */}
      <div className="absolute inset-0 hero-pattern opacity-10"></div>

      {/* Floating blobs for depth */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-[15%] w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-[20%] w-40 h-40 bg-secondary/10 hero-blob blur-2xl"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center relative z-10 animate-fade-in">
            {/* Service badge with enhanced shadow */}
            <div className="mb-6 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
              Professional Boiler Services
            </div>

            {/* Main heading with enhanced text shadow */}
            <h1
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ textShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
            >
              Boiler Service, Repairs, and Inspections
            </h1>

            {/* Highlighted text with enhanced border */}
            <p className="mt-2 text-white/90 font-medium border-l-4 border-primary pl-3 py-1 bg-white/5 backdrop-blur-sm">
              Same-day service when booked before 12pm
            </p>

            <p className="mt-4 text-lg">Professional service from our family-run team of Gas Safe engineers.</p>

            {/* Key benefits */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">No VAT Charged</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">No Call-Out Fee</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">Same-Day Service</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">Gas Safe Registered</span>
              </div>
            </div>

            {/* CTA buttons with enhanced effects */}
            <div className="mt-6 flex flex-row space-x-4">
              <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90 group">
                <Link href="tel:08003202345" className="flex items-center gap-2">
                  <Phone size={18} />
                  Call Now: 0800 320 2345
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white bg-white/20 text-white hover:bg-white/30">
                Book Online
              </Button>
            </div>

            {/* Reviews section with enhanced styling */}
            <div className="mt-6 flex items-center bg-white/5 backdrop-blur-sm p-2 rounded-lg inline-block">
              <div className="flex">
                <span className="text-lg text-primary" aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
              </div>
              <p className="ml-2 text-sm">120+ homeowners rate us 4.9/5</p>
            </div>
          </div>

          {/* Engineers image section with enhanced 3D effects */}
          <div className="relative flex items-center justify-center">
            {/* Layered background elements */}
            <div className="absolute -bottom-8 -right-8 h-96 w-96 rounded-full bg-primary/20 blur-md"></div>
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-lg"></div>

            {/* Card container with glass effect */}
            <div className="relative h-96 w-full md:w-[520px] overflow-visible rounded-lg hero-card">
              {/* Decorative elements for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/30 rounded-full blur-xl"></div>

              {/* Image with enhanced shadow and effects */}
              <div className="relative h-full w-full overflow-hidden rounded-lg animate-fade-up">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20engineers-u9b5dTX1v46GUhyjbRLIwdnF5aKH0I.png"
                  alt="Our team of Gas Safe registered engineers"
                  fill
                  className="object-contain p-1 -translate-y-2 hover:scale-[1.02] transition-transform duration-500"
                  style={{
                    filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
                  }}
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 520px"
                  quality={90}
                />
              </div>

              {/* Gas Safe badge with enhanced 3D effect - more prominent */}
              <div className="absolute -bottom-3 right-4 z-10 rounded-md bg-white p-2 shadow-lg flex items-center gap-1">
                <div className="relative h-8 w-8">
                  <Image src="/images/gas-safe-1.svg" alt="Gas Safe Registered" fill className="object-contain" />
                </div>
                <p className="text-xs font-medium text-secondary">Gas Safe Registered: 520077</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
