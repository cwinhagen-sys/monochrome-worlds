"use client";

import { useImageFallback } from "./useImageFallback";

/**
 * Shows the real cover from /public/covers/<slug>.png as soon as that file
 * exists, and an on-brand stand-in until then — never a broken image.
 */
export default function BookCover({
  slug,
  title,
  volume,
}: {
  slug: string;
  title: string;
  volume: string;
}) {
  const { ref, failed, onError } = useImageFallback();

  if (failed) {
    return (
      <div className="cover cover--placeholder" role="img" aria-label={`${title} Worlds`}>
        <span className="cover-volume">{volume}</span>
        <span className="cover-title">
          {title}
          <em>Worlds</em>
        </span>
        <span className="cover-rule" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      className="cover"
      src={`/covers/${slug}.png`}
      alt={`${title} Worlds — cover`}
      onError={onError}
    />
  );
}
