# Gallery plates

The homepage gallery pairs each plate's uncolored page with the finished one and
lets visitors drag between them.

## Adding a plate

Every plate needs **two images of the same artwork**:

```
public/gallery/<slug>-line.jpg     the printable page, uncolored
public/gallery/<slug>-color.jpg    the same page, colored in
```

Then add an entry to `PLATES` in `lib/gallery.ts`:

```ts
{
  slug: "taj-mahal",
  title: "Taj Mahal",
  place: "Agra, India",
  blurb: "Marble under wildflowers, the reflecting pool gone to reed.",
}
```

That's it — the gallery renders whatever is in that list.

## The one rule that matters

**Both images must be exactly the same dimensions and framing.** The reveal
slides one image over the other, so if the colored version is cropped even
slightly differently, the artwork visibly jumps as you drag.

Easiest way to guarantee it: color a copy of the line file, and export both from
the same canvas.

## Export settings

- **Width**: around 1200px. Larger just costs load time — they're displayed at
  roughly 350px wide.
- **Format**: JPEG at quality ~80. The current placeholders are 60–90 KB each;
  aim for that ballpark.
- **Portrait** matches the book. Any consistent ratio works — the layout adapts.

A page carrying six full-resolution scans gets slow on a phone, so it's worth
compressing before uploading.

## The current images are placeholders

The six files here are generated stand-ins, labelled as such, so the interaction
could be built and tested before the artwork existed. Replace them with real
plates using the same filenames and they'll appear automatically — no code
changes needed.
