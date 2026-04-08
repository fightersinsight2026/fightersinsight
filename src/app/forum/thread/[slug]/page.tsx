import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_THREADS } from "@/lib/mock-data";
import { formatRelative } from "@/lib/format";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark, Flag, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return MOCK_THREADS.map((t) => ({ slug: t.slug }));
}

const REPLIES = [
  {
    user: "tapeologist",
    flair: "Coach",
    upvotes: 142,
    body: "I've been saying this for months. The volume narrative is overrated when the volume is mostly safe range-finder shots that don't damage. Topuria isn't trying to win exchanges — he's trying to end them.",
    age: "5h",
  },
  {
    user: "fightnerd99",
    flair: "MMA Fan",
    upvotes: 88,
    body: "Counterpoint: Holloway's chin is iron and his pace breaks people. I think you're overrating one punch.",
    age: "4h",
  },
  {
    user: "atxnewbie",
    flair: "Beginner",
    upvotes: 23,
    body: "Genuine question — when you say 'angles', what do you actually mean? Like, sidesteps?",
    age: "3h",
  },
];

export default function ThreadPage({ params }: { params: { slug: string } }) {
  const thread = MOCK_THREADS.find((t) => t.slug === params.slug);
  if (!thread) notFound();

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

          <div className="mt-6 flex items-center gap-2">
            <button className="btn-ghost">
              <ArrowBigUp className="h-4 w-4 text-blood-500" />
              <span>{thread.upvotes}</span>
            </button>
            <button className="btn-ghost">
              <ArrowBigDown className="h-4 w-4" />
            </button>
            <button className="btn-ghost">
              <MessageSquare className="h-4 w-4" /> {thread.replies} replies
            </button>
            <button className="btn-ghost">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="btn-ghost">
              <Bookmark className="h-4 w-4" /> Save
            </button>
            <button className="btn-ghost ml-auto text-ink-400">
              <Flag className="h-4 w-4" />
            </button>
          </div>
        </article>

        {/* Reply box */}
        <form className="card mt-6 p-4">
          <textarea rows={3} placeholder="Add your reply…" className="input resize-none" />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-ink-400">Markdown supported · Be respectful.</span>
            <button className="btn-primary">Post reply</button>
          </div>
        </form>

        {/* Replies */}
        <h2 className="heading-display text-lg text-white mt-8 mb-3">{thread.replies} replies</h2>
        <div className="space-y-3">
          {REPLIES.map((r, i) => (
            <div key={i} className="card flex gap-4 p-4">
              <div className="flex w-10 shrink-0 flex-col items-center text-ink-300">
                <ArrowBigUp className="h-4 w-4 text-blood-500" />
                <span className="text-xs font-bold text-white">{r.upvotes}</span>
                <ArrowBigDown className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-ink-400">
                  <span className="font-bold text-white">{r.user}</span>
                  <span className="chip">{r.flair}</span>
                  <span>· {r.age} ago</span>
                </div>
                <p className="mt-2 text-sm text-ink-200">{r.body}</p>
                <div className="mt-2 flex gap-2 text-xs">
                  <button className="text-ink-400 hover:text-white">Reply</button>
                  <button className="text-ink-400 hover:text-white">Share</button>
                  <button className="text-ink-400 hover:text-white">Report</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 self-start">
        <div className="card p-4">
          <div className="eyebrow mb-2">About this thread</div>
          <ul className="text-xs text-ink-300 space-y-1.5">
            <li>Posted in <span className="text-white font-semibold">{thread.category}</span></li>
            <li>{thread.upvotes} upvotes · {thread.replies} replies</li>
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
