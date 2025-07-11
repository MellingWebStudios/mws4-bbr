"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackCallClick, formatPhoneHref, type CallTrackingEvent } from "@/lib/call-tracking"

interface TrackedCallButtonProps {
  phone: string
  label?: string
  children?: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  fullWidth?: boolean
  showIcon?: boolean
  // New standardized tracking props
  trackingLocation: string // Required for call_location
  trackingSource?: string
  engagementType?: string
  // Legacy props for backwards compatibility
  trackingCategory?: string
}

export default function TrackedCallButton({
  phone,
  label,
  children,
  className = "",
  size = "lg",
  variant = "default",
  fullWidth = true,
  showIcon = true,
  trackingLocation,
  trackingSource,
  engagementType,
  // Legacy props
  trackingCategory
}: TrackedCallButtonProps) {
  
  const handleClick = () => {
    const trackingEvent: CallTrackingEvent = {
      phone,
      call_location: trackingLocation,
      call_source: trackingSource,
      engagement_type: engagementType,
      label: label || `Call ${phone}`
    }
    
    trackCallClick(trackingEvent)
  }

  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <a
        href={formatPhoneHref(phone)}
        onClick={handleClick}
        className="flex items-center justify-center gap-2"
        aria-label={`Call ${phone}`}
      >
        {showIcon && <Phone className="h-4 w-4" />}
        {children || label || `Call ${phone}`}
      </a>
    </Button>
  )
}
