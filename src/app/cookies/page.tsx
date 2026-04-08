import { InfoPage } from "@/components/info-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie policy" };

export default function CookiesPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Cookie policy"
      intro="What cookies we use and why."
    >
      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help us
        keep you logged in, remember preferences, and understand how the site is used.
      </p>

      <h2>How we use them</h2>
      <ul className="list-disc list-inside text-ink-200 space-y-1.5 mb-6">
        <li><strong className="text-white">Essential:</strong> auth sessions, CSRF protection. These are required.</li>
        <li><strong className="text-white">Preferences:</strong> theme, layout, location preference.</li>
        <li><strong className="text-white">Analytics:</strong> anonymized usage data via Vercel Analytics + PostHog.</li>
      </ul>

      <h2>Opting out</h2>
      <p>
        You can disable non-essential cookies in your browser settings. Some features (like staying
        logged in) require essential cookies.
      </p>
    </InfoPage>
  );
}
