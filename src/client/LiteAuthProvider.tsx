"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { PublicUser } from "../core/types";

type LiteAuthContextValue = {
  user: PublicUser | null;
  loading: boolean;
  login: (creds: { email: string; password: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
};

const LiteAuthContext = createContext<LiteAuthContextValue | null>(null);

type LiteAuthProviderProps = {
  children: ReactNode;
  loginPath?: string;
  logoutPath?: string;
  mePath?: string;
};

export function LiteAuthProvider({
  children,
  loginPath = "/api/auth/login",
  logoutPath = "/api/auth/logout",
  mePath = "/api/auth/me",
}: LiteAuthProviderProps) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(mePath)
      .then((r) => r.json())
      .then(({ user }) => setUser(user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [mePath]);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const res = await fetch(loginPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error ?? "Login failed" };
      setUser(data.user);
      return {};
    },
    [loginPath]
  );

  const logout = useCallback(async () => {
    await fetch(logoutPath, { method: "POST" });
    setUser(null);
  }, [logoutPath]);

  return (
    <LiteAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </LiteAuthContext.Provider>
  );
}

export function useLiteAuth(): LiteAuthContextValue {
  const ctx = useContext(LiteAuthContext);
  if (!ctx) throw new Error("useLiteAuth must be used inside <LiteAuthProvider>");
  return ctx;
}
