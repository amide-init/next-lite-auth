# LiteLoginPage

## Preview

<LoginPreview appName="Acme Corp" />


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
  appName="Acme Corp"
  title="Welcome back"
  description="Sign in to your account"
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `appName` | `string` | — | App name displayed above the title |
| `title` | `string` | `"Sign in"` | Card heading |
| `description` | `string` | `"Enter your credentials to continue"` | Card subheading |

## Styling

The login page uses inline styles — no CSS framework required. It works out of the box in any Next.js project.
