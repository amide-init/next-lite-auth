import { SignJWT, jwtVerify } from "jose";
import { PublicUser } from "../core/types";

function getSecret(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function signToken(user: PublicUser, secret: string): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret(secret));
}

export async function verifyToken(token: string, secret: string): Promise<PublicUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(secret));
    return payload as unknown as PublicUser;
  } catch {
    return null;
  }
}
