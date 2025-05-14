export interface Review {
  author: string
  rating: number
  date: string
  text: string
  service: "repair" | "service" | "gas-safety"
  location?: string
}

export const reviews: Review[] = [
  {
    author: "James Wilson",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent service! Engineer arrived on time and fixed our boiler quickly. Very professional and explained everything clearly. Will definitely use again.",
    service: "repair",
    location: "Birmingham",
  },
  {
    author: "Sarah Thompson",
    rating: 5,
    date: "1 month ago",
    text: "Called in the morning about my broken boiler in Solihull, and they had an engineer at my house by lunchtime. The repair was completed efficiently and at the price quoted.",
    service: "repair",
    location: "Solihull",
  },
  {
    author: "Michael Brown",
    rating: 4,
    date: "3 weeks ago",
    text: "Good service for my annual boiler check. Engineer was knowledgeable and thorough. Gave some useful tips for maintaining efficiency.",
    service: "service",
    location: "Dudley",
  },
  {
    author: "Emma Davis",
    rating: 5,
    date: "2 months ago",
    text: "Very impressed with the gas safety inspection. The engineer was punctual, professional and completed the work quickly. Received my certificate the same day.",
    service: "gas-safety",
    location: "Bromsgrove",
  },
  {
    author: "Robert Johnson",
    rating: 5,
    date: "1 month ago",
    text: "Fantastic service in Wolverhampton! My boiler broke down in the evening and they came out first thing the next morning. Fixed it within an hour. Highly recommend!",
    service: "repair",
    location: "Wolverhampton",
  },
  {
    author: "Lisa Parker",
    rating: 5,
    date: "3 weeks ago",
    text: "Annual service completed efficiently and professionally. Engineer explained what he was doing and gave the boiler a clean bill of health. Very happy with the service.",
    service: "service",
    location: "Birmingham",
  },
  {
    author: "David Williams",
    rating: 4,
    date: "1 month ago",
    text: "Good service for landlord gas safety certificates in Solihull. Reasonable price and quick turnaround. Will use again for my other properties.",
    service: "gas-safety",
    location: "Solihull",
  },
  {
    author: "Jennifer Smith",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent repair service in Dudley. Engineer diagnosed the problem quickly and had the parts needed in his van. My boiler is working better than ever!",
    service: "repair",
    location: "Dudley",
  },
  {
    author: "Thomas Green",
    rating: 5,
    date: "1 month ago",
    text: "Very professional service in Bromsgrove. The engineer was friendly, knowledgeable and left everything clean and tidy. Will definitely use again next year.",
    service: "service",
    location: "Bromsgrove",
  },
  {
    author: "Patricia Hughes",
    rating: 5,
    date: "3 weeks ago",
    text: "Fantastic gas safety inspection in Wolverhampton. Engineer was thorough and explained everything clearly. Received my certificate promptly. Great service!",
    service: "gas-safety",
    location: "Wolverhampton",
  },
  {
    author: "Richard Taylor",
    rating: 4,
    date: "2 months ago",
    text: "Good repair service in Birmingham. Engineer arrived within the time slot and fixed the issue efficiently. Reasonable price too.",
    service: "repair",
    location: "Birmingham",
  },
  {
    author: "Karen White",
    rating: 5,
    date: "1 month ago",
    text: "Excellent annual service in Solihull. The engineer was very thorough and gave me some useful advice on getting the most out of my boiler. Very happy!",
    service: "service",
    location: "Solihull",
  },
]

export const getAverageRating = (): number => {
  if (reviews.length === 0) return 0

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  return Number.parseFloat((totalRating / reviews.length).toFixed(1))
}

export const getTotalReviews = (): number => {
  return reviews.length
}
