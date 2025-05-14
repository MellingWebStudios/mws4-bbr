import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  ctaText: string
  ctaLink: string
  highlighted?: boolean
}

const PricingCard = ({ title, price, features, ctaText, ctaLink, highlighted = false }: PricingCardProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col transition-transform duration-300 hover:scale-105",
        highlighted ? "border-2 border-secondary shadow-lg" : "border shadow",
      )}
    >
      <CardHeader
        className={cn(
          "flex flex-col items-center space-y-1 pb-2 pt-6 text-center",
          highlighted ? "bg-secondary/5" : "",
        )}
      >
        <h3 className="text-2xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center p-6 pt-4">
        <div className="mb-6 mt-2 flex items-baseline justify-center">
          <span className="text-4xl font-bold">{price}</span>
          <span className="ml-1 text-sm text-gray-500">No VAT</span>
        </div>
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className={cn("mr-2 h-5 w-5", highlighted ? "text-secondary" : "text-green-500")} />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-col space-y-2 pb-6">
        <Button
          asChild
          className={cn(
            "w-full",
            highlighted
              ? "bg-secondary text-white hover:bg-secondary/90"
              : "bg-primary text-gray-900 hover:bg-primary/90",
          )}
        >
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">Takes 60 sec – no payment taken</p>
      </CardFooter>
    </Card>
  )
}

export default PricingCard
