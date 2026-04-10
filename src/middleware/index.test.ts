import { describe, it, expect, vi, beforeEach } from "vitest";
import { makeMiddleware } from "./index";
import { signToken } from "../server/jwt";
import type { LiteAuthContext } from "../core/types";

const JWT_SECRET = "test-secret";

const ctx: LiteAuthContext = {
  enabled: true,
  cookieName: "token",
  jwtSecret: JWT_SECRET,
  users: [],
};

function makeReq(pathname: string, token?: string) {
  return {
    nextUrl: { pathname },
    cookies: {
      get: (name: string) =>
        name === ctx.cookieName && token ? { value: token } : undefined,
    },
    url: `http://localhost${pathname}`,
  } as any;
}

function isRedirect(res: Response) {
  return res.status === 307 || res.status === 302 || res.headers.get("location") !== null;
}

describe("makeMiddleware — disabled", () => {
  it("passes through all requests when disabled", async () => {
    const middleware = makeMiddleware({ ...ctx, enabled: false })({
      protect: ["/dashboard"],
    });
    const res = await middleware(makeReq("/dashboard"));
    expect(isRedirect(res)).toBe(false);
  });
});

describe("makeMiddleware — string patterns", () => {
  const middleware = makeMiddleware(ctx)({
    protect: ["/dashboard", "/admin"],
  });

  it("redirects unauthenticated request on exact match", async () => {
    const res = await middleware(makeReq("/dashboard"));
    expect(isRedirect(res)).toBe(true);
  });

  it("redirects unauthenticated request on prefix match", async () => {
    const res = await middleware(makeReq("/dashboard/settings"));
    expect(isRedirect(res)).toBe(true);
  });

  it("allows request on unprotected route", async () => {
    const res = await middleware(makeReq("/about"));
    expect(isRedirect(res)).toBe(false);
  });

  it("allows authenticated request on protected route", async () => {
    const token = await signToken({ email: "user@test.com" }, JWT_SECRET);
    const res = await middleware(makeReq("/dashboard", token));
    expect(isRedirect(res)).toBe(false);
  });

  it("redirects request with invalid token", async () => {
    const res = await middleware(makeReq("/dashboard", "invalid-token"));
    expect(isRedirect(res)).toBe(true);
  });

  it("includes ?from= param in redirect URL", async () => {
    const res = await middleware(makeReq("/dashboard"));
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("from=%2Fdashboard");
  });

  it("redirects to custom redirectTo path", async () => {
    const mw = makeMiddleware(ctx)({
      protect: ["/secret"],
      redirectTo: "/sign-in",
    });
    const res = await mw(makeReq("/secret"));
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("/sign-in");
  });
});

describe("makeMiddleware — RegExp patterns", () => {
  const middleware = makeMiddleware(ctx)({
    protect: [/^\/[^/]+\/name$/],
  });

  it("redirects /abc/name (matches regex)", async () => {
    const res = await middleware(makeReq("/abc/name"));
    expect(isRedirect(res)).toBe(true);
  });

  it("redirects /123/name (matches regex)", async () => {
    const res = await middleware(makeReq("/123/name"));
    expect(isRedirect(res)).toBe(true);
  });

  it("allows /abc/other (no match)", async () => {
    const res = await middleware(makeReq("/abc/other"));
    expect(isRedirect(res)).toBe(false);
  });

  it("allows /abc/name/extra (no full match)", async () => {
    const res = await middleware(makeReq("/abc/name/extra"));
    expect(isRedirect(res)).toBe(false);
  });

  it("allows authenticated request matching regex", async () => {
    const token = await signToken({ email: "user@test.com" }, JWT_SECRET);
    const res = await middleware(makeReq("/abc/name", token));
    expect(isRedirect(res)).toBe(false);
  });
});

describe("makeMiddleware — mixed string and RegExp patterns", () => {
  const middleware = makeMiddleware(ctx)({
    protect: ["/dashboard", /^\/[^/]+\/name$/],
  });

  it("protects string pattern /dashboard", async () => {
    const res = await middleware(makeReq("/dashboard"));
    expect(isRedirect(res)).toBe(true);
  });

  it("protects regexp pattern /abc/name", async () => {
    const res = await middleware(makeReq("/abc/name"));
    expect(isRedirect(res)).toBe(true);
  });

  it("allows unmatched route", async () => {
    const res = await middleware(makeReq("/home"));
    expect(isRedirect(res)).toBe(false);
  });
});
