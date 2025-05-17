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

  // Function to render stars with partial star support
  const renderStars = (size: "small" | "medium" | "large") => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7
    const totalStars = 5

    const starSize = {
      small: "h-3 w-3",
      medium: "h-4 w-4",
      large: "h-6 w-6",
    }

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={cn(starSize[size], "fill-amber-400 text-amber-400 transition-transform duration-200")}
          />,
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className={cn(starSize[size], "text-gray-200")} />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star className={cn(starSize[size], "fill-amber-400 text-amber-400")} />
            </div>
          </div>,
        )
      } else {
        stars.push(<Star key={i} className={cn(starSize[size], "text-gray-200")} />)
      }
    }

    return stars
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium rounded-full px-2 py-1 bg-white/90 shadow-sm",
          "hover:shadow-md transition-all duration-200 cursor-pointer",
          className,
        )}
        onClick={onClick}
        role="button"
        aria-label={`Rating: ${rating} out of 5 stars based on ${totalReviews} reviews`}
      >
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        <span>{rating.toFixed(1)}</span>
      </div>
    )
  }

  if (variant === "large") {
    return (
      <div
        className={cn(
          "flex flex-col items-center bg-white rounded-xl p-4 shadow-md",
          "hover:shadow-lg transition-all duration-200 cursor-pointer",
          "border border-gray-100",
          className,
        )}
        onClick={onClick}
        role="button"
        aria-label={`Rating: ${rating} out of 5 stars based on ${totalReviews} reviews`}
      >
        <div className="flex items-center gap-1 mb-2">{renderStars("large")}</div>
        <div className="text-xl font-bold text-gray-800">{rating.toFixed(1)}</div>
        <div className="text-sm text-gray-500 font-medium">
          {totalReviews.toLocaleString()} {totalReviews === 1 ? "review" : "reviews"}
        </div>
      </div>
    )
  }

  // Default header variant
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5",
        "shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
        "border border-gray-100/50",
        className,
      )}
      onClick={onClick}
      role="button"
      aria-label={`Rating: ${rating} out of 5 stars based on ${totalReviews} reviews`}
    >
      <div className="flex gap-0.5">{renderStars("medium")}</div>
      <span className="text-xs font-semibold text-gray-700">
        {rating.toFixed(1)} <span className="text-gray-400">({totalReviews.toLocaleString()})</span>
      </span>
    </div>
  )
}
