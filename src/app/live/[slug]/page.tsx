import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_EVENTS, MOCK_LIVE_UPDATES } from "@/lib/mock-data";
import { formatEventTime, formatRelative } from "@/lib/format";
import { ArrowLeft, MapPin, Send, ShieldCheck, Trophy, Users, BarChart3 } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_EVENTS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = MOCK_EVENTS.find((e) => e.slug === params.slug);
  if (!event) return { title: "Event not found" };
  return {
    title: `${event.title} — Live updates`,
    description: `Round-by-round live updates, polls, and reactions for ${event.title}.`,
  };
}

const FIGHT_CARD = [
  {
    main: true,
    a: "Ilia Topuria",
    aRecord: "16-0",
    b: "Max Holloway",
    bRecord: "26-7",
    weight: "Featherweight Title",
  },
  {
    coMain: true,
    a: "Diego Lopes",
    aRecord: "26-6",
    b: "Brian Ortega",
    bRecord: "16-3",
    weight: "Featherweight",
  },
  {
    a: "Robert Whittaker",
    aRecord: "26-7",
    b: "Khamzat Chimaev",
    bRecord: "13-0",
    weight: "Middleweight",
  },
  {
    a: "Jiří Procházka",
    aRecord: "30-4",
    b: "Magomed Ankalaev",
    bRecord: "20-1",
    weight: "Light Heavyweight",
  },
];

const POLLS = [
  {
    q: "Who wins the main event?",
    options: [
      { label: "Topuria by KO", pct: 47 },
      { label: "Topuria by decision", pct: 11 },
      { label: "Holloway by decision", pct: 32 },
      { label: "Holloway by stoppage", pct: 10 },
    ],
  },
  {
    q: "Will the main event reach round 4?",
    options: [
      { label: "Yes", pct: 41 },
      { label: "No", pct: 59 },
    ],
  },
];

export default function LiveEventPage({ params }: { params: { slug: string } }) {
  const event = MOCK_EVENTS.find((e) => e.slug === params.slug);
  if (!event) notFound();
  const isLive = event.status === "LIVE";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[52vh] min-h-[420px] w-full overflow-hidden border-b border-ink-800/80">
        <Image src={event.cover} alt={event.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
        <div className="container-fi relative flex h-full flex-col justify-end pb-10">
          <Link
            href="/live"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> Live Fight Center
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="chip-gold">{event.promotion}</span>
            {isLive ? (
              <span className="chip-blood inline-flex items-center gap-1.5">
                <span className="live-dot" /> LIVE NOW
              </span>
            ) : (
              <span className="chip">{event.status}</span>
            )}
          </div>

          <h1 className="mt-3 max-w-4xl heading-display text-3xl text-white sm:text-6xl leading-[0.95]">
            {event.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-ink-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {event.venue} · {event.city}
            </span>
            <span>{formatEventTime(event.startTime)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> 8,412 watching
            </span>
          </div>
        </div>
      </section>

      <div className="container-fi grid gap-8 py-10 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT — Live feed + chat + fight card */}
        <div className="space-y-10">
          {/* Live updates */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="heading-display text-xl text-white">Live updates</h2>
              <span className="text-xs text-ink-400">Auto-refreshing</span>
            </div>
            <div className="space-y-3">
              {MOCK_LIVE_UPDATES.map((u) => (
                <div key={u.id} className="card p-4">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
                    <span
                      className={
                        u.type === "knockdown" || u.type === "result"
                          ? "chip-blood"
                          : u.type === "scorecard"
                          ? "chip-gold"
                          : "chip"
                      }
                    >
                      {u.type}
                    </span>
                    <span>{formatRelative(u.timestamp)}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-100">{u.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fight card */}
          <section>
            <h2 className="heading-display text-xl text-white mb-4">Fight card</h2>
            <div className="space-y-3">
              {FIGHT_CARD.map((b, i) => (
                <div key={i} className="card flex items-stretch overflow-hidden">
                  <div className="flex w-20 shrink-0 flex-col items-center justify-center border-r border-ink-700/70 bg-ink-900/60 p-2 text-center">
                    {b.main ? (
                      <span className="chip-blood">Main</span>
                    ) : b.coMain ? (
                      <span className="chip-gold">Co-Main</span>
                    ) : (
                      <span className="text-xs font-bold text-ink-300">Bout {i + 1}</span>
                    )}
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-ink-400">
                      {b.weight}
                    </span>
                  </div>
                  <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3 p-4">
                    <div className="text-right">
                      <div className="font-bold text-white">{b.a}</div>
                      <div className="text-xs text-ink-400">{b.aRecord}</div>
                    </div>
                    <div className="heading-display text-sm text-blood-500">VS</div>
                    <div className="text-left">
                      <div className="font-bold text-white">{b.b}</div>
                      <div className="text-xs text-ink-400">{b.bRecord}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Live chat */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="heading-display text-xl text-white">Live chat</h2>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <ShieldCheck className="h-3 w-3" />
                Slow mode: 5s · Mod active
              </div>
            </div>
            <div className="card max-h-[420px] overflow-y-auto p-4">
              <div className="space-y-3">
                {[
                  { u: "kickheavy", flair: "Muay Thai", body: "Topuria looks SHARP. That left to the body lands every time." },
                  { u: "atxnewbie", flair: "Beginner", body: "Why isn't Holloway throwing the jab more?" },
                  { u: "tapeologist", flair: "Coach", body: "Because Topuria is closing the angle every time he steps in. He has to reset first." },
                  { u: "newjabber", flair: "Beginner", body: "This crowd is INSANE." },
                  { u: "fightnerd99", flair: "MMA Fan", body: "Calling it now: Topuria, R3, KO." },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-700 text-[10px] font-bold text-white">
                      {m.u.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <div className="text-xs">
                        <span className="font-bold text-white">{m.u}</span>
                        <span className="ml-1 chip">{m.flair}</span>
                      </div>
                      <p className="text-ink-200">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form className="mt-3 flex gap-2">
              <input className="input" placeholder="Drop a reaction…" />
              <button className="btn-primary shrink-0">
                <Send className="h-4 w-4" /> Send
              </button>
            </form>
            <p className="mt-2 text-[11px] text-ink-400">
              Be respectful. Trash talk welcome. Hate speech and spam = ban.
            </p>
          </section>
        </div>

        {/* RIGHT — Polls, scorecards, post event */}
        <aside className="space-y-8 lg:sticky lg:top-24 self-start">
          {/* Polls */}
          <section>
            <h3 className="eyebrow mb-3">Live polls</h3>
            <div className="space-y-4">
              {POLLS.map((p) => (
                <div key={p.q} className="card p-4">
                  <div className="font-semibold text-white">{p.q}</div>
                  <div className="mt-3 space-y-2">
                    {p.options.map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        className="relative w-full overflow-hidden rounded-md border border-ink-700 bg-ink-900 px-3 py-2 text-left text-sm hover:border-ink-500"
                      >
                        <span
                          className="absolute inset-y-0 left-0 bg-blood-500/15"
                          style={{ width: `${o.pct}%` }}
                        />
                        <span className="relative flex items-center justify-between">
                          <span className="text-ink-100">{o.label}</span>
                          <span className="font-bold text-white">{o.pct}%</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] text-ink-400">2,341 votes · live</div>
                </div>
              ))}
            </div>
          </section>

          {/* Community scorecard */}
          <section>
            <h3 className="eyebrow mb-3">Community scorecard</h3>
            <div className="card p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-bold">Topuria</span>
                <span className="text-ink-400">vs</span>
                <span className="text-white font-bold">Holloway</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="rounded-md border border-ink-700 bg-ink-900 p-2">
                    <div className="text-ink-400">R{r}</div>
                    <div className="font-bold text-white">10 - 9</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-300">
                <BarChart3 className="h-3 w-3" />
                Aggregate of 1,204 fan scorecards
              </div>
            </div>
          </section>

          {/* Post-event */}
          <section>
            <h3 className="eyebrow mb-3">After the event</h3>
            <div className="card p-4 text-sm text-ink-300">
              <div className="inline-flex items-center gap-2 font-semibold text-white">
                <Trophy className="h-4 w-4 text-gold-500" /> Recap drops here
              </div>
              <p className="mt-2">
                When the cards are scored, we&apos;ll publish a full recap with results, performance
                bonuses, and key moments — linked from this card.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
