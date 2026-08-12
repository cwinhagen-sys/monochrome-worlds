import type { Metadata } from "next";
import Landing from "../components/Landing";

export const metadata: Metadata = {
  title: "Free coloring pages — Monochrome Worlds",
  description:
    "Join the list and get a free set of printable pages from the series.",
};

/**
 * The bare lead-magnet page: one job, no distractions. This is the link for
 * ads, QR codes and social bios. The homepage is the browsing experience.
 */
export default function Free() {
  return <Landing />;
}
