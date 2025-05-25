import Image from "next/image"

const optimizedImageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20engineers-u9b5dTX1v46GUhyjbRLIwdnF5aKH0I.png"

export default function MobileHeroImage() {
  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0 hero-pattern opacity-10" aria-hidden="true"></div>
      {/* Subtle mobile-only visuals to compensate for removed heavy effects */}
      <div className="sm:hidden absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-md" aria-hidden="true"></div>
      <div className="sm:hidden absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-md" aria-hidden="true"></div>
      <div className="sm:hidden absolute top-1/2 left-2 w-10 h-10 bg-secondary/10 rounded-full blur-sm" aria-hidden="true"></div>

      {/* Trust bar */}
      <div className="relative z-10 flex items-center justify-center mb-6">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <Image
            src="/images/gas-safe-1.svg"
            width={20}
            height={20}
            alt="Gas Safe Registered"
            priority
          />
          <span className="text-xs font-medium">Gas Safe: 520077</span>
        </div>
      </div>

      {/* Main image with glow effect */}
      <div className="relative w-[180px] h-[180px] flex items-center justify-center z-20 -mb-3 mt-3 mx-auto">
        {/* Mobile: Remove background blurs and drop-shadow for LCP performance */}
        <Image
          src="/images/engineers-team.svg"
          alt="Our team of Gas Safe registered engineers"
          width={180}
          height={180}
          className="rounded-xl"
          priority
          sizes="180px"
        />
      </div>

      {/* Grid pattern background for mobile (matches desktop) */}
      <div className="sm:hidden absolute inset-0 opacity-10 pointer-events-none select-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="grid-mobile" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-mobile)" />
        </svg>
      </div>
    </>
  )
}
