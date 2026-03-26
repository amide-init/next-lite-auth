# Server Utilities

## `auth.getUserFromCookies(cookies)`

Reads and verifies the JWT from Next.js cookies, returning the current user or `null`. Useful in Server Components and Server Actions.

## Usage in a Server Component

```ts
// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await auth.getUserFromCookies(cookies());

  if (!user) redirect("/login");

  return <p>Welcome, {user.name ?? user.email}</p>;
}
```

## Usage in a Server Action

```ts
// app/actions.ts
"use server";

import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export async function getProfile() {
  const user = await auth.getUserFromCookies(cookies());
  if (!user) throw new Error("Unauthorized");
  return user;
}
```

## Returns

`PublicUser | null` — the decoded user payload from the JWT, or `null` if the cookie is missing or the token is invalid/expired.
