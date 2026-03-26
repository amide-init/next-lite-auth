# CLAUDE.md

## Project

**next-lite-auth** — Lightweight JWT auth for Next.js using static JSON users (no database).

---

## Purpose

Provide a simple authentication layer for:

* demos
* OSS projects
* internal tools
* quick Vercel deployments

---

## Not for Production

This library is NOT intended for secure, production-grade authentication.

---

## Core Idea

* Users are defined in config (hardcoded JSON)
* Login returns JWT
* JWT stored in cookies
* Middleware protects routes
* Client hook reads current user

---

## Public API

### Create Auth

```ts
const auth = createLiteAuth({
  users: User[],
  jwtSecret: string,
  cookieName?: string
});
```

---

### Handlers

```ts
auth.handlers.login
auth.handlers.logout
auth.handlers.me
```

Used in Next.js route handlers.

---

### Middleware

```ts
auth.middleware({
  protect: string[]
});
```

Protects routes by verifying JWT.

---

### Server Utility

```ts
auth.getUserFromCookies(cookies)
```

Returns user from request cookies.

---

### Client Hook

```ts
const { user, loading, login, logout } = useLiteAuth();
```

---

## User Shape

```ts
type User = {
  email: string;
  password: string;
  role?: string;
  name?: string;
};
```

---

## Flow

### Login

* Validate email/password
* Generate JWT
* Set cookie

### Request

* Middleware verifies token
* Allows or redirects

### Client

* `/api/auth/me` returns user
* Hook stores user state

---

## Structure

```
src/
  core/
  server/
  client/
  middleware/
index.ts
```

---

## Principles

* No database
* Minimal setup
* Small bundle
* Predictable behavior

---

## Non-Goals

* OAuth
* Signup system
* Password reset
* Complex auth flows

---

## Notes

* Prefer `jose` (edge-friendly)
* Keep dependencies minimal
* Optimize for developer experience

---
