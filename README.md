# next-lite-auth

Lightweight JWT auth for Next.js using static JSON users — no database required.

**[Documentation](https://amide-init.github.io/next-lite-auth/)**

> **Not for production.** Designed for demos, OSS projects, internal tools, and quick Vercel deployments.

---

## Requirements

- Node.js >= 20
- Next.js >= 13
- React >= 18
- TypeScript

---

## Installation

```bash
pnpm add next-lite-auth
```

---

## Setup in 3 steps

### 1. Create `auth.ts` at your project root

```ts
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

`auth.ts` is safe to commit — credentials live only in `.env.local`.

### 2. Add one route file

```ts
// app/api/auth/[...liteauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

### 3. Wrap root layout

```tsx
// app/layout.tsx
import { LiteAuthProvider } from "next-lite-auth/client";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LiteAuthProvider protect={["/dashboard", "/settings"]}>
          {children}
        </LiteAuthProvider>
      </body>
    </html>
  );
}
```

**Done.** Visiting a protected route while logged out automatically shows the built-in login UI. After login, the original page renders instantly — no redirects, no separate login page needed.

---

## OSS-friendly: toggle auth via env

If you ship an OSS project using next-lite-auth, your users can enable or disable auth with a single env variable — no code changes needed:

```bash
# Disable auth (open access)
LITE_AUTH_ENABLED=false

# Enable auth
LITE_AUTH_ENABLED=true
LITE_AUTH_USERS=[{"email":"admin@example.com","password":"secret"}]
LITE_AUTH_SECRET=your-secret
```

---

## Optional: server-side middleware

```ts
// middleware.ts
import { middleware } from "@/auth";
export default middleware({ protect: ["/dashboard", "/settings"] });

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

---

## Use anywhere

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

```ts
// Server Component
import { cookies } from "next/headers";
import { getUserFromCookies } from "@/auth";

const user = await getUserFromCookies(cookies());
```

---

## API

| Export | Description |
|---|---|
| `createLiteAuth(config)` | Factory — returns `handlers`, `middleware`, `getUserFromCookies` |
| `usersFromEnv()` | Reads `LITE_AUTH_USERS` env var and returns `User[]` |
| `handlers.GET / POST` | Catch-all route handlers |
| `middleware(options)` | Edge middleware for server-side route protection |
| `getUserFromCookies(cookies)` | Server-side session helper |
| `LiteAuthProvider` | Root provider — manages session and auto-shows login UI |
| `useLiteAuth()` | Hook — `user`, `loading`, `login`, `logout` |

---

## License

MIT
