import { AMAZON_BOOK_URL } from "@/lib/links";

export default function Home() {
  return (
    <main className="shell">
      <div className="stack">
        <p className="eyebrow">Monochrome Worlds</p>
        <h1 className="wordmark">
          Overgrown
          <span className="second">Worlds</span>
        </h1>
      </div>

      <div className="rule" />

      <p className="lede">
        Fifty of the world&apos;s places, imagined after nature took them back.
        The Taj Mahal under wildflowers. The Colosseum full of green. Quiet
        worlds to color in, one page at a time.
      </p>

      <div className="actions">
        {AMAZON_BOOK_URL ? (
          <a className="btn btn-primary" href={AMAZON_BOOK_URL}>
            Find the book on Amazon
          </a>
        ) : (
          <span className="note">Book one is on its way. Check back soon.</span>
        )}
        <a className="btn btn-ghost" href="/signup">
          Get the free pages
        </a>
      </div>

      <p className="tagline">One color. Zero stress.</p>

      <footer className="footer">Monochrome Worlds</footer>
    </main>
  );
}
