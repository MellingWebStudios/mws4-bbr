"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ShieldCheck, Star, Clock, Ban, PoundSterling, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function DesktopHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-secondary to-secondary/80 py-16 text-white overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left column with image */}
          <div
            className={`relative w-full lg:w-5/12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-4 border-primary/30 animate-spin-slow"
                style={{ animationDuration: "15s" }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-4 border-dashed border-white/20 animate-spin-slow"
                style={{ animationDuration: "20s", animationDirection: "reverse" }}
              />

              {/* Main image with frame */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl" />

                {/* Floating badge - moved to top */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-gray-900 px-6 py-2 rounded-full shadow-xl font-bold text-sm flex items-center gap-2 whitespace-nowrap z-20">
                  <ShieldCheck className="h-5 w-5" />
                  Gas Safe Registered: 520077
                </div>

                <Image
                  src="/images/engineers-team.svg"
                  alt="Our team of Gas Safe registered engineers"
                  width={500}
                  height={500}
                  className="rounded-xl relative z-10"
                  priority
                  quality={90}
                />
              </div>

              {/* Rating card */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-white/20 flex flex-col items-center z-20">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm font-semibold mt-2">4.9/5 (120+ reviews)</p>
              </div>
            </div>
          </div>

          {/* Right column with content */}
          <div
            className={`w-full lg:w-7/12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            {/* Service badge */}
            <div className="inline-flex items-center gap-2 mb-4 bg-red-700/90 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-white mr-1"></span>
              Professional Boiler Services
            </div>

            {/* Main headline */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="relative">
                <span className="relative z-10">Repairs & Servicing</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-primary/30 -z-0 skew-x-3"></span>
              </span>
              <span className="block">in Birmingham</span>
            </h1>

            {/* Urgency message */}
            <div className="mb-2 inline-block bg-white/10 backdrop-blur-sm rounded-lg border-l-4 border-primary relative overflow-hidden px-3 py-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
              <p className="relative z-10 text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              Book Before 12pm for Same-Day Fix!
              </p>
            </div>



            {/* CTA section */}
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-gray-900 hover:bg-primary/90 shadow-xl px-6 py-6 text-lg font-bold relative overflow-hidden group"
                >
                  <a href="tel:08003202345" className="flex items-center gap-2" aria-label="Call Now – 0800 320 2345">
                    <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <div className="bg-white/20 p-1.5 rounded-full">
                        <Phone size={20} />
                      </div>
                      Call 0800 320 2345
                    </div>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white bg-white/10 text-white hover:bg-white/20 px-6 py-6 text-lg font-bold backdrop-blur-sm relative overflow-hidden group"
                >
                  <Link href="/contact" className="relative z-10">
                    <div className="absolute inset-0 w-full h-full bg-primary/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10">Book Online</span>
                  </Link>
                </Button>
              </div>

              {/* Family business badge */}
              <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                <span className="font-medium">Your local, family-run Gas Safe engineers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
