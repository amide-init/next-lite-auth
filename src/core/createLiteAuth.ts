import { LiteAuthConfig, LiteAuthContext } from "./types";
import { makeHandlers, getUserFromCookies } from "../server";
import { makeMiddleware } from "../middleware";

export function createLiteAuth(config: LiteAuthConfig) {
  const ctx: LiteAuthContext = {
    users: config.users,
    jwtSecret: config.jwtSecret,
    cookieName: config.cookieName ?? "lite-auth-token",
  };

  return {
    handlers: makeHandlers(ctx),
    middleware: makeMiddleware(ctx),
    getUserFromCookies: getUserFromCookies(ctx),
  };
}
