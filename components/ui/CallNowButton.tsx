"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import TrackedPhoneLink from "@/components/tracked-phone-link"

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
    <TrackedPhoneLink
      phone={tel}
      trackingLocation="call_now_button"
      trackingSource="generic_call_button"
      className={`w-full bg-primary hover:bg-primary/90 shadow-md h-12 ${pulse ? "animate-pulse-subtle" : ""} flex items-center justify-center gap-2 font-semibold !text-black rounded-md px-4 py-2 text-sm transition-colors`}
      style={{ color: '#000 !important' }}
      ariaLabel={label}
    >
      <Phone className="h-4 w-4" />
      {label}
    </TrackedPhoneLink>
  )
}


