import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_FIGHTERS } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Trophy, Bookmark, Share2 } from "lucide-react";
import { FighterCard } from "@/components/cards/fighter-card";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_FIGHTERS.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = MOCK_FIGHTERS.find((x) => x.slug === params.slug);
  if (!f) return { title: "Fighter not found" };
  return {
    title: `${f.name}${f.nickname ? ` "${f.nickname}"` : ""} — Fighter Profile`,
    description: f.bio,
    openGraph: { images: [f.image] },
  };
}

export default function FighterPage({ params }: { params: { slug: string } }) {
  const f = MOCK_FIGHTERS.find((x) => x.slug === params.slug);
  if (!f) notFound();
  const others = MOCK_FIGHTERS.filter((x) => x.id !== f.id).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800/80">
        <div className="absolute inset-0">
          <Image src={f.image} alt={f.name} fill priority className="object-cover blur-2xl opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />

        <div className="container-fi relative grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-ink-700 shadow-cardglow">
            <Image src={f.image} alt={f.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
          </div>

          <div>
            <Link
              href="/fighters"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-3 w-3" /> All fighters
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {f.rank && (
                <span className="chip-blood font-black">
                  {f.rank === "C" ? "CHAMPION" : `Ranked ${f.rank}`}
                </span>
              )}
              <span className="chip-gold">{f.promotion}</span>
              <span className="chip">{f.weightClass}</span>
            </div>

            <h1 className="mt-3 heading-display text-5xl sm:text-7xl text-white leading-[0.95]">
              {f.name}
            </h1>
            {f.nickname && (
              <div className="mt-2 italic text-2xl text-blood-500">&ldquo;{f.nickname}&rdquo;</div>
            )}

            <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-300">
              <MapPin className="h-4 w-4" /> {f.country}
            </div>

            {/* Record */}
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
              <div className="card p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-ink-400">Wins</div>
                <div className="heading-display text-3xl text-white">{f.record.w}</div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-ink-400">Losses</div>
                <div className="heading-display text-3xl text-blood-500">{f.record.l}</div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-ink-400">Draws</div>
                <div className="heading-display text-3xl text-ink-300">{f.record.d}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="btn-secondary">
                <Bookmark className="h-4 w-4" /> Follow fighter
              </button>
              <button className="btn-ghost">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats + bio */}
      <section className="container-fi grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          <div>
            <h2 className="heading-display text-2xl text-white">Bio</h2>
            <p className="mt-3 text-ink-200 leading-relaxed">{f.bio}</p>
          </div>

          <div>
            <h2 className="heading-display text-2xl text-white">Style</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {f.style.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="heading-display text-2xl text-white inline-flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold-500" /> Notable wins
            </h2>
            <ul className="mt-3 space-y-2">
              {f.notableWins.map((w) => (
                <li key={w} className="card flex items-center gap-3 p-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blood-500 text-xs font-bold text-white">
                    W
                  </span>
                  <span className="text-white font-semibold">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="card p-5">
            <div className="eyebrow mb-3">Tale of the tape</div>
            <dl className="space-y-2 text-sm">
              {[
                { k: "Age", v: `${f.age}` },
                { k: "Height", v: f.height },
                { k: "Reach", v: f.reach },
                { k: "Stance", v: f.stance },
                { k: "Weight class", v: f.weightClass },
                { k: "Promotion", v: f.promotion },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between border-b border-ink-800 pb-1.5 last:border-0">
                  <dt className="text-ink-400">{row.k}</dt>
                  <dd className="font-bold text-white">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      {/* Other fighters */}
      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-12">
          <h2 className="heading-display text-2xl text-white mb-6">More fighters</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((x) => (
              <FighterCard key={x.id} fighter={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
