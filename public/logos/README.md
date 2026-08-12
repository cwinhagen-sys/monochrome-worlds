# Volume emblems

Each book can carry its own mark, shown beside the title on its page. Name the
file after the book's slug:

```
public/logos/overgrown-worlds.png
public/logos/feral-worlds.png
public/logos/nocturnal-worlds.png
public/logos/submerged-worlds.png
```

It appears automatically. A book without one simply shows its title — no gap,
no broken image — so you can add them one at a time.

## Export settings

- **Transparent PNG.** The page is near-black; a white box around the mark will
  show. If the emblem is dark, give it a light or marigold treatment so it
  reads against the background.
- **Around 300px on the long side.** It displays at roughly 58–92px.
- **Square-ish works best** next to the title. Very wide marks get small.
- Keep it well under 100 KB.

The slugs come from `lib/books.ts` — same names as the covers in
`public/covers/`.
