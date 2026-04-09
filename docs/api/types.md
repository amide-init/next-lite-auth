# Types

All types are exported from `next-lite-auth`.

```ts
import type { User, PublicUser, LiteAuthConfig } from "next-lite-auth";
```

## `User`

The shape of a user entry in your config.

```ts
type User = {
  email: string;
  password: string;
  role?: string;
  name?: string;
};
```

## `PublicUser`

The user shape returned from the JWT — password is stripped.

```ts
type PublicUser = Omit<User, "password">;
// { email: string; role?: string; name?: string }
```

## `LiteAuthConfig`

The config object accepted by `createLiteAuth`.

```ts
type LiteAuthConfig = {
  users: User[];
  jwtSecret: string;
  cookieName?: string;
  enabled?: boolean;
};
```
