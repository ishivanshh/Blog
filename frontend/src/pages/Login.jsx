import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";

// Awwwards-editorial theme: white/cream ground, giant faint serif
// wordmark as texture, monospace uppercase labels, hairline underlines,
// lime-yellow accent action.
const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  faint: "#eeeeec",
  hairline: "#d6d6d3",
  card: "#dcdcda",
  accent: "#e3ff4f",
};

const fonts = {
  display: "'Fraunces', serif",
  mono: "'Space Mono', monospace",
};

function Wordmark() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center"
      style={{ zIndex: 0 }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: "min(38vw, 420px)",
          color: colors.ink,
          opacity: 0.04,
          writingMode: "vertical-rl",
          whiteSpace: "nowrap",
          transform: "rotate(180deg)",
          lineHeight: 1,
        }}
      >
        YOURSPACE
      </span>
    </div>
  );
}

function MonoLabel({ children }) {
  return (
    <label
      className="block mb-1"
      style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.14em", color: colors.muted }}
    >
      {children}
    </label>
  );
}

function UnderlineField({ label, type, value, onChange, error, showToggle, visible, onToggle }) {
  return (
    <div className="mb-7">
      <MonoLabel>{label}</MonoLabel>
      <div className="flex items-center border-b" style={{ borderColor: error ? "#c23b3b" : colors.hairline }}>
        <input
          type={showToggle ? (visible ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent py-2 focus:outline-none"
          style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="pl-2"
            style={{ color: colors.muted, fontFamily: fonts.mono, fontSize: 11 }}
          >
            {visible ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) next.email = "Required.";
    if (!password) next.password = "Required.";
    setErrors(next);

    if (Object.keys(next).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await loginUser({ email: trimmedEmail, password });
      const accessToken = response.data?.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrors({
        form: error.response?.data?.message || "Unable to authenticate. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden antialiased" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <Wordmark />

      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-14 py-6">
        <span style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: "0.14em", color: colors.muted }}>
          YOURSPACE
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
          01 / AUTH
        </span>
      </header>

      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 sm:px-8 md:px-14 pt-10 pb-20 items-center lg:min-h-[80vh]">
        {/* Left: editorial copy */}
        <div className="max-w-lg">
          <h1
            className="mb-6"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.01em" }}
          >
            Enter
            <br />
            the Space.
          </h1>
          <p style={{ fontFamily: fonts.display, fontSize: 18, lineHeight: 1.6, color: colors.muted, maxWidth: 420 }}>
            A new standard in editorial expression. Access your curated universe of avant-garde thought.
          </p>
          <div className="mt-10 w-10 border-t" style={{ borderColor: colors.ink }} />
        </div>

        {/* Right: auth card */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-95 p-6 sm:p-8" style={{ backgroundColor: colors.card }}>
            <form onSubmit={handleSubmit} noValidate>
                <p className="mb-8" style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: "0.14em", color: colors.ink, borderBottom: `1px solid ${colors.hairline}`, paddingBottom: 10 }}>
                  AUTHENTICATION
                </p>

                {errors.form && (
                  <p className="mb-6" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
                    {errors.form}
                  </p>
                )}

                <UnderlineField label="EMAIL ADDRESS" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                <UnderlineField
                  label="PASSWORD"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  showToggle
                  visible={showPw}
                  onToggle={() => setShowPw(!showPw)}
                />

                <div className="flex items-center justify-between mb-10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-3.5 h-3.5"
                      style={{ accentColor: colors.ink }}
                    />
                    <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted }}>Remember Me</span>
                  </label>
                  <a href="/notfound" className="hover:underline" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted }}>
                    Reset Access
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-between px-5 py-4 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.accent, color: colors.ink, opacity: isSubmitting ? 0.6 : 1 }}
                >
                  <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>{isSubmitting ? "AUTHENTICATING..." : "AUTHENTICATE"}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 15 }}>→</span>
                </button>

                <p className="text-center mt-8" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted }}>
                  Uninitiated?{" "}
                  <a href="/signup" className="hover:underline" style={{ color: colors.ink }}>
                    Create an Acoount
                  </a>
                </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-5 sm:px-8 md:px-14 py-6" style={{ borderTop: `1px solid ${colors.hairline}` }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.14em", color: colors.muted }}>
          EDITORIAL STANDARDS. DEFINED.
        </span>
      </footer>
    </div>
  );
}