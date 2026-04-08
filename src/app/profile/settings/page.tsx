import Link from "next/link";
import { ArrowLeft, User, Lock, Bell, Shield, Trash2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile settings" };

export default function ProfileSettingsPage() {
  return (
    <div className="container-fi grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="card h-fit p-3 lg:sticky lg:top-24">
        <Link
          href="/profile"
          className="mb-2 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-300 hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" /> Profile
        </Link>
        <div className="eyebrow px-3 py-2">Settings</div>
        <nav className="space-y-1">
          {[
            { href: "#account", label: "Account", icon: User },
            { href: "#password", label: "Password", icon: Lock },
            { href: "#notifications", label: "Notifications", icon: Bell },
            { href: "#privacy", label: "Privacy", icon: Shield },
            { href: "#danger", label: "Danger zone", icon: Trash2 },
          ].map((n) => {
            const Icon = n.icon;
            return (
              <a
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </a>
            );
          })}
        </nav>
      </aside>

      <div className="space-y-8">
        <div>
          <h1 className="heading-display text-3xl text-white">Settings</h1>
          <p className="mt-1 text-sm text-ink-300">Manage your account, profile, and notifications.</p>
        </div>

        {/* Account */}
        <section id="account" className="card p-6">
          <h2 className="heading-display text-xl text-white">Account</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-ink-300">Username</label>
              <input className="input mt-1" defaultValue="newjabber" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-300">Email</label>
              <input type="email" className="input mt-1" defaultValue="newjabber@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-ink-300">Bio</label>
              <textarea
                rows={3}
                className="input mt-1 resize-none"
                defaultValue="Just started boxing 3 months ago. Here for advice, gear tips, and live event chaos."
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-300">Flair</label>
              <select className="input mt-1" defaultValue="Beginner">
                <option>Beginner</option>
                <option>Boxer</option>
                <option>MMA Fan</option>
                <option>BJJ Practitioner</option>
                <option>Muay Thai</option>
                <option>Coach</option>
                <option>Amateur Fighter</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-300">Experience level</label>
              <select className="input mt-1" defaultValue="Beginner">
                <option>Fan only</option>
                <option>Beginner</option>
                <option>Active trainee</option>
                <option>Amateur competitor</option>
                <option>Coach</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-ink-300">Location (optional)</label>
              <input className="input mt-1" defaultValue="Brooklyn, NY" />
            </div>
          </div>
          <button className="btn-primary mt-5">Save changes</button>
        </section>

        {/* Password */}
        <section id="password" className="card p-6">
          <h2 className="heading-display text-xl text-white">Password</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-ink-300">Current password</label>
              <input type="password" className="input mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-300">New password</label>
              <input type="password" className="input mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-300">Confirm new password</label>
              <input type="password" className="input mt-1" />
            </div>
          </div>
          <button className="btn-primary mt-5">Update password</button>
        </section>

        {/* Notifications */}
        <section id="notifications" className="card p-6">
          <h2 className="heading-display text-xl text-white">Notifications</h2>
          <div className="mt-5 space-y-3 text-sm">
            {[
              { l: "Replies to my posts", d: "When someone replies to your forum thread or comment." },
              { l: "Live event alerts", d: "When a major event you're following goes live." },
              { l: "Weekly newsletter", d: "The Round 1 newsletter every Sunday." },
              { l: "New gym partners near me", d: "When a verified gym opens in your area." },
              { l: "Mentions", d: "When someone @mentions you in a thread." },
            ].map((n) => (
              <label key={n.l} className="flex items-center justify-between gap-4 rounded-md border border-ink-700 bg-ink-900 p-3">
                <div>
                  <div className="font-semibold text-white">{n.l}</div>
                  <div className="text-xs text-ink-400">{n.d}</div>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-blood-500" />
              </label>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="card p-6">
          <h2 className="heading-display text-xl text-white">Privacy</h2>
          <div className="mt-5 space-y-3 text-sm">
            {[
              { l: "Show my location publicly", d: "Display your city on your profile." },
              { l: "Show my saved items", d: "Anyone can see what blogs/threads you saved." },
              { l: "Allow others to follow me", d: "People can subscribe to your activity." },
            ].map((p) => (
              <label key={p.l} className="flex items-center justify-between gap-4 rounded-md border border-ink-700 bg-ink-900 p-3">
                <div>
                  <div className="font-semibold text-white">{p.l}</div>
                  <div className="text-xs text-ink-400">{p.d}</div>
                </div>
                <input type="checkbox" className="h-4 w-4 accent-blood-500" />
              </label>
            ))}
          </div>
        </section>

        {/* Danger zone */}
        <section id="danger" className="card border-blood-700/40 p-6">
          <h2 className="heading-display text-xl text-blood-500">Danger zone</h2>
          <p className="mt-2 text-sm text-ink-300">
            These actions are permanent and can&apos;t be undone.
          </p>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-4 rounded-md border border-ink-700 bg-ink-900 p-4">
              <div>
                <div className="font-bold text-white">Export my data</div>
                <div className="text-xs text-ink-400">Download all your posts, comments, and account info.</div>
              </div>
              <button className="btn-secondary">Request export</button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-md border border-blood-700/40 bg-blood-700/5 p-4">
              <div>
                <div className="font-bold text-white">Delete my account</div>
                <div className="text-xs text-ink-400">Permanently remove your account and all data.</div>
              </div>
              <button className="btn bg-blood-600 text-white hover:bg-blood-700">
                Delete account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
