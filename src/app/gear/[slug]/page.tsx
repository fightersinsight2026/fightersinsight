import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_GEAR } from "@/lib/mock-data";
import { GearCard } from "@/components/cards/gear-card";
import { ArrowLeft, Star, Check, X, ExternalLink, Bookmark, Share2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_GEAR.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = MOCK_GEAR.find((x) => x.slug === params.slug);
  if (!g) return { title: "Gear not found" };
  return {
    title: `${g.name} review — ${g.brand}`,
    description: `Hands-on review: ${g.bestFor}. Rated ${g.rating}/10.`,
    openGraph: { images: [g.image] },
  };
}

const PROS = [
  "Excellent padding distribution",
  "Wrist support is best in class",
  "Holds up to 6+ months of heavy use",
  "Comfortable from day one",
];

const CONS = [
  "Pricier than competitors",
  "Long break-in period for some users",
];

export default function GearDetailPage({ params }: { params: { slug: string } }) {
  const g = MOCK_GEAR.find((x) => x.slug === params.slug);
  if (!g) notFound();
  const others = MOCK_GEAR.filter((x) => x.id !== g.id).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-10">
          <Link
            href="/gear"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> All gear reviews
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="card relative aspect-square overflow-hidden">
              <Image
                src={g.image}
                alt={g.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <div className="eyebrow mb-2">{g.category}</div>
              <h1 className="heading-display text-3xl sm:text-5xl text-white">{g.name}</h1>
              <div className="mt-1 text-lg text-ink-300">by {g.brand}</div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="card inline-flex items-center gap-2 px-3 py-2">
                  <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                  <span className="heading-display text-2xl text-white">{g.rating}</span>
                  <span className="text-ink-400">/10</span>
                </div>
                <span className="chip-blood">{g.bestFor}</span>
                <span className="chip">{g.price}</span>
              </div>

              <p className="mt-5 text-ink-200">
                We took the {g.name} into a real gym for 4 weeks of testing — bag work, mitts, and
                light sparring. Here&apos;s the honest verdict.
              </p>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a
                  href={g.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Buy now <ExternalLink className="h-4 w-4" />
                </a>
                <button className="btn-secondary">
                  <Bookmark className="h-4 w-4" /> Save
                </button>
                <button className="btn-ghost">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-fi grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          {/* Pros & Cons */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <h3 className="heading-display text-lg text-emerald-400">Pros</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-200">
                {PROS.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="heading-display text-lg text-blood-500">Cons</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-200">
                {CONS.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-blood-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="card p-5">
            <h3 className="heading-display text-lg text-white">Scorecard</h3>
            <div className="mt-4 space-y-3 text-sm">
              {[
                { k: "Comfort", v: 9.5 },
                { k: "Durability", v: 9.8 },
                { k: "Value", v: 7.2 },
                { k: "Wrist support", v: 9.6 },
                { k: "Padding", v: 9.7 },
              ].map((row) => (
                <div key={row.k}>
                  <div className="flex justify-between text-ink-200">
                    <span>{row.k}</span>
                    <span className="font-bold text-white">{row.v}/10</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-ink-800 overflow-hidden">
                    <div
                      className="h-full bg-blood-500"
                      style={{ width: `${(row.v / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Long-form review */}
          <div className="prose-fi">
            <h2>The verdict</h2>
            <p>
              The {g.name} is one of those rare pieces of gear that lives up to the hype. From the
              moment we laced them on, the difference was obvious — the padding distribution is
              elite, the wrist support is genuinely best in class, and the build quality is the kind
              that justifies a higher price tag.
            </p>
            <h3>Who it&apos;s for</h3>
            <p>
              If you&apos;re sparring 2–4 times a week and want a piece of gear you won&apos;t need
              to replace for years, this is it. If you&apos;re brand new and just looking to start,
              there are cheaper options that&apos;ll do the job — but if you can stretch the budget,
              you won&apos;t regret it.
            </p>
            <h3>The bottom line</h3>
            <p>
              Worth the price. Coach approved. We&apos;ll be using these for the foreseeable future.
            </p>
          </div>

          <div className="card p-5 text-xs text-ink-300">
            <div className="inline-flex items-center gap-2 font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-gold-500" /> Affiliate disclosure
            </div>
            <p className="mt-2">
              The link above is an affiliate link. We may earn a commission if you purchase, at no
              extra cost to you. We only recommend gear we&apos;ve actually trained in.
            </p>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="card p-5">
            <div className="eyebrow mb-2">At a glance</div>
            <dl className="space-y-2 text-sm">
              {[
                { k: "Brand", v: g.brand },
                { k: "Category", v: g.category },
                { k: "Best for", v: g.bestFor },
                { k: "Price", v: g.price },
                { k: "Rating", v: `${g.rating}/10` },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between border-b border-ink-800 pb-1.5 last:border-0">
                  <dt className="text-ink-400">{r.k}</dt>
                  <dd className="font-bold text-white">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={g.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            Buy from retailer <ExternalLink className="h-4 w-4" />
          </a>
        </aside>
      </section>

      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-12">
          <h2 className="heading-display text-2xl text-white mb-6">More gear reviews</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((x) => (
              <GearCard key={x.id} gear={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
