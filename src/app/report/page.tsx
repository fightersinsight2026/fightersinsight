import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "Report content" };

export default function ReportPage() {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">Report</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white">
            Saw something that <span className="text-blood-500">shouldn&apos;t be there?</span>
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Use the report button on any post, comment, or listing — or send us a message here.
            We review every report.
          </p>
        </div>
      </section>

      <section className="container-fi py-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <aside className="card p-5 text-sm text-ink-300">
          <div className="font-bold text-white">When to report</div>
          <ul className="mt-3 space-y-1.5 list-disc list-inside">
            <li>Hate speech or harassment</li>
            <li>Doxxing or threats</li>
            <li>Spam or scam links</li>
            <li>Fake gym/trainer listings</li>
            <li>Unsafe training advice</li>
          </ul>
          <div className="mt-4 text-xs text-ink-400">
            For urgent safety concerns please also contact local authorities. See our{" "}
            <Link href="/safety" className="text-blood-500">safety page</Link>.
          </div>
        </aside>
      </section>
    </>
  );
}
