import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BOOKS, bookBySlug, amazonUrl } from "@/lib/books";
import { linePath, colorPath } from "@/lib/gallery";
import SiteHeader from "@/app/components/SiteHeader";
import BookCover from "@/app/components/BookCover";
import BeforeAfter from "@/app/components/BeforeAfter";

export function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const book = bookBySlug((await params).slug);
  if (!book) return {};
  return {
    title: `${book.title} Worlds — Monochrome Worlds`,
    description: book.blurb,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const book = bookBySlug((await params).slug);
  if (!book) notFound();

  const buy = amazonUrl(book.slug);

  return (
    <>
      <SiteHeader />
      <main className="page">
        {/* ---------- cover + title ---------- */}
        <section className="book-hero">
          <div className="book-cover-col">
            <BookCover slug={book.slug} title={book.title} volume={book.volume} />
          </div>

          <div className="book-intro">
            <p className="eyebrow">{book.volume}</p>
            <h1 className="wordmark">
              {book.title}
              <span className="second">Worlds</span>
            </h1>
            <p className="book-tagline">{book.tagline}</p>
            <p className="lede">{book.blurb}</p>

            <div className="actions">
              {buy ? (
                <a className="btn btn-primary" href={buy}>
                  Buy on Amazon
                </a>
              ) : (
                <span className="note">
                  {book.title} Worlds is still being drawn. Join the list and
                  you&apos;ll hear the day it lands.
                </span>
              )}
              <a className="btn btn-ghost" href="/free">
                Get free pages
              </a>
            </div>
          </div>
        </section>

        {/* ---------- plates ---------- */}
        {book.plates.length > 0 ? (
          <section className="section" id="inside">
            <header className="section-head">
              <p className="eyebrow">Inside the book</p>
              <h2 className="section-title">Drag to see a page come alive.</h2>
              <p className="lede">
                Every plate is printed ready to color. Pull the handle across to
                see where it can end up.
              </p>
            </header>

            <div className="plates">
              {book.plates.map((plate) => (
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
        ) : null}

        <footer className="site-foot">
          <a className="link-quiet" href="/books">
            All books &rarr;
          </a>
          <span className="footer">Monochrome Worlds</span>
        </footer>
      </main>
    </>
  );
}
