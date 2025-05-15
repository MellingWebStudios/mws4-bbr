"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TrackingButtonProps {
  href: string
  eventName: string
  eventCategory: string
  eventLabel: string
  children: React.ReactNode
  className?: string
}

export default function TrackingButton({
  href,
  eventName,
  eventCategory,
  eventLabel,
  children,
  className,
}: TrackingButtonProps) {
  const [hasWindow, setHasWindow] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true)
    }
  }, [])

  const handleClick = () => {
    if (hasWindow && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
      })
    }
  }

  return (
    <Button asChild className={className} onClick={handleClick}>
      {href.startsWith("tel:") || href.startsWith("mailto:") ? (
        <a href={href} className="flex items-center gap-2" aria-label={eventLabel}>
          {children}
        </a>
      ) : (
        <Link href={href} className="flex items-center gap-2">
          {children}
        </Link>
      )}
    </Button>
  )
}
