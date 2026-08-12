/**
 * A plate is one spread in a book. The images live in public/gallery/ as a
 * pair of the SAME artwork at the SAME dimensions:
 *
 *   <slug>-line.png       the printable page, uncolored
 *   <slug>-complete.png   the same page, finished in one color
 *
 * Plate slugs are unique across the whole series, so the folder stays flat.
 * See public/gallery/README.md. Plates are listed per book in lib/books.ts.
 */

export type Plate = {
  slug: string;
  title: string;
  place: string;
  blurb: string;
};

export const linePath = (slug: string) => `/gallery/${slug}-line.png`;
export const colorPath = (slug: string) => `/gallery/${slug}-complete.png`;
