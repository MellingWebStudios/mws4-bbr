import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, MapPin, Wrench, ArrowRight } from "lucide-react"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Page Not Found - Birmingham Boiler Repairs",
  description: "The page you're looking for doesn't exist. Find our boiler repair services, gas safety certificates, and contact information.",
  robots: "noindex, nofollow",
}

export default async function CatchAllPage({ params }: { params: Promise<{ catchAll: string[] }> }) {
  const { catchAll } = await params
  const path = catchAll?.join('/') || ''
  
  // Check if this looks like a brand specialist URL pattern
  const isBrandSpecialistUrl = /\/(alpha|main|glow-worm)-specialists$/.test(path)
  const isServiceUrl = /\/(Boiler|Heating)/.test(path)
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist, but we can help you find what you need.
        </p>

        {/* Show specific suggestions based on URL pattern */}
        {isBrandSpecialistUrl && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold mb-2">Looking for Brand Specialists?</h2>
            <p className="text-sm text-gray-700 mb-3">
              We've updated our specialist pages. Try these instead:
            </p>
            <div className="space-y-2">
              <Link href="/services/alpha-boiler-specialists" className="block text-blue-600 hover:underline">
                Alpha Boiler Specialists
              </Link>
              <Link href="/services/main-boiler-specialists" className="block text-blue-600 hover:underline">
                Main Boiler Specialists
              </Link>
              <Link href="/services/glowworm-specialists" className="block text-blue-600 hover:underline">
                Glow-worm Specialists
              </Link>
            </div>
          </div>
        )}

        {isServiceUrl && (
          <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-lg font-semibold mb-2">Looking for Our Services?</h2>
            <p className="text-sm text-gray-700 mb-3">
              Our main services are available here:
            </p>
            <div className="space-y-2">
              <Link href="/services/boiler-repairs" className="block text-green-600 hover:underline">
                Boiler Repairs
              </Link>
              <Link href="/services/boiler-servicing" className="block text-green-600 hover:underline">
                Boiler Servicing
              </Link>
              <Link href="/services/gas-safety" className="block text-green-600 hover:underline">
                Gas Safety Inspections
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Home className="h-4 w-4" />
                Home
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button variant="outline" size="sm" className="w-full">
                  Go Home
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/locations">
                <Button variant="outline" size="sm" className="w-full">
                  Find Your Area
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="h-4 w-4" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/services">
                <Button variant="outline" size="sm" className="w-full">
                  Our Services
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Need immediate help? Call us now:
          </p>
          <Button asChild size="lg" className="font-semibold">
            <TrackedPhoneLink
              phone="0800 320 2345"
              trackingLocation="catch_all_page"
              trackingSource="emergency_contact"
              className="flex items-center justify-center"
              ariaLabel="Call us now for immediate help: 0800 320 2345"
            >
              0800 320 2345
            </TrackedPhoneLink>
          </Button>
        </div>
      </div>
    </div>
  )
}
