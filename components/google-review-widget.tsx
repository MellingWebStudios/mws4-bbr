"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GoogleReviewWidget() {
  const [expanded, setExpanded] = useState(false)

  // Sample reviews - in a real implementation, these would come from Google's API
  const reviews = [
    {
      author: "James Wilson",
      rating: 5,
      date: "2 weeks ago",
      text: "Excellent service. Fixed my boiler quickly and at a fair price.",
      avatar: "/man-avatar.png",
    },
    {
      author: "Emma Thompson",
      rating: 5,
      date: "1 month ago",
      text: "Very professional and reliable. Would recommend to anyone.",
      avatar: "/diverse-woman-avatar.png",
    },
    {
      author: "Robert Davis",
      rating: 4,
      date: "2 months ago",
      text: "Good service, arrived on time and fixed the issue.",
      avatar: "/man-avatar.png",
    },
  ]

  // Only show first 2 reviews when not expanded
  const displayedReviews = expanded ? reviews : reviews.slice(0, 2)

  return (
    <Card className="border shadow-md rounded-xl overflow-hidden h-full">
      <CardHeader className="bg-white pb-3 pt-5 px-5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7">
              <Image src="/google-logo.png" alt="Google" fill className="object-contain" />
            </div>
            <div className="text-sm font-medium text-gray-800">Google Reviews</div>
          </div>
          <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
            <div className="text-lg font-bold text-gray-800">4.9</div>
            <div className="flex ml-1.5 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="ml-1.5 text-xs text-gray-500">(120+)</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {displayedReviews.map((review, index) => (
            <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-100 flex-shrink-0">
                  <Image
                    src={review.avatar || "/placeholder.svg"}
                    alt={`${review.author} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-800">{review.author}</div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 flex items-center justify-between border-t">
          {reviews.length > 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-medium text-gray-700 hover:bg-white"
            >
              {expanded ? "Show less" : "Show more reviews"}
            </Button>
          )}
          <Button asChild variant="link" size="sm" className="text-xs font-medium text-gray-700">
            <Link
              href="https://g.page/birmingham-boiler-repairs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              View all on Google <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
