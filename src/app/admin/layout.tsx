import Link from "next/link";
import { LayoutDashboard, FileText, Radio, MessageSquare, MapPin, ShoppingBag, BarChart3, Shield } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/events", label: "Live Events", icon: Radio },
  { href: "/admin/forum", label: "Forum Moderation", icon: MessageSquare },
  { href: "/admin/gyms", label: "Gyms & Trainers", icon: MapPin },
  { href: "/admin/gear", label: "Gear Reviews", icon: ShoppingBag },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/reports", label: "Reports", icon: Shield },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fi grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="card h-fit p-3 lg:sticky lg:top-24">
        <div className="eyebrow px-3 py-2">Admin</div>
        <nav className="space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
