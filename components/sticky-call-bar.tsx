"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"
import TrackedPhoneLink from "@/components/tracked-phone-link"

// Utility: throttle function
function throttle<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let last = 0
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[]
  return function (this: any, ...args: any[]) {
    const now = Date.now()
    lastArgs = args
    if (now - last >= wait) {
      last = now
      fn.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        last = Date.now()
        timeout = null
        fn.apply(this, lastArgs)
      }, wait - (now - last))
    }
  } as T
}

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 150) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }, 100)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <TrackedPhoneLink
      phone="08003202345"
      trackingLocation="sticky_call_bar"
      trackingSource="mobile_bottom_cta"
      engagementType="call_intent"
      className="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-red-600 py-3 text-white shadow-lg transition-all hover:bg-red-700 md:hidden"
      ariaLabel="Tap to book your boiler service"
    >
      <Phone className="h-5 w-5" />
      <span className="font-bold">Tap to book your boiler service</span>
    </TrackedPhoneLink>
  )
}
