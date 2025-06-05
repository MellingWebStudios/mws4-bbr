import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, User, Clock } from "lucide-react"
import { getBlogPosts, getBlogPostsByCategory } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
  "troubleshooting"
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
    "troubleshooting": "Troubleshooting Guides"
  }

  const categoryTitle = categoryTitles[category]
  const posts = await getBlogPostsByCategory(category)

  return {
    title: `${categoryTitle} | Birmingham Boiler Repairs Blog`,
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
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryTitle} Articles | Birmingham Boiler Repairs`,
      description: `Expert ${categoryTitle.toLowerCase()} advice and guides for Birmingham homeowners`,
    },
    alternates: {
      canonical: `https://birminghamboilerrepairs.co.uk/blog/category/${category}`,
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
    "boiler-repair": "Expert guides and advice on diagnosing and fixing boiler problems in Birmingham and the West Midlands.",
    "heating-systems": "Comprehensive information about different heating systems, efficiency tips, and system comparisons.",
    "maintenance": "Essential maintenance tips and servicing guides to keep your boiler running efficiently year-round.",
    "emergency-services": "Emergency heating guidance and what to do when your boiler breaks down unexpectedly.",
    "installation": "Everything you need to know about boiler installation, replacement, and upgrade services.",
    "troubleshooting": "Step-by-step troubleshooting guides to help you identify and resolve common boiler issues."
  }

  const categoryTitle = categoryTitles[category]
  const categoryDescription = categoryDescriptions[category]

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
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {categoryDescription}
            </p>
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
              <Button size="lg" asChild className="bg-primary text-white hover:bg-primary/90">
                <a href="tel:08003202345">
                  Call Now: 0800 320 2345
                </a>
              </Button>
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
