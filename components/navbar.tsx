"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import RatingBadge from "@/components/rating-badge"
import ReviewsModal from "@/components/reviews-modal"
import businessInfo from "@/lib/business-info"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)

    // Prevent body scrolling when menu is open
    if (typeof document !== "undefined") {
      document.body.style.overflow = newState ? "hidden" : ""
    }
  }

  const closeMenu = () => {
    setIsOpen(false)

    // Re-enable body scrolling
    if (typeof document !== "undefined") {
      document.body.style.overflow = ""
    }
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/prices", label: "Prices" },
  ]

  useEffect(() => {
    return () => {
      // Clean up body style when component unmounts
      if (typeof document !== "undefined") {
        document.body.style.overflow = ""
      }
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900",
        )}
      >
        <div className="container mx-auto px-4 md:py-4">
          <div className="flex items-center justify-between h-14 md:h-auto">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10 md:h-14 md:w-14">
                <Image
                  src="/images/boiler-mascot-logo.png"
                  alt={`${businessInfo.name} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
                  <span className="text-secondary">Birmingham</span> <br className="md:hidden" />
                  <span className="text-red-600">Boiler Repairs</span>
                </h1>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <span className="mr-2">Gas Safe: {businessInfo.gasSafeNumber}</span>
                  <RatingBadge variant="compact" onClick={() => setReviewsModalOpen(true)} />
                </div>
              </div>
              {/* Mobile compact title */}
              <div className="md:hidden">
                <h1 className="text-sm font-bold text-gray-900 dark:text-white">
                  <span className="text-secondary">Birmingham</span> <span className="text-red-600">Boiler</span>
                </h1>
              </div>
            </Link>

            {/* Rating badge - visible on all screens */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2 md:top-4">
              <RatingBadge onClick={() => setReviewsModalOpen(true)} />
            </div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              <nav className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-secondary",
                      pathname === link.href ? "text-secondary" : "text-gray-700 dark:text-gray-200",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col items-end">
                <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                  <Link href="tel:08003202345" className="flex items-center gap-2">
                    <Phone size={16} />
                    <span className="hidden lg:inline">0800 320 2345</span>
                    <span className="lg:hidden">Call Now</span>
                  </Link>
                </Button>
                <span className="mt-1 text-xs text-gray-500">Same-day service when booked before 12pm</span>
              </div>
            </div>

            <div className="flex md:hidden">
              <Button asChild variant="outline" size="icon" className="mr-2 border-red-600 text-red-600">
                <Link href="tel:08003202345">
                  <Phone size={20} />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="flex items-center gap-1 text-xs font-medium"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
                MENU
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Semi-transparent backdrop */}
            <div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            ></div>

            {/* Menu panel */}
            <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-4 shadow-xl dark:bg-gray-900 transform transition-transform duration-200 ease-in-out">
              <div className="flex items-center justify-between mb-8 pt-2">
                <div className="flex items-center">
                  <div className="relative h-8 w-8">
                    <Image
                      src="/images/boiler-mascot-logo.png"
                      alt="Birmingham Boiler Repairs Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="ml-2 text-sm font-bold">Birmingham Boiler</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="text-gray-500"
                >
                  <X size={24} />
                </Button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors",
                      pathname === link.href
                        ? "text-secondary border-l-4 border-secondary pl-3"
                        : "text-gray-700 dark:text-gray-200 hover:text-secondary pl-4",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button asChild className="w-full bg-red-600 text-white hover:bg-red-700">
                    <Link href="tel:08003202345" className="flex items-center justify-center gap-2" onClick={closeMenu}>
                      <Phone size={16} />
                      <span>0800 320 2345</span>
                    </Link>
                  </Button>
                  <p className="mt-2 text-center text-xs text-gray-500">Same-day service when booked before 12pm</p>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Reviews Modal */}
      <ReviewsModal open={reviewsModalOpen} onOpenChange={setReviewsModalOpen} />
    </>
  )
}

export default Navbar
