"use client"

import { trackCallClick, formatPhoneHref, type CallTrackingEvent } from "@/lib/call-tracking"
import { ReactNode, MouseEvent } from "react"

interface TrackedPhoneLinkProps {
  phone: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  // New standardized tracking props
  trackingLocation: string // Required for call_location
  trackingSource?: string  // Optional for call_source
  engagementType?: string  // Optional for engagement_type
  // Legacy props for backwards compatibility
  trackingLabel?: string
  trackingCategory?: string
  // Allow any additional props to be passed through
  [key: string]: any
}

/**
 * A wrapper component that adds call tracking to any phone link
 * Usage: <TrackedPhoneLink phone="0800 320 2345" trackingLocation="hero">Call Now</TrackedPhoneLink>
 */
export default function TrackedPhoneLink({
  phone,
  children,
  className = "",
  ariaLabel,
  trackingLocation,
  trackingSource,
  engagementType,
  // Legacy props for backwards compatibility
  trackingLabel,
  trackingCategory,
  ...otherProps
}: TrackedPhoneLinkProps) {
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Track the call click
    const trackingEvent: CallTrackingEvent = {
      phone,
      call_location: trackingLocation,
      call_source: trackingSource,
      engagement_type: engagementType,
      label: trackingLabel || ariaLabel || `Call ${phone}`
    }
    
    trackCallClick(trackingEvent)
    
    // Call any existing onClick handler
    if (otherProps.onClick) {
      otherProps.onClick(e)
    }
  }

  return (
    <a
      href={formatPhoneHref(phone)}
      className={className}
      aria-label={ariaLabel || `Call ${phone}`}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </a>
  )
}
