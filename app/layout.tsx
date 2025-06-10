import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootLayout from "@/components/server/RootLayout"
import ClientLayoutShell from "@/components/ClientLayoutShell"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Boiler Service, Repairs & Inspections Birmingham | Gas Safe | No Call-Out Fee",
  description: "Gas Safe boiler repairs & service in Birmingham. No call-out fee, same day service, 12-month guarantee. Call 0800 320 2345 today.",
  keywords:
    "boiler service Birmingham, boiler repairs, gas safety inspections, Gas Safe engineers, boiler maintenance, annual boiler service",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk",
  },
  openGraph: {
    title: "Boiler Service, Repairs & Inspections Birmingham | Gas Safe | No Call-Out Fee",
    description: "Gas Safe boiler repairs & service in Birmingham. No call-out fee, same day service, 12-month guarantee. Call 0800 320 2345 today.",
    url: "https://www.birminghamboilerrepairs.uk",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birmingham Boiler Repairs - Gas Safe Engineers",
      }
    ],
  },
}

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon0.svg" />
        <link rel="icon" type="image/png" sizes="any" href="/icon1.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="150x150" href="/mstile-150x150.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        {/* Preload LCP hero image for desktop */}
        <link rel="preload" as="image" href="/images/engineers-team.svg" />
        {/* Preload LCP hero image for mobile */}
        <link rel="preload" as="image" href="/images/engineers-team.svg" media="(max-width: 767px)" />
        {/* Removed Inter font manual preload as Next.js font loader handles it */}
        {/* Removed CSS preload and stylesheet links for /app/globals.css, as global CSS is imported via import statement above. */}
        {/* Inline critical CSS for above-the-fold content */}
        {/* Removed inlined color and utility classes to restore Tailwind and theme color handling. */}
        {/* If you want to inline only the most essential critical CSS, do so here, but do NOT override Tailwind's color variables or classes. */}
        {/* Optionally, you can inline only a minimal CSS reset or leave this empty for now. */}
        {/* Inline critical CSS for LCP hero image and container */}
        <style>{`
          .mobile-hero-image, .desktop-hero-image {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 220px;
            background: linear-gradient(to bottom, #005BBB, #005BBBcc);
          }
          .rounded-xl { border-radius: 1rem; }
        `}</style>
      </head>
      <RootLayout className={inter.className}>
        <ClientLayoutShell>
          {children}
        </ClientLayoutShell>
      </RootLayout>
    </html>
  )
}
