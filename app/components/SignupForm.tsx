"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      // Goes through our own API route, which talks to MailerLite server-side
      // and tells us whether the address was actually stored.
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      onSuccess();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
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
