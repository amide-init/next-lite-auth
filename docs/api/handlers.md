# handlers

Three Next.js route handler functions returned from `createLiteAuth`.

## `auth.handlers.login`

```ts
POST /api/auth/login
Content-Type: application/json

{ "email": string, "password": string }
```

- Validates credentials against the users config
- On success: signs a JWT, sets an httpOnly cookie, returns `{ user: PublicUser }`
- On failure: returns `{ error: string }` with status `401`

## `auth.handlers.logout`

```ts
POST /api/auth/logout
```

- Clears the auth cookie (`maxAge: 0`)
- Returns `{ ok: true }`

## `auth.handlers.me`

```ts
GET /api/auth/me
```

- Reads the JWT from the cookie
- Returns `{ user: PublicUser }` on success
- Returns `{ user: null }` with status `401` if missing or invalid

## Route setup

```ts
// app/api/auth/login/route.ts
import { auth } from "@/lib/auth";
export const POST = auth.handlers.login;

// app/api/auth/logout/route.ts
import { auth } from "@/lib/auth";
export const POST = auth.handlers.logout;

// app/api/auth/me/route.ts
import { auth } from "@/lib/auth";
export const GET = auth.handlers.me;
```
