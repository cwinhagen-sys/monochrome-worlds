import type { Plate } from "./gallery";

/**
 * The series. Adding a book here gives it a page at /books/<slug> and a card
 * on the homepage — no other code to touch.
 *
 * Amazon links are read from environment variables so a printed QR code or a
 * live page can be pointed at a listing without a redeploy of new code. Next
 * only inlines literal `process.env.X` reads, so each one is spelled out.
 */

const AMAZON_URLS: Record<string, string> = {
  "overgrown-worlds":
    process.env.NEXT_PUBLIC_AMAZON_URL_OVERGROWN ??
    process.env.NEXT_PUBLIC_AMAZON_BOOK_URL ??
    "",
  "feral-worlds": process.env.NEXT_PUBLIC_AMAZON_URL_FERAL ?? "",
  "nocturnal-worlds": process.env.NEXT_PUBLIC_AMAZON_URL_NOCTURNAL ?? "",
  "submerged-worlds": process.env.NEXT_PUBLIC_AMAZON_URL_SUBMERGED ?? "",
};

export type Book = {
  slug: string;
  /** Shown as two lines: "Overgrown" over "Worlds". */
  title: string;
  volume: string;
  tagline: string;
  blurb: string;
  /** Empty until the book is out — the page then says so instead of linking. */
  plates: Plate[];
};

export const BOOKS: Book[] = [
  {
    slug: "overgrown-worlds",
    title: "Overgrown",
    volume: "Volume One",
    tagline: "Nature takes it back.",
    blurb:
      "Fifty of the world's places, imagined after nature took them back. The Great Wall under pine, the Sphinx deep in wild grass. Quiet worlds to color in, one page at a time.",
    plates: [
      {
        slug: "wall",
        title: "The Great Wall",
        place: "Jinshanling, China",
        blurb:
          "Watchtowers half-swallowed, the ramparts running off into the trees.",
      },
      {
        slug: "sphinx",
        title: "The Sphinx",
        place: "Giza, Egypt",
        blurb: "Sand giving way to meadow, the paws deep in wild grass.",
      },
      {
        slug: "burj",
        title: "Burj Khalifa",
        place: "Dubai, UAE",
        blurb: "Glass and steel gone to vine — the tallest trellis ever built.",
      },
    ],
  },
  {
    slug: "feral-worlds",
    title: "Feral",
    volume: "Volume Two",
    tagline: "The animals move back in.",
    blurb:
      "The same places, and the creatures that took over once we left. Deer in the shopping streets, herons on the bridges, wolves at the edge of the square.",
    plates: [],
  },
  {
    slug: "nocturnal-worlds",
    title: "Nocturnal",
    volume: "Volume Three",
    tagline: "The world after dark.",
    blurb:
      "The same fifty places at night, lit by moon and window. Heavier ink, deeper shadow, and the quiet that only comes after midnight.",
    plates: [],
  },
  {
    slug: "submerged-worlds",
    title: "Submerged",
    volume: "Volume Four",
    tagline: "The water comes in.",
    blurb:
      "Cities under the tide. Reefs where the traffic was, shoals through the arcades, and light falling the way it only falls through water.",
    plates: [],
  },
];

export const bookBySlug = (slug: string) =>
  BOOKS.find((book) => book.slug === slug);

export const amazonUrl = (slug: string) => AMAZON_URLS[slug] ?? "";

/** A book is "out" once it has somewhere to buy it. */
export const isOut = (slug: string) => Boolean(amazonUrl(slug));

export const coverPath = (slug: string) => `/covers/${slug}.png`;
