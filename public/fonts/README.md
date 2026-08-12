# Fonts

## Kafkus — the cover face

The site already asks for Kafkus on every display heading. Drop the web files
here and they take effect on the next deploy:

```
public/fonts/kafkus.woff2     ← the one that matters
public/fonts/kafkus.woff      ← optional, for very old browsers
```

Filenames must match exactly (lowercase). Until they exist, headings fall
through to Archivo Black, so the site looks finished either way — no broken
text while the files are being sorted.

## ⚠️ Check the licence first

A desktop licence — the one that lets you set the cover in Affinity or
Illustrator — does **not** usually allow putting the font on a website. Web
embedding is normally sold separately, and hosting a font file publicly is
exactly what it covers, since anyone can download `kafkus.woff2` straight off
the site.

Before uploading, confirm the licence includes **webfont / @font-face** use. If
it doesn't, the foundry will sell a webfont licence for the same family.

## Converting to woff2

If what you have is `.otf` or `.ttf`, convert it — woff2 is roughly half the
size and every current browser supports it. Any "otf to woff2" converter works;
[Transfonter](https://transfonter.org) is a common one. Upload the file, pick
woff2 (and woff), download, and rename to `kafkus.woff2`.

Only include the weights actually used. One weight is usually enough for
display headings, and each extra one is another file the visitor downloads.

## The rest of the type

- **Archivo** — labels, buttons, small print. Loaded from Google Fonts in
  `app/layout.tsx`. Same family as Archivo Black, so it sits naturally under a
  heavy display face.
- **Cormorant Garamond** — the flowing serif copy (ledes, plate captions).

Swapping either means editing `--ui` / `--serif` in `app/globals.css` and the
Google Fonts link in `app/layout.tsx`.
