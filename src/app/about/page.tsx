import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The Fighter's Insight",
  description: "Independent fight media built by fight fans, for fight fans and total beginners.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-16">
          <div className="eyebrow mb-3">About</div>
          <h1 className="heading-display text-4xl sm:text-6xl text-white max-w-3xl leading-[0.95]">
            Independent fight media. <span className="text-blood-500">Built for the people who actually train.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-200">
            We started The Fighter&apos;s Insight because we were tired of fight coverage that
            recycled press releases and promoted gear nobody on staff had ever touched. So we built
            the place we wanted to read.
          </p>
        </div>
      </section>

      <section className="container-fi py-14 grid gap-10 lg:grid-cols-3">
        {[
          {
            t: "Honest media",
            b: "Tape-driven analysis, beginner-focused guides, and opinion pieces that say something. No PR rewrites.",
          },
          {
            t: "Real community",
            b: "A discussion forum that doesn't get hijacked by trolls. Mods on duty. Beginners welcome.",
          },
          {
            t: "Pathway to training",
            b: "We connect fans to real gyms and coaches. The goal isn't just clicks — it's people walking into a gym for the first time.",
          },
        ].map((p) => (
          <div key={p.t} className="card p-6">
            <h3 className="heading-display text-xl text-white">{p.t}</h3>
            <p className="mt-3 text-ink-300">{p.b}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-16 text-center">
          <h2 className="heading-display text-3xl text-white">Want to write for us, partner with us, or sponsor an event?</h2>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/partner" className="btn-primary">Partner with us</Link>
            <Link href="/contact" className="btn-secondary">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
