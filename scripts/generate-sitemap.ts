// scripts/generate-seo.ts
import fs from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { locations, services } from "../lib/locations-data";

/* ───────────────── CONFIG ───────────────── */
const WEBSITE_URL =
  process.env.WEBSITE_URL?.replace(/\/$/, "") || // strip trailing slash
  "https://www.birminghamboilerrepairs.uk";

const isProd = process.env.NODE_ENV === "production";

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

  const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}${locationEntries}
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
    ? `User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Sitemap: ${WEBSITE_URL}/sitemap.xml`
    : `User-agent: *
Disallow: /`;

  fs.mkdirSync("public", { recursive: true });
  fs.writeFileSync("public/robots.txt", robots);
  console.log("   ✔ robots.txt (" + (isProd ? "prod" : "staging") + ")");
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
