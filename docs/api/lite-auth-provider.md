# LiteAuthProvider

React context provider that manages auth state and automatically renders the built-in login UI on protected routes.

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
        <LiteAuthProvider protect={["/dashboard", "/settings"]}>
          {children}
        </LiteAuthProvider>
      </body>
    </html>
  );
}
```

## How it works

1. On mount, fetches `/api/auth/me` to restore session
2. Checks the current pathname against `protect`
3. If the user is **not logged in** and the route is **protected** → renders the built-in `<LiteLoginPage>` automatically
4. After login, `user` state updates → children render immediately, no redirect needed
5. All `useLiteAuth()` calls in children share the same state

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Your app |
| `protect` | `string[]` | `[]` | Route prefixes that require authentication |
| `loginPath` | `string` | `"/api/auth/login"` | Login endpoint |
| `logoutPath` | `string` | `"/api/auth/logout"` | Logout endpoint |
| `mePath` | `string` | `"/api/auth/me"` | Session endpoint |
