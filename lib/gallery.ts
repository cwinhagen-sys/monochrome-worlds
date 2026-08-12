/**
 * The plates shown in the before/after gallery.
 *
 * Each plate needs two images of the SAME artwork at the SAME dimensions:
 *   <slug>-line.png       the printable page, uncolored
 *   <slug>-complete.png   the same page, finished
 *
 * Drop both in public/gallery/ and add an entry here. See public/gallery/README.md.
 */

export type Plate = {
  slug: string;
  title: string;
  place: string;
  blurb: string;
};

export const PLATES: Plate[] = [
  {
    slug: "wall",
    title: "The Great Wall",
    place: "Jinshanling, China",
    blurb: "Watchtowers half-swallowed, the ramparts running off into the trees.",
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
];

export const linePath = (slug: string) => `/gallery/${slug}-line.png`;
export const colorPath = (slug: string) => `/gallery/${slug}-complete.png`;
