import Image from "next/image"
import { DynamicHeading } from "@/components/ui/dynamic-heading"

interface TrustBadgesProps {
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

const TrustBadges = ({ headingLevel = 3 }: TrustBadgesProps) => {
  const brands = [
    { name: "Gas Safe", image: "/images/gas-safe-1.svg", width: 80, height: 48 },
    { name: "Worcester", image: "/images/worcester-bosch-group-seeklogo.svg", width: 100, height: 48 },
    { name: "Vaillant", image: "/images/Vaillant-logo-2021.svg", width: 100, height: 48 },
    { name: "Baxi", image: "/images/BAXI_logo.svg", width: 80, height: 48 },
    { name: "Ferroli", image: "/images/Ferroli_logo.svg", width: 80, height: 48 },
    { name: "Ideal", image: "/images/ideal-boilers-seeklogo.svg", width: 80, height: 48 },
  ]

  return (
    <section className="border-y border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4">
      <div className="mb-6 text-center">
        <DynamicHeading level={headingLevel} className="text-xl font-bold text-gray-900 dark:text-white">Trusted by Homeowners Across Birmingham</DynamicHeading>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {brands.map((brand, index) => (
        <div
          key={index}
          className="relative h-12 w-24 md:h-16 md:w-32 flex items-center justify-center"
        >
          <Image
          src={brand.image || "/placeholder.svg"}
          alt={`${brand.name} logo`}
          width={brand.width}
          height={brand.height}
          className="object-contain max-h-full max-w-full"
          />
        </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default TrustBadges
