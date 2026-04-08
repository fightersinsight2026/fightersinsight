import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  eyebrow,
  title,
  link,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h2 className="heading-display text-2xl text-white sm:text-3xl">{title}</h2>
      </div>
      {link && (
        <Link
          href={link}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ink-200 hover:text-white"
        >
          {linkLabel ?? "See all"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
