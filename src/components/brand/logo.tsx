import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 font-display font-black tracking-tight",
        className
      )}
      aria-label="The Fighter's Insight — Home"
    >
      {/* Octagon TFI logo */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 shrink-0"
        aria-hidden
      >
        <circle cx="22" cy="22" r="22" fill="#0a0a0b" />
        <polygon
          points="14.5,5.3 29.5,5.3 38.7,14.5 38.7,29.5 29.5,38.7 14.5,38.7 5.3,29.5 5.3,14.5"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
        />
        <text
          x="22"
          y="27"
          textAnchor="middle"
          fill="white"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="1"
        >
          TFI
        </text>
      </svg>
      <span className="leading-none">
        <span className="block text-[15px] font-black tracking-wide text-white sm:text-base">THE FIGHTER&apos;S</span>
        <span className="block text-[15px] font-black tracking-wide text-ink-300 sm:text-base">INSIGHT</span>
      </span>
    </Link>
  );
}
