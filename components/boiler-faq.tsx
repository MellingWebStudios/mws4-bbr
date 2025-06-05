/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import businessInfo from "@/lib/business-info"
import TrackedPhoneLink from "@/components/tracked-phone-link"

/**
 * BoilerFAQ – design‑refreshed, markup‑identical.
 *
 * ▸ Keeps the exact JSX tree you provided (same state + data).
 * ▸ Layers in modern visuals: gradient section, glassy card, subtle hover & open states.
 * ▸ No breaking changes – just swap‑in and go.
 */
const BoilerFAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null)

  // original FAQ data unchanged
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
          <TrackedPhoneLink
            phone={businessInfo.phone.freephone.replace(/\s/g, "")}
            trackingLocation="boiler_faq"
            trackingSource="wont_fire_up_help"
            className="mt-6 bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            ariaLabel={`Call for help: ${businessInfo.phone.freephone}`}
          >
            <Phone size={16} />
            {`Call for help: ${businessInfo.phone.freephone}`}
          </TrackedPhoneLink>
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
          <TrackedPhoneLink
            phone={businessInfo.phone.freephone.replace(/\s/g, "")}
            trackingLocation="boiler_faq"
            trackingSource="no_hot_water_repair"
            className="mt-6 bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            ariaLabel={`Book a repair: ${businessInfo.phone.freephone}`}
          >
            <Phone size={16} />
            {`Book a repair: ${businessInfo.phone.freephone}`}
          </TrackedPhoneLink>
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
          <p>While bleeding radiators might help with some noises, persistent sounds usually require professional attention.</p>
          <TrackedPhoneLink
            phone={businessInfo.phone.freephone.replace(/\s/g, "")}
            trackingLocation="boiler_faq"
            trackingSource="strange_noises_fix"
            className="mt-6 bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            ariaLabel={`Get it fixed: ${businessInfo.phone.freephone}`}
          >
            <Phone size={16} />
            {`Get it fixed: ${businessInfo.phone.freephone}`}
          </TrackedPhoneLink>
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
          <p className="font-semibold text-red-600 dark:text-red-400">
            Important: If you notice a significant leak, turn off your boiler and water supply, and call us immediately.
          </p>
          <TrackedPhoneLink
            phone={businessInfo.phone.freephone.replace(/\s/g, "")}
            trackingLocation="boiler_faq"
            trackingSource="emergency_leak_call"
            className="mt-6 bg-red-600 text-white shadow-lg hover:bg-red-700 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            ariaLabel={`Emergency call: ${businessInfo.phone.freephone}`}
          >
            <Phone size={16} />
            {`Emergency call: ${businessInfo.phone.freephone}`}
          </TrackedPhoneLink>
        </>
      ),
    },
  ]

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20",
        "bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-background dark:via-background/90 dark:to-background",
      )}
    >
      {/* decorative backdrop */}

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        {/* header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Common Boiler Problems
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Troubleshooting advice from our Gas Safe engineers
          </p>
        </div>

        {/* FAQ card */}
        <div
          className="mx-auto max-w-3xl rounded-2xl bg-white/85 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-800/80 dark:ring-1 dark:ring-white/10"
        >
          <Accordion
            type="single"
            collapsible
            value={openItem || undefined}
            onValueChange={(value) => setOpenItem(value)}
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 dark:border-white/10"
              >
                <AccordionTrigger
                  className="text-left text-lg font-semibold hover:text-secondary data-[state=open]:text-secondary dark:data-[state=open]:text-secondary"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default BoilerFAQ
