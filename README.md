# RosaryNest

The website and content admin for [RosaryNest](https://rosarynest.com), a guesthouse in Munnar, Kerala.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router, React 19)
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** via [OpenNext](https://opennext.js.org/cloudflare) — hosting and deploys
- **[D1](https://developers.cloudflare.com/d1/)** (SQLite) via [Drizzle ORM](https://orm.drizzle.team) — content: cottages, experiences, journal posts, FAQs, gallery, site settings
- **[R2](https://developers.cloudflare.com/r2/)** — media storage, served through `/media`
- **[Resend](https://resend.com)** — outbound transactional email for the contact and enquiry forms (Cloudflare's own Email Sending needs a paid Workers plan, so this goes through Resend instead)
- A password-protected `/admin` panel (custom, session-cookie based) for editing site content without touching code

## Getting started

```bash
npm install
```

Local dev needs two sets of environment values:

- **`.env.local`** — `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_ENGINE_URL` (also set as `vars` in `wrangler.jsonc` for production)
- **`.dev.vars`** — secrets for local Wrangler runs: `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`

Set up the local D1 database (generates migrations, applies them, and seeds sample content):

```bash
npm run db:setup
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/app/(site)/    public site routes (cottages, experiences, journal, gallery, contact, ...)
src/app/admin/     content admin panel
src/app/api/       route handlers — content CRUD, contact/enquiry email, auth, media upload
src/db/            Drizzle schema and seed data
src/lib/           shared server/client helpers (content fetching, email templates, metadata, phone/image formatting)
src/components/    shared UI, including src/components/admin/ for the admin panel
src/styles/        global CSS
drizzle/           generated migrations and seed SQL (npm run db:generate / db:seed:gen)
```

Content (cottages, experiences, FAQs, journal posts, gallery captions, site settings) lives in D1 and is edited through `/admin`, not in source — `src/db/seed-data.ts` is only the seed for a fresh database, not the source of truth for production content.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (`next build --webpack`) |
| `npm run preview` | Build and preview via the OpenNext Cloudflare adapter (closer to production than `next dev`) |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Drizzle migrations from `src/db/schema.ts` |
| `npm run db:migrate:local` | Apply migrations to the local D1 database |
| `npm run db:seed:gen` | Regenerate `drizzle/seed.sql` from `src/db/seed-data.ts` |
| `npm run db:seed` | Apply seed SQL to the local D1 database |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` bindings |

To update the **remote/production** D1 database, run the equivalent `wrangler d1 execute rosarynest --remote ...` command directly rather than reseeding — a full reseed would overwrite live content already edited through `/admin`.

## Deploying

```bash
npm run deploy
```

This builds with the OpenNext Cloudflare adapter and deploys the Worker, D1 binding, R2 binding, and static assets together. The Worker serves `rosarynest.com` and `www.rosarynest.com` (redirected to the apex) as custom domains defined in `wrangler.jsonc`.

Secrets (`ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`, etc.) are set on the Worker with `wrangler secret put <NAME>` and are not part of the repo.

Static assets under `/images/*` and `/video/*` are served directly by Cloudflare's Workers Assets binding in production, bypassing the Next.js request handler — cache headers for these live in `public/_headers` (Cloudflare's static-asset headers convention), not in `next.config.ts`'s `headers()`, which only takes effect in local dev.

> **Note:** this project's Next.js version has framework differences from what a general Next.js background might assume — see `AGENTS.md` before making routing or middleware changes. In particular, Next 16's `proxy` convention always compiles to a Node.js runtime, which this OpenNext/Cloudflare setup can't run; any routing-layer logic (redirects, headers) belongs in `next.config.ts`, not `middleware.ts`/`proxy.ts`.
