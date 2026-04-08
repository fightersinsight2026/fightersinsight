import { InfoPage } from "@/components/info-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="We collect as little as possible. We don't sell your data. Here's the full breakdown."
    >
      <p>Last updated: April 8, 2026.</p>

      <h2>What we collect</h2>
      <ul className="list-disc list-inside text-ink-200 space-y-1.5 mb-6">
        <li><strong className="text-white">Account info:</strong> email, username, password hash. Optional avatar, bio, location.</li>
        <li><strong className="text-white">Usage data:</strong> pages visited, time on site, interactions — for product analytics. Anonymized where possible.</li>
        <li><strong className="text-white">Content you post:</strong> comments, threads, replies. Public by default.</li>
        <li><strong className="text-white">Cookies:</strong> for session management and analytics. You can opt out via your browser.</li>
      </ul>

      <h2>What we don't do</h2>
      <ul className="list-disc list-inside text-ink-200 space-y-1.5 mb-6">
        <li>Sell your data. Ever.</li>
        <li>Share your email with advertisers.</li>
        <li>Track you across other websites.</li>
      </ul>

      <h2>Third parties</h2>
      <p>
        We use trusted infrastructure providers (hosting, analytics, email, payments). They are
        bound by their own privacy policies and only receive data necessary to provide their
        service.
      </p>

      <h2>Your rights</h2>
      <p>
        You can export or delete your account data anytime from your profile settings, or by
        emailing <a href="mailto:privacy@fightersinsight.com">privacy@fightersinsight.com</a>.
      </p>

      <h2>Kids</h2>
      <p>
        This site is not directed at children under 13. We do not knowingly collect data from
        children.
      </p>

      <h2>Changes</h2>
      <p>
        If we update this policy materially, we&apos;ll notify you in-app and via email.
      </p>
    </InfoPage>
  );
}
