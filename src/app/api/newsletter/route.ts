import { NextResponse } from "next/server";

// Simple email shape check. Replace with zod if you grow this.
function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, source } = body as { email?: string; source?: string };

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // TODO: persist to NewsletterSubscriber via Prisma + send welcome email via Resend.
    // For now we just log so the form works end-to-end in dev.
    console.log("[newsletter] subscribe", { email, source: source ?? "unknown" });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
