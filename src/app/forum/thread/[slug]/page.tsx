"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_THREADS } from "@/lib/mock-data";
import { formatRelative } from "@/lib/format";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  BookmarkCheck,
  Flag,
  ArrowLeft,
  Reply,
  Check,
} from "lucide-react";

const INITIAL_REPLIES = [
  {
    id: "r1",
    user: "tapeologist",
    flair: "Coach",
    upvotes: 142,
    body: "I've been saying this for months. The volume narrative is overrated when the volume is mostly safe range-finder shots that don't damage. Topuria isn't trying to win exchanges — he's trying to end them.",
    age: "5h",
    parentId: null as string | null,
  },
  {
    id: "r2",
    user: "fightnerd99",
    flair: "MMA Fan",
    upvotes: 88,
    body: "Counterpoint: Holloway's chin is iron and his pace breaks people. I think you're overrating one punch.",
    age: "4h",
    parentId: null as string | null,
  },
  {
    id: "r3",
    user: "atxnewbie",
    flair: "Beginner",
    upvotes: 23,
    body: "Genuine question — when you say 'angles', what do you actually mean? Like, sidesteps?",
    age: "3h",
    parentId: null as string | null,
  },
];

export default function ThreadPage() {
  const params = useParams<{ slug: string }>();
  const thread = MOCK_THREADS.find((t) => t.slug === params.slug);

  // Votes
  const [threadVote, setThreadVote] = useState<"up" | "down" | null>(null);
  const [threadScore, setThreadScore] = useState(thread?.upvotes ?? 0);

  // Save / Share
  const [saved, setSaved] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share");
  const [reported, setReported] = useState(false);

  // Replies
  const [replies, setReplies] = useState(INITIAL_REPLIES);
  const [replyVotes, setReplyVotes] = useState<Record<string, "up" | "down" | null>>({});
  const [replyScores, setReplyScores] = useState<Record<string, number>>(
    Object.fromEntries(INITIAL_REPLIES.map((r) => [r.id, r.upvotes]))
  );

  // Reply forms
  const [mainReplyText, setMainReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [inlineReplyText, setInlineReplyText] = useState("");

  if (!thread) {
    return (
      <div className="container-fi py-20 text-center">
        <h1 className="heading-display text-3xl text-white">Thread not found</h1>
        <Link href="/forum" className="btn-primary mt-6 inline-flex">Back to forum</Link>
      </div>
    );
  }

  function handleThreadVote(dir: "up" | "down") {
    if (threadVote === dir) {
      // Undo vote
      setThreadVote(null);
      setThreadScore(thread!.upvotes);
    } else {
      setThreadVote(dir);
      setThreadScore(thread!.upvotes + (dir === "up" ? 1 : -1));
    }
  }

  function handleReplyVote(id: string, dir: "up" | "down", originalScore: number) {
    const current = replyVotes[id] ?? null;
    if (current === dir) {
      setReplyVotes((p) => ({ ...p, [id]: null }));
      setReplyScores((p) => ({ ...p, [id]: originalScore }));
    } else {
      setReplyVotes((p) => ({ ...p, [id]: dir }));
      setReplyScores((p) => ({ ...p, [id]: originalScore + (dir === "up" ? 1 : -1) }));
    }
  }

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: thread!.title, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShareLabel("Copied!");
      setTimeout(() => setShareLabel("Share"), 2000);
    }
  }

  function handlePostMainReply(e: React.FormEvent) {
    e.preventDefault();
    if (!mainReplyText.trim()) return;
    setReplies((prev) => [
      ...prev,
      {
        id: `r${Date.now()}`,
        user: "you",
        flair: "Member",
        upvotes: 1,
        body: mainReplyText.trim(),
        age: "just now",
        parentId: null,
      },
    ]);
    setReplyScores((p) => ({ ...p, [`r${Date.now()}`]: 1 }));
    setMainReplyText("");
  }

  function handlePostInlineReply(parentId: string) {
    if (!inlineReplyText.trim()) return;
    const newId = `r${Date.now()}`;
    setReplies((prev) => [
      ...prev,
      {
        id: newId,
        user: "you",
        flair: "Member",
        upvotes: 1,
        body: inlineReplyText.trim(),
        age: "just now",
        parentId,
      },
    ]);
    setReplyScores((p) => ({ ...p, [newId]: 1 }));
    setInlineReplyText("");
    setReplyingTo(null);
  }

  const topLevelReplies = replies.filter((r) => !r.parentId);
  const totalReplies = replies.length;

  return (
    <div className="container-fi grid gap-8 py-10 lg:grid-cols-[1fr_280px]">
      <div>
        <Link
          href="/forum"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" /> Back to forum
        </Link>

        <article className="card p-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-400">
            <span className="chip">{thread.category}</span>
            {thread.tag && <span className="chip-blood">{thread.tag}</span>}
            <span>· posted {formatRelative(thread.createdAt)} by</span>
            <span className="font-bold text-white">{thread.user.name}</span>
            <span className="chip">{thread.user.flair}</span>
          </div>

          <h1 className="mt-3 heading-display text-2xl text-white sm:text-3xl">{thread.title}</h1>

          <p className="mt-4 text-ink-200 leading-relaxed">
            Hot take time. Watch the way Topuria steps in versus the way most featherweights do.
            He&apos;s not throwing for the sake of throwing — every step is an angle reset. Holloway
            is going to land a lot of jabs, sure, but the question is whether he can survive the
            exchanges he creates.
          </p>
          <p className="mt-3 text-ink-200 leading-relaxed">
            What do you all think? Am I overrating one punch?
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleThreadVote("up")}
              className={`btn-ghost ${threadVote === "up" ? "text-blood-500" : ""}`}
            >
              <ArrowBigUp className={`h-4 w-4 ${threadVote === "up" ? "fill-blood-500 text-blood-500" : "text-blood-500"}`} />
              <span>{threadScore}</span>
            </button>
            <button
              onClick={() => handleThreadVote("down")}
              className={`btn-ghost ${threadVote === "down" ? "text-blue-400" : ""}`}
            >
              <ArrowBigDown className={`h-4 w-4 ${threadVote === "down" ? "fill-blue-400 text-blue-400" : ""}`} />
            </button>
            <button className="btn-ghost">
              <MessageSquare className="h-4 w-4" /> {totalReplies} replies
            </button>
            <button onClick={handleShare} className="btn-ghost">
              {shareLabel === "Copied!" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {shareLabel}
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`btn-ghost ${saved ? "text-blood-500" : ""}`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => setReported(true)}
              disabled={reported}
              className={`btn-ghost ml-auto ${reported ? "text-ink-500" : "text-ink-400"}`}
            >
              <Flag className="h-4 w-4" />
              {reported ? "Reported" : ""}
            </button>
          </div>
        </article>

        {/* Reply box */}
        <form onSubmit={handlePostMainReply} className="card mt-6 p-4">
          <textarea
            rows={3}
            value={mainReplyText}
            onChange={(e) => setMainReplyText(e.target.value)}
            placeholder="Add your reply…"
            className="input resize-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-ink-400">Markdown supported · Be respectful.</span>
            <button type="submit" disabled={!mainReplyText.trim()} className="btn-primary disabled:opacity-50">
              Post reply
            </button>
          </div>
        </form>

        {/* Replies */}
        <h2 className="heading-display text-lg text-white mt-8 mb-3">{totalReplies} replies</h2>
        <div className="space-y-3">
          {topLevelReplies.map((r) => {
            const childReplies = replies.filter((c) => c.parentId === r.id);
            const originalScore = INITIAL_REPLIES.find((x) => x.id === r.id)?.upvotes ?? r.upvotes;
            return (
              <div key={r.id}>
                <div className="card flex gap-4 p-4">
                  <div className="flex w-10 shrink-0 flex-col items-center text-ink-300">
                    <button
                      onClick={() => handleReplyVote(r.id, "up", originalScore)}
                      className={replyVotes[r.id] === "up" ? "text-blood-500" : "hover:text-blood-500"}
                    >
                      <ArrowBigUp className={`h-4 w-4 ${replyVotes[r.id] === "up" ? "fill-blood-500" : ""}`} />
                    </button>
                    <span className="text-xs font-bold text-white">{replyScores[r.id] ?? r.upvotes}</span>
                    <button
                      onClick={() => handleReplyVote(r.id, "down", originalScore)}
                      className={replyVotes[r.id] === "down" ? "text-blue-400" : "hover:text-blue-400"}
                    >
                      <ArrowBigDown className={`h-4 w-4 ${replyVotes[r.id] === "down" ? "fill-blue-400" : ""}`} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-ink-400">
                      <span className="font-bold text-white">{r.user}</span>
                      <span className="chip">{r.flair}</span>
                      <span>· {r.age} ago</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-200">{r.body}</p>
                    <div className="mt-2 flex gap-3 text-xs">
                      <button
                        onClick={() => {
                          setReplyingTo(replyingTo === r.id ? null : r.id);
                          setInlineReplyText("");
                        }}
                        className="inline-flex items-center gap-1 text-ink-400 hover:text-white font-semibold"
                      >
                        <Reply className="h-3 w-3" /> Reply
                      </button>
                      <button
                        onClick={handleShare}
                        className="text-ink-400 hover:text-white"
                      >
                        Share
                      </button>
                      <button className="text-ink-400 hover:text-white">Report</button>
                    </div>

                    {/* Inline reply form */}
                    {replyingTo === r.id && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handlePostInlineReply(r.id);
                        }}
                        className="mt-3 border-t border-ink-700 pt-3"
                      >
                        <textarea
                          rows={2}
                          value={inlineReplyText}
                          onChange={(e) => setInlineReplyText(e.target.value)}
                          placeholder={`Reply to ${r.user}…`}
                          className="input resize-none text-sm"
                          autoFocus
                        />
                        <div className="mt-2 flex items-center gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="btn-ghost text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!inlineReplyText.trim()}
                            className="btn-primary text-xs disabled:opacity-50"
                          >
                            Post reply
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Child replies */}
                {childReplies.length > 0 && (
                  <div className="ml-8 mt-2 space-y-2 border-l-2 border-ink-700 pl-4">
                    {childReplies.map((c) => (
                      <div key={c.id} className="card p-3">
                        <div className="flex items-center gap-2 text-xs text-ink-400">
                          <span className="font-bold text-white">{c.user}</span>
                          <span className="chip">{c.flair}</span>
                          <span>· {c.age}</span>
                        </div>
                        <p className="mt-1 text-sm text-ink-200">{c.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 self-start">
        <div className="card p-4">
          <div className="eyebrow mb-2">About this thread</div>
          <ul className="text-xs text-ink-300 space-y-1.5">
            <li>Posted in <span className="text-white font-semibold">{thread.category}</span></li>
            <li>{threadScore} upvotes · {totalReplies} replies</li>
            <li>Sort: Top</li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="eyebrow mb-2">Rules</div>
          <ul className="text-xs text-ink-300 space-y-1.5 list-disc list-inside">
            <li>Stay on topic.</li>
            <li>No personal attacks.</li>
            <li>No spam or self-promo.</li>
            <li>Use the report button — don&apos;t feed trolls.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
