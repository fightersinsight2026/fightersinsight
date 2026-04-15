import { EventCard } from "@/components/cards/event-card";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { Radio, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Fight Center — Real-time fight night updates",
  description:
    "Round-by-round live updates, fan reactions, polls, and community scorecards for tonight's biggest fights.",
};

const WATCH_LINKS = [
  { name: "ESPN+", href: "https://www.espn.com/espnplus/", tag: "UFC" },
  { name: "DAZN", href: "https://www.dazn.com/", tag: "Boxing / MMA" },
  { name: "UFC Fight Pass", href: "https://www.ufc.com/fight-pass", tag: "UFC Prelims" },
  { name: "Showtime Sports", href: "https://www.sho.com/sports", tag: "Boxing" },
  { name: "ONE Championship", href: "https://www.onefc.com/", tag: "ONE" },
];

export default function LivePage() {
  const live = MOCK_EVENTS.filter((e) => e.status === "LIVE");
  const upcoming = MOCK_EVENTS.filter((e) => e.status === "UPCOMING");
  const ended = MOCK_EVENTS.filter((e) => e.status === "ENDED");

  return (
    <>
      <section className="border-b border-ink-800/80 bg-gradient-to-b from-blood-700/15 to-transparent">
        <div className="container-fi py-14">
          <div className="inline-flex items-center gap-2 chip-blood">
            <Radio className="h-3 w-3" /> Live Fight Center
          </div>
          <h1 className="mt-4 heading-display text-4xl sm:text-5xl text-white">
            Round-by-round, <span className="text-blood-500">in real time.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Tonight&apos;s fights, tonight&apos;s reactions. Live updates from our team, polls, fan
            scorecards, and the loudest community chat in combat sports.
          </p>
        </div>
      </section>

      {live.length > 0 && (
        <section className="container-fi py-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="live-dot" aria-hidden />
            <h2 className="heading-display text-2xl text-white">Live now</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {live.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      <section className="container-fi py-12">
        <h2 className="heading-display text-2xl text-white mb-6">Upcoming events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Where to watch */}
      <section className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-12">
          <h2 className="heading-display text-2xl text-white mb-2">Where to watch fights</h2>
          <p className="text-sm text-ink-300 mb-6">Official broadcast and streaming platforms for combat sports.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WATCH_LINKS.map((w) => (
              <a
                key={w.name}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-center justify-between p-4"
              >
                <div>
                  <div className="font-semibold text-white">{w.name}</div>
                  <div className="text-xs text-ink-400">{w.tag}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-ink-400" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Past events */}
      <section className="container-fi py-12 pb-20">
        <h2 className="heading-display text-2xl text-white mb-6">Past events</h2>
        {ended.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ended.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center text-ink-300">
            Past event archive coming soon — recaps, results, and full live feeds will be browsable
            here.
          </div>
        )}
      </section>
    </>
  );
}
