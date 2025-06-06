import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found (404) - Birmingham Boiler Repairs",
  description: "The page you're looking for doesn't exist. Find our boiler repair services, gas safety certificates, and emergency callouts.",
  robots: "noindex, nofollow",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Page Not Found</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        
        {/* Quick navigation to main services */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Looking for our services?</h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <Link href="/services/boiler-repairs" className="text-primary hover:underline">
              🔧 Boiler Repairs
            </Link>
            <Link href="/services/boiler-servicing" className="text-primary hover:underline">
              ⚙️ Boiler Servicing
            </Link>
            <Link href="/services/gas-safety" className="text-primary hover:underline">
              📋 Gas Safety Certificates
            </Link>
            <Link href="/services/ferroli-specialists" className="text-primary hover:underline">
              🏭 Ferroli Specialists
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Emergency Contact</Link>
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Need immediate help? Call us on{" "}
          <a href="tel:08003202345" className="text-primary font-semibold hover:underline">
            0800 320 2345
          </a>
        </p>
      </div>
    </div>
  )
}
