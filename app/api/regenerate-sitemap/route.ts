import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: Request) {
  const API_SECRET = process.env.SITEMAP_REGENERATION_SECRET
  if (!API_SECRET) {
    return NextResponse.json({ success: false, message: "Not configured" }, { status: 503 })
  }

  try {
    const { secret } = await request.json()

    if (secret !== API_SECRET) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Run the sitemap generation script
    await execAsync("npm run generate-seo")

    return NextResponse.json({
      success: true,
      message: "Sitemap and robots.txt regenerated successfully",
    })
  } catch (error) {
    console.error("Error regenerating sitemap:", error)
    return NextResponse.json({ success: false, message: "Failed to regenerate sitemap" }, { status: 500 })
  }
}
