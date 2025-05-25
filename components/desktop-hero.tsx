"use client"
import { Button } from "@/components/ui/button"
import { Phone, Clock } from "lucide-react"

export default function DesktopHero() {
  return (
    <>
      {/* Service badge */}
      <div className="inline-flex items-center gap-2 mb-4 bg-red-700/90 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
        <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-white mr-1"></span>
        Professional Boiler Services
      </div>
      {/* Main headline */}
      <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
        <span className="relative">
          <span className="relative z-10">Repairs & Servicing</span>
          <span className="block">in Birmingham</span>
        </span>
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
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true"></div>
              <div className="relative z-10 flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Phone size={20} />
                </div>
                Call 0800 320 2345
              </div>
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
