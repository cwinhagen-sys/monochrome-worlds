# Monochrome Worlds

Holding site for monochromeworlds.com.

- `/` — the landing page: email signup for the free bonus pages (lead magnet)
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

The landing page posts to `/api/subscribe`, which talks to MailerLite from the
server. That matters: a browser can't read a cross-origin form POST, so a
client-only submit reports success even when nothing was stored. Going through
the server means a failed signup shows a real error instead of a fake "Sent!".

Set these in Vercel → Settings → Environment Variables (no `NEXT_PUBLIC_`
prefix — the token must stay server-side), then redeploy:

```
MAILERLITE_API_KEY    = <MailerLite → Integrations → API → generate a token>
MAILERLITE_GROUP_ID   = <the group the subscriber should join>
```

Point your MailerLite automation's "when subscriber joins group" trigger at
that group; the automation is what emails the bonus PDF. If double opt-in is
on, subscribers get a confirmation email first and the automation only fires
after they confirm.

No API token? Set `SIGNUP_FORM_ENDPOINT` to the embedded form's `action` URL
(MailerLite → your form → Embed → HTML) instead. Until one of them is set the
form returns a clear "not connected yet" error rather than pretending.

The logo: drop `logo.png` into `public/` and follow `public/README.md` to swap
out the placeholder mark.

## Later

The bonus PDF is delivered by your email provider's automation. Nice-to-haves
still open: the before/after gallery slider, more review routes per book.
