/**
 * A title that grows in a letter at a time on load.
 *
 * The letters are real text, not a video or an image: they stay selectable,
 * searchable, crisp at any zoom, and cost nothing to download. Each character
 * gets its own span with a staggered delay, and the whole thing is CSS — no
 * animation library, no JavaScript running after paint.
 *
 * Splitting text into spans would make a screen reader announce it letter by
 * letter, so the heading carries the real text in aria-label and the spans are
 * hidden from the accessibility tree.
 */
export default function AnimatedTitle({
  text,
  second,
  className = "",
  delay = 0,
}: {
  text: string;
  /** Optional second line, rendered in the wordmark's secondary style. */
  second?: string;
  className?: string;
  /** Seconds to wait before the first letter, for sequencing against other elements. */
  delay?: number;
}) {
  const label = second ? `${text} ${second}` : text;
  let index = 0;

  const letters = (value: string) =>
    Array.from(value).map((char, i) => {
      const style = {
        "--letter": index++,
        "--start": `${delay}s`,
      } as React.CSSProperties;
      return char === " " ? (
        <span key={i} className="grow-space" style={style}>
          {" "}
        </span>
      ) : (
        <span key={i} className="grow-letter" style={style}>
          {char}
        </span>
      );
    });

  return (
    <h1 className={`wordmark grow ${className}`} aria-label={label}>
      <span aria-hidden="true">{letters(text)}</span>
      {second ? (
        <span className="second" aria-hidden="true">
          {letters(second)}
        </span>
      ) : null}
    </h1>
  );
}
