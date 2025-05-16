"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ShieldCheck, Star, CheckCircle, Clock, Ban, PoundSterling } from "lucide-react"

export default function DesktopHero() {
  return (
    <section className="relative bg-gradient-to-r from-secondary to-secondary/80 py-16 text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-24 left-[8%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-8 right-[12%] w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-40 right-[18%] w-40 h-40 bg-secondary/10 hero-blob blur-2xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center z-10 animate-fade-in">
            {/* TRUST BAR */}

            <div className="flex items-center gap-4 mb-6 bg-white/15 p-3 rounded-md shadow-lg w-fit">
              <Image
                src="/images/gas-safe-1.svg"
                width={28}
                height={28}
                alt="Gas Safe Registered"
                className="object-contain"
              />
              <span className="font-semibold text-xs text-white">
                Gas Safe: 520077
              </span>
              <span className="mx-2 text-white/60 text-lg">|</span>
              <span
                className="flex items-center gap-1"
                aria-label="4.9 out of 5 stars"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <span className="text-xs ml-1 font-medium text-white">
                  4.9/5 from 120+ homeowners
                </span>
              </span>
            </div>

            {/* SERVICE BADGE */}
            <div className="mb-4 inline-block rounded-md bg-red-700 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg">
              Professional Boiler Services
            </div>

            {/* OUTCOME-DRIVEN HEADLINE */}
            <h1 className="text-5xl font-bold leading-tight mb-3 drop-shadow-md">
              Same-Day Boiler Repairs & Servicing in Birmingham
            </h1>

            {/* URGENCY SUBHEADLINE */}
            <p className="mb-4 text-lg text-white/90 font-medium border-l-4 border-primary pl-4 py-2 bg-white/5 backdrop-blur-sm">
              No Call-Out Fee. Book Before 12pm for Same-Day Fix!
            </p>

            {/* BENEFITS ROW */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm">Gas Safe Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <PoundSterling className="h-5 w-5 text-primary" />
                <span className="text-sm">No VAT Charged</span>
              </div>
              <div className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-primary" />
                <span className="text-sm">No Call-Out Fee</span>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-row gap-4 mb-6">
              <Button
                asChild
                size="lg"
                className="bg-primary text-gray-900 hover:bg-primary/90 shadow-xl px-8 py-5 text-lg font-bold"
              >
                <a
                  href="tel:08003202345"
                  className="flex items-center gap-2"
                  aria-label="Call Now – 0800 320 2345"
                >
                  <Phone size={22} />
                  Call Now – 0800 320 2345
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white bg-white/20 text-white hover:bg-white/30 px-8 py-5 text-lg font-bold"
              >
                <Link href="/contact">
                  Book Online
                </Link>
              </Button>
            </div>
            <div className="text-sm text-white/80 mb-2 pl-1">
              <span className="font-semibold text-primary">
                Fastest response:{" "}
              </span>
              Speak to a Gas Safe engineer today
            </div>
          </div>

          {/* IMAGE / ILLUSTRATION SECTION */}
          <div className="relative flex flex-col items-center justify-center animate-fade-up">
            <div className="absolute -bottom-8 -right-8 h-96 w-96 rounded-full bg-primary/20 blur-xl"></div>
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-lg"></div>
            <div className="relative w-full md:w-[400px] h-[370px] flex items-end justify-center z-10">
              <Image
                src="/images/engineers-team.svg"
                alt="Our team of Gas Safe registered engineers"
                width={360}
                height={360}
                className="drop-shadow-2xl rounded-xl bg-white/5 p-2"
                priority
                quality={90}
              />
            </div>
            <div className="mt-3 px-2 py-1 bg-primary/15 rounded text-center text-white/90 text-xs font-medium shadow">
              Your local, family-run Gas Safe engineers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
