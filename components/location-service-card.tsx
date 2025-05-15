import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Location } from "@/lib/locations-data"

interface LocationServiceCardProps {
  location: Location
  service: {
    slug: string
    name: string
    description: string
  }
}

export default function LocationServiceCard({ location, service }: LocationServiceCardProps) {
  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-secondary" />
          <span className="text-sm font-medium text-gray-500">{location.postcode}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {service.name} in {location.name}
        </h3>
        <p className="text-gray-600 mb-4">
          Fast, reliable {service.name.toLowerCase()} service in {location.name} and surrounding areas. No call-out fee,
          same-day service available.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
          <Link href={`/${location.slug}/${service.slug}`} className="flex items-center gap-2">
            View Details <ArrowRight size={16} />
          </Link>
        </Button>
        <Button asChild className="bg-secondary text-white hover:bg-secondary/90">
          <a href="tel:08003202345" className="flex items-center gap-2" aria-label="Call Now">
            <Phone size={16} />
            Call Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
