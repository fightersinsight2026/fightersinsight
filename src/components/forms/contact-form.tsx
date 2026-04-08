"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <h3 className="mt-3 heading-display text-xl text-white">Got it.</h3>
        <p className="mt-2 text-ink-300">We&apos;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-ink-300">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input mt-1"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input mt-1"
            placeholder="jane@example.com"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-ink-300">Topic</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input mt-1"
        >
          <option>General</option>
          <option>Partner with us (gym/trainer)</option>
          <option>Advertise / sponsor</option>
          <option>Press inquiry</option>
          <option>Bug report</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-ink-300">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
          className="input mt-1 resize-none"
          placeholder="Tell us what's up…"
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <div className="inline-flex items-center gap-1.5 text-xs text-blood-500">
          <AlertCircle className="h-3 w-3" /> {err}
        </div>
      )}
    </form>
  );
}
