import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, AlertTriangle, CheckCircle, Calendar, Shield, Heart, Wind, Wrench, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Carbon Monoxide FAQs | CO Alarm Guide Birmingham",
  description: "Essential guide to carbon monoxide alarms, safety requirements, and poisoning prevention. Expert advice from Gas Safe engineers.",
  keywords: "carbon monoxide alarm, CO detector, carbon monoxide poisoning, gas safety, CO alarm requirements",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/questions/carbon-monoxide",
  },
  openGraph: {
    title: "Carbon Monoxide FAQs | CO Alarm Guide Birmingham",
    description: "Essential guide to carbon monoxide alarms, safety requirements, and poisoning prevention.",
    url: "https://www.birminghamboilerrepairs.uk/questions/carbon-monoxide",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
  },
}

export default function CarbonMonoxideFAQPage() {
  const carbonMonoxideFaqs = [
    {
      question: "When was it compulsory to need a carbon monoxide alarm for a rented property?",
      answer: "1st October 2022. This is when the updated regulations came into effect requiring CO alarms in rental properties.",
      category: "legal",
      icon: <Calendar className="h-5 w-5" />,
      urgency: "high"
    },
    {
      question: "Where shall I install the CO alarm?",
      answer: "1-3 meters of a gas appliance (except cookers and hobs) at head height level where possible.",
      category: "installation",
      icon: <Home className="h-5 w-5" />,
      urgency: "high"
    },
    {
      question: "Can I be fined if I don't have a CO alarm?",
      answer: "Yes up to £5000. Local authorities can impose significant penalties for non-compliance.",
      category: "penalties",
      icon: <AlertTriangle className="h-5 w-5" />,
      urgency: "high"
    },
    {
      question: "Can a gas inspection (CP12) fail if there isn't a CO alarm?",
      answer: "Yes. However if you're having a gas inspection to sell your house you won't legally need one. As you aren't renting to tenants.",
      category: "inspection",
      icon: <CheckCircle className="h-5 w-5" />,
      urgency: "medium"
    },
    {
      question: "What if I can't see the expiry date?",
      answer: "Best practice is to assume it's expired and replace it immediately. Most CO alarms last 7-10 years.",
      category: "maintenance",
      icon: <Calendar className="h-5 w-5" />,
      urgency: "medium"
    },
    {
      question: "Can I put a CO alarm on top of my boiler?",
      answer: "No. It must be fitted at head height if possible. 1-3m away from the boiler on a shelf or fixed to a wall.",
      category: "installation",
      icon: <Home className="h-5 w-5" />,
      urgency: "medium"
    },
    {
      question: "Do I need a CO alarm if I'm a homeowner?",
      answer: "No law mandates CO alarms for homeowners. However it is recommended for safety.",
      category: "homeowners",
      icon: <Shield className="h-5 w-5" />,
      urgency: "low"
    },
    {
      question: "Do I need to fit a CO alarm if fitting or replacing a new boiler?",
      answer: "Yes for private homeowners and landlords. This would be fitted by the gas safe installer at the time of installation.",
      category: "installation",
      icon: <Wrench className="h-5 w-5" />,
      urgency: "high"
    },
    {
      question: "Who is responsible for the CO alarm and testing?",
      answer: "The landlord is responsible to ensure it's fitted and working correctly. The gas engineer will test this once a year along the gas inspection. The tenant should test the alarm at regular intervals, usually once a week and report any faults to the landlord.",
      category: "responsibility",
      icon: <Shield className="h-5 w-5" />,
      urgency: "medium"
    },
    {
      question: "Can I fit a CO alarm in the bathroom if the boiler is there?",
      answer: "This is a bit of a grey area. But technically no due to steam. But can be fitted close to the bathroom.",
      category: "installation",
      icon: <Home className="h-5 w-5" />,
      urgency: "medium"
    },
    {
      question: "Do I need a CO alarm for a gas cooker or a gas hob?",
      answer: "No. It's not a legal requirement, a CO alarm isn't required for them solely. If a boiler is in the same room then a CO alarm will be fitted more closely to the boiler.",
      category: "requirements",
      icon: <CheckCircle className="h-5 w-5" />,
      urgency: "low"
    },
    {
      question: "What do I do if my carbon monoxide alarm goes off?",
      answer: "Stay calm. Ventilate the property by opening doors or windows. If it's safe to do so turn the gas appliances off. Shut off the gas. Vacate the property. Contact a local gas safe engineer to find out the cause of why the alarm is going off. Get medical help if you are suffering from side effects of carbon monoxide poisoning.",
      category: "emergency",
      icon: <AlertTriangle className="h-5 w-5" />,
      urgency: "critical"
    },
    {
      question: "What is carbon monoxide?",
      answer: "Carbon monoxide is a colourless, tasteless, odourless, non-irritating gas produced as a by-product during incomplete combustion of fuels due to there being insufficient oxygen present. Complete combustion occurs when sufficient oxygen is present and leads to the production of carbon dioxide. Most combustion processes (natural or man-made) produce some carbon monoxide.",
      category: "education",
      icon: <Wind className="h-5 w-5" />,
      urgency: "low"
    },
    {
      question: "What are the side effects of carbon monoxide poisoning?",
      answer: "When breathed in, carbon monoxide enters the blood through the lungs and attaches to the body's oxygen carrier, haemoglobin. This reduces the amount of oxygen that can be carried round the body. A brief exposure to small amounts of carbon monoxide may cause headache, flushing, nausea, dizziness, vertigo, muscle pain or personality changes. Exposure to higher amounts may cause movement problems, weakness, confusion, lung and heart problems, loss of consciousness and death. Exposure to small amounts of carbon monoxide for a long time may lead to flu like symptoms with tiredness, headaches, nausea, dizziness, personality changes, memory problems, loss of vision and dementia. It can be hard to tell the difference between the effects of being exposed to carbon monoxide at low levels for a long time and other common illnesses.",
      category: "health",
      icon: <Heart className="h-5 w-5" />,
      urgency: "critical"
    },
    {
      question: "How can I prevent the possibility of carbon monoxide?",
      answer: "Fit a carbon monoxide alarm in any room with a gas appliance that burns fossil fuels. Regularly service your gas appliances. Check to see if the CO alarm works periodically (weekly) by pressing the button until the alarm sounds.",
      category: "prevention",
      icon: <Shield className="h-5 w-5" />,
      urgency: "high"
    }
  ]

  const categoryInfo = {
    legal: { label: "Legal Requirements", color: "bg-red-100 text-red-800" },
    installation: { label: "Installation", color: "bg-blue-100 text-blue-800" },
    penalties: { label: "Penalties", color: "bg-red-100 text-red-800" },
    inspection: { label: "Inspections", color: "bg-indigo-100 text-indigo-800" },
    maintenance: { label: "Maintenance", color: "bg-yellow-100 text-yellow-800" },
    homeowners: { label: "Homeowners", color: "bg-green-100 text-green-800" },
    responsibility: { label: "Responsibilities", color: "bg-purple-100 text-purple-800" },
    requirements: { label: "Requirements", color: "bg-teal-100 text-teal-800" },
    emergency: { label: "Emergency", color: "bg-red-100 text-red-800" },
    education: { label: "Education", color: "bg-gray-100 text-gray-800" },
    health: { label: "Health Effects", color: "bg-orange-100 text-orange-800" },
    prevention: { label: "Prevention", color: "bg-green-100 text-green-800" }
  }

  const urgencyColors = {
    critical: "border-l-4 border-red-500 bg-red-50",
    high: "border-l-4 border-orange-500 bg-orange-50",
    medium: "border-l-4 border-yellow-500 bg-yellow-50",
    low: "border-l-4 border-green-500 bg-green-50"
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <AlertTriangle className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Carbon Monoxide Questions</h1>
            <p className="mt-6 text-xl leading-relaxed">
              Critical safety information about carbon monoxide alarms, poisoning prevention, 
              and legal requirements. Protecting lives through education and compliance.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="carbon_monoxide_faq"
                  trackingSource="hero_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Emergency Gas Safety: 0800 320 2345"
                >
                  <Phone size={18} />
                  Emergency Gas Safety: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                CO Testing Included
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="bg-red-600 py-4 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-center">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-medium">
              <strong>EMERGENCY:</strong> If your CO alarm is sounding, evacuate immediately and call the Gas Emergency Service: 0800 111 999
            </p>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-6 md:grid-cols-4">
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-red-600" />
                <CardTitle className="text-red-900">Since Oct 2022</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-red-800">Mandatory in rental properties</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Home className="mx-auto h-8 w-8 text-blue-600" />
                <CardTitle className="text-blue-900">1-3 Meters</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-800">Distance from gas appliances</p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-yellow-600" />
                <CardTitle className="text-yellow-900">£5,000 Fine</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-yellow-800">Penalty for non-compliance</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <Heart className="mx-auto h-8 w-8 text-green-600" />
                <CardTitle className="text-green-900">Life Saving</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-green-800">Silent killer detection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Symptoms Alert */}
      <section className="bg-orange-50 py-8">
        <div className="container mx-auto px-4">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Heart className="h-5 w-5" />
                Recognize the Symptoms of Carbon Monoxide Poisoning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Early Symptoms:</h4>
                  <ul className="space-y-1 text-sm text-orange-700">
                    <li>• Headache and dizziness</li>
                    <li>• Nausea and vomiting</li>
                    <li>• Tiredness and confusion</li>
                    <li>• Stomach pain</li>
                    <li>• Shortness of breath</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Severe Symptoms:</h4>
                  <ul className="space-y-1 text-sm text-orange-700">
                    <li>• Difficulty breathing</li>
                    <li>• Chest pain</li>
                    <li>• Loss of consciousness</li>
                    <li>• Seizures</li>
                    <li>• Coma</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <p className="text-red-800 font-medium text-sm">
                  <strong>If you suspect CO poisoning:</strong> Get fresh air immediately, call 999, and seek medical attention. 
                  Tell them you suspect carbon monoxide poisoning.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Carbon Monoxide Questions & Answers</h2>
            <p className="mt-4 text-gray-600">
              Essential information for safety, compliance, and prevention
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-6">
            {carbonMonoxideFaqs.map((faq, index) => (
              <Card key={index} className={`border-none shadow-md hover:shadow-lg transition-shadow ${urgencyColors[faq.urgency as keyof typeof urgencyColors]}`}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      faq.urgency === 'critical' ? 'bg-red-200 text-red-600' :
                      faq.urgency === 'high' ? 'bg-orange-200 text-orange-600' :
                      faq.urgency === 'medium' ? 'bg-yellow-200 text-yellow-600' :
                      'bg-green-200 text-green-600'
                    }`}>
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{faq.question}</h3>
                        <Badge className={categoryInfo[faq.category as keyof typeof categoryInfo].color}>
                          {categoryInfo[faq.category as keyof typeof categoryInfo].label}
                        </Badge>
                        {faq.urgency === 'critical' && (
                          <Badge className="bg-red-100 text-red-800">CRITICAL</Badge>
                        )}
                      </div>
                      <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">CO Alarm Installation Guide</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Correct Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>1-3 meters from gas appliances (not cookers/hobs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Head height where possible (1.5-2 meters)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Wall-mounted or on a shelf</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Away from windows and doors (avoid drafts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Test weekly by pressing the test button</span>
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
                      <span>Directly on top of boilers or appliances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Bathrooms (due to steam and humidity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Near cookers or hobs (not required by law)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Confined spaces with poor air circulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Areas with excessive heat or vibration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Protect Your Family from Carbon Monoxide</h2>
            <p className="mt-4 text-xl">
              Our Gas Safe engineers test CO alarms and provide safety advice during every inspection
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="carbon_monoxide_faq"
                  trackingSource="bottom_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Book Safety Check: 0800 320 2345"
                >
                  <Phone size={18} />
                  Book Safety Check: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
                <Link href="/prices">
                  View Our Prices
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                CO alarm testing included
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Safety advice provided
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Emergency service available
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
                <Link href="/questions/smoke-alarms">Smoke Alarm Questions</Link>
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
