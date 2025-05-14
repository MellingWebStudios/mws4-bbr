"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { getAverageRating, getTotalReviews } from "@/lib/reviews-data"
import { cn } from "@/lib/utils"

interface RatingBadgeProps {
  variant?: "header" | "large" | "compact"
  className?: string
  onClick?: () => void
}

export default function RatingBadge({ variant = "header", className, onClick }: RatingBadgeProps) {
  const [rating, setRating] = useState(4.9)
  const [totalReviews, setTotalReviews] = useState(120)

  useEffect(() => {
    // Get the actual values from our data
    setRating(getAverageRating())
    setTotalReviews(getTotalReviews())
  }, [])

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-1 text-xs cursor-pointer", className)} onClick={onClick}>
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        <span>{rating}/5</span>
      </div>
    )
  }

  if (variant === "large") {
    return (
      <div
        className={cn("flex flex-col items-center bg-white rounded-lg p-3 shadow-md cursor-pointer", className)}
        onClick={onClick}
      >
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn("h-5 w-5", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
            />
          ))}
        </div>
        <div className="text-lg font-bold">{rating}/5</div>
        <div className="text-sm text-gray-600">{totalReviews} reviews</div>
      </div>
    )
  }

  // Default header variant
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm cursor-pointer hover:bg-white transition-colors",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn("h-3 w-3", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
          />
        ))}
      </div>
      <span className="text-xs font-medium">
        {rating} ({totalReviews})
      </span>
    </div>
  )
}
