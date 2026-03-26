# Middleware

`auth.middleware(options)` returns a Next.js middleware function that protects routes by verifying the JWT cookie.

## Setup

```ts
// middleware.ts
import { auth } from "@/lib/auth";

export default auth.middleware({
  protect: ["/dashboard", "/settings", "/admin"],
  redirectTo: "/login", // optional, default is "/login"
});

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `protect` | `string[]` | — | Route prefixes to protect |
| `redirectTo` | `string` | `"/login"` | Where to redirect unauthenticated users |

## How it works

1. Checks if the current `pathname` starts with any value in `protect`
2. If not protected — passes the request through
3. If protected — reads and verifies the JWT from the cookie
4. Valid token → passes through
5. Invalid or missing token → redirects to `redirectTo?from=<pathname>`

The `?from=` query param lets you redirect back after login:

```ts
// app/login/page.tsx
const searchParams = useSearchParams();
const from = searchParams.get("from") ?? "/dashboard";
// after successful login:
router.push(from);
```
