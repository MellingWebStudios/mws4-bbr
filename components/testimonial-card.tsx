import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  location?: string
  rating: number
  image?: string
  className?: string
}

const TestimonialCard = ({ quote, author, location, rating, image, className }: TestimonialCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden border-none shadow-lg transition-transform duration-300 hover:scale-105",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex">
          {/* Inline star rating with actual star characters for better scannability */}
          <div className="text-lg text-primary" aria-label={`${rating} out of 5 stars`}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>
        </div>

        <div className="flex items-start gap-4">
          {image && (
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={image || "/placeholder.svg?height=64&width=64&query=person"}
                alt={`${author} profile`}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div>
            <p className="mb-4 text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">- {author}</p>
              {location && <p className="text-sm text-gray-500">{location}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
