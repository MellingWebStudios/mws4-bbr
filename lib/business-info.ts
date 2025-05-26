/**
 * Centralized business information for NAP consistency
 * This file serves as a single source of truth for business details
 * across the website, ensuring consistency for SEO purposes.
 */

export const businessInfo = {
  name: "Birmingham Boiler Repairs",
  address: {
    street: "18 Camino Road",
    locality: "Birmingham",
    region: "West Midlands",
    postalCode: "B32 3XE",
    country: "GB",
    // Formatted versions for different display needs
    formatted: {
      short: "18 Camino Road, Birmingham B32 3XE",
      full: "18 Camino Road, Birmingham, West Midlands B32 3XE",
      multiline: "18 Camino Road\nBirmingham\nWest Midlands\nB32 3XE",
    },
  },
  phone: {
    freephone: "0800 320 2345",
    mobile: "07807 776 411",
    // International format for schema
    international: "+448003202345",
  },
  email: "boilers.birmingham@yahoo.com",
  gasSafeNumber: "520077",
  website: "https://www.birminghamboilerrepairs.uk",
  socialMedia: {
    google: "https://g.page/birmingham-boiler-repairs",
    facebook: "https://facebook.com/birmboilers",
    instagram: "https://instagram.com/birminghamboilerrepairs",
  },
  openingHours: {
    weekdays: "9:00 - 17:00",
    saturday: "Closed",
    sunday: "Closed",
  },
}

export default businessInfo
