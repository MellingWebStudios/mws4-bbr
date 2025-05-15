"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href="tel:08003202345"
      className="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-red-600 py-3 text-white shadow-lg transition-all hover:bg-red-700 md:hidden"
      aria-label="Tap to book your boiler service"
    >
      <Phone className="h-5 w-5" />
      <span className="font-bold">Tap to book your boiler service</span>
    </a>
  )
}
