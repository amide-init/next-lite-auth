# getUserFromCookies

Server-side helper to get the current user from Next.js cookies.

## Signature

```ts
auth.getUserFromCookies(
  cookies: ReadonlyRequestCookies
): Promise<PublicUser | null>
```

## Parameters

| Param | Type | Description |
|---|---|---|
| `cookies` | `ReadonlyRequestCookies` | Result of `cookies()` from `next/headers` |

## Returns

`PublicUser | null` — the decoded user from the JWT, or `null` if unauthenticated or token is invalid.

## Examples

**Server Component:**
```ts
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

const user = await auth.getUserFromCookies(cookies());
```

**Server Action:**
```ts
"use server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export async function getCurrentUser() {
  return auth.getUserFromCookies(cookies());
}
```
