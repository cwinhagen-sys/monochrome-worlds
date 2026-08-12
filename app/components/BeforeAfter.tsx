"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-reveal comparison: the finished plate leads, and dragging uncovers
 * the page you get.
 *
 * Pointer events drive the drag rather than the range input underneath. A
 * range input only follows a touch that starts on its thumb — anywhere else
 * just jumps once and stops tracking, which made this feel broken on a phone.
 * The input stays for keyboard control (and to announce the value), with
 * pointer events switched off so it never competes for the touch.
 *
 * `touch-action: pan-y` on the frame keeps vertical scrolling with the page
 * while claiming horizontal movement for the reveal.
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
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  function moveTo(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }

  return (
    <div
      ref={frame}
      className="ba"
      style={{ "--pos": `${pos}%` } as React.CSSProperties}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        moveTo(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          moveTo(event.clientX);
        }
      }}
      onPointerUp={(event) =>
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img className="ba-base" src={line} alt={`${title}, ready to color`} draggable={false} />
      <img
        className="ba-top"
        src={color}
        alt={`${title}, finished in one color`}
        draggable={false}
      />
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
