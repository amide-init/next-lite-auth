# LiteAuthProvider

React context provider that manages auth state for the entire app. Add it once to your root layout.

## Import

```ts
import { LiteAuthProvider } from "next-lite-auth/client";
```

## Usage

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

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Your app |
| `loginPath` | `string` | `"/api/auth/login"` | Login endpoint |
| `logoutPath` | `string` | `"/api/auth/logout"` | Logout endpoint |
| `mePath` | `string` | `"/api/auth/me"` | Session endpoint |

## Behavior

- Fetches `mePath` once on mount to restore session
- Provides `user`, `loading`, `login`, and `logout` to all children via context
- All `useLiteAuth` calls in children share the same state — no duplicate fetches
