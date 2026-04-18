import { GearCard } from "@/components/cards/gear-card";
import { GearRecommender } from "@/components/gear/gear-recommender";
import { MOCK_GEAR } from "@/lib/mock-data";
import { Award, Search, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gear Reviews — Honest combat sports gear guides",
  description:
    "Real reviews of boxing gloves, shin guards, mouthguards, MMA gear, BJJ gis, and more. Beginner picks, premium picks, and value picks.",
};

const CATEGORIES = [
  "All",
  "Boxing Gloves",
  "Hand Wraps",
  "Shin Guards",
  "Mouthguards",
  "Headgear",
  "Boxing Shoes",
  "MMA Gloves",
  "BJJ Gis",
  "Heavy Bags",
  "Recovery",
];

const PICKS = [
  { label: "Best for beginners", icon: "B" },
  { label: "Best value", icon: "$" },
  { label: "Best premium", icon: "★" },
  { label: "Coach pick", icon: "C" },
];

export default function GearPage() {
  return (
    <>
      <GearRecommender />
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">Gear Reviews</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white">
            Real reviews. <span className="text-blood-500">Real gym tested.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-ink-200">
            We train in the gear before we write about it. No paid placements pretending to be
            opinions. If we say it&apos;s good, it&apos;s good.
          </p>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                placeholder="Search products, brands, categories…"
                className="input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PICKS.map((p) => (
                <span key={p.label} className="chip-gold inline-flex items-center gap-1.5">
                  <Award className="h-3 w-3" /> {p.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip cursor-pointer ${
                  c === "All" ? "border-blood-500/50 text-white" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured "best of" rail */}
      <section className="container-fi py-14">
        <div className="card overflow-hidden lg:flex">
          <div className="lg:w-2/3 p-8">
            <div className="eyebrow mb-2">Best of 2026</div>
            <h2 className="heading-display text-3xl text-white sm:text-4xl">
              The best boxing gloves under $100 we actually trained in.
            </h2>
            <p className="mt-3 max-w-xl text-ink-300">
              4 weeks of bag work, mitts, and sparring. Five popular options. Here&apos;s the only
              ranking you need.
            </p>
            <button className="btn-primary mt-6">Read the full guide</button>
          </div>
          <div className="lg:w-1/3 bg-ink-900 p-6">
            <div className="eyebrow mb-2">Quick winners</div>
            <ul className="space-y-3 text-sm">
              {[
                { tag: "Best overall", name: "Hayabusa T3" },
                { tag: "Best value", name: "Ringside IMF Tech" },
                { tag: "Best premium", name: "Winning MS-500" },
                { tag: "Beginner pick", name: "Venum Contender" },
              ].map((w) => (
                <li key={w.name} className="flex items-center justify-between">
                  <span className="chip-blood">{w.tag}</span>
                  <span className="font-bold text-white">{w.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-fi pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_GEAR.map((g) => (
            <GearCard key={g.id} gear={g} />
          ))}
        </div>

        <div className="card mt-10 p-5 text-sm text-ink-300">
          <div className="inline-flex items-center gap-2 font-semibold text-white">
            <ShieldCheck className="h-4 w-4 text-gold-500" /> Affiliate disclosure
          </div>
          <p className="mt-2">
            Some links on this page are affiliate links. We only recommend gear we&apos;ve actually
            trained in. Affiliate revenue helps keep the platform free.
          </p>
        </div>
      </section>
    </>
  );
}
