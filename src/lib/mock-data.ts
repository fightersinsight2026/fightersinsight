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
];

export type MockGym = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
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
    disciplines: ["Boxing", "Strength"],
    beginnerFriendly: true,
    partner: true,
    rating: 4.9,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=1200&q=80",
    blurb: "Old-school boxing with modern coaching. Beginner classes 7 days a week.",
  },
  {
    id: "g2",
    slug: "renzo-gracie-academy",
    name: "Renzo Gracie Academy",
    city: "New York",
    state: "NY",
    disciplines: ["BJJ", "MMA", "Wrestling"],
    beginnerFriendly: true,
    partner: false,
    rating: 4.8,
    priceRange: "$$$",
    image:
      "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop&w=1200&q=80",
    blurb: "World-class grappling. Daily fundamentals classes for white belts.",
  },
  {
    id: "g3",
    slug: "sitsongpeenong-muay-thai",
    name: "Sitsongpeenong Muay Thai",
    city: "Los Angeles",
    state: "CA",
    disciplines: ["Muay Thai", "Kickboxing"],
    beginnerFriendly: true,
    partner: true,
    rating: 4.9,
    priceRange: "$$",
    image:
      "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80",
    blurb: "Authentic Thai-style training with real Bangkok-trained coaches.",
  },
  {
    id: "g4",
    slug: "atos-jiu-jitsu",
    name: "Atos Jiu-Jitsu HQ",
    city: "San Diego",
    state: "CA",
    disciplines: ["BJJ", "No-Gi"],
    beginnerFriendly: true,
    partner: false,
    rating: 4.9,
    priceRange: "$$$",
    image:
      "https://images.unsplash.com/photo-1604586362320-d0fe66f1f6be?auto=format&fit=crop&w=1200&q=80",
    blurb: "Home of multiple-time IBJJF champions. Beginner Fundamentals 6 days/week.",
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
