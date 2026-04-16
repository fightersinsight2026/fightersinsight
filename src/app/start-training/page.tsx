"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GymCard } from "@/components/cards/gym-card";
import { COMBAT_STYLES, MOCK_GYMS } from "@/lib/mock-data";
import { MapPin, Search, Compass, Heart, ShieldCheck, Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

const FIRST_WEEK = [
  {
    n: 1,
    title: "Wear what you have",
    body: "Comfortable shorts and a t-shirt. Skip the fancy gear until you know what you actually need.",
  },
  {
    n: 2,
    title: "Show up early",
    body: "Get there 15 minutes early. Introduce yourself to the coach. Ask where to put your stuff.",
  },
  {
    n: 3,
    title: "Bring water + a mouthguard",
    body: "Even in fundamentals classes. A cheap boil-and-bite is fine to start.",
  },
  {
    n: 4,
    title: "It's OK to suck",
    body: "Everyone in that room sucked once. Drill. Ask questions. Tap early. Come back tomorrow.",
  },
];

// ── Quiz data ────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: "What's your main reason for training?",
    options: [
      { label: "Self-defense", scores: { Boxing: 2, MMA: 3, "Muay Thai": 2, BJJ: 3 } },
      { label: "Get in shape / cardio", scores: { Boxing: 3, "Muay Thai": 3, Kickboxing: 3 } },
      { label: "Compete one day", scores: { MMA: 3, Wrestling: 2, BJJ: 2, Boxing: 2 } },
      { label: "Just curious / fun", scores: { BJJ: 2, "Muay Thai": 2, Kickboxing: 3, Boxing: 2 } },
    ],
  },
  {
    q: "How do you prefer to solve problems?",
    options: [
      { label: "Quick and decisive", scores: { Boxing: 3, MMA: 2, Kickboxing: 2 } },
      { label: "Patient and strategic", scores: { BJJ: 3, Wrestling: 2, "Muay Thai": 2 } },
      { label: "Adapt on the fly", scores: { MMA: 3, "Muay Thai": 2, BJJ: 2 } },
      { label: "Overpower and control", scores: { Wrestling: 3, MMA: 2, BJJ: 2 } },
    ],
  },
  {
    q: "Which sounds more appealing?",
    options: [
      { label: "Learning to throw a perfect punch", scores: { Boxing: 3, Kickboxing: 2 } },
      { label: "Submitting someone twice my size", scores: { BJJ: 3, Wrestling: 2 } },
      { label: "Using kicks, knees, and elbows", scores: { "Muay Thai": 3, Kickboxing: 2 } },
      { label: "Being ready for anything", scores: { MMA: 3, Wrestling: 1 } },
    ],
  },
  {
    q: "How do you feel about close contact / grappling?",
    options: [
      { label: "Love it — bring on the ground work", scores: { BJJ: 3, Wrestling: 3, MMA: 2 } },
      { label: "Fine in the clinch but prefer standing", scores: { "Muay Thai": 3, Boxing: 2, MMA: 1 } },
      { label: "I'd rather keep my distance and strike", scores: { Boxing: 3, Kickboxing: 3 } },
      { label: "I want to learn both", scores: { MMA: 3, "Muay Thai": 1, BJJ: 1 } },
    ],
  },
  {
    q: "What kind of workout do you prefer?",
    options: [
      { label: "High intensity cardio bursts", scores: { Boxing: 3, "Muay Thai": 2, Kickboxing: 3 } },
      { label: "Technical drilling and problem solving", scores: { BJJ: 3, Wrestling: 2 } },
      { label: "Full-body functional strength", scores: { Wrestling: 3, MMA: 2 } },
      { label: "Mix of everything", scores: { MMA: 3, "Muay Thai": 2 } },
    ],
  },
];

type Scores = Record<string, number | undefined>;

const DISCIPLINE_FILTERS = [
  "All disciplines",
  "Boxing",
  "Muay Thai",
  "BJJ",
  "MMA",
  "Beginner friendly",
];

export default function StartTrainingPage() {
  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [quizDone, setQuizDone] = useState(false);

  // Gym filters
  const [locationQuery, setLocationQuery] = useState("");
  const [activeDiscipline, setActiveDiscipline] = useState("All disciplines");
  const [locatingStatus, setLocatingStatus] = useState<"idle" | "loading" | "error">("idle");

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setLocatingStatus("error");
      return;
    }
    setLocatingStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data.address;
          const city = addr.city || addr.town || addr.village || addr.suburb || "";
          const state = addr.state || "";
          setLocationQuery(city ? `${city}, ${state}` : state);
          setLocatingStatus("idle");
        } catch {
          setLocationQuery(`${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`);
          setLocatingStatus("idle");
        }
      },
      () => {
        setLocatingStatus("error");
        setTimeout(() => setLocatingStatus("idle"), 3000);
      }
    );
  }

  function handleQuizAnswer(optionScores: Scores) {
    const newScores = { ...quizScores };
    for (const [style, pts] of Object.entries(optionScores)) {
      if (pts != null) newScores[style] = (newScores[style] ?? 0) + pts;
    }
    setQuizScores(newScores);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  }

  function resetQuiz() {
    setQuizStep(0);
    setQuizScores({});
    setQuizDone(false);
  }

  const quizResult = useMemo(() => {
    if (!quizDone) return null;
    const sorted = Object.entries(quizScores).sort(([, a], [, b]) => b - a);
    return sorted.slice(0, 3).map(([name, score]) => ({ name, score }));
  }, [quizDone, quizScores]);

  const filteredGyms = useMemo(() => {
    let gyms = MOCK_GYMS;

    if (activeDiscipline === "Beginner friendly") {
      gyms = gyms.filter((g) => g.beginnerFriendly);
    } else if (activeDiscipline !== "All disciplines") {
      gyms = gyms.filter((g) =>
        g.disciplines.some((d) => d.toLowerCase().includes(activeDiscipline.toLowerCase()))
      );
    }

    if (locationQuery.trim()) {
      const q = locationQuery.toLowerCase();
      gyms = gyms.filter(
        (g) =>
          g.city.toLowerCase().includes(q) ||
          g.state.toLowerCase().includes(q) ||
          g.name.toLowerCase().includes(q) ||
          g.zip.toLowerCase().includes(q)
      );
    }

    return gyms;
  }, [activeDiscipline, locationQuery]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800/80">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
        <div className="container-fi relative py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 chip-blood">
              <Sparkles className="h-3 w-3" /> No experience needed
            </div>
            <h1 className="mt-5 heading-display text-4xl sm:text-6xl text-white leading-[0.95]">
              Want to train like a fighter? <br />
              <span className="text-blood-500">Start this week.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-200">
              We&apos;ll help you pick a discipline, find a beginner-friendly gym near you, and walk
              into your first class with confidence. Beginners welcome — always.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blood-500" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Enter your city or zip code"
                  className="w-full rounded-lg border border-ink-600 bg-ink-900 pl-12 pr-4 py-3.5 text-base text-ink-100 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-blood-500/50 focus:border-blood-500/50"
                />
              </div>
              <a
                href="#gyms"
                className="btn-primary shrink-0 py-3.5 px-6 text-base"
              >
                <Search className="h-5 w-5" /> Find gyms near me
              </a>
            </div>
            <button
              onClick={handleUseLocation}
              disabled={locatingStatus === "loading"}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-300 hover:text-white disabled:opacity-50"
            >
              <Compass className={`h-3 w-3 ${locatingStatus === "loading" ? "animate-spin" : ""}`} />
              {locatingStatus === "loading"
                ? "Detecting location…"
                : locatingStatus === "error"
                ? "Location unavailable — try typing a city"
                : "Or use my current location"}
            </button>
          </div>
        </div>
      </section>

      {/* Fighting Style Quiz */}
      <section id="guide" className="container-fi py-16">
        <div className="eyebrow mb-3">Find your fighting style</div>
        <h2 className="heading-display text-3xl text-white sm:text-4xl">
          Take the quiz.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-300">
          Answer 5 quick questions and we&apos;ll recommend the best combat sport for you.
        </p>

        <div className="mt-8 max-w-2xl">
          {!quizDone ? (
            <div className="card p-6">
              {/* Progress */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-ink-400">
                  Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="flex gap-1">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-8 rounded-full transition ${
                        i <= quizStep ? "bg-blood-500" : "bg-ink-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="heading-display text-xl text-white">
                {QUIZ_QUESTIONS[quizStep].q}
              </h3>

              <div className="mt-5 space-y-2">
                {QUIZ_QUESTIONS[quizStep].options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleQuizAnswer(opt.scores)}
                    className="w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-left text-sm font-semibold text-ink-200 transition hover:border-blood-500/50 hover:bg-ink-850 hover:text-white"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <h3 className="heading-display text-xl text-white">Your results</h3>
              </div>

              <div className="space-y-3">
                {quizResult?.map((r, i) => {
                  const maxScore = quizResult[0].score;
                  const pct = Math.round((r.score / maxScore) * 100);
                  const style = COMBAT_STYLES.find((s) => s.name === r.name);
                  return (
                    <div key={r.name} className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="chip-blood">Best match</span>}
                          <span className={`font-bold ${i === 0 ? "text-white text-lg" : "text-ink-200"}`}>
                            {r.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-ink-400">{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${i === 0 ? "bg-blood-500" : "bg-ink-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      {style && (
                        <p className="mt-2 text-xs text-ink-400">{style.blurb}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex gap-3">
                <button onClick={resetQuiz} className="btn-secondary">
                  <RotateCcw className="h-4 w-4" /> Retake quiz
                </button>
                <a href="#gyms" className="btn-primary">
                  Find gyms <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Static style cards below quiz */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMBAT_STYLES.map((s) => (
            <div key={s.slug} className="card card-hover overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${s.color}`} />
              <div className="p-5">
                <h3 className="heading-display text-xl text-white">{s.name}</h3>
                <p className="mt-2 text-sm text-ink-300">{s.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.pros.map((p) => (
                    <span key={p} className="chip">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gym list — compact */}
      <section id="gyms" className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="container-fi py-10">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow mb-1">Near you</div>
              <h2 className="heading-display text-2xl text-white">Beginner-friendly gyms</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {DISCIPLINE_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveDiscipline(f)}
                  className={`chip cursor-pointer transition ${
                    f === activeDiscipline
                      ? "border-blood-500/50 bg-blood-500/10 text-white"
                      : "hover:border-ink-500 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredGyms.length === 0 ? (
            <div className="card p-8 text-center text-ink-300">
              No gyms found. Try a different filter or location.
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredGyms.slice(0, 4).map((g) => (
                  <GymCard key={g.id} gym={g} />
                ))}
              </div>
              {filteredGyms.length > 4 && (
                <div className="mt-4 text-center">
                  <Link href="/start-training" className="text-sm font-semibold text-ink-300 hover:text-white">
                    View all {filteredGyms.length} gyms →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Trainer marketplace teaser */}
      <section className="container-fi py-16">
        <div className="eyebrow mb-3">Private trainers</div>
        <h2 className="heading-display text-3xl text-white">Want 1-on-1 coaching?</h2>
        <p className="mt-2 max-w-2xl text-ink-300">
          Browse vetted trainers — boxing mitt work, strength &amp; conditioning, MMA prep, and more.
          In-person or online.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Coach Marco DeLeón",
              spec: "Boxing mitt work · Footwork",
              city: "Brooklyn, NY",
              price: "$80 / hour",
              rating: 5.0,
              partner: true,
            },
            {
              name: "Priya Nair",
              spec: "BJJ Fundamentals · Women's classes",
              city: "Online + LA",
              price: "$60 / hour",
              rating: 4.9,
              partner: false,
            },
            {
              name: "Tariq Bell",
              spec: "MMA prep · Strength & conditioning",
              city: "Austin, TX",
              price: "$95 / hour",
              rating: 4.8,
              partner: true,
            },
          ].map((t) => (
            <div key={t.name} className="card p-5">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blood-500 font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-ink-400">{t.spec}</div>
                </div>
                {t.partner && (
                  <span className="chip-gold ml-auto inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 text-ink-300">
                  <MapPin className="h-3 w-3" /> {t.city}
                </span>
                <span className="font-bold text-white">{t.price}</span>
              </div>
              <Link href="/contact" className="btn-secondary mt-4 w-full">
                View profile
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* First week guide */}
      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-16">
          <div className="eyebrow mb-3">First week guide</div>
          <h2 className="heading-display text-3xl text-white">How to start your first week.</h2>
          <p className="mt-2 max-w-2xl text-ink-300">
            Walk into your first class without panicking. Here&apos;s the playbook.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FIRST_WEEK.map((s) => (
              <div key={s.n} className="card p-5">
                <div className="heading-display text-3xl text-blood-500">0{s.n}</div>
                <h3 className="mt-2 font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 card p-5 text-sm text-ink-300">
            <div className="inline-flex items-center gap-2 font-semibold text-white">
              <Heart className="h-4 w-4 text-blood-500" /> A note on safety
            </div>
            <p className="mt-2">
              Train smart. Listen to your body. The advice on this site is community-driven and not
              a substitute for professional coaching or medical advice. If something hurts beyond
              normal soreness — see a real coach and a real doctor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
