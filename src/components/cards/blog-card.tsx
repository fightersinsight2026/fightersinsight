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
          featured ? "lg:w-1/2 aspect-[16/10] lg:aspect-auto" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes={featured ? "(max-width:1024px) 100vw, 50vw" : "(max-width:768px) 100vw, 25vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
        <span className="chip-blood absolute left-2 top-2 text-[10px]">{post.category}</span>
      </div>

      <div className={`p-3 ${featured ? "lg:w-1/2 lg:p-5" : ""}`}>
        <h3
          className={`heading-display text-white group-hover:text-blood-500 transition line-clamp-2 ${
            featured ? "text-lg lg:text-xl" : "text-sm"
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-1 line-clamp-2 text-ink-300 ${featured ? "text-sm" : "text-xs"}`}>{post.excerpt}</p>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-400">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink-700 text-[9px] font-bold text-white">
            {post.author.avatarInitials}
          </span>
          <span className="font-semibold text-ink-200">{post.author.name}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1 ml-auto">
            <Clock className="h-2.5 w-2.5" />
            {post.readingMinutes}m
          </span>
        </div>
      </div>
    </Link>
  );
}
