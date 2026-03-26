# Configuration

## `createLiteAuth(config)`

The factory accepts a single config object.

| Option | Type | Required | Default | Description |
|---|---|---|---|---|
| `users` | `User[]` | Yes | — | List of valid users |
| `jwtSecret` | `string` | Yes | — | Secret used to sign and verify JWTs |
| `cookieName` | `string` | No | `"lite-auth-token"` | Name of the httpOnly cookie |

## User shape

```ts
type User = {
  email: string;
  password: string;
  role?: string;
  name?: string;
};
```

You can extend user objects with any additional fields — they will be included in the JWT payload and returned from `/api/auth/me`.

## Environment variables

```bash
# .env.local
JWT_SECRET=your-long-random-secret-here
```

Generate a strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Example

```ts
import { createLiteAuth } from "next-lite-auth";

export const auth = createLiteAuth({
  users: [
    { email: "admin@example.com", password: "hunter2", role: "admin", name: "Admin" },
  ],
  jwtSecret: process.env.JWT_SECRET!,
  cookieName: "my-app-session",
});
```
