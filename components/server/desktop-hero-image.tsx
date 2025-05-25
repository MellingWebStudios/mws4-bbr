import Image from "next/image"
import { Star, ShieldCheck } from "lucide-react"

export default function DesktopHeroImage() {
  return (
    <div className="relative w-full lg:w-5/12">
      <div className="relative">
        {/* Decorative elements */}
        <div
          className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-4 border-primary/30 animate-spin-slow"
          style={{ animationDuration: "15s" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-4 border-dashed border-white/20 animate-spin-slow"
          style={{ animationDuration: "20s", animationDirection: "reverse" }}
          aria-hidden="true"
        />

        {/* Main image with frame */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl" aria-hidden="true" />
          {/* Floating badge */}
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
            loading="eager"
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
  )
}
