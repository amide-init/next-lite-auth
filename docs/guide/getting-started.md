# Getting Started

## Requirements

- Node.js >= 20
- Next.js >= 13
- React >= 18
- TypeScript

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

That's it — login, logout, and me are all handled automatically.

---

### 3. Add middleware

```ts
// middleware.ts
import { middleware } from "@/auth";
export default middleware({ protect: ["/dashboard"] });

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

---

### 4. Wrap root layout with `LiteAuthProvider`

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

---

### 5. Use `useLiteAuth` anywhere

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

---

::: tip
Store your `jwtSecret` in `.env.local` and never commit it to source control.
:::

::: warning Not for production
next-lite-auth stores passwords in plaintext config. It is designed for demos, internal tools, and quick prototypes — not for user-facing production systems.
:::
