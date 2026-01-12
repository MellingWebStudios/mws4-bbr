"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";

// Brand specialists with display names and icons (matches services in locations-data.ts)
const BRAND_SPECIALISTS = [
  { slug: "ferroli-specialists", name: "Ferroli", priority: true },
  { slug: "worcester-bosch-specialists", name: "Worcester Bosch", priority: true },
  { slug: "vaillant-specialists", name: "Vaillant", priority: true },
  { slug: "ideal-boilers-specialists", name: "Ideal Boilers", priority: true },
  { slug: "baxi-specialists", name: "Baxi", priority: true },
  { slug: "alpha-boiler-specialists", name: "Alpha", priority: false },
  { slug: "main-boiler-specialists", name: "Main", priority: false },
  { slug: "vokera-specialists", name: "Vokera", priority: false },
  { slug: "viessmann-specialists", name: "Viessmann", priority: false },
  { slug: "intergas-specialists", name: "Intergas", priority: false },
  { slug: "glowworm-specialists", name: "Glow-worm", priority: false },
  { slug: "atag-specialists", name: "ATAG", priority: false },
  { slug: "biasi-specialists", name: "Biasi", priority: false },
  { slug: "potterton-specialists", name: "Potterton", priority: false },
  { slug: "ariston-specialists", name: "Ariston", priority: false },
  { slug: "heatline-specialists", name: "Heatline", priority: false },
];

interface BrandSpecialistsLinksProps {
  locationSlug: string;
  locationName: string;
  showAll?: boolean;
  className?: string;
}

export default function BrandSpecialistsLinks({
  locationSlug,
  locationName,
  showAll = false,
  className = "",
}: BrandSpecialistsLinksProps) {
  // Show priority brands first, optionally show all
  const brandsToShow = showAll 
    ? BRAND_SPECIALISTS 
    : BRAND_SPECIALISTS.filter(b => b.priority).slice(0, 6);

  return (
    <div className={`${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Boiler Brand Specialists in {locationName}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Expert repairs and servicing for all major boiler brands
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {brandsToShow.map((brand) => (
          <Link
            key={brand.slug}
            href={`/${locationSlug}/${brand.slug}`}
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-200"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white text-center group-hover:text-primary transition-colors">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-6">
          <Link
            href={`/${locationSlug}/ferroli-specialists`}
            className="inline-flex items-center text-sm text-primary hover:underline font-medium"
          >
            View all brand specialists in {locationName} →
          </Link>
        </div>
      )}
    </div>
  );
}

// Export brand list for use elsewhere
export { BRAND_SPECIALISTS };
