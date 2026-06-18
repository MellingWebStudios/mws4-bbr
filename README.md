<h1 align="center">Birmingham Boiler Repairs Website</h1>

<p align="center">
  <em>
    Built and delivered by <a href="https://mellingwebstudios.com">MellingWebStudios</a>
  </em>
</p>

<p align="center">
  <a href="https://github.com/MellingWebStudios/mws4-bbr/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/MellingWebStudios/mws4-bbr/ci.yml?branch=master" alt="CI Status" />
  </a>
  <a href="https://github.com/MellingWebStudios/mws4-bbr/releases">
    <img src="https://img.shields.io/github/v/tag/MellingWebStudios/mws4-bbr" alt="Latest Release" />
  </a>
  <a href="https://github.com/MellingWebStudios/mws4-bbr/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/MellingWebStudios/mws4-bbr" alt="License" />
  </a>
</p>

---

## 📑 Table of Contents

* [Tech Stack](#-tech-stack)
* [Features](#-features)
* [Getting Started](#-getting-started)
* [Production Build](#-production-build)
* [How It Works](#-how-it-works)
* [Deployment](#-deployment)
* [Project Structure](#-project-structure)
* [FAQ](#-faq)
* [Contact & Support](#-contact--support)

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **UI:** React, Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/)
* **Language:** TypeScript
* **SEO:** Dynamic meta, open graph, sitemaps
* **Hosting:** Fly.io (client) / Vercel (preview, staging)
* **Other:** Modern accessibility, Lighthouse 90+ score

---

## ✨ Features

* **Dynamic location/service pages** — Renders hundreds of hyper-local SEO-optimised pages
* **Blazing fast** — App Router, async params, optimised images
* **Responsive** — Works perfectly on mobile, tablet, and desktop
* **Editable content** — Easily add or change services, locations, and features in `lib/locations-data.ts`
* **Accessibility first** — Uses semantic HTML, high contrast, keyboard navigation
* **Conversion-focused** — Clear CTAs, pricing display, call buttons
* **Customer reviews** — Rotates authentic customer feedback by location/service
* **Google Maps integration** — Each page auto-embeds relevant location map

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone git@github.com:MellingWebStudios/mws4-bbr.git
cd mws4-bbr
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Start in Development

```bash
pnpm dev
```

* Local server: [http://localhost:3000](http://localhost:3000)

---

## 📦 Production Build

```bash
pnpm build
pnpm start
```

* Runs on port 3000 (override with `PORT=xxxx`)
* See `.env.example` for environment variable support

---

## ⚙️ How It Works

1. **SEO-first content structure:**
   Every service/location combo = unique, indexable landing page (great for Google).
2. **Dynamic routing:**
   Next.js async params for stability and speed in Next 15+.
3. **Easy management:**
   To add/edit a location or service, update the arrays in `lib/locations-data.ts` and redeploy.

---

## 🚢 Deployment

You can deploy this site to any modern Node.js host (Fly.io, Vercel, DigitalOcean, etc).
If you need help with DNS, environment setup, or CI/CD, let us know.

---

## 📂 Project Structure

```
├── app
│   ├── [location]
│   │   └── [service]
│   │       └── page.tsx      # Dynamic local/service page (async, SEO ready)
│   ├── about
│   ├── contact
│   ├── prices
│   └── page.tsx              # Home
├── components                # All shared UI elements
├── lib
│   └── locations-data.ts     # All editable data (locations, services, etc)
├── public                    # Static images, favicon, etc
├── styles                    # Tailwind & theme config
├── README.md                 # ← This file
└── ...
```

---

## ❓ FAQ

**Q: Can I add more locations/services?**
A: Yes! Just add them to `lib/locations-data.ts`—no code changes required.

**Q: Can you migrate this to another host?**
A: Absolutely. The code is 100% portable. Let us know your requirements.

**Q: How do I update images or content?**
A: Swap files in `/public/images` and update content in `locations-data.ts` or the markdown in `/app`.

---

## 🤝 Contact & Support

For support, tweaks, or upgrades, contact:

**Melling Web Studios**
🌐 [mws.getmytradeonline.co.uk](https://mws.getmytradeonline.co.uk) ### underdevelopment
✉️ [ashley@mellingwebstudios.com](mailto:ashley@mellingwebstudios.com)

---

<p align="center">
  <b>Thank you for trusting Melling Web Studios.<br>
  If you need ongoing care or more features, just let us know!</b>
</p>
