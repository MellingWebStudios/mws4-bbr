import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsentProvider } from "@/context/cookie-consent-context"
import UltraLightSchemaMarkup from "@/components/schema-markup-ultra-light"

export default function RootLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <body className={className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CookieConsentProvider>
          <UltraLightSchemaMarkup />
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </CookieConsentProvider>
      </ThemeProvider>
      {/* The chatbot used to mount here eagerly AND lazily from the client
          shell — two copies, and the eager one defeated the deferral it was
          supposed to have. It now loads once, from DeferredExtras. */}
    </body>
  )
}
