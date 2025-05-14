"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
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
    <Card className="border-none shadow-lg overflow-hidden h-full">
      <CardHeader className="bg-white pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image src="/google-logo.png" alt="Google" fill className="object-contain" />
            </div>
            <div className="text-sm font-medium">Google Reviews</div>
          </div>
          <div className="flex items-center">
            <div className="text-lg font-bold text-primary">4.9</div>
            <div className="ml-1 text-lg text-primary">★★★★★</div>
            <div className="ml-1 text-xs text-gray-500">(120+)</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {displayedReviews.map((review, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={`${review.author} avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="flex items-center">
                      <div className="text-sm text-primary">{"★".repeat(review.rating)}</div>
                      <div className="ml-1 text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-3 text-center">
          {reviews.length > 2 && (
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-xs text-gray-600">
              {expanded ? "Show less" : "Show more reviews"}
            </Button>
          )}
          <Button asChild variant="link" size="sm" className="ml-4 text-xs text-secondary">
            <Link href="https://g.page/birmingham-boiler-repairs" target="_blank" rel="noopener noreferrer">
              View all on Google <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
