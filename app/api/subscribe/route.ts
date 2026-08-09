import { NextResponse } from "next/server";

/**
 * Server-side signup so we get a REAL answer from MailerLite.
 *
 * The browser can't read a cross-origin form POST (no CORS headers), so a
 * client-only submit always "succeeds" even when nothing is stored. Here we
 * talk to MailerLite from the server, read the response, and report the truth.
 *
 * Preferred: MAILERLITE_API_KEY (Integrations → API → generate a token).
 * Optional:  MAILERLITE_GROUP_ID — the group whose "subscriber joins" trigger
 *            fires the automation that emails the bonus PDF.
 *
 * Fallback: if no API key is set, post to the embedded-form endpoint from the
 * server, where we can still inspect the response instead of guessing.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const API_KEY = process.env.MAILERLITE_API_KEY ?? "";
const GROUP_ID = process.env.MAILERLITE_GROUP_ID ?? "";
const FORM_ENDPOINT = process.env.SIGNUP_FORM_ENDPOINT ?? "";

export async function POST(request: Request) {
  let email = "";
  try {
    const data = await request.json();
    email = typeof data?.email === "string" ? data.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (API_KEY) {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        ...(GROUP_ID ? { groups: [GROUP_ID] } : {}),
      }),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    const detail = await res.text();
    console.error("MailerLite API rejected the signup:", res.status, detail);
    return NextResponse.json(
      { error: "We couldn't add you just now. Please try again." },
      { status: 502 }
    );
  }

  if (FORM_ENDPOINT) {
    const body = new FormData();
    body.append("fields[email]", email);
    body.append("ml-submit", "1");
    body.append("anticsrf", "true");

    const res = await fetch(FORM_ENDPOINT, { method: "POST", body });
    const detail = await res.text();

    // The embedded-form endpoint answers 200 with a JSON body that carries the
    // real outcome, so a 200 alone isn't proof it stored anything.
    if (res.ok && !/"success"\s*:\s*false/.test(detail)) {
      return NextResponse.json({ ok: true });
    }

    console.error("MailerLite form endpoint rejected the signup:", detail);
    return NextResponse.json(
      { error: "We couldn't add you just now. Please try again." },
      { status: 502 }
    );
  }

  console.error(
    "Signup is not configured: set MAILERLITE_API_KEY (or SIGNUP_FORM_ENDPOINT)."
  );
  return NextResponse.json(
    { error: "Signup isn't connected yet. Please try again later." },
    { status: 503 }
  );
}
