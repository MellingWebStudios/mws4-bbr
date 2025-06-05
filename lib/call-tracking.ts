"use client"

/**
 * Call Tracking Utility
 * Provides consistent phone call tracking across the entire application
 */

export interface CallTrackingEvent {
  phone: string
  label?: string
  category?: string
  location?: string
  source?: string
}

/**
 * Track a phone call click event to Google Analytics
 * @param event - The call tracking event data
 */
export function trackCallClick(event: CallTrackingEvent): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const { phone, label, category, location, source } = event

  // Clean phone number for tracking
  const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  
  // Send event to Google Analytics 4
  window.gtag('event', 'phone_call', {
    event_category: category || 'engagement',
    event_label: label || `Call ${phone}`,
    phone_number: cleanPhone,
    call_location: location || 'unknown',
    call_source: source || 'website',
    value: 1,
    custom_parameters: {
      contact_method: 'phone',
      engagement_type: 'call_intent'
    }
  })

  // Also send a more specific conversion event
  window.gtag('event', 'call_initiated', {
    event_category: 'conversion',
    event_label: label || `Call Intent - ${phone}`,
    phone_number: cleanPhone,
    call_location: location || 'unknown',
    call_source: source || 'website'
  })

  // Console log for debugging (remove in production if desired)
  console.log('📞 Call tracking event sent:', {
    phone: cleanPhone,
    label,
    category,
    location,
    source
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

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'event',
      eventName: string,
      parameters?: Record<string, any>
    ) => void
  }
}
