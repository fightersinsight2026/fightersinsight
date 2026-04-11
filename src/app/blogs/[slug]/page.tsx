"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_BLOGS } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";
import { BlogCard } from "@/components/cards/blog-card";
import { Bookmark, BookmarkCheck, Share2, MessageSquare, Clock, ArrowLeft, Reply, Check } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = MOCK_BLOGS.find((b) => b.slug === params.slug);

  const commentsRef = useRef<HTMLElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const [saved, setSaved] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: "c1",
      user: "fightnerd99",
      flair: "MMA Fan",
      body: "Footwork take is spot on. People keep talking about power, but the angles are everything in this matchup.",
      replyTo: null as string | null,
    },
    {
      id: "c2",
      user: "coachJay",
      flair: "Coach",
      body: "Agree on key #2. The minute he starts retreating in straight lines, this becomes a problem.",
      replyTo: null as string | null,
    },
  ]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  if (!post) {
    return (
      <div className="container-fi py-20 text-center">
        <h1 className="heading-display text-3xl text-white">Post not found</h1>
        <Link href="/blogs" className="btn-primary mt-6 inline-flex">
          Back to blogs
        </Link>
      </div>
    );
  }

  const related = MOCK_BLOGS.filter((b) => b.id !== post.id).slice(0, 3);

  function handleSave() {
    setSaved((s) => !s);
  }

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post!.title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareLabel("Link copied!");
      setTimeout(() => setShareLabel("Share"), 2000);
    }
  }

  function handleJumpToComments() {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => commentInputRef.current?.focus(), 400);
  }

  function handlePostComment() {
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c${Date.now()}`,
        user: "you",
        flair: "Member",
        body: commentText.trim(),
        replyTo: null,
      },
    ]);
    setCommentText("");
  }

  function handlePostReply(parentId: string) {
    if (!replyText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c${Date.now()}`,
        user: "you",
        flair: "Member",
        body: replyText.trim(),
        replyTo: parentId,
      },
    ]);
    setReplyText("");
    setReplyingTo(null);
  }

  return (
    <article>
      {/* Banner */}
      <header className="relative h-[44vh] min-h-[340px] w-full overflow-hidden border-b border-ink-800/80">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div className="container-fi relative flex h-full flex-col justify-end pb-10">
          <Link
            href="/blogs"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> All blogs
          </Link>
          <Link
            href={`/blogs?category=${encodeURIComponent(post.category)}`}
            className="chip-blood w-fit hover:opacity-80 transition"
          >
            {post.category}
          </Link>
          <h1 className="mt-3 max-w-4xl heading-display text-3xl text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-300">
            <Link
              href={`/blogs?author=${encodeURIComponent(post.author.name)}`}
              className="inline-flex items-center gap-2 hover:text-white transition"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blood-500 text-xs font-bold text-white">
                {post.author.avatarInitials}
              </span>
              <span className="font-semibold text-white hover:underline">{post.author.name}</span>
            </Link>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readingMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container-fi grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
        <div className="prose-fi max-w-none">
          <p className="text-lg text-ink-100">{post.excerpt}</p>
          <h2>The setup</h2>
          <p>
            Every fight is two stories happening at once. There&apos;s the surface narrative
            everyone&apos;s repeating on social media — and there&apos;s the actual technical reality
            on the tape. This post is about the second one.
          </p>
          <p>
            Forget the trash talk. Forget the betting odds. Let&apos;s talk about what&apos;s actually
            going to happen when these two fighters step into a confined space and try to solve each
            other.
          </p>

          <h2>Footwork tells the truth</h2>
          <p>
            Watch where the lead foot goes in the first ninety seconds. That&apos;s the entire fight.
            Fighters telegraph their gameplan with their hips before they ever throw a strike of
            consequence.
          </p>
          <blockquote>
            &ldquo;Power doesn&apos;t win fights. Position wins fights. Power just finishes them.&rdquo;
          </blockquote>

          <h2>What I&apos;d be looking for</h2>
          <p>
            If I were cornering this fight, I&apos;d want my fighter forcing the exchange in the
            pocket — not at distance. The numbers in the pocket favor the heavier hands; the numbers
            at distance favor volume.
          </p>
          <h3>Three keys</h3>
          <ul className="list-disc list-inside text-ink-200 space-y-1 mb-4">
            <li>Win the first 30 seconds of every round.</li>
            <li>Force exchanges into the angle, not straight back.</li>
            <li>Don&apos;t chase the finish — let it come to you.</li>
          </ul>

          <p>
            That&apos;s the fight. Everything else is noise. Drop your prediction in the comments and
            let&apos;s argue about it like adults.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-ink-800 pt-6">
            <button onClick={handleSave} className={`btn-secondary ${saved ? "border-blood-500/50 text-blood-500" : ""}`}>
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? "Saved" : "Save"}
            </button>
            <button onClick={handleShare} className="btn-secondary">
              {shareLabel === "Link copied!" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {shareLabel}
            </button>
            <button onClick={handleJumpToComments} className="btn-secondary">
              <MessageSquare className="h-4 w-4" /> Jump to comments
            </button>
          </div>

          {/* Comments */}
          <section ref={commentsRef} className="mt-12">
            <h2 className="heading-display text-2xl text-white">Comments ({comments.length})</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePostComment();
              }}
              className="mt-4 card p-4"
            >
              <textarea
                ref={commentInputRef}
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your take. Be respectful — read the community guidelines."
                className="input resize-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-ink-400">Markdown supported.</span>
                <button type="submit" disabled={!commentText.trim()} className="btn-primary disabled:opacity-50">
                  Post comment
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              {comments
                .filter((c) => !c.replyTo)
                .map((c) => {
                  const replies = comments.filter((r) => r.replyTo === c.id);
                  return (
                    <div key={c.id}>
                      <div className="card p-4">
                        <div className="flex items-center gap-2 text-xs text-ink-300">
                          <span className="font-bold text-white">{c.user}</span>
                          <span className="chip">{c.flair}</span>
                          <span>· 2h ago</span>
                        </div>
                        <p className="mt-2 text-sm text-ink-200">{c.body}</p>
                        <button
                          onClick={() => {
                            setReplyingTo(replyingTo === c.id ? null : c.id);
                            setReplyText("");
                          }}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ink-400 hover:text-white transition"
                        >
                          <Reply className="h-3 w-3" /> Reply
                        </button>

                        {replyingTo === c.id && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handlePostReply(c.id);
                            }}
                            className="mt-3 border-t border-ink-700 pt-3"
                          >
                            <textarea
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Reply to ${c.user}…`}
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
                                disabled={!replyText.trim()}
                                className="btn-primary text-xs disabled:opacity-50"
                              >
                                Post reply
                              </button>
                            </div>
                          </form>
                        )}
                      </div>

                      {/* Replies */}
                      {replies.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2 border-l-2 border-ink-700 pl-4">
                          {replies.map((r) => (
                            <div key={r.id} className="card p-3">
                              <div className="flex items-center gap-2 text-xs text-ink-300">
                                <span className="font-bold text-white">{r.user}</span>
                                <span className="chip">{r.flair}</span>
                                <span>· just now</span>
                              </div>
                              <p className="mt-1 text-sm text-ink-200">{r.body}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="card p-5">
            <div className="eyebrow mb-2">About the author</div>
            <Link
              href={`/blogs?author=${encodeURIComponent(post.author.name)}`}
              className="flex items-center gap-3 group"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blood-500 text-sm font-bold text-white">
                {post.author.avatarInitials}
              </span>
              <div>
                <div className="font-semibold text-white group-hover:underline">{post.author.name}</div>
                <div className="text-xs text-ink-400">Senior fight analyst</div>
              </div>
            </Link>
            <p className="mt-3 text-sm text-ink-300">
              Former amateur boxer, full-time fight tape obsessive. Writes the weekly Round 1
              breakdown.
            </p>
          </div>

          <div className="card p-5">
            <div className="eyebrow mb-2">Tags</div>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blogs?tag=${encodeURIComponent(t)}`}
                  className="chip hover:border-ink-500 hover:text-white transition"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="border-t border-ink-800/80 bg-ink-900/30">
        <div className="container-fi py-14">
          <h2 className="heading-display text-2xl text-white mb-6">Related reads</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
