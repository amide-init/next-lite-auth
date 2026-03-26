# middleware

`auth.middleware(options)` returns a Next.js middleware function.

## Signature

```ts
auth.middleware(options: {
  protect: string[];
  redirectTo?: string;
}) => (req: NextRequest) => Promise<NextResponse>
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `protect` | `string[]` | — | Pathname prefixes to protect |
| `redirectTo` | `string` | `"/login"` | Redirect destination for unauthenticated requests |

## Behavior

- Routes **not** in `protect` pass through
- Routes in `protect` require a valid JWT cookie
- Unauthenticated: redirects to `redirectTo?from=<pathname>`

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
