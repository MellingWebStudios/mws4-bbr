"use client"

import Script from "next/script"

const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // Replace with actual GA measurement ID

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Default to denied until consent is given
          gtag('consent', 'default', {
            'analytics_storage': 'denied'
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
