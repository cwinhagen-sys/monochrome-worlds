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

// Bumped whenever this file changes, so GET tells us which build is live.
const VERSION = "2026-08-09-groupfix";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const API_KEY = process.env.MAILERLITE_API_KEY ?? "";
const FORM_ENDPOINT = process.env.SIGNUP_FORM_ENDPOINT ?? "";

/**
 * The group id is read off a MailerLite URL, so it tends to arrive with the
 * surrounding query string attached ("...&group=123"). Pull the id out rather
 * than sending the whole thing, which MailerLite rejects with a 422.
 */
function normalizeGroupId(raw: string): string {
  const value = raw.trim();
  const fromQuery = value.match(/[?&]group=(\d+)/);
  if (fromQuery) return fromQuery[1];
  return /^\d+$/.test(value) ? value : "";
}

const GROUP_ID = normalizeGroupId(process.env.MAILERLITE_GROUP_ID ?? "");

/**
 * Diagnostics. Open /api/subscribe in a browser:
 *   404              → this build isn't deployed yet (redeploy needed)
 *   hasApiKey false  → Vercel env var missing, or set after the last deploy
 * Only booleans and shapes are reported — never the token itself.
 */
export async function GET(request: Request) {
  const base = {
    version: VERSION,
    hasApiKey: Boolean(API_KEY),
    apiKeyLength: API_KEY.length,
    apiKeyLooksLikeMailerLite: API_KEY.startsWith("ey"),
    hasGroupId: Boolean(GROUP_ID),
    hasFormEndpoint: Boolean(FORM_ENDPOINT),
  };

  // /api/subscribe?groups=1 — asks MailerLite which groups actually exist and
  // whether MAILERLITE_GROUP_ID is one of them. A signup returning 422 is
  // almost always a group id that doesn't match any real group.
  if (new URL(request.url).searchParams.get("groups") !== "1" || !API_KEY) {
    return NextResponse.json(base);
  }

  const res = await fetch("https://connect.mailerlite.com/api/groups?limit=50", {
    headers: { Authorization: `Bearer ${API_KEY}`, Accept: "application/json" },
  });

  if (!res.ok) {
    return NextResponse.json({
      ...base,
      groupsError: `MailerLite returned ${res.status} when listing groups.`,
    });
  }

  const payload = await res.json();
  const groups: Array<{ id: string; name: string }> = (payload?.data ?? []).map(
    (g: { id: string; name: string }) => ({ id: String(g.id), name: g.name })
  );

  return NextResponse.json({
    ...base,
    configuredGroupId: GROUP_ID,
    configuredGroupMatches: groups.some((g) => g.id === GROUP_ID),
    configuredGroupName:
      groups.find((g) => g.id === GROUP_ID)?.name ?? "(no group with that id)",
    yourGroups: groups,
  });
}

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

    const detail = (await res.text()).slice(0, 300);
    console.error("MailerLite API rejected the signup:", res.status, detail);
    return NextResponse.json(
      {
        error:
          res.status === 401
            ? "Signup key was rejected (401). Check MAILERLITE_API_KEY."
            : res.status === 422
              ? "MailerLite rejected the data (422) — MAILERLITE_GROUP_ID likely doesn't match a real group. Check /api/subscribe?groups=1."
              : `MailerLite said ${res.status}. Please try again.`,
        status: res.status,
        detail,
      },
      { status: 502 }
    );
  }

  if (FORM_ENDPOINT) {
    const body = new FormData();
    body.append("fields[email]", email);
    body.append("ml-submit", "1");
    body.append("anticsrf", "true");

    const res = await fetch(FORM_ENDPOINT, { method: "POST", body });
    const detail = (await res.text()).slice(0, 300);

    // The embedded-form endpoint answers 200 with a JSON body that carries the
    // real outcome, so a 200 alone isn't proof it stored anything.
    if (res.ok && !/"success"\s*:\s*false/.test(detail)) {
      return NextResponse.json({ ok: true });
    }

    console.error("MailerLite form endpoint rejected the signup:", detail);
    return NextResponse.json(
      { error: "We couldn't add you just now. Please try again.", detail },
      { status: 502 }
    );
  }

  console.error(
    "Signup is not configured: set MAILERLITE_API_KEY (or SIGNUP_FORM_ENDPOINT)."
  );
  return NextResponse.json(
    { error: "Signup isn't connected yet (no API key on the server)." },
    { status: 503 }
  );
}
