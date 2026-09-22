"use client"

import { useCookieConsent } from "@/context/cookie-consent-context"

/**
 * The one interactive thing in the footer.
 *
 * Extracted so footer.tsx can be a server component: 338 lines of static
 * markup were shipping to the browser and hydrating because of this single
 * button, on a page whose LCP is blocked by main-thread script work.
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  const { openPreferences } = useCookieConsent()

  return (
    <button onClick={openPreferences} className={className}>
      Cookie Settings
    </button>
  )
}
