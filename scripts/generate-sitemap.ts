// scripts/generate-seo.ts
import fs from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { locations, services } from "../lib/locations-data";
import { getAllPosts, getAllCategories, getAllTags } from "../lib/blog-data";

/* ───────────────── CONFIG ───────────────── */
const WEBSITE_URL =
  process.env.WEBSITE_URL?.replace(/\/$/, "") || // strip trailing slash
  "https://www.birminghamboilerrepairs.uk";

const isProd = process.env.NODE_ENV === "production";

// Safety check: Prevent non-production domains in production sitemap
if (isProd && !WEBSITE_URL.includes("birminghamboilerrepairs.uk")) {
  throw new Error(
    `Refusing to generate sitemap.xml in production with non-production domain: ${WEBSITE_URL}`
  );
}

/* ───────────────── SITEMAP ───────────────── */
async function generateSitemap() {
  console.log("➜  Generating sitemap.xml …");

  const pages = await globby([
    "app/**/page.tsx",
    "app/**/route.ts",
    "!app/api/**/*",
    "!app/**/not-found.tsx",
    "!app/**/error.tsx",
    "!app/**/loading.tsx",
    "!app/**/layout.tsx",
  ]);

  const staticEntries = pages
    .map((file) => {
      const route = file
        .replace(/^app/, "")
        .replace(/\/page\.tsx$/, "")
        .replace(/\/route\.ts$/, "")
        .replace(/\/index$/, "");

      if (route.includes("[") || route.includes("(")) return null; // skip dynamic

      const path = route === "" ? "/" : route;
      const lastmod = fs.statSync(file).mtime.toISOString().split("T")[0];

      /* Priority + changefreq rules */
      const priority =
        path === "/"
          ? "1.0"
          : path === "/services"
          ? "0.9"
          : path === "/locations"
          ? "0.9"
          : path.startsWith("/services/")
          ? "0.8"
          : ["/contact", "/prices"].includes(path)
          ? "0.8"
          : "0.7";

      const changefreq =
        path === "/"
          ? "weekly"
          : path.includes("blog") || path === "/services"
          ? "weekly"
          : "monthly";

      return `
  <url>
    <loc>${WEBSITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .filter(Boolean)
    .join("");

  /* Location-based service pages */
  const locationEntries = locations
    .flatMap((loc) =>
      services.map(
        (svc) => `
  <url>
    <loc>${WEBSITE_URL}/${loc.slug}/${svc.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
    )
    .join("");

  /* Blog entries */
  let blogEntries = "";
  try {
    const blogPosts = getAllPosts();
    const categories = getAllCategories();
    const tags = getAllTags();

    // Individual blog posts
    const blogPostEntries = blogPosts.map((post: any) => `
  <url>
    <loc>${WEBSITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

    // Category pages
    const categoryEntries = categories.map(category => `
  <url>
    <loc>${WEBSITE_URL}/blog/category/${category}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("");

    // Tag pages
    const tagEntries = tags.map(tag => `
  <url>
    <loc>${WEBSITE_URL}/blog/tag/${encodeURIComponent(tag)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join("");

    // Main blog page
    const mainBlogEntry = `
  <url>
    <loc>${WEBSITE_URL}/blog</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    blogEntries = mainBlogEntry + blogPostEntries + categoryEntries + tagEntries;
  } catch (error) {
    if (error instanceof Error) {
      console.warn("⚠ Warning: Could not generate blog sitemap entries:", error.message);
    } else {
      console.warn("⚠ Warning: Could not generate blog sitemap entries:", error);
    }
    // Continue without blog entries if there's an error
  }

  const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}${locationEntries}${blogEntries}
</urlset>`;

  const formatted = await prettier.format(rawXml, {
    parser: "html",
    printWidth: 120,
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
  console.log("   ✔ sitemap.xml");
}

/* ───────────────── ROBOTS ───────────────── */
async function generateRobotsTxt() {
  console.log("➜  Generating robots.txt …");

  const robots = isProd
    ? `# Birmingham Boiler Repairs - Production Robots.txt
# Generated on ${new Date().toISOString().split("T")[0]}

# Allow all search engines to crawl everything
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Additional crawl-delay for aggressive bots (optional)
Crawl-delay: 1

# Sitemap location
Sitemap: ${WEBSITE_URL}/sitemap.xml

# Additional sitemaps (if you have them)
# Sitemap: ${WEBSITE_URL}/sitemap-blog.xml
# Sitemap: ${WEBSITE_URL}/sitemap-services.xml

# Host declaration for primary domain
Host: ${WEBSITE_URL.replace(/^https?:\/\//, "")}

# Common bot-specific rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Block aggressive scrapers
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /`
    : `# Development/Staging Environment
# Block all crawlers in non-production

User-agent: *
Disallow: /

# No sitemap for staging
`;

  fs.mkdirSync("public", { recursive: true });
  fs.writeFileSync("public/robots.txt", robots);
  console.log("   ✔ robots.txt (" + (isProd ? "prod - crawling allowed" : "staging - crawling blocked") + ")");
}

/* ───────────────── MAIN ───────────────── */
(async () => {
  try {
    await generateSitemap();
    await generateRobotsTxt();
  } catch (err) {
    console.error("SEO build failed:", err);
    process.exit(1);
  }
})();
