import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { QrCode, Download, Share2 } from "lucide-react"
import CopyLinkButton from "@/components/copy-link-button"

export const metadata = {
  title: "Review Collection Tools - Birmingham Boiler Repairs",
  description: "Tools and resources for collecting customer reviews",
  robots: "noindex, nofollow",
}

export default function ReviewToolsPage() {
  const reviewPageUrl = "https://search.google.com/local/writereview?placeid=ChIJH7HlzKeVcEgRrDinMEoJ8CU"
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(reviewPageUrl)}`

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Review Collection Tools
          </h1>
          <p className="text-xl text-gray-600">
            Use these tools to make it easy for customers to leave reviews
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-inner mb-4 inline-block">
                <img
                  src={qrCodeApiUrl}
                  alt="QR Code for Review Page"
                  className="w-64 h-64"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Customers can scan this QR code to go directly to the review page
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={qrCodeApiUrl}
                    download="bbr-review-qr-code.png"
                    target="_blank"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Direct Link Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Direct Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Share this direct link with customers via email, text, or any other method:
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4 font-mono text-sm break-all">
                {reviewPageUrl}
              </div>
              <CopyLinkButton url={reviewPageUrl} className="w-full" />
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>How to Use These Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">📧 After Service Emails</h3>
                  <p className="text-sm text-gray-600">
                    Include the direct link in your follow-up emails to customers
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">📱 Text Messages</h3>
                  <p className="text-sm text-gray-600">
                    Send the link via SMS for quick and easy access
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🎫 Business Cards</h3>
                  <p className="text-sm text-gray-600">
                    Print the QR code on business cards or flyers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Template */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Sample Email Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Subject:</strong> Thank you for choosing Birmingham Boiler Repairs!
                  <br /><br />
                  Hi [Customer Name],
                  <br /><br />
                  Thank you for choosing Birmingham Boiler Repairs for your recent boiler service. We hope you were satisfied with our work and the professionalism of our engineer.
                  <br /><br />
                  If you have a moment, we would greatly appreciate it if you could leave us a review to help other customers in Birmingham find our services:
                  <br /><br />
                  <strong>{reviewPageUrl}</strong>
                  <br /><br />
                  Your feedback helps us improve our services and assists other homeowners in finding reliable boiler repair services.
                  <br /><br />
                  Thank you again for your business!
                  <br /><br />
                  Best regards,<br />
                  The Birmingham Boiler Repairs Team
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/review-us">
              View Review Page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
