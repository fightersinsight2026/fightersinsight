"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { User, Bell, Menu, X } from "lucide-react";

const NAV = [
  { href: "/blogs", label: "Blogs" },
  { href: "/live", label: "Live Fight Center", live: true },
  { href: "/forum", label: "Forum" },
  { href: "/fighters", label: "Fighters" },
  { href: "/start-training", label: "Start Training" },
  { href: "/gear", label: "Gear Reviews" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "UFC 327 results are in — see the recap", time: "2h ago", read: false },
    { id: 2, text: "New blog: Carlos Ulberg wins LHW title", time: "5h ago", read: false },
    { id: 3, text: "Your comment got 12 upvotes", time: "1d ago", read: true },
    { id: 4, text: "New gym added near you: Kings Combat", time: "2d ago", read: true },
  ]);

  function markAsRead(id: number) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur supports-[backdrop-filter]:bg-ink-950/70">
        <div className="container-fi flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden lg:flex items-center gap-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link inline-flex items-center gap-2"
                >
                  {item.live && <span className="live-dot" aria-hidden />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setNotifOpen(!notifOpen)}
                className="btn-ghost h-10 w-10 p-0 relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-full bg-blood-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-ink-700 bg-ink-900 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-ink-700 px-4 py-3">
                      <span className="text-sm font-bold text-white">Notifications</span>
                      <span className="text-[11px] text-ink-400">{unreadCount} new</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-ink-400">No notifications</div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => {
                              markAsRead(n.id);
                              setNotifOpen(false);
                            }}
                            className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-ink-800 ${
                              n.read ? "text-ink-400" : "text-ink-100"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {!n.read ? (
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blood-500" />
                              ) : (
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0" />
                              )}
                              <div>
                                <div className={n.read ? "" : "font-semibold"}>{n.text}</div>
                                <div className="text-[11px] text-ink-400 mt-0.5">{n.time}</div>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                    <div className="border-t border-ink-700 px-4 py-2">
                      <button
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        className="text-xs font-semibold text-blood-500 hover:text-blood-600 disabled:text-ink-500 disabled:cursor-not-allowed"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Link href="/sign-in" className="btn-secondary hidden sm:inline-flex">
              <User className="h-4 w-4" />
              Sign In
            </Link>
            <Link href="/register" className="btn-primary hidden sm:inline-flex">
              Join Free
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn-ghost h-10 w-10 p-0 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col border-l border-ink-800 bg-ink-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink-800 px-4 h-16">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="btn-ghost h-10 w-10 p-0"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-semibold text-ink-100 hover:bg-ink-800"
                  >
                    {item.live && <span className="live-dot" aria-hidden />}
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t border-ink-800 pt-6">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary w-full"
                >
                  <User className="h-4 w-4" /> Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  Join Free
                </Link>
              </div>

              <div className="mt-6 border-t border-ink-800 pt-6">
                <div className="eyebrow mb-3 px-3">More</div>
                <div className="space-y-1">
                  {[
                    { href: "/profile", label: "Your profile" },
                    { href: "/contact", label: "Contact" },
                    { href: "/partner", label: "Partner with us" },
                    { href: "/faq", label: "FAQ" },
                    { href: "/guidelines", label: "Community guidelines" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-ink-300 hover:bg-ink-800 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
