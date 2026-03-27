# createLiteAuth

The main factory function. Call it once in `auth.ts` and export the result.

## Signature

```ts
function createLiteAuth(config: LiteAuthConfig): {
  handlers: {
    GET: (req: NextRequest) => Promise<NextResponse>;
    POST: (req: NextRequest) => Promise<NextResponse>;
  };
  middleware: (options: MiddlewareOptions) => (req: NextRequest) => Promise<NextResponse>;
  getUserFromCookies: (cookies: ReadonlyRequestCookies) => Promise<PublicUser | null>;
}
```

## Parameters

| Param | Type | Required | Description |
|---|---|---|---|
| `users` | `User[]` | Yes | Hardcoded user list |
| `jwtSecret` | `string` | Yes | Secret for signing JWTs |
| `cookieName` | `string` | No | Cookie name (default: `"lite-auth-token"`) |

## Example

```ts
// auth.ts
import { createLiteAuth } from "next-lite-auth";

export const { handlers, middleware, getUserFromCookies } = createLiteAuth({
  users: [
    { email: "admin@example.com", password: "secret", role: "admin", name: "Admin" },
  ],
  jwtSecret: process.env.JWT_SECRET!,
});
```

```ts
// app/api/auth/[...liteauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```
