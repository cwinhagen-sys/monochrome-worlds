"use client";

import { useState } from "react";
import { SIGNUP_ENDPOINT, SIGNUP_EMAIL_FIELD } from "@/lib/links";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading" || status === "success") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Not wired to a provider yet — still no dead end, just like the rest of
    // the site. Swap NEXT_PUBLIC_SIGNUP_ENDPOINT in and this becomes real.
    if (!SIGNUP_ENDPOINT) {
      setStatus("success");
      setMessage("You're on the list. Your free pages are on the way.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const body = new FormData();
      body.append(SIGNUP_EMAIL_FIELD, value);
      // Most hosted signup endpoints don't return CORS headers, so we can't
      // read the response — a completed no-cors POST is our success signal.
      await fetch(SIGNUP_ENDPOINT, { method: "POST", mode: "no-cors", body });
      setStatus("success");
      setMessage("Check your inbox — your free pages are on the way.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="signup signup--done" role="status" aria-live="polite">
        <span className="signup-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path
              d="M4 12.5 L10 18.5 L20 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="signup-done-text">{message}</p>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <div className="signup-row">
        <input
          className="signup-input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-label="Email address"
          aria-invalid={status === "error"}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          required
        />
        <button
          className="btn btn-primary signup-btn"
          type="submit"
          disabled={status === "loading"}
          data-loading={status === "loading"}
        >
          <span className="signup-btn-label">Send me the pages</span>
          <span className="signup-spinner" aria-hidden="true" />
        </button>
      </div>
      <p
        className={
          status === "error" ? "signup-note signup-note--error" : "signup-note"
        }
        role={status === "error" ? "alert" : undefined}
      >
        {status === "error"
          ? message
          : "Free PDF, straight to your inbox. No spam — unsubscribe anytime."}
      </p>
    </form>
  );
}
