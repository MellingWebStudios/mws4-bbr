import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Birmingham Boiler Repairs",
  description:
    "Our privacy policy explains how we collect, use, and protect your personal information when you use our website and services.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 12, 2025"

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
            <p className="mt-4 text-lg">How we collect, use, and protect your information</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <h2>Introduction</h2>
              <p>
                Birmingham Boiler Repairs ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
                <Link href="/">www.birminghamboilerrepairs.com</Link> (the "Website") or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                please do not access the Website.
              </p>

              <h2>Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>

              <h3>Personal Data</h3>
              <p>
                When you use our Website, we may collect personally identifiable information, such as your name, email
                address, postal address, and telephone number, that you voluntarily give to us when you:
              </p>
              <ul>
                <li>Fill out a form on our Website</li>
                <li>Contact us via our contact form, email, or phone</li>
                <li>Request a quote or book a service</li>
                <li>Subscribe to our newsletter</li>
              </ul>

              <h3>Derivative Data</h3>
              <p>
                Our servers automatically collect information when you access the Website, such as your IP address,
                browser type, operating system, access times, and the pages you have viewed directly before and after
                accessing the Website. This information is not linked to personally identifiable information.
              </p>

              <h3>Cookies and Tracking Technologies</h3>
              <p>
                We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Website to help
                customize the Website and improve your experience. For more information on how we use cookies, please
                refer to our Cookie Policy section below.
              </p>

              <h2>Use of Your Information</h2>
              <p>We may use the information we collect about you for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our Website and services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>
                  Communicate with you about products, services, offers, promotions, and events, and provide news and
                  information we think will be of interest to you
                </li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Website</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your Website experience</li>
              </ul>

              <h2>Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be
                disclosed as follows:
              </p>

              <h3>By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary to respond to legal process, to
                investigate or remedy potential violations of our policies, or to protect the rights, property, and
                safety of others, we may share your information as permitted or required by any applicable law, rule, or
                regulation.
              </p>

              <h3>Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform services for us or on our behalf,
                including payment processing, data analysis, email delivery, hosting services, customer service, and
                marketing assistance.
              </p>

              <h3>Marketing Communications</h3>
              <p>
                With your consent, or with an opportunity for you to withdraw consent, we may share your information
                with third parties for marketing purposes.
              </p>

              <h3>Business Transfers</h3>
              <p>
                If we or our assets are acquired by another company, that company would receive your information. We
                will notify you before your personal information is transferred and becomes subject to a different
                privacy policy.
              </p>

              <h2>Google Analytics 4</h2>
              <p>
                We use Google Analytics 4 (GA4) to analyze how visitors use our Website. GA4 collects information such
                as:
              </p>
              <ul>
                <li>Pages visited and time spent on the Website</li>
                <li>Traffic sources that referred the visit</li>
                <li>
                  Technical information about the device used (type of device, operating system, screen resolution)
                </li>
                <li>Approximate geographical location (country and city)</li>
              </ul>
              <p>
                GA4 uses first-party cookies to track visitor interactions. These cookies store information anonymously
                and assign a randomly generated number to identify unique visitors. We use this information to improve
                our Website and services.
              </p>
              <p>
                You can opt-out of Google Analytics tracking by using the Google Analytics Opt-Out Browser Add-on
                available at{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
                .
              </p>

              <h2>Cookie Policy</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                They allow the website to recognize your device and remember if you've been to the website before.
              </p>

              <h3>Types of Cookies We Use</h3>
              <p>We use the following types of cookies on our Website:</p>
              <ul>
                <li>
                  <strong>Necessary Cookies:</strong> These cookies are essential for the Website to function properly.
                  They enable core functionality such as security, network management, and account access. You may not
                  opt-out of necessary cookies.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our
                  Website by collecting and reporting information anonymously. This helps us improve our Website and
                  services.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. The
                  intention is to display ads that are relevant and engaging for the individual user.
                </li>
              </ul>

              <h3>Managing Cookies</h3>
              <p>
                You can manage your cookie preferences through our cookie consent banner or by adjusting your browser
                settings. Most web browsers allow some control of most cookies through the browser settings. To find out
                more about cookies, including how to see what cookies have been set, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>

              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the contact information provided at the end of
                this Privacy Policy.
              </p>

              <h2>Data Retention</h2>
              <p>
                We will retain your personal information only for as long as is necessary for the purposes set out in
                this Privacy Policy. We will retain and use your information to the extent necessary to comply with our
                legal obligations, resolve disputes, and enforce our policies.
              </p>

              <h2>Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal
                information. While we have taken reasonable steps to secure the personal information you provide to us,
                please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our Website is not intended for children under 16 years of age. We do not knowingly collect personal
                information from children under 16. If you are under 16, do not use or provide any information on this
                Website.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are
                advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2>Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <address>
                Birmingham Boiler Repairs
                <br />
                18 Camino Rd
                <br />
                Birmingham B32 3XE
                <br />
                Email:{" "}
                <a href="mailto:boilers.birmingham@yahoo.com" className="text-secondary hover:underline">
                  boilers.birmingham@yahoo.com
                </a>
                <br />
                Phone:{" "}
                <a href="tel:08003202345" className="text-secondary hover:underline">
                  0800 320 2345
                </a>
              </address>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
