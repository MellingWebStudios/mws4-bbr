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
  {
    author: "Sharon Douglas",
    rating: 5,
    date: "1 month ago",
    text: "Excellent prompt service. Very polite and explained everything. Serviced my daughter’s boiler today. Don’t believe all you read in negative reviews.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Richard Everest",
    rating: 5,
    date: "1 month ago",
    text: "Had Jordan come round, explained everything clearly and gave plumbing advice on other issues. Friendly, professional, and quickly solved the issue.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Neezie Halfpenny",
    rating: 5,
    date: "3 months ago",
    text: "Dave fixed my boiler, installed a new pump quickly and left no mess. Great experience for my first time with central heating.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Clive H",
    rating: 5,
    date: "4 months ago",
    text: "Contacted Dave about a minor boiler leak. He came next day, found the fault quickly, explained everything calmly, and fixed it at a great price.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "JP Houghton",
    rating: 5,
    date: "1 month ago",
    text: "Called for help with electric water heater, had a pinhole leak. Good communication, honest advice, and didn’t waste my time. High rating.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Trish Doyle",
    rating: 5,
    date: "5 months ago",
    text: "Dave came out next day, found and replaced a leaking pipe in minutes. No call out charge, just a flat fee. Very reasonable and highly recommended.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Nick Warner",
    rating: 5,
    date: "5 months ago",
    text: "I had two boilers that others said needed replacing. Birmingham Boiler Repairs assessed and repaired both, saving me thousands. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "BB 2rude",
    rating: 5,
    date: "1 month ago",
    text: "Jordon explained everything before fixing the boiler, tidied up, and was very helpful. I would definitely recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Bonnie Gentry",
    rating: 5,
    date: "8 months ago",
    text: "Brilliant company—transparent prices, fixed my boiler and serviced it. We are over the moon with the work and value.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "S C",
    rating: 3,
    date: "7 months ago",
    text: "Boiler service experience was somewhat disappointing. Leak wasn’t checked, expected more thorough service for the price.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Nizz Miah",
    rating: 5,
    date: "9 months ago",
    text: "Had an issue with my boiler that they couldn’t attend due to distance, but Dave gave great advice and showed real care. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Marius Tiberiu Cojocaru",
    rating: 5,
    date: "9 months ago",
    text: "Excellent service. Had a boiler service and gas safety certificate, very knowledgeable professionals, and they gave us a big discount. Totally recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Liz Johnson",
    rating: 5,
    date: "7 months ago",
    text: "Great company, given us good advice. Use them annually for our boiler service. Always reliable and have gone above and beyond.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Ma Pa",
    rating: 5,
    date: "8 months ago",
    text: "Dave was at my house within the hour, fixed the leak and condensation pump the same day. Recommended and will 100% use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Suhail Mulla",
    rating: 5,
    date: "10 months ago",
    text: "Responsive service with clear knowledge and professionalism. Fixed my hot water issue at a very reasonable rate. Would use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Iq Hu",
    rating: 5,
    date: "8 months ago",
    text: "Smooth, quick, efficient. Provided several options for appointments, were personable, gave advice, and offered easy payment options.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Vincenzo De Salvo",
    rating: 5,
    date: "11 months ago",
    text: "Dave was helpful and called me back quickly. Easy to arrange a visit. Very knowledgeable and reassured me about boiler issues.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sammy Taylor",
    rating: 5,
    date: "7 months ago",
    text: "Great guys, very informative about my boiler and the issues. On time and available the next day to fix it.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Oldskoolretro",
    rating: 5,
    date: "8 months ago",
    text: "Used Dave for around 15 years—never let me down. Best prices, professional work, totally recommended.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sheila Bennett",
    rating: 5,
    date: "2 months ago",
    text: "Excellent service, very clean and efficient. Extra work was done due to boiler access but no complaints.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Mark Taylor",
    rating: 5,
    date: "9 months ago",
    text: "Birmingham Boiler Repairs fixed my Worcester Bosch boiler. Open and honest, pleasant to talk to. Highly recommend for trustworthy service.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Samuel Oladiran",
    rating: 5,
    date: "10 months ago",
    text: "Dave and his team are experts—superb customer service, competitive prices. Serviced central heating, boiler, and gas certificates for 3 houses.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Shakeel Javed",
    rating: 5,
    date: "9 months ago",
    text: "Professional, honest, and full of integrity. I will use Dave and team in the future and highly recommend Birmingham Boiler Repairs.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Jath Pathmanathan",
    rating: 5,
    date: "8 months ago",
    text: "First time using Birmingham Boiler Service. On time, friendly, and informative. Affordable and will use again!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "H SK",
    rating: 5,
    date: "1 year ago",
    text: "Dave fixed my boiler and explained everything to help me in the future. Highly recommend for new homeowners.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Adam Casey",
    rating: 5,
    date: "8 months ago",
    text: "Friendly team, fixed my boiler quickly and explained the work. Even my dog loved them. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Maz Ali",
    rating: 5,
    date: "1 year ago",
    text: "Dave did my annual boiler service. Knowledgeable, clean, and respected my request to wear shoe covers. 10/10 service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Adam Haslam",
    rating: 5,
    date: "7 months ago",
    text: "Knowledgeable, honest, and pleasant team—don’t bill extra or make things up. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "A S",
    rating: 5,
    date: "11 months ago",
    text: "Three engineers said I needed a new boiler. Birmingham Boiler Repairs serviced and fixed it—saved me from unnecessary replacement.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Jodie Blaber",
    rating: 5,
    date: "11 months ago",
    text: "Exceptional service—leaky boiler fixed fast, part spotted and replaced before it became a bigger problem.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "F L",
    rating: 5,
    date: "11 months ago",
    text: "Very impressed—transparent pricing, on time, explained what they were doing. My new go-to servicing company.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Matthew Carver",
    rating: 5,
    date: "8 months ago",
    text: "Used Birmingham Boiler Services for years—totally professional and respectful. Highly recommended company.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Faraz Zia",
    rating: 5,
    date: "11 months ago",
    text: "First time using this company. Jordan was thorough and explained everything. Will use again and highly recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Dj Thrash",
    rating: 5,
    date: "2 years ago",
    text: "Fantastic company, outstanding customer service and value for money. Highly recommended for boiler servicing.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Craig Birch",
    rating: 5,
    date: "8 months ago",
    text: "Used them twice—always punctual, good communication, and deliver as promised. Highly recommended.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mohammed Sajid",
    rating: 5,
    date: "11 months ago",
    text: "Others couldn't fix my boiler and quoted high prices. Birmingham Boiler Repairs fixed it quickly—highly recommended.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Ali Omer",
    rating: 1,
    date: "4 months ago",
    text: "Not happy—engineer left a wire unplugged, had to pay someone else to fix it.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Nilesh Patel",
    rating: 5,
    date: "10 months ago",
    text: "Arrived on time, well presented, efficient work at a very reasonable price. Great service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Jenny Fripp",
    rating: 5,
    date: "3 years ago",
    text: "Jordan serviced my boiler—polite, respected my home, efficient service. Very pleased.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "James Heath",
    rating: 5,
    date: "3 years ago",
    text: "Easy to deal with—next day appointment for a full boiler service. Dave explained the process and showed photos. Great service and price.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Pat Colgan",
    rating: 5,
    date: "2 years ago",
    text: "Highly recommend this company. Quick response, arrived the same day and fixed the problem efficiently.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "David Housley",
    rating: 5,
    date: "3 years ago",
    text: "Been with Birmingham Boiler Repairs for 4+ years—professional service, yearly reminders, prompt and friendly. Cannot fault anything.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Lauren Wright",
    rating: 5,
    date: "3 years ago",
    text: "Overdue service and a leak—fitted in quickly, serviced and fixed in no time. Very pleased!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Michael Connelly",
    rating: 5,
    date: "3 years ago",
    text: "Used Dave for over 10 years for boiler services and gas safety certificates. Reliable and trustworthy.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Spencer S",
    rating: 5,
    date: "3 years ago",
    text: "First class service—diagnosed and fixed the problem quickly after others failed. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Karen Loss",
    rating: 5,
    date: "5 years ago",
    text: "Dave sorted our boiler out when insurance let us down. Came ASAP and fixed the issue. Can’t thank him enough.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "John",
    rating: 5,
    date: "1 year ago",
    text: "Used Birmingham Boiler Repairs twice—excellent service and great prices both times. Highly recommended.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Arshan Iqbal",
    rating: 5,
    date: "9 months ago",
    text: "Serviced and repaired my boiler—friendly, professional, and honest advice. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Alicia St Prix",
    rating: 5,
    date: "2 years ago",
    text: "Without heating for days, Dave was responsive and affordable. Didn’t feel ripped off—would use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Keri Ann",
    rating: 5,
    date: "3 years ago",
    text: "Recommended by family. Jordan was polite, efficient, and did a great repair job. Very helpful.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Kayleigh O'Connor",
    rating: 5,
    date: "7 years ago",
    text: "Dave was friendly, knowledgeable, and very professional. Highly skilled in his trade. Would use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "MD Deakin",
    rating: 5,
    date: "3 years ago",
    text: "Woke up to a broken boiler. Lisa squeezed me in, and the team fixed it the same day despite being busy. Friendly and efficient.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "MaryAnn Barlow",
    rating: 5,
    date: "3 years ago",
    text: "Jordan is a local engineer who does a great job. Efficient booking and very reasonable price. Will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Laura Jones",
    rating: 5,
    date: "9 months ago",
    text: "Boiler service and part replacement—fantastic work, trustworthy, professional, and friendly. Thank you!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Lynden Edwards",
    rating: 5,
    date: "6 years ago",
    text: "Dave did a great job sorting my boiler issue. Fast, friendly, and reasonably priced. Would use again if needed.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Emma Taylor",
    rating: 5,
    date: "2 years ago",
    text: "Central heating stopped—came out the next day and fixed the issue within half an hour. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Michael Hadley",
    rating: 5,
    date: "3 years ago",
    text: "Called Dave after my home insurance let me down—fixed the boiler in under 30 minutes the day after I phoned. Excellent service.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Miranda Griffith",
    rating: 5,
    date: "2 years ago",
    text: "Used for nearly 10 years for all boiler services and repairs. Dave is always friendly and reliable—wouldn’t trust anyone else.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Dirty Baby",
    rating: 5,
    date: "3 years ago",
    text: "Most helpful tradesperson I’ve come across. Dave knows Ferroli boilers inside out. Brilliant overall service.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sharon Bradley",
    rating: 5,
    date: "9 months ago",
    text: "Been using BBR for several years—fast and efficient boiler service with helpful yearly reminders. Highly recommend!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Claire Rollason",
    rating: 5,
    date: "5 years ago",
    text: "Excellent and fair-priced service. We've used Dave for boiler servicing and pressure problems—honest guy and will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Kate Jones",
    rating: 5,
    date: "8 years ago",
    text: "Dave serviced my boiler and repaired my mum's boiler at Christmas. Efficient, reliable, trustworthy, and friendly. Will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Chee Heng Tung",
    rating: 5,
    date: "2 years ago",
    text: "Filling loop leak fixed in minutes. Educated me on bleeding radiators. Very reasonable bill. Thank you!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Robyn McAllister",
    rating: 5,
    date: "1 year ago",
    text: "Really recommend for servicing and repairs. Helpful in replacing a valve and motor and gave the boiler a thorough check.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Richard Holman",
    rating: 5,
    date: "6 years ago",
    text: "Finally found a specialist boiler engineer who fixes, not just replaces. Dave is knowledgeable and highly recommended.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Wendy Barshan",
    rating: 5,
    date: "5 years ago",
    text: "Used Dave for boiler servicing over 6 years—reliable, trustworthy, honest, and friendly. Great pricing and great chat.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Ivan Wong",
    rating: 5,
    date: "8 months ago",
    text: "Excellent boiler service at a competitive price. Will recommend to anyone in need.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Vehicle Security Systems by VehicleFit Ltd",
    rating: 5,
    date: "4 years ago",
    text: "Dave fixed my central heating quickly—showed me the faulty part and sorted it all within one visit.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sue Simkin",
    rating: 5,
    date: "5 years ago",
    text: "Paid £120 for previous boiler service, but Dave did a more thorough job for £50. Highly recommend and will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Ollie Kampo",
    rating: 5,
    date: "3 years ago",
    text: "Very good quality service. Friendly engineer, honest, and reassuring. Will use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Lincoln Shaw",
    rating: 5,
    date: "3 years ago",
    text: "First class service. Dave is straightforward, honest, and reliable. No hesitation awarding 5 stars.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Daniel Mackle",
    rating: 5,
    date: "4 years ago",
    text: "Dave checked my gas appliance—honest, reliable, knowledgeable, and fair prices. Highly recommend Birmingham Boiler Repairs.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Margaret Mclaney",
    rating: 5,
    date: "5 years ago",
    text: "Refreshing change from bad trades—Dave is a good worker and pleasant to chat to. Can't praise him highly enough.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Ian Soady",
    rating: 5,
    date: "8 years ago",
    text: "Dave was professional and thorough, explained everything, and charged exactly as quoted. Would recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Pete Graham",
    rating: 5,
    date: "1 year ago",
    text: "Totally saved our boiler and offered great service at an amazing price. Will use every year from now.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sunil Kumar",
    rating: 1,
    date: "5 years ago",
    text: "Found the guy unreasonable, talked more about costs than fixing the job. Not happy with the service.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Claire Hollocks",
    rating: 5,
    date: "10 months ago",
    text: "Jordan was very efficient, tidy, informative, and pleasant. Well recommended.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Amy Ball",
    rating: 5,
    date: "3 years ago",
    text: "Really impressed with the service. Reliable, trustworthy, and went above and beyond. Completely surpassed expectations.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Cally Toseland",
    rating: 5,
    date: "2 years ago",
    text: "Been using them for close to two years. Honest, reliable, friendly service, and excellent value for money.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Claire Moore",
    rating: 5,
    date: "5 years ago",
    text: "Dave came out after a Facebook plea—heating wouldn't turn off with a newborn at home. Fixed everything quickly and efficiently.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "James Osborne",
    rating: 5,
    date: "3 years ago",
    text: "What a rare gem—Dave was tremendously helpful diagnosing and fixing a HW issue on my Ferroli boiler. Knowledgeable and trustworthy.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Amanda Wilkes",
    rating: 5,
    date: "4 years ago",
    text: "Dave attended my elderly parents' home to fix the boiler after a traffic accident. Friendly and went the extra mile. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Kim Yates",
    rating: 5,
    date: "3 years ago",
    text: "Serviced our boiler—fantastic job, worked fast, explained everything. Would use again. Thank you!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Christopher Sewell",
    rating: 1,
    date: "3 years ago",
    text: "Boiler serviced, but soon after moving in, it had a major fault and needed replacing. Not happy with the service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Barbara Harrison",
    rating: 5,
    date: "2 years ago",
    text: "Excellent service from Dave. Polite and cleaned up after the job. Will use in future and recommend to others.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Loso",
    rating: 5,
    date: "1 year ago",
    text: "Fixed my boiler when another company wanted to fit a new one. Great people and cheap. 10/10.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Leanne Harris",
    rating: 5,
    date: "3 years ago",
    text: "Excellent company! 5-star service, competitive prices, lovely staff (Dave and Jordan), and professional. Will use again!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "EDWARD .LAWRANCE",
    rating: 4,
    date: "7 years ago",
    text: "Dave seemed knowledgeable and honest. Sent by insurance for a leak, changed washers, but needed a follow-up visit.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Nigel Taylor",
    rating: 5,
    date: "9 months ago",
    text: "Great service, came promptly as promised, fair price.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Daren Marshall",
    rating: 5,
    date: "3 years ago",
    text: "Fantastic service, very professional, great value for money—repaired my combi boiler in 45 mins. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Kerry Morris",
    rating: 5,
    date: "5 years ago",
    text: "Fantastic service from Dave. Friendly, efficient, brilliant value for money. Will definitely use again and recommend!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Dale Bcfc",
    rating: 5,
    date: "6 years ago",
    text: "Dave was fantastic—great advice, honest, and keeps costs down. Can only describe him as a legend for how he helped us.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sao Sao",
    rating: 5,
    date: "3 years ago",
    text: "Excellent company—great service, competitive prices, helpful staff (Jordan), and professional. Will use again!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Rachael Smith",
    rating: 5,
    date: "8 years ago",
    text: "Very good service. Dave phoned before arriving, prompt diagnosis, able to pay by card. All good.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Gav",
    rating: 5,
    date: "10 months ago",
    text: "Amazing service, brilliant job, really friendly people, highly recommended!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Lynn Holsey",
    rating: 5,
    date: "6 years ago",
    text: "Dave was an absolute star—diagnosed and resolved our boiler issue over the phone on a cold Friday night. Thank you!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Chris Hopkins",
    rating: 5,
    date: "7 years ago",
    text: "Just moved in, freezing. Landlord unresponsive, but Dave helped me sort the boiler over the phone. Top service.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Stephen Potter",
    rating: 5,
    date: "5 years ago",
    text: "Dave was prompt, efficient, knowledgeable—quickly resolved the boiler problem at a reasonable price.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Saleha Runi",
    rating: 5,
    date: "3 years ago",
    text: "Fantastic service—easy to arrange, efficient, good value, and well explained. Very polite and knowledgeable engineer.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Susan Williams",
    rating: 5,
    date: "9 months ago",
    text: "Dealt with the problem straight away—came out next day, polite guys. Would definitely recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Paul D",
    rating: 5,
    date: "5 years ago",
    text: "Brilliant help from Dave—sorted my Ferolli HE31C with a replacement PCB after water damage. Extremely knowledgeable and helpful.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Damien Hampson",
    rating: 5,
    date: "8 years ago",
    text: "Used Dave for years—very knowledgeable and prompt. Easy to talk to, reliable, and always a great service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Caroline",
    rating: 5,
    date: "2 years ago",
    text: "Found this company after Homeserve let me down. A third of the price and still going strong months later—perfect.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Anna Metcalfe",
    rating: 5,
    date: "3 years ago",
    text: "Great service! Boiler fixed quickly, staff were pleasant and professional. I'll use them again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Chris Cooper",
    rating: 5,
    date: "8 months ago",
    text: "Excellent service and reliable—highly recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Omer Alsidiq",
    rating: 1,
    date: "4 months ago",
    text: "Worst boiler service ever—very inexperienced engineer and rude.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Raja Azhar",
    rating: 1,
    date: "5 years ago",
    text: "Engineer couldn't diagnose the problem and never got back to us. Still left without heating.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Bob Spour",
    rating: 5,
    date: "5 years ago",
    text: "Would always recommend this company—friendly, knowledgeable, and most of my friends use them too.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Anikó Káldor",
    rating: 5,
    date: "8 years ago",
    text: "Dave fixed our boiler leak and did maintenance too. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Craig Hawker",
    rating: 5,
    date: "3 years ago",
    text: "Very happy with our service—good communication, reliable engineer. Would recommend to others.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Pete Phillips",
    rating: 5,
    date: "6 years ago",
    text: "Great service by Dave, arrived within the hour and fixed my boiler on the first visit. Highly recommend for repairs in Birmingham.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Rachel Clarke",
    rating: 5,
    date: "3 years ago",
    text: "Lovely, polite engineer—gave great advice about radiator issues after a poor installation. Definitely recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Steve Swan",
    rating: 5,
    date: "3 years ago",
    text: "Dave knows his job and is willing to help with his knowledge and patience. Sorted my problem over the phone. Excellent!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Frank Goodes",
    rating: 5,
    date: "8 years ago",
    text: "Used them twice for yearly boiler service. Excellent service at a good price. Will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Oriana Colletti",
    rating: 5,
    date: "1 year ago",
    text: "Very fast boiler service—clean and professional. Highly recommended.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "King",
    rating: 5,
    date: "10 months ago",
    text: "BRILLIANT! Great service, friendly and efficient. HIGHLY RECOMMEND!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Nat Steeden",
    rating: 5,
    date: "1 year ago",
    text: "Great company—came when they said, friendly employees, and good price.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "The beard to be feared",
    rating: 5,
    date: "5 years ago",
    text: "Dave fixed my mum's boiler within 30 minutes. Very friendly, polite, and didn’t charge my elderly mother. Couldn’t recommend higher!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Jake Smith",
    rating: 5,
    date: "9 months ago",
    text: "Excellent service. 100% would recommend!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Karen McConnell",
    rating: 5,
    date: "10 months ago",
    text: "Great service from this company, very pleased with the work.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Aaron McKenna",
    rating: 5,
    date: "9 months ago",
    text: "Prompt, friendly, and very professional. In and out in no time at all! Thanks.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Stephen Glands",
    rating: 5,
    date: "1 year ago",
    text: "Broken diverter valve fixed swiftly and at a reasonable price. Very efficient.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Jordan Mousley",
    rating: 5,
    date: "3 years ago",
    text: "Jordon serviced my boiler—on time, polite, well-mannered. Would definitely recommend and use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Carrie Gauntlett",
    rating: 5,
    date: "4 years ago",
    text: "Serviced my boiler and fixed a pressure fault. Very reliable and professional. Would recommend Dave to anyone.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Jane Lawrence",
    rating: 5,
    date: "4 years ago",
    text: "Excellent service, fast response, even came back out to help with pressure fill. Highly recommend and would use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Christine Grant",
    rating: 5,
    date: "4 years ago",
    text: "Dave was very efficient and checked my boiler. Kept it going for years until it needed replacing.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Anthony Niner",
    rating: 5,
    date: "3 years ago",
    text: "Absolute diamond—won a competition for a free boiler service and they gave it a full service and clean out. Really appreciate it!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "David Hawkins",
    rating: 5,
    date: "3 years ago",
    text: "Hassle-free and fairly priced. Thanks to Jordon for explaining the issue and fixing it quickly.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Charles Hyndman",
    rating: 5,
    date: "9 months ago",
    text: "Fantastic, excellent, quick service. Thank you.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sandra Rollinson",
    rating: 5,
    date: "3 years ago",
    text: "Arrived on time, polite and efficient, left no mess. 100% recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Denise Tanner",
    rating: 5,
    date: "3 years ago",
    text: "Jordon was thorough and efficient, completed the boiler service and gave good advice for ongoing maintenance.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Donna Devante",
    rating: 5,
    date: "3 years ago",
    text: "Quick and efficient boiler service by Jordon. Topped up boiler pressure and full service in 40 minutes.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mark Harper",
    rating: 5,
    date: "5 years ago",
    text: "Excellent service as always. Fair price and tries to help over the phone where he can.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Aahil Khan",
    rating: 5,
    date: "3 years ago",
    text: "Brilliant service, very professional and great communication. Highly recommend and will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Richard Boyle",
    rating: 5,
    date: "1 year ago",
    text: "Many thanks Dave for all your help on my building projects.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Ibzz Lh",
    rating: 5,
    date: "1 year ago",
    text: "Great company—employees are friendly and helpful, sorted the issue in minutes.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Bridget Smith",
    rating: 5,
    date: "3 years ago",
    text: "Very friendly and efficient service. Would definitely recommend and use again!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Lilian Tang",
    rating: 5,
    date: "10 months ago",
    text: "Came on time as promised and at a reasonable price.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Alexandra 83",
    rating: 5,
    date: "3 years ago",
    text: "Amazing service and price! Would recommend to everyone. Thank you, Jordan.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mandy Jones",
    rating: 5,
    date: "8 years ago",
    text: "Thanks Dave—arrived as promised, fixed the boiler quickly.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Cheryl Stanyard",
    rating: 5,
    date: "6 years ago",
    text: "So happy—thank you so much Dave. Cannot recommend him enough. A*******",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Jim Rosser",
    rating: 5,
    date: "6 years ago",
    text: "Highly recommended. Very reliable and honest. One of the good ones.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "n p",
    rating: 5,
    date: "7 years ago",
    text: "Fantastic service and just honest about the repair and what is needed. Great.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sharon Meades",
    rating: 5,
    date: "5 years ago",
    text: "Nice bloke, very efficient service. Would recommend and will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Roger Haines",
    rating: 5,
    date: "5 years ago",
    text: "Fantastic service from an excellent engineer. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Amin Zakeer",
    rating: 5,
    date: "3 years ago",
    text: "Very professional service—top engineer, polite and very friendly.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Rebecca Scott",
    rating: 5,
    date: "3 years ago",
    text: "Professional, on time, good price. Highly recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Marv in",
    rating: 5,
    date: "4 years ago",
    text: "Quick and reliable service. Got the heating on quickly. Will use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Richard Price",
    rating: 5,
    date: "3 years ago",
    text: "Great work done, great communication, top job!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Andy Andy",
    rating: 5,
    date: "3 years ago",
    text: "Efficient and pleasant boiler service—thanks Jordan.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Clair Marshall",
    rating: 5,
    date: "10 months ago",
    text: "Great friendly service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Fang Face",
    rating: 5,
    date: "5 years ago",
    text: "Great bloke, great service, great price, very happy.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "David Brennan",
    rating: 5,
    date: "3 years ago",
    text: "First annual boiler service—dealt with professionally and on time.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Cagin Husnu",
    rating: 5,
    date: "8 years ago",
    text: "Absolutely fantastic service—very professional!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Veronica Haynes",
    rating: 5,
    date: "3 years ago",
    text: "Great team—very helpful and clean workers.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "David Hughes",
    rating: 5,
    date: "5 years ago",
    text: "High quality level of service! Thank you!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Claire Hollocks",
    rating: 5,
    date: "5 years ago",
    text: "Very efficient and helpful service. Thank you.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Moradeun Ayoka",
    rating: 5,
    date: "9 months ago",
    text: "Pleasant job 👌",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Dice Pleck",
    rating: 5,
    date: "6 years ago",
    text: "Great guy, excellent service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mr T Chauhan",
    rating: 5,
    date: "3 years ago",
    text: "The service is clean and timely.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Will R",
    rating: 5,
    date: "8 years ago",
    text: "Helpful, informative, reasonable price!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Pat Bray",
    rating: 5,
    date: "3 years ago",
    text: "EXCELLENT SERVICE!! RECOMMENDED!!",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "DD",
    rating: 5,
    date: "3 years ago",
    text: "Good services.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Neil Taylor",
    rating: 5,
    date: "2 years ago",
    text: "Positive: Punctuality, Quality, Professionalism…",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Doris 1971",
    rating: 5,
    date: "3 years ago",
    text: "Positive: Responsiveness, Punctuality, Quality, Professionalism, Value…",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Saheb Khan",
    rating: 5,
    date: "4 years ago",
    text: "Positive: Responsiveness, Punctuality, Quality, Professionalism, Value",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Isam",
    rating: 5,
    date: "10 months ago",
    text: "Great service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Paul Matthews",
    rating: 5,
    date: "10 months ago",
    text: "Very happy with the job. Will use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Dean O'Connor",
    rating: 5,
    date: "10 months ago",
    text: "Superb, professional and prompt.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Celia Pang",
    rating: 5,
    date: "2 years ago",
    text: "Great experience—thanks for the 5 star review.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Taz Mahmood",
    rating: 1,
    date: "2 years ago",
    text: "Very poor service. Would not recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Gacha Nuggets",
    rating: 5,
    date: "3 years ago",
    text: "Great experience, would recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mike Smith",
    rating: 5,
    date: "4 years ago",
    text: "Used their services, very satisfied.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Hugh Easton",
    rating: 5,
    date: "4 years ago",
    text: "Happy with the service. Thanks.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Uday Rachineni",
    rating: 5,
    date: "5 years ago",
    text: "Very pleased, 5 star service.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mike Tomkinson",
    rating: 5,
    date: "5 years ago",
    text: "Great service. Already set reminder for next year.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Suhail Mulla",
    rating: 5,
    date: "10 months ago",
    text: "Quick fix, very knowledgeable. Would use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Ibzz Lh",
    rating: 5,
    date: "1 year ago",
    text: "Employees were friendly and helpful, sorted the issue in minutes.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "King",
    rating: 5,
    date: "10 months ago",
    text: "Great service, friendly and efficient. Highly recommend!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Richard Boyle",
    rating: 5,
    date: "1 year ago",
    text: "Thanks for all your help on my building projects.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Fang Face",
    rating: 5,
    date: "5 years ago",
    text: "Great service and price. Very happy.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Sandra Rollinson",
    rating: 5,
    date: "3 years ago",
    text: "Arrived on time, polite, and efficient. No mess. 100% recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Alexandra 83",
    rating: 5,
    date: "3 years ago",
    text: "Amazing service and price. Thank you Jordan.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "David Hughes",
    rating: 5,
    date: "5 years ago",
    text: "High quality level of service! Thank you!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Mandy Jones",
    rating: 5,
    date: "8 years ago",
    text: "Thanks Dave—arrived as promised, fixed the boiler quickly.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Will R",
    rating: 5,
    date: "8 years ago",
    text: "Helpful, informative, reasonable price!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Oriana Colletti",
    rating: 5,
    date: "1 year ago",
    text: "Very fast boiler service. Clean and professional. Highly recommended.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Ibzz Lh",
    rating: 5,
    date: "1 year ago",
    text: "Great company—friendly and helpful. Sorted the problem in minutes.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Jane Lawrence",
    rating: 5,
    date: "4 years ago",
    text: "Excellent service and fast response—came back to help with pressure fill. Would use again.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Pat Bray",
    rating: 5,
    date: "3 years ago",
    text: "Excellent service! Recommended for heating system repair.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Chee Heng Tung",
    rating: 5,
    date: "2 years ago",
    text: "Filling loop leak fixed within minutes. Educated me on how to bleed the radiators. Very reasonable bill. Thank you so much guys.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Samuel Oladiran",
    rating: 5,
    date: "10 months ago",
    text: "Dave and his colleagues are expert engineers. Superb customer service, competitive prices. Serviced my heating unit, boiler, and gas certificate for 3 houses. As a landlord, he is my choice!",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Sunil Kumar",
    rating: 1,
    date: "5 years ago",
    text: "Found this guy unreasonable, talked more about costs than getting the job done. Not satisfied.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Oldskoolretro",
    rating: 5,
    date: "8 months ago",
    text: "Used Dave for 15 years—never let me down. Best prices and professional work. Totally recommended.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Sharon Douglas",
    rating: 5,
    date: "1 month ago",
    text: "Excellent prompt service. Very polite and explained everything. Serviced my daughter’s boiler today. Ignore the negative reviews.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Matthew Carver",
    rating: 5,
    date: "8 months ago",
    text: "Used Birmingham Boiler Services for years. Professional and respectful. Highly recommended company.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Nizz Miah",
    rating: 5,
    date: "9 months ago",
    text: "They couldn’t attend due to distance, but Dave gave great advice and showed real care. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Marius Tiberiu Cojocaru",
    rating: 5,
    date: "9 months ago",
    text: "Excellent service. Had a boiler service and gas safety certificate, very knowledgeable and gave us a big discount. Totally recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Liz Johnson",
    rating: 5,
    date: "7 months ago",
    text: "Great company, good advice, and reliable annual service. Wouldn’t hesitate to recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "JP Houghton",
    rating: 5,
    date: "1 month ago",
    text: "Called for help with electric water heater leak. Good communication and honest advice, didn’t waste my time. High rating.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Trish Doyle",
    rating: 5,
    date: "5 months ago",
    text: "Dave came out next day, found and replaced a leaking pipe in minutes. No call out charge, just a flat fee. Very reasonable.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Richard Everest",
    rating: 5,
    date: "1 month ago",
    text: "Had Jordan come round, explained everything, gave plumbing advice on other issues. Friendly, professional, and quickly solved the issue.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Neezie Halfpenny",
    rating: 5,
    date: "3 months ago",
    text: "Dave fixed my boiler, needed a new pump, which was installed quickly. Left no mess. Great experience.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Clive H",
    rating: 5,
    date: "4 months ago",
    text: "Contacted Dave about a minor leak. Came next day, found the fault, explained everything calmly, and fixed it at a great price.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Bonnie Gentry",
    rating: 5,
    date: "8 months ago",
    text: "Brilliant company—transparent pricing, fixed my boiler and serviced it. Over the moon with the work and value.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "S C",
    rating: 3,
    date: "7 months ago",
    text: "Boiler service was disappointing. Leak wasn’t checked, expected more thorough service for the price.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Nick Warner",
    rating: 5,
    date: "5 months ago",
    text: "Had two boilers that others said needed replacing. Birmingham Boiler Repairs repaired both, saving me thousands.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "BB 2rude",
    rating: 5,
    date: "1 month ago",
    text: "Jordon explained everything before fixing the boiler, tidied up, and was very helpful. Would definitely recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Faraz Zia",
    rating: 5,
    date: "11 months ago",
    text: "Jordan was thorough and explained everything as he went along. Will use again and highly recommend.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Ma Pa",
    rating: 5,
    date: "8 months ago",
    text: "Dave was at my house within the hour, fixed the leak and condensation pump same day. Recommended and will use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Suhail Mulla",
    rating: 5,
    date: "10 months ago",
    text: "Responsive, knowledgeable, fixed my hot water issue at a reasonable rate. Would use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Iq Hu",
    rating: 5,
    date: "8 months ago",
    text: "Smooth, quick, efficient. Provided several options for appointments, were personable, gave advice, and easy payment.",
    service: "service",
    location: "Birmingham"
  },
  {
    author: "Vincenzo De Salvo",
    rating: 5,
    date: "11 months ago",
    text: "Dave was helpful, called me back quickly, easy to arrange a visit. Very knowledgeable and reassuring.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sammy Taylor",
    rating: 5,
    date: "7 months ago",
    text: "Great guys, very informative about my boiler and issues. On time and available the next day to put my boiler back on.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Sheila Bennett",
    rating: 5,
    date: "2 months ago",
    text: "Excellent service, very clean and efficient, did extra work due to boiler access with no complaints.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Claire Moore",
    rating: 5,
    date: "5 years ago",
    text: "Dave came out after a Facebook plea—heating wouldn’t turn off with a newborn at home. Fixed everything quickly.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Mark Taylor",
    rating: 5,
    date: "9 months ago",
    text: "Birmingham Boiler Repairs fixed my Worcester Bosch boiler. Honest, open, and pleasant. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Arshan Iqbal",
    rating: 5,
    date: "9 months ago",
    text: "Serviced and repaired my boiler, friendly and professional, honest advice. Highly recommend.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Alicia St Prix",
    rating: 5,
    date: "2 years ago",
    text: "Was without heating for days. Dave was responsive and affordable. Didn’t feel ripped off—would use again.",
    service: "repair",
    location: "Birmingham"
  },
  {
    author: "Keri Ann",
    rating: 5,
    date: "3 years ago",
    text: "Recommended by family. Jordan was polite, efficient, did a great repair job, and was very helpful.",
    service: "repair",
    location: "Birmingham"
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
