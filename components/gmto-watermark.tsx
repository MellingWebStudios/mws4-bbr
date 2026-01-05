"use client";

import { useState, useEffect } from 'react';

/**
 * GMTO Watermark Component
 * 
 * This is a hardcoded, non-configurable watermark that appears on all sites
 * to credit GetMyTradeOnline.co.uk as the platform provider.
 * 
 * This component cannot be modified by tenant configurations.
 * 
 * Location: /platform/shared/ - Available to all industries and platforms
 * 
 * SEO Note: Uses a real <a> tag (not button + window.open) to ensure
 * Google can crawl the link and GMTO receives proper link attribution.
 * This follows the same platform credit pattern used by Shopify, Webflow, etc.
 */

export default function GMTOWatermark() {
  const [isAlternateTextVisible, setIsAlternateTextVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAlternateTextVisible(prev => !prev);
    }, 3000); // Toggles every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="bg-blue-950/95 backdrop-blur-sm border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <a
          href="https://getmytradeonline.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full flex items-center justify-center transition-all duration-300"
        >
          <div className="relative flex items-center h-6 overflow-hidden">
            <span 
              className={`transition-transform duration-500 ease-in-out ${isAlternateTextVisible ? '-translate-y-full' : 'translate-y-0'}`}
            >
              <span className="flex items-center gap-2 text-sm text-gray-400">
                Powered by <span className="font-semibold text-gray-200">GMTO</span>
              </span>
            </span>
            <span 
              className={`absolute transition-transform duration-500 ease-in-out ${isAlternateTextVisible ? 'translate-y-0' : 'translate-y-full'}`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-orange-400">
                GetMyTradeOnline.co.uk
              </span>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
