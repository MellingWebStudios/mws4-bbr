import businessInfo from "@/lib/business-info"

interface VideoSchemaProps {
  videos: Array<{
    id: string
    title: string
    videoId: string
    description: string
  }>
  pageUrl: string
  pageTitle: string
}

export default function VideoSchema({ videos, pageUrl, pageTitle }: VideoSchemaProps) {
  // Map video durations (you can make this dynamic if you have actual durations)
  const videoDurations = {
    pressure: "PT1M30S", // 1 minute 30 seconds
    reset: "PT2M15S",    // 2 minutes 15 seconds
    radiators: "PT3M30S" // 3 minutes 30 seconds
  }
  
  const videoObjects = videos.map((video, index) => ({
    "@type": "VideoObject",
    "@id": `${pageUrl}#video-${video.id}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`
    ],
    uploadDate: "2024-01-15T00:00:00Z", // You can make this dynamic
    duration: videoDurations[video.id as keyof typeof videoDurations] || "PT2M", // Use specific durations
    contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      logo: {
        "@type": "ImageObject",
        url: `${businessInfo.website}/images/boiler-mascot-logo-512.png`,
        width: 512,
        height: 512
      }
    },
    creator: {
      "@type": "Organization",
      name: businessInfo.name
    },
    // Add interaction statistics if available
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: 1000 // You can update this with actual view counts
      }
    ],
    // Keywords relevant to your business
    keywords: [
      "boiler maintenance",
      "DIY boiler repair", 
      "boiler troubleshooting",
      "Birmingham boiler repairs",
      video.title.toLowerCase()
    ].join(", "),
    // Video is embedded on your page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    },
    // Associate with your business
    about: {
      "@type": "Thing",
      name: "Boiler Maintenance",
      description: "Professional boiler maintenance and repair services"
    },
    // Target audience
    audience: {
      "@type": "Audience",
      audienceType: "Homeowners"
    },
    // Educational nature
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "teaches",
      targetName: "Boiler Maintenance Skills"
    },
    // Add video-specific properties Google looks for
    genre: "Educational",
    isFamilyFriendly: true,
    inLanguage: "en-GB",
    regionsAllowed: ["GB", "IE"], // UK and Ireland
    
    // Video quality and technical details
    videoQuality: "HD",
    encodingFormat: "video/mp4",
    
    // Educational content indicators
    learningResourceType: "Tutorial",
    educationalUse: "instruction",
    
    // Specific to your business/content
    isAccessibleForFree: true,
    usageInfo: "Free for personal use",
    
    // Position in the list
    position: index + 1,
    
    // Additional context for the video
    mentions: [
      {
        "@type": "Thing",
        name: "Boiler Maintenance",
        description: "Regular maintenance tasks for domestic boilers"
      },
      {
        "@type": "Organization", 
        name: businessInfo.name,
        description: "Gas Safe registered heating engineers"
      }
    ],
    
    // Video transcript availability (if you have them)
    hasTranscript: false, // Set to true if you add transcripts
    
    // Content rating
    contentRating: "General Audiences"
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            // WebPage schema for the guides page
            {
              "@type": "WebPage",
              "@id": pageUrl,
              url: pageUrl,
              name: pageTitle,
              description: "Free boiler maintenance video guides from Birmingham Boiler Repairs. Learn DIY repairs and maintenance.",
              mainEntity: {
                "@id": `${pageUrl}#videolist`
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.birminghamboilerrepairs.uk"
                  },
                  {
                    "@type": "ListItem", 
                    position: 2,
                    name: "Maintenance Guides",
                    item: pageUrl
                  }
                ]
              },
              publisher: {
                "@type": "Organization",
                name: businessInfo.name
              },
              isPartOf: {
                "@type": "WebSite",
                name: businessInfo.name,
                url: businessInfo.website
              }
            },
            // ItemList containing all videos
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#videolist`,
              name: pageTitle,
              description: "Free boiler maintenance video guides from Birmingham Boiler Repairs",
              numberOfItems: videos.length,
              itemListElement: videos.map((video, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "VideoObject",
                  "@id": `${pageUrl}#video-${video.id}`,
                  url: `${pageUrl}#${video.id}`
                }
              }))
            },
            // Individual video objects
            ...videoObjects,
            // VideoGallery to group them
            {
              "@type": "VideoGallery", 
              "@id": `${pageUrl}#gallery`,
              name: pageTitle,
              description: "Complete collection of boiler maintenance guides",
              video: videoObjects.map(video => ({
                "@id": video["@id"]
              })),
              publisher: {
                "@type": "Organization",
                name: businessInfo.name
              }
            }
          ]
        })
      }}
    />
  )
}
