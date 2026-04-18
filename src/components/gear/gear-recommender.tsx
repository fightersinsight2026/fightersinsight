"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_GEAR, type MockGear } from "@/lib/mock-data";
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookmarkCheck,
  Bookmark,
  Share2,
  Check,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

type Discipline = "Boxing" | "MMA" | "Muay Thai" | "BJJ" | "Kickboxing";
type Experience = "Beginner" | "Intermediate" | "Advanced";
type TrainingType = "Sparring" | "Bag work" | "Classes" | "Competition" | "Rolling";
type Priority = "Comfort" | "Durability" | "Protection" | "Budget" | "Style";
type BudgetTier = "under-100" | "100-300" | "300-600" | "no-limit";

type Answers = {
  discipline: Discipline | null;
  experience: Experience | null;
  trainingTypes: TrainingType[];
  priorities: Priority[];
  budget: BudgetTier | null;
  injury: string | null;
};

const BUDGET_LABELS: Record<BudgetTier, { label: string; max: number; desc: string }> = {
  "under-100": { label: "Under $100", max: 100, desc: "Starter kit" },
  "100-300": { label: "$100 – $300", max: 300, desc: "Serious beginner" },
  "300-600": { label: "$300 – $600", max: 600, desc: "Intermediate" },
  "no-limit": { label: "No limit", max: 10000, desc: "Best of the best" },
};

const TRAINING_TYPES_BY_DISCIPLINE: Record<Discipline, TrainingType[]> = {
  Boxing: ["Sparring", "Bag work", "Classes", "Competition"],
  MMA: ["Sparring", "Bag work", "Classes", "Competition", "Rolling"],
  "Muay Thai": ["Sparring", "Bag work", "Classes", "Competition"],
  BJJ: ["Classes", "Rolling", "Competition"],
  Kickboxing: ["Sparring", "Bag work", "Classes", "Competition"],
};

export function GearRecommender() {
  const [open, setOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    discipline: null,
    experience: null,
    trainingTypes: [],
    priorities: [],
    budget: null,
    injury: null,
  });
  const [showResults, setShowResults] = useState(false);
  const [savedKit, setSavedKit] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share kit");

  // First visit detection
  useEffect(() => {
    try {
      const seen = localStorage.getItem("fi-gear-recommender-seen");
      if (!seen) {
        setOpen(true);
        setIsFirstVisit(true);
      }
      // Load any saved kit
      const saved = localStorage.getItem("fi-saved-gear-kit");
      if (saved) setSavedKit(true);
    } catch {
      /* ignore */
    }
  }, []);

  function handleOpen() {
    setOpen(true);
    try {
      localStorage.setItem("fi-gear-recommender-seen", "1");
    } catch { /* ignore */ }
  }

  function handleClose() {
    setOpen(false);
    setIsFirstVisit(false);
    try {
      localStorage.setItem("fi-gear-recommender-seen", "1");
    } catch { /* ignore */ }
  }

  function resetQuiz() {
    setStep(0);
    setAnswers({
      discipline: null,
      experience: null,
      trainingTypes: [],
      priorities: [],
      budget: null,
      injury: null,
    });
    setShowResults(false);
  }

  // Recommendation engine
  const recommendedKit = useMemo<Array<{ gear: MockGear; reason: string; tag?: string }>>(() => {
    if (!showResults || !answers.discipline || !answers.experience || !answers.budget) return [];

    const { discipline, experience, trainingTypes, priorities, budget } = answers;
    const maxPrice = BUDGET_LABELS[budget].max;

    // Score every gear item
    const scored = MOCK_GEAR.map((gear) => {
      let score = 0;
      const reasons: string[] = [];

      // Discipline match (required)
      if (!gear.disciplines?.includes(discipline)) return { gear, score: -1, reasons };
      score += 10;

      // Budget filter — hard cutoff
      if ((gear.priceNum ?? 0) > maxPrice) {
        // Allow mouthguards and wraps even on tight budget (safety essentials)
        if (gear.category !== "Mouthguards" && gear.category !== "Hand Wraps") {
          return { gear, score: -1, reasons };
        }
      }

      // Skill level match
      if (gear.skillLevel?.includes(experience)) {
        score += 5;
      } else {
        // Penalize advanced-only gear for beginners (safety)
        if (experience === "Beginner" && gear.skillLevel?.includes("Advanced") && !gear.skillLevel.includes("Beginner")) {
          score -= 5;
        }
      }

      // Training type match
      const trainingMatch = trainingTypes.filter((t) => gear.trainingType?.includes(t)).length;
      score += trainingMatch * 3;
      if (trainingMatch > 0) {
        reasons.push(`great for ${trainingTypes.filter((t) => gear.trainingType?.includes(t)).join(" & ").toLowerCase()}`);
      }

      // Priority match
      const priorityMatch = priorities.filter((p) => gear.priorities?.includes(p)).length;
      score += priorityMatch * 4;
      if (priorityMatch > 0 && priorities.length > 0) {
        const matched = priorities.filter((p) => gear.priorities?.includes(p));
        reasons.push(`matches your focus on ${matched.join(" & ").toLowerCase()}`);
      }

      // Rating weight
      score += gear.rating * 0.5;

      // Beginner safety boost for protective gear
      if (experience === "Beginner") {
        if (gear.category === "Mouthguards" || gear.category === "Hand Wraps" || gear.category === "Headgear") {
          score += 6;
        }
      }

      return { gear, score, reasons };
    });

    // Group by category, pick top-scoring item per essential category
    const essentialCategories = getEssentialCategories(discipline, trainingTypes);
    const kit: Array<{ gear: MockGear; reason: string; tag?: string }> = [];

    for (const cat of essentialCategories) {
      const candidates = scored
        .filter((x) => x.gear.category === cat && x.score > 0)
        .sort((a, b) => b.score - a.score);
      if (candidates.length > 0) {
        const pick = candidates[0];
        const baseReason = pick.gear.reason ?? `Strong fit for ${discipline.toLowerCase()} at ${experience.toLowerCase()} level.`;
        const extra = pick.reasons.length > 0 ? ` — ${pick.reasons[0]}.` : "";
        kit.push({
          gear: pick.gear,
          reason: baseReason + extra,
          tag: getTagForCategory(cat, experience),
        });
      }
    }

    return kit.slice(0, 8);
  }, [showResults, answers]);

  function getEssentialCategories(discipline: Discipline, trainingTypes: TrainingType[]): string[] {
    const base: string[] = [];

    if (discipline === "BJJ") {
      base.push("BJJ Gis", "Mouthguards");
      if (trainingTypes.includes("Rolling") || trainingTypes.includes("Classes")) base.push("MMA Shorts");
    } else if (discipline === "Boxing") {
      base.push("Boxing Gloves", "Hand Wraps", "Mouthguards");
      if (trainingTypes.includes("Sparring")) base.push("Headgear");
      if (trainingTypes.includes("Competition") || trainingTypes.includes("Classes")) base.push("Boxing Shoes");
      base.push("Conditioning");
    } else if (discipline === "Muay Thai" || discipline === "Kickboxing") {
      base.push("Boxing Gloves", "Hand Wraps", "Shin Guards", "Mouthguards");
      if (trainingTypes.includes("Sparring")) base.push("Headgear");
      base.push("MMA Shorts");
    } else if (discipline === "MMA") {
      base.push("MMA Gloves", "Hand Wraps", "Mouthguards", "MMA Shorts", "Shin Guards");
      if (trainingTypes.includes("Sparring")) base.push("Headgear");
    }

    return base;
  }

  function getTagForCategory(cat: string, exp: Experience): string | undefined {
    if (cat === "Mouthguards" || cat === "Hand Wraps") return "Essential";
    if (exp === "Beginner" && cat === "Headgear") return "Safety pick";
    return undefined;
  }

  function getUpgradePath(gear: MockGear): MockGear | null {
    if (!gear.upgradeTo) return null;
    return MOCK_GEAR.find((g) => g.slug === gear.upgradeTo) ?? null;
  }

  async function handleShare() {
    const kitSummary = recommendedKit.map((k) => `• ${k.gear.name} ($${k.gear.priceNum})`).join("\n");
    const text = `My Fighter's Insight Gear Kit:\n\n${kitSummary}\n\nBuild your own at fightersinsight.vercel.app/gear`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Fight Kit", text });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setShareLabel("Copied!");
      setTimeout(() => setShareLabel("Share kit"), 2000);
    }
  }

  function handleSaveKit() {
    try {
      localStorage.setItem(
        "fi-saved-gear-kit",
        JSON.stringify({ answers, slugs: recommendedKit.map((k) => k.gear.slug), savedAt: Date.now() })
      );
      setSavedKit(true);
    } catch { /* ignore */ }
  }

  const totalCost = recommendedKit.reduce((sum, k) => sum + (k.gear.priceNum ?? 0), 0);

  const canContinue = () => {
    switch (step) {
      case 0: return !!answers.discipline;
      case 1: return !!answers.experience;
      case 2: return answers.trainingTypes.length > 0;
      case 3: return answers.priorities.length > 0;
      case 4: return !!answers.budget;
      default: return true;
    }
  };

  function handleNext() {
    if (step < 5) setStep(step + 1);
    else setShowResults(true);
  }

  return (
    <>
      {/* Floating tab — always visible except when modal open */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-2 rounded-full bg-blood-500 px-5 py-3 font-bold text-white shadow-2xl hover:bg-blood-600 transition"
          aria-label="Open gear recommender"
        >
          <Sparkles className="h-5 w-5" />
          <span className="hidden sm:inline">Find my gear</span>
        </button>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-700 bg-ink-900/95 backdrop-blur px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blood-500" />
                <h2 className="heading-display text-xl text-white">Gear Recommender</h2>
              </div>
              <button
                onClick={handleClose}
                className="btn-ghost h-9 w-9 p-0"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {!showResults ? (
                <>
                  {/* First visit welcome */}
                  {step === 0 && (
                    <div className="mb-6 space-y-4">
                      <div className="rounded-lg border border-blood-500/30 bg-blood-500/10 p-4">
                        <div className="text-sm font-semibold text-white">Welcome to the Gear Recommender</div>
                        <p className="mt-1 text-xs text-ink-200">
                          Answer a few quick questions and we&apos;ll build your personalized fight kit.
                          Takes 60 seconds.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gold-500/30 bg-gold-500/5 p-4">
                        <div className="text-sm font-semibold text-white">Not sure which discipline to pick?</div>
                        <p className="mt-1 text-xs text-ink-300">
                          Take our &ldquo;Find Your Fighting Style&rdquo; quiz first — it&apos;ll help you figure out
                          which combat sport suits you before picking gear.
                        </p>
                        <Link
                          href="/start-training?returnTo=gear#guide"
                          onClick={handleClose}
                          className="btn-secondary mt-3 text-xs inline-flex"
                        >
                          <Sparkles className="h-3.5 w-3.5" /> Take the style quiz first
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Progress */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink-400">
                      Step {step + 1} of 6
                    </span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-8 rounded-full transition ${
                            i <= step ? "bg-blood-500" : "bg-ink-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step 0 — Discipline */}
                  {step === 0 && (
                    <div>
                      <h3 className="heading-display text-2xl text-white">What&apos;s your discipline?</h3>
                      <p className="mt-1 text-sm text-ink-400">Pick the sport you train most.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {(["Boxing", "MMA", "Muay Thai", "BJJ", "Kickboxing"] as Discipline[]).map((d) => (
                          <button
                            key={d}
                            onClick={() => setAnswers({ ...answers, discipline: d, trainingTypes: [] })}
                            className={`rounded-lg border p-4 text-left transition ${
                              answers.discipline === d
                                ? "border-blood-500/50 bg-blood-500/10"
                                : "border-ink-700 bg-ink-850 hover:border-ink-500"
                            }`}
                          >
                            <div className={`font-bold ${answers.discipline === d ? "text-white" : "text-ink-200"}`}>{d}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1 — Experience */}
                  {step === 1 && (
                    <div>
                      <h3 className="heading-display text-2xl text-white">How experienced are you?</h3>
                      <p className="mt-1 text-sm text-ink-400">Be honest — we tune safety for beginners.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {([
                          { v: "Beginner", desc: "0 – 6 months" },
                          { v: "Intermediate", desc: "6 mo – 2 years" },
                          { v: "Advanced", desc: "2+ years or competing" },
                        ] as { v: Experience; desc: string }[]).map((e) => (
                          <button
                            key={e.v}
                            onClick={() => setAnswers({ ...answers, experience: e.v })}
                            className={`rounded-lg border p-4 text-left transition ${
                              answers.experience === e.v
                                ? "border-blood-500/50 bg-blood-500/10"
                                : "border-ink-700 bg-ink-850 hover:border-ink-500"
                            }`}
                          >
                            <div className={`font-bold ${answers.experience === e.v ? "text-white" : "text-ink-200"}`}>{e.v}</div>
                            <div className="mt-1 text-xs text-ink-400">{e.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Training type */}
                  {step === 2 && answers.discipline && (
                    <div>
                      <h3 className="heading-display text-2xl text-white">How do you train?</h3>
                      <p className="mt-1 text-sm text-ink-400">Pick all that apply.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {TRAINING_TYPES_BY_DISCIPLINE[answers.discipline].map((t) => {
                          const active = answers.trainingTypes.includes(t);
                          return (
                            <button
                              key={t}
                              onClick={() => {
                                const next = active
                                  ? answers.trainingTypes.filter((x) => x !== t)
                                  : [...answers.trainingTypes, t];
                                setAnswers({ ...answers, trainingTypes: next });
                              }}
                              className={`rounded-lg border p-4 text-left transition ${
                                active
                                  ? "border-blood-500/50 bg-blood-500/10"
                                  : "border-ink-700 bg-ink-850 hover:border-ink-500"
                              }`}
                            >
                              <div className={`flex items-center gap-2 font-bold ${active ? "text-white" : "text-ink-200"}`}>
                                {active && <Check className="h-4 w-4 text-blood-500" />}
                                {t}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3 — Priorities */}
                  {step === 3 && (
                    <div>
                      <h3 className="heading-display text-2xl text-white">What matters most to you?</h3>
                      <p className="mt-1 text-sm text-ink-400">Pick up to 3 priorities.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {(["Comfort", "Durability", "Protection", "Budget", "Style"] as Priority[]).map((p) => {
                          const active = answers.priorities.includes(p);
                          return (
                            <button
                              key={p}
                              onClick={() => {
                                if (active) {
                                  setAnswers({ ...answers, priorities: answers.priorities.filter((x) => x !== p) });
                                } else if (answers.priorities.length < 3) {
                                  setAnswers({ ...answers, priorities: [...answers.priorities, p] });
                                }
                              }}
                              className={`rounded-lg border p-4 text-left transition ${
                                active
                                  ? "border-blood-500/50 bg-blood-500/10"
                                  : "border-ink-700 bg-ink-850 hover:border-ink-500"
                              }`}
                            >
                              <div className={`flex items-center gap-2 font-bold ${active ? "text-white" : "text-ink-200"}`}>
                                {active && <Check className="h-4 w-4 text-blood-500" />}
                                {p}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 4 — Budget */}
                  {step === 4 && (
                    <div>
                      <h3 className="heading-display text-2xl text-white">What&apos;s your total budget?</h3>
                      <p className="mt-1 text-sm text-ink-400">For your full starter kit.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {(Object.entries(BUDGET_LABELS) as [BudgetTier, { label: string; desc: string }][]).map(([k, v]) => (
                          <button
                            key={k}
                            onClick={() => setAnswers({ ...answers, budget: k })}
                            className={`rounded-lg border p-4 text-left transition ${
                              answers.budget === k
                                ? "border-blood-500/50 bg-blood-500/10"
                                : "border-ink-700 bg-ink-850 hover:border-ink-500"
                            }`}
                          >
                            <div className={`font-bold ${answers.budget === k ? "text-white" : "text-ink-200"}`}>{v.label}</div>
                            <div className="mt-1 text-xs text-ink-400">{v.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5 — Injury (optional) */}
                  {step === 5 && (
                    <div>
                      <h3 className="heading-display text-2xl text-white">Any injury to work around?</h3>
                      <p className="mt-1 text-sm text-ink-400">Optional — helps us prioritize protection. Skip if none.</p>
                      <textarea
                        value={answers.injury ?? ""}
                        onChange={(e) => setAnswers({ ...answers, injury: e.target.value })}
                        placeholder="e.g. wrist pain, old knee, broken hand healing…"
                        rows={3}
                        className="input mt-5 resize-none"
                      />
                      <div className="mt-3 rounded-lg border border-gold-500/30 bg-gold-500/5 p-3 text-xs text-ink-300">
                        <ShieldCheck className="inline h-3.5 w-3.5 text-gold-500 mr-1" />
                        Not medical advice. If you&apos;re injured, see a real doctor before training.
                      </div>
                    </div>
                  )}

                  {/* Nav */}
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep(Math.max(0, step - 1))}
                      disabled={step === 0}
                      className="btn-ghost disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!canContinue()}
                      className="btn-primary disabled:opacity-50"
                    >
                      {step === 5 ? (
                        <>Build my kit <Sparkles className="h-4 w-4" /></>
                      ) : (
                        <>Next <ArrowRight className="h-4 w-4" /></>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* RESULTS */
                <div>
                  <div className="mb-6 rounded-lg border border-blood-500/30 bg-blood-500/5 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-blood-500" />
                      <h3 className="heading-display text-xl text-white">Your Fight Kit</h3>
                    </div>
                    <p className="text-sm text-ink-200">
                      Based on your {answers.experience?.toLowerCase()} {answers.discipline?.toLowerCase()} profile,
                      here&apos;s what your coach would put in your bag.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                      <span className="text-ink-400">Kit total: <strong className="text-white">~${totalCost}</strong></span>
                      <span className="text-ink-400">Budget: <strong className="text-white">{answers.budget && BUDGET_LABELS[answers.budget].label}</strong></span>
                      <span className="text-ink-400">Items: <strong className="text-white">{recommendedKit.length}</strong></span>
                    </div>
                  </div>

                  {recommendedKit.length === 0 ? (
                    <div className="card p-8 text-center text-ink-300">
                      We couldn&apos;t find enough matches at that budget. Try increasing it or adjusting priorities.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {recommendedKit.map((item) => {
                        const upgrade = getUpgradePath(item.gear);
                        return (
                          <div key={item.gear.id} className="card flex flex-col sm:flex-row overflow-hidden">
                            <div className="relative sm:w-48 aspect-[4/3] sm:aspect-auto shrink-0">
                              <Image
                                src={item.gear.image}
                                alt={item.gear.name}
                                fill
                                sizes="(max-width:640px) 100vw, 200px"
                                className="object-cover"
                              />
                              {item.tag && (
                                <span className="chip-blood absolute top-2 left-2 text-[10px]">{item.tag}</span>
                              )}
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-[10px] uppercase tracking-wider text-ink-400">
                                    {item.gear.category} · {item.gear.brand}
                                  </div>
                                  <h4 className="heading-display text-lg text-white mt-0.5">{item.gear.name}</h4>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="font-bold text-white">${item.gear.priceNum}</div>
                                  <div className="text-[10px] text-ink-400">{item.gear.skillLevel?.join(" / ")}</div>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-ink-300">
                                <span className="font-semibold text-blood-500">Why this: </span>
                                {item.reason}
                              </p>
                              {upgrade && answers.experience === "Beginner" && (
                                <div className="mt-2 text-xs text-ink-400 inline-flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  When you level up, upgrade to <strong className="text-ink-200 ml-1">{upgrade.name}</strong>
                                </div>
                              )}
                              <div className="mt-3 flex gap-2">
                                <Link
                                  href={`/gear/${item.gear.slug}`}
                                  className="btn-secondary text-xs py-1.5 px-3"
                                  onClick={handleClose}
                                >
                                  Read review
                                </Link>
                                <a
                                  href={item.gear.affiliateLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-primary text-xs py-1.5 px-3"
                                >
                                  Shop <ArrowRight className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-2 justify-between">
                    <button onClick={resetQuiz} className="btn-ghost">
                      <RotateCcw className="h-4 w-4" /> Retake quiz
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveKit}
                        className={`btn-secondary ${savedKit ? "border-blood-500/50 text-blood-500" : ""}`}
                      >
                        {savedKit ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                        {savedKit ? "Saved" : "Save kit"}
                      </button>
                      <button onClick={handleShare} className="btn-primary">
                        {shareLabel === "Copied!" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                        {shareLabel}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-[11px] text-ink-500 text-center">
                    Affiliate disclosure: some links earn us a small commission. We only recommend gear we&apos;ve actually trained in.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
