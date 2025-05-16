import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  ctaText: string
  ctaLink: string
  highlighted?: boolean
  /**
   * Additional tailwind classes for one-off tweaks.
   */
  className?: string
}

/**
 * `<PricingCard>` – sleek, glass‑styled pricing tier component.
 *
 * ▸ *Same props API* (no breaking changes).
 * ▸ Accessible, keyboard‑friendly CTA button.
 * ▸ Framer Motion lift-on‑hover for delight.
 * ▸ Gradient ring + glassmorphism when `highlighted`.
 */
const PricingCard = ({
  title,
  price,
  features,
  ctaText,
  ctaLink,
  highlighted = false,
  className,
}: PricingCardProps) => {
  const isActionLink = (link: string) => link.startsWith("mailto:") || link.startsWith("tel:")

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl bg-white/75 shadow-lg backdrop-blur-md dark:bg-gray-950/80",
          highlighted && "ring-2 ring-offset-2 ring-secondary/80 shadow-2xl",
        )}
      >
        {/* Header */}
        <CardHeader
          className={cn(
            "flex flex-col items-center space-y-1 pb-4 pt-8 text-center",
            highlighted && "bg-gradient-to-b from-secondary/10 to-transparent",
          )}
        >
          <h3 className="text-3xl font-extrabold tracking-tight">{title}</h3>
          <div className="mt-4 flex items-end gap-1">
            <span className="text-5xl font-black leading-none">{price}</span>
            <span className="mb-1 text-sm text-muted-foreground">No&nbsp;VAT</span>
          </div>
        </CardHeader>

        {/* Feature list */}
        <CardContent className="flex flex-1 flex-col items-center px-8">
          <ul className="mt-8 mb-10 w-full space-y-4 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full bg-secondary/20",
                    highlighted && "bg-secondary",
                  )}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      highlighted ? "text-white" : "text-secondary",
                    )}
                  />
                </span>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col gap-3 px-8 pb-8">
          <Button asChild size="lg" className="w-full">
            {isActionLink(ctaLink) ? (
              <a href={ctaLink} aria-label={ctaText} className="w-full">
                {ctaText}
              </a>
            ) : (
              <Link href={ctaLink} className="w-full">
                {ctaText}
              </Link>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Takes 60&nbsp;sec&nbsp;&mdash;&nbsp;no payment taken
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default PricingCard
