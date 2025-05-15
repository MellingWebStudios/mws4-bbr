import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"
import type { Metadata } from "next"
import LocalServiceAreas from "@/components/local-service-areas"

export const metadata: Metadata = {
  title: "Contact Birmingham Boiler Repairs | Book a Boiler Service or Repair",
  description:
    "Contact our Gas Safe registered engineers for boiler repairs, servicing, and gas safety inspections in Birmingham. Same-day service available.",
  keywords: "contact boiler repairs Birmingham, book boiler service, gas engineer contact, emergency boiler repair",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg">Get in touch for boiler repairs, servicing, and gas safety inspections</p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Get In Touch</h2>
              <div className="space-y-6">
                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Phone className="h-6 w-6 text-secondary" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Freephone:{" "}
                        <a
                          href="tel:08003202345"
                          className="text-secondary hover:underline"
                          aria-label="Call Freephone"
                        >
                          0800 320 2345
                        </a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Mobile:{" "}
                        <a
                          href="tel:07807776411"
                          className="text-secondary hover:underline"
                          aria-label="Call Mobile"
                        >
                          07807 776 411
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Mail className="h-6 w-6 text-secondary" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        <a
                          href="mailto:boilers.birmingham@yahoo.com"
                          className="text-secondary hover:underline"
                          aria-label="Email"
                        >
                          boilers.birmingham@yahoo.com
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <MapPin className="h-6 w-6 text-secondary" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        18 Camino Road, Birmingham, West Midlands B32 3XE
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Clock className="h-6 w-6 text-secondary" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Opening Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 - 17:00</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Need Urgent Help?</h3>
                <Button asChild size="lg" className="w-full bg-primary text-gray-900 hover:bg-primary/90">
                  <a
                    href="tel:08003202345"
                    className="flex items-center justify-center gap-2"
                    aria-label="Call Now: 0800 320 2345"
                  >
                    <Phone size={18} />
                    Call Now: 0800 320 2345
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Find Us</h2>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.5585454696166!2d-1.9651!3d52.4584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc8e7d8d4e49%3A0x7f3c3a3e7c3d3e3e!2sBirmingham%2C%20UK!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Birmingham Boiler Repairs Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Cover Section */}
      <LocalServiceAreas />

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Ready to book a service?</h2>
              <p className="mt-2 text-lg">Contact us today for fast, reliable service</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
              <a
                href="tel:08003202345"
                className="flex items-center gap-2"
                aria-label="Call Now: 0800 320 2345"
              >
                <Phone size={18} />
                Call Now: 0800 320 2345
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
