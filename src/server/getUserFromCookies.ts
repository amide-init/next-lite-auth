import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LiteAuthContext, PublicUser } from "../core/types";
import { verifyToken } from "./jwt";

export function getUserFromCookies(ctx: LiteAuthContext) {
  return async function (cookies: ReadonlyRequestCookies): Promise<PublicUser | null> {
    const token = cookies.get(ctx.cookieName)?.value;
    if (!token) return null;
    return verifyToken(token, ctx.jwtSecret);
  };
}
