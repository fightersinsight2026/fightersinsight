import { Trophy, MapPin, Bookmark, MessageSquare, Settings } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Your profile" };

const BADGES = [
  { name: "First Post", desc: "Made your first comment" },
  { name: "Live Regular", desc: "Active in 5+ live events" },
  { name: "Gear Reviewer", desc: "Wrote a gear review" },
  { name: "Helpful", desc: "10 upvoted advice replies" },
];

export default function ProfilePage() {
  return (
    <>
      <section className="border-b border-ink-800/80 bg-gradient-to-b from-blood-700/10 to-transparent">
        <div className="container-fi py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-blood-500 text-3xl font-black text-white shadow-bloodglow">
              NJ
            </div>
            <div className="flex-1">
              <h1 className="heading-display text-3xl text-white">newjabber</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-300">
                <span className="chip">Beginner</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Brooklyn, NY
                </span>
                <span>· joined April 2026</span>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-ink-200">
                Just started boxing 3 months ago. Here for advice, gear tips, and live event chaos.
              </p>
            </div>
            <Link href="/profile/settings" className="btn-secondary self-start">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { l: "Reputation", v: "412" },
              { l: "Posts", v: "23" },
              { l: "Replies", v: "187" },
              { l: "Saved", v: "41" },
            ].map((s) => (
              <div key={s.l} className="card p-4">
                <div className="text-xs uppercase tracking-wider text-ink-400">{s.l}</div>
                <div className="heading-display text-2xl text-white">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fi grid gap-8 py-12 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="heading-display text-xl text-white mb-4">Recent activity</h2>
          <div className="space-y-3">
            {[
              { type: "comment", body: "Great breakdown! I never noticed the angle reset before." },
              { type: "post", body: "First pair of gloves — Cleto Reyes or Winning for a beginner?" },
              { type: "save", body: "Saved: The 5 best boxing gloves under $100" },
            ].map((a, i) => (
              <div key={i} className="card p-4">
                <div className="text-xs uppercase tracking-wider text-ink-400">{a.type}</div>
                <p className="mt-1 text-sm text-ink-200">{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-4">
            <div className="eyebrow mb-3 inline-flex items-center gap-1.5">
              <Trophy className="h-3 w-3 text-gold-500" /> Badges
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((b) => (
                <div key={b.name} className="rounded-md border border-ink-700 bg-ink-900 p-3 text-center">
                  <div className="text-sm font-bold text-white">{b.name}</div>
                  <div className="mt-1 text-[10px] text-ink-400">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-4">
            <div className="eyebrow mb-2 inline-flex items-center gap-1.5">
              <Bookmark className="h-3 w-3" /> Saved
            </div>
            <p className="text-xs text-ink-300">41 items across blogs, threads, and gyms.</p>
          </div>
          <div className="card p-4">
            <div className="eyebrow mb-2 inline-flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" /> Followed topics
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Boxing", "Beginner", "Gear", "UFC"].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
