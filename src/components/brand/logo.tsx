import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display font-black tracking-tight",
        className
      )}
      aria-label="The Fighter's Insight — Home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-blood-500 text-white shadow-bloodglow">
        <span className="text-base font-black">FI</span>
        <span className="absolute -inset-px rounded-md ring-1 ring-inset ring-white/10" />
      </span>
      <span className="text-lg sm:text-xl">
        <span className="text-white">FIGHTER&apos;S</span>
        <span className="ml-1 text-blood-500">INSIGHT</span>
      </span>
    </Link>
  );
}
