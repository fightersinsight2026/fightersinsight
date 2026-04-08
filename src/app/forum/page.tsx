import Link from "next/link";
import { ThreadRow } from "@/components/cards/thread-row";
import { FORUM_CATEGORIES, MOCK_THREADS } from "@/lib/mock-data";
import { Search, Plus, Flame, Clock, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum — Combat sports community discussion",
  description:
    "Join the conversation on UFC, boxing, MMA, Muay Thai, BJJ, and more. Ask questions, share takes, get advice.",
};

export default function ForumPage() {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-3">Community Forum</div>
              <h1 className="heading-display text-4xl sm:text-5xl text-white">
                Real talk. <span className="text-blood-500">Real fight fans.</span>
              </h1>
              <p className="mt-3 max-w-2xl text-ink-200">
                Discuss tonight&apos;s fights, get beginner advice, share gym recs, and argue about
                P4P rankings. Mods on duty 24/7.
              </p>
            </div>
            <Link href="/forum/new" className="btn-primary">
              <Plus className="h-4 w-4" /> New post
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                placeholder="Search the forum…"
                className="input pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary inline-flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-blood-500" /> Hot
              </button>
              <button className="btn-ghost">
                <TrendingUp className="h-4 w-4" /> Top
              </button>
              <button className="btn-ghost">
                <Clock className="h-4 w-4" /> New
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fi grid gap-8 py-10 lg:grid-cols-[1fr_280px]">
        {/* Threads */}
        <div className="space-y-3">
          {MOCK_THREADS.map((t) => (
            <ThreadRow key={t.id} thread={t} />
          ))}
        </div>

        {/* Categories sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="card p-4">
            <div className="eyebrow mb-3">Categories</div>
            <div className="space-y-1">
              {FORUM_CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/forum/c/${c.slug}`}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-white"
                >
                  <span>{c.name}</span>
                  <span className="text-[11px] text-ink-400">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="eyebrow mb-2">Community guidelines</div>
            <p className="text-xs text-ink-300">
              Be respectful. Trash talk OK, hate speech is not. Forum advice is not professional
              coaching or medical advice — see a real coach for serious issues.
            </p>
            <Link href="/guidelines" className="mt-3 inline-block text-xs font-semibold text-blood-500">
              Read full guidelines →
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
