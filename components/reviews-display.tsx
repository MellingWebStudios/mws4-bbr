"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Filter, ThumbsUp, MessageSquare, Award } from "lucide-react"
import { reviews } from "@/lib/reviews-data"
import Image from "next/image"
import { motion } from "framer-motion"

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
  const [displayCount, setDisplayCount] = useState(limit)
  const [mounted, setMounted] = useState(false)

  // Filter reviews with fallback system
  const filteredReviews = useMemo(() => {
    // First, filter by service type
    const serviceFilteredReviews = reviews.filter((review) => {
      return filter === "all" || review.service === filter
    })

    if (!locationFilter) {
      return serviceFilteredReviews
    }

    // Try to find location-specific reviews first
    const locationSpecificReviews = serviceFilteredReviews.filter((review) => {
      return (
        review.text.toLowerCase().includes(locationFilter) ||
        review.location?.toLowerCase().includes(locationFilter)
      )
    })

    // If we have location-specific reviews, use them
    if (locationSpecificReviews.length > 0) {
      return locationSpecificReviews
    }

    // Fallback 1: Try to find reviews from broader Birmingham area
    const birminghamReviews = serviceFilteredReviews.filter((review) => {
      return review.location?.toLowerCase().includes("birmingham")
    })

    if (birminghamReviews.length > 0) {
      // Use deterministic selection instead of random shuffling to avoid hydration issues
      // Select reviews based on location filter hash for consistency
      const locationHash = locationFilter ? locationFilter.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0) : 0;
      
      const startIndex = Math.abs(locationHash) % birminghamReviews.length;
      const reordered = [...birminghamReviews.slice(startIndex), ...birminghamReviews.slice(0, startIndex)];
      return reordered;
    }

    // Fallback 2: Try nearby areas (Solihull, Dudley, etc.)
    const nearbyAreaReviews = serviceFilteredReviews.filter((review) => {
      const location = review.location?.toLowerCase() || ""
      return (
        location.includes("solihull") ||
        location.includes("dudley") ||
        location.includes("bromsgrove") ||
        location.includes("wolverhampton")
      )
    })

    if (nearbyAreaReviews.length > 0) {
      // Use deterministic selection for nearby areas too
      const locationHash = locationFilter ? locationFilter.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0) : 0;
      
      const startIndex = Math.abs(locationHash) % nearbyAreaReviews.length;
      const reordered = [...nearbyAreaReviews.slice(startIndex), ...nearbyAreaReviews.slice(0, startIndex)];
      return reordered;
    }

    // Final fallback: Return reviews in consistent order
    return serviceFilteredReviews
  }, [filter, locationFilter])

  const displayedReviews = filteredReviews.slice(0, displayCount)

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const formattedRating = averageRating.toFixed(1)

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++
    }
  })

  const maxRatingCount = Math.max(...ratingCounts)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handler for loading more reviews
  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + limit, filteredReviews.length))
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white py-12 px-2">
      {/* Header Section */}
      <div className="mb-14 text-center w-full flex flex-col items-center relative">
        {/* Decorative Accent */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="block h-1 w-8 rounded-full bg-primary/70 animate-pulse"></span>
          <Star className="h-6 w-6 text-primary drop-shadow-md" />
          <span className="block h-1 w-8 rounded-full bg-primary/70 animate-pulse"></span>
        </div>
        <h2 className="text-4xl font-extrabold mb-3 text-black drop-shadow-sm tracking-tight">
          Customer Reviews
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          See what our customers have to say about our services.<br className="hidden md:inline" />
          We pride ourselves on delivering exceptional quality and service.
        </p>
      </div>

      {/* Google Badge - Enhanced */}
      <div className="mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-xl w-full max-w-3xl mx-auto">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-5">
              <Image src="/google-logo.png" alt="Google" width={64} height={64} className="object-contain rounded-full bg-white p-2 shadow-md" />
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-xl">Google Reviews</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    Verified
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-bold text-gray-900">{formattedRating}</span>
                  <span className="ml-1 text-gray-500">({reviews.length}+ reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-auto items-center">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">Rating Distribution</span>
              </div>
              <div className="flex flex-col gap-1.5 w-full md:w-48">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-700 w-3">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{
                          width: `${mounted ? (ratingCounts[rating - 1] / maxRatingCount) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-6 text-right">{ratingCounts[rating - 1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mb-10 sticky top-4 z-10 w-full max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <span className="flex items-center text-sm font-medium text-gray-700 mr-2">
                <Filter className="mr-1.5 h-4 w-4" /> Filter by:
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFilter("all")
                    setDisplayCount(limit)
                  }}
                  className={`rounded-full transition-all
                    ${filter === "all"
                      ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 text-primary-foreground"
                      : "text-gray-800 hover:border-primary hover:text-primary focus:text-primary"}
                  `}
                >
                  All Reviews
                </Button>
                <Button
                  variant={filter === "repair" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFilter("repair")
                    setDisplayCount(limit)
                  }}
                  className={`rounded-full transition-all
                    ${filter === "repair"
                      ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 text-primary-foreground"
                      : "text-gray-800 hover:border-primary hover:text-primary focus:text-primary"}
                  `}
                >
                  Boiler Repair
                </Button>
                <Button
                  variant={filter === "service" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFilter("service")
                    setDisplayCount(limit)
                  }}
                  className={`rounded-full transition-all
                    ${filter === "service"
                      ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 text-primary-foreground"
                      : "text-gray-800 hover:border-primary hover:text-primary focus:text-primary"}
                  `}
                >
                  Boiler Service
                </Button>
                <Button
                  variant={filter === "gas-safety" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFilter("gas-safety")
                    setDisplayCount(limit)
                  }}
                  className={`rounded-full transition-all
                    ${filter === "gas-safety"
                      ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 text-primary-foreground"
                      : "text-gray-800 hover:border-primary hover:text-primary focus:text-primary"}
                  `}
                >
                  Gas Safety Check
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 w-full max-w-7xl mx-auto items-stretch">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % limit) * 0.1 }}
            className="flex justify-center w-full"
          >
            <Card className="bg-white border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col items-center w-full">
              <CardContent className="p-0 w-full">
                <div className="p-6 flex flex-col relative items-center">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60"></div>
                  <div className="flex items-center gap-4 mb-5 relative justify-center w-full">
                    <Image
                      src={"/apple-touch-icon.png"}
                      alt={`${review.author} avatar`}
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{review.author}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-5 w-full">
                    <p className="text-gray-700 leading-relaxed pl-6">{review.text}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2 flex-wrap justify-center w-full">
                    <span className="inline-block rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-medium transition-colors">
                      {review.service === "repair"
                        ? "Boiler Repair"
                        : review.service === "service"
                          ? "Boiler Service"
                          : "Gas Safety Check"}
                    </span>
                    {review.location && (
                      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-200">
                        {review.location}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredReviews.length > displayCount && (
        <div className="mt-12 text-center w-full flex justify-center">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 px-8 py-6 rounded-full text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            onClick={handleLoadMore}
          >
            Load More Reviews
            <Star className="ml-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
          </Button>
        </div>
      )}
    </div>
  )
}
