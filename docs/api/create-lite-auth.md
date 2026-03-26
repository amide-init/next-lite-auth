# createLiteAuth

The main factory function. Call it once and export the result.

## Signature

```ts
function createLiteAuth(config: LiteAuthConfig): {
  handlers: {
    login: (req: NextRequest) => Promise<NextResponse>;
    logout: (req: NextRequest) => Promise<NextResponse>;
    me: (req: NextRequest) => Promise<NextResponse>;
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
import { createLiteAuth } from "next-lite-auth";

export const auth = createLiteAuth({
  users: [
    { email: "admin@example.com", password: "secret", role: "admin" },
  ],
  jwtSecret: process.env.JWT_SECRET!,
});
```
