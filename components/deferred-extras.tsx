"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

const LazyGoogleAnalytics = dynamic(() => import("@/components/google-analytics"), { ssr: false })
const LazyChatbotButton = dynamic(() => import("@/components/chatbot-button"), { ssr: false })
const LazyCookieConsentBanner = dynamic(() => import("@/components/cookie-consent-banner"), { ssr: false })

/**
 * Everything the first paint does not need: analytics, the chatbot and the
 * cookie banner.
 *
 * Held back until the visitor touches the page, or until the browser is idle if
 * they never do. This used to live in a client component that also wrapped the
 * whole shell — so the top bar, navbar and footer were dragged into the client
 * bundle with it. Now it is a leaf, and the static chrome renders on the server.
 */
export default function DeferredExtras() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onFirstInteraction = () => setShow(true)
    window.addEventListener("pointerdown", onFirstInteraction, { once: true })
    window.addEventListener("keydown", onFirstInteraction, { once: true })

    const idleCallback = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 2000))
    const idleId = idleCallback(() => setShow(true))

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
      if ((window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(idleId)
      } else {
        clearTimeout(idleId)
      }
    }
  }, [])

  if (!show) return null

  return (
    <>
      <LazyGoogleAnalytics />
      <LazyChatbotButton />
      <LazyCookieConsentBanner />
    </>
  )
}
