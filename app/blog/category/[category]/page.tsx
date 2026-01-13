import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, User, Clock } from "lucide-react"
import { getBlogPosts, getBlogPostsByCategory } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TrackedPhoneLink from "@/components/tracked-phone-link"

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Valid categories
const validCategories = [
  "boiler-repair",
  "heating-systems", 
  "maintenance",
  "emergency-services",
  "installation",
  "troubleshooting",
  "seasonal"
]

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  
  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found",
    }
  }

  const categoryTitles: Record<string, string> = {
    "boiler-repair": "Boiler Repair",
    "heating-systems": "Heating Systems",
    "maintenance": "Maintenance & Servicing",
    "emergency-services": "Emergency Services",
    "installation": "Installation Services",
    "troubleshooting": "Troubleshooting Guides",
    "seasonal": "Seasonal Advice"
  }

  const categoryTitle = categoryTitles[category]
  const posts = await getBlogPostsByCategory(category)

  return {
    title: `${categoryTitle} Articles | Birmingham Boiler Repairs Blog`,
    description: `Expert advice and guides on ${categoryTitle.toLowerCase()}. Read our latest articles covering ${categoryTitle.toLowerCase()} in Birmingham and the West Midlands.`,
    keywords: [
      categoryTitle.toLowerCase(),
      "Birmingham",
      "West Midlands",
      "boiler",
      "heating",
      "advice",
      "guides"
    ],
    openGraph: {
      title: `${categoryTitle} Articles | Birmingham Boiler Repairs`,
      description: `Expert ${categoryTitle.toLowerCase()} advice and guides for Birmingham homeowners`,
      url: `https://www.birminghamboilerrepairs.uk/blog/category/${category}`,
      siteName: "Birmingham Boiler Repairs",
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: "https://www.birminghamboilerrepairs.uk/og-image.png",
          width: 1200,
          height: 630,
          alt: `${categoryTitle} Articles | Birmingham Boiler Repairs`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryTitle} Articles | Birmingham Boiler Repairs`,
      description: `Expert ${categoryTitle.toLowerCase()} advice and guides for Birmingham homeowners`,
    },
    alternates: {
      canonical: `https://www.birminghamboilerrepairs.uk/blog/category/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  if (!validCategories.includes(category)) {
    notFound()
  }

  const posts = await getBlogPostsByCategory(category)
  
  const categoryTitles: Record<string, string> = {
    "boiler-repair": "Boiler Repair",
    "heating-systems": "Heating Systems", 
    "maintenance": "Maintenance & Servicing",
    "emergency-services": "Emergency Services",
    "installation": "Installation Services",
    "troubleshooting": "Troubleshooting Guides"
  }

  const categoryDescriptions: Record<string, string> = {
    "boiler-repair": "Expert guides and advice on diagnosing and fixing boiler problems in Birmingham and the West Midlands. Our Gas Safe registered engineers share their knowledge to help you understand common boiler faults, when to call a professional, and how to prevent costly breakdowns.",
    "heating-systems": "Comprehensive information about different heating systems, efficiency tips, and system comparisons. Learn about combi boilers, system boilers, heat pumps, and how to choose the right heating solution for your Birmingham home.",
    "maintenance": "Essential maintenance tips and servicing guides to keep your boiler running efficiently year-round. Regular servicing can extend your boiler's lifespan, maintain manufacturer warranties, and reduce energy bills.",
    "emergency-services": "Emergency heating guidance and what to do when your boiler breaks down unexpectedly. Our 24/7 emergency team is always ready, but these guides help you stay safe and take initial steps before help arrives.",
    "installation": "Everything you need to know about boiler installation, replacement, and upgrade services. From choosing the right boiler size to understanding installation costs and timelines in the Birmingham area.",
    "troubleshooting": "Step-by-step troubleshooting guides to help you identify and resolve common boiler issues. While some problems require a Gas Safe engineer, many minor issues can be safely diagnosed at home.",
    "seasonal": "Seasonal advice to prepare your heating system for changing weather conditions. Learn how to winterise your boiler, prepare for cold snaps, and maintain efficiency throughout the year in the West Midlands."
  }

  const categoryExtendedInfo: Record<string, string> = {
    "boiler-repair": "From error codes to strange noises, our repair guides cover the most common issues Birmingham homeowners face. We explain what causes problems and whether you can fix them yourself or need professional help.",
    "heating-systems": "Whether you're upgrading from an old G-rated boiler or installing a completely new system, understanding your options is crucial. Our guides break down the pros and cons of each heating system type.",
    "maintenance": "Annual boiler servicing is recommended by all manufacturers and required for warranty validity. Our maintenance articles explain what's involved and why it matters for your home's safety and efficiency.",
    "emergency-services": "A boiler breakdown in winter can be stressful. Our emergency guides help you identify the issue, stay safe, and know when to call 0800 320 2345 for immediate assistance from our Birmingham engineers.",
    "installation": "Boiler installation is a significant investment. These guides help you make informed decisions about timing, costs, and choosing the right system for your property's heating demands.",
    "troubleshooting": "Many boiler problems have simple explanations. Our troubleshooting guides walk you through diagnostic steps, helping you understand your heating system and communicate effectively with engineers.",
    "seasonal": "The West Midlands climate presents unique challenges for heating systems. Our seasonal guides ensure your boiler is ready for whatever the weather brings, from freezing winters to mild summers."
  }

  const categoryWhyReadInfo: Record<string, string> = {
    "boiler-repair": "Our boiler repair articles are written by experienced Gas Safe registered engineers who work on boilers across Birmingham every day. We cover topics including common boiler faults like F1, F22 and F28 error codes on Worcester, Vaillant and Baxi boilers. You'll find detailed explanations of issues such as loss of pressure, no hot water, radiators not heating up, and strange banging or kettling noises. We explain when a simple reset might fix the problem and when you need to call a qualified professional.",
    "heating-systems": "Our heating systems guides help Birmingham homeowners understand modern heating technology. We compare combi boilers with system and regular boilers, explain how heat pumps work, and discuss whether hydrogen-ready boilers are worth considering. Our engineers break down the technical specifications into plain English, helping you make informed decisions about heating your home efficiently. We also cover underfloor heating, smart thermostats, and heating controls that can reduce your energy bills.",
    "maintenance": "Regular boiler servicing is essential for safety, efficiency, and maintaining your manufacturer's warranty. Our maintenance guides explain what engineers check during an annual service, how to perform basic checks yourself, and warning signs that your boiler needs attention. We cover topics like bleeding radiators, checking boiler pressure, and understanding condensate drain issues. Proper maintenance can extend your boiler's lifespan by several years and help you avoid expensive emergency repairs during cold winter months.",
    "emergency-services": "When your heating fails unexpectedly, especially during winter, you need to know what to do. Our emergency services articles explain common causes of sudden boiler failures, safety precautions you should take if you smell gas, and how to safely manage without heating until help arrives. We provide guidance on identifying genuine emergencies versus issues that can wait for a standard appointment, helping you make the right call when your household comfort is at stake.",
    "installation": "Choosing and installing a new boiler is one of the biggest home improvement investments you'll make. Our installation guides cover everything from calculating the right boiler size for your property to understanding different installation types and costs. We explain the difference between like-for-like replacements and system upgrades, discuss the best boiler brands for Birmingham homes, and outline what to expect during the installation process. Our articles also cover grants and schemes that might help with installation costs.",
    "troubleshooting": "Before calling an engineer, our troubleshooting guides help you understand what might be wrong with your boiler. We provide step-by-step diagnostic instructions for common problems like low pressure, cold radiators, and pilot light issues. Our guides explain error codes from major manufacturers and help you determine whether a problem is minor or requires professional attention. Understanding these basics can save you money and help you communicate more effectively when you do need to call for help.",
    "seasonal": "Birmingham's weather patterns affect your heating system in different ways throughout the year. Our seasonal guides help you prepare your boiler for winter cold spells, explain why frozen condensate pipes cause problems, and offer advice for summer maintenance when your heating isn't in regular use. We cover topics like power flushing before winter, protecting outdoor pipes, and timing your annual service for maximum benefit. Following seasonal advice helps ensure reliable heating when you need it most."
  }

  const categoryTitle = categoryTitles[category]
  const categoryDescription = categoryDescriptions[category]
  const categoryExtended = categoryExtendedInfo[category]
  const categoryWhyRead = categoryWhyReadInfo[category]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-sm font-medium">
                {categoryTitle}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryTitle} Articles
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {categoryDescription}
            </p>
            
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              {categoryExtended}
            </p>
            
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Why Read Our {categoryTitle} Articles?</h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {categoryWhyRead}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="h-full flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    {post.location && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {post.location}
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-xl leading-tight hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  
                  <CardDescription className="text-sm line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We haven't published any articles in this category yet. Check back soon!
              </p>
              <Button asChild>
                <Link href="/blog">
                  Browse All Articles
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-xl p-8 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Expert Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              If you need professional assistance with your boiler or heating system, 
              our Gas Safe registered engineers are here to help. Available 24/7 for emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="blog_category_page"
                trackingSource="bottom_cta"
                className="bg-primary text-white hover:bg-primary/90 flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors"
                ariaLabel="Call Now: 0800 320 2345"
              >
                Call Now: 0800 320 2345
              </TrackedPhoneLink>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Get Free Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
