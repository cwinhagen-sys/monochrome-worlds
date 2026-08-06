# Monochrome Worlds

Holding site for monochromeworlds.com. Two routes, both of which the printed QR
codes point at:

- `/` — the series landing page
- `/review1` — the review page for book one (`/review2` for book two, etc.)

No database, no signup, no build steps beyond Next.js. That comes later.

## Run it

```bash
npm install
npm run dev
```

## Deploy

1. Push to a Git repo, import it in Vercel.
2. Vercel → Settings → Domains → add `monochromeworlds.com` and
   `www.monochromeworlds.com`.
3. In Porkbun, add the DNS records Vercel shows you (usually an `A` record on
   the apex and a `CNAME` on `www`). DNS can take a while to propagate.

## The one thing to remember

Every outbound link lives in `lib/links.ts` and reads from environment
variables. The QR codes in the book are printed and permanent — these variables
are how you change where they lead without ever reprinting.

Once book one is live, set both in Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_AMAZON_BOOK_URL   = https://www.amazon.com/dp/YOUR_ASIN
NEXT_PUBLIC_REVIEW_URL_BOOK1  = https://www.amazon.com/review/create-review?asin=YOUR_ASIN
```

Redeploy and both pages switch from their waiting state to real buttons. Until
then they show a short "not live yet" message rather than a broken link, so an
early scanner never hits a dead end.

## Later

Email signup (Supabase), the bonus PDF delivery, the before/after gallery
slider. None of it is needed for the QR codes to work.
