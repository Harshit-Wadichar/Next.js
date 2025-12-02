# Next.js — Server Components vs Client Components

This README explains **which components should be server** and **which should be client** in Next.js (App Router). It gives simple rules, examples, and best practices so you can decide quickly.

---

## Quick summary

* **Server Components (default in app/)**

  * Run on the server.
  * Good for data fetching, SEO, and rendering HTML fast.
  * Don't have access to browser-only APIs (e.g., `window`, `localStorage`).
  * Can use secrets and server-side resources (databases, private APIs).

* **Client Components**

  * Run in the browser.
  * Required for interactivity: event handlers, `useState`, `useEffect`, and browser APIs.
  * Must start with the `"use client"` directive at the top of the file.

---

## Short rules (easy)

1. If a component **needs React state, effects, event handlers, or browser APIs** → **make it a Client Component**.
2. If a component **only renders UI from server data** (no interactivity) → **keep it as a Server Component** (default).
3. Keep **most components as Server Components** for performance. Use Client Components only where necessary.
4. You can render Client Components *inside* Server Components to add interactivity.

---

## Comparison table

| Feature / Need                                      |       Server Component | Client Component             |
| --------------------------------------------------- | ---------------------: | :--------------------------- |
| Default behavior in `app/`                          |            ✅ (default) | ❌ (opt-in)                   |
| Use of `useState` / `useEffect`                     |                      ❌ | ✅                            |
| Event handlers (onClick, etc.)                      |                      ❌ | ✅                            |
| Browser APIs (`window`, `document`, `localStorage`) |                      ❌ | ✅                            |
| Access to secrets / DB connections                  |                      ✅ | ❌                            |
| SEO & fast HTML                                     |                      ✅ | depends                      |
| Bundle size impact                                  | smaller server bundles | increases client bundle size |

---

## Examples

### Server Component (default — no `use client`)

```jsx
// app/components/UserList.jsx
export default async function UserList() {
  // safe to call server APIs, databases, and secret keys here
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### Client Component (interactive — must use `use client`)

```jsx
// app/components/LikeButton.jsx
"use client";
import { useState } from 'react';

export default function LikeButton({ initial = false }) {
  const [liked, setLiked] = useState(initial);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? 'Liked' : 'Like'}
    </button>
  );
}
```

### Using a Client Component inside a Server Component

```jsx
// app/page.jsx  (Server Component by default)
import UserList from './components/UserList';
import LikeButton from './components/LikeButton';

export default async function Page() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();

  return (
    <main>
      <h1>Users</h1>
      <UserList />
      {/* Client component can be used for small interactive parts */}
      <LikeButton initial={false} />
    </main>
  );
}
```

---

## Practical guidelines & best practices

* **Prefer Server Components** for most UI: pages, lists, headers, footers, layouts — anything that can be server-rendered.
* **Use Client Components sparingly** for interactive widgets: forms with client state, inputs with instant validation, animation, drag & drop, real-time subscriptions (unless handled via server streaming), and third-party UI libs that require the DOM.
* **Keep client components small**. If only a small part of the page needs interactivity, isolate it into a tiny client component to avoid large client bundles.
* **Server-only work belongs on server components or API routes**: database queries, secret keys, heavy computation, and secure third-party calls.
* **Styling**: Both components can use CSS Modules, Tailwind, or styled systems. Styling itself doesn't force a component to be client-side.
* **Data fetching**: In app router, server components can `await fetch()` directly. Use query options (revalidate) as needed. Client components should call client-side fetches (e.g., `useEffect`) or use a client data library.

---

## Common gotchas

* `"use client"` must be the **first line** in the file. Otherwise Next.js will error.
* Converting a big Server Component to Client increases bundle size and may hurt performance — prefer splitting.
* Server Components cannot use hooks like `useState` or browser APIs.

---

## Quick checklist for each component

* Does it use `useState`, `useEffect`, or event handlers? → Client
* Does it need `window`, `document`, or `localStorage`? → Client
* Does it access database or require server secrets? → Server
* Is it pure rendering from server data and good for SEO? → Server

---
