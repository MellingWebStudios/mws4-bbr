"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const MaintenanceTips = () => {
  const [activeTab, setActiveTab] = useState("pressure")

  const tips = [
    {
      id: "pressure",
      title: "Re-pressurise Boiler",
      videoId: "_JM3_hKbFDw", // Replace with actual YouTube ID
      description:
        "Low boiler pressure is a common issue that you can fix yourself. This 90-second guide shows you how to re-pressurise your boiler without any special tools.",
    },
    {
      id: "reset",
      title: "Reset Boiler",
      videoId: "5rwQS8sDeP0", // Replace with actual YouTube ID
      description:
        "If your boiler has locked out or isn't working, a simple reset might fix the problem. Follow these steps to safely reset your boiler.",
    },
    {
      id: "radiators",
      title: "Ferroli HE Guide",
      videoId: "6-yKzaN2TiA", // Replace with actual YouTube ID
      description:
        "How to use the functions on a Ferroli HE boiler .With the possible problems you may encounter with the button if used wrong",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Maintenance Tips</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Quick fixes you can try before calling an engineer
          </p>
        </div>

        <Card className="overflow-hidden border-none shadow-lg">
          <CardContent className="p-0">
            <Tabs defaultValue="pressure" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                <TabsList className="grid w-full grid-cols-3">
                  {tips.map((tip) => (
                    <TabsTrigger
                      key={tip.id}
                      value={tip.id}
                      className="data-[state=active]:bg-secondary data-[state=active]:text-white"
                    >
                      {tip.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {tips.map((tip) => (
                <TabsContent key={tip.id} value={tip.id} className="border-none p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${tip.videoId}`}
                        title={tip.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                    <div className="flex flex-col justify-center p-6">
                      <h3 className="mb-2 text-xl font-bold">{tip.title}</h3>
                      <p className="mb-4 text-gray-600">{tip.description}</p>
                      <div className="mt-auto">
                        <Button asChild variant="outline" className="border-secondary text-secondary">
                          <Link href="/guides" className="flex items-center">
                            View all maintenance guides <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default MaintenanceTips
