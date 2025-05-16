"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Filter } from "lucide-react"
import { reviews } from "@/lib/reviews-data"
import RatingBadge from "@/components/rating-badge"
import ReviewsModal from "@/components/reviews-modal"
import Image from "next/image"

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

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesService = filter === "all" || review.service === filter
    const matchesLocation =
      !locationFilter ||
      review.text.toLowerCase().includes(locationFilter) ||
      review.location?.toLowerCase().includes(locationFilter)
    return matchesService && matchesLocation
  })

  const displayedReviews = filteredReviews.slice(0, limit)

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Google Badge */}
      <div className="mb-4 flex items-center gap-2">
        <Image src="/google-logo.png" alt="Google" width={28} height={28} className="rounded-sm" />
        <span className="font-semibold text-gray-800 text-base">Google Reviews</span>
        <span className="text-primary font-bold ml-2">4.9</span>
        <span className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </span>
        <span className="ml-2 text-xs text-gray-500">(120+)</span>
      </div>

      {showFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center text-sm font-medium text-gray-700">
            <Filter className="mr-1 h-4 w-4" /> Filter:
          </span>
          {/* ...same filter buttons as before... */}
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-secondary hover:bg-secondary/90" : ""}
          >
            All Reviews
          </Button>
          {/* Add more filters here */}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayedReviews.map((review, index) => (
          <Card key={index} className="h-full bg-white/95 border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={`${review.author} avatar`}
                  width={42}
                  height={42}
                  className="rounded-full border border-gray-100 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{review.author}</div>
                  <div className="flex items-center gap-1">
                    <RatingBadge rating={review.rating} />
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{review.text}</p>
              <div className="mt-auto flex gap-2 flex-wrap">
                <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                  {review.service === "repair"
                    ? "Boiler Repair"
                    : review.service === "service"
                    ? "Boiler Service"
                    : "Gas Safety Check"}
                </span>
                {review.location && (
                  <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
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
            variant="secondary"
            className="border-primary text-primary font-semibold hover:bg-primary/10"
            onClick={() => setShowModal(true)}
          >
            View All Reviews <Star className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {showModal && (
        <ReviewsModal
          open={showModal}
          onOpenChange={setShowModal}
          reviews={filteredReviews}
        />
      )}
    </div>
  )
}
