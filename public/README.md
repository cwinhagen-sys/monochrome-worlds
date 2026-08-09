# Static assets

## The logo

Drop the Monochrome Worlds logo here as `logo.png` (a transparent, high-res PNG
is best; a square export works well since the mark sits in a circle).

Then, in `app/page.tsx`, swap the placeholder `<svg className="logo-mark">…</svg>`
for:

```tsx
<span className="logo-wrap">
  <img className="logo-img" src="/logo.png" alt="Monochrome Worlds" />
</span>
```

Until then the page renders an on-brand placeholder mark, so nothing looks broken.
