"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { X, ChevronDown, ChevronUp, Info } from "lucide-react"

export default function CookieConsentBanner() {
  const { showBanner, acceptAll, declineAll, savePreferences, consentOptions } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [options, setOptions] = useState({
    necessary: consentOptions.necessary,
    analytics: consentOptions.analytics,
    marketing: consentOptions.marketing,
  })

  if (!showBanner) return null

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleOptionChange = (option: keyof typeof options) => {
    if (option === "necessary") return // Cannot change necessary cookies
    setOptions({
      ...options,
      [option]: !options[option],
    })
  }

  const handleSavePreferences = () => {
    savePreferences(options)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg dark:bg-gray-900 mb-2">
      <div className="container mx-auto p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h2 className="mb-2 text-lg font-bold">Cookie Consent</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
              traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <button
            onClick={() => declineAll()}
            className="mt-1 flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close cookie banner"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={toggleDetails}
            className="flex items-center text-sm font-medium text-secondary hover:underline"
          >
            {showDetails ? (
              <>
                <ChevronUp size={16} className="mr-1" /> Hide cookie details
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" /> Manage cookie preferences
              </>
            )}
          </button>
        </div>

        {showDetails && (
          <div className="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="necessary" checked disabled />
                <label
                  htmlFor="necessary"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Necessary Cookies
                </label>
              </div>
              <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">Required</div>
            </div>
            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
              These cookies are essential for the website to function properly and cannot be disabled.
            </p>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="analytics"
                  checked={options.analytics}
                  onCheckedChange={() => handleOptionChange("analytics")}
                />
                <label
                  htmlFor="analytics"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Analytics Cookies
                </label>
              </div>
            </div>
            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
              These cookies help us understand how visitors interact with our website, helping us improve our services.
            </p>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={options.marketing}
                  onCheckedChange={() => handleOptionChange("marketing")}
                />
                <label
                  htmlFor="marketing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marketing Cookies
                </label>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              These cookies are used to track visitors across websites to display relevant advertisements.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <Link href="/privacy-policy" className="text-secondary hover:underline">
              <Info size={14} className="mr-1 inline" />
              View our Privacy Policy
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => declineAll()}>
              Decline All
            </Button>
            {showDetails ? (
              <Button
                size="sm"
                onClick={handleSavePreferences}
                className="bg-secondary text-white hover:bg-secondary/90"
              >
                Save Preferences
              </Button>
            ) : (
              <Button size="sm" onClick={toggleDetails} variant="outline">
                Customize
              </Button>
            )}
            <Button size="sm" onClick={() => acceptAll()} className="bg-secondary text-white hover:bg-secondary/90">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
