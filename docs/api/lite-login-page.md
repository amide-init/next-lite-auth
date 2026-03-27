# LiteLoginPage

## Preview

<LoginPreview />


The built-in login UI rendered automatically by `LiteAuthProvider` when a user visits a protected route without being authenticated. You do not need to use this component directly.

## Automatic rendering

`LiteAuthProvider` renders `LiteLoginPage` automatically — no setup required:

```tsx
<LiteAuthProvider protect={["/dashboard"]}>
  {children}
</LiteAuthProvider>
```

When `/dashboard` is visited without a session, the login UI appears. After a successful login, the original page renders immediately.

## Manual use

If you need to render the login UI manually (e.g. in a modal or custom layout):

```tsx
import { LiteLoginPage } from "next-lite-auth/client";

<LiteLoginPage
  title="Welcome back"
  description="Sign in to your account"
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Sign in"` | Card heading |
| `description` | `string` | `"Enter your credentials to continue"` | Card subheading |

## Tailwind requirement

Uses shadcn/ui CSS variables (`bg-primary`, `bg-card`, `text-muted-foreground`, etc.). Your existing shadcn theme is applied automatically.

**Tailwind v4** — add to `app/globals.css`:
```css
@source "../node_modules/next-lite-auth/dist";
```

**Tailwind v3** — add to `tailwind.config.ts`:
```ts
content: [
  "./app/**/*.{ts,tsx}",
  "./node_modules/next-lite-auth/dist/**/*.{js,mjs}",
]
```
