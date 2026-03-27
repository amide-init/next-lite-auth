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
pnpm add next-lite-auth jose
```

---

## Setup in 5 minutes

### 1. Create `auth.ts` at your project root

```ts
// auth.ts
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

### 3. Add middleware

```ts
// middleware.ts
import { middleware } from "@/auth";
export default middleware({ protect: ["/dashboard"] });

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

### 4. Wrap root layout

```tsx
// app/layout.tsx
import { LiteAuthProvider } from "next-lite-auth/client";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LiteAuthProvider>{children}</LiteAuthProvider>
      </body>
    </html>
  );
}
```

### 5. Use anywhere

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

### Read user on the server

```ts
// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { getUserFromCookies } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserFromCookies(cookies());
  if (!user) redirect("/login");
  return <h1>Welcome, {user.name}</h1>;
}
```

---

## API Reference

| Export | Description |
|---|---|
| `createLiteAuth(config)` | Factory — returns `handlers`, `middleware`, `getUserFromCookies` |
| `handlers.GET` | Catch-all GET handler (me) |
| `handlers.POST` | Catch-all POST handler (login, logout) |
| `middleware(options)` | Edge middleware for route protection |
| `getUserFromCookies(cookies)` | Server-side session helper |
| `LiteAuthProvider` | React context provider (client) |
| `useLiteAuth()` | React hook — user, loading, login, logout (client) |

---

## Non-Goals

- OAuth / social login
- Signup / registration
- Password reset
- Production-grade security

---

## License

MIT
