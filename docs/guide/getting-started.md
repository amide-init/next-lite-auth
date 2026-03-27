# Getting Started

## Requirements

- Node.js >= 20
- Next.js >= 13
- React >= 18
- TypeScript
- Tailwind CSS + shadcn/ui (for built-in login UI)

## Installation

```bash
pnpm add next-lite-auth jose
```

---

## Setup in 3 steps

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

---

### 3. Wrap root layout with `LiteAuthProvider`

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

**That's it.** When a user visits a protected route without being logged in, the built-in login UI appears automatically:

<LoginPreview />
 After login, the original page renders — no redirects, no separate login page needed.

---

## Tailwind setup

The built-in login UI uses shadcn/ui Tailwind CSS variables. You need to tell Tailwind to scan the library's dist files so the styles are not purged.

### Tailwind v4 (no config file)

Add this to your global CSS file (`app/globals.css`):

```css
@source "../node_modules/next-lite-auth/dist";
```

### Tailwind v3 (tailwind.config.ts)

```ts
// tailwind.config.ts
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/next-lite-auth/dist/**/*.{js,mjs}", // ← add this
  ],
};
```

Not sure which version you have? Run:
```bash
pnpm list tailwindcss
```

::: tip
The login UI uses shadcn/ui CSS variables (`bg-primary`, `bg-card`, `text-muted-foreground`, etc.) so your existing shadcn theme is applied automatically.
:::

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
Store your `jwtSecret` in `.env.local` and never commit it to source control.
:::

::: warning Not for production
next-lite-auth stores passwords in plaintext config. It is designed for demos, internal tools, and quick prototypes — not for user-facing production systems.
:::
