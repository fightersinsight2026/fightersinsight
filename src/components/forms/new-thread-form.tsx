"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { FORUM_CATEGORIES } from "@/lib/mock-data";

const TAGS = ["Advice", "Debate", "Breaking News", "Technique", "Beginner", "Gear", "Gym Review"];

export function NewThreadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(FORUM_CATEGORIES[0].slug);
  const [tag, setTag] = useState<string>("");
  const [type, setType] = useState("STANDARD");
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setStatus("loading");
    // TODO: POST /api/forum/threads via Prisma. For now we just simulate success.
    setTimeout(() => {
      setStatus("ok");
      setTimeout(() => router.push("/forum"), 1200);
    }, 600);
  }

  if (status === "ok") {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 heading-display text-2xl text-white">Posted.</h3>
        <p className="mt-2 text-ink-300">Taking you back to the forum…</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      <div>
        <label className="text-xs font-semibold text-ink-300">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={140}
          placeholder="Make it specific. Make it interesting."
          className="input mt-1"
        />
        <div className="mt-1 text-[11px] text-ink-400">{title.length}/140</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-ink-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input mt-1"
          >
            {FORUM_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-300">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="input mt-1">
            <option value="STANDARD">Standard discussion</option>
            <option value="ADVICE">Advice request</option>
            <option value="QA">Q&amp;A</option>
            <option value="BREAKDOWN">Fight breakdown</option>
            <option value="POLL">Poll</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-ink-300">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          required
          className="input mt-1 resize-none"
          placeholder="Markdown supported. Be respectful. Read the community guidelines first."
        />
      </div>

      <div>
        <div className="text-xs font-semibold text-ink-300 mb-2">Tag (optional)</div>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? "" : t)}
              className={`chip cursor-pointer ${
                tag === t ? "border-blood-500/60 bg-blood-500/15 text-blood-500" : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {type === "ADVICE" && (
        <div className="card border-gold-500/40 bg-gold-500/5 p-3 text-xs text-ink-300">
          <strong className="text-gold-400">Heads up:</strong> forum advice is not professional
          coaching or medical advice. For serious training or injury issues, see a real coach and a
          real doctor.
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-ink-400">
          By posting you agree to the community guidelines.
        </p>
        <button type="submit" disabled={status === "loading"} className="btn-primary">
          {status === "loading" ? "Posting…" : "Post thread"}
        </button>
      </div>
    </form>
  );
}
