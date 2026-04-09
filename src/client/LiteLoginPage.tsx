"use client";

import { CSSProperties, FormEvent, useState } from "react";
import { useLiteAuth } from "./LiteAuthProvider";

type LiteLoginPageProps = {
  title?: string;
  description?: string;
};

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "0 16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    textAlign: "center",
  },
  title: {
    margin: "0 0 4px",
    fontSize: "22px",
    fontWeight: 600,
    color: "#111827",
    letterSpacing: "-0.01em",
  },
  description: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  },
  error: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "13px",
    color: "#dc2626",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#374151",
  },
  input: {
    height: "36px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    padding: "0 12px",
    fontSize: "14px",
    color: "#111827",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  inputFocus: {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
  },
  button: {
    height: "36px",
    width: "100%",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  buttonDisabled: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  footer: {
    textAlign: "center",
    fontSize: "12px",
    color: "#9ca3af",
  },
  link: {
    color: "#6b7280",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
};

export function LiteLoginPage({
  title = "Sign in",
  description = "Enter your credentials to continue",
}: LiteLoginPageProps) {
  const { login } = useLiteAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const result = await login({
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.description}>{description}</p>
        </div>

        <div style={styles.card}>
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                style={{
                  ...styles.input,
                  ...(focusedField === "email" ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  ...styles.input,
                  ...(focusedField === "password" ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p style={styles.footer}>
          Powered by{" "}
          <a
            href="https://github.com/amide-init/next-lite-auth"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            next-lite-auth
          </a>
        </p>
      </div>
    </div>
  );
}
