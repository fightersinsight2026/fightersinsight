"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterForm({
  variant = "stack",
  source,
}: {
  variant?: "stack" | "inline";
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("ok");
      setMessage("You're in. First email drops Sunday.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
        <CheckCircle2 className="h-4 w-4" />
        {message}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        variant === "inline"
          ? "flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          : "flex max-w-sm gap-2"
      }
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className={variant === "inline" ? "input max-w-sm" : "input"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={variant === "inline" ? "btn-primary w-full sm:w-auto" : "btn-primary shrink-0"}
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <div className="inline-flex items-center gap-1.5 text-xs text-blood-500">
          <AlertCircle className="h-3 w-3" /> {message}
        </div>
      )}
    </form>
  );
}
