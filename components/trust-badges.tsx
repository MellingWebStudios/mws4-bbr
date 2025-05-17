import Image from "next/image"

const TrustBadges = () => {
  const brands = [
    { name: "Gas Safe", image: "/images/gas-safe-1.svg" },
    { name: "Worcester", image: "/images/worcester-bosch-group-seeklogo.svg" },
    { name: "Vaillant", image: "/images/Vaillant-logo-2021.svg" },
    { name: "Baxi", image: "/images/BAXI_logo.svg" },
    { name: "Ferroli", image: "/images/Ferroli_logo.svg" },
    { name: "Ideal", image: "/images/ideal-boilers-seeklogo.svg" },
  ]

  return (
    <section className="border-y border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Trusted by Homeowners Across Birmingham</h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {brands.map((brand, index) => (
        <div
          key={index}
          className="relative h-12 w-24 md:h-16 md:w-32"
        >
          <Image
          src={brand.image || "/placeholder.svg"}
          alt={`${brand.name} logo`}
          fill
          className="object-contain"
          />
        </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default TrustBadges
