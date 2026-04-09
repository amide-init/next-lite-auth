import { User } from "./types";

export function usersFromEnv(): User[] {
  const raw = process.env.LITE_AUTH_USERS;

  if (!raw) {
    throw new Error(
      "[next-lite-auth] LITE_AUTH_USERS environment variable is not set. " +
        "Set it to a JSON array of users, e.g.: " +
        'LITE_AUTH_USERS=\'[{"email":"admin@example.com","password":"secret"}]\''
    );
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(
      "[next-lite-auth] LITE_AUTH_USERS is not valid JSON. " +
        "Expected a JSON array of users."
    );
  }

  if (!Array.isArray(parsed)) {
    throw new Error(
      "[next-lite-auth] LITE_AUTH_USERS must be a JSON array, e.g.: " +
        '[{"email":"admin@example.com","password":"secret"}]'
    );
  }

  return parsed as User[];
}
