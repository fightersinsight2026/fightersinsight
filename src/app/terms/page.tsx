import { InfoPage } from "@/components/info-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of service"
      intro="The plain-English terms for using The Fighter's Insight."
    >
      <p>Last updated: April 8, 2026.</p>

      <h2>1. The basics</h2>
      <p>
        By using The Fighter&apos;s Insight (&ldquo;the Site&rdquo;), you agree to these terms.
        If you don&apos;t agree, please don&apos;t use it.
      </p>

      <h2>2. Your account</h2>
      <p>
        You&apos;re responsible for keeping your password safe. You must be 13 or older to register.
        Don&apos;t impersonate others.
      </p>

      <h2>3. Your content</h2>
      <p>
        You own what you post. By posting, you grant us a non-exclusive license to display and
        distribute it on the platform. You&apos;re responsible for what you post — don&apos;t post
        anything illegal, infringing, or hateful.
      </p>

      <h2>4. Forum & moderation</h2>
      <p>
        We can remove content or suspend accounts that violate our community guidelines. Repeated
        violations result in permanent bans.
      </p>

      <h2>5. Not professional advice</h2>
      <p>
        Content on this site — including blogs, forum posts, gear recommendations, and gym listings
        — is for general information. It is not professional coaching, medical, financial, or
        legal advice. Talk to a real coach, doctor, or professional for important decisions.
      </p>

      <h2>6. Affiliate links</h2>
      <p>
        We may earn a commission on certain product links. We disclose this on our gear pages.
      </p>

      <h2>7. Liability</h2>
      <p>
        We provide the Site &ldquo;as is.&rdquo; We&apos;re not liable for injuries from training,
        decisions made based on Site content, or third-party actions (e.g. partner gyms).
      </p>

      <h2>8. Termination</h2>
      <p>
        We can suspend or terminate accounts that violate these terms. You can delete your account
        anytime.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update these terms. Material changes will be communicated in-app or via email.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions: <a href="mailto:legal@fightersinsight.com">legal@fightersinsight.com</a>
      </p>
    </InfoPage>
  );
}
