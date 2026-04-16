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
      {/* Octagon TFI logo */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 shrink-0"
        aria-hidden
      >
        {/* Black circle background */}
        <circle cx="20" cy="20" r="20" fill="#0a0a0b" />
        {/* White octagon outline */}
        <polygon
          points="13.2,4.8 26.8,4.8 35.2,13.2 35.2,26.8 26.8,35.2 13.2,35.2 4.8,26.8 4.8,13.2"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
        />
        {/* TFI text */}
        <text
          x="20"
          y="24.5"
          textAnchor="middle"
          fill="white"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.5"
        >
          TFI
        </text>
      </svg>
      <span className="text-lg sm:text-xl">
        <span className="text-white">THE FIGHTER&apos;S</span>
        <span className="ml-1 text-blood-500">INSIGHT</span>
      </span>
    </Link>
  );
}
