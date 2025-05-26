'use client'

import Script from "next/script"

const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = "G-ET5987N3MJ"

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Optional: GDPR mode - default to denied until consent given
          gtag('consent', 'default', {
            'analytics_storage': 'granted'
          });
          
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
