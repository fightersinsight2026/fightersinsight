"use client";

import { useState, useMemo, useEffect } from "react";
import { FighterCard } from "@/components/cards/fighter-card";
import { MOCK_FIGHTERS } from "@/lib/mock-data";
import Image from "next/image";
import { Search, Heart } from "lucide-react";

const MENS_WEIGHT_CLASSES = [
  "Flyweight",
  "Bantamweight",
  "Featherweight",
  "Lightweight",
  "Welterweight",
  "Middleweight",
  "Light Heavyweight",
  "Heavyweight",
];

const WOMENS_WEIGHT_CLASSES = [
  "W-Strawweight",
  "W-Flyweight",
  "W-Bantamweight",
  "W-Featherweight",
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

  // Fighters for the selected promotion (excluding followed)
  const promotionFighters = useMemo(() => {
    if (!selectedPromotion) return [];
    return MOCK_FIGHTERS.filter(
      (f) => f.promotion === selectedPromotion && !followedSlugs.includes(f.slug)
    );
  }, [selectedPromotion, followedSlugs]);

  // Champions for the selected promotion (including followed — they appear in both sections)
  const champions = useMemo(() => {
    if (!selectedPromotion) return [];
    return MOCK_FIGHTERS.filter(
      (f) => f.promotion === selectedPromotion && f.rank === "C"
    );
  }, [selectedPromotion]);

  // Available weight classes for the selected promotion, split by men's/women's
  const allClasses = useMemo(() => {
    const classes = new Set(promotionFighters.map((f) => f.weightClass));
    // Also include champion weight classes
    champions.forEach((f) => classes.add(f.weightClass));
    return classes;
  }, [promotionFighters, champions]);

  const availableMens = useMemo(
    () => MENS_WEIGHT_CLASSES.filter((w) => allClasses.has(w)),
    [allClasses]
  );
  const availableWomens = useMemo(
    () => WOMENS_WEIGHT_CLASSES.filter((w) => allClasses.has(w)),
    [allClasses]
  );

  // Non-champion fighters filtered by weight class + search
  const filtered = useMemo(() => {
    if (!selectedPromotion || activeWeight === "All") return [];

    let fighters = promotionFighters.filter(
      (f) => f.weightClass === activeWeight && f.rank !== "C"
    );

    if (query.trim()) {
      const q = query.toLowerCase();
      fighters = fighters.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.nickname && f.nickname.toLowerCase().includes(q)) ||
          f.country.toLowerCase().includes(q)
      );
    }

    return fighters;
  }, [query, selectedPromotion, activeWeight, promotionFighters]);

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

      {/* Champions + weight class browsing — only after selecting a promotion */}
      {selectedPromotion && (
        <>
          {/* Champions */}
          {champions.length > 0 && (
            <section className="border-b border-ink-800/80 bg-ink-900/40">
              <div className="container-fi py-10">
                <div className="eyebrow mb-2">Champions</div>
                <h2 className="heading-display text-2xl text-white mb-6">
                  {selectedPromotion} Division Champions
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {champions.map((f) => (
                    <FighterCard key={f.id} fighter={f} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Weight class tabs + search */}
          <section className="container-fi py-10 pb-16">
            <h2 className="heading-display text-2xl text-white mb-6">Browse by weight class</h2>

            {/* Men's divisions */}
            {availableMens.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-2">Men&apos;s divisions</div>
                <div className="flex flex-wrap gap-0 rounded-lg border border-ink-700 overflow-hidden w-fit">
                  {availableMens.map((w, i) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setActiveWeight(activeWeight === w ? "All" : w)}
                      className={`px-4 py-2.5 text-sm font-semibold transition ${
                        i > 0 ? "border-l border-ink-700" : ""
                      } ${
                        w === activeWeight
                          ? "bg-blood-500 text-white"
                          : "bg-ink-850 text-ink-300 hover:bg-ink-800 hover:text-white"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Women's divisions */}
            {availableWomens.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-2">Women&apos;s divisions</div>
                <div className="flex flex-wrap gap-0 rounded-lg border border-ink-700 overflow-hidden w-fit">
                  {availableWomens.map((w, i) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setActiveWeight(activeWeight === w ? "All" : w)}
                      className={`px-4 py-2.5 text-sm font-semibold transition ${
                        i > 0 ? "border-l border-ink-700" : ""
                      } ${
                        w === activeWeight
                          ? "bg-blood-500 text-white"
                          : "bg-ink-850 text-ink-300 hover:bg-ink-800 hover:text-white"
                      }`}
                    >
                      {w.replace("W-", "")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeWeight === "All" ? (
              <div className="card p-10 text-center text-ink-300">
                Pick a weight class above to browse fighters in that division.
              </div>
            ) : (
              <>
                <div className="relative max-w-lg mb-6">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${activeWeight} fighters…`}
                    className="input pl-10"
                  />
                </div>

                {filtered.length === 0 ? (
                  <div className="card p-10 text-center text-ink-300">
                    No fighters found. Try a different search.
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((f) => (
                      <FighterCard key={f.id} fighter={f} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
