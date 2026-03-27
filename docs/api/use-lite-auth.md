# useLiteAuth

React hook that reads auth state from the nearest `<LiteAuthProvider>`.

## Import

```ts
import { useLiteAuth } from "next-lite-auth/client";
```

## Signature

```ts
function useLiteAuth(): {
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

## Example

```tsx
"use client";
import { useLiteAuth } from "next-lite-auth/client";

export function AuthButton() {
  const { user, loading, login, logout } = useLiteAuth();

  if (loading) return null;

  if (user) {
    return <button onClick={logout}>Logout ({user.email})</button>;
  }

  return (
    <button onClick={() => login({ email: "admin@example.com", password: "secret" })}>
      Login
    </button>
  );
}
```

::: warning
Must be used inside `<LiteAuthProvider>`. Throws if called outside.
:::

## See also

- [LiteAuthProvider](/api/lite-auth-provider) — the context provider required by this hook
