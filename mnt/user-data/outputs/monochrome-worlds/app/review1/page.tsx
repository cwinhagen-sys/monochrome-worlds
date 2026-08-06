import type { Metadata } from "next";
import { REVIEW_URL_BOOK1 } from "@/lib/links";

export const metadata: Metadata = {
  title: "Leave a review — Overgrown Worlds",
  description: "Thanks for coloring Overgrown Worlds.",
  robots: { index: false, follow: false },
};

export default function Review1() {
  return (
    <main className="shell">
      <div className="stack">
        <p className="eyebrow">Overgrown Worlds</p>
        <h1 className="wordmark">
          Thank
          <span className="second">You</span>
        </h1>
        <p className="stars" aria-hidden="true">
          ★★★★★
        </p>
      </div>

      <div className="rule" />

      <p className="lede">
        I hope you enjoyed these worlds. If you have a minute, an honest review
        really does help. It&apos;s mostly how new people find the book.
      </p>

      <div className="actions">
        {REVIEW_URL_BOOK1 ? (
          <a className="btn btn-primary" href={REVIEW_URL_BOOK1}>
            Write a review on Amazon
          </a>
        ) : (
          <span className="note">
            The review link opens as soon as the book goes live. Thanks for
            scanning early.
          </span>
        )}
        <a className="btn btn-ghost" href="/">
          See the series
        </a>
      </div>

      <footer className="footer">Monochrome Worlds</footer>
    </main>
  );
}
