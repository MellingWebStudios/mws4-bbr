"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Shield, Facebook, Instagram, Youtube } from "lucide-react"
import GasSafeBadge from "@/components/gas-safe-badge"
import { useCookieConsent } from "@/context/cookie-consent-context"

const Footer = () => {
  const { openPreferences } = useCookieConsent()

  // NAP information - centralized for consistency
  const businessInfo = {
    name: "Birmingham Boiler Repairs",
    address: {
      street: "18 Camino Road",
      locality: "Birmingham",
      region: "West Midlands",
      postalCode: "B32 3XE",
      country: "United Kingdom",
    },
    phone: {
      freephone: "0800 320 2345",
      mobile: "07807 776 411",
    },
    email: "boilers.birmingham@yahoo.com",
    gasSafeNumber: "520077",
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              <span className="text-secondary">Birmingham</span> <span className="text-red-600">Boiler Repairs</span>
            </h3>
            <div className="mb-4">
              <GasSafeBadge variant="footer" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Family-run boiler repair and servicing company established in 2010.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/prices"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://www.facebook.com/BirminghamBoilerRepairs/"
                aria-label="Facebook"
                className="bg-secondary hover:bg-primary text-white rounded-full p-2 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/birmingham_boiler_repairs/?hl=en-gb"
                aria-label="Instagram"
                className="bg-secondary hover:bg-primary text-white rounded-full p-2 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/@theferroliman2067"
                aria-label="YouTube"
                className="bg-secondary hover:bg-primary text-white rounded-full p-2 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Freephone</p>
                  <a
                    href={`tel:${businessInfo.phone.freephone.replace(/\s/g, "")}`}
                    className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                    aria-label="Call Freephone"
                  >
                    {businessInfo.phone.freephone}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Mobile</p>
                  <a
                    href={`tel:${businessInfo.phone.mobile.replace(/\s/g, "")}`}
                    className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                    aria-label="Call Mobile"
                  >
                    {businessInfo.phone.mobile}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-secondary" />
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                  aria-label="Email"
                >
                  {businessInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-secondary" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {businessInfo.address.street}, {businessInfo.address.locality}, {businessInfo.address.region}{" "}
                  {businessInfo.address.postalCode}
                </p>
              </li>
              <li className="flex items-start">
                <Shield className="mr-2 h-5 w-5 text-secondary" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gas Safe Registered: {businessInfo.gasSafeNumber}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-secondary" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 - 17:00</p>
              </li>
              <li className="mt-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Areas We Cover</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Birmingham, Bromsgrove, Redditch, Dudley, Stourbridge, Kingswinford, Wolverhampton, Alvechurch,
                  Halesowen, West Bromwich & surrounds.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-wrap gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Privacy Policy
                </Link>
                <button
                  onClick={openPreferences}
                  className="text-sm text-gray-600 transition-colors hover:text-secondary dark:text-gray-400"
                >
                  Cookie Settings
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="mr-1 h-4 w-4 text-secondary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Website by{" "}
                <a
                  href="https://mellingwebstudios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  Melling Web Studios
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
