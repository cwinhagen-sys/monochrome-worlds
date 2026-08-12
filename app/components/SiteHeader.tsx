import { BOOKS } from "@/lib/books";

/** Thin sticky bar. The books live in a hover/focus menu so the bar stays quiet. */
export default function SiteHeader() {
  return (
    <header className="bar">
      <a className="bar-mark" href="/">
        Monochrome Worlds
      </a>

      <nav className="bar-nav">
        <div className="menu">
          <a className="bar-link" href="/books">
            Our books
          </a>
          <div className="menu-panel">
            {BOOKS.map((book) => (
              <a className="menu-item" key={book.slug} href={`/books/${book.slug}`}>
                <span className="menu-item-title">{book.title} Worlds</span>
                <span className="menu-item-note">{book.volume}</span>
              </a>
            ))}
          </div>
        </div>

        <a className="bar-link" href="/free">
          Free pages
        </a>
      </nav>
    </header>
  );
}
