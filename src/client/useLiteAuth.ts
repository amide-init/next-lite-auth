"use client";

import { useState, useEffect, useCallback } from "react";
import { PublicUser } from "../core/types";

type LiteAuthState = {
  user: PublicUser | null;
  loading: boolean;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type UseLiteAuthReturn = LiteAuthState & {
  login: (credentials: LoginCredentials) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
};

type UseLiteAuthOptions = {
  loginPath?: string;
  logoutPath?: string;
  mePath?: string;
};

export function useLiteAuth(options: UseLiteAuthOptions = {}): UseLiteAuthReturn {
  const {
    loginPath = "/api/auth/login",
    logoutPath = "/api/auth/logout",
    mePath = "/api/auth/me",
  } = options;

  const [state, setState] = useState<LiteAuthState>({ user: null, loading: true });

  useEffect(() => {
    fetch(mePath)
      .then((r) => r.json())
      .then(({ user }) => setState({ user: user ?? null, loading: false }))
      .catch(() => setState({ user: null, loading: false }));
  }, [mePath]);

  const login = useCallback(
    async ({ email, password }: LoginCredentials) => {
      const res = await fetch(loginPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error ?? "Login failed" };
      setState({ user: data.user, loading: false });
      return {};
    },
    [loginPath]
  );

  const logout = useCallback(async () => {
    await fetch(logoutPath, { method: "POST" });
    setState({ user: null, loading: false });
  }, [logoutPath]);

  return { ...state, login, logout };
}
