"use client";

import { useImageFallback } from "./useImageFallback";

/**
 * Shows the real logo from /public/logo.png the moment that file exists.
 * Until then (or if it ever fails to load) it falls back to an on-brand
 * placeholder mark, so the page never shows a broken image.
 */
export default function Logo() {
  const { ref, failed, onError } = useImageFallback();

  return (
    <span className="logo-wrap">
      {failed ? (
        <svg
          className="logo-mark"
          viewBox="0 0 120 120"
          role="img"
          aria-label="Monochrome Worlds"
        >
          <circle cx="60" cy="60" r="58" fill="var(--marigold)" />
          <g
            transform="translate(54 60)"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <circle r="33" fill="#fff" />
            <ellipse rx="13" ry="33" />
            <line x1="-33" y1="0" x2="33" y2="0" />
            <path d="M-31 -14 H31" opacity="0.9" />
            <path d="M-31 14 H31" opacity="0.9" />
          </g>
          <g
            fill="#fff"
            stroke="var(--ink)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          >
            <path d="M92 30 C104 52 104 74 90 96" fill="none" strokeWidth="2.8" />
            <path d="M92 34 c9 -3 15 3 16 12 c-10 2 -16 -4 -16 -12 Z" />
            <path d="M99 62 c9 -1 14 6 13 15 c-9 0 -14 -7 -13 -15 Z" />
            <path d="M90 88 c8 -4 15 1 17 10 c-9 3 -16 -2 -17 -10 Z" />
          </g>
        </svg>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          className="logo-img"
          src="/logo.png"
          alt="Monochrome Worlds"
          onError={onError}
        />
      )}
    </span>
  );
}
