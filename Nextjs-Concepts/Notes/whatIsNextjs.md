# Next.js — Quick Setup & Guide 

This README explains how to set up a Next.js app, how routes and navigation work, how to use images, and the difference between **Server** and **Client** components — all in plain and simple language.

---

## 1. What is Next.js?

Next.js is a framework built on React. It helps you make websites and web apps that load fast and are easy to structure.

---

## 2. Prerequisites

* Install **Node.js** (LTS recommended).
* Have a terminal (PowerShell, Terminal, or Bash).
* Basic knowledge of JavaScript and React helps.

---

## 3. Create a new Next.js app (one line)

Open your terminal and run:

```bash
npx create-next-app@latest my-app --ts --app --eslint --tailwind
cd my-app
npm run dev
```

This creates a folder `my-app` and starts a development server at `http://localhost:3000`.

> If you prefer plain JavaScript, omit `--ts`.

---

## 4. Two router styles: App Router vs Pages Router (short)

* **App Router** (`/app`) is the modern way. It uses folders and special files like `page.tsx` and `layout.tsx`.
* **Pages Router** (`/pages`) is the older way. Files in `/pages` map directly to routes (for example `pages/about.js` → `/about`).

If you create a new project today, you will probably use the **App Router**.

---

## 5. File structure basics (App Router)

```
my-app/
 ├─ app/
 │  ├─ layout.tsx    ← main layout used for all pages
 │  ├─ page.tsx      ← homepage -> /
 │  └─ about/
 │     └─ page.tsx   ← about page -> /about
 ├─ public/         ← static files like images
 ├─ package.json
```

**Important:** inside the App Router each route folder must contain a file named `page.tsx` (or `page.js`). That file becomes the content for that route.

---

## 6. Make a page (example)

Create `app/about/page.tsx` with:

```tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page.</p>
    </div>
  );
}
```

Visit `http://localhost:3000/about` to see it.

---

## 7. Layouts and shared UI

Put a `layout.tsx` in `app/` to wrap all pages (header, footer, fonts). Example:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>My site header</header>
        {children}
        <footer>My footer</footer>
      </body>
    </html>
  );
}
```

The `children` is where page content appears.

---

## 8. Navigation (links)

Use Next's `Link` component. It makes navigation fast and preloads pages.

```tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

Place `Nav` in your `layout.tsx` so it appears on all pages.

---

## 9. Dynamic routes (example)

To make routes like `/blog/my-post`, use folder names with `[]`:

```
app/
 └─ blog/
    └─ [slug]/
       └─ page.tsx
```

Inside `page.tsx` you can get the `slug` from `params`:

```tsx
export default function PostPage({ params }: { params: { slug: string } }) {
  return <div>Post: {params.slug}</div>;
}
```

---

## 10. Working with images

Put static images in the `public/` folder (for example `public/avatar.jpg`).

Use Next's Image component for better performance:

```tsx
import Image from 'next/image';

export default function Avatar() {
  return (
    <Image src="/avatar.jpg" alt="me" width={200} height={200} />
  );
}
```

Benefits of `next/image`:

* automatic resizing for different screens
* lazy loading (images load when visible)
* prevents layout shift

For images hosted on other domains, add allowed domains to `next.config.js`:

```js
// next.config.js
module.exports = {
  images: {
    domains: ['images.example.com'],
  },
};
```

---

## 11. Server components vs Client components (simple)

* **Server Components** run on the server. They send plain HTML to the browser. They are fast and do not include JavaScript for the client.

  * Good for: static content, SEO, data fetching with `fetch()`.
* **Client Components** run in the browser. They can use state, effects, and browser APIs.

  * Good for: buttons, forms, things that need user interaction.

How to make a Client Component: add `"use client"` at the top of the file.

```tsx
// this is a client component
'use client';
import { useState } from 'react';

export default function Counter() {
  const [c, setC] = useState(0);
  return <button onClick={() => setC(c+1)}>{c}</button>;
}
```

Layouts and pages are **Server Components by default** in the App Router. Only mark a file as Client when it needs interactivity.

---

## 12. Data fetching (short)

* In Server Components you can call `await fetch()` directly and render the result.
* In Client Components you use React hooks like `useEffect` and fetch on the client side.

Example (server):

```tsx
// app/profile/page.tsx (server)
export default async function Profile() {
  const res = await fetch('https://api.example.com/user');
  const user = await res.json();
  return <div>{user.name}</div>;
}
```

---

## 13. Useful commands

```bash
npm run dev      # start dev server
npm run build    # build for production
npm start        # run production server
```

---
