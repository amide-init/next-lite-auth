import { defineConfig } from "vitepress";

export default defineConfig({
  title: "next-lite-auth",
  description: "Lightweight JWT auth for Next.js using static JSON users — no database required.",
  base: "/next-lite-auth/",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/create-lite-auth" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Configuration", link: "/guide/configuration" },
          { text: "Route Handlers", link: "/guide/route-handlers" },
          { text: "Middleware", link: "/guide/middleware" },
          { text: "Client Hook", link: "/guide/client-hook" },
          { text: "Server Utilities", link: "/guide/server-utilities" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "createLiteAuth", link: "/api/create-lite-auth" },
          { text: "handlers", link: "/api/handlers" },
          { text: "middleware", link: "/api/middleware" },
          { text: "useLiteAuth", link: "/api/use-lite-auth" },
          { text: "getUserFromCookies", link: "/api/get-user-from-cookies" },
          { text: "Types", link: "/api/types" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/aminuddin/next-lite-auth" },
    ],
    footer: {
      message: "Released under the MIT License.",
    },
  },
});
