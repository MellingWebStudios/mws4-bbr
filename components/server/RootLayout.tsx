import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsentProvider } from "@/context/cookie-consent-context"
import UltraLightSchemaMarkup from "@/components/schema-markup-ultra-light"
import ChatbotButton from "@/components/chatbot-button"

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
      <ChatbotButton />
    </body>
  )
}
