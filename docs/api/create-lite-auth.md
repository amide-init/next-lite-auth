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

| Param | Type | Required | Default | Description |
|---|---|---|---|---|
| `users` | `User[]` | Yes | — | List of valid users. Use `usersFromEnv()` to load from env. |
| `jwtSecret` | `string` | Yes | — | Secret for signing JWTs |
| `cookieName` | `string` | No | `"lite-auth-token"` | Name of the httpOnly cookie |
| `enabled` | `boolean` | No | `true` | When `false`, disables all auth — middleware and handlers become no-ops |

## Example

```ts
// auth.ts
import { createLiteAuth, usersFromEnv } from "next-lite-auth";

export const { handlers, middleware, getUserFromCookies } = createLiteAuth({
  users: usersFromEnv(),
  jwtSecret: process.env.LITE_AUTH_SECRET!,
  enabled: process.env.LITE_AUTH_ENABLED !== "false",
});
```

```ts
// app/api/auth/[...liteauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

## usersFromEnv

A helper that reads the `LITE_AUTH_USERS` environment variable and parses it as a `User[]`. Throws a descriptive error if the variable is missing or invalid JSON.

```ts
import { createLiteAuth, usersFromEnv } from "next-lite-auth";
```

```bash
# .env.local
LITE_AUTH_USERS=[{"email":"admin@example.com","password":"secret","role":"admin"}]
```
