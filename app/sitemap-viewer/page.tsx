import Link from "next/link"
import fs from "fs"
import path from "path"
import { parseStringPromise } from "xml2js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap Viewer | Birmingham Boiler Repairs",
  description: "View the sitemap of Birmingham Boiler Repairs website",
}

interface SitemapUrl {
  loc: string[]
  lastmod?: string[]
  changefreq?: string[]
  priority?: string[]
}

interface SitemapData {
  urlset: {
    url: SitemapUrl[]
  }
}

async function getSitemapData(): Promise<SitemapData | null> {
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")

    if (!fs.existsSync(sitemapPath)) {
      return null
    }

    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8")
    const result = await parseStringPromise(sitemapContent)
    return result as SitemapData
  } catch (error) {
    console.error("Error reading sitemap:", error)
    return null
  }
}

export default async function SitemapViewer() {
  const sitemapData = await getSitemapData()

  if (!sitemapData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Sitemap Viewer</h1>
        <Card>
          <CardContent className="p-6">
            <p>Sitemap not found. It may not have been generated yet.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sitemap Viewer</h1>
        <div className="flex space-x-4">
          <Button asChild variant="outline">
            <Link href="/sitemap.xml" target="_blank" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>View XML</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/robots.txt" target="_blank" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>View Robots.txt</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sitemap Entries</CardTitle>
          <CardDescription>Total URLs: {sitemapData.urlset.url.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">URL</th>
                  <th className="px-4 py-2 text-left">Last Modified</th>
                  <th className="px-4 py-2 text-left">Change Frequency</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                </tr>
              </thead>
              <tbody>
                {sitemapData.urlset.url.map((url, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">
                      <a
                        href={url.loc[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {url.loc[0].replace("https://www.birminghamboilerrepairs.com", "")}
                      </a>
                    </td>
                    <td className="px-4 py-2">{url.lastmod?.[0] || "-"}</td>
                    <td className="px-4 py-2">{url.changefreq?.[0] || "-"}</td>
                    <td className="px-4 py-2">{url.priority?.[0] || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
