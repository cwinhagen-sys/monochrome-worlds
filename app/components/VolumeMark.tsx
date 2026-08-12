"use client";

import { useImageFallback } from "./useImageFallback";

/**
 * The volume's own mark, shown beside the book title. Renders nothing at all
 * until public/logos/<slug>.png exists, so a book without one just shows its
 * title rather than a gap or a broken image.
 */
export default function VolumeMark({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { ref, failed, onError } = useImageFallback();

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className="volume-mark"
      src={`/logos/${slug}.png`}
      alt={`${title} Worlds emblem`}
      onError={onError}
    />
  );
}
