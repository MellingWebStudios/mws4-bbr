import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, AlertTriangle, CheckCircle, Calendar, Clock, FileText, Users, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Gas Safety FAQs | CP12 & Landlord Requirements",
  description: "Complete guide to gas safety inspections, legal requirements, and landlord responsibilities. Expert answers from Gas Safe engineers.",
  keywords: "gas safety inspection, CP12 certificate, landlord gas safety, gas inspection Birmingham, annual gas check",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/questions/gas-safety",
  },
  openGraph: {
    title: "Gas Safety FAQs | CP12 & Landlord Requirements",
    description: "Complete guide to gas safety inspections, legal requirements, and landlord responsibilities.",
    url: "https://www.birminghamboilerrepairs.uk/questions/gas-safety",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
  },
}

export default function GasSafetyFAQPage() {
  const gasSafetyFaqs = [
    {
      question: "When should a gas inspection be done?",
      answer: "Every 12 months. It can be done up to 2 months before its due date and still keep the original due date.",
      category: "timing",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      question: "Do I need to do another gas inspection if I have a new tenant moving in?",
      answer: "Yes, you will need a new gas safety check before a new tenant moves in, even if the previous check is still valid, according to the Health and Safety Executive. The law requires a gas safety check to be carried out annually, and a copy of the Landlord Gas Safety Record (LGSR) must be provided to new tenants at the start of their tenancy. (This is due to the likely event of previous tenants tampering with gas appliances and making them unsafe if they have been given a section 21)",
      category: "tenancy",
      icon: <Users className="h-5 w-5" />
    },
    {
      question: "Do I need to give the tenant a copy of the certificate?",
      answer: "Yes, you will need to send a copy of the certificate to the tenants within 28 days. If the tenant is new then this needs to be given before they move in. Advise this is done by email as you can prove that you have sent it, where you cannot prove you have left a paper copy, if it's thrown away.",
      category: "documentation",
      icon: <FileText className="h-5 w-5" />
    },
    {
      question: "Do I need to put the name of the landlord on the gas certificate?",
      answer: "Yes, this is very important in case you need to issue a section 21 to remove a tenant. The certificate may not be valid if the correct details are not on the landlord details ie property owner or the estate agent details.",
      category: "documentation",
      icon: <FileText className="h-5 w-5" />
    },
    {
      question: "I'm a homeowner. Do I need to do an annual gas inspection?",
      answer: "Homeowners do not legally need an annual gas safety check. However, if you are buying or selling a property it's advisable to get one done to prove the property is safe. A lot of estate agents and solicitors already ask for this and ask for proof if the boiler has been regularly serviced.",
      category: "homeowners",
      icon: <Shield className="h-5 w-5" />
    },
    {
      question: "What happens if a gas inspection is overdue?",
      answer: "If a gas safety inspection is overdue, a landlord could face significant legal and financial repercussions, including substantial fines, potential imprisonment, and even criminal charges in the event of an accident. Additionally, landlords may be unable to legally evict a tenant using a Section 21 notice.",
      category: "legal",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      question: "What happens if I can't get in to do a gas inspection?",
      answer: "If a tenant refuses or prevents a landlord from accessing a property for a mandatory gas safety inspection, the landlord must take reasonable steps to arrange the inspection and document all attempts. If these attempts fail, the landlord can pursue legal action, potentially including a court order for access or, in extreme cases, eviction. Give the tenant ample time to arrange a gas inspection. And document all attempts to arrange.",
      category: "access",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      question: "Is a gas inspection the same as having a boiler service?",
      answer: "No, a boiler service is different to an annual gas safety check – a yearly inspection of all gas appliances in a property. Gas safety checks are a legal requirement for landlords. A boiler service focuses solely on the boiler, and involves an engineer testing and cleaning certain components.",
      category: "service-difference",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      question: "Do I need to get the boiler serviced yearly as a landlord?",
      answer: "There is no lawful time frame for how often a boiler should be serviced. The law states that a landlord must ensure a boiler is safe and operates correctly in line with manufacturer standards. However if the boiler is new then it would need servicing to keep the warranty of the boiler which could be cost effective in the long run. If it isn't new then it's normally at the discretion of the engineer if he feels the boiler needs servicing if it's been poorly maintained in the past. Advise regular servicing but maybe not yearly to show proof as a landlord you are looking after your property.",
      category: "servicing",
      icon: <Clock className="h-5 w-5" />
    }
  ]

  const categoryInfo = {
    timing: { label: "Timing & Frequency", color: "bg-blue-100 text-blue-800" },
    tenancy: { label: "Tenant Changes", color: "bg-green-100 text-green-800" },
    documentation: { label: "Certificates & Records", color: "bg-purple-100 text-purple-800" },
    homeowners: { label: "Homeowners", color: "bg-orange-100 text-orange-800" },
    legal: { label: "Legal Requirements", color: "bg-red-100 text-red-800" },
    access: { label: "Property Access", color: "bg-yellow-100 text-yellow-800" },
    "service-difference": { label: "Service vs Inspection", color: "bg-indigo-100 text-indigo-800" },
    servicing: { label: "Boiler Servicing", color: "bg-teal-100 text-teal-800" }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary/80 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Gas Safety Questions</h1>
            <p className="mt-6 text-xl leading-relaxed">
              Everything you need to know about gas safety inspections, legal requirements, and landlord responsibilities. 
              Expert guidance from Gas Safe registered engineers.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="gas_safety_faq"
                  trackingSource="hero_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Book Gas Safety Inspection: 0800 320 2345"
                >
                  <Phone size={18} />
                  Book Inspection: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                Gas Safe Registered Engineers
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(categoryInfo).map(([key, info]) => (
              <Badge key={key} className={info.color}>
                {info.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Key Information Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-blue-600" />
                <CardTitle className="text-blue-900">Annual Requirement</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-800">Gas safety inspections must be carried out every 12 months for rental properties</p>
              </CardContent>
            </Card>
            
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-red-600" />
                <CardTitle className="text-red-900">Legal Penalties</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-red-800">Fines up to unlimited amounts and potential imprisonment for non-compliance</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                <CardTitle className="text-green-900">Our Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-green-800">Gas Safe registered engineers providing compliant CP12 certificates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Expert answers to the most common gas safety questions
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-8">
            {gasSafetyFaqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-secondary/10 p-2 text-secondary">
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                        <Badge className={categoryInfo[faq.category as keyof typeof categoryInfo].color}>
                          {categoryInfo[faq.category as keyof typeof categoryInfo].label}
                        </Badge>
                      </div>
                      <p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Important Additional Information</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    CP12 Certificate Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Must be completed by a Gas Safe registered engineer</li>
                    <li>• Valid for 12 months from date of issue</li>
                    <li>• Copy must be provided to tenants within 28 days</li>
                    <li>• New tenants must receive copy before moving in</li>
                    <li>• Landlord details must be correctly stated</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Common Compliance Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Expired certificates not renewed in time</li>
                    <li>• Incorrect landlord details on certificates</li>
                    <li>• Failure to provide copies to tenants</li>
                    <li>• Not conducting checks for new tenancies</li>
                    <li>• Poor record keeping and documentation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Need a Gas Safety Inspection?</h2>
            <p className="mt-4 text-xl">
              Our Gas Safe registered engineers provide compliant CP12 certificates with same-day service available
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="gas_safety_faq"
                  trackingSource="bottom_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Book Now: 0800 320 2345"
                >
                  <Phone size={18} />
                  Book Now: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                <Link href="/prices">
                  View Our Prices
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                No call-out fees
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Same-day service
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Gas Safe registered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Topics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Other Safety Questions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/questions/smoke-alarms">Smoke Alarm Questions</Link>
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
