import { notFound } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - Birmingham Boiler Repairs",
  description: "The page you're looking for doesn't exist. Find our boiler repair services, gas safety certificates, and contact information.",
  robots: "noindex, nofollow",
}

export default function CatchAllPage() {
  // This will trigger the not-found.tsx page with proper 404 status
  notFound()
}
