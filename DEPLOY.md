# Deployment & Seeding Guide

## Vercel Deployment

1. Push repository to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set environment variables from `.env.example`
4. Deploy — `vercel.json` uses `--legacy-peer-deps` for install

## Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Open SQL Editor → run `supabase/migrations/001_init.sql`
3. Copy URL, anon key, and service role key to Vercel env vars

## Sanity Setup

1. Create project at [sanity.io/manage](https://sanity.io/manage)
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_TOKEN`
3. Add CORS origin: `http://localhost:3000` and your Vercel domain
4. Run embedded studio at `/admin/studio` or standalone:

```bash
npm run sanity:dev
```

### Content Seeding

Without Sanity configured, the site uses fallback content in `lib/sanity/fetch.ts`.

To seed Sanity manually:
1. Log into `/admin/studio`
2. Create documents matching schema types in `sanity/schemas/`
3. Publish all documents

Recommended initial content:
- 1 `siteSettings` document
- 5 `problem` documents
- 6 `program` documents
- 4 `donationTier` documents
- 4 `teamMember` documents
- 6 `timelineEvent` documents

## Admin Credentials

```bash
# Generate password hash
node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"

# Generate NextAuth secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `NEXTAUTH_SECRET` in production.

## Analytics

- Vercel Analytics: enabled automatically via `@vercel/analytics`
- Plausible: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to your domain
