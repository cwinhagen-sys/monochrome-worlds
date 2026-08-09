export const AMAZON_BOOK_URL = process.env.NEXT_PUBLIC_AMAZON_BOOK_URL ?? "";

export const REVIEW_URL_BOOK1 = process.env.NEXT_PUBLIC_REVIEW_URL_BOOK1 ?? "";

// --- Email signup (the landing page lead magnet) ---
//
// SIGNUP_ENDPOINT is the form action URL from your email provider (Kit,
// Mailchimp, MailerLite, Beehiiv, Brevo …). The form POSTs the email there
// and your provider's automation delivers the bonus PDF.
//
// SIGNUP_EMAIL_FIELD is the field name that provider expects for the address.
// Common values: "email" (default), "email_address" (Kit), "EMAIL" (Mailchimp),
// "fields[email]" (MailerLite).
//
// Until SIGNUP_ENDPOINT is set the form still works visually and never dead-ends.
export const SIGNUP_ENDPOINT = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT ?? "";

export const SIGNUP_EMAIL_FIELD =
  process.env.NEXT_PUBLIC_SIGNUP_EMAIL_FIELD ?? "email";
