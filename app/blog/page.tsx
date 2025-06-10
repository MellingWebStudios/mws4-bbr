import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, ArrowRight, Tag } from "lucide-react"
import { getAllPosts, getFeaturedPosts, getAllCategories, getAllTags } from "@/lib/blog-data"
import { businessInfo } from "@/lib/business-info"
import TrackedPhoneLink from "@/components/tracked-phone-link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boiler Repair Blog | Expert Tips & Advice | Birmingham Boiler Repairs",
  description:
    "Expert boiler repair tips, maintenance advice, and heating solutions from Gas Safe engineers. Local insights for Birmingham and West Midlands homeowners.",
  keywords: "boiler repair tips, heating advice, boiler maintenance, Birmingham heating blog, gas safe tips, boiler troubleshooting",
  alternates: {
    canonical: "https://www.birminghamboilerrepairs.uk/blog",
  },
  openGraph: {
    title: "Boiler Repair Blog | Expert Tips & Advice",
    description: "Expert boiler repair tips and heating advice from Gas Safe engineers serving Birmingham and the West Midlands.",
    url: "https://www.birminghamboilerrepairs.uk/blog",
    siteName: businessInfo.name,
    type: "website",
    images: [
      {
        url: "https://www.birminghamboilerrepairs.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birmingham Boiler Repairs Blog - Expert Tips & Advice",
      }
    ],
  },
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const regularPosts = allPosts.filter(post => !post.featured)
  const categories = getAllCategories()
  const tags = getAllTags()

  const categoryLabels: Record<string, string> = {
    'boiler-repair': 'Boiler Repair',
    'heating-systems': 'Heating Systems',
    'maintenance': 'Maintenance & Servicing',
    'emergency-services': 'Emergency Services',
    'installation': 'Installation Services',
    'troubleshooting': 'Troubleshooting Guides',
    'how-to': 'How-To Guides',
    'local-news': 'Local News',
    'seasonal': 'Seasonal Advice'
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Boiler Repair Tips & Expert Advice
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
              Get expert insights from our Gas Safe engineers. Practical tips, troubleshooting guides, 
              and maintenance advice to keep your boiler running efficiently.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <TrackedPhoneLink
                phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                trackingLocation="blog_page"
                trackingSource="hero_cta"
                className="bg-primary hover:bg-primary/90 flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-gray-900 transition-colors"
                ariaLabel={`Need Help Now? Call ${businessInfo.phone.freephone}`}
              >
                Need Help Now? Call {businessInfo.phone.freephone}
              </TrackedPhoneLink>
              <div className="flex items-center text-sm text-white/80">
                <Clock className="mr-2 h-4 w-4" />
                Same-day service available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Browse by category:</span>
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">
                <Link href={`#category-${category}`} className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {categoryLabels[category]}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Articles
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Essential reading for Birmingham homeowners
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="mb-4 flex items-center gap-4">
                        <Badge variant="secondary">{categoryLabels[post.category]}</Badge>
                        {post.location && (
                          <Badge variant="outline">{post.location}</Badge>
                        )}
                      </div>
                      
                      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="mb-4 text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readingTime}
                        </span>
                      </div>
                      
                      <Button asChild className="mt-4 w-full" variant="outline">
                        <Link href={`/blog/${post.slug}`} className="flex items-center justify-center gap-2">
                          Read Article
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts by Category */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {categories.map((category) => {
            const categoryPosts = allPosts.filter(post => post.category === category)
            if (categoryPosts.length === 0) return null

            return (
              <div key={category} id={`category-${category}`} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categoryLabels[category]}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {category === 'how-to' && "Step-by-step guides to solve common boiler issues"}
                    {category === 'maintenance' && "Keep your boiler running efficiently with regular maintenance"}
                    {category === 'troubleshooting' && "Diagnose and fix common boiler problems"}
                    {category === 'seasonal' && "Seasonal tips to prepare your heating system"}
                    {category === 'local-news' && "Local heating news and updates for the West Midlands"}
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.slice(0, 6).map((post) => (
                    <Card key={post.slug} className="overflow-hidden transition-shadow hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          {post.location && (
                            <Badge variant="outline" className="text-xs">
                              {post.location}
                            </Badge>
                          )}
                          {post.featured && (
                            <Badge variant="default" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{post.author}</span>
                          <span>{post.readingTime}</span>
                        </div>
                        
                        <Button asChild className="mt-3 w-full" variant="outline" size="sm">
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {categoryPosts.length > 6 && (
                  <div className="mt-6 text-center">
                    <Button asChild variant="outline">
                      <Link href={`/blog/category/${category}`}>
                        View All {categoryLabels[category]} ({categoryPosts.length})
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary/90 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Need Professional Boiler Help?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Our Gas Safe engineers are ready to help with any boiler issue. 
              Same-day service available across Birmingham and the West Midlands.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <TrackedPhoneLink
                phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                trackingLocation="blog_page"
                trackingSource="bottom_cta"
                className="bg-primary hover:bg-primary/90 flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-gray-900 transition-colors"
                ariaLabel={`Call ${businessInfo.phone.freephone}`}
              >
                Call {businessInfo.phone.freephone}
              </TrackedPhoneLink>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                <Link href="/contact">
                  Get Free Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
