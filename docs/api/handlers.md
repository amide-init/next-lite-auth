# handlers

`auth.handlers` returns `{ GET, POST }` — a pair of Next.js route handler functions for a catch-all route.

## Usage

```ts
// app/api/auth/[...liteauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

## Routing

The handlers dispatch based on the last URL segment:

| Method | Segment | Action |
|---|---|---|
| `GET` | `me` | Return current user from JWT cookie |
| `POST` | `login` | Validate credentials, sign JWT, set cookie |
| `POST` | `logout` | Clear auth cookie |

## Signature

```ts
type Handlers = {
  GET: (req: NextRequest) => Promise<NextResponse>;
  POST: (req: NextRequest) => Promise<NextResponse>;
};
```
