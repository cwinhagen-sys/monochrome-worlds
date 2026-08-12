# Book covers

Drop each cover here named after the book's slug:

```
public/covers/overgrown-worlds.png
public/covers/feral-worlds.png
public/covers/nocturnal-worlds.png
public/covers/submerged-worlds.png
```

They appear automatically — no code to change. Until a file exists, the site
draws an on-brand stand-in with the volume and title, so nothing looks broken
while a book is still unannounced.

## Export settings

- **Portrait, 2:3** (e.g. 800×1200). Other ratios are cropped to fit, so
  anything important should sit away from the edges.
- **Around 800px wide** is plenty — covers display at roughly 210–320px.
- **PNG or JPEG**, ideally under ~200 KB. The homepage shows all four at once.

## Where the slugs come from

`lib/books.ts`. Adding a book there gives it a page at `/books/<slug>`, a card
on the homepage, and an entry in the "Our books" menu — the cover filename just
has to match its slug.
