import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Live Fight Center", href: "/live" },
      { label: "Forum", href: "/forum" },
      { label: "Start Training", href: "/start-training" },
      { label: "Gear Reviews", href: "/gear" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Advertise", href: "/advertise" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community Guidelines", href: "/guidelines" },
      { label: "Report Content", href: "/report" },
      { label: "Safety", href: "/safety" },
      { label: "Coach Marketplace", href: "/start-training" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-800/80 bg-ink-950">
      <div className="container-fi py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-300">
              Where fight fans think deeper. Independent fight media, live event reactions,
              community, training discovery, and gear reviews — all in one place.
            </p>
            <form className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="input"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-[11px] text-ink-400">
              Get fight previews, live event alerts, and beginner tips. No spam.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-200 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-800/80 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} The Fighter&apos;s Insight. All rights reserved.</div>
          <div>
            Forum advice is not professional coaching or medical advice. Train safe.
          </div>
        </div>
      </div>
    </footer>
  );
}
