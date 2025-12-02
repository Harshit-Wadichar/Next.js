// app/component/SessionWrapper.tsx
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: do NOT put spaces around {children} — that creates a text node
  return <SessionProvider>{children}</SessionProvider>;
}
