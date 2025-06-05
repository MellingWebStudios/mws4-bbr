import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Read the static sitemap.xml file from the public directory
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')

    return new NextResponse(sitemapContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error serving sitemap:', error)
    return new NextResponse('Sitemap not found', { status: 404 })
  }
}
