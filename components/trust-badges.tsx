import Image from "next/image"

const TrustBadges = () => {
  const brands = [
    { name: "Gas Safe", image: "/placeholder.svg?height=60&width=120" },
    { name: "Worcester", image: "/placeholder.svg?height=60&width=120" },
    { name: "Vaillant", image: "/placeholder.svg?height=60&width=120" },
    { name: "Baxi", image: "/placeholder.svg?height=60&width=120" },
    { name: "Ferroli", image: "/placeholder.svg?height=60&width=120" },
    { name: "Ideal", image: "/placeholder.svg?height=60&width=120" },
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
              className="relative h-12 w-24 grayscale transition-all duration-300 hover:grayscale-0 md:h-16 md:w-32"
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
