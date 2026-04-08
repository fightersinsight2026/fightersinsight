import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format";
import type { MockBlogPost } from "@/lib/mock-data";
import { Clock } from "lucide-react";

export function BlogCard({ post, featured = false }: { post: MockBlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`card card-hover group block overflow-hidden ${
        featured ? "lg:flex lg:items-stretch" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "lg:w-3/5 aspect-[16/10] lg:aspect-auto" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes={featured ? "(max-width:1024px) 100vw, 60vw" : "(max-width:768px) 100vw, 33vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
        <span className="chip-blood absolute left-3 top-3">{post.category}</span>
      </div>

      <div className={`p-5 ${featured ? "lg:w-2/5 lg:p-7" : ""}`}>
        <h3
          className={`heading-display text-white group-hover:text-blood-500 transition ${
            featured ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-300">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-ink-400">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-700 text-[10px] font-bold text-white">
            {post.author.avatarInitials}
          </span>
          <span className="font-semibold text-ink-200">{post.author.name}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1 ml-auto">
            <Clock className="h-3 w-3" />
            {post.readingMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
