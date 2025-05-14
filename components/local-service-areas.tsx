import { MapPin } from "lucide-react"

const LocalServiceAreas = () => {
  const areas = [
    "Birmingham City Centre",
    "Edgbaston",
    "Harborne",
    "Selly Oak",
    "Moseley",
    "Kings Heath",
    "Bromsgrove",
    "Redditch",
    "Dudley",
    "Stourbridge",
    "Kingswinford",
    "Wolverhampton",
    "Alvechurch",
    "Halesowen",
    "West Bromwich",
    "Solihull",
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Areas We Cover</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Serving Birmingham and surrounding areas</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {areas.map((area, index) => (
              <div
                key={index}
                className="flex items-center rounded-md bg-gray-100 p-3 transition-colors hover:bg-secondary/10 dark:bg-gray-800"
              >
                <MapPin className="mr-2 h-4 w-4 text-secondary" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocalServiceAreas
