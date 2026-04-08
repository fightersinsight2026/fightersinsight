import Link from "next/link";
import { GymCard } from "@/components/cards/gym-card";
import { COMBAT_STYLES, MOCK_GYMS } from "@/lib/mock-data";
import { MapPin, Search, Filter, Compass, Heart, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Training — Find gyms, trainers, and beginner guides",
  description:
    "Find beginner-friendly boxing, MMA, Muay Thai, and BJJ gyms near you. Real coach reviews. No experience needed.",
};

const FIRST_WEEK = [
  {
    n: 1,
    title: "Wear what you have",
    body: "Comfortable shorts and a t-shirt. Skip the fancy gear until you know what you actually need.",
  },
  {
    n: 2,
    title: "Show up early",
    body: "Get there 15 minutes early. Introduce yourself to the coach. Ask where to put your stuff.",
  },
  {
    n: 3,
    title: "Bring water + a mouthguard",
    body: "Even in fundamentals classes. A cheap boil-and-bite is fine to start.",
  },
  {
    n: 4,
    title: "It's OK to suck",
    body: "Everyone in that room sucked once. Drill. Ask questions. Tap early. Come back tomorrow.",
  },
];

export default function StartTrainingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800/80">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <div className="container-fi relative py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 chip-blood">
              <Sparkles className="h-3 w-3" /> No experience needed
            </div>
            <h1 className="mt-5 heading-display text-4xl sm:text-6xl text-white leading-[0.95]">
              Want to train like a fighter? <br />
              <span className="text-blood-500">Start this week.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-200">
              We&apos;ll help you pick a discipline, find a beginner-friendly gym near you, and walk
              into your first class with confidence. Beginners welcome — always.
            </p>

            {/* Search */}
            <div className="mt-8 card flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blood-500" />
                <input
                  type="text"
                  placeholder="Enter your city or zip code"
                  className="input pl-10"
                />
              </div>
              <button className="btn-primary shrink-0">
                <Search className="h-4 w-4" /> Find gyms near me
              </button>
            </div>
            <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-300 hover:text-white">
              <Compass className="h-3 w-3" /> Or use my current location
            </button>
          </div>
        </div>
      </section>

      {/* Combat style guide */}
      <section id="guide" className="container-fi py-16">
        <div className="eyebrow mb-3">Which sport fits you?</div>
        <h2 className="heading-display text-3xl text-white sm:text-4xl">
          Pick your fighting style.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-300">
          Every discipline has a different vibe. Here&apos;s a quick comparison so you can walk into
          the right room.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMBAT_STYLES.map((s) => (
            <div key={s.slug} className="card card-hover overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${s.color}`} />
              <div className="p-5">
                <h3 className="heading-display text-xl text-white">{s.name}</h3>
                <p className="mt-2 text-sm text-ink-300">{s.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.pros.map((p) => (
                    <span key={p} className="chip">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gym list + map area */}
      <section className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow mb-2">Near you</div>
              <h2 className="heading-display text-3xl text-white">Beginner-friendly gyms</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "All disciplines",
                "Boxing",
                "Muay Thai",
                "BJJ",
                "MMA",
                "Beginner friendly",
                "Kids classes",
                "Women's classes",
              ].map((f) => (
                <button
                  key={f}
                  className={`chip cursor-pointer ${
                    f === "All disciplines" ? "border-blood-500/50 text-white" : ""
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {MOCK_GYMS.map((g) => (
                <GymCard key={g.id} gym={g} />
              ))}
            </div>

            {/* Map placeholder */}
            <div className="card relative h-[480px] overflow-hidden lg:h-auto lg:min-h-[560px]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(rgba(225,29,42,0.05) 1px, transparent 1px)",
                  backgroundSize: "32px 32px, 64px 64px",
                  backgroundPosition: "0 0, 16px 16px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950/40 to-ink-900" />

              {/* Pins */}
              {[
                { top: "22%", left: "30%", label: "Ironworks" },
                { top: "44%", left: "62%", label: "Renzo" },
                { top: "68%", left: "38%", label: "Atos" },
                { top: "30%", left: "78%", label: "Sitsongpeenong" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: p.top, left: p.left }}
                >
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-blood-500 ring-4 ring-blood-500/30 animate-pulseRing" />
                    <div className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-md border border-ink-700 bg-ink-900/90 px-2 py-1 text-[10px] font-semibold text-white shadow">
                      {p.label}
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute right-3 top-3 flex gap-2">
                <button className="btn-secondary h-9 px-2.5">
                  <Filter className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 rounded-md border border-ink-700 bg-ink-900/90 px-3 py-2 text-xs text-ink-300">
                Live map preview · Wire to Google Maps with{" "}
                <code className="text-blood-500">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainer marketplace teaser */}
      <section className="container-fi py-16">
        <div className="eyebrow mb-3">Private trainers</div>
        <h2 className="heading-display text-3xl text-white">Want 1-on-1 coaching?</h2>
        <p className="mt-2 max-w-2xl text-ink-300">
          Browse vetted trainers — boxing mitt work, strength & conditioning, MMA prep, and more.
          In-person or online.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Coach Marco DeLeón",
              spec: "Boxing mitt work · Footwork",
              city: "Brooklyn, NY",
              price: "$80 / hour",
              rating: 5.0,
              partner: true,
            },
            {
              name: "Priya Nair",
              spec: "BJJ Fundamentals · Women's classes",
              city: "Online + LA",
              price: "$60 / hour",
              rating: 4.9,
              partner: false,
            },
            {
              name: "Tariq Bell",
              spec: "MMA prep · Strength & conditioning",
              city: "Austin, TX",
              price: "$95 / hour",
              rating: 4.8,
              partner: true,
            },
          ].map((t) => (
            <div key={t.name} className="card p-5">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blood-500 font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-ink-400">{t.spec}</div>
                </div>
                {t.partner && (
                  <span className="chip-gold ml-auto inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 text-ink-300">
                  <MapPin className="h-3 w-3" /> {t.city}
                </span>
                <span className="font-bold text-white">{t.price}</span>
              </div>
              <Link href="#" className="btn-secondary mt-4 w-full">
                View profile
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* First week guide */}
      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-16">
          <div className="eyebrow mb-3">First week guide</div>
          <h2 className="heading-display text-3xl text-white">How to start your first week.</h2>
          <p className="mt-2 max-w-2xl text-ink-300">
            Walk into your first class without panicking. Here&apos;s the playbook.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FIRST_WEEK.map((s) => (
              <div key={s.n} className="card p-5">
                <div className="heading-display text-3xl text-blood-500">0{s.n}</div>
                <h3 className="mt-2 font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 card p-5 text-sm text-ink-300">
            <div className="inline-flex items-center gap-2 font-semibold text-white">
              <Heart className="h-4 w-4 text-blood-500" /> A note on safety
            </div>
            <p className="mt-2">
              Train smart. Listen to your body. The advice on this site is community-driven and not
              a substitute for professional coaching or medical advice. If something hurts beyond
              normal soreness — see a real coach and a real doctor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
