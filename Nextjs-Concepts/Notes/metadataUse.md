# Next.js — Metadata (what it is & how to use it)

This README explains **what the `metadata` tag (API) in Next.js** is, why it matters, where to put it, and how to use it in real projects. It focuses on the App Router (`app/`) metadata API introduced in Next.js and shows examples for common use cases (SEO, social sharing, PWA, robots, and dynamic metadata).

---

## What is `metadata` in Next.js?

In the App Router, `metadata` is an object (or a generated object) that tells Next.js what to render inside the HTML `<head>` for a page or layout. Instead of manually writing `<head>` tags or using `next/head`, you declare `metadata` next to your page or layout and Next.js converts it into optimized `<meta>`, `<link>`, and other head tags.

Why use it:

* **SEO**: provide `title`, `description`, `robots`, canonical links.
* **Social sharing**: set Open Graph and Twitter card data so links preview correctly on social platforms.
* **PWA & browser hints**: icons, manifest, theme color.
* **Security & verification**: site verification meta tags (Google, Bing, etc.).
* **Consistency**: define defaults in `layout` and override per page.
* **Type safety & tooling**: Next.js exposes types for metadata, making mistakes less likely.

---

## Where to put metadata

* `app/layout.js` or `app/layout.tsx` — good for site-wide defaults (site name, default description, icons).
* `app/page.js` or `app/[slug]/page.js` — per-page metadata.
* `export const metadata = { ... }` — static metadata (static at build time).
* `export async function generateMetadata(params, parent)` — dynamic metadata that can use route params or server data.

Note: metadata should be created on the server (not a client component). The metadata API runs server-side and is compatible with server components.

---

## Simple static metadata example

```jsx
// app/about/page.jsx
export const metadata = {
  title: 'About — MySite',
  description: 'Learn about MySite, what we do, and our mission.',
};

export default function Page() {
  return <main><h1>About</h1></main>;
}
```

Next.js will produce the appropriate `<title>` and `<meta name="description">` tags in the document head.

---

## Advanced metadata example (Open Graph, Twitter, icons, robots)

```jsx
// app/layout.jsx
export const metadata = {
  title: 'MySite',
  description: 'A short site description',
  applicationName: 'MySite',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fff' }, { media: '(prefers-color-scheme: dark)', color: '#000' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'MySite — Welcome',
    description: 'Open graph description',
    url: 'https://mysite.example',
    siteName: 'MySite',
    images: ['/og-default.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySite',
    description: 'Twitter desc',
    images: ['/twitter-card.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};
```

---

## Dynamic metadata (generateMetadata)

Use `generateMetadata` when metadata depends on runtime data, route params, or remote API results.

```jsx
// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }, parent) {
  const post = await getPostFromDB(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
  };
}

export default function PostPage({ params }) {
  // render post
}
```

Important notes:

* `generateMetadata` runs on the server and can `await` data.
* You can read `parent()` (if provided) to merge with metadata from parent layouts.
* Keep expensive work minimal if possible (cache results) because metadata generation runs during SSR.

---

## Practical tips & gotchas

* **Keep client bundles small** — metadata is server-side; defining it in server components avoids shipping extra JS to the client.
* **`"use client"` is not needed** (and must not be used) for metadata files — metadata should be declared server-side.
* **Canonical URLs**: set `alternates.canonical` or `openGraph.url` to indicate canonical locations for SEO.
* **Images**: Open Graph images are essential for good link previews; prefer absolute URLs or paths that resolve to your public assets.
* **Robots**: control crawling/indexing using `robots` metadata; you can specify `noindex` or `nofollow` per page.
* **Verification**: add verification meta tags for Google/Bing with `metadata.verification` if needed.
* **TypeScript**: use `import type { Metadata } from 'next'` to type your export and get autocompletion.

---

## Mini SEO checklist (using metadata)

* [ ] Page `title` is unique and descriptive
* [ ] `description` is present and ~150–160 chars
* [ ] Open Graph `title`, `description`, and `images` set
* [ ] Twitter card set if you want rich Twitter previews
* [ ] `robots` configured for non-public pages (e.g., `noindex` for staging)
* [ ] Canonical URL present for duplicate content
* [ ] Icons & manifest set for PWA and mobile behavior

---

## Further reading / experimentation

* Try `generateMetadata` for blog posts and product pages.
* Use layout-level metadata to set shared defaults and override per-page metadata.
* Combine with server-side image generation for dynamic OG images if you need per-page image cards.

---
