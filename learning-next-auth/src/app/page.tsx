"use client";

import { login } from "@/src/lib/actions/auth";

export default function Home() {
  return (
    <div>
      <p>You Are Not Signed In</p>
      <button onClick={login}>Sign In With Github</button>
    </div>
  );
}
