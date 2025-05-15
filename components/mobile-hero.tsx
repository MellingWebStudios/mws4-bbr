"use client"
import Image from "next/image"
import Link from "next/link"
import { Phone, Star, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileHero() {
  return (
    <section className="relative bg-gradient-to-b from-secondary to-secondary/80 text-white px-4 pt-6 pb-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-pattern opacity-10"></div>
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-10 right-[15%] w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float-fast"></div>
      {/* Content */}
      <div className="relative z-10 animate-fade-in">
        {/* Trust bar */}
        <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-xs">Gas Safe: 520077</span>
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <span className="ml-1 text-xs">120+ homeowners 4.9/5</span>
        </div>
        {/* Service badge */}
        <div className="mb-3 inline-block rounded-md bg-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
          Professional Boiler Services
        </div>
        {/* Headline */}
        <h1 className="text-3xl font-bold leading-tight">
          Same-Day Boiler Repairs & Servicing in Birmingham
        </h1>
        {/* Subheadline */}
        <p className="mt-3 py-2 pl-3 border-l-4 border-primary text-sm bg-white/5 backdrop-blur-sm">
          No Call-Out Fee. Book Before 12pm for Same-Day Fix!
        </p>
        {/* Key benefits as icons only */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
            <span className="text-xs">Gas Safe Registered</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-4 w-4 text-primary">£</span>
            <span className="text-xs">No VAT Charged</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-4 w-4 text-primary">⏰</span>
            <span className="text-xs">Same-Day Service</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 h-4 w-4 text-primary">🚫</span>
            <span className="text-xs">No Call-Out Fee</span>
          </div>
        </div>
        {/* CTA buttons */}
        <div className="mt-6 flex flex-col space-y-3">
          <Link
            href="tel:08003202345"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-gray-900 shadow-md h-12 animate-pulse-subtle"
          >
            <Phone className="h-4 w-4" />
            Call Now – 0800 320 2345
          </Link>
          <Button variant="outline" size="lg" className="border-white bg-white/20 text-white hover:bg-white/30 w-full">
            Book Online
          </Button>
        </div>
        {/* Cartoon cameo */}
        <div className="mx-auto mt-8 max-w-[220px] relative animate-fade-up">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-90"></div>
          <Image
            src="/images/engineers-team.svg"
            alt="Our team of Gas Safe registered engineers"
            width={220}
            height={220}
            className="drop-shadow-lg relative z-10 hover:scale-[1.02] transition-transform duration-500"
            priority
            loading="eager"
            sizes="220px"
            quality={90}
          />
        </div>
      </div>
    </section>
  )
}
