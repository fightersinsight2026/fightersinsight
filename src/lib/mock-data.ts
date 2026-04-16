// Mock data used by the MVP UI before a real database is wired up.
// Replace with Prisma queries as the schema is migrated to a real DB.

export type MockBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: { name: string; avatarInitials: string };
  publishedAt: string;
  readingMinutes: number;
  cover: string;
  featured?: boolean;
};

export const MOCK_BLOGS: MockBlogPost[] = [
  {
    id: "b1",
    slug: "topuria-vs-holloway-breakdown",
    title: "Topuria vs Holloway: Why footwork — not power — decides this fight",
    excerpt:
      "Holloway's volume is legendary. Topuria's left hook is nuclear. But the real story is in the angles. Here's the tape breakdown.",
    category: "Fight Analysis",
    tags: ["UFC", "Featherweight", "Breakdown"],
    author: { name: "Marco DeLeón", avatarInitials: "MD" },
    publishedAt: "2026-04-01T10:00:00Z",
    readingMinutes: 9,
    cover:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    id: "b2",
    slug: "first-month-of-bjj-mistakes",
    title: "I trained BJJ for 30 days. These are the 7 mistakes nobody warned me about.",
    excerpt:
      "From over-gripping to skipping warmups, here's what every white belt does wrong — and how to skip the pain.",
    category: "Beginner Guides",
    tags: ["BJJ", "Beginner", "Advice"],
    author: { name: "Priya Nair", avatarInitials: "PN" },
    publishedAt: "2026-03-28T14:00:00Z",
    readingMinutes: 6,
    cover:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b3",
    slug: "best-boxing-gloves-under-100",
    title: "The 5 best boxing gloves under $100 we actually trained in",
    excerpt:
      "We took five popular options into a real boxing gym for 4 weeks. Here's which ones held up — and which fell apart.",
    category: "Gear Reviews",
    tags: ["Gear", "Boxing", "Beginner"],
    author: { name: "Jules Okafor", avatarInitials: "JO" },
    publishedAt: "2026-03-26T08:30:00Z",
    readingMinutes: 11,
    cover:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b4",
    slug: "muay-thai-vs-boxing-which-first",
    title: "Muay Thai vs Boxing: which should you start with?",
    excerpt:
      "Both will change your life. But the right one depends on what you want — self-defense, fitness, or competition.",
    category: "Beginner Guides",
    tags: ["Muay Thai", "Boxing", "Beginner"],
    author: { name: "Tariq Bell", avatarInitials: "TB" },
    publishedAt: "2026-03-22T17:00:00Z",
    readingMinutes: 7,
    cover:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b5",
    slug: "judging-controversy-bellator-finale",
    title: "The judging controversy that nobody is talking about",
    excerpt:
      "A 30-27 in a fight where the loser landed more strikes? We dug into the scoring criteria and it gets worse.",
    category: "Opinion",
    tags: ["Judging", "Opinion", "Bellator"],
    author: { name: "Marco DeLeón", avatarInitials: "MD" },
    publishedAt: "2026-03-19T20:00:00Z",
    readingMinutes: 8,
    cover:
      "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b6",
    slug: "first-sparring-session-survival",
    title: "How to survive your first sparring session without panicking",
    excerpt:
      "Heart rate spikes, gas tank empty, brain offline. Here's a coach-approved framework so you actually learn instead of freezing.",
    category: "Training Advice",
    tags: ["Training", "Sparring", "Beginner"],
    author: { name: "Priya Nair", avatarInitials: "PN" },
    publishedAt: "2026-03-16T12:00:00Z",
    readingMinutes: 5,
    cover:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b7",
    slug: "what-pros-eat-fight-week",
    title: "What pros actually eat fight week (it's not what you think)",
    excerpt:
      "We talked to three nutritionists who work with UFC and pro boxing camps. The reality of fight-week eating is way less dramatic than YouTube tells you.",
    category: "Training Advice",
    tags: ["Nutrition", "Fight Camp", "Pro"],
    author: { name: "Jules Okafor", avatarInitials: "JO" },
    publishedAt: "2026-03-12T11:00:00Z",
    readingMinutes: 8,
    cover:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b8",
    slug: "best-mma-gyms-nyc-2026",
    title: "The 8 best MMA gyms in NYC right now (2026 edition)",
    excerpt:
      "We trained at every major MMA gym in the five boroughs over six months. Here's the definitive ranking — beginner-friendliness, coaching, and culture.",
    category: "Gym Reviews",
    tags: ["NYC", "MMA", "Gym Reviews"],
    author: { name: "Tariq Bell", avatarInitials: "TB" },
    publishedAt: "2026-03-09T15:00:00Z",
    readingMinutes: 14,
    cover:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b9",
    slug: "khabib-vs-bj-penn-style-comparison",
    title: "Khabib vs BJ Penn: who had the best lightweight grappling ever?",
    excerpt:
      "A frame-by-frame comparison of two of the greatest lightweight grapplers of all time. Different styles, same dominance — but who wins on the tape?",
    category: "Fight Analysis",
    tags: ["Lightweight", "Grappling", "GOAT"],
    author: { name: "Marco DeLeón", avatarInitials: "MD" },
    publishedAt: "2026-03-05T18:00:00Z",
    readingMinutes: 12,
    cover:
      "https://images.unsplash.com/photo-1593786481097-cf281dd12e9d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b10",
    slug: "shadowboxing-routine-beginners",
    title: "The 15-minute shadowboxing routine every beginner should know",
    excerpt:
      "No equipment needed. Just you, a mirror, and 15 minutes a day. Here's the exact routine boxing coaches give beginners in their first month.",
    category: "Beginner Guides",
    tags: ["Boxing", "Beginner", "Routine"],
    author: { name: "Tariq Bell", avatarInitials: "TB" },
    publishedAt: "2026-03-02T09:00:00Z",
    readingMinutes: 6,
    cover:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "b11",
    slug: "ufc-318-predictions",
    title: "UFC 318 main card predictions: every fight, every method",
    excerpt:
      "Five fights. Five predictions. Five methods. We put our reputation on the line — see if we beat the bookies this Saturday.",
    category: "Predictions",
    tags: ["UFC", "Predictions", "Picks"],
    author: { name: "Marco DeLeón", avatarInitials: "MD" },
    publishedAt: "2026-04-07T10:00:00Z",
    readingMinutes: 7,
    cover:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1400&q=80",
  },
];

export type MockEvent = {
  id: string;
  slug: string;
  title: string;
  promotion: string;
  startTime: string;
  venue: string;
  city: string;
  status: "UPCOMING" | "LIVE" | "ENDED";
  cover: string;
  mainEvent: { a: string; b: string; weightClass: string };
};

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: "e1",
    slug: "ufc-318",
    title: "UFC 318: Topuria vs Holloway",
    promotion: "UFC",
    startTime: "2026-04-08T22:00:00Z",
    venue: "T-Mobile Arena",
    city: "Las Vegas, NV",
    status: "LIVE",
    cover:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80",
    mainEvent: { a: "Ilia Topuria", b: "Max Holloway", weightClass: "Featherweight" },
  },
  {
    id: "e2",
    slug: "boxing-canelo-vs-benavidez",
    title: "Canelo vs Benavidez",
    promotion: "Boxing",
    startTime: "2026-04-15T03:00:00Z",
    venue: "Allegiant Stadium",
    city: "Las Vegas, NV",
    status: "UPCOMING",
    cover:
      "https://images.unsplash.com/photo-1606925207923-c6f6f5a93a3a?auto=format&fit=crop&w=1400&q=80",
    mainEvent: { a: "Canelo Álvarez", b: "David Benavidez", weightClass: "Super Middleweight" },
  },
  {
    id: "e3",
    slug: "one-championship-friday-fights",
    title: "ONE Friday Fights 88",
    promotion: "ONE",
    startTime: "2026-04-12T13:00:00Z",
    venue: "Lumpinee Stadium",
    city: "Bangkok, TH",
    status: "UPCOMING",
    cover:
      "https://images.unsplash.com/photo-1606921231101-6f0a09f63a13?auto=format&fit=crop&w=1400&q=80",
    mainEvent: { a: "Tawanchai", b: "Superlek", weightClass: "Featherweight Muay Thai" },
  },
  {
    id: "e4",
    slug: "bellator-champions-series",
    title: "Bellator Champions Series: London",
    promotion: "BELLATOR",
    startTime: "2026-04-19T20:00:00Z",
    venue: "Wembley Arena",
    city: "London, UK",
    status: "UPCOMING",
    cover:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1400&q=80",
    mainEvent: { a: "Patricio Pitbull", b: "Aaron Pico", weightClass: "Featherweight" },
  },
  {
    id: "e5",
    slug: "pfl-world-championship",
    title: "PFL World Championship",
    promotion: "PFL",
    startTime: "2026-04-25T23:00:00Z",
    venue: "The Theater at MSG",
    city: "New York, NY",
    status: "UPCOMING",
    cover:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80",
    mainEvent: { a: "Renan Ferreira", b: "Ryan Bader", weightClass: "Heavyweight" },
  },
  {
    id: "e6",
    slug: "ufc-fight-night-vegas-90",
    title: "UFC Fight Night: Vegas 90",
    promotion: "UFC",
    startTime: "2026-03-29T22:00:00Z",
    venue: "UFC Apex",
    city: "Las Vegas, NV",
    status: "ENDED",
    cover:
      "https://images.unsplash.com/photo-1518609571773-39b7d303a87b?auto=format&fit=crop&w=1400&q=80",
    mainEvent: { a: "Cory Sandhagen", b: "Umar Nurmagomedov", weightClass: "Bantamweight" },
  },
];

export type MockThread = {
  id: string;
  slug: string;
  title: string;
  category: string;
  user: { name: string; flair: string };
  upvotes: number;
  replies: number;
  createdAt: string;
  pinned?: boolean;
  tag?: string;
};

export const MOCK_THREADS: MockThread[] = [
  {
    id: "t1",
    slug: "is-volkanovski-still-top-10-pfp",
    title: "Is Volkanovski still top 10 P4P after the last loss? Honest takes only.",
    category: "UFC Discussion",
    user: { name: "TheFightDoctor", flair: "MMA Fan" },
    upvotes: 412,
    replies: 187,
    createdAt: "2026-04-07T09:30:00Z",
    pinned: true,
    tag: "Debate",
  },
  {
    id: "t2",
    slug: "first-pair-of-gloves-help",
    title: "First pair of gloves — Cleto Reyes or Winning for a beginner?",
    category: "Gear Talk",
    user: { name: "newjabber", flair: "Beginner" },
    upvotes: 88,
    replies: 42,
    createdAt: "2026-04-07T16:20:00Z",
    tag: "Gear",
  },
  {
    id: "t3",
    slug: "muay-thai-rib-injury",
    title: "Bruised ribs from a body kick. How long should I rest?",
    category: "Training Advice",
    user: { name: "kickheavy", flair: "Muay Thai" },
    upvotes: 64,
    replies: 31,
    createdAt: "2026-04-07T18:05:00Z",
    tag: "Advice",
  },
  {
    id: "t4",
    slug: "best-bjj-gym-austin",
    title: "Best beginner-friendly BJJ gym in Austin? Just moved.",
    category: "Gym Recommendations",
    user: { name: "atxnewbie", flair: "Beginner" },
    upvotes: 41,
    replies: 23,
    createdAt: "2026-04-08T02:10:00Z",
    tag: "Beginner",
  },
  {
    id: "t5",
    slug: "topuria-power-real",
    title: "Topuria's KO power: real or matchmaking?",
    category: "Fight Breakdowns",
    user: { name: "tapeologist", flair: "Coach" },
    upvotes: 233,
    replies: 96,
    createdAt: "2026-04-06T22:00:00Z",
    tag: "Breakdown",
  },
  {
    id: "t6",
    slug: "torn-meniscus-bjj",
    title: "Torn meniscus from BJJ — should I get surgery or rehab?",
    category: "Training Advice",
    user: { name: "matrat", flair: "BJJ Practitioner" },
    upvotes: 127,
    replies: 64,
    createdAt: "2026-04-06T15:30:00Z",
    tag: "Advice",
  },
  {
    id: "t7",
    slug: "favorite-walkout-songs",
    title: "What's your favorite UFC walkout song of all time?",
    category: "Off Topic",
    user: { name: "octagongoat", flair: "MMA Fan" },
    upvotes: 89,
    replies: 142,
    createdAt: "2026-04-05T20:15:00Z",
  },
  {
    id: "t8",
    slug: "switching-orthodox-southpaw",
    title: "I'm orthodox but my coach wants me to learn southpaw too. Worth it?",
    category: "Training Advice",
    user: { name: "leftyhopeful", flair: "Boxer" },
    upvotes: 56,
    replies: 28,
    createdAt: "2026-04-05T14:00:00Z",
    tag: "Technique",
  },
  {
    id: "t9",
    slug: "alex-pereira-vs-jiri-3",
    title: "Pereira vs Procházka 3: who wins the trilogy?",
    category: "UFC Discussion",
    user: { name: "kickheavy", flair: "Muay Thai" },
    upvotes: 318,
    replies: 201,
    createdAt: "2026-04-04T22:45:00Z",
    tag: "Debate",
  },
  {
    id: "t10",
    slug: "muay-thai-shin-conditioning",
    title: "Real talk on shin conditioning: how much is too much?",
    category: "Muay Thai / Kickboxing",
    user: { name: "tapeologist", flair: "Coach" },
    upvotes: 142,
    replies: 73,
    createdAt: "2026-04-03T18:30:00Z",
    tag: "Technique",
  },
];

export type MockGym = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  disciplines: string[];
  beginnerFriendly: boolean;
  partner: boolean;
  rating: number;
  priceRange: string;
  image: string;
  blurb: string;
};

export const MOCK_GYMS: MockGym[] = [
  {
    id: "g1",
    slug: "ironworks-boxing",
    name: "Ironworks Boxing Club",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    disciplines: ["Boxing", "Strength"],
    beginnerFriendly: true,
    partner: true,
    rating: 4.9,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1200&q=80",
    blurb: "Old-school boxing with modern coaching. Beginner classes 7 days a week.",
  },
  {
    id: "g2",
    slug: "renzo-gracie-academy",
    name: "Renzo Gracie Academy",
    city: "New York",
    state: "NY",
    zip: "10001",
    disciplines: ["BJJ", "MMA", "Wrestling"],
    beginnerFriendly: true,
    partner: false,
    rating: 4.8,
    priceRange: "$$$",
    image:
      "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=1200&q=80",
    blurb: "World-class grappling. Daily fundamentals classes for white belts.",
  },
  {
    id: "g3",
    slug: "sitsongpeenong-muay-thai",
    name: "Sitsongpeenong Muay Thai",
    city: "Los Angeles",
    state: "CA",
    zip: "90028",
    disciplines: ["Muay Thai", "Kickboxing"],
    beginnerFriendly: true,
    partner: true,
    rating: 4.9,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    blurb: "Authentic Thai-style training with real Bangkok-trained coaches.",
  },
  {
    id: "g4",
    slug: "atos-jiu-jitsu",
    name: "Atos Jiu-Jitsu HQ",
    city: "San Diego",
    state: "CA",
    zip: "92101",
    disciplines: ["BJJ", "No-Gi"],
    beginnerFriendly: true,
    partner: false,
    rating: 4.9,
    priceRange: "$$$",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80",
    blurb: "Home of multiple-time IBJJF champions. Beginner Fundamentals 6 days/week.",
  },
  {
    id: "g5",
    slug: "american-top-team",
    name: "American Top Team",
    city: "Coconut Creek",
    state: "FL",
    zip: "33073",
    disciplines: ["MMA", "Boxing", "BJJ", "Wrestling"],
    beginnerFriendly: true,
    partner: true,
    rating: 4.9,
    priceRange: "$$$",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80",
    blurb: "Home gym of dozens of UFC champions. New beginner program launched 2025.",
  },
  {
    id: "g6",
    slug: "mendez-boxing",
    name: "Mendez Boxing",
    city: "Manhattan",
    state: "NY",
    zip: "10016",
    disciplines: ["Boxing"],
    beginnerFriendly: false,
    partner: false,
    rating: 4.7,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80",
    blurb: "Hardcore old-school boxing gym. Expect to be pushed.",
  },
  {
    id: "g7",
    slug: "tristar-gym",
    name: "Tristar Gym",
    city: "Montreal",
    state: "QC",
    zip: "H2T1S6",
    disciplines: ["MMA", "BJJ", "Muay Thai"],
    beginnerFriendly: true,
    partner: true,
    rating: 4.8,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1606925207923-c6f6f5a93a3a?auto=format&fit=crop&w=1200&q=80",
    blurb: "Famous training home of Georges St-Pierre. Beginners welcome 7 days a week.",
  },
  {
    id: "g8",
    slug: "ten-tigers-muay-thai",
    name: "10 Tigers Muay Thai",
    city: "Brooklyn",
    state: "NY",
    zip: "11215",
    disciplines: ["Muay Thai", "Kickboxing"],
    beginnerFriendly: true,
    partner: false,
    rating: 4.8,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    blurb: "Authentic Thai-style Muay Thai in the heart of Brooklyn.",
  },
];

export type MockGear = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  rating: number;
  bestFor: string;
  price: string;
  image: string;
  affiliateLink: string;
};

export const MOCK_GEAR: MockGear[] = [
  {
    id: "gr1",
    slug: "winning-ms-500-boxing-gloves",
    name: "Winning MS-500",
    brand: "Winning",
    category: "Boxing Gloves",
    rating: 9.6,
    bestFor: "Premium sparring",
    price: "$$$$",
    image:
      "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr2",
    slug: "venum-elite-shin-guards",
    name: "Venum Elite Shin Guards",
    brand: "Venum",
    category: "Shin Guards",
    rating: 8.8,
    bestFor: "Beginner Muay Thai",
    price: "$$",
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr3",
    slug: "shock-doctor-mouthguard",
    name: "Shock Doctor Pro Mouthguard",
    brand: "Shock Doctor",
    category: "Mouthguards",
    rating: 8.5,
    bestFor: "All levels",
    price: "$",
    image:
      "https://images.unsplash.com/photo-1626253811236-46c91a2b6c46?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr4",
    slug: "hayabusa-t3-mma-gloves",
    name: "Hayabusa T3 MMA Gloves",
    brand: "Hayabusa",
    category: "MMA Gloves",
    rating: 9.2,
    bestFor: "MMA training",
    price: "$$$",
    image:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr5",
    slug: "ringside-imf-tech",
    name: "Ringside IMF Tech",
    brand: "Ringside",
    category: "Boxing Gloves",
    rating: 8.9,
    bestFor: "Best value sparring",
    price: "$",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr6",
    slug: "shoyoroll-batch-100",
    name: "Shoyoroll Batch 100",
    brand: "Shoyoroll",
    category: "BJJ Gis",
    rating: 9.4,
    bestFor: "Premium BJJ gi",
    price: "$$$",
    image:
      "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr7",
    slug: "fairtex-bag-gloves",
    name: "Fairtex BGV1 Boxing Gloves",
    brand: "Fairtex",
    category: "Boxing Gloves",
    rating: 9.0,
    bestFor: "Muay Thai bag work",
    price: "$$",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
  {
    id: "gr8",
    slug: "everlast-handwraps",
    name: "Everlast 180\" Handwraps",
    brand: "Everlast",
    category: "Hand Wraps",
    rating: 8.6,
    bestFor: "Beginner essentials",
    price: "$",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    affiliateLink: "#",
  },
];

export type MockLiveUpdate = {
  id: string;
  timestamp: string;
  body: string;
  type: "update" | "knockdown" | "result" | "scorecard" | "bonus";
};

export const MOCK_LIVE_UPDATES: MockLiveUpdate[] = [
  {
    id: "u1",
    timestamp: "2026-04-08T23:42:00Z",
    type: "result",
    body: "Topuria def. Holloway via KO (left hook), R3 1:34. Crowd is on its feet.",
  },
  {
    id: "u2",
    timestamp: "2026-04-08T23:40:00Z",
    type: "knockdown",
    body: "MASSIVE knockdown! Topuria lands a clean left hook. Holloway in trouble.",
  },
  {
    id: "u3",
    timestamp: "2026-04-08T23:35:00Z",
    type: "update",
    body: "Round 3 underway. Holloway pressing forward, Topuria circling left and looking for counters.",
  },
  {
    id: "u4",
    timestamp: "2026-04-08T23:25:00Z",
    type: "scorecard",
    body: "Unofficial: Round 2 to Topuria 10-9 — better output and the harder shots.",
  },
  {
    id: "u5",
    timestamp: "2026-04-08T23:15:00Z",
    type: "update",
    body: "Round 1: Holloway opens with the jab, Topuria responds with a stinging left to the body.",
  },
];

export const FORUM_CATEGORIES = [
  { slug: "ufc", name: "UFC Discussion", description: "All things UFC.", icon: "ufc" },
  { slug: "boxing", name: "Boxing", description: "Sweet science talk.", icon: "boxing" },
  { slug: "mma", name: "MMA General", description: "Cross-promotion MMA.", icon: "mma" },
  { slug: "muay-thai", name: "Muay Thai / Kickboxing", description: "Art of 8 limbs.", icon: "mt" },
  { slug: "bjj", name: "BJJ / Grappling / Wrestling", description: "Mat life.", icon: "bjj" },
  { slug: "breakdowns", name: "Fight Breakdowns", description: "Tape study & analysis.", icon: "tape" },
  { slug: "training", name: "Training Advice", description: "Get better. Stay healthy.", icon: "training" },
  { slug: "beginners", name: "Beginner Questions", description: "No question is too basic.", icon: "beginner" },
  { slug: "gear", name: "Gear Talk", description: "Gloves, wraps, shoes, more.", icon: "gear" },
  { slug: "gyms", name: "Gym Recommendations", description: "Find your home gym.", icon: "gym" },
  { slug: "news", name: "Fighter News / Rumors", description: "Hot off the wire.", icon: "news" },
  { slug: "off-topic", name: "Off Topic", description: "Everything else.", icon: "ot" },
];

export type MockFighter = {
  id: string;
  slug: string;
  name: string;
  nickname?: string;
  weightClass: string;
  promotion: string;
  record: { w: number; l: number; d: number };
  age: number;
  height: string;
  reach: string;
  stance: "Orthodox" | "Southpaw" | "Switch";
  country: string;
  countryFlag: string;
  rank?: string;
  image: string;
  bio: string;
  notableWins: string[];
  style: string[];
};

export const MOCK_FIGHTERS: MockFighter[] = [
  // ── UFC Champions (updated April 2026) ──────────────────────────
  {
    id: "f1",
    slug: "islam-makhachev",
    name: "Islam Makhachev",
    weightClass: "Welterweight",
    promotion: "UFC",
    record: { w: 27, l: 1, d: 0 },
    age: 34,
    height: "5'10\"",
    reach: "70\"",
    stance: "Southpaw",
    country: "Dagestan, Russia",
    countryFlag: "RU",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1606921231101-6f0a09f63a13?auto=format&fit=crop&w=900&q=80",
    bio: "P4P #1. Two-division champion who moved up to welterweight and defeated Jack Della Maddalena at UFC 322 to become the 11th double champ in UFC history. Tied Anderson Silva's record with 16 consecutive wins.",
    notableWins: ["Jack Della Maddalena", "Charles Oliveira", "Alexander Volkanovski", "Dustin Poirier"],
    style: ["Sambo", "Wrestling", "Top control"],
  },
  {
    id: "f2",
    slug: "ilia-topuria",
    name: "Ilia Topuria",
    nickname: "El Matador",
    weightClass: "Lightweight",
    promotion: "UFC",
    record: { w: 17, l: 0, d: 0 },
    age: 28,
    height: "5'7\"",
    reach: "69\"",
    stance: "Orthodox",
    country: "Spain / Georgia",
    countryFlag: "ES",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
    bio: "Undefeated undisputed lightweight champion. Moved up from featherweight and won the 155 lb title at UFC 317 in June 2025. Currently on personal leave. P4P #2.",
    notableWins: ["Alexander Volkanovski", "Max Holloway", "Josh Emmett"],
    style: ["Boxing", "BJJ", "Counter-striking"],
  },
  {
    id: "f3",
    slug: "alexander-volkanovski",
    name: "Alexander Volkanovski",
    nickname: "The Great",
    weightClass: "Featherweight",
    promotion: "UFC",
    record: { w: 27, l: 4, d: 0 },
    age: 37,
    height: "5'6\"",
    reach: "71\"",
    stance: "Orthodox",
    country: "Australia",
    countryFlag: "AU",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    bio: "Reclaimed the featherweight throne at UFC 325 in Sydney (Feb 2026), defeating Diego Lopes by unanimous decision. One of the most durable champions in UFC history.",
    notableWins: ["Diego Lopes", "Max Holloway (x2)", "José Aldo", "Brian Ortega"],
    style: ["Volume boxing", "Leg kicks", "Cardio"],
  },
  {
    id: "f4",
    slug: "carlos-ulberg",
    name: "Carlos Ulberg",
    weightClass: "Light Heavyweight",
    promotion: "UFC",
    record: { w: 12, l: 1, d: 0 },
    age: 32,
    height: "6'4\"",
    reach: "80\"",
    stance: "Orthodox",
    country: "New Zealand",
    countryFlag: "NZ",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=80",
    bio: "New light heavyweight champion. KO'd Jiří Procházka at UFC 327 (April 2026) to claim the title. City Kickboxing product with devastating power. Debuted on the P4P list at #15.",
    notableWins: ["Jiří Procházka", "Alex Pereira"],
    style: ["Kickboxing", "Power striking", "Counter-punching"],
  },
  {
    id: "f5",
    slug: "khamzat-chimaev",
    name: "Khamzat Chimaev",
    nickname: "Borz",
    weightClass: "Middleweight",
    promotion: "UFC",
    record: { w: 14, l: 0, d: 0 },
    age: 30,
    height: "6'2\"",
    reach: "75\"",
    stance: "Orthodox",
    country: "Sweden / Chechnya",
    countryFlag: "SE",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=80",
    bio: "Undefeated middleweight champion. Won the title at UFC 319 (Aug 2025) with a dominant UD over Dricus du Plessis. P4P #3. The most dominant grappler in the division.",
    notableWins: ["Dricus Du Plessis", "Robert Whittaker", "Kamaru Usman", "Gilbert Burns"],
    style: ["Wrestling", "Pressure", "Ground-and-pound"],
  },
  {
    id: "f6",
    slug: "petr-yan",
    name: "Petr Yan",
    nickname: "No Mercy",
    weightClass: "Bantamweight",
    promotion: "UFC",
    record: { w: 18, l: 5, d: 0 },
    age: 33,
    height: "5'7\"",
    reach: "67\"",
    stance: "Orthodox",
    country: "Russia",
    countryFlag: "RU",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=900&q=80",
    bio: "Recaptured the bantamweight title at UFC 323 (Dec 2025) with a UD over Merab Dvalishvili. One of the most technically sound strikers in MMA.",
    notableWins: ["Merab Dvalishvili", "Sean O'Malley", "José Aldo"],
    style: ["Boxing", "Counter-striking", "Footwork"],
  },
  {
    id: "f7",
    slug: "tom-aspinall",
    name: "Tom Aspinall",
    weightClass: "Heavyweight",
    promotion: "UFC",
    record: { w: 15, l: 3, d: 0 },
    age: 31,
    height: "6'5\"",
    reach: "78\"",
    stance: "Orthodox",
    country: "England",
    countryFlag: "GB",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1606925207923-c6f6f5a93a3a?auto=format&fit=crop&w=900&q=80",
    bio: "Undisputed heavyweight champion since June 2025 after Jon Jones retired. Unusually fast and technical for the division with devastating first-round finishes.",
    notableWins: ["Curtis Blaydes", "Sergei Pavlovich", "Alexander Volkov"],
    style: ["Speed", "Boxing", "BJJ"],
  },
  {
    id: "f8",
    slug: "joshua-van",
    name: "Joshua Van",
    weightClass: "Flyweight",
    promotion: "UFC",
    record: { w: 16, l: 1, d: 0 },
    age: 24,
    height: "5'5\"",
    reach: "66\"",
    stance: "Orthodox",
    country: "Australia",
    countryFlag: "AU",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
    bio: "Became the second-youngest champion in UFC history at 23, defeating Alexandre Pantoja at UFC 323 (Dec 2025). An explosive grappler with dynamic submissions.",
    notableWins: ["Alexandre Pantoja", "Brandon Royval"],
    style: ["Wrestling", "Submissions", "Explosiveness"],
  },
  {
    id: "f9",
    slug: "justin-gaethje",
    name: "Justin Gaethje",
    nickname: "The Highlight",
    weightClass: "Lightweight",
    promotion: "UFC",
    record: { w: 26, l: 5, d: 0 },
    age: 35,
    height: "5'11\"",
    reach: "70\"",
    stance: "Orthodox",
    country: "USA",
    countryFlag: "US",
    rank: "IC",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    bio: "Interim lightweight champion. Won the interim title at UFC 324 (Jan 2026) via UD over Paddy Pimblett while Topuria is away. One of the most exciting fighters in UFC history.",
    notableWins: ["Paddy Pimblett", "Dustin Poirier", "Michael Chandler", "Tony Ferguson"],
    style: ["Leg kicks", "Pressure", "Power"],
  },
  {
    id: "f10",
    slug: "kayla-harrison",
    name: "Kayla Harrison",
    weightClass: "W-Bantamweight",
    promotion: "UFC",
    record: { w: 18, l: 1, d: 0 },
    age: 35,
    height: "5'8\"",
    reach: "68\"",
    stance: "Orthodox",
    country: "USA",
    countryFlag: "US",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    bio: "Women's bantamweight champion. Two-time Olympic judo gold medallist who captured the UFC title at UFC 316 (June 2025) with a submission over Julianna Peña.",
    notableWins: ["Julianna Peña", "Holly Holm"],
    style: ["Judo", "Wrestling", "Ground control"],
  },
  {
    id: "f15",
    slug: "valentina-shevchenko",
    name: "Valentina Shevchenko",
    nickname: "Bullet",
    weightClass: "W-Flyweight",
    promotion: "UFC",
    record: { w: 24, l: 4, d: 0 },
    age: 38,
    height: "5'5\"",
    reach: "67\"",
    stance: "Southpaw",
    country: "Kyrgyzstan / Peru",
    countryFlag: "KG",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
    bio: "Two-time women's flyweight champion. Most dominant women's champion in UFC history with the most title defenses. Defeated Zhang Weili at UFC 322 (Nov 2025).",
    notableWins: ["Zhang Weili", "Alexa Grasso", "Joanna Jędrzejczyk", "Jessica Andrade"],
    style: ["Muay Thai", "Precision striking", "Clinch work"],
  },
  {
    id: "f16",
    slug: "zhang-weili",
    name: "Zhang Weili",
    nickname: "Magnum",
    weightClass: "W-Strawweight",
    promotion: "UFC",
    record: { w: 24, l: 4, d: 0 },
    age: 35,
    height: "5'4\"",
    reach: "63\"",
    stance: "Orthodox",
    country: "China",
    countryFlag: "CN",
    rank: "C",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    bio: "Two-time strawweight champion. The first Chinese UFC champion. Known for relentless pressure and knockout power. Moved back down to strawweight after UFC 322.",
    notableWins: ["Joanna Jędrzejczyk", "Carla Esparza", "Yan Xiaonan"],
    style: ["Sanda", "Wrestling", "Power"],
  },
  // ── UFC Contenders ──────────────────────────
  {
    id: "f11",
    slug: "max-holloway",
    name: "Max Holloway",
    nickname: "Blessed",
    weightClass: "Featherweight",
    promotion: "UFC",
    record: { w: 26, l: 8, d: 0 },
    age: 34,
    height: "5'11\"",
    reach: "69\"",
    stance: "Orthodox",
    country: "Hawaii, USA",
    countryFlag: "US",
    rank: "#2",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    bio: "Former featherweight champion and BMF title holder. Holds the record for most significant strikes landed in UFC history.",
    notableWins: ["José Aldo (x2)", "Brian Ortega", "Dustin Poirier"],
    style: ["Volume boxing", "Pressure", "Cardio"],
  },
  {
    id: "f12",
    slug: "alex-pereira",
    name: "Alex Pereira",
    nickname: "Poatan",
    weightClass: "Light Heavyweight",
    promotion: "UFC",
    record: { w: 12, l: 3, d: 0 },
    age: 39,
    height: "6'4\"",
    reach: "79\"",
    stance: "Orthodox",
    country: "Brazil",
    countryFlag: "BR",
    rank: "#1",
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=80",
    bio: "Former two-division Glory Kickboxing and UFC light heavyweight champion. Lost the belt to Carlos Ulberg. Still one of the hardest hitters in MMA.",
    notableWins: ["Israel Adesanya", "Jiří Procházka (x2)", "Jamahal Hill"],
    style: ["Kickboxing", "Power", "Calf kicks"],
  },
  {
    id: "f13",
    slug: "dricus-du-plessis",
    name: "Dricus Du Plessis",
    nickname: "Stillknocks",
    weightClass: "Middleweight",
    promotion: "UFC",
    record: { w: 22, l: 3, d: 0 },
    age: 30,
    height: "6'0\"",
    reach: "74\"",
    stance: "Orthodox",
    country: "South Africa",
    countryFlag: "ZA",
    rank: "#1",
    image:
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=80",
    bio: "Former middleweight champion from South Africa. Lost the belt to Khamzat Chimaev at UFC 319. Relentless pressure fighter with knockout power.",
    notableWins: ["Israel Adesanya", "Sean Strickland", "Robert Whittaker"],
    style: ["Pressure", "Boxing", "Durability"],
  },
  {
    id: "f14",
    slug: "arman-tsarukyan",
    name: "Arman Tsarukyan",
    weightClass: "Lightweight",
    promotion: "UFC",
    record: { w: 23, l: 3, d: 0 },
    age: 28,
    height: "5'8\"",
    reach: "72\"",
    stance: "Orthodox",
    country: "Armenia / USA",
    countryFlag: "AM",
    rank: "#2",
    image:
      "https://images.unsplash.com/photo-1606921231101-6f0a09f63a13?auto=format&fit=crop&w=900&q=80",
    bio: "One of the most well-rounded fighters in the lightweight division. Climbed to P4P #13 after UFC 327. Wrestling-heavy with improving striking.",
    notableWins: ["Charles Oliveira", "Beneil Dariush", "Mateusz Gamrot"],
    style: ["Wrestling", "Grappling", "Pressure"],
  },
];

export const COMBAT_STYLES = [
  {
    slug: "boxing",
    name: "Boxing",
    blurb: "Striking, footwork, and conditioning. The sweet science.",
    pros: ["Clean fundamentals", "Hand speed", "Cardio"],
    color: "from-blood-500 to-blood-700",
  },
  {
    slug: "muay-thai",
    name: "Muay Thai",
    blurb: "Art of 8 limbs — punches, kicks, knees, and elbows.",
    pros: ["Full-body striking", "Clinch work", "Toughness"],
    color: "from-orange-500 to-blood-600",
  },
  {
    slug: "bjj",
    name: "BJJ",
    blurb: "Grappling and submissions. Self-defense for any size.",
    pros: ["Leverage", "Problem solving", "Lifelong sport"],
    color: "from-blue-500 to-indigo-700",
  },
  {
    slug: "mma",
    name: "MMA",
    blurb: "Striking + grappling. The complete combat athlete.",
    pros: ["Well-rounded", "Cage IQ", "Athleticism"],
    color: "from-emerald-500 to-teal-700",
  },
  {
    slug: "wrestling",
    name: "Wrestling",
    blurb: "The base of every elite fighter. Control wins fights.",
    pros: ["Takedowns", "Top control", "Mental grit"],
    color: "from-amber-500 to-yellow-700",
  },
  {
    slug: "kickboxing",
    name: "Kickboxing",
    blurb: "Punches and kicks. Great cardio and self-defense.",
    pros: ["Cardio", "Striking variety", "Approachable"],
    color: "from-fuchsia-500 to-purple-700",
  },
];
