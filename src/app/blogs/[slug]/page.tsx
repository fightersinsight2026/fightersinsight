import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_BLOGS } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";
import { BlogCard } from "@/components/cards/blog-card";
import { Bookmark, Share2, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return MOCK_BLOGS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = MOCK_BLOGS.find((b) => b.slug === params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = MOCK_BLOGS.find((b) => b.slug === params.slug);
  if (!post) notFound();

  const related = MOCK_BLOGS.filter((b) => b.id !== post.id).slice(0, 3);

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
          <span className="chip-blood w-fit">{post.category}</span>
          <h1 className="mt-3 max-w-4xl heading-display text-3xl text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-300">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blood-500 text-xs font-bold text-white">
                {post.author.avatarInitials}
              </span>
              <span className="font-semibold text-white">{post.author.name}</span>
            </span>
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
            <button className="btn-secondary">
              <Bookmark className="h-4 w-4" /> Save
            </button>
            <button className="btn-secondary">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="btn-secondary">
              <MessageSquare className="h-4 w-4" /> Jump to comments
            </button>
          </div>

          {/* Comments */}
          <section className="mt-12">
            <h2 className="heading-display text-2xl text-white">Comments (24)</h2>
            <form className="mt-4 card p-4">
              <textarea
                rows={3}
                placeholder="Share your take. Be respectful — read the community guidelines."
                className="input resize-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-ink-400">Markdown supported.</span>
                <button className="btn-primary">Post comment</button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              {[
                {
                  user: "fightnerd99",
                  flair: "MMA Fan",
                  body: "Footwork take is spot on. People keep talking about power, but the angles are everything in this matchup.",
                },
                {
                  user: "coachJay",
                  flair: "Coach",
                  body: "Agree on key #2. The minute he starts retreating in straight lines, this becomes a problem.",
                },
              ].map((c) => (
                <div key={c.user} className="card p-4">
                  <div className="flex items-center gap-2 text-xs text-ink-300">
                    <span className="font-bold text-white">{c.user}</span>
                    <span className="chip">{c.flair}</span>
                    <span>· 2h ago</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-200">{c.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="card p-5">
            <div className="eyebrow mb-2">About the author</div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blood-500 text-sm font-bold text-white">
                {post.author.avatarInitials}
              </span>
              <div>
                <div className="font-semibold text-white">{post.author.name}</div>
                <div className="text-xs text-ink-400">Senior fight analyst</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-300">
              Former amateur boxer, full-time fight tape obsessive. Writes the weekly Round 1
              breakdown.
            </p>
          </div>

          <div className="card p-5">
            <div className="eyebrow mb-2">Tags</div>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="chip">
                  #{t}
                </span>
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
