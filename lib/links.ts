export const AMAZON_BOOK_URL = process.env.NEXT_PUBLIC_AMAZON_BOOK_URL ?? "";

export const REVIEW_URL_BOOK1 = process.env.NEXT_PUBLIC_REVIEW_URL_BOOK1 ?? "";

// Email signup is handled server-side in app/api/subscribe/route.ts, so its
// credentials stay out of the browser. See .env.local.example.
