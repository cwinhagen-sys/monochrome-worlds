"use client";

import { useState } from "react";
import Logo from "./Logo";
import SignupForm from "./SignupForm";

/**
 * Owns the "did they sign up yet" state so success can replace the whole view.
 * (A fixed overlay rendered inside the form would be trapped by the entrance
 * animations' transforms, which create a containing block for fixed children.)
 */
export default function Landing() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <main className="landing">
      <a className="back-mark" href="/">
        Monochrome Worlds
      </a>
        <section className="landing-card success-card" role="status" aria-live="polite">
          <Logo />
          <h1 className="success-title">Sent! Check your Inbox now.</h1>
          <span className="success-rule" aria-hidden="true" />
        </section>
      </main>
    );
  }

  return (
    <main className="landing">
      <a className="back-mark" href="/">
        Monochrome Worlds
      </a>
      <section className="landing-card">
        <Logo />

        <p className="eyebrow anim" style={{ "--i": 0 } as React.CSSProperties}>
          Free printable coloring pages
        </p>

        <p className="lede anim" style={{ "--i": 1 } as React.CSSProperties}>
          Join the list and I&apos;ll send you a free set of printable pages from
          the series.
        </p>

        <div className="anim signup-wrap" style={{ "--i": 2 } as React.CSSProperties}>
          <SignupForm onSuccess={() => setDone(true)} />
        </div>

        <div className="landing-foot anim" style={{ "--i": 3 } as React.CSSProperties}>
          <span className="footer">Monochrome Worlds</span>
        </div>
      </section>
    </main>
  );
}
