# Route Handlers

A single catch-all route file handles all auth endpoints automatically.

## Setup

```ts
// app/api/auth/[...liteauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Validate credentials, sign JWT, set cookie |
| `POST` | `/api/auth/logout` | Clear the auth cookie |
| `GET` | `/api/auth/me` | Return the current user from cookie |

## `POST /api/auth/login`

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

## `POST /api/auth/logout`

**Success (200):**
```json
{ "ok": true }
```

## `GET /api/auth/me`

**Success (200):**
```json
{ "user": { "email": "user@example.com", "name": "User", "role": "user" } }
```

**Unauthenticated (401):**
```json
{ "user": null }
```
