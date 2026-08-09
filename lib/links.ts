export const AMAZON_BOOK_URL = process.env.NEXT_PUBLIC_AMAZON_BOOK_URL ?? "";

export const REVIEW_URL_BOOK1 = process.env.NEXT_PUBLIC_REVIEW_URL_BOOK1 ?? "";

// --- Email signup (the landing page lead magnet) ---
//
// SIGNUP_ENDPOINT is the form action URL from your email provider. It defaults
// to this MailerLite form's subscribe endpoint (derived from the account/form
// IDs), so signups work in production without any extra config. Override it in
// Vercel with NEXT_PUBLIC_SIGNUP_ENDPOINT if the form ever changes.
//
// SIGNUP_EMAIL_FIELD is the field name the provider expects for the address.
// MailerLite uses "fields[email]".
export const SIGNUP_ENDPOINT =
  process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT ??
  "https://assets.mailerlite.com/jsonp/2564489/forms/195269181885646458/subscribe";

export const SIGNUP_EMAIL_FIELD =
  process.env.NEXT_PUBLIC_SIGNUP_EMAIL_FIELD ?? "fields[email]";
