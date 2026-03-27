import { NextRequest, NextResponse } from "next/server";
import { LiteAuthContext } from "../core/types";
import { signToken, verifyToken } from "./jwt";

export function makeHandlers(ctx: LiteAuthContext) {
  async function login(req: NextRequest): Promise<NextResponse> {
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
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  async function logout(_req: NextRequest): Promise<NextResponse> {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ctx.cookieName, "", { httpOnly: true, path: "/", maxAge: 0 });
    return res;
  }

  async function me(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get(ctx.cookieName)?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 401 });
    const user = await verifyToken(token, ctx.jwtSecret);
    if (!user) return NextResponse.json({ user: null }, { status: 401 });
    return NextResponse.json({ user });
  }

  async function GET(req: NextRequest): Promise<NextResponse> {
    const action = req.nextUrl.pathname.split("/").pop();
    if (action === "me") return me(req);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  async function POST(req: NextRequest): Promise<NextResponse> {
    const action = req.nextUrl.pathname.split("/").pop();
    if (action === "login") return login(req);
    if (action === "logout") return logout(req);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return { GET, POST };
}
