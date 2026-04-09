---
layout: home

hero:
  name: next-lite-auth
  text: Lightweight JWT auth for Next.js
  tagline: No database. No complexity. Just users, a secret, and a cookie.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/create-lite-auth

features:
  - title: Zero Database
    details: Users are defined in config as plain JSON. No ORM, no migrations, no connection strings.
  - title: Edge Compatible
    details: Uses jose for JWT signing and verification — works in Next.js middleware on the Edge runtime.
  - title: Minimal Setup
    details: One factory function wires everything together. Add route handlers and middleware in minutes.
  - title: TypeScript First
    details: Fully typed API with exported types for User, PublicUser, and LiteAuthConfig.
  - title: OSS Ready
    details: Load users and secrets from environment variables. Let your users toggle auth on or off without touching code.
---

<LoginPreview />
