"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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
    title: "How to Use a Ferroli HE boiler",
    videoId: "6-yKzaN2TiA",
    description:
      "How to use the functions on a Ferroli HE boiler .With the possible problems you may encounter with the button if used wrong",
  },
]

export default function GuidesPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Maintenance Guides</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Step-by-step video guides to help you solve common boiler issues yourself.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {guides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${guide.videoId}`}
                    title={guide.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-bold">{guide.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{guide.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
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
  )
}
