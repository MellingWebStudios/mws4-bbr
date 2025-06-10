import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, User, Clock, Tag } from "lucide-react"
import { getBlogPosts, getBlogPostsByTag } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TrackedPhoneLink from "@/components/tracked-phone-link"

interface TagPageProps {
  params: {
    tag: string
  }
}

// Get all possible tags by scanning all blog posts
async function getAllTags() {
  const posts = await getBlogPosts()
  const tagSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet)
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: encodedTag } = await params
  const tag = decodeURIComponent(encodedTag)
  const posts = await getBlogPostsByTag(tag)
  
  if (posts.length === 0) {
    return {
      title: "Tag Not Found",
    }
  }

  const tagTitle = tag.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    title: `${tagTitle} | Birmingham Boiler Repairs Blog`,
    description: `Articles tagged with ${tagTitle}. Expert boiler and heating advice for Birmingham and West Midlands homeowners.`,
    keywords: [
      tagTitle.toLowerCase(),
      "Birmingham",
      "West Midlands", 
      "boiler",
      "heating",
      "advice",
      "guides"
    ],
    openGraph: {
      title: `${tagTitle} Articles | Birmingham Boiler Repairs`,
      description: `Articles tagged with ${tagTitle} - expert heating advice for Birmingham homeowners`,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tagTitle} Articles | Birmingham Boiler Repairs`,
      description: `Articles tagged with ${tagTitle} - expert heating advice for Birmingham homeowners`,
    },
    alternates: {
      canonical: `https://www.birminghamboilerrepairs.uk/blog/tag/${encodeURIComponent(tag)}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params
  const tag = decodeURIComponent(encodedTag)
  const posts = await getBlogPostsByTag(tag)
  
  if (posts.length === 0) {
    notFound()
  }

  const tagTitle = tag.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

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
              <Badge variant="outline" className="text-sm font-medium flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tagTitle}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Articles tagged "{tagTitle}"
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Discover all our articles related to {tagTitle.toLowerCase()}. Expert advice and practical guides 
              for Birmingham and West Midlands homeowners.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
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
                  {post.tags.slice(0, 2).map((postTag) => (
                    <Badge 
                      key={postTag} 
                      variant={postTag === tag ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {postTag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 2}
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

        {/* Related Tags */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Related Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(posts.flatMap(post => post.tags)))
              .filter(relatedTag => relatedTag !== tag)
              .slice(0, 10)
              .map((relatedTag) => (
                <Button
                  key={relatedTag}
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Link href={`/blog/tag/${encodeURIComponent(relatedTag)}`}>
                    {relatedTag.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Link>
                </Button>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-xl p-8 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Professional Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our Gas Safe registered engineers provide expert boiler repairs, installations, 
              and maintenance services across Birmingham and the West Midlands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="blog_tag_page"
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
