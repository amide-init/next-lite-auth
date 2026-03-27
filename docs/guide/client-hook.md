# Client Hook

## Setup

Wrap your root layout with `LiteAuthProvider` and pass the routes you want to protect:

```tsx
// app/layout.tsx
import { LiteAuthProvider } from "next-lite-auth/client";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LiteAuthProvider protect={["/dashboard", "/settings", "/admin"]}>
          {children}
        </LiteAuthProvider>
      </body>
    </html>
  );
}
```

When a user visits a protected route without being logged in, the built-in login UI appears automatically. After login, the original page renders — no redirect needed.

---

## `useLiteAuth`

Use the hook in any client component to access auth state:

```tsx
"use client";
import { useLiteAuth } from "next-lite-auth/client";

export function Navbar() {
  const { user, loading, logout } = useLiteAuth();

  if (loading) return null;
  if (!user) return null;

  return (
    <div>
      <span>{user.name ?? user.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Return values

| Field | Type | Description |
|---|---|---|
| `user` | `PublicUser \| null` | Current user, or `null` if not authenticated |
| `loading` | `boolean` | `true` while the initial session fetch is in flight |
| `login(creds)` | `Promise<{ error?: string }>` | Logs in and updates state |
| `logout()` | `Promise<void>` | Clears cookie and sets user to `null` |

::: warning
`useLiteAuth` must be used inside `<LiteAuthProvider>`. Calling it outside will throw an error.
:::
