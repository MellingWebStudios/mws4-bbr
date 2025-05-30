import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  id: string
  title: string
  description: string
  image: string
  features: string[]
  link: string
}

export default function ServiceCard({ id, title, description, image, features, link }: ServiceCardProps) {
  return (
    <Card id={id} className="overflow-hidden border shadow-md mb-8 transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative h-64 w-full md:h-auto">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{description}</p>
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">What's included:</h3>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button asChild className="bg-secondary text-white hover:bg-secondary/90">
                <Link href={link} className="flex items-center gap-2">
                  Learn More <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                <a href="tel:08003202345" className="flex items-center gap-2" aria-label="Book Now">
                  <Phone size={16} />
                  Book Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
