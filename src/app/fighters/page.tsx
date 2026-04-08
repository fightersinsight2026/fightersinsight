import { FighterCard } from "@/components/cards/fighter-card";
import { MOCK_FIGHTERS } from "@/lib/mock-data";
import { Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fighters — The fighter database",
  description:
    "Browse fighter profiles, records, styles, and rankings from across UFC, boxing, ONE, Bellator, and PFL.",
};

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
                placeholder="Search fighters by name, nickname, or country…"
                className="input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PROMOTIONS.map((p) => (
                <button
                  key={p}
                  className={`chip cursor-pointer ${
                    p === "All" ? "border-blood-500/50 text-white" : ""
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
                className={`chip cursor-pointer ${
                  w === "All" ? "border-blood-500/50 text-white" : ""
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fi py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_FIGHTERS.map((f) => (
            <FighterCard key={f.id} fighter={f} />
          ))}
        </div>
      </section>
    </>
  );
}
