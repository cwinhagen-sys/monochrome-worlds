/**
 * All outbound links live here so you can change them in one place.
 *
 * Set these in Vercel (Project → Settings → Environment Variables) and you can
 * update where the printed QR codes send people WITHOUT touching the book:
 *
 *   NEXT_PUBLIC_AMAZON_BOOK_URL    the book's detail page
 *   NEXT_PUBLIC_REVIEW_URL_BOOK1   the "write a review" link for book one
 *
 * Leave them empty until the book is live. Both pages handle that state.
 *
 * The review link format, once you have the ASIN:
 *   https://www.amazon.com/review/create-review?asin=YOUR_ASIN
 */

export const AMAZON_BOOK_URL = process.env.NEXT_PUBLIC_AMAZON_BOOK_URL ?? "";

export const REVIEW_URL_BOOK1 =
  process.env.NEXT_PUBLIC_REVIEW_URL_BOOK1 ?? "";
