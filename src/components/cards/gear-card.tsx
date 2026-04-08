import Link from "next/link";
import Image from "next/image";
import type { MockGear } from "@/lib/mock-data";
import { Star } from "lucide-react";

export function GearCard({ gear }: { gear: MockGear }) {
  return (
    <Link
      href={`/gear/${gear.slug}`}
      className="card card-hover group block overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-900">
        <Image
          src={gear.image}
          alt={gear.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="chip-gold absolute right-3 top-3 inline-flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" /> {gear.rating}
        </span>
      </div>
      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-ink-400">{gear.brand}</div>
        <h3 className="mt-1 heading-display text-base text-white group-hover:text-blood-500 transition line-clamp-1">
          {gear.name}
        </h3>
        <div className="mt-2 flex items-center justify-between text-xs text-ink-300">
          <span>{gear.bestFor}</span>
          <span className="font-bold text-ink-100">{gear.price}</span>
        </div>
      </div>
    </Link>
  );
}
