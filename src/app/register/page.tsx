import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <div className="container-fi grid min-h-[70vh] place-items-center py-14">
      <div className="card w-full max-w-md p-8">
        <div className="eyebrow mb-2">Create account</div>
        <h1 className="heading-display text-3xl text-white">Join the community.</h1>
        <p className="mt-2 text-sm text-ink-300">Free forever. Beginners welcome.</p>

        <form className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-ink-300">Username</label>
              <input className="input mt-1" placeholder="newjabber" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-300">Flair</label>
              <select className="input mt-1">
                <option>Beginner</option>
                <option>Boxer</option>
                <option>MMA Fan</option>
                <option>BJJ Practitioner</option>
                <option>Muay Thai</option>
                <option>Coach</option>
                <option>Amateur Fighter</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-300">Email</label>
            <input type="email" className="input mt-1" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-300">Password</label>
            <input type="password" className="input mt-1" placeholder="••••••••" />
          </div>
          <label className="flex items-center gap-2 text-xs text-ink-300">
            <input type="checkbox" /> I agree to the{" "}
            <Link href="/terms" className="text-blood-500">terms</Link> and{" "}
            <Link href="/guidelines" className="text-blood-500">community guidelines</Link>.
          </label>
          <button className="btn-primary w-full">Create account</button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-300">
          Already a member?{" "}
          <Link href="/sign-in" className="font-semibold text-blood-500 hover:text-blood-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
