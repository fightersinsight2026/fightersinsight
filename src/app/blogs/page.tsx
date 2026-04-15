"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/cards/blog-card";
import { MOCK_BLOGS } from "@/lib/mock-data";
import { Search, PenLine } from "lucide-react";
import Link from "next/link";

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

function BlogsContent() {
  const searchParams = useSearchParams();
  const paramTag = searchParams.get("tag");
  const paramAuthor = searchParams.get("author");
  const paramCategory = searchParams.get("category");

  const [query, setQuery] = useState(paramTag ?? paramAuthor ?? "");
  const [activeCategory, setActiveCategory] = useState(paramCategory ?? "All");

  useEffect(() => {
    if (paramTag) setQuery(paramTag);
    else if (paramAuthor) setQuery(paramAuthor);
    if (paramCategory) setActiveCategory(paramCategory);
  }, [paramTag, paramAuthor, paramCategory]);

  const filtered = useMemo(() => {
    let posts = MOCK_BLOGS;

    if (activeCategory !== "All") {
      posts = posts.filter((b) => b.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      posts = posts.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.author.name.toLowerCase().includes(q)
      );
    }

    return posts;
  }, [query, activeCategory]);

  const featured = filtered.find((b) => b.featured) ?? filtered[0];
  const rest = featured ? filtered.filter((b) => b.id !== featured.id) : [];

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
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, fighters, gyms…"
                className="input pl-12 py-3.5 text-base"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`chip cursor-pointer transition ${
                    c === activeCategory
                      ? "border-blood-500/50 bg-blood-500/10 text-white"
                      : "hover:border-ink-500 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="container-fi py-20 text-center">
          <p className="text-lg text-ink-300">No articles found. Try a different search or category.</p>
        </section>
      ) : (
        <>
          {featured && (
            <section className="container-fi py-12">
              <BlogCard post={featured} featured />
            </section>
          )}

          {rest.length > 0 && (
            <section className="container-fi pb-20">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Sign up to be a blogger CTA */}
      <section className="border-t border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-16">
          <div className="card mx-auto max-w-3xl p-8 sm:p-10 text-center">
            <div className="eyebrow mb-3">Write for us</div>
            <h2 className="heading-display text-3xl text-white sm:text-4xl">
              Got a take? Share it with the fight community.
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-ink-300">
              We&apos;re looking for fight analysts, coaches, gear testers, and passionate fans who
              want to write. Apply to become a contributor — no journalism degree required.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                <PenLine className="h-4 w-4" /> Apply to write
              </Link>
              <Link href="/guidelines" className="btn-secondary">
                Read contributor guidelines
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BlogsPage() {
  return (
    <Suspense>
      <BlogsContent />
    </Suspense>
  );
}
