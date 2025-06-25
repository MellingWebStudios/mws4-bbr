import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import VideoSchema from "@/components/video-schema"
import BreadcrumbSchema from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Boiler Maintenance Guides | Birmingham Boiler Repairs",
  description:
    "Free step-by-step video guides to help you solve common boiler issues yourself. Learn how to re-pressurise your boiler, reset your system, and more.",
  keywords: "boiler maintenance guides, boiler pressure guide, reset boiler, DIY boiler repair, boiler troubleshooting, video tutorials",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/guides",
  },
  openGraph: {
    title: "Free Boiler Maintenance Video Guides | Birmingham Boiler Repairs", 
    description: "Watch our free step-by-step video guides to solve common boiler problems yourself. Professional tips from Gas Safe engineers.",
    url: "https://www.birminghamboilerrepairs.uk/guides",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birmingham Boiler Repairs Maintenance Video Guides",
      }
    ],
  },
  other: {
    "video:tag": "boiler maintenance,DIY repair,heating,tutorial",
    "video:duration": "2:30",
    "og:video:type": "text/html"
  }
}

const guides = [
  {
    id: "pressure",
    title: "Re-pressurise Your Boiler (No Tools Needed)",
    videoId: "_JM3_hKbFDw",
    description:
      "Low boiler pressure is a common issue that you can fix yourself. This 90-second guide shows you how to re-pressurise your boiler without any special tools.",
  },
  {
    id: "reset",
    title: "How to Reset Your Boiler",
    videoId: "5rwQS8sDeP0",
    description:
      "If your boiler has locked out or isn't working, a simple reset might fix the problem. Follow these steps to safely reset your boiler.",
  },
  {
    id: "radiators",
    title: "How to Bleed Radiators and Fix Cold Spots",
    videoId: "6-yKzaN2TiA", 
    description:
      "Learn how to properly bleed your radiators to remove air bubbles and fix cold spots. A simple maintenance task that can improve your heating efficiency.",
  },
]

export default function GuidesPage() {
  const pageUrl = "https://www.birminghamboilerrepairs.uk/guides"
  const pageTitle = "Boiler Maintenance Guides | Birmingham Boiler Repairs"

  const breadcrumbItems = [
    { name: "Home", item: "https://www.birminghamboilerrepairs.uk" },
    { name: "Maintenance Guides", item: pageUrl }
  ]

  return (
    <>
      <VideoSchema 
        videos={guides} 
        pageUrl={pageUrl}
        pageTitle={pageTitle}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Maintenance Guides</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Step-by-step video guides to help you solve common boiler issues yourself.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Free DIY boiler maintenance tutorials from Birmingham's trusted Gas Safe engineers.
          </p>
        </div>
        
        {/* Video content section */}
        <div className="grid gap-8 md:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video w-full" id={guide.id}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${guide.videoId}?enablejsapi=1&origin=https://www.birminghamboilerrepairs.uk&rel=0`}
                    title={guide.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    data-video-id={guide.videoId}
                    data-video-title={guide.title}
                    itemScope
                    itemType="https://schema.org/VideoObject"
                  ></iframe>
                  {/* Add microdata for additional video context */}
                  <meta itemProp="name" content={guide.title} />
                  <meta itemProp="description" content={guide.description} />
                  <meta itemProp="thumbnailUrl" content={`https://i.ytimg.com/vi/${guide.videoId}/maxresdefault.jpg`} />
                  <meta itemProp="contentUrl" content={`https://www.youtube.com/watch?v=${guide.videoId}`} />
                  <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${guide.videoId}`} />
                  <meta itemProp="uploadDate" content="2024-01-15" />
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-bold" itemProp="name">{guide.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300" itemProp="description">{guide.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span>Free DIY Guide</span>
                    <span>•</span>
                    <span>No tools required</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional information about the video guides */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About These Video Guides</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Re-pressurising Your Boiler</h3>
                <p>Learn the simple 90-second process to restore your boiler pressure without any special tools or technical knowledge.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Boiler Reset Procedure</h3>
                <p>Step-by-step instructions for safely resetting your boiler when it has locked out or stopped working.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Radiator Maintenance</h3>
                <p>Fix cold spots and improve heating efficiency by learning proper radiator bleeding techniques.</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Safety First:</strong> These guides cover safe DIY maintenance only. For gas work or complex repairs, always contact a Gas Safe registered engineer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" className="border-secondary text-secondary">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
    </>
  )
}
