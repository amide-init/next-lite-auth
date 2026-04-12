import { NextRequest, NextResponse } from "next/server";
import { LiteAuthContext } from "../core/types";
import { verifyToken } from "../server/jwt";
import { matchesProtect } from "../core/matchesProtect";

type MiddlewareOptions = {
  protect: (string | RegExp)[];
  nonProtected?: (string | RegExp)[];
  redirectTo?: string;
};

export function makeMiddleware(ctx: LiteAuthContext) {
  return function middleware(options: MiddlewareOptions) {
    return async function (req: NextRequest): Promise<NextResponse> {
      if (!ctx.enabled) return NextResponse.next();
      const { protect, nonProtected = [], redirectTo = "/login" } = options;
      const { pathname } = req.nextUrl;

      if (nonProtected.length > 0 && matchesProtect(nonProtected, pathname)) {
        return NextResponse.next();
      }

      const isProtected = matchesProtect(protect, pathname);

      if (!isProtected) {
        return NextResponse.next();
      }

      const token = req.cookies.get(ctx.cookieName)?.value;
      if (token) {
        const user = await verifyToken(token, ctx.jwtSecret);
        if (user) return NextResponse.next();
      }

      const loginUrl = new URL(redirectTo, req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    };
  };
}
