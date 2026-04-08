import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="container-fi grid min-h-[70vh] place-items-center py-14">
      <div className="card w-full max-w-md p-8">
        <div className="eyebrow mb-2">Sign in</div>
        <h1 className="heading-display text-3xl text-white">Welcome back, fighter.</h1>
        <p className="mt-2 text-sm text-ink-300">Log in to comment, post, and follow live events.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-ink-300">Email</label>
            <input type="email" className="input mt-1" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-300">Password</label>
            <input type="password" className="input mt-1" placeholder="••••••••" />
          </div>
          <button className="btn-primary w-full">Sign in</button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
          <div className="h-px flex-1 bg-ink-800" /> or continue with
          <div className="h-px flex-1 bg-ink-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="btn-secondary">Google</button>
          <button className="btn-secondary">Apple</button>
        </div>

        <p className="mt-6 text-center text-sm text-ink-300">
          New here?{" "}
          <Link href="/register" className="font-semibold text-blood-500 hover:text-blood-600">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
