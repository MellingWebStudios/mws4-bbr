import Link from "next/link"
import { Phone } from "lucide-react"

const ServiceCallout = () => {
  return (
    <section className="bg-red-600 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:space-y-0 md:text-left">
          <div>
            <h2 className="text-2xl font-bold">Boiler Service, Repairs, and Inspections</h2>
            <p className="mt-2">We offer same-day repairs when booked before 12pm</p>
          </div>
          <div className="flex items-center">
            <div className="emergency-pulse mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm">Call our service line</p>
              <Link href="tel:08003202345" className="text-xl font-bold hover:underline">
                0800 320 2345
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceCallout
