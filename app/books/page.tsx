import type { Metadata } from "next";
import { BOOKS, isOut } from "@/lib/books";
import SiteHeader from "../components/SiteHeader";
import BookCover from "../components/BookCover";

export const metadata: Metadata = {
  title: "Our books — Monochrome Worlds",
  description:
    "The Monochrome Worlds series: Overgrown, Feral, Nocturnal and Submerged.",
};

export default function Books() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <section className="section">
          <header className="section-head">
            <p className="eyebrow">The series</p>
            <h1 className="section-title">Four ways the world goes quiet.</h1>
            <p className="lede">
              Each volume takes the same fifty places and asks a different
              question. One color. Zero stress.
            </p>
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

        <footer className="site-foot">
          <span className="footer">Monochrome Worlds</span>
        </footer>
      </main>
    </>
  );
}
