import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootLayout from "@/components/server/RootLayout"
import ClientLayoutShell from "@/components/ClientLayoutShell"

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

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Preload LCP hero image */}
        <link rel="preload" as="image" href="/images/engineers-team.svg" />
        {/* Preload Inter font */}
        <link rel="preload" as="font" href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTcviYw.woff2" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <RootLayout className={inter.className}>
        <ClientLayoutShell>
          {children}
        </ClientLayoutShell>
      </RootLayout>
    </html>
  )
}
