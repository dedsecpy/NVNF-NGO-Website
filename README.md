# New Vision Nepal Foundation

Full-stack NGO website built with Next.js 14, Sanity CMS, Supabase, and Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **CMS:** Sanity.io
- **Database:** Supabase (donations, contacts)
- **Auth:** NextAuth.js (admin-only)
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

**Windows PowerShell:** If you see `npm.ps1 cannot be loaded`, use either:

```powershell
# Option A — use .cmd shim (recommended)
.\install.cmd

# Option B — call npm.cmd directly
npm.cmd install --legacy-peer-deps

# Option C — bypass for this terminal session only
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install --legacy-peer-deps
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in values.

Generate admin password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
```

In `.env.local`, escape every `$` in the hash with a backslash (e.g. `\$2b\$12\$...`) so Next.js does not corrupt it.

### 3. Run Supabase migration

Apply `supabase/migrations/001_init.sql` in your Supabase SQL editor.

### 4. Start development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

**Note:** Without Sanity credentials, the site uses built-in fallback content.

## Admin Access

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in `.env.local`
2. Visit `/admin/login`
3. After login, access Sanity Studio at `/admin/studio`

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.example`
4. Deploy
