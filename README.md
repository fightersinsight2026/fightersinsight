# The Fighter's Insight

> Where fight fans think deeper.

A modern, community-driven platform for fighters, combat sports fans, and total beginners.
Fight blogs, live event reactions, community forum, gym/trainer discovery, and gear reviews —
all in one place.

This repo is the **starter implementation + product blueprint**: a real Next.js app with
the full page structure, design system, data models, and architecture in place. Ready to
swap mock data for a live database, plug in auth, and ship.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [Pages & Routes](#pages--routes)
5. [Database Schema](#database-schema)
6. [Auth & Roles](#auth--roles)
7. [Real-Time Live Fight Center](#real-time-live-fight-center)
8. [Gym/Trainer Discovery (Google Maps)](#gymtrainer-discovery)
9. [Forum System](#forum-system)
10. [Admin Dashboard](#admin-dashboard)
11. [Monetization Architecture](#monetization-architecture)
12. [Trust, Safety & Moderation](#trust-safety--moderation)
13. [SEO & Content Strategy](#seo--content-strategy)
14. [MVP vs Future Roadmap](#mvp-vs-future-roadmap)
15. [Risks & Scaling Notes](#risks--scaling-notes)
16. [Deployment](#deployment)

---

## Tech Stack

| Layer            | Choice                                              | Why                                                              |
| ---------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| Framework        | **Next.js 14 (App Router)**                         | RSC for fast SEO blog pages, route handlers, edge ready          |
| Language         | **TypeScript**                                      | Safety across schema, API, UI                                    |
| Styling          | **Tailwind CSS** + custom design tokens             | Fast iteration, consistent system, dark-mode-first               |
| UI components    | Hand-rolled primitives + shadcn/ui style            | No vendor lock-in, easy to brand                                 |
| Database         | **PostgreSQL** (Supabase or Neon)                   | Relations, full-text search, GIS for gym discovery, free tier    |
| ORM              | **Prisma**                                          | Type-safe schema, migrations, fast DX                            |
| Auth             | **NextAuth** (or Supabase Auth / Clerk)             | Email + OAuth, role-based middleware                             |
| Realtime         | **Pusher** or **Supabase Realtime**                 | Live updates + chat without managing WebSocket infra             |
| Maps             | **Google Maps JS API + Places**                     | Best-in-class for gym/trainer discovery                          |
| Media            | **Cloudinary**                                      | Image optimization + on-the-fly transforms                       |
| Hosting          | **Vercel** (web) + Supabase (db)                    | Push-to-deploy, generous free tiers                              |
| Email            | **Resend** or **Postmark**                          | Transactional + newsletter                                       |
| Analytics        | **Vercel Analytics + PostHog**                      | Page views + product analytics for retention                     |

---

## Quick Start

```bash
# 1. Install deps
npm install

# 2. Set up env
cp .env.example .env
# Fill in DATABASE_URL, NEXTAUTH_SECRET, GOOGLE_MAPS_API_KEY, etc.

# 3. Push schema to your Postgres
npm run db:push

# 4. Seed sample data
npm run db:seed

# 5. Run dev server
npm run dev
```

App runs at `http://localhost:3000`.

> **Note:** the current UI reads from `src/lib/mock-data.ts` so you can boot the entire
> frontend without a database. Swap each page's data import for a Prisma query as you go.

---

## Project Structure

```
fighters-insight/
├── prisma/
│   ├── schema.prisma         # Full data model
│   └── seed.ts               # Sample seed data
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout, metadata, header/footer
│   │   ├── page.tsx          # Homepage
│   │   ├── blogs/            # Blog list + [slug] post page
│   │   ├── live/             # Live Fight Center list + [slug] event page
│   │   ├── forum/            # Forum list, thread/[slug], category pages
│   │   ├── start-training/   # Beginner guide + gym discovery
│   │   ├── gear/             # Gear reviews + comparisons
│   │   ├── about/
│   │   ├── sign-in/, register/
│   │   ├── profile/
│   │   └── admin/            # Role-protected dashboard
│   ├── components/
│   │   ├── brand/            # Logo, brand marks
│   │   ├── layout/           # Header, footer
│   │   ├── cards/            # Blog/Event/Thread/Gym/Gear cards
│   │   └── sections/         # Page sections (hero, headers, etc.)
│   └── lib/
│       ├── cn.ts             # Tailwind merge helper
│       ├── format.ts         # Date/number formatting
│       ├── mock-data.ts      # Temporary mock data
│       ├── db.ts             # Prisma client singleton
│       └── auth.ts           # Auth helpers (session/role guards)
├── tailwind.config.ts        # Brand tokens (ink/blood/gold)
├── next.config.mjs
├── tsconfig.json
└── README.md
```

---

## Pages & Routes

| Route                          | Purpose                                                      |
| ------------------------------ | ------------------------------------------------------------ |
| `/`                            | Hero, featured blogs, live events, trending threads, training CTA, gear, newsletter |
| `/blogs`                       | Blog index with categories + search                          |
| `/blogs/[slug]`                | Single post with comments, related posts, sidebar            |
| `/live`                        | Live + upcoming + past events                                |
| `/live/[slug]`                 | Live event hero, fight card, live updates feed, chat, polls, community scorecards |
| `/forum`                       | Trending/new threads + category sidebar + create CTA         |
| `/forum/c/[slug]`              | Category browser                                             |
| `/forum/thread/[slug]`         | Thread with replies, voting, mod actions                     |
| `/start-training`              | Beginner intro, discipline comparison, gym map, trainers, first-week guide |
| `/start-training/gyms/[slug]`  | Gym detail page                                              |
| `/gear`                        | Gear reviews grid + filters + best-of rail                   |
| `/gear/[slug]`                 | Single gear review with pros/cons + affiliate                |
| `/about`, `/contact`, `/faq`   | Marketing pages                                              |
| `/sign-in`, `/register`        | Auth                                                         |
| `/profile`                     | User dashboard (badges, saved, activity)                     |
| `/admin/*`                     | Role-protected dashboard                                     |

---

## Database Schema

See `prisma/schema.prisma` for the full source of truth. Highlights:

- **User** — auth, roles (`GUEST | FAN | PARTNER | MODERATOR | ADMIN`), experience level, location, favorite sports/fighters, badges, reputation.
- **BlogPost / BlogComment** — drafts, scheduling, SEO fields, threaded comments.
- **LiveEvent / FightCardBout / LiveUpdate / LiveComment / LivePoll** — events with full card, timestamped updates, real-time chat, polls.
- **ForumCategory / ForumThread / ForumReply / Vote** — Reddit-style forum with voting and threaded replies.
- **GymListing / TrainerProfile** — geo-indexed (lat/lng) listings with partner status, beginner-friendly flags, photo galleries.
- **GearReview** — categorized reviews with pros/cons, ratings, affiliate links, recommended level.
- **Bookmark / Report / NewsletterSubscriber** — user-saved items, moderation queue, email list.

Notable design choices:

- **Soft moderation by default** — comments use an `isHidden` flag rather than hard delete, so mods can revert and audit actions.
- **Vote model is shared** — currently scoped to forum threads but the table can grow to cover comments and replies without schema churn.
- **Bookmarks are polymorphic** — one table indexes any item type via `(itemType, itemId)` to avoid N tables of bookmarks.
- **PartnerStatus enum** — clean separation between organic listings, claimed listings, verified, featured, and paid sponsored — avoids ad-hoc booleans.

---

## Auth & Roles

```
GUEST       → browse public blog/forum/event/gym/gear pages
FAN         → comment, post, vote, bookmark, score events
PARTNER     → manage own gym/trainer profile (after approval)
MODERATOR   → forum mod actions, hide/delete, suspend
ADMIN       → full content + analytics + user management
```

Implementation pattern:

- `src/lib/auth.ts` exposes `getSession`, `requireUser`, `requireRole(roles)`.
- App Router uses `middleware.ts` (to be added) for `/admin/*` and `/profile/*` route protection.
- Server actions and API routes call `requireRole(["ADMIN"])` etc. before mutating data.
- Recommended provider: **NextAuth** with email + Google + Apple OAuth. Sessions stored in DB via the Prisma adapter.

---

## Real-Time Live Fight Center

The single most differentiating feature.

**Architecture:**

```
Admin posts a LiveUpdate ──┐
                            │
                            ▼
                  ┌──────────────────┐
                  │ Next.js API       │
                  │ POST /api/live/.. │
                  └──────────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        Postgres      Pusher/Realtime   Edge cache invalidate
       (audit log)    channel: event-X
                            │
                            ▼
                Connected clients (browsers)
                — append to update feed
                — animate live indicator
```

**Channels:**

- `event-{id}-updates` — round-by-round updates posted by admins
- `event-{id}-chat` — fan chat messages
- `event-{id}-polls` — poll vote tallies

**Why this stack:**

- Pusher / Supabase Realtime gives us hosted WebSocket fan-out at thousands of concurrent users without managing infra.
- Postgres remains the source of truth — Realtime is a delivery channel, not the data store.
- Slow mode + rate limit + word filters happen in the API layer before broadcasting.

**Scaling concerns:**

- Mega events (UFC PPV) can hit 50k+ concurrent. Use sharded channels per region or fall back to polling + ISR for the update feed if WebSocket connection counts get expensive.
- Chat moderation must be aggressive: server-side profanity filter, slow mode toggle, "trusted user" tier that bypasses slow mode after positive history.

---

## Gym/Trainer Discovery

**Stack:** Google Maps JS API + Places + a Postgres + PostGIS extension on Supabase (or just lat/lng + bounding-box queries).

**Flow:**

1. User lands on `/start-training`, types a city/zip OR allows geolocation.
2. Frontend converts location → lat/lng (Places autocomplete or HTML5 geolocation).
3. Server queries `GymListing` where `lat/lng` is within bounding box of viewport, sorted by `featured DESC, partnerStatus DESC, distance ASC, rating DESC`.
4. Results render as cards + map pins simultaneously. Filters (discipline, price, beginner-friendly) re-query.
5. Sponsored partners get a clear "Partner" chip — never silently re-ordered without disclosure.

**Partner ranking rules:**

```
1. Sponsored partner within radius
2. Verified partner within radius
3. Organic high-rated within radius
4. Organic rest
```

Sponsored slots are capped (max 1 per result page) so the experience stays trustworthy.

---

## Forum System

**Reddit-meets-fight-board** with combat-sports-specific touches:

- **User flair** (Boxer, MMA Fan, BJJ Practitioner, Coach, Beginner, etc.) — surfaces credibility.
- **Thread tags** (Advice, Debate, Breaking News, Technique, Beginner, Gear, Gym Review).
- **Thread types** — Standard, Poll, Advice, Q&A, Fight Breakdown — with type-specific UI affordances (e.g. Advice threads auto-show the safety disclaimer; Breakdown threads support embedded timestamped video).
- **Voting** — single `Vote` table scoped to a thread + user (uniqueness constraint).
- **Sort modes** — Hot, New, Top — server-side computed, cached at the edge for 30s on hot lists.
- **Beginner protection** — threads tagged `Beginner` get extra moderation weight; replies from accounts < 7 days old are auto-flagged for review.

---

## Admin Dashboard

`/admin/*` is wrapped in a layout that requires `role IN (ADMIN, MODERATOR)`.

**Sections:**

1. **Overview** — KPIs (page views, active users, comments, live events, trending blog), top partner clicks, top converting affiliate links.
2. **Content Management** — blog editor with rich text, draft/publish, scheduling, SEO fields.
3. **Live Event Management** — create event, build fight card, post live updates with type tagging (update / knockdown / scorecard / result / bonus), moderate live chat in-place.
4. **Forum Moderation** — reports queue, hide/delete/lock/pin, ban/suspend users.
5. **Partner Listings** — review submissions, approve, mark featured/sponsored, edit details.
6. **Gear Content** — manage reviews, affiliate links, featured products.
7. **Analytics** — drill-down on most read posts, engagement, partner conversion.

The admin shell layout is in `src/app/admin/layout.tsx` — drop new sections into `src/app/admin/<section>/page.tsx` and they show up in the sidebar.

---

## Monetization Architecture

Built into the data model from day one — not bolted on later.

| Stream               | Where                                                     | Data hook                        |
| -------------------- | --------------------------------------------------------- | -------------------------------- |
| Sponsored gym/trainer | Start Training listings + featured map pins              | `GymListing.partnerStatus`       |
| Affiliate gear        | Gear review pages + best-of guides                       | `GearReview.affiliateLink`       |
| Display ads           | Blog and forum slots (header banner, in-feed)            | Slot components with feature flag |
| Premium membership    | Premium picks, ad-free mode, exclusive breakdowns        | `User.role` + entitlements table (future) |
| Sponsored newsletter  | Round 1 newsletter weekly                                | Resend campaign tags             |
| Featured forum threads | Promoted threads marked clearly                          | `ForumThread.pinned` + sponsor flag (future) |

The platform launches monetization-free — earn the audience first. Revenue switches flip on per-section once retention is healthy.

---

## Trust, Safety & Moderation

- **Anti-spam** — rate limit per IP + per user, link domain allowlist, Akismet-style filter on first 10 posts of new accounts.
- **Reports** — every comment, thread, listing, and user has a report button → `Report` table → moderation queue.
- **Safety disclaimers** — Advice/injury threads auto-render a banner: "Forum advice is not professional coaching or medical advice. See a real coach."
- **Profanity / hate filter** — server-side wordlist + perspective-style toxicity score before publish; toxic content goes to mod queue, not live.
- **Slow mode + ban tools** — admins can enable slow mode per live event; mods can suspend users with duration + reason.
- **New-account protection** — first 7 days = limited posting, no DMs, replies under beginner threads auto-reviewed.
- **Beginner safe space** — `Start Training` and `Beginner` forum sections have stricter mod rules; hostile replies are removed faster.

---

## SEO & Content Strategy

- Each public page sets per-route `metadata` (title, description, OG tags).
- Blog routes are statically generated where possible (`generateStaticParams`) and revalidated on publish.
- URLs are slug-based (`/blogs/topuria-vs-holloway-breakdown`), human-readable, and stable.
- `sitemap.ts` and `robots.ts` to be added next.
- Content opportunities baked into the blog category enum: Beginner Guides, Predictions, Gear Reviews, Gym Reviews — every one of those is a long-tail SEO play.

---

## MVP vs Future Roadmap

**MVP (this repo):**

- ✅ Homepage
- ✅ Blog system (UI + schema + admin plan)
- ✅ Live event pages with admin updates + fan reactions
- ✅ Forum with categories and threads
- ✅ Start Training page with map preview + gym/trainer cards
- ✅ Gear reviews
- ✅ Auth + profile pages (UI scaffolded; wire NextAuth next)
- ✅ Admin dashboard scaffold

**Next:**

1. Wire auth (NextAuth + Prisma adapter)
2. Connect Postgres + replace mock-data imports with Prisma queries
3. Wire Pusher/Supabase Realtime for live updates + chat
4. Google Maps integration on Start Training
5. Cloudinary uploads for blog cover images and gym galleries
6. Admin blog editor (TipTap or Plate)
7. Email newsletter via Resend

**Future:**

- Push notifications for live events (web push + native app)
- Mobile app (React Native or Expo, sharing the API layer)
- DMs between users
- Paid memberships + premium picks
- Video content + uploaded technique library by trainers
- Coach marketplace booking with payments
- AI quiz: "Which combat sport fits you?"
- Fighter database integration (Sherdog/Tapology partnership)

---

## Risks & Scaling Notes

| Risk                                       | Mitigation                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| Big-event traffic spikes (UFC PPV nights)  | ISR + CDN for marketing pages, Realtime for live feed only              |
| Forum becoming toxic                       | Strict early-account rules, beginner-zone shielding, fast mod queue    |
| Affiliate trust erosion                    | Disclosure on every page, "we trained in this" rule, never hide a bad review |
| Partner program looking pay-to-win         | Cap sponsored slots, always badge sponsored, organic still ranked by quality |
| Scaling chat (50k+ concurrent on PPV night) | Sharded Pusher channels per region; fallback to polling for older devices |
| Beginner injury liability                  | Disclaimers, no medical advice, push users to certified coaches         |
| Spam gym/trainer submissions               | All listings require admin approval before going live                   |

---

## Deployment

**Recommended:**

1. Push the repo to GitHub.
2. Connect to **Vercel** — auto-deploys on every push to `main`.
3. Provision **Supabase** (Postgres + Auth + Realtime + Storage) — free tier handles MVP traffic.
4. Set env vars in Vercel project dashboard (see `.env.example`).
5. Run `npx prisma db push` once to initialize the schema.
6. Add a `cron.yaml` (Vercel Cron) for scheduled blog publishing + newsletter sends.

**Domains:** point `fightersinsight.com` at Vercel. Add `www` redirect.

---

## License & credits

Built with ❤️ for fight fans. Independent, no promotional overlords, no recycled press releases.

Train safe.
