# useLiteAuth

Client-side React hook for session management.

## Import

```ts
import { useLiteAuth } from "next-lite-auth/client";
```

## Signature

```ts
function useLiteAuth(options?: {
  loginPath?: string;   // default: "/api/auth/login"
  logoutPath?: string;  // default: "/api/auth/logout"
  mePath?: string;      // default: "/api/auth/me"
}): {
  user: PublicUser | null;
  loading: boolean;
  login: (creds: { email: string; password: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}
```

## Return values

| Field | Type | Description |
|---|---|---|
| `user` | `PublicUser \| null` | Authenticated user, or `null` |
| `loading` | `boolean` | `true` while the initial `/me` fetch is in flight |
| `login` | `Function` | Submits credentials and updates state |
| `logout` | `Function` | Clears the cookie and sets `user` to `null` |

## `login` return value

```ts
{ error?: string }
```

An empty object `{}` means success. `{ error: "..." }` means failure.

## Example

```tsx
"use client";
import { useLiteAuth } from "next-lite-auth/client";

export function AuthButton() {
  const { user, loading, login, logout } = useLiteAuth();

  if (loading) return null;

  if (user) {
    return <button onClick={logout}>Logout</button>;
  }

  return (
    <button onClick={() => login({ email: "admin@example.com", password: "secret" })}>
      Login
    </button>
  );
}
```
