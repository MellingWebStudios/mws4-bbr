"use client"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import SchemaMarkup from "@/components/schema-markup"
import { CookieConsentProvider } from "@/context/cookie-consent-context"
import { ThemeProvider } from "@/components/theme-provider"
const TopBar = dynamic(() => import("@/components/top-bar"))
const Navbar = dynamic(() => import("@/components/navbar"))
const Footer = dynamic(() => import("@/components/footer"))
const StickyCallBar = dynamic(() => import("@/components/sticky-call-bar"))

const LazyGoogleAnalytics = dynamic(() => import("@/components/google-analytics"), { ssr: false, loading: () => null })
const LazyChatbotButton = dynamic(() => import("@/components/chatbot-button"), { ssr: false, loading: () => null })
const LazyWhatsAppButton = dynamic(() => import("@/components/whatsapp-button"), { ssr: false, loading: () => null })
const LazyCookieConsentBanner = dynamic(() => import("@/components/cookie-consent-banner"), { ssr: false, loading: () => null })

export default function ClientLayoutShell({ children, interClassName }: { children: React.ReactNode, interClassName: string }) {
  const [showExtras, setShowExtras] = useState(false)

  useEffect(() => {
    const onFirstInteraction = () => setShowExtras(true)
    window.addEventListener("pointerdown", onFirstInteraction, { once: true })
    window.addEventListener("keydown", onFirstInteraction, { once: true })
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
    }
  }, [])

  return (
    <body className={interClassName}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CookieConsentProvider>
          <SchemaMarkup />
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyCallBar />
            {showExtras && <LazyGoogleAnalytics />}
            {showExtras && <LazyChatbotButton />}
            {showExtras && <LazyWhatsAppButton />}
            {showExtras && <LazyCookieConsentBanner />}
          </div>
        </CookieConsentProvider>
      </ThemeProvider>
    </body>
  )
}
