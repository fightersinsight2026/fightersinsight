import Link from "next/link";
import Image from "next/image";
import { formatEventTime } from "@/lib/format";
import type { MockEvent } from "@/lib/mock-data";
import { MapPin } from "lucide-react";

export function EventCard({ event }: { event: MockEvent }) {
  const isLive = event.status === "LIVE";
  return (
    <Link
      href={`/live/${event.slug}`}
      className="card card-hover group relative block overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={event.cover}
          alt={event.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="chip-gold">{event.promotion}</span>
          {isLive && (
            <span className="chip-blood inline-flex items-center gap-1.5">
              <span className="live-dot" /> LIVE NOW
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="heading-display text-xl text-white drop-shadow">{event.title}</h3>
          <div className="mt-1 text-sm font-semibold text-ink-200">
            {event.mainEvent.a} <span className="text-blood-500">vs</span> {event.mainEvent.b}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 text-xs text-ink-300">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          {event.venue} · {event.city}
        </span>
        <span className="font-semibold text-ink-200">{formatEventTime(event.startTime)}</span>
      </div>
    </Link>
  );
}
