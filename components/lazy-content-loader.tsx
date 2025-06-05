"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Lazy load FAQ component only when needed
const LazyBoilerFAQ = dynamic(() => import("@/components/boiler-faq").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg animate-pulse">
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading FAQ...</div>
      </div>
    </div>
  )
})

// Lazy load testimonials
const LazyTestimonialCarousel = dynamic(() => import("@/components/testimonial-carousel").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => (
    <div className="min-h-[300px] bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg animate-pulse" />
  )
})

interface LazyContentLoaderProps {
  children?: React.ReactNode;
  loadFAQ?: boolean;
  loadTestimonials?: boolean;
}

export default function LazyContentLoader({ 
  children, 
  loadFAQ = false, 
  loadTestimonials = false 
}: LazyContentLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Start loading non-critical content after initial page load
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 1500) // Delay by 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) {
    return null
  }

  return (
    <>
      {children}
      {loadFAQ && <LazyBoilerFAQ />}
      {loadTestimonials && <LazyTestimonialCarousel />}
    </>
  )
}
