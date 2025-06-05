import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Phone, 
  CheckCircle,
  Tag,
  Share2
} from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog-data"
import { businessInfo } from "@/lib/business-info"
import BreadcrumbSchema from "@/components/breadcrumb-schema"
import Breadcrumb from "@/components/breadcrumb"
import { SmartContentLinks } from "@/components/contextual-links"
import TrackedPhoneLink from "@/components/tracked-phone-link"
import type { Metadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const title = post.metaTitle || `${post.title} | Birmingham Boiler Repairs`
  const description = post.metaDescription || post.description
  const url = `https://www.birminghamboilerrepairs.uk/blog/${post.slug}`

  return {
    title,
    description,
    keywords: post.tags.join(", "),
    alternates: { 
      canonical: post.canonicalUrl || url 
    },
    openGraph: {
      title,
      description,
      url,
      siteName: businessInfo.name,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// MDX Components for styling
const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-4" {...props} />,
  p: (props: any) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
  em: (props: any) => <em className="italic text-gray-800 dark:text-gray-200" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary bg-gray-50 dark:bg-gray-800 p-4 my-6 italic" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border border-gray-200 dark:border-gray-700" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary hover:text-primary/80 underline" {...props} />
  ),
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  // Generate structured data for articles
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schema === 'how-to' ? "HowTo" : "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      logo: {
        "@type": "ImageObject",
        url: `${businessInfo.website}/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.lastModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${businessInfo.website}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  }

  // FAQ Schema if present
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", item: businessInfo.website + "/" },
          { name: "Blog", item: `${businessInfo.website}/blog` },
          { name: post.title, item: `${businessInfo.website}/blog/${post.slug}` },
        ]}
      />

      <div className="flex flex-col">
        {/* Article Header */}
        <section className="bg-secondary py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6">
                <Breadcrumb
                  items={[
                    { label: "Blog", href: "/blog" },
                    { label: post.title, href: `/blog/${post.slug}`, isCurrent: true },
                  ]}
                />
              </div>
              
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {post.category === 'how-to' && 'How-To Guide'}
                  {post.category === 'maintenance' && 'Maintenance Tips'}
                  {post.category === 'troubleshooting' && 'Troubleshooting'}
                  {post.category === 'seasonal' && 'Seasonal Advice'}
                  {post.category === 'local-news' && 'Local News'}
                </Badge>
                {post.location && (
                  <Badge variant="outline" className="border-white/30 text-white">
                    {post.location}
                  </Badge>
                )}
                {post.featured && (
                  <Badge variant="default" className="bg-primary text-white">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              
              <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
                {post.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/30 text-white/90">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 dark:prose-headings:text-white dark:prose-p:text-gray-300">
                    <MDXRemote source={post.content} components={mdxComponents} />
                  </article>

                  {/* FAQs Section */}
                  {post.faqs && post.faqs.length > 0 && (
                    <div className="mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Frequently Asked Questions
                      </h2>
                      <div className="space-y-6">
                        {post.faqs.map((faq, index) => (
                          <Card key={index} className="border shadow-sm">
                            <CardContent className="p-6">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {faq.question}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300">
                                {faq.answer}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Section */}
                  {(post.ctaTitle || post.ctaDescription) && (
                    <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                      <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {post.ctaTitle || "Need Professional Help?"}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                          {post.ctaDescription || "Our Gas Safe engineers are ready to help with any boiler issue."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <TrackedPhoneLink
                            phone={(post.ctaButtonLink || `tel:${businessInfo.phone.freephone}`).replace('tel:', '').replace(/\s/g, "")}
                            trackingLocation="blog_post"
                            trackingSource="inline_cta"
                            className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-gray-900 transition-colors"
                            ariaLabel={post.ctaButtonText || "Call Now"}
                          >
                            <Phone className="mr-2 h-5 w-5" />
                            {post.ctaButtonText || "Call Now"}
                          </TrackedPhoneLink>
                          <Button asChild variant="outline" size="lg">
                            <Link href="/contact">
                              Get Free Quote
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-8">
                    {/* Quick Contact */}
                    <Card className="bg-secondary text-white">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-lg font-bold mb-4">Need Help Now?</h3>
                        <p className="text-sm text-white/90 mb-4">
                          Same-day service available
                        </p>
                        <TrackedPhoneLink
                          phone={businessInfo.phone.freephone.replace(/\s/g, "")}
                          trackingLocation="blog_post"
                          trackingSource="sidebar_quick_contact"
                          className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-gray-900 transition-colors"
                          ariaLabel={businessInfo.phone.freephone}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          {businessInfo.phone.freephone}
                        </TrackedPhoneLink>
                      </CardContent>
                    </Card>

                    {/* Article Info */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                          Article Info
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Published: {new Date(post.date).toLocaleDateString('en-GB')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Reading time: {post.readingTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>Author: {post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-primary">Gas Safe Approved</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Share */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                          Share This Article
                        </h3>
                        <Button variant="outline" className="w-full">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Article
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.slug} className="overflow-hidden transition-shadow hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary">
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <span>{relatedPost.author}</span>
                          <span>{relatedPost.readingTime}</span>
                        </div>
                        <Button asChild size="sm" className="w-full" variant="outline">
                          <Link href={`/blog/${relatedPost.slug}`}>
                            Read Article
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Smart Content Links */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <SmartContentLinks 
                content={`${post.title} ${post.tags.join(' ')} ${post.location || ''} ${post.service || ''}`}
                currentService={post.service}
                currentLocation={post.location}
              />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 border-t bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl flex justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              
              <Button asChild>
                <Link href="/contact">
                  Get Expert Help
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
