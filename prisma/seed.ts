/**
 * Seed script for The Fighter's Insight.
 *
 * Run: npm run db:seed
 *
 * Wires the same mock data the UI uses into a real Postgres database via Prisma.
 * Safe to re-run — uses upserts where possible.
 */
import { PrismaClient, UserRole, ExperienceLevel, BlogStatus, BlogCategory, LiveEventStatus, Promotion, ThreadType, CombatStyle, PriceRange, PartnerStatus, GearCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@fightersinsight.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@fightersinsight.com",
      role: UserRole.ADMIN,
      experienceLevel: ExperienceLevel.COACH,
      bio: "Site owner. Tape obsessive.",
      favoriteSports: [CombatStyle.BOXING, CombatStyle.MMA],
    },
  });

  // Sample fan user
  const fan = await prisma.user.upsert({
    where: { email: "newjabber@example.com" },
    update: {},
    create: {
      username: "newjabber",
      email: "newjabber@example.com",
      role: UserRole.FAN,
      experienceLevel: ExperienceLevel.BEGINNER,
      flair: "Beginner",
      location: "Brooklyn, NY",
      favoriteSports: [CombatStyle.BOXING],
    },
  });

  // Forum categories
  const categories = [
    { slug: "ufc", name: "UFC Discussion", description: "All things UFC." },
    { slug: "boxing", name: "Boxing", description: "Sweet science talk." },
    { slug: "mma", name: "MMA General", description: "Cross-promotion MMA." },
    { slug: "muay-thai", name: "Muay Thai / Kickboxing", description: "Art of 8 limbs." },
    { slug: "bjj", name: "BJJ / Grappling / Wrestling", description: "Mat life." },
    { slug: "breakdowns", name: "Fight Breakdowns", description: "Tape study." },
    { slug: "training", name: "Training Advice", description: "Get better." },
    { slug: "beginners", name: "Beginner Questions", description: "No question is too basic." },
    { slug: "gear", name: "Gear Talk", description: "Gloves, wraps, shoes." },
    { slug: "gyms", name: "Gym Recommendations", description: "Find your home gym." },
    { slug: "news", name: "Fighter News", description: "Hot off the wire." },
    { slug: "off-topic", name: "Off Topic", description: "Everything else." },
  ];

  for (const c of categories) {
    await prisma.forumCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  const boxingCat = await prisma.forumCategory.findUniqueOrThrow({ where: { slug: "boxing" } });

  // Sample thread
  await prisma.forumThread.upsert({
    where: { slug: "topuria-power-real" },
    update: {},
    create: {
      title: "Topuria's KO power: real or matchmaking?",
      slug: "topuria-power-real",
      body: "Hot take time. Watch the way Topuria steps in...",
      type: ThreadType.STANDARD,
      tags: ["Debate", "Breakdown"],
      upvotes: 233,
      categoryId: boxingCat.id,
      userId: fan.id,
    },
  });

  // Sample blog post
  await prisma.blogPost.upsert({
    where: { slug: "topuria-vs-holloway-breakdown" },
    update: {},
    create: {
      title: "Topuria vs Holloway: Why footwork — not power — decides this fight",
      slug: "topuria-vs-holloway-breakdown",
      excerpt:
        "Holloway's volume is legendary. Topuria's left hook is nuclear. But the real story is in the angles.",
      content: "Long-form markdown content goes here...",
      coverImage:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=80",
      category: BlogCategory.FIGHT_ANALYSIS,
      tags: ["UFC", "Featherweight", "Breakdown"],
      status: BlogStatus.PUBLISHED,
      featured: true,
      readingMinutes: 9,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  // Sample live event
  await prisma.liveEvent.upsert({
    where: { slug: "ufc-318" },
    update: {},
    create: {
      title: "UFC 318: Topuria vs Holloway",
      slug: "ufc-318",
      promotion: Promotion.UFC,
      venue: "T-Mobile Arena",
      city: "Las Vegas",
      country: "USA",
      startTime: new Date(),
      status: LiveEventStatus.LIVE,
      coverImage:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80",
    },
  });

  // Sample gym
  await prisma.gymListing.upsert({
    where: { slug: "ironworks-boxing" },
    update: {},
    create: {
      name: "Ironworks Boxing Club",
      slug: "ironworks-boxing",
      description: "Old-school boxing with modern coaching.",
      address: "100 Sample St",
      city: "Brooklyn",
      state: "NY",
      country: "USA",
      lat: 40.6782,
      lng: -73.9442,
      disciplines: [CombatStyle.BOXING],
      priceRange: PriceRange.STANDARD,
      beginnerFriendly: true,
      partnerStatus: PartnerStatus.FEATURED,
      featured: true,
      rating: 4.9,
      ratingCount: 142,
    },
  });

  // Sample gear review
  await prisma.gearReview.upsert({
    where: { slug: "winning-ms-500-boxing-gloves" },
    update: {},
    create: {
      title: "Winning MS-500 Review: Worth the price?",
      slug: "winning-ms-500-boxing-gloves",
      productName: "Winning MS-500",
      brand: "Winning",
      category: GearCategory.BOXING_GLOVES,
      description: "The gold standard of sparring gloves.",
      pros: ["Unmatched padding", "Lifetime durability", "Wrist support"],
      cons: ["Expensive", "Long shipping from Japan"],
      bestFor: "Premium sparring",
      comfort: 10,
      durability: 10,
      value: 7,
      overallRating: 9.6,
      priceMin: 350,
      priceMax: 450,
      recommendedLevel: ExperienceLevel.AMATEUR,
      affiliateLink: "#",
      featured: true,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
