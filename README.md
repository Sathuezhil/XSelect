# XSelect

XSelect is a premium shopping discovery site for the United Arab Emirates. Visitors browse a curated catalogue and buying guides, then continue to Amazon.ae. The site does not run a cart or take payment.

The brand name is **XSelect**. The tagline is **Discover More. Shop Smarter.**

## Stack

- Next.js 16 (App Router, Cache Components)
- React 19 and TypeScript
- Tailwind CSS 4
- MongoDB and Mongoose
- NextAuth.js credentials authentication for the admin area
- React Hook Form and Zod
- Lucide icons

## Local setup

1. Install [Node.js 20.9+](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/docs/manual/installation/) (or use MongoDB Atlas).
2. Install dependencies:

```bash
npm install
```

3. Create an environment file:

```bash
copy .env.example .env
```

4. Set `MONGODB_URI`, `NEXTAUTH_SECRET`, `AUTH_SECRET`, and `NEXT_PUBLIC_SITE_URL`.
5. Set `ADMIN_EMAIL` and an `ADMIN_PASSWORD` of at least 12 characters. The seed script refuses a short password. Do not deploy the example values.
6. Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

7. Seed demonstration content:

```bash
npm run seed
```

8. Start the site:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin dashboard is at [http://localhost:3000/admin](http://localhost:3000/admin).

## Demonstration content

Seeded products, prices, specifications, and images are sample content.

- Products are marked **Demo**.
- Images are Unsplash stock photographs, not Amazon product images.
- Links point at Amazon.ae search pages with the tag `xselectdemo-21` unless you set `AMAZON_ASSOCIATE_TAG`.
- A demo tag does not earn commission.
- Public pages do not show a price for demonstration products. A price is shown only when the product is not a demo and the recorded price is less than seven days old. Shoppers are otherwise told to confirm the live price on Amazon.

Replace demo products before using the site commercially. Use images you have rights to, and use affiliate links from your own Amazon Associates account.

## Affiliate behaviour

- Outbound buttons use `target="_blank"` and `rel="sponsored nofollow noopener noreferrer"`.
- `/out/[slug]` checks that the stored URL is `https://amazon.ae` or `https://www.amazon.ae`, increments an internal click count, and redirects.
- Click counts are analytics for editors. They are not commission reports, and a click does not guarantee a commission.
- The site does not publish star ratings, fabricated reviews, countdown timers, or invented discount percentages.

## Admin

Editors can add and edit products, categories, buying guides, newsletter subscribers, and contact messages. Passwords are hashed with bcrypt. Admin routes and mutating APIs require a signed-in admin session. Public forms are rate limited in memory on the server instance.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run seed` | Upsert categories, demo products, guides, and the admin user |

## Deployment

A typical deployment is Vercel plus MongoDB Atlas.

1. Create an Atlas cluster and a database user. Allow the host to connect.
2. Set the environment variables from `.env.example` in the hosting dashboard. Use the Atlas connection string for `MONGODB_URI`.
3. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the public `https` origin.
4. Set a long random `NEXTAUTH_SECRET` (and the same value in `AUTH_SECRET`).
5. Deploy, then run `npm run seed` once from a machine that can reach the database, or create the first records in the admin UI after creating the user directly.
6. Replace the demo catalogue and the associate tag before promoting the site.

The in-memory rate limiter resets when the server process restarts and is not shared across multiple instances. Move it to a shared store if you run more than one server.

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs, Open Graph links, and the sitemap. Set it before the production build.

## Project map

- `src/app/(site)` public pages
- `src/app/admin` editor dashboard
- `src/app/api` route handlers
- `src/models` Mongoose models
- `src/services` database queries
- `src/components` interface
- `src/scripts/seed.ts` demo seed

## Compliance notes for launch

Follow the Amazon Associates Operating Agreement for your locale. Disclose the relationship, which this site does on product pages and at `/affiliate-disclosure`. Do not scrape Amazon. Do not show stale prices or availability. Do not use Amazon trademarks in a way that implies XSelect is Amazon.
