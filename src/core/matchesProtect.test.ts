import { describe, it, expect } from "vitest";
import { matchesProtect } from "./matchesProtect";

describe("matchesProtect — protect all routes ('/')", () => {
  const protect = ["/"];

  it("matches /", () => expect(matchesProtect(protect, "/")).toBe(true));
  it("matches /about", () => expect(matchesProtect(protect, "/about")).toBe(true));
  it("matches /dashboard", () => expect(matchesProtect(protect, "/dashboard")).toBe(true));
  it("matches /abc/name", () => expect(matchesProtect(protect, "/abc/name")).toBe(true));
  it("matches deeply nested /a/b/c/d", () => expect(matchesProtect(protect, "/a/b/c/d")).toBe(true));
});

describe("matchesProtect — string pattern", () => {
  const protect = ["/dashboard"];

  it("matches exact /dashboard", () => expect(matchesProtect(protect, "/dashboard")).toBe(true));
  it("matches prefix /dashboard/settings", () => expect(matchesProtect(protect, "/dashboard/settings")).toBe(true));
  it("does not match /about", () => expect(matchesProtect(protect, "/about")).toBe(false));
  it("does not match /dashboardextra (no slash)", () => expect(matchesProtect(protect, "/dashboardextra")).toBe(false));
});

describe("matchesProtect — RegExp /:id/name", () => {
  const protect = [/^\/[^/]+\/name$/];

  it("matches /abc/name", () => expect(matchesProtect(protect, "/abc/name")).toBe(true));
  it("matches /123/name", () => expect(matchesProtect(protect, "/123/name")).toBe(true));
  it("matches /user-id_99/name", () => expect(matchesProtect(protect, "/user-id_99/name")).toBe(true));
  it("does not match /abc/other", () => expect(matchesProtect(protect, "/abc/other")).toBe(false));
  it("does not match /abc/name/extra", () => expect(matchesProtect(protect, "/abc/name/extra")).toBe(false));
  it("does not match /name (missing id)", () => expect(matchesProtect(protect, "/name")).toBe(false));
});

describe("matchesProtect — protect all + /:id/name", () => {
  const protect = ["/", /^\/[^/]+\/name$/];

  it("matches /", () => expect(matchesProtect(protect, "/")).toBe(true));
  it("matches /abc/name", () => expect(matchesProtect(protect, "/abc/name")).toBe(true));
  it("matches /random-page", () => expect(matchesProtect(protect, "/random-page")).toBe(true));
});

describe("matchesProtect — empty protect list", () => {
  it("matches nothing", () => {
    expect(matchesProtect([], "/dashboard")).toBe(false);
    expect(matchesProtect([], "/")).toBe(false);
  });
});
