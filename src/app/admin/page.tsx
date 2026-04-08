import { Eye, MessageSquare, Users, Radio, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin · Overview" };

const STATS = [
  { label: "Page views (7d)", value: "184k", trend: "+12%", icon: Eye },
  { label: "Active users", value: "12,403", trend: "+4%", icon: Users },
  { label: "Live events streamed", value: "8", trend: "+2", icon: Radio },
  { label: "Comments posted", value: "5,127", trend: "+18%", icon: MessageSquare },
];

export default function AdminOverviewPage() {
  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="eyebrow mb-2">Dashboard</div>
          <h1 className="heading-display text-3xl text-white">Mission control</h1>
        </div>
        <div className="text-sm text-ink-400">Last 7 days</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-blood-500" />
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {s.trend}
                </span>
              </div>
              <div className="mt-3 heading-display text-3xl text-white">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-ink-400">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="heading-display text-lg text-white">Top blog posts (7d)</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { t: "Topuria vs Holloway breakdown", v: "42,310" },
              { t: "First month of BJJ mistakes", v: "21,144" },
              { t: "Best boxing gloves under $100", v: "18,902" },
              { t: "Muay Thai vs Boxing", v: "12,508" },
            ].map((r) => (
              <li key={r.t} className="flex items-center justify-between border-b border-ink-800 pb-2 last:border-0">
                <span className="text-white">{r.t}</span>
                <span className="font-mono text-ink-300">{r.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="heading-display text-lg text-white">Top partner gym clicks</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { t: "Ironworks Boxing — Brooklyn", v: "1,402" },
              { t: "Sitsongpeenong — LA", v: "987" },
              { t: "Renzo Gracie — NYC", v: "812" },
              { t: "Atos Jiu-Jitsu — San Diego", v: "604" },
            ].map((r) => (
              <li key={r.t} className="flex items-center justify-between border-b border-ink-800 pb-2 last:border-0">
                <span className="text-white">{r.t}</span>
                <span className="font-mono text-ink-300">{r.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="heading-display text-lg text-white">Open moderation queue</h3>
          <p className="mt-2 text-sm text-ink-300">7 reports awaiting review · 2 user appeals · 1 partner submission</p>
          <div className="mt-4 flex gap-2">
            <button className="btn-primary">Open moderation</button>
            <button className="btn-secondary">View reports</button>
          </div>
        </div>
      </div>
    </>
  );
}
