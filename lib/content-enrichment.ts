import { type Location, services } from './locations-data';

// Service type based on the services array structure
type Service = typeof services[0];

// Unique content variations for different combinations
export const localInsights = {
  "bournbrook": [
    "Bournbrook has many older homes with cast iron radiators. These need engineers who know how to work with them.",
    "Many Bournbrook residents are students. They need fast repairs so they're not left without heating.",
    "Bournbrook has a mix of old houses and newer flats. We've worked on all types of heating systems here.",
    "With so many rental homes near the university, we do lots of gas safety checks in Bournbrook.",
  ],
  "california": [
    "California has 1930s homes and newer builds. Each type needs different heating work.",
    "Families in California want boilers that last. They like to get them serviced each year to avoid problems.",
    "Many California homes have switched to new boilers to cut energy bills.",
    "California is a quiet area. Residents here like boilers that run smoothly without noise.",
  ],
  "sparkbrook": [
    "Many families in Sparkbrook have grandparents living with them. They need heating that works all year.",
    "Sparkbrook has terraced houses and flats. We work on all types.",
    "Sparkbrook families want good value. We offer fair prices and quality work.",
    "Many homes in Sparkbrook do lots of cooking. They need plenty of hot water.",
  ],
  "streetly": [
    "Streetly has large family homes with bigger heating systems. These need regular expert care.",
    "Some Streetly homes have garages or annexes that need heating too.",
    "Streetly homeowners often choose top-quality boilers that last longer and save on energy.",
    "Some Streetly homes use oil or LPG heating. We work on these as well as gas boilers.",
  ],
  "dodford": [
    "Dodford is rural so some homes aren't on mains gas. We work on LPG and oil systems too.",
    "Many Dodford homes have old fireplaces. We fit modern heating that works well with these.",
    "Dodford folks like local trades who know about rural heating.",
    "We fit heating that suits the look of Dodford's country homes.",
  ],
  "over-green": [
    "Over Green has modern homes with newer heating systems. We know how to work on these.",
    "Families in Over Green want safe, reliable heating for their kids and parents.",
    "Some newer Over Green homes have underfloor heating. We service these too.",
    "We can reach Over Green quickly for repairs or boiler services.",
  ]
};

export const brandSpecificInfo = {
  "atag": {
    expertise: "ATAG boilers are Dutch-made and very efficient. Our engineers know how to fix them.",
    common_issues: [
      "ATAG flame sensor problems",
      "Control valve issues",
      "Limescale build-up in hard water areas",
      "Circuit board faults"
    ],
    local_stock: "We keep ATAG parts in stock for quick repairs",
    warranty: "All ATAG repairs come with our full warranty"
  },
  "alpha-boiler": {
    expertise: "Alpha boilers are well-made and reliable. We fix the E-Tec and CD ranges.",
    common_issues: [
      "Blocked condensate pipes",
      "Diverter valve faults",
      "Error codes on the display",
      "Heat exchanger cleaning"
    ],
    local_stock: "We stock Alpha parts for quick repairs",
    warranty: "Full warranty on all Alpha work"
  },
  "biasi": {
    expertise: "Biasi boilers are Italian-made. We know how they work and how to fix them.",
    common_issues: [
      "Pressure valve problems",
      "Fan faults",
      "Control board issues",
      "Pump running on too long"
    ],
    local_stock: "We use genuine Biasi parts",
    warranty: "Full warranty on all Biasi repairs"
  },
  "ferroli": {
    expertise: "We've fixed Ferroli boilers for over 15 years.",
    common_issues: [
      "Stuck diverter valves",
      "Condensate pump problems",
      "Water damage to circuit boards",
      "Fan switch issues"
    ],
    local_stock: "We stock Ferroli parts for same-day repairs",
    warranty: "Full parts and labour warranty"
  },
  "glowworm": {
    expertise: "Glowworm boilers are now made by Vaillant. We fix old and new models.",
    common_issues: [
      "Hot water sensor faults",
      "Limescale in the heat exchanger",
      "Display and control problems",
      "Pump and valve issues"
    ],
    local_stock: "We stock parts for old and new Glowworm boilers",
    warranty: "Full warranty on all Glowworm work"
  },
  "heatline": {
    expertise: "Heatline boilers are good value. We fix them at fair prices.",
    common_issues: [
      "Blocked heat exchanger",
      "Gas valve problems",
      "Circuit board faults",
      "Low pressure in expansion vessel"
    ],
    local_stock: "We stock Heatline parts at good prices",
    warranty: "Full warranty on all Heatline work"
  },
  "ideal-boilers": {
    expertise: "Ideal boilers like the Logic and Vogue are popular. We fix them all.",
    common_issues: [
      "Won't light or start up",
      "Hot water temperature goes up and down",
      "Display showing error codes",
      "Pump timer settings wrong"
    ],
    local_stock: "We stock all Ideal parts for quick repairs",
    warranty: "Full warranty to match the maker's terms"
  },
  "intergas": {
    expertise: "Intergas boilers have a unique design. We know how to service and fix them.",
    common_issues: [
      "Heat exchanger cleaning needed",
      "Control valve issues",
      "Circuit board problems",
      "Condensate system maintenance"
    ],
    local_stock: "We stock Intergas parts including their special heat exchangers",
    warranty: "Full warranty in line with Intergas standards"
  },
  "main-boiler": {
    expertise: "Main boilers are well-built. We know how to fix them properly.",
    common_issues: [
      "Control system faults",
      "Heat exchanger needs cleaning",
      "Pump and valve problems",
      "Circuit board replacement"
    ],
    local_stock: "We stock Main boiler parts",
    warranty: "Full warranty on all Main boiler work"
  },
  "potterton": {
    expertise: "Potterton is a trusted name. We fix old models and new Titanium boilers.",
    common_issues: [
      "Ignition electrode needs cleaning",
      "Pilot light problems on older models",
      "Circuit board faults",
      "Hot water sensor issues"
    ],
    local_stock: "We stock parts for old and new Potterton boilers",
    warranty: "Full warranty on all Potterton repairs"
  },
  "vaillant": {
    expertise: "Vaillant ecoTEC boilers are German-made and very reliable. We're trained to fix them.",
    common_issues: [
      "Blocked condensate drain",
      "Fan switch needs adjusting",
      "Weather controls not set right",
      "Limescale in the heat exchanger"
    ],
    local_stock: "We use genuine Vaillant parts only",
    warranty: "Full warranty to match Vaillant's high standards"
  },
  "viessmann": {
    expertise: "Viessmann boilers are top quality. We have the tools to fix them right.",
    common_issues: [
      "Control valve needs adjusting",
      "Burner needs cleaning",
      "Settings need changing",
      "Heat exchanger check needed"
    ],
    local_stock: "We stock quality Viessmann parts",
    warranty: "Full warranty for this premium brand"
  },
  "vokera": {
    expertise: "Vokera boilers are compact and well-designed. We fix them all.",
    common_issues: [
      "Hot water heat exchanger blocked",
      "Gas valve needs adjusting",
      "Circuit board damp damage",
      "Pump pressure too low"
    ],
    local_stock: "We stock compact Vokera parts",
    warranty: "Full warranty on all Vokera work"
  },
  "worcester-bosch": {
    expertise: "Worcester Bosch Greenstar boilers are the UK's best seller. We're trained to fix them.",
    common_issues: [
      "Condensate trap blocked",
      "Diverter valve stuck",
      "Circuit board fault",
      "Limescale build-up"
    ],
    local_stock: "We stock Worcester parts for same-day repairs",
    warranty: "Full warranty to match Worcester's reputation"
  }
};

export const serviceSpecificContent = {
  "boiler-repairs": {
    urgency: "Emergency repairs 24/7",
    process: "We find the real cause, not just a quick fix",
    guarantee: "All repairs are covered by our warranty"
  },
  "boiler-servicing": {
    urgency: "Yearly service stops costly breakdowns",
    process: "Full 50-point check and clean",
    guarantee: "We check safety and help save on energy bills"
  },
  "gas-safety": {
    urgency: "You need a gas check every year by law",
    process: "We test all gas appliances and pipes",
    guarantee: "You get the right paperwork for landlords and tenants"
  },
  "combination-boiler-repairs": {
    urgency: "Combi boiler fault finding",
    process: "We fix both heating and hot water problems",
    guarantee: "Warranty covers all the work we do"
  },
  "combination-boiler-services": {
    urgency: "Yearly service keeps your combi working well",
    process: "We check both heating and hot water",
    guarantee: "Better heating and hot water after we're done"
  }
};

// Seasonal content variations
export const seasonalContent = {
  winter: {
    priority: "keeping your heating working when it's cold",
    tips: "getting your heating ready for winter",
    emergency: "24/7 emergency repairs all winter"
  },
  summer: {
    priority: "getting your boiler serviced while the weather is warm",
    tips: "summer service means no problems in winter",
    emergency: "hot water repairs all year round"
  },
  spring: {
    priority: "checking your heating after winter use",
    tips: "spring checks keep things running well",
    emergency: "upgrades and fixes before next winter"
  },
  autumn: {
    priority: "getting ready for winter cold",
    tips: "autumn is the best time to get your boiler checked",
    emergency: "fix problems now before winter hits"
  }
};

// Generate unique content for location-service combinations
export function generateUniqueContent(location: Location, service: Service, brandSlug?: string) {
  const currentSeason = getCurrentSeason();
  const locationInsights = localInsights[location.slug as keyof typeof localInsights] || [];
  const brandInfo = brandSlug ? brandSpecificInfo[brandSlug as keyof typeof brandSpecificInfo] : null;
  const serviceInfo = serviceSpecificContent[service.slug as keyof typeof serviceSpecificContent];
  const seasonal = seasonalContent[currentSeason];

  return {
    locationSpecificIntro: locationInsights[0] || `${location.name} locals trust us for reliable heating work.`,
    secondaryInsight: locationInsights[1] || `Our engineers know heating systems in ${location.name} well.`,
    brandExpertise: brandInfo?.expertise || null,
    commonIssues: brandInfo?.common_issues || [],
    serviceUrgency: serviceInfo?.urgency || "Expert heating help when you need it",
    processDescription: serviceInfo?.process || "We find the fault and fix it right",
    guaranteeInfo: serviceInfo?.guarantee || "All work has our warranty",
    seasonalRelevance: seasonal.priority,
    localStockInfo: brandInfo?.local_stock || "We stock parts for quick repairs",
    warrantyDetails: brandInfo?.warranty || "Full warranty on all work",
    emergencyAvailability: seasonal.emergency,
    maintenanceTips: seasonal.tips,
    locationLandmarks: location.landmarks.join(", "),
    postcode: location.postcode,
    uniqueSellingPoints: [
      `Local ${location.name} engineers for ${service.name.toLowerCase()}`,
      `Same-day service in ${location.postcode}`,
      `No call-out fee in ${location.name}`,
      `Gas Safe engineers in ${location.name}`,
      ...(brandInfo ? [`We know ${brandSlug?.replace('-', ' ')} boilers and use real parts`] : [])
    ]
  };
}

function getCurrentSeason(): keyof typeof seasonalContent {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

// FAQ generation for specific combinations
export function generateLocationServiceFAQs(location: Location, service: Service, brandSlug?: string) {
  const baseServiceFAQs = {
    "boiler-repairs": [
      {
        question: `How fast can you fix my boiler in ${location.name}?`,
        answer: `We can get to ${location.name} in about an hour for urgent jobs. Our local engineers carry common parts so we can often fix it the same day. Book before midday for same-day service.`
      },
      {
        question: `How much does a boiler repair cost in ${location.name}?`,
        answer: `It depends what's wrong, but we always tell you the price upfront. No hidden fees. ${location.name} locals get our best rates and all work is guaranteed.`
      },
      {
        question: `Do you fix all boiler makes in ${location.name}?`,
        answer: `Yes, we fix all major brands. We know the types of boilers in ${location.name}'s ${location.postcode} homes very well.`
      }
    ],
    "boiler-servicing": [
      {
        question: `How often should I get my boiler serviced in ${location.name}?`,
        answer: `Once a year is best. This keeps it running well, stops breakdowns, and keeps your warranty valid. We make booking easy for ${location.name} customers.`
      },
      {
        question: `What do you check during a boiler service in ${location.name}?`,
        answer: `We do safety checks, test how well it runs, clean it, and look at all the parts. You get a report telling you if anything needs attention.`
      },
      {
        question: `Can you service my boiler in winter in ${location.name}?`,
        answer: `Yes, we work all year round. But autumn is the best time to book, so your boiler is ready for the cold months in ${location.postcode}.`
      }
    ],
    "gas-safety": [
      {
        question: `Do I need a gas safety check in ${location.name}?`,
        answer: `Yes, if you're a landlord in ${location.name} you must get one every year. We give you the CP12 certificate you need for all rentals in ${location.postcode}.`
      },
      {
        question: `What happens during a gas safety check in ${location.name}?`,
        answer: `We test all gas appliances, check air vents, look at pipes, and give you the safety certificate. ${location.name} property owners get full paperwork for their records.`
      },
      {
        question: `How much is a gas safety certificate in ${location.name}?`,
        answer: `We offer good rates for ${location.name} landlords. Got more than one property? Ask about our discounts. Clear pricing with no hidden costs.`
      }
    ]
  };

  const baseFAQs = baseServiceFAQs[service.slug as keyof typeof baseServiceFAQs] || [];
  
  if (brandSlug && brandSpecificInfo[brandSlug as keyof typeof brandSpecificInfo]) {
    const brandInfo = brandSpecificInfo[brandSlug as keyof typeof brandSpecificInfo];
    baseFAQs.push({
      question: `Are you ${brandSlug.replace('-specialists', '').replace('-', ' ')} experts in ${location.name}?`,
      answer: `Yes, we know ${brandSlug.replace('-specialists', '').replace('-', ' ')} boilers well. ${brandInfo.expertise} ${brandInfo.local_stock.charAt(0).toLowerCase() + brandInfo.local_stock.slice(1)} so repairs in ${location.postcode} are fast.`
    });
  }

  return baseFAQs;
}
