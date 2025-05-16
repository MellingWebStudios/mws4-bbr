import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"
import TopBar from "@/components/top-bar"
import GoogleAnalytics from "@/components/google-analytics"
import { Suspense } from "react"
import StickyCallBar from "@/components/sticky-call-bar"
import WhatsAppButton from "@/components/whatsapp-button"
import SchemaMarkup from "@/components/schema-markup"
import { CookieConsentProvider } from "@/context/cookie-consent-context"
import CookieConsentBanner from "@/components/cookie-consent-banner"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Boiler Service, Repairs & Inspections Birmingham | Gas Safe | No Call-Out Fee",
  description:
    "Professional boiler service, repairs & inspections from Gas Safe engineers in Birmingham. No call-out fee, clear pricing, 12-month guarantee. Call 0800 320 2345.",
  keywords:
    "boiler service Birmingham, boiler repairs, gas safety inspections, Gas Safe engineers, boiler maintenance, annual boiler service",
  openGraph: {
    title: "Boiler Service, Repairs & Inspections Birmingham | Gas Safe | No Call-Out Fee",
    description:
      "Professional boiler service, repairs & inspections from Gas Safe engineers in Birmingham. No call-out fee, clear pricing.",
    url: "https://www.birminghamboilerrepairs.com",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CookieConsentProvider>
            <GoogleAnalytics />
            <SchemaMarkup />
            <div className="flex min-h-screen flex-col">
              <TopBar />
              <Navbar />
              <Suspense fallback={`Loading...`}>
                <main className="flex-1">{children}</main>
              </Suspense>
              <Footer />
              <ChatbotButton />
              <CookieConsentBanner />
            </div>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
