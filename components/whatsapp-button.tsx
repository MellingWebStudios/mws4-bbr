"use client"

import { MessageSquare } from "lucide-react"
import Link from "next/link"

export default function WhatsAppButton() {
  const whatsappNumber = "447807776411" // Replace with actual WhatsApp number
  const message = "Hi, I need help with my boiler. Can you assist?"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 md:flex"
      aria-label="Message on WhatsApp"
      onClick={() => {
        // Track WhatsApp click event
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "whatsapp_click", {
            event_category: "engagement",
            event_label: "WhatsApp Button",
          })
        }
      }}
    >
      <MessageSquare className="h-6 w-6" />
    </Link>
  )
}
