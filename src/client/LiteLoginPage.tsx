"use client";

import { CSSProperties, FormEvent, useState } from "react";
import { useLiteAuth } from "./LiteAuthProvider";

type LiteLoginPageProps = {
  appName?: string;
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
  appName: {
    margin: "0 0 8px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#6366f1",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
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
    border: "1px solid #6366f1",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordToggle: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    color: "#9ca3af",
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

const darkModeCSS = `
  @media (prefers-color-scheme: dark) {
    .lite-auth-page { background-color: #09090b !important; }
    .lite-auth-appname { color: #818cf8 !important; }
    .lite-auth-title { color: #fafafa !important; }
    .lite-auth-desc { color: #a1a1aa !important; }
    .lite-auth-card {
      background-color: #18181b !important;
      border-color: #27272a !important;
      box-shadow: none !important;
    }
    .lite-auth-error {
      background-color: rgba(239,68,68,0.1) !important;
      border-color: rgba(239,68,68,0.3) !important;
      color: #f87171 !important;
    }
    .lite-auth-label { color: #e4e4e7 !important; }
    .lite-auth-input {
      background-color: transparent !important;
      border-color: #3f3f46 !important;
      color: #fafafa !important;
    }
    .lite-auth-input::placeholder { color: #52525b !important; }
    .lite-auth-input:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.2) !important;
    }
    .lite-auth-btn {
      background-color: #fafafa !important;
      color: #09090b !important;
    }
    .lite-auth-footer { color: #52525b !important; }
    .lite-auth-link { color: #71717a !important; }
    .lite-auth-pw-toggle { color: #52525b !important; }
  }
`;

export function LiteLoginPage({
  appName,
  title = "Sign in",
  description = "Enter your credentials to continue",
}: LiteLoginPageProps) {
  const { login } = useLiteAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    <>
      <style>{darkModeCSS}</style>
      <div className="lite-auth-page" style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            {appName && <p className="lite-auth-appname" style={styles.appName}>{appName}</p>}
            <h1 className="lite-auth-title" style={styles.title}>{title}</h1>
            <p className="lite-auth-desc" style={styles.description}>{description}</p>
          </div>

          <div className="lite-auth-card" style={styles.card}>
            {error && (
              <div className="lite-auth-error" style={styles.error}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={styles.field}>
                <label htmlFor="email" className="lite-auth-label" style={styles.label}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="lite-auth-input"
                  style={{
                    ...styles.input,
                    ...(focusedField === "email" ? styles.inputFocus : {}),
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="password" className="lite-auth-label" style={styles.label}>Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="lite-auth-input"
                    style={{
                      ...styles.input,
                      paddingRight: "36px",
                      ...(focusedField === "password" ? styles.inputFocus : {}),
                    }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="lite-auth-pw-toggle"
                    style={styles.passwordToggle}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="lite-auth-btn"
                style={{
                  ...styles.button,
                  ...(loading ? styles.buttonDisabled : {}),
                }}
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>

          <p className="lite-auth-footer" style={styles.footer}>
            Powered by{" "}
            <a
              href="https://github.com/amide-init/next-lite-auth"
              target="_blank"
              rel="noopener noreferrer"
              className="lite-auth-link"
              style={styles.link}
            >
              next-lite-auth
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
