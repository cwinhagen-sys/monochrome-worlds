# Monochrome Worlds

Holding site for monochromeworlds.com.

- `/` — the series landing page, where the printed book QR codes point
- `/signup` — the lead-magnet page: email signup for the free bonus pages
- `/review1` — the review page for book one (`/review2` for book two, etc.)

No database and no build steps beyond Next.js. Email signup posts straight to
your email provider's form endpoint (see below).

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

## The email signup

The `/signup` page collects emails and hands them to your email provider,
whose automation delivers the bonus PDF. Set two variables in Vercel:

```
NEXT_PUBLIC_SIGNUP_ENDPOINT      = <your provider's form action URL>
NEXT_PUBLIC_SIGNUP_EMAIL_FIELD   = <the email field name that provider expects>
```

Field name by provider: Kit → `email_address`, Mailchimp → `EMAIL`,
MailerLite → `fields[email]` (default is `email`). Leave the endpoint empty and
the form still works visually and never dead-ends. See `.env.local.example`.

The logo: drop `logo.png` into `public/` and follow `public/README.md` to swap
out the placeholder mark.

## Later

The bonus PDF is delivered by your email provider's automation. Nice-to-haves
still open: the before/after gallery slider, more review routes per book.
