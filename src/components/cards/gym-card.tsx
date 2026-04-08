import Link from "next/link";
import Image from "next/image";
import type { MockGym } from "@/lib/mock-data";
import { Star, MapPin, ShieldCheck } from "lucide-react";

export function GymCard({ gym }: { gym: MockGym }) {
  return (
    <Link
      href={`/start-training/gyms/${gym.slug}`}
      className="card card-hover group relative block overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={gym.image}
          alt={gym.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {gym.partner && <span className="chip-gold">Partner</span>}
          {gym.beginnerFriendly && <span className="chip-blood">Beginner Friendly</span>}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="heading-display text-lg text-white group-hover:text-blood-500 transition">
              {gym.name}
            </h3>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-300">
              <MapPin className="h-3 w-3" /> {gym.city}, {gym.state}
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 text-sm font-bold text-white">
              <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
              {gym.rating.toFixed(1)}
            </div>
            <div className="text-xs text-ink-400">{gym.priceRange}</div>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-xs text-ink-300">{gym.blurb}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {gym.disciplines.map((d) => (
            <span key={d} className="chip">
              {d}
            </span>
          ))}
        </div>

        {gym.partner && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-gold-400">
            <ShieldCheck className="h-3 w-3" />
            Verified Partner
          </div>
        )}
      </div>
    </Link>
  );
}
