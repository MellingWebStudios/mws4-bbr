import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="inline-flex items-center space-x-1 text-sm">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-white/70" />}
          {item.isCurrent ? (
            <span className="font-medium text-white" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-white/80 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
