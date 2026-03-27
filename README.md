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
- Tailwind CSS + shadcn/ui (for built-in login UI)

---

## Installation

```bash
pnpm add next-lite-auth jose
```

---

## Setup in 3 steps

### 1. Create `auth.ts` at your project root

```ts
import { createLiteAuth } from "next-lite-auth";

export const { handlers, middleware, getUserFromCookies } = createLiteAuth({
  users: [
    { email: "admin@example.com", password: "secret", role: "admin", name: "Admin" },
  ],
  jwtSecret: process.env.JWT_SECRET!,
});
```

```bash
# .env.local
JWT_SECRET=your-random-secret-here
```

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

## Tailwind setup

Add the library to your Tailwind `content` config so login UI styles are included:

```ts
// tailwind.config.ts
content: [
  "./app/**/*.{ts,tsx}",
  "./node_modules/next-lite-auth/dist/**/*.{js,mjs}",
]
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
| `handlers.GET / POST` | Catch-all route handlers |
| `middleware(options)` | Edge middleware for server-side route protection |
| `getUserFromCookies(cookies)` | Server-side session helper |
| `LiteAuthProvider` | Root provider — manages session and auto-shows login UI |
| `useLiteAuth()` | Hook — `user`, `loading`, `login`, `logout` |

---

## License

MIT
