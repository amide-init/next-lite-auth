# Getting Started

## Requirements

- Node.js >= 22
- Next.js >= 13
- React >= 18
- TypeScript

## Installation

```bash
npm install next-lite-auth jose
```

## Quick Setup

### 1. Create your auth instance

```ts
// lib/auth.ts
import { createLiteAuth } from "next-lite-auth";

export const auth = createLiteAuth({
  users: [
    { email: "admin@example.com", password: "secret", role: "admin", name: "Admin" },
    { email: "user@example.com", password: "pass123", role: "user", name: "User" },
  ],
  jwtSecret: process.env.JWT_SECRET!,
});
```

### 2. Add route handlers

```ts
// app/api/auth/login/route.ts
import { auth } from "@/lib/auth";
export const POST = auth.handlers.login;

// app/api/auth/logout/route.ts
import { auth } from "@/lib/auth";
export const POST = auth.handlers.logout;

// app/api/auth/me/route.ts
import { auth } from "@/lib/auth";
export const GET = auth.handlers.me;
```

### 3. Protect routes with middleware

```ts
// middleware.ts
import { auth } from "@/lib/auth";

export default auth.middleware({
  protect: ["/dashboard", "/settings"],
});

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

### 4. Add the client hook

```tsx
"use client";
import { useLiteAuth } from "next-lite-auth/client";

export default function Page() {
  const { user, loading, login, logout } = useLiteAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <button onClick={() => login({ email: "...", password: "..." })}>Login</button>;
  return <button onClick={logout}>Logout ({user.email})</button>;
}
```

::: tip
Store your `jwtSecret` in `.env.local` and never commit it to source control.
:::

::: warning Not for production
next-lite-auth stores passwords in plaintext config. It is designed for demos, internal tools, and quick prototypes — not for user-facing production systems.
:::
