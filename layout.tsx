import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.monochromeworlds.com"),
  title: "Monochrome Worlds",
  description:
    "Coloring books of real places, imagined reclaimed by nature. One color. Zero stress.",
  openGraph: {
    title: "Monochrome Worlds",
    description:
      "Coloring books of real places, imagined reclaimed by nature. One color. Zero stress.",
    url: "https://www.monochromeworlds.com",
    siteName: "Monochrome Worlds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monochrome Worlds",
    description:
      "Coloring books of real places, imagined reclaimed by nature.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
