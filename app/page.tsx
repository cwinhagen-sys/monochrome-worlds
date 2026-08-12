import { AMAZON_BOOK_URL } from "@/lib/links";
import { PLATES, linePath, colorPath } from "@/lib/gallery";
import Logo from "./components/Logo";
import BeforeAfter from "./components/BeforeAfter";
import SignupSection from "./components/SignupSection";

export default function Home() {
  return (
    <main className="page">
      {/* ---------- hero ---------- */}
      <section className="hero">
        <Logo />
        <p className="eyebrow anim" style={{ "--i": 0 } as React.CSSProperties}>
          Monochrome Worlds
        </p>
        <h1 className="wordmark anim" style={{ "--i": 1 } as React.CSSProperties}>
          Overgrown
          <span className="second">Worlds</span>
        </h1>
        <p className="lede anim" style={{ "--i": 2 } as React.CSSProperties}>
          Fifty of the world&apos;s places, imagined after nature took them back.
          Quiet worlds to color in, one page at a time.
        </p>
        <div className="actions anim" style={{ "--i": 3 } as React.CSSProperties}>
          <a className="btn btn-primary" href="/free">
            Get free pages
          </a>
          {AMAZON_BOOK_URL ? (
            <a className="btn btn-ghost" href={AMAZON_BOOK_URL}>
              Find the book on Amazon
            </a>
          ) : null}
        </div>
        <p className="tagline anim" style={{ "--i": 4 } as React.CSSProperties}>
          One color. Zero stress.
        </p>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="section" id="inside">
        <header className="section-head">
          <p className="eyebrow">Inside the book</p>
          <h2 className="section-title">Drag to see a page come alive.</h2>
          <p className="lede">
            Every plate is printed ready to color. Pull the handle across to see
            where it can end up.
          </p>
        </header>

        <div className="plates">
          {PLATES.map((plate) => (
            <figure className="plate" key={plate.slug}>
              <BeforeAfter
                line={linePath(plate.slug)}
                color={colorPath(plate.slug)}
                title={plate.title}
              />
              <figcaption className="plate-cap">
                <span className="plate-title">{plate.title}</span>
                <span className="plate-place">{plate.place}</span>
                <span className="plate-blurb">{plate.blurb}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- signup ---------- */}
      <section className="section section--quiet">
        <SignupSection />
      </section>

      <footer className="site-foot">
        <span className="footer">Monochrome Worlds</span>
      </footer>
    </main>
  );
}
