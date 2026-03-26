export type User = {
  email: string;
  password: string;
  role?: string;
  name?: string;
};

export type PublicUser = Omit<User, "password">;

export type LiteAuthConfig = {
  users: User[];
  jwtSecret: string;
  cookieName?: string;
};

export type LiteAuthContext = {
  cookieName: string;
  jwtSecret: string;
  users: User[];
};
