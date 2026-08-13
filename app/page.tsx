import { BOOKS, isOut } from "@/lib/books";
import SiteHeader from "./components/SiteHeader";
import AnimatedTitle from "./components/AnimatedTitle";
import Logo from "./components/Logo";
import BookCover from "./components/BookCover";
import SignupSection from "./components/SignupSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <Logo />
          <p className="eyebrow anim" style={{ "--i": 0 } as React.CSSProperties}>
            A coloring book series
          </p>
          <AnimatedTitle text="Monochrome" second="Worlds" delay={0.35} />
          <p className="lede anim" style={{ "--i": 2 } as React.CSSProperties}>
            Fifty of the world&apos;s places, drawn again and again — overgrown,
            gone feral, after dark, under water.
          </p>
          <div className="actions anim" style={{ "--i": 3 } as React.CSSProperties}>
            <a className="btn btn-primary" href="/books">
              See the books
            </a>
            <a className="btn btn-ghost" href="/free">
              Get free pages
            </a>
          </div>
          <p className="tagline anim" style={{ "--i": 4 } as React.CSSProperties}>
            One color. Zero stress.
          </p>
        </section>

        {/* ---------- the series ---------- */}
        <section className="section" id="books">
          <header className="section-head">
            <p className="eyebrow">Our books</p>
            <h2 className="section-title">Four ways the world goes quiet.</h2>
          </header>

          <div className="book-grid">
            {BOOKS.map((book) => (
              <a className="book-card" key={book.slug} href={`/books/${book.slug}`}>
                <BookCover
                  slug={book.slug}
                  title={book.title}
                  volume={book.volume}
                />
                <span className="book-card-meta">
                  <span className="plate-place">{book.volume}</span>
                  <span className="book-card-title">{book.title} Worlds</span>
                  <span className="plate-blurb">{book.tagline}</span>
                  <span className={isOut(book.slug) ? "pill pill--out" : "pill"}>
                    {isOut(book.slug) ? "Out now" : "Coming soon"}
                  </span>
                </span>
              </a>
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
    </>
  );
}
