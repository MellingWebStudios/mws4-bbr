import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, AlertTriangle, CheckCircle, Calendar, Clock, Shield, Home, Battery } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Smoke Alarm Questions & Answers | Birmingham Boiler Repairs",
  description: "Complete guide to smoke alarm requirements for rental properties, installation guidelines, and landlord responsibilities.",
  keywords: "smoke alarm requirements, rental property smoke detectors, landlord responsibilities, smoke alarm installation",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/questions/smoke-alarms",
  },
  openGraph: {
    title: "Smoke Alarm Questions & Answers | Birmingham Boiler Repairs",
    description: "Complete guide to smoke alarm requirements for rental properties and landlord responsibilities.",
    url: "https://www.birminghamboilerrepairs.uk/questions/smoke-alarms",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
  },
}

export default function SmokeAlarmsFAQPage() {
  const smokeAlarmFaqs = [
    {
      question: "When was it compulsory to need a smoke alarm for rented properties?",
      answer: "October 1st, 2015. This is when the legal requirement came into effect for all rental properties in England.",
      category: "legal",
      icon: <Calendar className="h-5 w-5" />,
      expanded: "The Smoke and Carbon Monoxide Alarm (England) Regulations 2015 came into force on 1st October 2015. These regulations require private sector landlords to install at least one smoke alarm on every storey of their property and to test the alarm is working at the start of each new tenancy."
    },
    {
      question: "Where should smoke alarms be fitted?",
      answer: "They should be fitted on each floor like a hallway or the landing in a well-ventilated space, at least 30 cm away from a wall or a light fitting.",
      category: "installation",
      icon: <Home className="h-5 w-5" />,
      expanded: "Smoke alarms should be positioned in circulation spaces between bedrooms and living areas, such as hallways and landings. Avoid fitting them in kitchens, bathrooms, or areas prone to steam and condensation. The alarm should be ceiling-mounted where possible, at least 30cm from walls, light fittings, or decorative objects that might obstruct smoke detection."
    },
    {
      question: "Whose responsibility is it for a smoke alarm?",
      answer: "It is the landlord's responsibility to ensure a smoke alarm is fitted correctly and is in date.",
      category: "responsibility",
      icon: <Shield className="h-5 w-5" />,
      expanded: "Landlords are legally responsible for ensuring smoke alarms are properly installed, working, and within their expiry date. This includes initial installation, replacement when expired, and ensuring they're tested at the start of each tenancy. The landlord must also ensure alarms meet British Standard EN 14604."
    },
    {
      question: "Whose responsibility is it for the maintenance of my smoke alarm?",
      answer: "It is a landlord's responsibility to replace and maintain the smoke alarm via yearly checks and a gas engineer will test them on the annual gas inspection. Note it is the tenant's responsibility to ensure the smoke alarm works also by testing it at regular intervals (weekly) and if it's not working to report it to the landlord. If a battery needs replacing then the tenant can also replace the battery.",
      category: "maintenance",
      icon: <Battery className="h-5 w-5" />,
      expanded: "Maintenance is a shared responsibility. Landlords must ensure alarms are properly maintained and replaced when necessary. Tenants should test alarms weekly and report any faults immediately. For battery-operated alarms, tenants can replace batteries, but landlords should provide clear instructions and ensure batteries are available."
    },
    {
      question: "What if the smoke alarm doesn't appear to have an expiry day or date of installation?",
      answer: "You have to be vigilant and assume that the smoke alarm is out of date and replace it.",
      category: "compliance",
      icon: <AlertTriangle className="h-5 w-5" />,
      expanded: "Smoke alarms typically last 10 years. If there's no visible expiry date or installation date, it's safest to assume the alarm is expired and replace it immediately. Modern alarms have clear expiry dates printed on them. Keeping records of installation dates is crucial for compliance and safety."
    },
    {
      question: "Can a gas inspection (CP12) fail if I haven't got a smoke alarm?",
      answer: "Yes it will fail. It is part of the test on a gas inspection. If it's not working or is missing. Then it is a failed inspection. However if you are doing a gas inspection to sell your property then you don't legally need one as you aren't renting to tenants.",
      category: "inspection",
      icon: <CheckCircle className="h-5 w-5" />,
      expanded: "Gas Safe engineers are required to check smoke alarm functionality as part of the annual gas safety inspection for rental properties. Missing, faulty, or expired smoke alarms will result in a failed inspection. This is because smoke alarms are considered essential safety equipment in rental properties."
    },
    {
      question: "Can I as a landlord be fined for failure to supply a smoke alarm?",
      answer: "Yes, up to £5,000 per property. Local authorities can impose civil penalties for non-compliance.",
      category: "penalties",
      icon: <AlertTriangle className="h-5 w-5" />,
      expanded: "Local housing authorities can issue civil penalty notices of up to £5,000 for each property where smoke alarm requirements are not met. Repeat offenders may face higher penalties. In serious cases, landlords could also face prosecution under the Housing Act 2004."
    }
  ]

  const categoryInfo = {
    legal: { label: "Legal Requirements", color: "bg-red-100 text-red-800" },
    installation: { label: "Installation", color: "bg-blue-100 text-blue-800" },
    responsibility: { label: "Responsibilities", color: "bg-green-100 text-green-800" },
    maintenance: { label: "Maintenance", color: "bg-yellow-100 text-yellow-800" },
    compliance: { label: "Compliance", color: "bg-purple-100 text-purple-800" },
    inspection: { label: "Inspections", color: "bg-indigo-100 text-indigo-800" },
    penalties: { label: "Penalties", color: "bg-red-100 text-red-800" }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Smoke Alarm Questions</h1>
            <p className="mt-6 text-xl leading-relaxed">
              Essential guidance on smoke alarm requirements for rental properties, legal obligations, 
              and best practices for landlords and tenants.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="smoke_alarms_faq"
                  trackingSource="hero_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Book Gas Safety Check: 0800 320 2345"
                >
                  <Phone size={18} />
                  Book Gas Safety Check: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                Smoke Alarm Testing Included
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-red-600" />
                <CardTitle className="text-red-900">Since October 2015</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-red-800">Mandatory for all rental properties in England</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Home className="mx-auto h-8 w-8 text-blue-600" />
                <CardTitle className="text-blue-900">Every Floor</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-800">At least one working smoke alarm on each storey</p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-yellow-600" />
                <CardTitle className="text-yellow-900">£5,000 Fine</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-800">Maximum penalty for non-compliance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Smoke Alarm Questions & Answers</h2>
            <p className="mt-4 text-gray-600">
              Everything you need to know about smoke alarm requirements and compliance
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            {smokeAlarmFaqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-2 text-red-600">
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{faq.question}</h3>
                        <Badge className={categoryInfo[faq.category as keyof typeof categoryInfo].color}>
                          {categoryInfo[faq.category as keyof typeof categoryInfo].label}
                        </Badge>
                      </div>
                      <p className="mb-4 leading-relaxed text-gray-600">{faq.answer}</p>
                      {faq.expanded && (
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h4 className="mb-2 font-semibold text-gray-900">Additional Information:</h4>
                          <p className="text-sm text-gray-600">{faq.expanded}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Smoke Alarm Installation Guide</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Install on ceiling in circulation areas (hallways, landings)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Position at least 30cm away from walls and light fittings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Choose mains-powered alarms with battery backup where possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Ensure alarms meet British Standard EN 14604</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Test alarms before each new tenancy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Avoid These Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Kitchens (cooking fumes can cause false alarms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Bathrooms (steam can trigger false alarms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Near boilers or other heat sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Dead air spaces (corners, peaks of roofs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Areas with poor ventilation or high humidity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Ensure Your Property Complies</h2>
            <p className="mt-4 text-xl">
              Our Gas Safe engineers test smoke alarms during every gas safety inspection
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="smoke_alarms_faq"
                  trackingSource="bottom_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Book Inspection: 0800 320 2345"
                >
                  <Phone size={18} />
                  Book Inspection: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link href="/prices">
                  View Our Prices
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Smoke alarm testing included
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Compliance advice given
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Same-day service available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Topics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Other Safety Questions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/questions/gas-safety">Gas Safety Questions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/questions/carbon-monoxide">Carbon Monoxide Questions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/questions">All Questions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
