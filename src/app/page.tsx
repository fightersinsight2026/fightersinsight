import Link from "next/link";
import { BlogCard } from "@/components/cards/blog-card";
import { EventCard } from "@/components/cards/event-card";
import { ThreadRow } from "@/components/cards/thread-row";
import { GymCard } from "@/components/cards/gym-card";
import { GearCard } from "@/components/cards/gear-card";
import { FighterCard } from "@/components/cards/fighter-card";
import { SectionHeader } from "@/components/sections/section-header";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  MOCK_BLOGS,
  MOCK_EVENTS,
  MOCK_THREADS,
  MOCK_GYMS,
  MOCK_GEAR,
  MOCK_FIGHTERS,
} from "@/lib/mock-data";
import { ArrowRight, Flame, Newspaper, Radio, Users, Dumbbell } from "lucide-react";

export default function HomePage() {
  const featured = MOCK_BLOGS.find((b) => b.featured) ?? MOCK_BLOGS[0];
  const otherBlogs = MOCK_BLOGS.filter((b) => b.id !== featured.id).slice(0, 3);
  const liveOrUpcoming = MOCK_EVENTS;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink-800/80">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(transparent 95%, rgba(255,255,255,0.6) 95%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.6) 95%)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container-fi relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 chip-blood">
              <Flame className="h-3 w-3" /> Fight night, every night
            </div>
            <h1 className="mt-5 heading-display text-4xl sm:text-6xl lg:text-7xl text-white leading-[0.95]">
              Where fight fans <span className="text-blood-500">think deeper.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-200">
              Independent fight blogs, live event reactions, real community discussion, gym & trainer
              discovery, and gear reviews — all in one place. For hardcore fans and total beginners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blogs" className="btn-primary">
                <Newspaper className="h-4 w-4" /> Read latest blogs
              </Link>
              <Link href="/live" className="btn-secondary">
                <Radio className="h-4 w-4" /> Follow live events
              </Link>
              <Link href="/forum" className="btn-secondary">
                <Users className="h-4 w-4" /> Join the forum
              </Link>
              <Link href="/start-training" className="btn-gold">
                <Dumbbell className="h-4 w-4" /> Start training
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { v: "12k+", l: "Active members" },
                { v: "180+", l: "Fight breakdowns" },
                { v: "60+", l: "Partner gyms" },
                { v: "24/7", l: "Live coverage" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="heading-display text-2xl text-white">{s.v}</div>
                  <div className="text-xs text-ink-400 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BLOGS */}
      <section className="container-fi py-16">
        <SectionHeader
          eyebrow="Latest analysis"
          title="Featured blog posts"
          link="/blogs"
          linkLabel="All articles"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <BlogCard post={featured} featured />
          <div className="grid gap-6">
            {otherBlogs.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* TONIGHT / UPCOMING EVENTS */}
      <section className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-16">
          <SectionHeader
            eyebrow="Live Fight Center"
            title="Tonight & upcoming events"
            link="/live"
            linkLabel="All events"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveOrUpcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING DISCUSSIONS */}
      <section className="container-fi py-16">
        <SectionHeader
          eyebrow="Community"
          title="Trending discussions"
          link="/forum"
          linkLabel="Open the forum"
        />
        <div className="grid gap-3">
          {MOCK_THREADS.slice(0, 5).map((t) => (
            <ThreadRow key={t.id} thread={t} />
          ))}
        </div>
      </section>

      {/* START TRAINING CTA */}
      <section className="border-y border-ink-800/80 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900">
        <div className="container-fi grid gap-10 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="eyebrow mb-3">Start Training</div>
            <h2 className="heading-display text-3xl text-white sm:text-5xl leading-[1.05]">
              Want to train like a fighter? <br />
              <span className="text-blood-500">No experience needed.</span>
            </h2>
            <p className="mt-5 max-w-xl text-ink-200">
              Find beginner-friendly gyms and trainers near you. Boxing, Muay Thai, BJJ, MMA — we
              help you choose the right discipline and walk into your first class with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/start-training" className="btn-primary">
                Find gyms near me <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/start-training#guide" className="btn-secondary">
                Which sport fits me?
              </Link>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-ink-200 sm:grid-cols-2">
              {[
                "Beginner classes 7 days a week at partner gyms",
                "Map-based search by discipline and price",
                "Honest, beginner-focused gear guides",
                "Real coach reviews — not affiliate spam",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blood-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MOCK_GYMS.slice(0, 4).map((g) => (
              <GymCard key={g.id} gym={g} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FIGHTERS */}
      <section className="border-t border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-16">
          <SectionHeader
            eyebrow="Fighter database"
            title="Featured fighters"
            link="/fighters"
            linkLabel="Browse all fighters"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_FIGHTERS.slice(0, 4).map((f) => (
              <FighterCard key={f.id} fighter={f} />
            ))}
          </div>
        </div>
      </section>

      {/* GEAR SPOTLIGHT */}
      <section className="container-fi py-16">
        <SectionHeader
          eyebrow="Gear we trust"
          title="Gear spotlight"
          link="/gear"
          linkLabel="All reviews"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_GEAR.slice(0, 4).map((g) => (
            <GearCard key={g.id} gear={g} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-ink-800/80 bg-ink-950">
        <div className="container-fi py-16">
          <div className="card mx-auto max-w-3xl p-8 sm:p-10 text-center">
            <div className="eyebrow mb-3">The Round 1 Newsletter</div>
            <h2 className="heading-display text-3xl text-white sm:text-4xl">
              Fight previews. Live alerts. Beginner tips.
            </h2>
            <p className="mt-3 text-ink-300">
              One email a week. Built by fight fans, for fight fans. Unsubscribe anytime.
            </p>
            <div className="mt-6">
              <NewsletterForm variant="inline" source="home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
