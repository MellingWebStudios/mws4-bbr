"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone } from "lucide-react"

const BoilerFAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqs = [
    {
      id: "not-firing",
      question: "Why won't my boiler fire up?",
      answer: (
        <>
          <p className="mb-2">If your boiler won't fire up, check these common causes:</p>
          <ul className="mb-4 list-inside list-disc space-y-1">
            <li>Low pressure (check the pressure gauge)</li>
            <li>Power supply issues (check the fuse box)</li>
            <li>Thermostat settings (ensure it's calling for heat)</li>
            <li>Frozen condensate pipe (common in winter)</li>
          </ul>
          <p>If you've checked these and your boiler still won't fire up, you likely need a professional repair.</p>
          <Button asChild className="mt-4 bg-secondary text-white">
            <Link href="tel:08003202345" className="flex items-center gap-2">
              <Phone size={16} />
              Call for help: 0800 320 2345
            </Link>
          </Button>
        </>
      ),
    },
    {
      id: "no-hot-water",
      question: "No hot water but heating works - what's wrong?",
      answer: (
        <>
          <p className="mb-2">When you have heating but no hot water, the most common causes are:</p>
          <ul className="mb-4 list-inside list-disc space-y-1">
            <li>Diverter valve failure (common in combi boilers)</li>
            <li>Hot water temperature settings too low</li>
            <li>Airlock in the hot water system</li>
            <li>Faulty hot water sensor</li>
          </ul>
          <p>This typically requires a professional diagnosis as it often involves internal boiler components.</p>
          <Button asChild className="mt-4 bg-secondary text-white">
            <Link href="tel:08003202345" className="flex items-center gap-2">
              <Phone size={16} />
              Book a repair: 0800 320 2345
            </Link>
          </Button>
        </>
      ),
    },
    {
      id: "noisy-boiler",
      question: "Why is my boiler making banging or gurgling noises?",
      answer: (
        <>
          <p className="mb-2">Unusual noises from your boiler can indicate several issues:</p>
          <ul className="mb-4 list-inside list-disc space-y-1">
            <li>Kettling (limescale build-up causing overheating)</li>
            <li>Air in the system (needs bleeding)</li>
            <li>Pump issues (worn bearings or debris)</li>
            <li>Water pressure problems</li>
          </ul>
          <p>
            While bleeding radiators might help with some noises, persistent sounds usually require professional
            attention.
          </p>
          <Button asChild className="mt-4 bg-secondary text-white">
            <Link href="tel:08003202345" className="flex items-center gap-2">
              <Phone size={16} />
              Get it fixed: 0800 320 2345
            </Link>
          </Button>
        </>
      ),
    },
    {
      id: "leaking",
      question: "My boiler is leaking water - is this dangerous?",
      answer: (
        <>
          <p className="mb-2">A leaking boiler should be addressed promptly. Possible causes include:</p>
          <ul className="mb-4 list-inside list-disc space-y-1">
            <li>Pressure valve release (if pressure is too high)</li>
            <li>Corroded internal components</li>
            <li>Loose pipe connections</li>
            <li>Damaged seals or pump</li>
          </ul>
          <p className="font-medium text-red-600">
            Important: If you notice a significant leak, turn off your boiler and water supply, and call us immediately.
          </p>
          <Button asChild className="mt-4 bg-red-600 text-white">
            <Link href="tel:08003202345" className="flex items-center gap-2">
              <Phone size={16} />
              Emergency call: 0800 320 2345
            </Link>
          </Button>
        </>
      ),
    },
  ]

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Common Boiler Problems</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Troubleshooting advice from our Gas Safe engineers
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <Accordion
            type="single"
            collapsible
            value={openItem || undefined}
            onValueChange={(value) => setOpenItem(value)}
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default BoilerFAQ
