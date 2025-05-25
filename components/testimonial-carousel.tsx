"use client"

import { useState, useEffect } from "react"
import TestimonialCard from "@/components/testimonial-card"

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "What a great service! The engineer arrived within 15 minutes of the scheduled time and fixed our boiler quickly. He explained everything clearly and left the area spotless. Renewed my faith in tradesmen.",
      author: "Julie R.",
      location: "Edgbaston",
      rating: 5,
      image: "/woman-profile.png",
    },
    {
      quote:
        "Very transparent pricing with no hidden fees. They fixed my boiler and serviced it whilst they were here, saving me money. The engineer was professional and knowledgeable. I'm over the moon with the service.",
      author: "Bonnie G.",
      location: "Harborne",
      rating: 5,
      image: "/woman-profile.png",
    },
    {
      quote:
        "Always reliable and consistent service. This is the third time I've used them for my rental properties and they never disappoint. Their engineers are punctual, professional and explain everything clearly. I wouldn't hesitate to recommend them.",
      author: "Liz J.",
      location: "Solihull",
      rating: 5,
      image: "/woman-profile.png",
    },
    {
      quote:
        "Called in the morning about my broken boiler, and they had an engineer at my house by lunchtime. The repair was completed efficiently and at the price quoted. No surprises, no hidden costs. Excellent service from start to finish.",
      author: "Mark T.",
      location: "Kings Heath",
      rating: 5,
      image: "/man-profile.png",
    },
    {
      quote:
        "Professional, punctual and reasonably priced. The engineer diagnosed the issue quickly and had the parts needed in his van. He took the time to show me how to maintain my boiler properly. My go-to for all boiler issues now.",
      author: "Sarah P.",
      location: "Moseley",
      rating: 5,
      image: "/woman-profile.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
    }, 6000) // Rotate every 6 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-full px-4">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-6 w-6 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 transition-shadow relative group ${
              activeIndex === index ? "bg-secondary/10" : "bg-gray-300/20 dark:bg-gray-700/20"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <span
              className={`block h-2 w-2 rounded-full transition-colors duration-200 ${
                activeIndex === index ? "bg-secondary" : "bg-gray-300 dark:bg-gray-700"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default TestimonialCarousel
