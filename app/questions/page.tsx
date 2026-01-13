import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Shield, AlertTriangle, Home, CheckCircle, ArrowRight, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Gas Safety & Home Safety Questions | Birmingham Boiler Repairs",
  description: "Comprehensive guide to gas safety, smoke alarms, and carbon monoxide requirements. Expert answers from Gas Safe engineers.",
  keywords: "gas safety questions, smoke alarm requirements, carbon monoxide alarms, landlord responsibilities, CP12 certificate",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/questions",
  },
  openGraph: {
    title: "Gas Safety & Home Safety Questions | Birmingham Boiler Repairs",
    description: "Comprehensive guide to gas safety, smoke alarms, and carbon monoxide requirements.",
    url: "https://www.birminghamboilerrepairs.uk/questions",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
  },
}

export default function QuestionsPage() {
  const questionCategories = [
    {
      title: "Gas Safety Inspections",
      description: "Annual requirements, legal obligations, and CP12 certificates",
      icon: <Shield className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      href: "/questions/gas-safety",
      questionCount: 9,
      highlights: [
        "When gas inspections are required",
        "Landlord legal responsibilities", 
        "CP12 certificate requirements",
        "Tenant access and documentation"
      ],
      urgency: "Legal Requirement"
    },
    {
      title: "Smoke Alarms",
      description: "Installation requirements and landlord responsibilities since 2015",
      icon: <Home className="h-8 w-8" />,
      color: "from-red-500 to-red-600",
      href: "/questions/smoke-alarms",
      questionCount: 7,
      highlights: [
        "Legal requirements since Oct 2015",
        "Proper installation locations",
        "Landlord vs tenant responsibilities",
        "Penalties for non-compliance"
      ],
      urgency: "Mandatory"
    },
    {
      title: "Carbon Monoxide Alarms",
      description: "Life-saving detection and new 2022 legal requirements",
      icon: <AlertTriangle className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      href: "/questions/carbon-monoxide",
      questionCount: 15,
      highlights: [
        "New requirements since Oct 2022",
        "Proper positioning guidelines",
        "Emergency response procedures",
        "Health effects and prevention"
      ],
      urgency: "Critical Safety"
    }
  ]

  const popularQuestions = [
    {
      question: "When should a gas inspection be done?",
      answer: "Every 12 months. It can be done up to 2 months before its due date and still keep the original due date.",
      category: "Gas Safety",
      href: "/questions/gas-safety#timing"
    },
    {
      question: "When was it compulsory to need a smoke alarm for rented properties?",
      answer: "October 1st, 2015",
      category: "Smoke Alarms", 
      href: "/questions/smoke-alarms#legal"
    },
    {
      question: "Can I be fined if I don't have a CO alarm?",
      answer: "Yes up to £5000",
      category: "Carbon Monoxide",
      href: "/questions/carbon-monoxide#penalties"
    },
    {
      question: "Do I need to give the tenant a copy of the gas certificate?",
      answer: "Yes, you will need to send a copy of the certificate to the tenants within 28 days.",
      category: "Gas Safety",
      href: "/questions/gas-safety#documentation"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary/80 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Gas Safety Questions</h1>
            <p className="mt-6 text-xl leading-relaxed">
              Get expert answers to all your gas safety, smoke alarm, and carbon monoxide questions. 
              Comprehensive guidance from Gas Safe registered engineers.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="questions_main"
                  trackingSource="hero_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Get Expert Advice: 0800 320 2345"
                >
                  <Phone size={18} />
                  Get Expert Advice: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                Gas Safe Registered Engineers
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">31+</div>
              <div className="text-gray-600 dark:text-gray-400">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">3</div>
              <div className="text-gray-600 dark:text-gray-400">Safety Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Gas Safe Registered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Topic</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Select a category to find detailed answers and guidance
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {questionCategories.map((category, index) => (
              <Card key={index} className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} p-4 text-white`}>
                    {category.icon}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <Badge variant="secondary">{category.urgency}</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                  <Badge variant="outline" className="mx-auto w-fit">
                    {category.questionCount} Questions Answered
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {category.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Link href={category.href} className="flex items-center justify-center gap-2">
                      View Questions
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Most Asked Questions</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Quick answers to the questions we hear most often
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-6">
            {popularQuestions.map((q, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-secondary/10 p-2 text-secondary flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{q.question}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{q.answer}</p>
                          <Badge variant="outline">{q.category}</Badge>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={q.href} className="flex items-center gap-1 text-secondary hover:text-secondary/80">
                            Read More
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Key Safety Information</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Calendar className="mx-auto h-8 w-8 text-blue-600" />
                <CardTitle className="text-blue-900">Annual Gas Inspections</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-800">Required every 12 months for rental properties. CP12 certificates must be provided to tenants.</p>
              </CardContent>
            </Card>
            
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <Home className="mx-auto h-8 w-8 text-red-600" />
                <CardTitle className="text-red-900">Smoke Alarms</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-red-800">Mandatory on every floor since October 2015. Tested during gas inspections.</p>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-orange-600" />
                <CardTitle className="text-orange-900">CO Alarms</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-orange-800">Required since October 2022. Must be 1-3m from gas appliances at head height.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Still Have Questions?</h2>
            <p className="mt-4 text-xl">
              Our Gas Safe registered engineers are here to help with expert advice and professional service
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="questions_main"
                  trackingSource="bottom_cta"
                  className="flex items-center gap-2" 
                  ariaLabel="Call for Advice: 0800 320 2345"
                >
                  <Phone size={18} />
                  Call for Advice: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Expert advice
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

      {/* Related Services */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Our Services</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/services/gas-safety">Gas Safety Inspections</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services/boiler-servicing">Boiler Servicing</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services/boiler-repairs">Boiler Repairs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/prices">View All Prices</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
