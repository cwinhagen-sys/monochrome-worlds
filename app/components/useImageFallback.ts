"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tells you when an <img> failed to load, including the case React can't see
 * on its own: the request fails before hydration, so the error event fires
 * with no handler attached and `onError` never runs. Checking `complete` with
 * a zero `naturalWidth` on mount catches exactly that.
 *
 * Attach `ref` and `onError` to the image, and render a fallback when `failed`.
 */
export function useImageFallback() {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return { ref, failed, onError: () => setFailed(true) };
}
