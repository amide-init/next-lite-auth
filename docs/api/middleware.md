# middleware

`auth.middleware(options)` returns a Next.js middleware function.

## Signature

```ts
auth.middleware(options: {
  protect: (string | RegExp)[];
  nonProtected?: (string | RegExp)[];
  redirectTo?: string;
}) => (req: NextRequest) => Promise<NextResponse>
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `protect` | `(string \| RegExp)[]` | — | Pathnames or patterns to protect |
| `nonProtected` | `(string \| RegExp)[]` | `[]` | Pathnames or patterns that are always public, even if matched by `protect` |
| `redirectTo` | `string` | `"/login"` | Redirect destination for unauthenticated requests |

## Behavior

- Routes in `nonProtected` always pass through — checked before `protect`
- Routes **not** in `protect` pass through
- Routes in `protect` require a valid JWT cookie
- Unauthenticated: redirects to `redirectTo?from=<pathname>`
- String `"/"` protects all routes
- Strings match exact paths and their prefixes (e.g. `"/dashboard"` also matches `"/dashboard/settings"`)
- RegExp patterns match dynamically (e.g. `/^\/[^/]+\/name$/` matches `/:id/name`)

## Example

```ts
// middleware.ts
import { auth } from "@/lib/auth";

export default auth.middleware({
  protect: ["/dashboard", "/admin"],
  redirectTo: "/login",
});

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
```

## Protect all routes

```ts
export default auth.middleware({
  protect: ["/"],
});
```

## Protect all routes except public pages

Use `nonProtected` to carve out public routes from a broad `protect` rule:

```ts
export default auth.middleware({
  protect: ["/"],
  nonProtected: ["/docs", "/privacy-policy", "/terms"],
});
```

`nonProtected` is checked first, so `/docs` and `/privacy-policy` are never redirected — even when `protect` covers all routes.

## Protect dynamic routes

```ts
export default auth.middleware({
  protect: ["/dashboard", /^\/[^/]+\/name$/],
});
```
