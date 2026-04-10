# Getting Started

## Requirements

- Node.js >= 20
- Next.js >= 13
- React >= 18
- TypeScript

## Installation

```bash
pnpm add next-lite-auth
```

---

## Setup in 3 steps

### 1. Create `auth.ts` at your project root

```ts
// auth.ts
import { createLiteAuth, usersFromEnv } from "next-lite-auth";

export const { handlers, middleware, getUserFromCookies } = createLiteAuth({
  users: usersFromEnv(),
  jwtSecret: process.env.LITE_AUTH_SECRET!,
  enabled: process.env.LITE_AUTH_ENABLED !== "false",
});
```

```bash
# .env.local
LITE_AUTH_SECRET=your-random-secret-here
LITE_AUTH_ENABLED=true
LITE_AUTH_USERS=[{"email":"admin@example.com","password":"secret","role":"admin","name":"Admin"}]
```

Generate a strong secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 2. Add one route file

```ts
// app/api/auth/[...liteauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

---

### 3. Wrap root layout with `LiteAuthProvider`

Because `layout.tsx` is a **Server Component** by default, you cannot import `LiteAuthProvider` directly — doing so triggers a `createContext` error at module evaluation time, before any rendering happens.

Instead, create a thin client wrapper:

```tsx
// components/auth-provider.tsx
'use client'

import { LiteAuthProvider } from 'next-lite-auth/client'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <LiteAuthProvider protect={["/dashboard", "/settings"]}>
      {children}
    </LiteAuthProvider>
  )
}
```

Then use `AuthProvider` in your layout:

```tsx
// app/layout.tsx  ← Server Component, no 'use client'
import { AuthProvider } from '@/components/auth-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
```

**That's it.** When a user visits a protected route without being logged in, the built-in login UI appears automatically.

<LoginPreview appName="Acme Corp" />

After login, the original page renders — no redirects, no separate login page needed.

---

## Optional: server-side middleware

Add middleware to also protect routes on the server side (recommended):

```ts
// middleware.ts
import { middleware } from "@/auth";
export default middleware({ protect: ["/dashboard", "/settings"] });

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

---

## Use `useLiteAuth` anywhere

```tsx
"use client";
import { useLiteAuth } from "next-lite-auth/client";

export function Navbar() {
  const { user, logout } = useLiteAuth();
  if (!user) return null;
  return (
    <div>
      <span>{user.name ?? user.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Read user on the server

```ts
// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { getUserFromCookies } from "@/auth";

export default async function DashboardPage() {
  const user = await getUserFromCookies(cookies());
  return <h1>Welcome, {user?.name}</h1>;
}
```

::: tip
Store `LITE_AUTH_SECRET` and `LITE_AUTH_USERS` in `.env.local` and never commit them to source control.
:::

::: warning Not for production
next-lite-auth stores passwords in plaintext config. It is designed for demos, internal tools, and quick prototypes — not for user-facing production systems.
:::
