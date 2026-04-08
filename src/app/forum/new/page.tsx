import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewThreadForm } from "@/components/forms/new-thread-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Start a new thread" };

export default function NewThreadPage() {
  return (
    <div className="container-fi grid gap-8 py-10 lg:grid-cols-[1fr_280px]">
      <div>
        <Link
          href="/forum"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" /> Back to forum
        </Link>

        <div className="eyebrow mb-2">New thread</div>
        <h1 className="heading-display text-3xl text-white sm:text-4xl">
          Start a discussion.
        </h1>
        <p className="mt-2 text-ink-300">
          Pick a category, write your post, and put your take out there. Be respectful — beginners
          welcome.
        </p>

        <div className="mt-8">
          <NewThreadForm />
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 self-start">
        <div className="card p-4">
          <div className="eyebrow mb-2">Posting tips</div>
          <ul className="text-xs text-ink-300 space-y-1.5 list-disc list-inside">
            <li>Specific titles get more replies than vague ones.</li>
            <li>Pick the right category — your post will reach more people.</li>
            <li>If you&apos;re asking for advice, mention your experience level.</li>
            <li>Use markdown for formatting (** for bold, etc).</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="eyebrow mb-2">Rules</div>
          <ul className="text-xs text-ink-300 space-y-1.5 list-disc list-inside">
            <li>No hate speech.</li>
            <li>No spam or self-promo.</li>
            <li>Stay on topic.</li>
            <li>Be kind to beginners.</li>
          </ul>
          <Link href="/guidelines" className="mt-3 inline-block text-xs font-semibold text-blood-500">
            Full guidelines →
          </Link>
        </div>
      </aside>
    </div>
  );
}
