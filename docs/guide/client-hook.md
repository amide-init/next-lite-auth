# Client Hook

`useLiteAuth` is a React hook for managing auth state on the client side.

## Import

```ts
import { useLiteAuth } from "next-lite-auth/client";
```

::: tip
`next-lite-auth/client` is a separate entry point to keep server-only code out of your client bundle.
:::

## Usage

```tsx
"use client";

import { useLiteAuth } from "next-lite-auth/client";

export default function LoginPage() {
  const { user, loading, login, logout } = useLiteAuth();

  if (loading) return <p>Loading...</p>;

  if (user) {
    return (
      <div>
        <p>Welcome, {user.name ?? user.email}</p>
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
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Return values

| Field | Type | Description |
|---|---|---|
| `user` | `PublicUser \| null` | Current user, or `null` if not authenticated |
| `loading` | `boolean` | `true` while fetching `/api/auth/me` on mount |
| `login(creds)` | `Promise<{ error?: string }>` | Submits credentials, sets user state on success |
| `logout()` | `Promise<void>` | Calls logout endpoint and clears user state |

## Options

```ts
const auth = useLiteAuth({
  loginPath: "/api/auth/login",   // default
  logoutPath: "/api/auth/logout", // default
  mePath: "/api/auth/me",         // default
});
```

Override paths if your route handlers live at different URLs.
