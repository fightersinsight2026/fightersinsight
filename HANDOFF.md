# Project Handoff — The Fighter's Insight

> **For the next Claude Code session.** Read this file first. Everything you need to continue building is in here.

---

## What this project is

**The Fighter's Insight** — a modern, community-driven web platform for combat sports fans, fighters, and total beginners. Think: fight blog + live event companion + Reddit-style forum + gym/trainer discovery + gear reviews, all in one place.

The platform is being built **for a friend** of the project owner. The owner is non-technical and wants to be able to keep making changes via Claude Code chat (no Terminal). The goal is a real, monetization-ready product — not a static mockup.

The brand voice: **bold, clean, modern, fight-culture inspired, serious but welcoming.** Built for both hardcore fans and total beginners.

---

## Where we are right now

The MVP scaffold is **already built**. It boots end-to-end on mock data with no database required. Every page renders, every link works, every form is wired to a real API route.

### Tech stack (decided, do not change without reason)

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** with a custom dark-mode-first design system (`ink`/`blood`/`gold` tokens — see `tailwind.config.ts`)
- **Prisma** + PostgreSQL (Supabase target) — schema written, not yet wired to UI
- **Mock data layer** at `src/lib/mock-data.ts` — every page imports from here so the app boots without a DB
- Future: NextAuth (auth), Pusher or Supabase Realtime (live events), Google Maps (gym finder), Cloudinary (images), Vercel (hosting)

### What's done

- ✅ Full Prisma schema (`prisma/schema.prisma`) — User, BlogPost, BlogComment, LiveEvent, FightCardBout, LiveUpdate, LiveComment, LivePoll, ForumCategory, ForumThread, ForumReply, Vote, GymListing, TrainerProfile, GearReview, Bookmark, Report, NewsletterSubscriber, with all enums
- ✅ Seed file (`prisma/seed.ts`) wired to the schema
- ✅ Design system in `tailwind.config.ts` + `src/app/globals.css`
- ✅ Site header, footer, logo (`src/components/layout/`, `src/components/brand/`)
- ✅ Reusable card primitives (`src/components/cards/`): blog, event, thread, gym, gear
- ✅ **Homepage** (`/`) — hero, featured blogs, live events, trending threads, training CTA, gear, newsletter
- ✅ **Blogs** — list (`/blogs`) + single post with comments, sidebar, related (`/blogs/[slug]`)
- ✅ **Live Fight Center** — list (`/live`) + single event (`/live/[slug]`) with live update feed, fight card, live chat, polls, community scorecards
- ✅ **Forum** — list (`/forum`) + thread (`/forum/thread/[slug]`) with voting, replies, mod actions
- ✅ **Start Training** (`/start-training`) — beginner intro, discipline guide, gym map preview (placeholder), trainer cards, first-week checklist
- ✅ **Gear Reviews** (`/gear`) — best-of rail + grid + filters
- ✅ **About** (`/about`)
- ✅ **Auth pages** — sign-in, register (UI only, no backend wired)
- ✅ **Profile** (`/profile`) — badges, activity, saved
- ✅ **Admin shell** — layout (`/admin/layout.tsx`) + overview dashboard (`/admin/page.tsx`)
- ✅ **All footer pages**: contact (with working form), partner (with pricing tiers), advertise, faq, guidelines, safety, privacy, terms, cookies, report
- ✅ **Working forms**: newsletter (`/api/newsletter`) and contact (`/api/contact`) — both POST to real Next.js route handlers
- ✅ **SEO**: per-route metadata, `sitemap.ts`, `robots.ts`, dynamic favicon (`icon.tsx`), open graph image (`opengraph-image.tsx`)
- ✅ **404 page** (`not-found.tsx`)
- ✅ Two markdown docs: `README.md` (architecture blueprint) and `SETUP.md` (Mac setup for non-developers)

### What's NOT done yet (the next steps)

In rough priority:

1. **Wire NextAuth** with Prisma adapter so sign-up/sign-in actually works. Stub is in `src/lib/auth.ts`.
2. **Connect Postgres** via Supabase. Run `npm run db:push && npm run db:seed`. Then **swap mock-data imports for real Prisma queries** one page at a time.
3. **Real Google Maps** on the Start Training page. Currently a styled placeholder with fake pins. Replace with `@react-google-maps/api` or `@vis.gl/react-google-maps`. Env var: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
4. **Real-time live event feed** — Supabase Realtime or Pusher. Channels: `event-{id}-updates`, `event-{id}-chat`, `event-{id}-polls`. The UI in `src/app/live/[slug]/page.tsx` is ready to receive — it just needs the subscription wired in a client component.
5. **Admin blog editor** — TipTap or Plate for rich text. Persist via Prisma to `BlogPost`.
6. **Cloudinary uploads** for blog cover images and gym galleries.
7. **Email** — Resend for transactional + newsletter. Hook into `/api/newsletter` route to actually persist + send welcome.
8. **Forum: "create new thread" form** — currently UI only; needs server action + DB insert.
9. **Bookmark + voting server actions** — currently UI only.
10. **Stripe** for partner gym subscriptions (Featured tier — see `src/app/partner/page.tsx`).

---

## File structure (memorize this)

```
fighters-insight/
├── prisma/
│   ├── schema.prisma         # Full data model (source of truth)
│   └── seed.ts               # Sample seed data
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout, metadata, header/footer
│   │   ├── page.tsx          # Homepage
│   │   ├── globals.css       # Tailwind + design system @layer components
│   │   ├── icon.tsx          # Dynamic favicon
│   │   ├── opengraph-image.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   ├── api/
│   │   │   ├── newsletter/route.ts
│   │   │   └── contact/route.ts
│   │   ├── blogs/            # list + [slug]
│   │   ├── live/             # list + [slug]
│   │   ├── forum/            # list + thread/[slug]
│   │   ├── start-training/
│   │   ├── gear/
│   │   ├── about/, contact/, partner/, advertise/, faq/
│   │   ├── guidelines/, safety/, privacy/, terms/, cookies/, report/
│   │   ├── sign-in/, register/, profile/
│   │   └── admin/            # role-protected dashboard
│   ├── components/
│   │   ├── brand/logo.tsx
│   │   ├── layout/site-header.tsx, site-footer.tsx
│   │   ├── cards/blog-card, event-card, thread-row, gym-card, gear-card
│   │   ├── forms/newsletter-form, contact-form (client components)
│   │   ├── sections/section-header.tsx
│   │   └── info-page.tsx     # Reusable wrapper for legal/info pages
│   └── lib/
│       ├── cn.ts             # Tailwind merge helper
│       ├── format.ts         # Date/number formatters (date-fns)
│       ├── mock-data.ts      # ⚠️ Current source of truth for UI — replace with Prisma
│       ├── db.ts             # Prisma client singleton (placeholder ready)
│       └── auth.ts           # Auth helper stub (replace with NextAuth)
├── tailwind.config.ts        # Brand tokens: ink/blood/gold
├── README.md                 # Full architecture blueprint
├── SETUP.md                  # Mac setup for non-devs
└── HANDOFF.md                # This file
```

---

## Design system rules

- **Dark mode only.** Body is `bg-ink-950`. We never go light mode.
- **Brand colors** (in `tailwind.config.ts`):
  - `ink-*` — neutrals from `ink-950` (almost black) → `ink-100` (off-white)
  - `blood-500` (`#e11d2a`) — primary accent. Used sparingly for CTAs, live indicators, key highlights.
  - `gold-500` (`#e0aa3e`) — secondary accent. Used for premium/partner badges, "best of" labels.
- **Typography:** font-display = bold/black tracking-tight for headings. Body is Inter.
- **Component primitives** (defined in `globals.css` as `@layer components`):
  - `.container-fi` — page-width container
  - `.card` — base card with border + shadow
  - `.card-hover` — hover lift effect
  - `.chip`, `.chip-blood`, `.chip-gold` — badges
  - `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-gold` — button variants
  - `.input` — form inputs
  - `.eyebrow` — small uppercase label above headings
  - `.heading-display` — display headline style
  - `.live-dot` — pulsing red dot for "LIVE" status
  - `.prose-fi` — long-form article styling
- **Always import images from `next/image`.** Hosts already allowlisted in `next.config.mjs`: unsplash, cloudinary, our future cdn.
- **Icons:** `lucide-react` exclusively. No emoji unless the user explicitly asks.

---

## How to ship a change (the workflow)

The owner is non-technical and won't use Terminal. The workflow is:

1. Owner says what they want changed
2. You (Claude) edit files in this repo
3. You commit + push to GitHub
4. Vercel auto-deploys (~60 seconds)
5. Live site updates

When committing, follow the existing style — clear, present-tense commit message body explaining the *why*. Always commit at the end of a logical change.

---

## Important constraints

- **Do not break the build.** This repo connects to a live Vercel deployment for a real user. Every push goes live in ~60 seconds. Test mentally before committing.
- **Do not add features that weren't asked for.** No premature abstractions, no speculative refactors.
- **Don't introduce new dependencies casually.** Stick to what's in `package.json` unless adding one is genuinely necessary.
- **The owner is non-technical** — explain in plain English, not jargon. When asking questions, give concrete options instead of open-ended ones.
- **Mock data is currently the source of truth for the UI.** When the database is wired, swap imports from `@/lib/mock-data` to Prisma queries — but only on the page that's being touched, not everywhere at once.
- **Forum/blog advice content should never be medical/coaching advice.** The disclaimer pattern is established in `/safety` and `/guidelines`.

---

## Brand & content guidelines

- Tone: bold, direct, no fluff. Treat both hardcore fans and beginners with respect.
- Never recycle press releases or AI-sounding marketing copy. Every blurb should sound like a real person wrote it.
- Beginners are protected. The product is *especially* welcoming to people who've never trained.
- "Train safe" is the vibe. Combat sports are dangerous; we never glorify recklessness.

---

## Quick reference: how to do common things

**Add a new page:**
Create `src/app/<route>/page.tsx`. Export default function. Add a `Metadata` export. Use `container-fi` for layout.

**Add a new card type:**
Create `src/components/cards/<name>-card.tsx`. Follow the existing card pattern (Link wrapper, image, hover effect).

**Add a new API route:**
Create `src/app/api/<name>/route.ts`. Export `GET`/`POST`. Validate input. Return `NextResponse.json(...)`.

**Add a new field to a model:**
Edit `prisma/schema.prisma`. Run `npm run db:push` (or tell the owner to). Update any seed data.

**Swap a page from mock data to Prisma:**
1. Import `db` from `@/lib/db` instead of mock data
2. Make the page `async`
3. Replace `MOCK_X` with `await db.x.findMany(...)`
4. Test that the shape matches what the components expect

---

## Current production status

- Hosting: **Vercel** (free tier, auto-deploy from GitHub `main` branch)
- Database: **not yet connected** — Supabase planned
- Domain: **not yet purchased** — placeholder is the Vercel URL
- Auth: **not yet wired** — NextAuth planned
- Maps: **placeholder** — Google Maps planned
- Realtime: **placeholder** — Supabase Realtime or Pusher planned

---

## When you (Claude) start working on this project

1. Read this file first.
2. Read `README.md` for the full architecture blueprint.
3. Read `prisma/schema.prisma` to understand the data shape.
4. Read `src/lib/mock-data.ts` to understand what the UI currently expects.
5. Don't ask the owner technical questions. Make sensible defaults and explain decisions in plain English.
6. When the owner asks for something, do it. Don't lecture. Don't add scope. Don't over-engineer.
7. Always commit + push when you finish a change so it goes live.

Welcome to the team. Now go build.
