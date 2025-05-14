import fs from "fs"
import { globby } from "globby"
import prettier from "prettier"
import { locations, services } from "../lib/locations-data"

const WEBSITE_URL = "https://www.birminghamboilerrepairs.com"

/**
 * Generate sitemap.xml
 */
async function generateSitemap() {
  console.log("Generating sitemap.xml...")

  // Get all page paths from the Next.js app
  const pages = await globby([
    "app/**/page.tsx",
    "app/**/route.ts",
    "!app/api/**/*",
    "!app/**/not-found.tsx",
    "!app/**/error.tsx",
    "!app/**/loading.tsx",
    "!app/**/layout.tsx",
  ])

  // Transform the page paths into sitemap entries
  let sitemapEntries = pages
    .map((page) => {
      // Convert page path to route path
      // e.g., app/about/page.tsx -> /about
      const route = page.replace("app", "").replace("/page.tsx", "").replace("/route.ts", "").replace("/index", "")

      // Skip dynamic routes as we'll handle them separately
      if (route.includes("[") || route.includes("(")) {
        return null
      }

      // Format the path correctly
      const path = route === "" ? "/" : route

      // Get the file's last modified date
      const stats = fs.statSync(page)
      const lastModified = stats.mtime.toISOString().split("T")[0]

      // Set priority based on page importance
      let priority = "0.7" // Default priority

      if (path === "/") {
        priority = "1.0" // Homepage gets highest priority
      } else if (path === "/services") {
        priority = "0.9" // Main services page
      } else if (path.startsWith("/services/")) {
        priority = "0.8" // Individual service pages
      } else if (path === "/contact" || path === "/prices") {
        priority = "0.8" // Important pages
      }

      // Set change frequency based on content type
      let changefreq = "monthly" // Default frequency

      if (path === "/") {
        changefreq = "weekly" // Homepage changes more frequently
      } else if (path.includes("blog") || path === "/services") {
        changefreq = "weekly" // Blog and services may change weekly
      }

      return `
        <url>
          <loc>${WEBSITE_URL}${path}</loc>
          <lastmod>${lastModified}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>
      `
    })
    .filter(Boolean)

  // Add location-based service pages
  const locationServiceEntries = []

  for (const location of locations) {
    for (const service of services) {
      const path = `/${location.slug}/${service.slug}`
      const lastModified = new Date().toISOString().split("T")[0] // Use current date

      locationServiceEntries.push(`
        <url>
          <loc>${WEBSITE_URL}${path}</loc>
          <lastmod>${lastModified}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `)
    }
  }

  // Add location service pages to the sitemap entries
  sitemapEntries = [...sitemapEntries, ...locationServiceEntries]

  // Create the sitemap XML
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries.join("")}
    </urlset>
  `

  // Format the XML with prettier
  const formattedSitemap = await prettier.format(sitemap, {
    parser: "html",
    printWidth: 120,
  })

  // Write the sitemap to the public directory
  fs.writeFileSync("public/sitemap.xml", formattedSitemap)
  console.log("sitemap.xml generated successfully!")
}

/**
 * Generate robots.txt
 */
async function generateRobotsTxt() {
  console.log("Generating robots.txt...")

  const robotsTxt = `
# www.robotstxt.org/

# Allow crawling of all content
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Sitemap
Sitemap: ${WEBSITE_URL}/sitemap.xml
`

  // Write the robots.txt to the public directory
  fs.writeFileSync("public/robots.txt", robotsTxt.trim())
  console.log("robots.txt generated successfully!")
}

/**
 * Main function to run all generators
 */
async function run() {
  try {
    await generateSitemap()
    await generateRobotsTxt()
  } catch (error) {
    console.error("Error generating SEO files:", error)
    process.exit(1)
  }
}

// Run the script
run()
