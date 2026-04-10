# Middleware

Middleware provides **server-side** route protection. It runs on the Edge before the page renders, preventing unauthenticated users from even reaching protected routes.

::: tip
`LiteAuthProvider` already handles **client-side** protection automatically. Middleware is optional but recommended for stronger security.
:::

## Setup

```ts
// middleware.ts
import { middleware } from "@/auth";

export default middleware({
  protect: ["/dashboard", "/settings", "/admin"],
});

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `protect` | `(string \| RegExp)[]` | — | Pathnames or patterns to protect |
| `redirectTo` | `string` | `"/login"` | Where to redirect unauthenticated users |

## How it works

1. Checks if the current `pathname` matches any value in `protect`
2. If not protected — passes the request through
3. If protected — reads and verifies the JWT cookie
4. Valid token → passes through
5. Invalid or missing token → redirects to `redirectTo`

## Protect all routes

Use `"/"` to lock every page:

```ts
export default middleware({
  protect: ["/"],
});
```

## Protect dynamic routes

Use a `RegExp` for dynamic segments:

```ts
export default middleware({
  protect: ["/dashboard", /^\/[^/]+\/name$/],
});
```

This protects `/dashboard`, `/dashboard/settings`, and any `/:id/name` route.

## Client-side vs server-side protection

| | `LiteAuthProvider` | Middleware |
|---|---|---|
| Where it runs | Browser | Edge (server) |
| How it protects | Renders login UI instead of children | Redirects before page loads |
| Required | Yes | Optional |
| Setup | `protect` prop | `middleware.ts` file |

Use both together for the best experience.
