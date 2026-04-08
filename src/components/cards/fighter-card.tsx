import Link from "next/link";
import Image from "next/image";
import type { MockFighter } from "@/lib/mock-data";

export function FighterCard({ fighter }: { fighter: MockFighter }) {
  return (
    <Link
      href={`/fighters/${fighter.slug}`}
      className="card card-hover group block overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={fighter.image}
          alt={fighter.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

        {fighter.rank && (
          <span className="chip-blood absolute left-3 top-3 font-black">
            {fighter.rank === "C" ? "CHAMP" : fighter.rank}
          </span>
        )}
        <span className="chip absolute right-3 top-3">{fighter.promotion}</span>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-[10px] uppercase tracking-wider text-ink-300">
            {fighter.weightClass}
          </div>
          <div className="heading-display text-lg text-white drop-shadow">{fighter.name}</div>
          {fighter.nickname && (
            <div className="text-xs italic text-blood-500">&ldquo;{fighter.nickname}&rdquo;</div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 text-xs">
        <div className="font-mono text-white">
          {fighter.record.w}-{fighter.record.l}
          {fighter.record.d > 0 && `-${fighter.record.d}`}
        </div>
        <div className="text-ink-400">{fighter.country}</div>
      </div>
    </Link>
  );
}
