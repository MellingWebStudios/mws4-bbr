"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Shield, Facebook, Instagram } from "lucide-react"
import GasSafeBadge from "@/components/gas-safe-badge"
import { useCookieConsent } from "@/context/cookie-consent-context"
import businessInfo from "@/lib/business-info"
import TrackedPhoneLink from "@/components/tracked-phone-link"

const Footer = () => {
  const { openPreferences } = useCookieConsent()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              <span className="text-secondary">{businessInfo.name.split(" ")[0]}</span> <span className="text-red-700">{businessInfo.name.split(" ").slice(1).join(" ")}</span>
            </h3>
            <div className="mb-4">
              <GasSafeBadge variant="footer" />
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              Family-run boiler repair and servicing company established in 2010.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/boiler-repairs"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Boiler Repairs
                </Link>
              </li>
              <li>
                <Link
                  href="/services/boiler-servicing"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Boiler Servicing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/gas-safety"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Gas Safety Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ferroli-specialists"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Ferroli Specialists
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-secondary font-medium transition-colors hover:text-secondary/80"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Blog Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/category/boiler-repair"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Boiler Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/heating-systems"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Heating Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/maintenance"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/category/emergency-services"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-secondary font-medium transition-colors hover:text-secondary/80"
                >
                  View All Posts →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/prices"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link
                href={businessInfo.socialMedia.facebook}
                aria-label="Facebook"
                className="bg-secondary hover:bg-primary text-white rounded-full p-2 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href={businessInfo.socialMedia.instagram}
                aria-label="Instagram"
                className="bg-secondary hover:bg-primary text-white rounded-full p-2 transition-colors"
              >
                <Instagram className="h-6 w-6" />
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
                  <TrackedPhoneLink
                    phone={businessInfo.phone.freephone}
                    trackingLocation="footer"
                    trackingSource="contact_section_freephone"
                    className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                    ariaLabel="Call Freephone"
                  >
                    {businessInfo.phone.freephone}
                  </TrackedPhoneLink>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Mobile</p>
                  <TrackedPhoneLink
                    phone={businessInfo.phone.mobile}
                    trackingLocation="footer"
                    trackingSource="contact_section_mobile"
                    className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                    ariaLabel="Call Mobile"
                  >
                    {businessInfo.phone.mobile}
                  </TrackedPhoneLink>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-secondary" />
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                  aria-label="Email"
                >
                  {businessInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-secondary" />
                <p className="text-sm text-gray-800 dark:text-gray-300">
                  {businessInfo.address.street}, {businessInfo.address.locality}, {businessInfo.address.region} {businessInfo.address.postalCode}
                </p>
              </li>
              <li className="flex items-start">
                <Shield className="mr-2 h-5 w-5 text-secondary" />
                <p className="text-sm text-gray-800 dark:text-gray-300">
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
              <p className="text-sm text-gray-800 dark:text-gray-300">
                © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Privacy Policy
                </Link>
                <button
                  onClick={openPreferences}
                  className="text-sm text-gray-800 transition-colors hover:text-secondary dark:text-gray-300"
                >
                  Cookie Settings
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="mr-1 h-4 w-4 text-secondary" />
              <p className="text-sm text-gray-800 dark:text-gray-300">
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
