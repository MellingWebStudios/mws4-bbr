"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export default function SitemapStatus() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const regenerateSitemap = async () => {
    setIsLoading(true)
    setStatus("idle")
    setMessage("")

    try {
      const response = await fetch("/api/regenerate-sitemap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_SITEMAP_REGENERATION_SECRET || "your-secret-key",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to regenerate sitemap")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred while regenerating the sitemap")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sitemap Status</CardTitle>
        <CardDescription>Manage your website's sitemap and robots.txt</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm">
              <p>
                Your sitemap is automatically generated during the build process. You can also manually regenerate it
                using the button below.
              </p>
            </div>
          </div>

          {status === "success" && (
            <div className="flex items-center space-x-2 rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center space-x-2 rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{message}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={regenerateSitemap} disabled={isLoading} className="flex items-center space-x-2">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Regenerating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>Regenerate Sitemap</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
