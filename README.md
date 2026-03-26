# next-lite-auth

Lightweight JWT auth for Next.js using static JSON users — no database required.

> **Not for production.** Designed for demos, OSS projects, internal tools, and quick Vercel deployments.

---

## Requirements

- Node.js >= 22
- Next.js >= 13
- React >= 18
- TypeScript

---

## Installation

```bash
npm install next-lite-auth jose
```

---

## Setup

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
  cookieName: "lite-auth-token", // optional, this is the default
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

### 3. Add middleware

```ts
// middleware.ts
import { auth } from "@/lib/auth";

export default auth.middleware({
  protect: ["/dashboard", "/settings"],
  redirectTo: "/login", // optional, default is "/login"
});

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

### 4. Use on the client

```tsx
"use client";

import { useLiteAuth } from "next-lite-auth/client";

export default function LoginPage() {
  const { user, loading, login, logout } = useLiteAuth();

  if (loading) return <p>Loading...</p>;

  if (user) {
    return (
      <div>
        <p>Hello, {user.name ?? user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const result = await login({
          email: form.email.value,
          password: form.password.value,
        });
        if (result.error) alert(result.error);
      }}
    >
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 5. Read user on the server

```ts
// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await auth.getUserFromCookies(cookies());
  return <p>Welcome, {user?.name}</p>;
}
```

---

## API Reference

### `createLiteAuth(config)`

| Option | Type | Required | Description |
|---|---|---|---|
| `users` | `User[]` | Yes | Hardcoded list of users |
| `jwtSecret` | `string` | Yes | Secret used to sign JWTs |
| `cookieName` | `string` | No | Cookie name (default: `"lite-auth-token"`) |

Returns `{ handlers, middleware, getUserFromCookies }`.

---

### `User` type

```ts
type User = {
  email: string;
  password: string;
  role?: string;
  name?: string;
};
```

---

### `auth.handlers`

| Handler | Method | Route |
|---|---|---|
| `login` | POST | `/api/auth/login` |
| `logout` | POST | `/api/auth/logout` |
| `me` | GET | `/api/auth/me` |

---

### `auth.middleware(options)`

| Option | Type | Default | Description |
|---|---|---|---|
| `protect` | `string[]` | — | Route prefixes to protect |
| `redirectTo` | `string` | `"/login"` | Where to redirect unauthenticated users |

Appends `?from=<pathname>` to the redirect URL.

---

### `auth.getUserFromCookies(cookies)`

Server-side helper. Accepts Next.js `cookies()` and returns the current `PublicUser` or `null`.

---

### `useLiteAuth(options?)`

Client hook. Fetches `/api/auth/me` on mount.

```ts
const { user, loading, login, logout } = useLiteAuth({
  loginPath: "/api/auth/login",   // optional
  logoutPath: "/api/auth/logout", // optional
  mePath: "/api/auth/me",         // optional
});
```

| Return | Type | Description |
|---|---|---|
| `user` | `PublicUser \| null` | Current authenticated user |
| `loading` | `boolean` | True while fetching session |
| `login(creds)` | `Promise<{ error?: string }>` | Logs in and sets user state |
| `logout()` | `Promise<void>` | Clears cookie and user state |

---

## Non-Goals

- OAuth / social login
- Signup / registration
- Password reset
- Role-based access control
- Production-grade security

---

## License

MIT
