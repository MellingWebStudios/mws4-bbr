"use client"
import Image from "next/image"
import Link from "next/link"
import { Phone, Star, ShieldCheck, PoundSterling, Clock, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import CallNowButton from "@/components/ui/CallNowButton"

export default function MobileHero() {
  return (
    <section className="relative bg-gradient-to-b from-secondary to-secondary/90 text-white px-4 pt-7 pb-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-pattern opacity-10" aria-hidden="true"></div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float-slow" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-primary/5 rounded-full blur-3xl animate-float-fast" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Trust bar */}
        <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <Image
            src="/images/gas-safe-1.svg"
            width={20}
            height={20}
            alt="Gas Safe Registered"
            priority
          />
          <span className="text-xs font-medium">Gas Safe: 520077</span>
          <div className="flex ml-2" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <span className="ml-1 text-xs font-medium">4.9/5 • 120+ reviews</span>
        </div>

        {/* Main image, absolute for stacking */}
        <div className="relative w-[190px] h-[190px] flex items-center justify-center z-20 -mb-3 mt-3">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" aria-hidden="true"></div>
          <Image
            src="/images/engineers-team.svg"
            alt="Our team of Gas Safe registered engineers"
            width={180}
            height={180}
            className="drop-shadow-lg rounded-xl relative z-10"
            priority
            loading="eager"
            sizes="180px"
            quality={90}
          />
        </div>

        {/* Service badge */}
        <div className="mt-1 mb-2 inline-block rounded-full bg-red-700 px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
          Professional Boiler Services
        </div>

        {/* Headline, centered under image */}
        <h1 className="text-2xl font-extrabold leading-tight text-center mt-1 mb-2 px-1">
          Same-Day Boiler Repairs & Servicing
          <span className="block text-primary font-bold">in Birmingham</span>
        </h1>

        {/* Subheadline */}
        <p className="mb-4 text-[15px] text-white/90 text-center bg-white/10 rounded-lg px-3 py-2 shadow-sm border-l-4 border-primary/50">
          No Call-Out Fee. Book Before 12pm for Same-Day Fix!
        </p>

        {/* Key benefits below image */}
        <div className="w-full mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center rounded-lg bg-white/10 px-2 py-2">
            <ShieldCheck className="mr-1 h-4 w-4 text-primary" aria-hidden="true"/>
            <span className="text-xs font-medium">Gas Safe</span>
          </div>
          <div className="flex items-center rounded-lg bg-white/10 px-2 py-2">
            <PoundSterling className="mr-1 h-4 w-4 text-primary" aria-hidden="true"/>
            <span className="text-xs font-medium">No VAT</span>
          </div>
          <div className="flex items-center rounded-lg bg-white/10 px-2 py-2">
            <Clock className="mr-1 h-4 w-4 text-primary" aria-hidden="true"/>
            <span className="text-xs font-medium">Same-Day</span>
          </div>
          <div className="flex items-center rounded-lg bg-white/10 px-2 py-2">
            <Ban className="mr-1 h-4 w-4 text-primary" aria-hidden="true"/>
            <span className="text-xs font-medium">No Call-Out Fee</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="w-full flex flex-col space-y-3 mt-1">
          <CallNowButton pulse />
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white bg-white/20 text-white hover:bg-white/30 w-full"
          >
            <a href="/contact" className="inline-flex items-center justify-center gap-2 font-semibold">
              Book Online
            </a>
          </Button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-float-slow { animation: floatY 7s ease-in-out infinite; }
        .animate-float-fast { animation: floatY 4s ease-in-out infinite alternate; }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-fade-in { animation: fadeInUp 1s ease; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to   { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </section>
  )
}
