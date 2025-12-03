# Next.js + Node.js — README

> A concise guide covering API routes, dynamic routes, environment variables, layouts, middleware, NextAuth, next/navigation, Server Actions, SSR/SSG/ISR, styles, and caching in Next.js — with examples and best practices.

## Table of Contents

1. Introduction
2. Prerequisites
3. API Routes
4. Dynamic Routes
5. Environment Variables
6. Layouts (App Router)
7. Middleware
8. Authentication with NextAuth
9. next/navigation (App Router client hooks)
10. Server Actions
11. Rendering Strategies: SSR, SSG, ISR
12. Styles in Next.js
13. Caching in Next.js
14. Best Practices & Security
15. Deployment Tips

---

## 1. Introduction

This README summarizes how Next.js works with Node.js backend concepts and typical features you will use when building full-stack apps. Examples mainly assume the **App Router** (`/app`) but where applicable we note **Pages Router** (`/pages`) equivalents.

## 2. Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* Next.js (latest stable)
* Basic knowledge of React (client & server components)

Quick start:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## 3. API Routes

API routes let you write server code inside Next.js. They run on Node (serverless or Node server on deploy).

**App Router (recommended) — file: `/app/api/hello/route.js`**

```js
export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Hello from API route' }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
```

**Pages Router (older) — file: `/pages/api/hello.js`**

```js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API route' })
}
```

Use cases: form handling, webhooks, proxies to external APIs, server-side logic.

## 4. Dynamic Routes

Dynamic routes enable URL parameters.

**App Router example:** `/app/blog/[slug]/page.js`

```js
export default async function BlogPost({ params }){
  const { slug } = params
  // fetch post by slug
}
```

**Catch-all route:** `/app/docs/[...segments]/page.js` — `params.segments` is an array.

**Optional catch-all:** `/app/docs/[[...segments]]/page.js` — might be undefined or array.

## 5. Environment Variables

Store secrets and environment settings in `.env.local` (never commit to git).

```.env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://user:pass@host:5432/db
```

* `NEXT_PUBLIC_` prefix = available to the browser.
* Other vars = server-only (available in Node runtime).

Access in code:

```js
// server-side
const dbUrl = process.env.DATABASE_URL

// client-side
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## 6. Layouts (App Router)

App Router has built-in nested layouts using `layout.js` files.

```
/app/layout.js         // root layout (wraps whole app)
/app/dashboard/layout.js // nested layout under /dashboard
```

Example `layout.js`:

```jsx
export default function RootLayout({ children }){
  return (
    <html>
      <body>
        <header>My App</header>
        {children}
        <footer>© Company</footer>
      </body>
    </html>
  )
}
```

Layouts are server components by default — great for consistent page chrome and shared data fetching.

## 7. Middleware

`middleware.js` runs before requests (Edge runtime) for routing, authentication checks, redirects, headers.

Example (`middleware.js`):

```js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  if (url.pathname.startsWith('/admin')) {
    // check cookie or header, otherwise redirect to login
    return NextResponse.redirect('/login')
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
```

Notes:

* Runs at the Edge (V8) — limited Node APIs.
* Use for redirects, rewrites, headers, A/B testing.

## 8. Authentication with NextAuth

NextAuth provides OAuth/JWT/session-based auth with adapters for databases.

Minimal example (App Router): create `/app/api/auth/[...nextauth]/route.js` and configure providers and callbacks. Typical flow:

* Sign-in pages (client)
* API routes used internally by NextAuth
* Use server session helpers on server components and `useSession()` on client components.

Security tip: Keep secret keys in `.env.local` and use server-side checks for protected pages.

## 9. `next/navigation`

When using the App Router, import client hooks from `next/navigation`.

Common hooks:

* `useRouter()` — client navigation (push/replace)
* `useSearchParams()` — read URL query in client components
* `usePathname()` — get current path

Example:

```jsx
'use client'
import { useRouter } from 'next/navigation'
export default function MyButton(){
  const router = useRouter()
  return <button onClick={() => router.push('/dashboard')}>Go</button>
}
```

## 10. Server Actions

Server Actions are functions marked with the `'use server'` directive and can be called from client components (streamline form handling and mutate server state without explicit API routes).

Example:

```jsx
// server-action.js (in a component file)
'use server'
export async function createPost(formData) {
  // run server-side logic, write to DB
}
```

In client component, import and pass as form action.

## 11. Rendering Strategies: SSR, SSG, ISR

* **SSR (Server-Side Rendering):** pages rendered per request. App Router: default server components + using `fetch` with `{ cache: 'no-store' }` or `export const dynamic = 'force-dynamic'`.
* **SSG (Static Site Generation):** build-time generation. App Router: `fetch` defaults to caching; use `export const revalidate = false` or `revalidate` values to control.
* **ISR (Incremental Static Regeneration):** static pages that revalidate after interval. Use `export const revalidate = 60` (seconds) in an app `page.js` or use `fetch(url, { next: { revalidate: 60 } })`.

Pages Router equivalents:

* `getServerSideProps` (SSR)
* `getStaticProps` + `revalidate` (SSG/ISR)

## 12. Styles in Next.js

Options:

* Global CSS: `styles/globals.css` (import in `app/layout.js`)
* CSS Modules: `Component.module.css`
* Tailwind CSS: utility-first framework (very common)
* styled-jsx: built-in scoped CSS for pages/components
* CSS-in-JS libraries: styled-components, emotion (require setup)

Example CSS Module:

```css
/* button.module.css */
.btn { padding: 8px 12px; }
```

```jsx
import styles from './button.module.css'
export default function Btn(){
  return <button className={styles.btn}>Click</button>
}
```

## 13. Caching in Next.js

Key caching concepts:

* **browser cache** (Cache-Control headers)
* **Next.js fetch caching**: `fetch(url, { next: { revalidate: 60 } })` to set ISR on fetch
* **Edge caching / CDN**: set `Cache-Control` headers in API responses or configure on platform
* **Middleware**: can modify caching behavior via headers

Example `fetch` with ISR:

```js
const res = await fetch('https://api.example.com/posts', { next: { revalidate: 120 }})
```

Setting cache headers in API response (Node):

```js
export async function GET(){
  return new Response(JSON.stringify(data), { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=120' }})
}
```

## 14. Best Practices & Security

* Keep secrets in env files, never commit `.env.*`.
* Use server-side checks for authorization-sensitive pages.
* Prefer prepared statements/ORM for DB access.
* Use `next/image` for optimized images.
* Validate and sanitize user input (server-side).
* Use HTTPS in production.

## 15. Deployment Tips

* Vercel is the reference platform with first-class Next.js support.
* For other platforms (Netlify, Render, AWS, DigitalOcean) ensure Node version and environment variables are set.
* Set proper `CACHE-CONTROL` and CDN settings for static assets.

---
