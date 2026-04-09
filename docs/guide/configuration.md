# Configuration

## `createLiteAuth(config)`

The factory accepts a single config object.

| Option | Type | Required | Default | Description |
|---|---|---|---|---|
| `users` | `User[]` | Yes | — | List of valid users. Use `usersFromEnv()` to load from env. |
| `jwtSecret` | `string` | Yes | — | Secret used to sign and verify JWTs |
| `cookieName` | `string` | No | `"lite-auth-token"` | Name of the httpOnly cookie |
| `enabled` | `boolean` | No | `true` | When `false`, auth is disabled — all routes are open and handlers are no-ops |

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

| Variable | Description |
|---|---|
| `LITE_AUTH_SECRET` | Secret for signing JWTs. Always required when auth is enabled. |
| `LITE_AUTH_USERS` | JSON array of users. Used by `usersFromEnv()`. |
| `LITE_AUTH_ENABLED` | Set to `"false"` to disable auth entirely. |

Generate a strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Example

```ts
// auth.ts
import { createLiteAuth, usersFromEnv } from "next-lite-auth";

export const auth = createLiteAuth({
  users: usersFromEnv(),
  jwtSecret: process.env.LITE_AUTH_SECRET!,
  enabled: process.env.LITE_AUTH_ENABLED !== "false",
  cookieName: "my-app-session", // optional
});
```

```bash
# .env.local
LITE_AUTH_SECRET=your-long-random-secret-here
LITE_AUTH_ENABLED=true
LITE_AUTH_USERS=[{"email":"admin@example.com","password":"hunter2","role":"admin","name":"Admin"}]
```

## Disabling auth

Set `LITE_AUTH_ENABLED=false` to open all routes without touching code. Useful for OSS projects where the deploying user may not need auth.

| | When `enabled: false` |
|---|---|
| Middleware | Passes all requests through |
| `POST /login` | Returns `{ ok: true }` (no-op) |
| `POST /logout` | Returns `{ ok: true }` (no-op) |
| `GET /me` | Returns `{ user: null }` |
