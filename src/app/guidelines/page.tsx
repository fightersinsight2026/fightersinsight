import { InfoPage } from "@/components/info-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Community guidelines" };

export default function GuidelinesPage() {
  return (
    <InfoPage
      eyebrow="Community guidelines"
      title="Train hard. Talk respectfully. Don't be a jerk."
      intro="Short version: trash talk is fine, hate speech is not. Beginners get protected. Mods are watching."
    >
      <h2>The rules</h2>
      <ol className="list-decimal list-inside text-ink-200 space-y-2 mb-6">
        <li><strong className="text-white">Be respectful.</strong> Disagree about fighters all day. Don&apos;t attack other users.</li>
        <li><strong className="text-white">No hate speech.</strong> Racism, sexism, homophobia, transphobia, ableism — instant ban.</li>
        <li><strong className="text-white">No harassment.</strong> Targeted attacks on individuals, doxxing, brigading — banned.</li>
        <li><strong className="text-white">No spam or self-promo.</strong> One promo post per week max, in the right category.</li>
        <li><strong className="text-white">Stay on topic.</strong> Off-topic posts go in Off Topic.</li>
        <li><strong className="text-white">No medical or legal advice.</strong> Talk about your experience, don&apos;t play doctor or lawyer.</li>
        <li><strong className="text-white">Beginners are protected.</strong> If you&apos;re mean to a beginner asking a basic question, expect a warning.</li>
        <li><strong className="text-white">Use the report button.</strong> Don&apos;t feed trolls. Report them and move on.</li>
      </ol>

      <h2>Enforcement</h2>
      <p>
        Most violations get a warning first. Repeated violations or severe ones get a temporary
        suspension. Hate speech and harassment skip the warning and go straight to permanent ban.
      </p>

      <h2>Appeals</h2>
      <p>
        If you believe a moderation action was a mistake, contact us at{" "}
        <a href="mailto:mods@fightersinsight.com">mods@fightersinsight.com</a>. We&apos;ll review.
      </p>

      <h2>Safety reminder</h2>
      <p>
        Anything you read on the forum is community opinion, not professional advice. For serious
        training questions or injuries, talk to a real coach and a real doctor. Train safe.
      </p>
    </InfoPage>
  );
}
