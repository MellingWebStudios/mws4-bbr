import Image from "next/image"
import Link from "next/link"
import { Star, ExternalLink, Heart, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import businessInfo from "@/config/businessInfo"

export const metadata = {
  title: "Leave Us a Review - Birmingham Boiler Repairs",
  description: "Had a great experience with Birmingham Boiler Repairs? We'd love to hear about it! Leave us a review on Google to help other customers find us.",
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
}

export default function ReviewUsPage() {
  const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJH7HlzKeVcEgRrDinMEoJ8CU"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section with Company Branding */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="Birmingham Boiler Repairs Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-center">
                <div>
                    <span className="text-secondary text-xl font-bold">Birmingham </span>
                    <span className="text-red-600 text-xl font-bold">Boiler Repairs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Heart className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Thank You for Choosing Us!
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              We hope you had a great experience with our service. Your feedback helps us improve and helps other customers find reliable boiler services.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-current" />
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            {/* Google Review Card */}
            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative h-16 w-16 bg-white rounded-full p-3 shadow-lg">
                    <Image
                      src="/google-logo.png"
                      alt="Google Logo"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Leave a Google Review</h2>
                <p className="text-gray-600 mb-6">
                  Share your experience on Google to help other customers in Birmingham find our services.
                </p>
                <div className="flex justify-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-4 group-hover:scale-105 transition-transform"
                >
                  <Link
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Star className="h-5 w-5" />
                    Review Us on Google
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Your Review Matters
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Help Others</h4>
                <p className="text-gray-600 text-sm">
                  Your review helps other Birmingham residents find reliable boiler services
                </p>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <ThumbsUp className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Improve Our Service</h4>
                <p className="text-gray-600 text-sm">
                  Your feedback helps us continue to provide excellent service
                </p>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Show Appreciation</h4>
                <p className="text-gray-600 text-sm">
                  Let our engineers know their hard work is appreciated
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need More Help?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any questions or concerns, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href={`tel:${businessInfo.phone.freephone}`}>
                  Call {businessInfo.phone.freephone}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`mailto:${businessInfo.email}`}>
                  Email Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  )
}
