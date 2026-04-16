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
  const liveOrUpcoming = MOCK_EVENTS.slice(0, 3);

  return (
    <>
      {/* HERO — compact */}
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
        <div className="container-fi relative py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 chip-blood">
              <Flame className="h-3 w-3" /> Fight night, every night
            </div>
            <h1 className="mt-4 heading-display text-3xl sm:text-5xl lg:text-6xl text-white leading-[0.95]">
              Where fight fans <span className="text-blood-500">think deeper.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-ink-200">
              Independent fight blogs, live event reactions, real community discussion, gym &amp; trainer
              discovery, and gear reviews — all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/blogs" className="btn-primary">
                <Newspaper className="h-4 w-4" /> Latest blogs
              </Link>
              <Link href="/live" className="btn-secondary">
                <Radio className="h-4 w-4" /> Live events
              </Link>
              <Link href="/forum" className="btn-secondary">
                <Users className="h-4 w-4" /> Forum
              </Link>
              <Link href="/start-training" className="btn-gold">
                <Dumbbell className="h-4 w-4" /> Start training
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-4 gap-4">
              {[
                { v: "12k+", l: "Members" },
                { v: "180+", l: "Breakdowns" },
                { v: "60+", l: "Gyms" },
                { v: "24/7", l: "Live" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="heading-display text-xl text-white">{s.v}</div>
                  <div className="text-[10px] text-ink-400 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BLOGS — compact grid */}
      <section className="container-fi py-10">
        <SectionHeader
          eyebrow="Latest analysis"
          title="Featured blog posts"
          link="/blogs"
          linkLabel="All articles"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <BlogCard post={featured} featured />
          </div>
          {otherBlogs.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </section>

      {/* TONIGHT / UPCOMING EVENTS */}
      <section className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-10">
          <SectionHeader
            eyebrow="Live Fight Center"
            title="Tonight & upcoming"
            link="/live"
            linkLabel="All events"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveOrUpcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING DISCUSSIONS */}
      <section className="container-fi py-10">
        <SectionHeader
          eyebrow="Community"
          title="Trending discussions"
          link="/forum"
          linkLabel="Open the forum"
        />
        <div className="grid gap-2">
          {MOCK_THREADS.slice(0, 4).map((t) => (
            <ThreadRow key={t.id} thread={t} />
          ))}
        </div>
      </section>

      {/* START TRAINING CTA — compact */}
      <section className="border-y border-ink-800/80 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900">
        <div className="container-fi grid gap-8 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="eyebrow mb-2">Start Training</div>
            <h2 className="heading-display text-2xl text-white sm:text-4xl leading-[1.05]">
              Train like a fighter. <span className="text-blood-500">No experience needed.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-200">
              Find beginner-friendly gyms and trainers near you. Boxing, Muay Thai, BJJ, MMA — walk
              into your first class with confidence.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/start-training" className="btn-primary">
                Find gyms <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/start-training#guide" className="btn-secondary">
                Take the quiz
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {MOCK_GYMS.slice(0, 2).map((g) => (
              <GymCard key={g.id} gym={g} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FIGHTERS */}
      <section className="border-t border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-10">
          <SectionHeader
            eyebrow="Fighter database"
            title="Featured fighters"
            link="/fighters"
            linkLabel="Browse all"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_FIGHTERS.slice(0, 4).map((f) => (
              <FighterCard key={f.id} fighter={f} />
            ))}
          </div>
        </div>
      </section>

      {/* GEAR SPOTLIGHT */}
      <section className="container-fi py-10">
        <SectionHeader
          eyebrow="Gear we trust"
          title="Gear spotlight"
          link="/gear"
          linkLabel="All reviews"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_GEAR.slice(0, 4).map((g) => (
            <GearCard key={g.id} gear={g} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER — compact */}
      <section className="border-t border-ink-800/80 bg-ink-950">
        <div className="container-fi py-10">
          <div className="card mx-auto max-w-2xl p-6 sm:p-8 text-center">
            <div className="eyebrow mb-2">The Round 1 Newsletter</div>
            <h2 className="heading-display text-2xl text-white sm:text-3xl">
              Fight previews. Live alerts. Beginner tips.
            </h2>
            <p className="mt-2 text-sm text-ink-300">
              One email a week. Built by fight fans, for fight fans.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="inline" source="home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
