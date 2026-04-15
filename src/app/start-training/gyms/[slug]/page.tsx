"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_GYMS } from "@/lib/mock-data";
import { GymCard } from "@/components/cards/gym-card";
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Phone,
  Globe,
  Bookmark,
  BookmarkCheck,
  Share2,
  Calendar,
  Check,
  ExternalLink,
} from "lucide-react";

const SCHEDULE = [
  { day: "Mon", classes: ["Boxing Fundamentals 6am", "Sparring 6pm", "Open mat 8pm"] },
  { day: "Tue", classes: ["Conditioning 6am", "Boxing Fundamentals 6pm"] },
  { day: "Wed", classes: ["Mitt work 6am", "Sparring 6pm", "Open mat 8pm"] },
  { day: "Thu", classes: ["Conditioning 6am", "Boxing Fundamentals 6pm"] },
  { day: "Fri", classes: ["Sparring 6pm", "Open mat 8pm"] },
  { day: "Sat", classes: ["Beginner Bootcamp 10am", "Sparring 12pm"] },
  { day: "Sun", classes: ["Open mat 11am"] },
];

export default function GymDetailPage() {
  const params = useParams<{ slug: string }>();
  const gym = MOCK_GYMS.find((g) => g.slug === params.slug);

  const [saved, setSaved] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: "rv1",
      user: "newjabber",
      flair: "Beginner",
      rating: 5,
      body: "Walked in nervous as hell on day one. Coach took 10 minutes to introduce me to everyone. Best decision I've made.",
    },
    {
      id: "rv2",
      user: "tapeologist",
      flair: "Coach",
      rating: 5,
      body: "Real coaches who know what they're doing. Sparring is controlled. Recommended.",
    },
  ]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!gym) {
    return (
      <div className="container-fi py-20 text-center">
        <h1 className="heading-display text-3xl text-white">Gym not found</h1>
        <Link href="/start-training" className="btn-primary mt-6 inline-flex">Back to gyms</Link>
      </div>
    );
  }

  const others = MOCK_GYMS.filter((g) => g.id !== gym.id).slice(0, 3);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${gym!.name} — ${gym!.city}, ${gym!.state}`, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShareLabel("Copied!");
      setTimeout(() => setShareLabel("Share"), 2000);
    }
  }

  function handleGetDirections() {
    const query = encodeURIComponent(`${gym!.name} ${gym!.city} ${gym!.state}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  }

  function handleContact() {
    window.location.href = `mailto:info@${gym!.slug}.com?subject=Inquiry about ${gym!.name}`;
  }

  function handlePostReview(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews((prev) => [
      ...prev,
      {
        id: `rv${Date.now()}`,
        user: "you",
        flair: "Member",
        rating: 5,
        body: reviewText.trim(),
      },
    ]);
    setReviewText("");
    setShowReviewForm(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[44vh] min-h-[360px] w-full overflow-hidden border-b border-ink-800/80">
        <Image src={gym.image} alt={gym.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
        <div className="container-fi relative flex h-full flex-col justify-end pb-10">
          <Link
            href="/start-training"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> Find a gym
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {gym.partner && (
              <span className="chip-gold inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Verified Partner
              </span>
            )}
            {gym.beginnerFriendly && <span className="chip-blood">Beginner Friendly</span>}
          </div>

          <h1 className="mt-3 max-w-4xl heading-display text-3xl text-white sm:text-5xl">
            {gym.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {gym.city}, {gym.state}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold-500 text-gold-500" /> {gym.rating.toFixed(1)} ·{" "}
              {gym.priceRange}
            </span>
          </div>
        </div>
      </section>

      <div className="container-fi grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="heading-display text-2xl text-white">About this gym</h2>
            <p className="mt-3 text-ink-200 leading-relaxed">{gym.blurb}</p>
            <p className="mt-3 text-ink-300">
              {gym.name} has been part of the {gym.city} combat sports scene for years. They
              welcome beginners and experienced fighters alike, with structured classes for every
              level. First class is free for new students.
            </p>

            <div className="mt-6">
              <div className="eyebrow mb-2">Disciplines offered</div>
              <div className="flex flex-wrap gap-2">
                {gym.disciplines.map((d) => (
                  <span key={d} className="chip-blood">{d}</span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="heading-display text-2xl text-white inline-flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blood-500" /> Weekly schedule
            </h2>
            <div className="mt-4 grid gap-2">
              {SCHEDULE.map((d) => (
                <div key={d.day} className="card flex items-start gap-4 p-4">
                  <div className="w-12 shrink-0 text-center font-bold uppercase text-blood-500">
                    {d.day}
                  </div>
                  <div className="flex-1 space-y-1">
                    {d.classes.map((c) => (
                      <div key={c} className="text-sm text-ink-200">{c}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="heading-display text-2xl text-white">Reviews ({reviews.length})</h2>
            <div className="mt-4 space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="card p-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{r.user}</span>
                      <span className="chip">{r.flair}</span>
                    </div>
                    <div className="inline-flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-ink-200">{r.body}</p>
                </div>
              ))}
            </div>

            {showReviewForm ? (
              <form onSubmit={handlePostReview} className="card mt-4 p-4">
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience at this gym…"
                  className="input resize-none"
                />
                <div className="mt-3 flex items-center gap-2 justify-end">
                  <button type="button" onClick={() => setShowReviewForm(false)} className="btn-ghost text-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={!reviewText.trim()} className="btn-primary text-sm disabled:opacity-50">
                    Post review
                  </button>
                </div>
              </form>
            ) : (
              <button onClick={() => setShowReviewForm(true)} className="btn-secondary mt-4">
                Write a review
              </button>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="card p-5">
            <button onClick={handleGetDirections} className="btn-primary w-full">
              <MapPin className="h-4 w-4" /> Get directions
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </button>
            <button onClick={handleContact} className="btn-secondary mt-2 w-full">
              Contact gym
            </button>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-ink-400" />
                <div>
                  <dt className="text-ink-400">Phone</dt>
                  <dd className="text-white">(555) 010-1234</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 text-ink-400" />
                <div>
                  <dt className="text-ink-400">Website</dt>
                  <dd className="text-blood-500">{gym.slug}.com</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-ink-400" />
                <div>
                  <dt className="text-ink-400">Address</dt>
                  <dd className="text-white">100 Sample St, {gym.city}, {gym.state}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="card p-5">
            <div className="eyebrow mb-3">Quick facts</div>
            <ul className="space-y-2 text-xs text-ink-300">
              <li>• First class is free</li>
              <li>• Group + private classes</li>
              <li>• Beginner classes daily</li>
              <li>• Drop-ins welcome</li>
              <li>• Showers + lockers on site</li>
            </ul>
          </div>

          <div className="card p-5 space-y-3">
            <button
              onClick={() => setSaved((s) => !s)}
              className={`flex items-center gap-2 text-sm font-semibold transition ${saved ? "text-blood-500" : "text-white hover:text-blood-500"}`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? "Gym saved" : "Save gym"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-blood-500 transition"
            >
              {shareLabel === "Copied!" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {shareLabel}
            </button>
          </div>
        </aside>
      </div>

      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-12">
          <h2 className="heading-display text-2xl text-white mb-6">Other gyms nearby</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((g) => (
              <GymCard key={g.id} gym={g} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
