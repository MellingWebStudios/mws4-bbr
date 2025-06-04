import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-5xl font-bold text-secondary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Page Not Found</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.<br />
        If you need boiler repairs, servicing, or a gas safety certificate, please return to the homepage or contact us below.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link href="/">Go to Homepage</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
