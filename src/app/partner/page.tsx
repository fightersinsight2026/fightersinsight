import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, MapPin, Sparkles, BarChart3 } from "lucide-react";

export const metadata: Metadata = { title: "Partner with us — gyms and trainers" };

const TIERS = [
  {
    name: "Verified",
    price: "Free",
    blurb: "Get listed and verified on the map for free. Forever.",
    perks: [
      "Map pin + listing",
      "Verified badge",
      "Photos + schedule preview",
      "Inquiries via contact form",
    ],
    cta: "Submit your gym",
    accent: "border-ink-700",
  },
  {
    name: "Featured",
    price: "$49/mo",
    blurb: "Get prioritized in your city. Higher visibility for serious gyms.",
    perks: [
      "Everything in Verified",
      "Featured slot above organic",
      "Dedicated cover image",
      "Featured badge",
      "Basic analytics",
    ],
    cta: "Apply for Featured",
    accent: "border-blood-500/60",
    highlight: true,
  },
  {
    name: "Sponsored",
    price: "Custom",
    blurb: "Sponsored slots, blog spotlights, newsletter mentions, and more.",
    perks: [
      "Everything in Featured",
      "Custom placements",
      "Blog spotlight feature",
      "Newsletter mention",
      "Full analytics dashboard",
      "Dedicated partner manager",
    ],
    cta: "Talk to us",
    accent: "border-gold-500/40",
  },
];

export default function PartnerPage() {
  return (
    <>
      <section className="border-b border-ink-800/80 bg-hero-radial">
        <div className="container-fi py-16">
          <div className="eyebrow mb-3">Partner with us</div>
          <h1 className="heading-display text-4xl sm:text-6xl text-white max-w-3xl leading-[0.95]">
            Get found by <span className="text-blood-500">people who actually want to train.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-200">
            We send fight fans into real gyms. List your gym or trainer, get verified, and reach
            beginners + serious students searching in your city.
          </p>
        </div>
      </section>

      <section className="container-fi py-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: MapPin, t: "On the map", b: "Searchable by location, discipline, beginner-friendly, and price." },
          { icon: ShieldCheck, t: "Verified trust", b: "We vet listings. No fake gyms, no scam trainers." },
          { icon: Sparkles, t: "Beginner pipeline", b: "Our Start Training page is built to convert curious fans into students." },
          { icon: BarChart3, t: "Real analytics", b: "See impressions, clicks, and inquiries from your dashboard." },
        ].map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.t} className="card p-5">
              <Icon className="h-5 w-5 text-blood-500" />
              <div className="mt-3 font-bold text-white">{p.t}</div>
              <p className="mt-1 text-sm text-ink-300">{p.b}</p>
            </div>
          );
        })}
      </section>

      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-16">
          <div className="text-center">
            <div className="eyebrow mb-3">Plans</div>
            <h2 className="heading-display text-3xl text-white sm:text-4xl">Simple, fair pricing.</h2>
            <p className="mt-3 max-w-xl mx-auto text-ink-300">
              Free forever for verified listings. Upgrade only when you&apos;re ready for more
              visibility.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`card p-6 ${t.accent} ${t.highlight ? "lg:scale-[1.03]" : ""}`}
              >
                {t.highlight && (
                  <div className="mb-3 inline-flex chip-blood">Most popular</div>
                )}
                <div className="heading-display text-xl text-white">{t.name}</div>
                <div className="mt-1 heading-display text-3xl text-white">{t.price}</div>
                <p className="mt-2 text-sm text-ink-300">{t.blurb}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink-200">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blood-500" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 w-full">
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fi py-16 text-center">
        <h3 className="heading-display text-2xl text-white">Already a partner?</h3>
        <p className="mt-2 text-ink-300">
          Sign in to manage your listing, photos, and inquiries.
        </p>
        <Link href="/sign-in" className="btn-secondary mt-5 inline-flex">Partner sign in</Link>
      </section>
    </>
  );
}
