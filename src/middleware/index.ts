import { NextRequest, NextResponse } from "next/server";
import { LiteAuthContext } from "../core/types";
import { verifyToken } from "../server/jwt";

type MiddlewareOptions = {
  protect: (string | RegExp)[];
  redirectTo?: string;
};

export function makeMiddleware(ctx: LiteAuthContext) {
  return function middleware(options: MiddlewareOptions) {
    return async function (req: NextRequest): Promise<NextResponse> {
      if (!ctx.enabled) return NextResponse.next();
      const { protect, redirectTo = "/login" } = options;
      const { pathname } = req.nextUrl;

      const isProtected = protect.some((pattern) =>
        pattern instanceof RegExp
          ? pattern.test(pathname)
          : pattern === "/" || pathname === pattern || pathname.startsWith(pattern + "/")
      );

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
