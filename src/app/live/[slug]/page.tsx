"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_EVENTS, MOCK_LIVE_UPDATES } from "@/lib/mock-data";
import { formatEventTime, formatRelative } from "@/lib/format";
import { ArrowLeft, MapPin, Send, ShieldCheck, Trophy, Users, BarChart3, X, ChevronUp, ChevronDown } from "lucide-react";

const FIGHT_CARD = [
  {
    main: true,
    a: { name: "Ilia Topuria", record: "16-0", age: 28, height: "5'7\"", reach: "69\"", stance: "Orthodox", style: "KO Power, Boxing", country: "Spain" },
    b: { name: "Max Holloway", record: "26-7", age: 33, height: "5'11\"", reach: "69\"", stance: "Orthodox", style: "Volume Striking, Cardio", country: "USA" },
    weight: "Featherweight Title",
  },
  {
    coMain: true,
    a: { name: "Diego Lopes", record: "26-6", age: 29, height: "5'8\"", reach: "71\"", stance: "Orthodox", style: "BJJ, Striking", country: "Brazil" },
    b: { name: "Brian Ortega", record: "16-3", age: 33, height: "5'8\"", reach: "69\"", stance: "Orthodox", style: "Submissions, BJJ", country: "USA" },
    weight: "Featherweight",
  },
  {
    a: { name: "Robert Whittaker", record: "26-7", age: 33, height: "6'0\"", reach: "73\"", stance: "Orthodox", style: "Counter Striking", country: "Australia" },
    b: { name: "Khamzat Chimaev", record: "13-0", age: 30, height: "6'2\"", reach: "75\"", stance: "Orthodox", style: "Wrestling, GnP", country: "Sweden" },
    weight: "Middleweight",
  },
  {
    a: { name: "Jiří Procházka", record: "30-4", age: 32, height: "6'4\"", reach: "80\"", stance: "Switch", style: "Unorthodox Striking", country: "Czech Republic" },
    b: { name: "Magomed Ankalaev", record: "20-1", age: 32, height: "6'3\"", reach: "75\"", stance: "Orthodox", style: "Counter Striking, Sambo", country: "Russia" },
    weight: "Light Heavyweight",
  },
];

const INITIAL_POLLS = [
  {
    id: "p1",
    q: "Who wins the main event?",
    options: [
      { label: "Topuria by KO", pct: 47, votes: 1100 },
      { label: "Topuria by decision", pct: 11, votes: 258 },
      { label: "Holloway by decision", pct: 32, votes: 750 },
      { label: "Holloway by stoppage", pct: 10, votes: 233 },
    ],
    totalVotes: 2341,
  },
  {
    id: "p2",
    q: "Will the main event reach round 4?",
    options: [
      { label: "Yes", pct: 41, votes: 960 },
      { label: "No", pct: 59, votes: 1381 },
    ],
    totalVotes: 2341,
  },
];

const INITIAL_CHAT = [
  { id: "m1", u: "kickheavy", flair: "Muay Thai", body: "Topuria looks SHARP. That left to the body lands every time." },
  { id: "m2", u: "atxnewbie", flair: "Beginner", body: "Why isn't Holloway throwing the jab more?" },
  { id: "m3", u: "tapeologist", flair: "Coach", body: "Because Topuria is closing the angle every time he steps in. He has to reset first." },
  { id: "m4", u: "newjabber", flair: "Beginner", body: "This crowd is INSANE." },
  { id: "m5", u: "fightnerd99", flair: "MMA Fan", body: "Calling it now: Topuria, R3, KO." },
];

type FighterStats = typeof FIGHT_CARD[number]["a"];

export default function LiveEventPage() {
  const params = useParams<{ slug: string }>();
  const event = MOCK_EVENTS.find((e) => e.slug === params.slug);

  // Polls
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});

  // Scorecard
  const [scorecardVotes, setScorecardVotes] = useState<Record<number, "a" | "b">>({});

  // Fight card detail modal
  const [selectedFight, setSelectedFight] = useState<number | null>(null);

  // Chat
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  if (!event) {
    return (
      <div className="container-fi py-20 text-center">
        <h1 className="heading-display text-3xl text-white">Event not found</h1>
        <Link href="/live" className="btn-primary mt-6 inline-flex">Back to Live Fight Center</Link>
      </div>
    );
  }

  const isLive = event.status === "LIVE";

  function handlePollVote(pollId: string, optionLabel: string) {
    if (votedPolls[pollId]) return;
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionLabel }));
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId) return p;
        const newTotal = p.totalVotes + 1;
        const updated = p.options.map((o) => {
          const newVotes = o.label === optionLabel ? o.votes + 1 : o.votes;
          return { ...o, votes: newVotes, pct: Math.round((newVotes / newTotal) * 100) };
        });
        return { ...p, options: updated, totalVotes: newTotal };
      })
    );
  }

  function handleScorecardVote(round: number, winner: "a" | "b") {
    setScorecardVotes((prev) => ({ ...prev, [round]: winner }));
  }

  function handleSendChat(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, u: "you", flair: "Member", body: chatInput.trim() },
    ]);
    setChatInput("");
  }

  function StatRow({ label, a, b }: { label: string; a: string; b: string }) {
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-1.5 border-b border-ink-800/60 last:border-0">
        <div className="text-right text-sm text-ink-200">{a}</div>
        <div className="text-[11px] uppercase tracking-wider text-ink-400 text-center w-20">{label}</div>
        <div className="text-left text-sm text-ink-200">{b}</div>
      </div>
    );
  }

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
        {/* LEFT — Live feed + fight card + chat */}
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
            <h2 className="heading-display text-xl text-white mb-2">Fight card</h2>
            <p className="text-xs text-ink-400 mb-4">Click a fight to see deeper stats.</p>
            <div className="space-y-3">
              {FIGHT_CARD.map((bout, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setSelectedFight(selectedFight === i ? null : i)}
                    className={`card flex items-stretch overflow-hidden w-full text-left transition hover:border-ink-500 ${selectedFight === i ? "border-blood-500/50 ring-1 ring-blood-500/30" : ""}`}
                  >
                    <div className="flex w-20 shrink-0 flex-col items-center justify-center border-r border-ink-700/70 bg-ink-900/60 p-2 text-center">
                      {bout.main ? (
                        <span className="chip-blood">Main</span>
                      ) : bout.coMain ? (
                        <span className="chip-gold">Co-Main</span>
                      ) : (
                        <span className="text-xs font-bold text-ink-300">Bout {i + 1}</span>
                      )}
                      <span className="mt-1 text-[10px] uppercase tracking-wider text-ink-400">
                        {bout.weight}
                      </span>
                    </div>
                    <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3 p-4">
                      <div className="text-right">
                        <div className="font-bold text-white">{bout.a.name}</div>
                        <div className="text-xs text-ink-400">{bout.a.record}</div>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="heading-display text-sm text-blood-500">VS</span>
                        {selectedFight === i ? (
                          <ChevronUp className="h-3 w-3 text-ink-400" />
                        ) : (
                          <ChevronDown className="h-3 w-3 text-ink-400" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white">{bout.b.name}</div>
                        <div className="text-xs text-ink-400">{bout.b.record}</div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded fight stats — renders directly below this fight */}
                  {selectedFight === i && (
                    <div className="mt-2 card p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white">
                          {bout.a.name} vs {bout.b.name}
                        </h3>
                        <button onClick={() => setSelectedFight(null)} className="text-ink-400 hover:text-white">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <StatRow label="Record" a={bout.a.record} b={bout.b.record} />
                      <StatRow label="Age" a={String(bout.a.age)} b={String(bout.b.age)} />
                      <StatRow label="Height" a={bout.a.height} b={bout.b.height} />
                      <StatRow label="Reach" a={bout.a.reach} b={bout.b.reach} />
                      <StatRow label="Stance" a={bout.a.stance} b={bout.b.stance} />
                      <StatRow label="Style" a={bout.a.style} b={bout.b.style} />
                      <StatRow label="Country" a={bout.a.country} b={bout.b.country} />
                    </div>
                  )}
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
                {chatMessages.map((m) => (
                  <div key={m.id} className="flex items-start gap-2 text-sm">
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
                <div ref={chatEndRef} />
              </div>
            </div>
            <form onSubmit={handleSendChat} className="mt-3 flex gap-2">
              <input
                className="input"
                placeholder="Drop a reaction…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" disabled={!chatInput.trim()} className="btn-primary shrink-0 disabled:opacity-50">
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
              {polls.map((p) => {
                const hasVoted = !!votedPolls[p.id];
                return (
                  <div key={p.id} className="card p-4">
                    <div className="font-semibold text-white">{p.q}</div>
                    <div className="mt-3 space-y-2">
                      {p.options.map((o) => {
                        const isSelected = votedPolls[p.id] === o.label;
                        return (
                          <button
                            key={o.label}
                            type="button"
                            onClick={() => handlePollVote(p.id, o.label)}
                            disabled={hasVoted}
                            className={`relative w-full overflow-hidden rounded-md border px-3 py-2 text-left text-sm transition ${
                              isSelected
                                ? "border-blood-500/60 bg-blood-500/10"
                                : hasVoted
                                ? "border-ink-700 bg-ink-900 opacity-70"
                                : "border-ink-700 bg-ink-900 hover:border-blood-500/40 hover:bg-ink-850 cursor-pointer"
                            }`}
                          >
                            <span
                              className={`absolute inset-y-0 left-0 transition-all duration-500 ${isSelected ? "bg-blood-500/25" : "bg-blood-500/15"}`}
                              style={{ width: `${o.pct}%` }}
                            />
                            <span className="relative flex items-center justify-between">
                              <span className={`${isSelected ? "text-white font-semibold" : "text-ink-100"}`}>
                                {o.label}
                                {isSelected && " ✓"}
                              </span>
                              <span className="font-bold text-white">{o.pct}%</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 text-[11px] text-ink-400">
                      {p.totalVotes.toLocaleString()} votes · {hasVoted ? "You voted" : "Click to vote"} · live
                    </div>
                  </div>
                );
              })}
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
              <p className="mt-1 text-[11px] text-ink-400 text-center">Click a fighter&apos;s name to score each round</p>
              <div className="mt-3 space-y-2">
                {[1, 2, 3].map((r) => {
                  const vote = scorecardVotes[r];
                  return (
                    <div key={r} className="rounded-md border border-ink-700 bg-ink-900 p-2">
                      <div className="text-center text-[11px] text-ink-400 mb-1.5">Round {r}</div>
                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleScorecardVote(r, "a")}
                          className={`rounded px-2 py-1.5 text-xs font-bold transition ${
                            vote === "a"
                              ? "bg-blood-500/20 border border-blood-500/50 text-white"
                              : "border border-ink-700 text-ink-300 hover:border-blood-500/40 hover:text-white"
                          }`}
                        >
                          Topuria (10)
                        </button>
                        <span className="text-[11px] text-ink-500">-</span>
                        <button
                          type="button"
                          onClick={() => handleScorecardVote(r, "b")}
                          className={`rounded px-2 py-1.5 text-xs font-bold transition ${
                            vote === "b"
                              ? "bg-blood-500/20 border border-blood-500/50 text-white"
                              : "border border-ink-700 text-ink-300 hover:border-blood-500/40 hover:text-white"
                          }`}
                        >
                          Holloway (10)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-center">
                <div className="text-sm font-bold text-white">
                  Your score: {Object.values(scorecardVotes).filter((v) => v === "a").length * 10 + Object.values(scorecardVotes).filter((v) => v === "b").length * 9}
                  {" - "}
                  {Object.values(scorecardVotes).filter((v) => v === "b").length * 10 + Object.values(scorecardVotes).filter((v) => v === "a").length * 9}
                </div>
                {Object.keys(scorecardVotes).length === 0 && (
                  <div className="text-[11px] text-ink-400">Score each round above</div>
                )}
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
