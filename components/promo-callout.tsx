import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PromoCalloutProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  variant?: "default" | "highlight"
}

export default function PromoCallout({ title, description, ctaText, ctaLink, variant = "default" }: PromoCalloutProps) {
  return (
    <Card
      className={`border-2 ${
        variant === "highlight" ? "border-primary bg-primary/5" : "border-secondary bg-secondary/5"
      } shadow-md`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`rounded-full p-2 ${
              variant === "highlight" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
            }`}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
            <Button
              asChild
              className={variant === "highlight" ? "bg-primary text-gray-900" : "bg-secondary text-white"}
            >
              {ctaLink.startsWith("tel:") || ctaLink.startsWith("mailto:") ? (
                <a href={ctaLink} className="flex items-center gap-2" aria-label={ctaText}>
                  {ctaText}
                </a>
              ) : (
                <Link href={ctaLink}>{ctaText}</Link>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
