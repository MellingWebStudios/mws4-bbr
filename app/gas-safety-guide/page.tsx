import { Metadata } from "next"
import Link from "next/link"
import { Shield, AlertTriangle, CheckCircle, Clock, Users, FileText, Phone, Info, Lightbulb, AlertCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import TrackedPhoneLink from "@/components/tracked-phone-link"

export const metadata: Metadata = {
  title: "Gas Safety Guide for Landlords & Homeowners | Birmingham Boiler Repairs",
  description: "Comprehensive guide to gas safety, smoke alarms, carbon monoxide alarms, and gas inspections. Essential information for landlords and homeowners in Birmingham.",
  keywords: "gas safety guide, smoke alarm requirements, carbon monoxide alarm, gas inspection, landlord responsibilities, Birmingham gas safety",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/gas-safety-guide",
  },
  openGraph: {
    title: "Gas Safety Guide for Landlords & Homeowners | Birmingham Boiler Repairs",
    description: "Comprehensive guide to gas safety, smoke alarms, carbon monoxide alarms, and gas inspections. Essential information for landlords and homeowners in Birmingham.",
    url: "https://www.birminghamboilerrepairs.uk/gas-safety-guide",
    siteName: "Birmingham Boiler Repairs",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birmingham Boiler Repairs Gas Safety Guide",
      }
    ],
  },
}

export default function GasSafetyGuidePage() {
  const smokeAlarmFaqs = [
    {
      question: "When was it compulsory to need a smoke alarm for rented properties?",
      answer: "October 1st, 2015. This legislation was introduced as part of the Smoke and Carbon Monoxide Alarm (England) Regulations 2015, making it a legal requirement for all rental properties to have working smoke alarms.",
      category: "Legal Requirements"
    },
    {
      question: "Where should smoke alarms be fitted?",
      answer: "They should be fitted on each floor like a hallway or the landing in a well-ventilated space, at least 30cm away from a wall or a light fitting. This ensures optimal detection while avoiding false alarms from cooking or steam.",
      category: "Installation"
    },
    {
      question: "Whose responsibility is it for a smoke alarm?",
      answer: "It is the landlord's responsibility to ensure a smoke alarm is fitted correctly and is in date. This includes initial installation, ensuring the alarm meets current standards, and replacing alarms when they expire.",
      category: "Responsibility"
    },
    {
      question: "Whose responsibility is it for the maintenance of my smoke alarm?",
      answer: "It is a landlord's responsibility to replace and maintain the smoke alarm via yearly checks and a gas engineer will test them on the annual gas inspection. However, tenants are responsible for testing it weekly and reporting any faults. Tenants can also replace batteries when needed.",
      category: "Maintenance"
    },
    {
      question: "What if the smoke alarm doesn't appear to have an expiry date or date of installation?",
      answer: "You have to be vigilant and assume that the smoke alarm is out of date and replace it. Most smoke alarms have a 10-year lifespan, and without clear dating, it's better to err on the side of caution for safety.",
      category: "Replacement"
    },
    {
      question: "Can a gas inspection (CP12) fail if I haven't got a smoke alarm?",
      answer: "Yes, it will fail. It is part of the test on a gas inspection. If it's not working or is missing, then it is a failed inspection. However, if you are doing a gas inspection to sell your property, you don't legally need one as you aren't renting to tenants.",
      category: "Inspections"
    },
    {
      question: "Can I as a landlord be fined for failure to supply a smoke alarm?",
      answer: "Yes, up to £5,000. Local authorities can impose this fine for each property that doesn't comply with smoke alarm regulations. Repeat offenders may face higher penalties.",
      category: "Legal Consequences"
    }
  ]

  const carbonMonoxideFaqs = [
    {
      question: "When was it compulsory to need a carbon monoxide alarm for a rented property?",
      answer: "1st October 2022. This requirement was introduced under updated regulations to enhance tenant safety, particularly in properties with gas appliances or solid fuel heating.",
      category: "Legal Requirements"
    },
    {
      question: "Where shall I install the CO alarm?",
      answer: "1-3 meters of a gas appliance (except cookers and hobs) at head height level where possible. This positioning ensures early detection while being easily accessible for testing and maintenance.",
      category: "Installation"
    },
    {
      question: "Can I be fined if I don't have a CO alarm?",
      answer: "Yes, up to £5,000. This is the same penalty structure as smoke alarms, reflecting the serious safety risks associated with carbon monoxide poisoning.",
      category: "Legal Consequences"
    },
    {
      question: "Can a gas inspection (CP12) fail if there isn't a CO alarm?",
      answer: "Yes. However, if you're having a gas inspection to sell your house, you won't legally need one as you aren't renting to tenants. The requirement is specifically for rental properties.",
      category: "Inspections"
    },
    {
      question: "What if I can't see the expiry date?",
      answer: "Best practice is to assume it's expired and replace it. Carbon monoxide alarms typically last 7-10 years, and unclear expiry dates indicate it's time for replacement to ensure continued protection.",
      category: "Maintenance"
    },
    {
      question: "Can I put a CO alarm on top of my boiler?",
      answer: "No, it must be fitted at head height if possible, 1-3m away from the boiler on a shelf or fixed to a wall. Placing it directly on the boiler can cause false readings due to heat and vibration.",
      category: "Installation"
    },
    {
      question: "Do I need a CO alarm if I'm a homeowner?",
      answer: "No law mandates CO alarms for homeowners. However, it is strongly recommended for any property with gas appliances, as carbon monoxide poisoning affects everyone equally regardless of property ownership.",
      category: "Homeowner Requirements"
    },
    {
      question: "Do I need to fit a CO alarm if fitting or replacing a new boiler?",
      answer: "Yes, for private homeowners and landlords. This would be fitted by the Gas Safe installer at the time of installation as part of the compliance requirements for new boiler installations.",
      category: "New Installations"
    },
    {
      question: "Who is responsible for the CO alarm and testing?",
      answer: "The landlord is responsible to ensure it's fitted and working correctly. The gas engineer will test this once a year during the gas inspection. The tenant should test the alarm weekly and report any faults to the landlord.",
      category: "Responsibility"
    },
    {
      question: "Can I fit a CO alarm in the bathroom if the boiler is there?",
      answer: "This is a bit of a grey area, but technically no due to steam. However, it can be fitted close to the bathroom. The moisture from steam can affect alarm sensitivity and cause false readings.",
      category: "Special Locations"
    },
    {
      question: "Do I need a CO alarm for a gas cooker or a gas hob?",
      answer: "No, it's not a legal requirement. A CO alarm isn't required for them solely. If a boiler is in the same room, then a CO alarm will be fitted more closely to the boiler as that's the primary concern.",
      category: "Appliance-Specific"
    },
    {
      question: "What do I do if my carbon monoxide alarm goes off?",
      answer: "Stay calm. Ventilate the property by opening doors and windows. If it's safe to do so, turn the gas appliances off and shut off the gas. Vacate the property. Contact a local Gas Safe engineer to find the cause. Get medical help if you're suffering from side effects of carbon monoxide poisoning.",
      category: "Emergency Response"
    },
    {
      question: "What is carbon monoxide?",
      answer: "Carbon monoxide is a colourless, tasteless, odourless, non-irritating gas produced during incomplete combustion of fuels due to insufficient oxygen. Complete combustion produces carbon dioxide. Most combustion processes produce some carbon monoxide, making detection crucial.",
      category: "Understanding CO"
    },
    {
      question: "What are the side effects of carbon monoxide poisoning?",
      answer: "Carbon monoxide binds to haemoglobin, reducing oxygen transport. Brief exposure causes headache, flushing, nausea, dizziness, vertigo, muscle pain, or personality changes. Higher exposure causes movement problems, weakness, confusion, lung and heart problems, loss of consciousness, and death. Long-term low-level exposure mimics flu symptoms with fatigue, headaches, memory problems, and can lead to dementia.",
      category: "Health Effects"
    },
    {
      question: "How can I prevent the possibility of carbon monoxide?",
      answer: "Fit a carbon monoxide alarm in any room with a gas appliance that burns fossil fuels. Regularly service your gas appliances. Check that the CO alarm works weekly by pressing the test button until the alarm sounds. Ensure proper ventilation around appliances.",
      category: "Prevention"
    }
  ]

  const gasInspectionFaqs = [
    {
      question: "When should a gas inspection be done?",
      answer: "Every 12 months. It can be done up to 2 months before its due date and still keep the original due date. This flexibility helps landlords manage their compliance schedule while maintaining continuous safety coverage.",
      category: "Timing"
    },
    {
      question: "Do I need to do another gas inspection if I have a new tenant moving in?",
      answer: "Yes, you will need a new gas safety check before a new tenant moves in, even if the previous check is still valid, according to the Health and Safety Executive. The law requires a copy of the Landlord Gas Safety Record (LGSR) to be provided to new tenants at the start of their tenancy. This is due to the likely event of previous tenants tampering with gas appliances and making them unsafe if they have been given a section 21.",
      category: "New Tenancies"
    },
    {
      question: "Do I need to give the tenant a copy of the certificate?",
      answer: "Yes, you will need to send a copy of the certificate to the tenants within 28 days. If the tenant is new, this needs to be given before they move in. It's advised this is done by email as you can prove that you have sent it, whereas you cannot prove you have left a paper copy if it's thrown away.",
      category: "Documentation"
    },
    {
      question: "Do I need to put the name of the landlord on the gas certificate?",
      answer: "Yes, this is very important in case you need to issue a section 21 to remove a tenant. The certificate may not be valid if the correct details are not on the landlord details, i.e., property owner or the estate agent details.",
      category: "Legal Requirements"
    },
    {
      question: "I'm a homeowner. Do I need to do an annual gas inspection?",
      answer: "Homeowners do not legally need an annual gas safety check. However, if you are buying or selling a property, it's advisable to get one done to prove the property is safe. Many estate agents and solicitors already ask for this and proof that the boiler has been regularly serviced.",
      category: "Homeowner Requirements"
    },
    {
      question: "What happens if a gas inspection is overdue?",
      answer: "If a gas safety inspection is overdue, a landlord could face significant legal and financial repercussions, including substantial fines, potential imprisonment, and even criminal charges in the event of an accident. Additionally, landlords may be unable to legally evict a tenant using a Section 21 notice.",
      category: "Legal Consequences"
    },
    {
      question: "What happens if I can't get in to do a gas inspection?",
      answer: "If a tenant refuses or prevents a landlord from accessing a property for a mandatory gas safety inspection, the landlord must take reasonable steps to arrange the inspection and document all attempts. If these attempts fail, the landlord can pursue legal action, potentially including a court order for access or, in extreme cases, eviction. Give the tenant ample time to arrange a gas inspection and document all attempts to arrange it.",
      category: "Access Issues"
    },
    {
      question: "Is a gas inspection the same as having a boiler service?",
      answer: "No, a boiler service is different to an annual gas safety check – a yearly inspection of all gas appliances in a property. Gas safety checks are a legal requirement for landlords. A boiler service focuses solely on the boiler and involves an engineer testing and cleaning certain components.",
      category: "Service Differences"
    },
    {
      question: "Do I need to get the boiler serviced yearly as a landlord?",
      answer: "There is no lawful time frame for how often a boiler should be serviced. The law states that a landlord must ensure a boiler is safe and operates correctly in line with manufacturer standards. However, if the boiler is new, it would need servicing to keep the warranty, which could be cost-effective in the long run. For older boilers, it's normally at the engineer's discretion if they feel the boiler needs servicing if it's been poorly maintained. Regular servicing (though maybe not yearly) shows proof as a landlord that you are looking after your property.",
      category: "Servicing Requirements"
    }
  ]

  const keyDates = [
    { date: "October 1st, 2015", requirement: "Smoke Alarms", description: "Mandatory for all rental properties" },
    { date: "October 1st, 2022", requirement: "Carbon Monoxide Alarms", description: "Required in rooms with gas appliances" },
    { date: "Every 12 months", requirement: "Gas Safety Inspections", description: "Annual CP12 certificates required" },
  ]

  const fineStructure = [
    { violation: "Missing Smoke Alarm", fine: "Up to £5,000", authority: "Local Authority" },
    { violation: "Missing CO Alarm", fine: "Up to £5,000", authority: "Local Authority" },
    { violation: "Overdue Gas Inspection", fine: "Unlimited + Criminal Charges", authority: "HSE/Courts" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Complete Gas Safety Guide
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Essential information for landlords and homeowners on smoke alarms, carbon monoxide detection, and gas inspections
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-white/10 text-white">
                <Clock className="mr-2 h-4 w-4" />
                Updated for 2025
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white">
                <FileText className="mr-2 h-4 w-4" />
                Legal Compliance
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white">
                <Shield className="mr-2 h-4 w-4" />
                Safety First
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Cards */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Key Requirements at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyDates.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-secondary">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-secondary" />
                    {item.date}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-secondary">{item.requirement}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Alert className="max-w-4xl mx-auto border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Emergency:</strong> If you smell gas or your carbon monoxide alarm sounds, evacuate immediately, 
              call the National Gas Emergency Service on <strong>0800 111 999</strong>, and then contact us for professional repairs.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="smoke-alarms" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="smoke-alarms" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Smoke Alarms
              </TabsTrigger>
              <TabsTrigger value="carbon-monoxide" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Carbon Monoxide
              </TabsTrigger>
              <TabsTrigger value="gas-inspections" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Gas Inspections
              </TabsTrigger>
            </TabsList>

            <TabsContent value="smoke-alarms" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Smoke Alarm Requirements
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Mandatory since October 2015, smoke alarms are essential for protecting lives and ensuring legal compliance in rental properties.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                      <Info className="mr-2 h-5 w-5" />
                      Installation Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-blue-700 dark:text-blue-300">
                    <ul className="space-y-2 text-sm">
                      <li>• One on each floor of the property</li>
                      <li>• In hallways or landings</li>
                      <li>• At least 30cm from walls/light fittings</li>
                      <li>• Well-ventilated areas</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Landlord Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-green-700 dark:text-green-300">
                    <ul className="space-y-2 text-sm">
                      <li>• Ensure proper installation</li>
                      <li>• Check alarms are in date</li>
                      <li>• Replace expired units</li>
                      <li>• Annual testing during gas inspection</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
                      <Users className="mr-2 h-5 w-5" />
                      Tenant Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-amber-700 dark:text-amber-300">
                    <ul className="space-y-2 text-sm">
                      <li>• Test weekly by pressing button</li>
                      <li>• Report faults to landlord</li>
                      <li>• Replace batteries when needed</li>
                      <li>• Don't remove or tamper with alarms</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {smokeAlarmFaqs.map((faq, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {faq.question}
                        </CardTitle>
                        <Badge variant="outline" className="ml-4 shrink-0">
                          {faq.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="carbon-monoxide" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Carbon Monoxide Alarm Requirements
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Required since October 2022, CO alarms protect against the "silent killer" - an odourless, colorless gas that can be fatal.
                </p>
              </div>

              <Alert className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  <strong>Critical Safety Information:</strong> Carbon monoxide is completely undetectable by human senses. 
                  Early symptoms can be mistaken for flu. If your CO alarm sounds, evacuate immediately and seek fresh air.
                </AlertDescription>
              </Alert>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-800 dark:text-red-200 text-sm">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      What is CO?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-red-700 dark:text-red-300 text-sm">
                    Colorless, odorless, tasteless gas from incomplete fuel combustion
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-800 dark:text-orange-200 text-sm">
                      <Info className="mr-2 h-4 w-4" />
                      Where to Install
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-orange-700 dark:text-orange-300 text-sm">
                    1-3m from gas appliances, at head height, not in bathrooms
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200 text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Testing Frequency
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Weekly testing by pressing test button until alarm sounds
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-800 dark:text-purple-200 text-sm">
                      <Shield className="mr-2 h-4 w-4" />
                      Lifespan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-purple-700 dark:text-purple-300 text-sm">
                    7-10 years typically, replace if expiry date unclear
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {carbonMonoxideFaqs.map((faq, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {faq.question}
                        </CardTitle>
                        <Badge variant="outline" className="ml-4 shrink-0">
                          {faq.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gas-inspections" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Gas Safety Inspections (CP12)
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Annual gas safety certificates are legally required for all rental properties with gas appliances. 
                  They ensure tenant safety and landlord compliance.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                      <Calendar className="mr-2 h-5 w-5" />
                      Timing Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-blue-700 dark:text-blue-300">
                    <ul className="space-y-2 text-sm">
                      <li>• Every 12 months maximum</li>
                      <li>• Can be done 2 months early</li>
                      <li>• Required before new tenants move in</li>
                      <li>• Certificate valid for 12 months</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                      <FileText className="mr-2 h-5 w-5" />
                      Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-green-700 dark:text-green-300">
                    <ul className="space-y-2 text-sm">
                      <li>• CP12 certificate issued</li>
                      <li>• Copy to tenant within 28 days</li>
                      <li>• Email recommended for proof</li>
                      <li>• Landlord details must be correct</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-800 dark:text-red-200">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Consequences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-red-700 dark:text-red-300">
                    <ul className="space-y-2 text-sm">
                      <li>• Unlimited fines possible</li>
                      <li>• Potential imprisonment</li>
                      <li>• Section 21 notices invalid</li>
                      <li>• Criminal charges if accident occurs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {gasInspectionFaqs.map((faq, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {faq.question}
                        </CardTitle>
                        <Badge variant="outline" className="ml-4 shrink-0">
                          {faq.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Fines and Penalties Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Fines and Penalties
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="p-4 text-left">Violation</th>
                    <th className="p-4 text-left">Maximum Fine</th>
                    <th className="p-4 text-left">Enforcing Authority</th>
                  </tr>
                </thead>
                <tbody>
                  {fineStructure.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium text-gray-900 dark:text-white">{item.violation}</td>
                      <td className="p-4 text-red-600 font-semibold">{item.fine}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{item.authority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Alert className="mt-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>Important:</strong> These are maximum penalties. Actual fines may vary based on circumstances, 
                repeat offenses, and local authority policies. Prevention through compliance is always more cost-effective than penalties.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Help with Gas Safety Compliance?
            </h2>
            <p className="text-lg mb-8">
              Our Gas Safe registered engineers provide comprehensive gas safety inspections, 
              smoke alarm testing, and carbon monoxide alarm checks across Birmingham.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
                <TrackedPhoneLink 
                  phone="08003202345" 
                  trackingLocation="gas_safety_guide"
                  trackingSource="cta_button"
                  className="flex items-center gap-2" 
                  ariaLabel="Call Now: 0800 320 2345"
                >
                  <Phone size={18} />
                  Call Now: 0800 320 2345
                </TrackedPhoneLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Link href="/services/gas-safety">
                  View Gas Safety Services
                </Link>
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-90">
              No call-out fees • Same-day service available • All engineers Gas Safe registered
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
