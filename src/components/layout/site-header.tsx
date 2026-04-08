import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Search, User, Bell } from "lucide-react";

const NAV = [
  { href: "/blogs", label: "Blogs" },
  { href: "/live", label: "Live Fight Center", live: true },
  { href: "/forum", label: "Forum" },
  { href: "/start-training", label: "Start Training" },
  { href: "/gear", label: "Gear Reviews" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur supports-[backdrop-filter]:bg-ink-950/70">
      <div className="container-fi flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link inline-flex items-center gap-2">
                {item.live && <span className="live-dot" aria-hidden />}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-ghost h-10 w-10 p-0"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn-ghost h-10 w-10 p-0 hidden md:inline-flex"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <Link href="/sign-in" className="btn-secondary hidden sm:inline-flex">
            <User className="h-4 w-4" />
            Sign In
          </Link>
          <Link href="/register" className="btn-primary">
            Join Free
          </Link>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="lg:hidden border-t border-ink-800/80">
        <nav className="container-fi flex items-center gap-5 overflow-x-auto py-2.5 no-scrollbar">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap"
            >
              {item.live && <span className="live-dot" aria-hidden />}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
