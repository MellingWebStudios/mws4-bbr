import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsentProvider } from "@/context/cookie-consent-context"
import SchemaMarkup from "@/components/schema-markup"

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
          <SchemaMarkup />
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </CookieConsentProvider>
      </ThemeProvider>
    </body>
  )
}
