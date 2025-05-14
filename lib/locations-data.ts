export interface Location {
  slug: string
  name: string
  postcode: string
  blurb: string
  landmarks: string[]
  mapEmbedId: string
  mapUrl: string
}

export const locations: Location[] = [
  {
    slug: "birmingham",
    name: "Birmingham",
    postcode: "B1-B50",
    blurb: "Serving all Birmingham postcodes including B1-B50 with fast, reliable boiler services.",
    landmarks: ["Bullring Shopping Centre", "Birmingham New Street Station", "Edgbaston Cricket Ground"],
    mapEmbedId:
      "!1m18!1m12!1m3!1d77861.89388307103!2d-1.9726884187499872!3d52.48180255000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham!5e0!3m2!1sen!2suk!4v1652364112081!5m2!1sen!2suk",
    mapUrl: "https://g.page/birmingham-boiler-repairs",
  },
  {
    slug: "solihull",
    name: "Solihull",
    postcode: "B90-B94",
    blurb: "Serving Solihull and surrounding areas including B90-B94 postcodes with expert boiler services.",
    landmarks: ["Touchwood Shopping Centre", "Tudor Grange Park", "Solihull Ice Rink"],
    mapEmbedId:
      "!1m18!1m12!1m3!1d38957.984443913534!2d-1.8061383739257807!3d52.41234610000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870b8a0cefb5d15%3A0x86a2e8f6656f9e19!2sSolihull!5e0!3m2!1sen!2suk!4v1652364187654!5m2!1sen!2suk",
    mapUrl: "https://g.page/birmingham-boiler-repairs",
  },
  {
    slug: "dudley",
    name: "Dudley",
    postcode: "DY1-DY9",
    blurb: "Covering all Dudley postcodes DY1-DY9 with professional boiler repair and servicing.",
    landmarks: ["Dudley Zoo and Castle", "Black Country Living Museum", "Merry Hill Shopping Centre"],
    mapEmbedId:
      "!1m18!1m12!1m3!1d38990.676976274!2d-2.1000273739257807!3d52.5123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b3d066eb7a1%3A0x9f5d0f9cd7dddddb!2sDudley!5e0!3m2!1sen!2suk!4v1652364234567!5m2!1sen!2suk",
    mapUrl: "https://g.page/birmingham-boiler-repairs",
  },
  {
    slug: "bromsgrove",
    name: "Bromsgrove",
    postcode: "B60-B61",
    blurb: "Providing boiler services throughout Bromsgrove B60-B61 and neighboring areas.",
    landmarks: ["Sanders Park", "Bromsgrove High Street", "Avoncroft Museum"],
    mapEmbedId:
      "!1m18!1m12!1m3!1d38990.676976274!2d-2.0567893739257807!3d52.3345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870b7a0f6b3f2a7%3A0x9f5d0f9cd7dddddb!2sBromsgrove!5e0!3m2!1sen!2suk!4v1652364345678!5m2!1sen!2suk",
    mapUrl: "https://g.page/birmingham-boiler-repairs",
  },
  {
    slug: "wolverhampton",
    name: "Wolverhampton",
    postcode: "WV1-WV14",
    blurb: "Serving all Wolverhampton postcodes WV1-WV14 with reliable boiler repair and maintenance.",
    landmarks: ["Molineux Stadium", "West Park", "Wolverhampton Grand Theatre"],
    mapEmbedId:
      "!1m18!1m12!1m3!1d38957.984443913534!2d-2.1234563739257807!3d52.5876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487080d43225d7fd%3A0x9f5d0f9cd7dddddb!2sWolverhampton!5e0!3m2!1sen!2suk!4v1652364456789!5m2!1sen!2suk",
    mapUrl: "https://g.page/birmingham-boiler-repairs",
  },
]

export const services = [
  {
    slug: "boiler-repairs",
    name: "Boiler Repairs",
    description:
      "Fast, reliable boiler repair service with no call-out fee. Same-day service available when booked before 12pm.",
    features: ["No call-out fee", "No diagnosis fee", "Same-day & weekend options", "Parts for major brands stocked"],
    pricing: [
      {
        title: "Standard Repair",
        price: "£99",
        description: "Diagnosis and repair of common faults (excludes parts)",
      },
      {
        title: "Weekend/Evening",
        price: "£129",
        description: "Out-of-hours emergency service",
      },
      {
        title: "Full System Check",
        price: "£79",
        description: "Comprehensive diagnostic if multiple issues suspected",
      },
    ],
  },
  {
    slug: "boiler-servicing",
    name: "Boiler Servicing",
    description:
      "Keep your boiler safe and efficient with our professional servicing. Standard and full service options available.",
    features: [
      "30-minute standard service",
      "Deep clean heat cell (full service)",
      "Flue gas readings",
      "Gas pressure checks",
    ],
    pricing: [
      {
        title: "Standard Service",
        price: "£55",
        description: "Essential safety checks and efficiency optimization",
      },
      {
        title: "Full Service",
        price: "£120",
        description: "Deep clean of heat exchanger and components",
      },
      {
        title: "Service & Repair",
        price: "£99",
        description: "Combined service and minor repair (saves £30)",
      },
    ],
  },
  {
    slug: "gas-safety",
    name: "Gas Safety Inspections",
    description:
      "Certified gas safety checks for homeowners and landlords. Digital certificates provided with reminder service.",
    features: ["Digital certificates", "Reminder service", "No VAT charged", "Landlord certificates"],
    pricing: [
      {
        title: "1 Appliance",
        price: "£45",
        description: "Safety check for a single gas appliance",
      },
      {
        title: "2 Appliances",
        price: "£50",
        description: "Safety check for two gas appliances",
      },
      {
        title: "3 Appliances",
        price: "£60",
        description: "Safety check for three gas appliances",
      },
    ],
  },
  {
    slug: "ferroli-specialists",
    name: "Ferroli Specialists",
    description:
      "Approved specialist for Ferroli boiler repair and maintenance. Expert knowledge of Ferroli systems and components.",
    features: ["Specialist knowledge", "Approved technicians", "Genuine parts", "Extended warranties"],
    pricing: [
      {
        title: "Ferroli Repair",
        price: "£99",
        description: "Specialist diagnosis and repair for Ferroli boilers",
      },
      {
        title: "Ferroli Service",
        price: "£65",
        description: "Specialized service for Ferroli boiler systems",
      },
      {
        title: "Parts Replacement",
        price: "From £50",
        description: "Genuine Ferroli parts with professional installation",
      },
    ],
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug)
}

export function getServiceBySlug(slug: string): any | undefined {
  return services.find((service) => service.slug === slug)
}
