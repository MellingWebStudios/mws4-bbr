"use server"

export async function triggerSitemapRegeneration(): Promise<{ success: boolean; message: string }> {
  const secret = process.env.SITEMAP_REGENERATION_SECRET
  if (!secret) {
    return { success: false, message: "Sitemap regeneration is not configured" }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/regenerate-sitemap`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      }
    )
    const data = await response.json()
    return { success: response.ok, message: data.message || "Unknown response" }
  } catch {
    return { success: false, message: "Failed to contact regeneration endpoint" }
  }
}
