"use client";

import { useState } from "react";
import SignupForm from "./SignupForm";

/** The homepage signup block. Unlike /free, success swaps only this section. */
export default function SignupSection() {
  const [done, setDone] = useState(false);

  return (
    <div className="signup-block">
      {done ? (
        <div className="signup-block-done" role="status" aria-live="polite">
          <h3 className="success-title">Sent! Check your Inbox now.</h3>
          <span className="success-rule" aria-hidden="true" />
        </div>
      ) : (
        <>
          <p className="eyebrow">Free printable coloring pages</p>
          <h2 className="section-title">Start with a few pages, on me.</h2>
          <p className="lede">
            Join the list and I&apos;ll send you a free set of printable pages
            from the series.
          </p>
          <div className="signup-wrap">
            <SignupForm onSuccess={() => setDone(true)} />
          </div>
        </>
      )}
    </div>
  );
}
