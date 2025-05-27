"use client"
import CallNowButton from "@/components/ui/CallNowButton"
import ReviewsModal from "./reviews-modal"
import { useState } from "react"

export default function MobileHero() {
  const [showReviews, setShowReviews] = useState(false)

  return (
    <div className="text-center mt-6">
      <h1 className="text-3xl font-bold mb-4">
        Expert Boiler Service <br />& Repairs in Birmingham
      </h1>
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="flex-shrink-0">✓ Same-Day Service</span>
          <span className="flex-shrink-0">✓ No Call-Out Fee</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="flex-shrink-0">✓ Fixed Price</span>
          <span className="flex-shrink-0">✓ 12-Month Guarantee</span>
        </div>
      </div>
      <CallNowButton fullWidth label="Get Help Now" pulse />
      {/* View reviews button styled for mobile */}
      <div className="mt-3 flex items-center justify-center">
        <button
          type="button"
          className="group flex items-center gap-2 text-white font-medium transition hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 px-0 py-0 bg-transparent border-0"
          onClick={() => setShowReviews(true)}
          aria-label="View customer reviews"
          tabIndex={0}
        >
          <span className="relative">
            <span className="block w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left absolute bottom-0 left-0" aria-hidden="true" />
            <span className="pb-0.5">View reviews</span>
          </span>
        </button>
      </div>
      <ReviewsModal open={showReviews} onOpenChange={setShowReviews} />
    </div>
  )
}
