import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Advertise with us" };

const SLOTS = [
  {
    name: "Homepage takeover",
    desc: "Hero adjacent slot. High visibility on the most-trafficked page.",
    price: "From $400/wk",
  },
  {
    name: "Live event sponsorship",
    desc: "Brand the live chat and update feed for a tentpole UFC/PPV event.",
    price: "From $1,000/event",
  },
  {
    name: "Newsletter feature",
    desc: "Sponsored block in the weekly Round 1 newsletter.",
    price: "From $250/issue",
  },
  {
    name: "Blog spotlight",
    desc: "Custom branded long-form post written by our editorial team.",
    price: "From $1,500/post",
  },
];

export default function AdvertisePage() {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">Advertise</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white max-w-3xl leading-[1.05]">
            Reach <span className="text-blood-500">real fight fans and trainees.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-200">
            We don&apos;t do junk display ads. Every placement is editorial-quality and clearly
            labeled. If your brand is great, you&apos;ll fit right in.
          </p>
        </div>
      </section>

      <section className="container-fi py-12 grid gap-6 sm:grid-cols-2">
        {SLOTS.map((s) => (
          <div key={s.name} className="card p-6">
            <h3 className="heading-display text-xl text-white">{s.name}</h3>
            <p className="mt-2 text-sm text-ink-300">{s.desc}</p>
            <div className="mt-4 chip-gold">{s.price}</div>
          </div>
        ))}
      </section>

      <section className="container-fi pb-16 text-center">
        <Link href="/contact" className="btn-primary">Get the media kit</Link>
      </section>
    </>
  );
}
