import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, MessageSquare, Handshake } from "lucide-react";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">Contact</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white">
            Talk to <span className="text-blood-500">a real human.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Press, partnerships, gym submissions, or just want to say hi — drop a note. We read
            everything.
          </p>
        </div>
      </section>

      <section className="container-fi grid gap-8 py-12 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />

        <aside className="space-y-4">
          {[
            {
              icon: Mail,
              title: "General",
              body: "hello@fightersinsight.com",
            },
            {
              icon: Handshake,
              title: "Partnerships",
              body: "partners@fightersinsight.com",
            },
            {
              icon: MessageSquare,
              title: "Press",
              body: "press@fightersinsight.com",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="card p-5">
                <Icon className="h-5 w-5 text-blood-500" />
                <div className="mt-3 font-bold text-white">{c.title}</div>
                <div className="text-sm text-ink-300">{c.body}</div>
              </div>
            );
          })}
        </aside>
      </section>
    </>
  );
}
