import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  excerpt: string
  date: string
  publishedAt: string
  lastModified: string
  category: string
  tags: string[]
  location?: string
  service?: string
  author: string
  readingTime: string
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  relatedPosts?: string[]
  schema?: 'article' | 'faq' | 'how-to'
  faqs?: Array<{
    question: string
    answer: string
  }>
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  try {
    // Ensure the content/blog directory exists
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.(mdx|md)$/, '')
        return getPostBySlug(slug)
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return allPostsData
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    // Try .mdx first, then .md
    let fileContents: string
    let filePath: string
    
    if (fs.existsSync(fullPath)) {
      filePath = fullPath
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } else {
      const mdPath = path.join(postsDirectory, `${slug}.md`)
      if (fs.existsSync(mdPath)) {
        filePath = mdPath
        fileContents = fs.readFileSync(mdPath, 'utf8')
      } else {
        return null
      }
    }

    const { data, content } = matter(fileContents)
    const stats = fs.statSync(filePath)
    const readTime = readingTime(content)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      excerpt: data.excerpt || content.substring(0, 160) + '...',
      date: data.date || stats.birthtime.toISOString(),
      publishedAt: data.date || stats.birthtime.toISOString(),
      lastModified: data.lastModified || stats.mtime.toISOString(),
      category: data.category || 'how-to',
      tags: data.tags || [],
      location: data.location,
      service: data.service,
      author: data.author || 'Birmingham Boiler Repairs Team',
      readingTime: readTime.text,
      featured: data.featured || false,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      canonicalUrl: data.canonicalUrl,
      relatedPosts: data.relatedPosts || [],
      schema: data.schema || 'article',
      faqs: data.faqs || [],
      ctaTitle: data.ctaTitle,
      ctaDescription: data.ctaDescription,
      ctaButtonText: data.ctaButtonText || 'Get a Free Quote',
      ctaButtonLink: data.ctaButtonLink || 'tel:08003202345',
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => {
    // Convert current tag to different formats for matching
    const normalizedTag = tag.toLowerCase();
    const spacedTag = normalizedTag.replace(/-/g, ' ');
    const hyphenatedTag = normalizedTag.replace(/\s+/g, '-');
    
    return post.tags.some(postTag => {
      const normalizedPostTag = postTag.toLowerCase();
      return normalizedPostTag === normalizedTag || 
             normalizedPostTag === spacedTag || 
             normalizedPostTag === hyphenatedTag;
    });
  });
}

// Alias functions for consistency with the component imports
export function getBlogPosts(): BlogPost[] {
  return getAllPosts()
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => {
    // Convert current tag to different formats for matching
    const normalizedTag = tag.toLowerCase();
    const spacedTag = normalizedTag.replace(/-/g, ' ');
    const hyphenatedTag = normalizedTag.replace(/\s+/g, '-');
    
    return post.tags.some(postTag => {
      const normalizedPostTag = postTag.toLowerCase();
      return normalizedPostTag === normalizedTag || 
             normalizedPostTag === spacedTag || 
             normalizedPostTag === hyphenatedTag;
    });
  });
}

export function getBlogPost(slug: string): BlogPost | null {
  return getPostBySlug(slug)
}

export function getPostsByLocation(location: string): BlogPost[] {
  return getAllPosts().filter((post) => post.location === location)
}

export function getPostsByService(service: string): BlogPost[] {
  return getAllPosts().filter((post) => post.service === service)
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured).slice(0, 6)
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug)
  
  // First try to get posts with same tags
  const relatedByTags = allPosts.filter((post) =>
    post.tags.some((tag) => currentPost.tags.includes(tag))
  )

  // Then try to get posts with same category
  const relatedByCategory = allPosts.filter((post) =>
    post.category === currentPost.category
  )

  // Combine and deduplicate
  const related = [...relatedByTags, ...relatedByCategory]
  const unique = related.filter((post, index, self) =>
    index === self.findIndex((p) => p.slug === post.slug)
  )

  return unique.slice(0, limit)
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = allPosts.flatMap((post) => post.tags)
  // Convert tags to slug format for consistent URLs
  const slugifiedTags = tags.map(tag => 
    tag.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  )
  return [...new Set(slugifiedTags)].sort()
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = allPosts.map((post) => post.category)
  return [...new Set(categories)]
}

// SEO utilities
export function generateBlogSitemap(): string {
  const posts = getAllPosts()
  
  const urls = posts.map((post) => {
    const lastmod = new Date(post.lastModified).toISOString().split('T')[0]
    return `
  <url>
    <loc>https://www.birminghamboilerrepairs.uk/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  }).join('')

  return urls
}
