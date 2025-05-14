"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ConsentOptions = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentContextType {
  consentGiven: boolean
  consentOptions: ConsentOptions
  showBanner: boolean
  acceptAll: () => void
  declineAll: () => void
  savePreferences: (options: ConsentOptions) => void
  openPreferences: () => void
}

const defaultConsentOptions: ConsentOptions = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentGiven, setConsentGiven] = useState<boolean>(false)
  const [consentOptions, setConsentOptions] = useState<ConsentOptions>(defaultConsentOptions)
  const [showBanner, setShowBanner] = useState<boolean>(false)

  // Load consent state from localStorage on component mount
  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent")
    const storedOptions = localStorage.getItem("cookieConsentOptions")

    if (storedConsent === "true") {
      setConsentGiven(true)
      if (storedOptions) {
        try {
          setConsentOptions(JSON.parse(storedOptions))
        } catch (e) {
          console.error("Error parsing stored consent options:", e)
        }
      }
    } else {
      // Show banner if no consent has been given yet
      setShowBanner(true)
    }
  }, [])

  // Update Google Analytics based on consent
  useEffect(() => {
    if (typeof window !== "undefined") {
      // If analytics consent is given, initialize GA
      if (consentGiven && consentOptions.analytics) {
        // Enable Google Analytics
        window.gtag?.("consent", "update", {
          analytics_storage: "granted",
        })
      } else {
        // Disable Google Analytics
        window.gtag?.("consent", "update", {
          analytics_storage: "denied",
        })
      }
    }
  }, [consentGiven, consentOptions.analytics])

  const acceptAll = () => {
    const allOptions = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setConsentOptions(allOptions)
    setConsentGiven(true)
    setShowBanner(false)
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookieConsentOptions", JSON.stringify(allOptions))
  }

  const declineAll = () => {
    const minimalOptions = {
      necessary: true, // Always required
      analytics: false,
      marketing: false,
    }
    setConsentOptions(minimalOptions)
    setConsentGiven(true)
    setShowBanner(false)
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookieConsentOptions", JSON.stringify(minimalOptions))
  }

  const savePreferences = (options: ConsentOptions) => {
    const updatedOptions = {
      ...options,
      necessary: true, // Always required
    }
    setConsentOptions(updatedOptions)
    setConsentGiven(true)
    setShowBanner(false)
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookieConsentOptions", JSON.stringify(updatedOptions))
  }

  const openPreferences = () => {
    setShowBanner(true)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consentGiven,
        consentOptions,
        showBanner,
        acceptAll,
        declineAll,
        savePreferences,
        openPreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
