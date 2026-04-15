"use client";

import { useState, useMemo, useEffect } from "react";
import { FighterCard } from "@/components/cards/fighter-card";
import { MOCK_FIGHTERS } from "@/lib/mock-data";
import Image from "next/image";
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

const PROMOTIONS = [
  {
    name: "UFC",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
    desc: "Premier MMA promotion",
  },
  {
    name: "Boxing",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80",
    desc: "The sweet science",
  },
  {
    name: "ONE",
    image: "https://images.unsplash.com/photo-1606921231101-6f0a09f63a13?auto=format&fit=crop&w=600&q=80",
    desc: "Asia's largest promotion",
  },
  {
    name: "Bellator",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=600&q=80",
    desc: "Global MMA contender",
  },
  {
    name: "PFL",
    image: "https://images.unsplash.com/photo-1518609571773-39b7d303a87b?auto=format&fit=crop&w=600&q=80",
    desc: "Season format MMA",
  },
];

export default function FightersPage() {
  const [query, setQuery] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null);
  const [activeWeight, setActiveWeight] = useState("All");
  const [followedSlugs, setFollowedSlugs] = useState<string[]>([]);

  // Load followed fighters from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fi-followed-fighters");
      if (stored) setFollowedSlugs(JSON.parse(stored));
    } catch { /* ignore */ }

    // Listen for storage changes from other tabs / detail page
    function onStorage() {
      try {
        const stored = localStorage.getItem("fi-followed-fighters");
        if (stored) setFollowedSlugs(JSON.parse(stored));
      } catch { /* ignore */ }
    }
    window.addEventListener("storage", onStorage);
    // Also poll on focus for same-tab updates
    function onFocus() { onStorage(); }
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const followedFighters = useMemo(
    () => MOCK_FIGHTERS.filter((f) => followedSlugs.includes(f.slug)),
    [followedSlugs]
  );

  const filtered = useMemo(() => {
    if (!selectedPromotion) return [];

    let fighters = MOCK_FIGHTERS.filter((f) => f.promotion === selectedPromotion);

    // Remove followed fighters from the main grid
    fighters = fighters.filter((f) => !followedSlugs.includes(f.slug));

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
          f.weightClass.toLowerCase().includes(q)
      );
    }

    return fighters;
  }, [query, selectedPromotion, activeWeight, followedSlugs]);

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

      {/* Pick an organization */}
      <section className="container-fi py-12">
        <h2 className="heading-display text-2xl text-white mb-2">Pick an organization</h2>
        <p className="text-sm text-ink-400 mb-6">Select a promotion to browse fighters.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROMOTIONS.map((p) => {
            const isActive = selectedPromotion === p.name;
            const count = MOCK_FIGHTERS.filter((f) => f.promotion === p.name).length;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setSelectedPromotion(isActive ? null : p.name);
                  setActiveWeight("All");
                  setQuery("");
                }}
                className={`card group relative overflow-hidden transition cursor-pointer aspect-[4/3] ${
                  isActive
                    ? "border-blood-500/50 ring-2 ring-blood-500/40"
                    : "hover:border-ink-500"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 50vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 transition ${isActive ? "bg-blood-500/40" : "bg-ink-950/60 group-hover:bg-ink-950/50"}`} />
                <div className="relative flex flex-col items-center justify-center h-full">
                  <div className={`heading-display text-3xl drop-shadow-lg ${isActive ? "text-white" : "text-white"}`}>
                    {p.name}
                  </div>
                  <div className="text-xs text-ink-200 mt-1">{p.desc}</div>
                  <div className="text-[11px] text-ink-300 mt-2 uppercase tracking-wider font-semibold">
                    {count} fighters
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Fighters grid — only shows after selecting a promotion */}
      {selectedPromotion && (
        <section className="container-fi pb-16">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-6">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${selectedPromotion} fighters…`}
                className="input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
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

          {filtered.length === 0 ? (
            <div className="card p-10 text-center text-ink-300">
              No fighters found. Try a different search or weight class.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((f) => (
                <FighterCard key={f.id} fighter={f} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
