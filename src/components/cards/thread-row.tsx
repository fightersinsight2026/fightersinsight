import Link from "next/link";
import { formatRelative, formatNumber } from "@/lib/format";
import type { MockThread } from "@/lib/mock-data";
import { MessageSquare, ArrowBigUp, Pin } from "lucide-react";

export function ThreadRow({ thread }: { thread: MockThread }) {
  return (
    <Link
      href={`/forum/thread/${thread.slug}`}
      className="card card-hover flex items-start gap-4 p-4"
    >
      <div className="flex w-12 shrink-0 flex-col items-center rounded-md bg-ink-900 py-2 text-ink-200">
        <ArrowBigUp className="h-4 w-4 text-blood-500" />
        <span className="text-sm font-bold text-white">{formatNumber(thread.upvotes)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
          {thread.pinned && (
            <span className="chip-gold inline-flex items-center gap-1">
              <Pin className="h-3 w-3" /> Pinned
            </span>
          )}
          <span className="chip">{thread.category}</span>
          {thread.tag && <span className="chip-blood">{thread.tag}</span>}
          <span>· {formatRelative(thread.createdAt)}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold text-white">{thread.title}</h3>

        <div className="mt-2 flex items-center gap-3 text-xs text-ink-300">
          <span>
            by <span className="font-semibold text-ink-200">{thread.user.name}</span>
          </span>
          <span className="chip">{thread.user.flair}</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {thread.replies} replies
          </span>
        </div>
      </div>
    </Link>
  );
}
