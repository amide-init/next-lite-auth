# Route Handlers

`auth.handlers` provides three ready-to-use Next.js route handlers.

## Setup

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

## `login` — POST `/api/auth/login`

Accepts a JSON body with `email` and `password`. Validates against the users config, signs a JWT, and sets an httpOnly cookie.

**Request body:**
```json
{ "email": "user@example.com", "password": "secret" }
```

**Success (200):**
```json
{ "user": { "email": "user@example.com", "name": "User", "role": "user" } }
```

**Error (401):**
```json
{ "error": "Invalid credentials" }
```

## `logout` — POST `/api/auth/logout`

Clears the auth cookie by setting its `maxAge` to 0.

**Success (200):**
```json
{ "ok": true }
```

## `me` — GET `/api/auth/me`

Reads and verifies the JWT from the cookie, returning the current user.

**Success (200):**
```json
{ "user": { "email": "user@example.com", "name": "User", "role": "user" } }
```

**Unauthenticated (401):**
```json
{ "user": null }
```
