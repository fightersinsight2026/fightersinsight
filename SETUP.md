# Run The Fighter's Insight on a Mac

A non-developer-friendly, copy-paste guide to get the site running on your Mac, then putting it on the internet so anyone can use it.

There are two stages:

1. **Run it locally on your Mac** (so you can preview and develop)
2. **Put it on the internet for free** (so your friend can actually use it)

You don't need to know how to code to follow this. Just paste the commands.

---

## Stage 1 — Run it on your Mac

### Step 1: Open Terminal

Press `Cmd + Space`, type `Terminal`, hit Enter. A black/white text window will open. That's where you'll type the commands.

### Step 2: Install Homebrew (if you don't have it)

Homebrew is the package manager for Mac. It installs everything else.

Paste this into Terminal and press Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It might ask for your Mac password — that's normal. Type it (you won't see the characters, just type and hit Enter).

When it finishes, it will tell you to run two extra commands to add Homebrew to your PATH. Copy and run those exactly as shown — usually something like:

```bash
echo >> ~/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

> If you already have Homebrew, skip this step. Check by running `brew --version`.

### Step 3: Install Node.js

Node is what runs the app.

```bash
brew install node
```

Verify it worked:

```bash
node --version
```

You should see something like `v20.x.x` or higher. If you see a number, you're good.

### Step 4: Install Git (if you don't have it)

```bash
brew install git
```

Verify:

```bash
git --version
```

### Step 5: Get the code

Decide where you want the project to live. The easiest place is your home folder.

```bash
cd ~
git clone https://github.com/amoradi2002/fighters-insight.git
cd fighters-insight
```

### Step 6: Install the app's dependencies

```bash
npm install
```

This will take 1–3 minutes. It downloads all the code libraries the app uses.

> **What if it fails?** Most issues are network-related. Just run `npm install` again.

### Step 7: Set up environment variables

```bash
cp .env.example .env
```

This creates a `.env` file. **For local development you don't need to fill in anything yet** — the app boots with mock data and works without a database. You only need to fill in `.env` later when you're ready to connect a real database, Google Maps, etc.

### Step 8: Run the app

```bash
npm run dev
```

You should see something like:

```
▲ Next.js 14.2.15
- Local:        http://localhost:3000
- Ready in 2.1s
```

Open your browser and go to **http://localhost:3000** — you should see The Fighter's Insight homepage.

To stop the app, click back into Terminal and press `Ctrl + C`.

### Step 9: Make changes (optional)

Open the project folder in any code editor. The free, easy choice is **VS Code**:

```bash
brew install --cask visual-studio-code
code .
```

The app auto-reloads any time you save a file.

---

## Stage 2 — Put it on the internet for free

You'll use **Vercel** (free hosting for Next.js, made by the people who built Next.js) and **Supabase** (free Postgres database). Both have generous free tiers — you won't pay anything to start.

### Step 1: Create a GitHub account

If your friend will be the only user and you're just going to update the code yourself, you need a GitHub account.

Go to [github.com](https://github.com) and sign up. It's free.

### Step 2: Push the code to your own GitHub

In Terminal, from inside the `fighters-insight` folder:

```bash
gh auth login
```

If `gh` isn't installed, run `brew install gh` first.

Then:

```bash
gh repo create fighters-insight --public --source=. --remote=origin --push
```

This creates a new GitHub repo under your account and pushes the code.

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and click "Sign Up". Use "Continue with GitHub" — it's the easiest.
2. Once signed in, click "Add New… → Project".
3. You'll see a list of your GitHub repos. Find `fighters-insight` and click "Import".
4. Vercel auto-detects it's a Next.js app. **Don't change any settings.** Just click "Deploy".
5. Wait 1–2 minutes. When it's done, Vercel gives you a live URL like `fighters-insight.vercel.app`.

**That's it.** Send the URL to your friend.

### Step 4: Add a custom domain (optional)

If you want `fightersinsight.com` instead of `fighters-insight.vercel.app`:

1. Buy the domain from Namecheap, Cloudflare, or Google Domains.
2. In Vercel project → Settings → Domains → Add → enter the domain.
3. Vercel tells you which DNS records to add at your domain registrar. Add them. Done.

### Step 5: Wire up a real database (when you're ready)

Right now the app runs on mock data. When you want users to actually save accounts, post on the forum, etc., you need a real database.

1. Go to [supabase.com](https://supabase.com) → Sign in with GitHub → New Project. Pick a region close to your users. Save the database password somewhere safe.
2. In your Supabase project → Settings → Database → "Connection string" → URI. Copy it. It looks like `postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres`.
3. Back in Vercel → your project → Settings → Environment Variables. Add a variable:
   - Name: `DATABASE_URL`
   - Value: paste the Supabase connection string
4. Locally on your Mac, paste the same value into your `.env` file under `DATABASE_URL=`.
5. Push the schema to Supabase:
   ```bash
   npm run db:push
   ```
6. Seed sample data:
   ```bash
   npm run db:seed
   ```
7. Re-deploy on Vercel (it does this automatically when you push to GitHub, or click "Redeploy" in the dashboard).

### Step 6: Auth (when you're ready)

For sign-up / sign-in to actually work, pick one:

- **Easiest:** Supabase Auth (already comes with your Supabase project).
- **Most flexible:** [NextAuth.js](https://next-auth.js.org) with the Prisma adapter.
- **Most polished UI:** [Clerk](https://clerk.com) — free tier supports plenty.

Wire one up and replace the placeholder logic in `src/lib/auth.ts`.

### Step 7: Google Maps (when you're ready)

For the gym discovery map on the Start Training page:

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a project, enable "Maps JavaScript API" and "Places API".
3. Create an API key and restrict it to your domain.
4. Add it to Vercel + your local `.env` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
5. Plug it into the map placeholder in `src/app/start-training/page.tsx`.

### Step 8: Real-time live events (when you're ready)

For the Live Fight Center to actually push updates in real time:

- **Easiest:** Supabase Realtime (free, comes with your Supabase project).
- **Alternative:** [Pusher](https://pusher.com) free tier (200k messages/day).

Wire it into the live event page so admin updates broadcast to everyone watching.

---

## Pushing updates after the first deploy

Whenever you change the code:

```bash
git add .
git commit -m "what you changed"
git push
```

Vercel auto-deploys within ~60 seconds. Refresh the live URL to see your changes.

---

## Common gotchas

**`command not found: npm`** → You skipped Step 3. Run `brew install node`.

**`Permission denied` on `npm install`** → Don't use `sudo`. Reinstall Node via Homebrew (`brew reinstall node`) and try again.

**`Error: Cannot find module '@prisma/client'`** → Run `npx prisma generate` then `npm run dev` again.

**The page is broken / styles look weird** → Hard refresh your browser: `Cmd + Shift + R`.

**Vercel deploy fails on build** → Open the build log in Vercel. Usually it's a missing env variable or a typo. Read the error — it's usually self-explanatory.

**You broke something locally and want to reset** → `git checkout .` (warning: this throws away unsaved changes).

---

## When you're ready for the iOS app

We'll do this later. For now, the web app is **mobile-responsive** out of the box, so on iPhone Safari it already looks like an app. When you're ready for native iOS:

- Easiest path: wrap the web app in **Capacitor** or **Expo**, ship it to TestFlight in a day.
- Best path: build a native React Native app sharing the same backend (database, auth, API routes).

Either way, the database, auth, and API you build for the web app will all be reused. None of this work goes to waste.

---

## Quick cheat sheet

```bash
# Run locally
npm run dev

# Stop running locally
Ctrl + C  (in Terminal)

# Pull latest changes
git pull

# Push your changes
git add .
git commit -m "your message"
git push

# Reset to a clean state
git checkout .

# Update dependencies
npm install
```

---

## Need help?

- **Next.js docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase docs:** [supabase.com/docs](https://supabase.com/docs)
- **Tailwind docs:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

The README in this repo (`README.md`) has the full technical architecture if you ever want to dive deeper or hand it off to a developer.

Train safe. Ship faster.
