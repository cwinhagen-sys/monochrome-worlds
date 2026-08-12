"use client";

import { useState } from "react";

/**
 * Drag-to-reveal comparison: the uncolored page on the left, the finished one
 * on the right. The range input does the work — it gives us pointer, touch and
 * keyboard control for free — and sits invisibly over the frame while a styled
 * handle shows where the split is.
 */
export default function BeforeAfter({
  line,
  color,
  title,
}: {
  line: string;
  color: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba" style={{ "--pos": `${pos}%` } as React.CSSProperties}>
      {/* The finished plate leads; drag right to uncover the page you get. */}
      {/* eslint-disable @next/next/no-img-element */}
      <img className="ba-base" src={line} alt={`${title}, ready to color`} />
      <img className="ba-top" src={color} alt={`${title}, finished in one color`} />
      {/* eslint-enable @next/next/no-img-element */}

      <span className="ba-handle" aria-hidden="true">
        <span className="ba-grip" />
      </span>

      <input
        className="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        aria-label={`Reveal how ${title} looks finished`}
      />

      <span className="ba-tag ba-tag--left" aria-hidden="true">
        Finished
      </span>
      <span className="ba-tag ba-tag--right" aria-hidden="true">
        Your page
      </span>
    </div>
  );
}
