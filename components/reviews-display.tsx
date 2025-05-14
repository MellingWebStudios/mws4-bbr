"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Filter } from "lucide-react"
import { reviews } from "@/lib/reviews-data"
import RatingBadge from "@/components/rating-badge"
import ReviewsModal from "@/components/reviews-modal"

interface ReviewsDisplayProps {
  limit?: number
  showFilters?: boolean
  serviceFilter?: string
  locationFilter?: string
}

export default function ReviewsDisplay({
  limit = 6,
  showFilters = true,
  serviceFilter = "all",
  locationFilter = "",
}: ReviewsDisplayProps) {
  const [filter, setFilter] = useState(serviceFilter)
  const [showModal, setShowModal] = useState(false)

  // Filter reviews by service type and location
  const filteredReviews = reviews.filter((review) => {
    const matchesService = filter === "all" || review.service === filter
    const matchesLocation =
      !locationFilter ||
      review.text.toLowerCase().includes(locationFilter) ||
      review.location?.toLowerCase().includes(locationFilter)
    return matchesService && matchesLocation
  })

  // Take only the specified number of reviews
  const displayedReviews = filteredReviews.slice(0, limit)

  return (
    <div>
      {showFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter className="mr-1 h-4 w-4" /> Filter:
          </span>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-secondary hover:bg-secondary/90" : ""}
          >
            All Reviews
          </Button>
          <Button
            variant={filter === "repair" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("repair")}
            className={filter === "repair" ? "bg-secondary hover:bg-secondary/90" : ""}
          >
            Boiler Repairs
          </Button>
          <Button
            variant={filter === "service" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("service")}
            className={filter === "service" ? "bg-secondary hover:bg-secondary/90" : ""}
          >
            Boiler Servicing
          </Button>
          <Button
            variant={filter === "gas-safety" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("gas-safety")}
            className={filter === "gas-safety" ? "bg-secondary hover:bg-secondary/90" : ""}
          >
            Gas Safety
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayedReviews.map((review, index) => (
          <Card key={index} className="h-full border shadow-sm">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <RatingBadge rating={review.rating} />
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{review.author}</span>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
              <div className="mt-2">
                <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  {review.service === "repair"
                    ? "Boiler Repair"
                    : review.service === "service"
                      ? "Boiler Service"
                      : "Gas Safety Check"}
                </span>
                {review.location && (
                  <span className="ml-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    {review.location}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length > limit && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary/10"
            onClick={() => setShowModal(true)}
          >
            View All Reviews <Star className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {showModal && (
        <ReviewsModal
          reviews={filteredReviews}
          onClose={() => setShowModal(false)}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </div>
  )
}
