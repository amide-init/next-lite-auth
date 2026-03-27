# Client Hook

## Setup

Wrap your root layout with `LiteAuthProvider` once:

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

Then use `useLiteAuth` in any client component:

```tsx
"use client";
import { useLiteAuth } from "next-lite-auth/client";

export function Navbar() {
  const { user, loading, logout } = useLiteAuth();

  if (loading) return null;
  if (!user) return <a href="/login">Login</a>;

  return (
    <div>
      <span>{user.name ?? user.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## `useLiteAuth`

Returns the auth context value.

| Field | Type | Description |
|---|---|---|
| `user` | `PublicUser \| null` | Current user, or `null` if not authenticated |
| `loading` | `boolean` | `true` while the initial session fetch is in flight |
| `login(creds)` | `Promise<{ error?: string }>` | Logs in and updates state |
| `logout()` | `Promise<void>` | Clears cookie and sets user to `null` |

::: warning
`useLiteAuth` must be used inside `<LiteAuthProvider>`. Calling it outside will throw an error.
:::

## Custom API paths

If your route handlers are at a different path:

```tsx
<LiteAuthProvider
  loginPath="/api/auth/login"
  logoutPath="/api/auth/logout"
  mePath="/api/auth/me"
>
  {children}
</LiteAuthProvider>
```
