import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface RelatedService {
  title: string
  description: string
  link: string
}

interface RelatedServicesProps {
  currentService: string
  services: RelatedService[]
}

export default function RelatedServices({ currentService, services }: RelatedServicesProps) {
  // Filter out the current service
  const filteredServices = services.filter((service) => service.title !== currentService)

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Related Services</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {filteredServices.map((service, index) => (
          <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">{service.description}</p>
              <Link href={service.link} className="inline-flex items-center text-secondary hover:underline">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
