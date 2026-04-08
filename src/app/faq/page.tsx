import type { Metadata } from "next";

export const metadata: Metadata = { title: "Frequently asked questions" };

const FAQS = [
  {
    q: "Is The Fighter's Insight free?",
    a: "Yes. Reading blogs, browsing the forum, watching live events, and finding gyms is 100% free. Always will be.",
  },
  {
    q: "Do I need an account?",
    a: "Not to read. You'll need a free account to comment, post on the forum, save things, or join live event chats.",
  },
  {
    q: "I'm a total beginner — is this for me?",
    a: "Especially for you. Start at the Start Training page. We have beginner guides, a 'which sport fits me?' breakdown, and a map of beginner-friendly gyms near you.",
  },
  {
    q: "How do you decide what gear to recommend?",
    a: "We train in it. Multiple sessions, real gym, real conditions. We mark every affiliate link clearly and never hide a bad review.",
  },
  {
    q: "How do gyms get listed?",
    a: "Submit your gym via the Partner page. We verify it before it goes live. Free forever. Featured and Sponsored tiers are optional.",
  },
  {
    q: "How do live event updates work?",
    a: "Our team posts round-by-round during major events. Fans can react live in chat, vote in polls, and submit fan scorecards.",
  },
  {
    q: "Can I write for the blog?",
    a: "Yes. Drop us a note via the Contact page with a writing sample.",
  },
  {
    q: "Is forum advice safe to follow?",
    a: "Forum advice is community-driven and not professional coaching or medical advice. For serious training or injury issues, see a real coach and a real doctor.",
  },
  {
    q: "How is moderation handled?",
    a: "We have active moderators, automated profanity/toxicity filters, slow-mode for big events, and a report button on everything. We protect beginners hard.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="border-b border-ink-800/80">
        <div className="container-fi py-14">
          <div className="eyebrow mb-3">FAQ</div>
          <h1 className="heading-display text-4xl sm:text-5xl text-white">
            Frequently asked <span className="text-blood-500">questions.</span>
          </h1>
        </div>
      </section>

      <section className="container-fi py-12 max-w-3xl">
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="card group p-5">
              <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-white list-none">
                <span>{f.q}</span>
                <span className="text-blood-500 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
