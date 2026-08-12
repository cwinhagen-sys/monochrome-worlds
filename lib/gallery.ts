/**
 * The plates shown in the before/after gallery.
 *
 * Each plate needs two images of the SAME artwork at the SAME dimensions:
 *   <slug>-line.jpg    the printable page, uncolored
 *   <slug>-color.jpg   the same page, finished
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
    slug: "taj-mahal",
    title: "Taj Mahal",
    place: "Agra, India",
    blurb: "Marble under wildflowers, the reflecting pool gone to reed.",
  },
  {
    slug: "colosseum",
    title: "The Colosseum",
    place: "Rome, Italy",
    blurb: "Arches full of green, the arena floor a meadow.",
  },
  {
    slug: "machu-picchu",
    title: "Machu Picchu",
    place: "Cusco, Peru",
    blurb: "Terraces the forest never really let go of.",
  },
];

export const linePath = (slug: string) => `/gallery/${slug}-line.jpg`;
export const colorPath = (slug: string) => `/gallery/${slug}-color.jpg`;
