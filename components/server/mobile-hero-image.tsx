import Image from "next/image"

// Move image to local public folder for better control and optimization
const heroImagePath = "/images/engineers-team.svg"

export default function MobileHeroImage() {
  return (
    <>
      {/* Combined background visuals for mobile using a single div and CSS */}
      <div className="sm:hidden absolute inset-0 z-0" aria-hidden="true">
        <div className="w-full h-full relative">
          {/* Use a single SVG for grid and subtle circles */}
          <svg width="100%" height="100%" className="absolute inset-0 opacity-10 pointer-events-none select-none">
            <pattern id="grid-mobile" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-mobile)" />
          </svg>
        </div>
      </div>

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
        <Image
          src={heroImagePath}
          alt="Our team of Gas Safe registered engineers"
          width={180}
          height={180}
          className="rounded-xl"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQvJiAmLzw0Li0tLi00PzBANz85Pjc0SDNIQD9ZWVlgXmF6YW5oqqqq/9sAQwEVFxceGh4lJCU8NSw1aqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </>
  )
}
