import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"
import { locations } from "@/lib/locations-data"
import { businessInfo } from "@/lib/business-info"
import { ServiceLinksGrid } from "@/components/internal-links"
import { SmartContentLinks } from "@/components/contextual-links"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Areas We Cover | Birmingham Boiler Repairs - Service Locations",
  description: 
    "Birmingham Boiler Repairs covers over 130+ areas across Birmingham and the West Midlands. Find your local boiler repair service with Gas Safe registered engineers.",
  keywords: "Birmingham boiler repairs areas, West Midlands boiler service, local boiler repair, gas safe engineers Birmingham, boiler service locations",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/locations",
  },
}

export default function AreasWeCoverPage() {
  // Group locations alphabetically
  const groupedLocations = locations.reduce((acc, location) => {
    const firstLetter = location.name.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(location)
    return acc
  }, {} as Record<string, typeof locations>)

  // Sort each group alphabetically
  Object.keys(groupedLocations).forEach(letter => {
    groupedLocations[letter].sort((a, b) => a.name.localeCompare(b.name))
  })

  const sortedLetters = Object.keys(groupedLocations).sort()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Areas We Cover
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Professional boiler repair and servicing across Birmingham and the West Midlands
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href={`tel:${businessInfo.phone.freephone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {businessInfo.phone.freephone}
                </Link>
              </Button>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                Mon-Fri 9AM-5PM | Emergency Call-outs Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-6">
              Comprehensive Boiler Services Across {locations.length}+ Locations
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Wide Coverage Area</h3>
                  <p className="text-gray-600">
                    Serving Birmingham and surrounding areas with fast response times
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Emergency Call-outs</h3>
                  <p className="text-gray-600">
                    Emergency boiler repair service available during business hours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Same Day Service</h3>
                  <p className="text-gray-600">
                    Most repairs completed on the same day
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Services Available in All Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                The same professional boiler services are available across all our coverage areas
              </p>
            </div>
            
            <ServiceLinksGrid variant="grid" className="mb-8" />
            
            <SmartContentLinks 
              content="boiler repairs heating services birmingham west midlands gas safe engineers local boiler service"
              className="mt-8"
            />
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Service Areas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click on any area below to learn more about our boiler repair services in your location.
                All our engineers are Gas Safe registered and fully insured.
              </p>
            </div>

            {/* Alphabetical Navigation */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {sortedLetters.map(letter => (
                <Button
                  key={letter}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0"
                >
                  <a href={`#section-${letter}`}>
                    {letter}
                  </a>
                </Button>
              ))}
            </div>

            {/* Location Groups */}
            <div className="space-y-12">
              {sortedLetters.map(letter => (
                <div key={letter} id={`section-${letter}`}>
                  <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2">
                    {letter}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {groupedLocations[letter].map(location => (
                      <Card key={location.slug} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-lg">{location.name}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {location.postcode}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {location.blurb}
                          </p>
                          {location.landmarks.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1">Near:</p>
                              <p className="text-xs text-gray-600">
                                {location.landmarks.slice(0, 2).join(", ")}
                                {location.landmarks.length > 2 && "..."}
                              </p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button asChild size="sm" className="flex-1">
                              <Link href={`/${location.slug}`}>
                                View Services
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`tel:${businessInfo.phone.freephone}`}>
                                Call Now
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold">Don't See Your Area Listed?</h2>
              <p className="mt-2 text-lg">We may still be able to help! Contact us to check if we can provide services in your location.</p>
            </div>
            <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
              <Link href={`tel:${businessInfo.phone.freephone}`} className="flex items-center gap-2" aria-label={`Call Now: ${businessInfo.phone.freephone}`}>
                <Phone size={18} />
                Call Now: {businessInfo.phone.freephone}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
