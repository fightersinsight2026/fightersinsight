"use client";

import { useState, useMemo, useEffect } from "react";
import { FighterCard } from "@/components/cards/fighter-card";
import { MOCK_FIGHTERS } from "@/lib/mock-data";
import { Search, Heart } from "lucide-react";

const WEIGHT_CLASSES = [
  "All",
  "Strawweight",
  "Bantamweight",
  "Featherweight",
  "Lightweight",
  "Welterweight",
  "Middleweight",
  "Light Heavyweight",
  "Heavyweight",
];

const PROMOTIONS = ["All", "UFC", "Boxing", "ONE", "Bellator", "PFL"];

export default function FightersPage() {
  const [query, setQuery] = useState("");
  const [activePromotion, setActivePromotion] = useState("All");
  const [activeWeight, setActiveWeight] = useState("All");
  const [followedSlugs, setFollowedSlugs] = useState<string[]>([]);

  // Load followed fighters from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fi-followed-fighters");
      if (stored) setFollowedSlugs(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const followedFighters = useMemo(
    () => MOCK_FIGHTERS.filter((f) => followedSlugs.includes(f.slug)),
    [followedSlugs]
  );

  const filtered = useMemo(() => {
    let fighters = MOCK_FIGHTERS;

    if (activePromotion !== "All") {
      fighters = fighters.filter((f) => f.promotion === activePromotion);
    }

    if (activeWeight !== "All") {
      fighters = fighters.filter((f) => f.weightClass === activeWeight);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      fighters = fighters.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.nickname && f.nickname.toLowerCase().includes(q)) ||
          f.country.toLowerCase().includes(q) ||
          f.weightClass.toLowerCase().includes(q) ||
          f.promotion.toLowerCase().includes(q)
      );
    }

    return fighters;
  }, [query, activePromotion, activeWeight]);

  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">Fighter database</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white">
            Every fighter, <span className="text-blood-500">every record.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Profiles, records, styles, and tape on fighters across UFC, boxing, ONE, Bellator, PFL,
            and more.
          </p>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fighters by name, nickname, or country…"
                className="input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PROMOTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePromotion(p)}
                  className={`chip cursor-pointer transition ${
                    p === activePromotion
                      ? "border-blood-500/50 bg-blood-500/10 text-white"
                      : "hover:border-ink-500 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {WEIGHT_CLASSES.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setActiveWeight(w)}
                className={`chip cursor-pointer transition ${
                  w === activeWeight
                    ? "border-blood-500/50 bg-blood-500/10 text-white"
                    : "hover:border-ink-500 hover:text-white"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Following section */}
      {followedFighters.length > 0 && (
        <section className="border-b border-ink-800/80 bg-ink-900/40">
          <div className="container-fi py-10">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="h-5 w-5 text-blood-500 fill-blood-500" />
              <h2 className="heading-display text-xl text-white">Following</h2>
              <span className="text-sm text-ink-400">({followedFighters.length})</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {followedFighters.map((f) => (
                <FighterCard key={f.id} fighter={f} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All fighters */}
      <section className="container-fi py-12">
        {filtered.length === 0 ? (
          <div className="card p-10 text-center text-ink-300">
            No fighters found. Try a different search or filter.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((f) => (
              <FighterCard key={f.id} fighter={f} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
