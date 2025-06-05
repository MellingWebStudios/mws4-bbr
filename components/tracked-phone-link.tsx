"use client"

import { trackCallClick, formatPhoneHref, type CallTrackingEvent } from "@/lib/call-tracking"
import { ReactNode, MouseEvent } from "react"

interface TrackedPhoneLinkProps {
  phone: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  // Tracking specific props
  trackingLabel?: string
  trackingLocation?: string
  trackingSource?: string
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
  trackingLabel,
  trackingLocation,
  trackingSource,
  trackingCategory = "engagement",
  ...otherProps
}: TrackedPhoneLinkProps) {
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Track the call click
    const trackingEvent: CallTrackingEvent = {
      phone,
      label: trackingLabel || ariaLabel || `Call ${phone}`,
      category: trackingCategory,
      location: trackingLocation,
      source: trackingSource
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
