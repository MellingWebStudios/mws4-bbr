"use client"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

const TopBar = dynamic(() => import("@/components/top-bar"), { ssr: true })
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: true })
const Footer = dynamic(() => import("@/components/footer"), { ssr: true })
const StickyCallBar = dynamic(() => import("@/components/sticky-call-bar"), { ssr: true })

const LazyGoogleAnalytics = dynamic(() => import("@/components/google-analytics"), { ssr: false })
const LazyChatbotButton = dynamic(() => import("@/components/chatbot-button"), { ssr: false })
// const LazyWhatsAppButton = dynamic(() => import("@/components/whatsapp-button"), { ssr: false })
const LazyCookieConsentBanner = dynamic(() => import("@/components/cookie-consent-banner"), { ssr: false })

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const [showExtras, setShowExtras] = useState(false)

  useEffect(() => {
    const onFirstInteraction = () => setShowExtras(true)
    window.addEventListener("pointerdown", onFirstInteraction, { once: true })
    window.addEventListener("keydown", onFirstInteraction, { once: true })

    // Also load extras when browser is idle (if user never interacts)
    const idleCallback = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 2000))
    const idleId = idleCallback(() => setShowExtras(true))

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

  return (
    <>
      <TopBar />
      <Navbar />
      {children}
      <Footer />
      <StickyCallBar />
      {showExtras && <LazyGoogleAnalytics />}
      {showExtras && <LazyChatbotButton />}
      {/* {showExtras && <LazyWhatsAppButton />} */}
      {showExtras && <LazyCookieConsentBanner />}
    </>
  )
}
