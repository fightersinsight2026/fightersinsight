import Link from "next/link";
import { notFound } from "next/navigation";
import { ThreadRow } from "@/components/cards/thread-row";
import { FORUM_CATEGORIES, MOCK_THREADS } from "@/lib/mock-data";
import { ArrowLeft, Plus } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return FORUM_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = FORUM_CATEGORIES.find((x) => x.slug === params.slug);
  if (!c) return { title: "Category not found" };
  return { title: `${c.name} — Forum`, description: c.description };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = FORUM_CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) notFound();

  // Lightweight mock filter — match category name to thread.category by partial substring.
  const threads = MOCK_THREADS.filter((t) =>
    t.category.toLowerCase().includes(category.name.toLowerCase().split(" ")[0])
  );

  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-12">
          <Link
            href="/forum"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> All categories
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">Forum category</div>
              <h1 className="heading-display text-3xl sm:text-5xl text-white">{category.name}</h1>
              <p className="mt-2 text-ink-300">{category.description}</p>
            </div>
            <Link href="/forum/new" className="btn-primary">
              <Plus className="h-4 w-4" /> New post
            </Link>
          </div>
        </div>
      </section>

      <div className="container-fi grid gap-8 py-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {threads.length === 0 ? (
            <div className="card p-8 text-center text-ink-300">
              No threads in this category yet. Be the first to post.
            </div>
          ) : (
            threads.map((t) => <ThreadRow key={t.id} thread={t} />)
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="card p-4">
            <div className="eyebrow mb-3">Other categories</div>
            <div className="space-y-1">
              {FORUM_CATEGORIES.filter((c) => c.slug !== category.slug)
                .slice(0, 8)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/forum/c/${c.slug}`}
                    className="block rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-white"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
