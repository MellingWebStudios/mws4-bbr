import Image from "next/image"

const optimizedImageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20engineers-u9b5dTX1v46GUhyjbRLIwdnF5aKH0I.png"

export default function MobileHeroImage() {
  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0 hero-pattern opacity-10" aria-hidden="true"></div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float-slow" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-primary/5 rounded-full blur-3xl animate-float-fast" aria-hidden="true"></div>

      {/* Floating decorative elements */}
      <div 
        className="absolute top-12 left-4 w-20 h-20 rounded-full border-4 border-primary/20 animate-spin-slow"
        style={{ animationDuration: "20s" }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-24 right-4 w-16 h-16 rounded-full border-4 border-dashed border-white/10 animate-spin-slow"
        style={{ animationDuration: "25s", animationDirection: "reverse" }}
        aria-hidden="true"
      />

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
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-slow" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full" aria-hidden="true"></div>
        <Image
          src="/images/engineers-team.svg"
          alt="Our team of Gas Safe registered engineers"
          width={180}
          height={180}
          className="drop-shadow-lg rounded-xl relative z-10"
          priority
          sizes="180px"
        />
      </div>
    </>
  )
}
