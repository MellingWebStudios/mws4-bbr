import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocalServiceAreasProps {
  className?: string
}

const LocalServiceAreas = ({ className }: LocalServiceAreasProps) => {
  const areas = [
    "Birmingham",
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
    <section
    className={cn(
      "relative py-20",
      className,
      // Ambient dotted pattern behind content; pointer-events-none so it doesn't interfere
      "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(var(--secondary)/15%_1px,transparent_1px)] before:bg-[size:16px_16px] dark:before:bg-[radial-gradient(var(--secondary-dark)/12%_1px,transparent_1px)]",
    )}
  >
    <div className="container mx-auto px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Areas We Cover</h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Serving Birmingham and surrounding areas</p>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {areas.map((area, index) => (
            <div
              key={index}
              className="group flex items-center rounded-xl bg-white/70 p-3 shadow-sm backdrop-blur transition-all hover:shadow-md dark:bg-gray-800/60"
            >
              <MapPin
                className="mr-2 h-4 w-4 text-secondary transition-transform group-hover:-rotate-12"
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-secondary">
                {area}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}

export default LocalServiceAreas
