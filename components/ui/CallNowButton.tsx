"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

type CallNowButtonProps = {
  tel?: string
  label?: string
  fullWidth?: boolean
  pulse?: boolean
}

export default function CallNowButton({
  tel = "08003202345",
  label = "Call Now – 0800 320 2345",
  fullWidth = true,
  pulse = false,
}) {
  return (
    <Button
      asChild
      size="lg"
      className={`w-full bg-primary hover:bg-primary/90 shadow-md h-12 ${pulse ? "animate-pulse-subtle" : ""}`}
    >
      <a
        href={`tel:${tel}`}
        className="flex items-center justify-center gap-2 font-semibold !text-black"
        style={{ color: '#000 !important' }}
      >
        <Phone className="h-4 w-4" />
        {label}
      </a>
    </Button>
  )
}


