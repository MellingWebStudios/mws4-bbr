"use client"

/**
 * Call Tracking Utility
 * Provides consistent phone call tracking across the entire application
 */

export interface CallTrackingEvent {
  phone: string
  call_location: string
  call_source?: string
  engagement_type?: string
  label?: string // For backwards compatibility
}

/**
 * Track a phone call click event to Google Analytics
 * @param event - The call tracking event data
 */
export function trackCallClick(event: CallTrackingEvent): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const { phone, call_location, call_source, engagement_type, label } = event

  // Clean phone number for tracking
  const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  
  // Send single consolidated event to Google Analytics 4
  window.gtag('event', 'phone_call_click', {
    phone_number: cleanPhone,
    call_location: call_location,
    call_source: call_source || 'website',
    engagement_type: engagement_type || 'call_intent',
    event_category: 'engagement',
    event_label: label || `Call from ${call_location}`,
    value: 1
  })

    // Console log for debugging (remove in production if desired)
  console.log('📞 Phone call click tracked:', {
    event: 'phone_call_click',
    phone: cleanPhone,
    call_location,
    call_source: call_source || 'website',
    engagement_type: engagement_type || 'call_intent'
  })
}

/**
 * Create a phone href with proper formatting
 * @param phone - The phone number to format
 * @returns Properly formatted tel: href
 */
export function formatPhoneHref(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  return `tel:${cleaned}`
}

/**
 * Handle phone link click with tracking
 * @param event - The call tracking event data
 * @returns Click handler function
 */
export function createPhoneClickHandler(event: CallTrackingEvent) {
  return () => {
    trackCallClick(event)
  }
}
