import * as React from "react"
import { cn } from "@/lib/utils"

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface DynamicHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  as?: HeadingLevel
  children: React.ReactNode
}

/**
 * DynamicHeading component that renders the appropriate heading level (h1-h6)
 * based on the `level` or `as` prop. This helps maintain proper heading hierarchy
 * across the site when components are reused in different contexts.
 * 
 * @param level - The semantic heading level (1-6)
 * @param as - Alias for level
 * @param children - The heading content
 * @param className - Additional CSS classes
 */
export function DynamicHeading({ 
  level = 2, 
  as,
  children, 
  className,
  ...props 
}: DynamicHeadingProps) {
  const headingLevel = as || level
  const Tag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={cn(className)} {...props}>
      {children}
    </Tag>
  )
}

export default DynamicHeading
