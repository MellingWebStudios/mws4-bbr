import Image from "next/image"
import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface GasSafeBadgeProps {
  variant?: "default" | "compact" | "footer" | "inline"
  className?: string
}

export default function GasSafeBadge({ variant = "default", className }: GasSafeBadgeProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-1 rounded-md bg-white p-1.5 shadow-sm", className)}>
        <ShieldCheck className="h-4 w-4 text-secondary" />
        <p className="text-xs font-medium text-secondary">Gas Safe: 520077</p>
      </div>
    )
  }

  if (variant === "footer") {
    return (
      <div className={cn("flex items-center", className)}>
        <div className="relative h-16 w-16 mr-2">
          <Image src="/images/gas-safe-1.svg" alt="Gas Safe Registered" fill className="object-contain" />
        </div>
        <div>
          <p className="text-sm font-medium">Gas Safe Registered</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Registration No: 520077</p>
        </div>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative h-5 w-5">
          <Image src="/placeholder.svg?key=e0ryo" alt="Gas Safe Registered" fill className="object-contain" />
        </div>
        <p className="text-sm font-medium text-gray-700">Gas Safe Registered: 520077</p>
      </div>
    )
  }

  // Default variant - now using Card component for consistency with Google reviews
  return (
    <Card className={cn("border-none shadow-lg overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image src="/placeholder.svg?key=gwskx" alt="Gas Safe Registered" fill className="object-contain" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Gas Safe Registered</p>
            <p className="text-sm text-gray-600">Registration No: 520077</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
