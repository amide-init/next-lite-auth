import { NextRequest, NextResponse } from "next/server";
import { LiteAuthContext } from "../core/types";
import { signToken, verifyToken } from "./jwt";

export function makeLoginHandler(ctx: LiteAuthContext) {
  return async function loginHandler(req: NextRequest): Promise<NextResponse> {
    let body: { email?: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = ctx.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...publicUser } = user;
    const token = await signToken(publicUser, ctx.jwtSecret);

    const res = NextResponse.json({ user: publicUser });
    res.cookies.set(ctx.cookieName, token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  };
}

export function makeLogoutHandler(ctx: LiteAuthContext) {
  return async function logoutHandler(_req: NextRequest): Promise<NextResponse> {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ctx.cookieName, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return res;
  };
}

export function makeMeHandler(ctx: LiteAuthContext) {
  return async function meHandler(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get(ctx.cookieName)?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await verifyToken(token, ctx.jwtSecret);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  };
}
