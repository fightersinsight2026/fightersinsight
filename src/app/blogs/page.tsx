import { BlogCard } from "@/components/cards/blog-card";
import { MOCK_BLOGS } from "@/lib/mock-data";
import { Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs — Fight analysis, predictions & beginner guides",
  description:
    "Long-form fight analysis, predictions, recaps, beginner guides, and gear reviews from real coaches and fans.",
};

const CATEGORIES = [
  "All",
  "Fight Analysis",
  "Predictions",
  "Event Recaps",
  "Fighter Spotlights",
  "Training Advice",
  "Beginner Guides",
  "Gym Reviews",
  "Gear Reviews",
  "Opinion",
];

export default function BlogsPage() {
  const featured = MOCK_BLOGS.find((b) => b.featured) ?? MOCK_BLOGS[0];
  const rest = MOCK_BLOGS.filter((b) => b.id !== featured.id);

  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">The Insight</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white">
            Fight blogs that go <span className="text-blood-500">past the highlight reel.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Tape breakdowns, beginner guides, training advice, and honest opinion from real coaches
            and writers — not recycled press releases.
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                placeholder="Search articles, fighters, gyms…"
                className="input pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip cursor-pointer ${
                    c === "All" ? "border-blood-500/50 text-white" : ""
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-fi py-12">
        <BlogCard post={featured} featured />
      </section>

      <section className="container-fi pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
