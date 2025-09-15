import { type Location, services } from './locations-data';

// Service type based on the services array structure
type Service = typeof services[0];

// Unique content variations for different combinations
export const localInsights = {
  "bournbrook": [
    "Bournbrook's Victorian and Edwardian housing stock often features original cast iron radiators and older heating systems that require specialist knowledge.",
    "Many Bournbrook residents are students at nearby University of Birmingham, requiring quick turnaround times for heating repairs.",
    "The mix of period properties and modern conversions in Bournbrook means we encounter diverse heating system configurations.",
    "Bournbrook's proximity to the university means many properties are rental accommodations requiring annual gas safety certificates.",
  ],
  "california": [
    "California's residential streets feature a mix of 1930s semi-detached homes and modern developments, each with unique heating requirements.",
    "The established community in California values reliable long-term heating solutions and preventative maintenance.",
    "California residents often choose energy-efficient boiler upgrades to reduce heating costs in these family homes.",
    "The tree-lined streets of California provide a peaceful setting where efficient, quiet boiler operation is particularly valued.",
  ],
  "sparkbrook": [
    "Sparkbrook's diverse community includes many multi-generational families requiring reliable heating systems year-round.",
    "The area's mix of traditional terraced houses and modern apartments presents varied heating challenges and opportunities.",
    "Sparkbrook residents value cost-effective heating solutions that provide excellent performance without breaking the budget.",
    "Cultural cooking requirements in Sparkbrook often mean kitchens need robust hot water systems for family meal preparation.",
  ],
  "streetly": [
    "Streetly's affluent residential area features larger family homes with complex heating systems requiring expert maintenance.",
    "The mature gardens and established properties in Streetly often have outbuildings requiring heating system extensions.",
    "Streetly homeowners typically invest in premium heating solutions for long-term reliability and energy efficiency.",
    "The rural feel of Streetly means some properties rely on oil or LPG systems alongside traditional gas boilers.",
  ],
  "dodford": [
    "Dodford's rural setting means some properties are off the main gas network, requiring LPG or oil heating expertise.",
    "The village's older properties often feature original fireplaces that homeowners want to complement with modern heating.",
    "Dodford's community values local tradespeople who understand the specific challenges of rural heating systems.",
    "The scenic location means heating installations must be sympathetic to the rural character of properties.",
  ],
  "over-green": [
    "Over Green's residential development features modern homes with contemporary heating systems requiring specialist knowledge.",
    "The family-oriented community in Over Green prioritizes safe, efficient heating for children and elderly residents.",
    "Over Green's newer properties often feature underfloor heating systems that require different maintenance approaches.",
    "The suburban setting of Over Green allows for easy access for emergency heating repairs and routine maintenance.",
  ]
};

export const brandSpecificInfo = {
  "atag": {
    expertise: "ATAG boilers are known for their Dutch engineering excellence and high-efficiency performance. Our engineers are trained in ATAG's unique modulation technology.",
    common_issues: [
      "ATAG flame sensing issues requiring specialist diagnostic equipment",
      "Modulation valve problems specific to ATAG's advanced control systems",
      "Heat exchanger scaling in ATAG units due to hard water areas",
      "PCB faults requiring ATAG-specific replacement components"
    ],
    local_stock: "We maintain genuine ATAG parts locally for faster repairs",
    warranty: "All ATAG repairs covered by our comprehensive warranty"
  },
  "alpha-boiler": {
    expertise: "Alpha Boilers combine innovation with reliability. Our team specializes in Alpha's E-Tec and CD range servicing and repairs.",
    common_issues: [
      "Alpha E-Tec condensate trap blockages requiring specialist cleaning",
      "CD series diverter valve failures and replacement procedures",
      "Alpha-specific error codes requiring manufacturer diagnostic protocols",
      "Heat exchanger maintenance for Alpha's compact design systems"
    ],
    local_stock: "Comprehensive Alpha parts inventory for immediate repairs",
    warranty: "Extended warranty available on all Alpha boiler services"
  },
  "biasi": {
    expertise: "Biasi's Italian engineering requires specific knowledge of their unique design features and component specifications.",
    common_issues: [
      "Biasi pressure relief valve replacements with correct specifications",
      "Fan assembly issues specific to Biasi's ventilation design",
      "Control board diagnostics for Biasi's electronic management systems",
      "Pump overrun problems requiring Biasi-approved solutions"
    ],
    local_stock: "Genuine Biasi components sourced directly from approved suppliers",
    warranty: "Manufacturer-backed warranty on all Biasi repairs"
  },
  "ferroli": {
    expertise: "Ferroli specialists with over 15 years experience in their condensing and conventional range maintenance.",
    common_issues: [
      "Ferroli diverter valve sticking requiring specific lubricants",
      "Condensate pump failures in Ferroli's high-efficiency models",
      "PCB moisture damage prevention and repair in Ferroli units",
      "Fan pressure switch adjustments for Ferroli's ventilation systems"
    ],
    local_stock: "Extensive Ferroli parts warehouse for same-day repairs",
    warranty: "Extended parts and labor warranty on Ferroli services"
  },
  "glowworm": {
    expertise: "Glowworm heritage combined with modern Vaillant technology requires specialist knowledge of both systems.",
    common_issues: [
      "Glowworm Flexicom series DHW sensor replacements",
      "Compact series heat exchanger descaling procedures",
      "Control knob and display issues in older Glowworm models",
      "Pump and valve maintenance in Glowworm combination units"
    ],
    local_stock: "Both legacy Glowworm and current Vaillant-Glowworm parts available",
    warranty: "Comprehensive warranty covering Glowworm's full range"
  },
  "heatline": {
    expertise: "Heatline's value-focused engineering requires cost-effective repair solutions while maintaining reliability.",
    common_issues: [
      "Heatline Capriz series DHW plate heat exchanger blockages",
      "Gas valve calibration issues in Heatline units",
      "PCB replacement procedures for Heatline's control systems",
      "Expansion vessel recharging in Heatline combination boilers"
    ],
    local_stock: "Cost-effective Heatline parts for budget-conscious repairs",
    warranty: "Competitive warranty terms for Heatline services"
  },
  "ideal-boilers": {
    expertise: "Ideal Boilers' Logic and Vogue ranges require specialist knowledge of their advanced control systems and efficiency features.",
    common_issues: [
      "Ideal Logic series ignition sequence problems",
      "Vogue range DHW temperature stability issues",
      "Control panel fault diagnosis in Ideal's digital systems",
      "Pump overrun timer settings in Ideal combination units"
    ],
    local_stock: "Complete Ideal Boilers parts inventory for immediate service",
    warranty: "Extended warranty available matching Ideal's manufacturer terms"
  },
  "intergas": {
    expertise: "Intergas HRE and Rapid series feature unique single heat exchanger design requiring specialist maintenance knowledge.",
    common_issues: [
      "Intergas HRE series heat exchanger inspection and cleaning",
      "Rapid series modulation control valve adjustments",
      "PCB diagnostics for Intergas electronic controls",
      "Condensate neutralizer maintenance in Intergas systems"
    ],
    local_stock: "Specialized Intergas components including unique single heat exchangers",
    warranty: "Manufacturer-aligned warranty for all Intergas services"
  },
  "main-boiler": {
    expertise: "Main boilers require knowledge of their specific engineering approach and component interactions.",
    common_issues: [
      "Main boiler control system diagnostics and repairs",
      "Heat exchanger maintenance for Main's efficiency designs",
      "Pump and valve coordination in Main heating systems",
      "Electronic control board replacement and programming"
    ],
    local_stock: "Main boiler parts sourced from approved distribution network",
    warranty: "Comprehensive coverage for Main boiler repairs and maintenance"
  },
  "potterton": {
    expertise: "Potterton's heritage brand requires knowledge spanning from classic models to modern Titanium series systems.",
    common_issues: [
      "Potterton Titanium series ignition electrode cleaning",
      "Classic Potterton pilot light assembly maintenance",
      "PCB replacement in modern Potterton combination units",
      "DHW sensor calibration in Potterton heating systems"
    ],
    local_stock: "Both heritage and modern Potterton parts maintained in stock",
    warranty: "Long-term warranty reflecting Potterton's reliability heritage"
  },
  "vaillant": {
    expertise: "Vaillant ecoTEC and Turbo series represent German engineering excellence requiring specialist training and genuine parts.",
    common_issues: [
      "Vaillant ecoTEC condensate drain maintenance",
      "Turbo series fan pressure switch adjustments",
      "Weather compensation control programming",
      "Heat exchanger descaling in hard water areas"
    ],
    local_stock: "Genuine Vaillant parts warehouse ensuring authentic components",
    warranty: "Extended warranty matching Vaillant's premium standards"
  },
  "viessmann": {
    expertise: "Viessmann Vitodens series represents cutting-edge condensing technology requiring advanced diagnostic capabilities.",
    common_issues: [
      "Viessmann Vitodens modulation valve calibration",
      "MatriX burner cleaning and maintenance procedures",
      "Control unit programming for Viessmann systems",
      "Heat exchanger inspection in Viessmann high-efficiency units"
    ],
    local_stock: "Premium Viessmann components for professional installations",
    warranty: "Extended warranty reflecting Viessmann's premium positioning"
  },
  "vokera": {
    expertise: "Vokera's compact design philosophy requires specific knowledge of space-saving component arrangements.",
    common_issues: [
      "Vokera Compact series DHW plate heat exchanger maintenance",
      "Gas valve adjustment procedures for Vokera units",
      "PCB moisture protection in Vokera's compact designs",
      "Pump head pressure optimization in Vokera systems"
    ],
    local_stock: "Compact Vokera parts designed for space-efficient repairs",
    warranty: "Warranty terms optimized for Vokera's reliability record"
  },
  "worcester-bosch": {
    expertise: "Worcester Bosch Greenstar series represents market-leading reliability, requiring certified training for optimal service.",
    common_issues: [
      "Worcester Greenstar condensate trap cleaning procedures",
      "CDi series diverter valve maintenance",
      "PCB fault diagnosis in Worcester's electronic systems",
      "Heat exchanger descaling in Worcester high-efficiency units"
    ],
    local_stock: "Extensive Worcester Bosch parts inventory for immediate service",
    warranty: "Market-leading warranty terms matching Worcester's reputation"
  }
};

export const serviceSpecificContent = {
  "boiler-repairs": {
    urgency: "Emergency boiler repairs available 24/7",
    process: "Our diagnostic process identifies root causes, not just symptoms",
    guarantee: "All repairs covered by comprehensive warranty"
  },
  "boiler-servicing": {
    urgency: "Annual servicing to prevent costly breakdowns",
    process: "Comprehensive 50-point inspection and maintenance",
    guarantee: "Service includes efficiency optimization and safety checks"
  },
  "gas-safety": {
    urgency: "Legally required annual gas safety inspections",
    process: "Thorough testing of all gas appliances and installations",
    guarantee: "Full compliance certification and safety documentation"
  },
  "combination-boiler-repairs": {
    urgency: "Specialist combination boiler fault diagnosis",
    process: "Expert repair of DHW and heating system integration",
    guarantee: "Warranty covers both heating and hot water functionality"
  },
  "combination-boiler-services": {
    urgency: "Annual servicing for combination boiler efficiency",
    process: "Dual-function testing and maintenance procedures",
    guarantee: "Optimized performance for heating and hot water"
  }
};

// Seasonal content variations
export const seasonalContent = {
  winter: {
    priority: "critical heating system reliability during cold weather",
    tips: "winter heating system preparation and energy efficiency",
    emergency: "24/7 emergency heating repairs during winter months"
  },
  summer: {
    priority: "planned maintenance and system optimization",
    tips: "summer maintenance for reliable winter performance",
    emergency: "hot water system repairs for year-round comfort"
  },
  spring: {
    priority: "post-winter system health checks and efficiency tuning",
    tips: "spring preparation for efficient heating operation",
    emergency: "system upgrades and efficiency improvements"
  },
  autumn: {
    priority: "pre-winter system preparation and safety checks",
    tips: "autumn heating system preparation for winter",
    emergency: "preventative maintenance to avoid winter breakdowns"
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
    locationSpecificIntro: locationInsights[0] || `${location.name} residents trust our local expertise for reliable heating solutions.`,
    secondaryInsight: locationInsights[1] || `Our engineers understand the unique heating challenges in ${location.name}.`,
    brandExpertise: brandInfo?.expertise || null,
    commonIssues: brandInfo?.common_issues || [],
    serviceUrgency: serviceInfo?.urgency || "Professional heating services when you need them",
    processDescription: serviceInfo?.process || "Expert diagnosis and professional repair service",
    guaranteeInfo: serviceInfo?.guarantee || "All work covered by comprehensive warranty",
    seasonalRelevance: seasonal.priority,
    localStockInfo: brandInfo?.local_stock || "Comprehensive parts inventory for immediate repairs",
    warrantyDetails: brandInfo?.warranty || "Professional warranty on all work completed",
    emergencyAvailability: seasonal.emergency,
    maintenanceTips: seasonal.tips,
    locationLandmarks: location.landmarks.join(", "),
    postcode: location.postcode,
    uniqueSellingPoints: [
      `Local ${location.name} expertise with ${service.name.toLowerCase()}`,
      `Same-day service available in ${location.postcode} area`,
      `No call-out charges for ${location.name} residents`,
      `Gas Safe registered engineers serving ${location.name}`,
      ...(brandInfo ? [`Specialist ${brandSlug?.replace('-', ' ')} knowledge and genuine parts`] : [])
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
        question: `How quickly can you repair my boiler in ${location.name}?`,
        answer: `We typically arrive in ${location.name} within 60 minutes for emergency repairs. Our local engineers stock common parts for immediate repairs, and we offer same-day service when you book before 12pm.`
      },
      {
        question: `What does a boiler repair cost in ${location.name}?`,
        answer: `Repair costs vary by issue complexity, but we provide transparent pricing with no hidden charges. ${location.name} residents benefit from no call-out fees and competitive rates with all work guaranteed.`
      },
      {
        question: `Do you repair all boiler brands in ${location.name}?`,
        answer: `Yes, our Gas Safe engineers repair all major brands. We're particularly experienced with the heating systems commonly found in ${location.name}'s ${location.postcode} area.`
      }
    ],
    "boiler-servicing": [
      {
        question: `How often should I service my boiler in ${location.name}?`,
        answer: `Annual servicing is recommended for all boilers in ${location.name}. This maintains efficiency, prevents breakdowns, and keeps your warranty valid. We offer convenient scheduling for ${location.name} residents.`
      },
      {
        question: `What's included in a boiler service in ${location.name}?`,
        answer: `Our comprehensive service includes safety checks, efficiency testing, cleaning, and component inspection. ${location.name} customers receive a detailed report and advice on any issues found.`
      },
      {
        question: `Can you service my boiler during winter in ${location.name}?`,
        answer: `Absolutely. We provide year-round servicing in ${location.name}, though autumn servicing is ideal to prepare for winter heating demands in the ${location.postcode} area.`
      }
    ],
    "gas-safety": [
      {
        question: `Is gas safety certification mandatory in ${location.name}?`,
        answer: `Yes, landlords in ${location.name} must have annual gas safety inspections. We provide certified CP12 certificates for all rental properties in the ${location.postcode} area.`
      },
      {
        question: `What happens during a gas safety inspection in ${location.name}?`,
        answer: `We test all gas appliances, check ventilation, inspect pipework and issue safety certificates. ${location.name} property owners receive comprehensive documentation for their records.`
      },
      {
        question: `How much does gas safety certification cost in ${location.name}?`,
        answer: `We offer competitive rates for ${location.name} landlords, with discounts for multiple properties. Contact us for transparent pricing with no hidden charges.`
      }
    ]
  };

  const baseFAQs = baseServiceFAQs[service.slug as keyof typeof baseServiceFAQs] || [];
  
  if (brandSlug && brandSpecificInfo[brandSlug as keyof typeof brandSpecificInfo]) {
    const brandInfo = brandSpecificInfo[brandSlug as keyof typeof brandSpecificInfo];
    baseFAQs.push({
      question: `Do you specialize in ${brandSlug.replace('-specialists', '').replace('-', ' ')} repairs in ${location.name}?`,
      answer: `Yes, we're ${brandSlug.replace('-specialists', '').replace('-', ' ')} specialists serving ${location.name}. ${brandInfo.expertise} We maintain ${brandInfo.local_stock.toLowerCase()} for faster repairs in the ${location.postcode} area.`
    });
  }

  return baseFAQs;
}
