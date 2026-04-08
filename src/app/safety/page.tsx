import { InfoPage } from "@/components/info-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Safety" };

export default function SafetyPage() {
  return (
    <InfoPage
      eyebrow="Safety"
      title="Train smart. Train hard. Stay healthy."
      intro="Combat sports are amazing but they're also physical. Here's how to do it right."
    >
      <h2>Before your first class</h2>
      <ul className="list-disc list-inside text-ink-200 space-y-1.5 mb-6">
        <li>Talk to a doctor if you have any cardiac, joint, or neurological issues.</li>
        <li>Get a basic mouthguard. Even for fundamentals classes.</li>
        <li>Eat 1–2 hours before class. Don&apos;t roll or spar on an empty stomach.</li>
        <li>Hydrate before, during, and after.</li>
      </ul>

      <h2>In class</h2>
      <ul className="list-disc list-inside text-ink-200 space-y-1.5 mb-6">
        <li>Tap early and often. Tapping is learning, not losing.</li>
        <li>Communicate with your training partner. If something hurts, say so.</li>
        <li>You set the intensity. There&apos;s no medal for going hard against a beginner.</li>
        <li>Listen to your coach. They&apos;re right even when you don&apos;t want them to be.</li>
      </ul>

      <h2>Concussions</h2>
      <p>
        If you take a hard shot to the head and feel dizzy, nauseated, confused, or have vision
        changes — stop training immediately. Sit out. Tell your coach. See a doctor. Don&apos;t spar
        again until cleared. We are not joking about this. Repeated concussions are no joke.
      </p>

      <h2>Injuries</h2>
      <p>
        Tweaks happen. Real injuries need real medical attention — not forum advice. If something
        feels seriously wrong, get it looked at by a sports medicine doctor or physical therapist.
      </p>

      <h2>Mental health</h2>
      <p>
        Combat sports are mentally intense. If you&apos;re struggling, talk to someone — a friend,
        a coach, a therapist. You can be tough as nails and still need help. Both are true.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Nothing on this site is medical advice. If you&apos;re injured, see a doctor. If you&apos;re
        in crisis, call your local emergency line. We&apos;re a fight site, not a hospital.
      </p>
    </InfoPage>
  );
}
