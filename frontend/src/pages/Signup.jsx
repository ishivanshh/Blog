import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  faint: "#eeeeec",
  hairline: "#d6d6d3",
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
      className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-end"
      style={{ zIndex: 0 }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: "min(22vw, 260px)",
          color: colors.ink,
          opacity: 0.035,
          whiteSpace: "nowrap",
          lineHeight: 1,
          transform: "translateX(6%)",
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

function UnderlineField({ label, type, value, onChange, error, showToggle, visible, onToggle, prefix }) {
  return (
    <div className="mb-8">
      <MonoLabel>{label}</MonoLabel>
      <div className="flex items-center border-b" style={{ borderColor: error ? "#c23b3b" : colors.hairline }}>
        {prefix && (
          <span style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted }}>{prefix}</span>
        )}
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

export default function Signup() {
  // const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) next.name = "Required.";
    if (!trimmedUsername) next.username = "Required.";
    else if (!/^[a-zA-Z0-9_]{3,20}$/.test(trimmedUsername)) next.username = "3–20 chars: letters, numbers, _.";
    if (!trimmedEmail) next.email = "Required.";
    if (password.length < 8) next.password = "Min. 8 characters.";
    setErrors(next);

    if (Object.keys(next).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await registerUser({
        fullName: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      });
      const accessToken = response.data?.accessToken;
      const user = response.data?.user;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrors({
        form: error.response?.data?.message || "Unable to create your account. Please try again.",
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
          02 / REGISTER
        </span>
      </header>

      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 sm:px-8 md:px-14 pt-10 pb-20 lg:min-h-[80vh]">
        {/* Left: editorial copy */}
        <div className="max-w-lg">
          <h1
            className="mb-6"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(38px, 5.5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.01em" }}
          >
            YOURSPACE
          </h1>
          <p style={{ fontFamily: fonts.display, fontSize: 18, lineHeight: 1.6, color: colors.muted, maxWidth: 420 }}>
            Join the vanguard of digital expression. Where avant-garde design meets uncompromising narrative depth.
          </p>
          <div className="mt-16 hidden lg:block">
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.14em", color: colors.muted }}>
              EDITORIAL STANDARDS. DEFINED.
            </span>
          </div>
        </div>

        {/* Right: form */}
        <div className="w-full max-w-105">
          <p style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, marginBottom: 32, color: colors.muted, opacity: 0.9 }}>
            Create Account
          </p>

          <form onSubmit={handleSubmit} noValidate>
              {errors.form && (
                <p className="mb-6" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
                  {errors.form}
                </p>
              )}


              <UnderlineField label="FULL NAME" type="text" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
              <UnderlineField label="USERNAME" type="text" prefix="@" value={username} onChange={(e) => setUsername(e.target.value)} error={errors.username} />
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-between px-5 py-4 mt-4 border hover:bg-black hover:text-white transition-colors"
                style={{ borderColor: colors.accent, color: colors.ink, backgroundColor: "transparent", opacity: isSubmitting ? 0.6 : 1 }}
              >
                <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>
                  {isSubmitting ? "INITIALIZING..." : "INITIALIZE PROFILE"}
                </span>
                <span style={{ fontFamily: fonts.mono, fontSize: 15 }}>→</span>
              </button>

              <p className="mt-8" style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.04em", color: colors.muted, lineHeight: 1.7 }}>
                BY PROCEEDING, YOU ACKNOWLEDGE AGREEMENT TO THE{" "}
                <a href="#" className="hover:underline" style={{ color: colors.ink }}>
                  GUIDELINES
                </a>{" "}
                AND{" "}
                <a href="#" className="hover:underline" style={{ color: colors.ink }}>
                  TERMS OF ACCESS.
                </a>
              </p>
              <p className="mt-2" style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.04em", color: colors.muted }}>
                EXISTING ENTITY?{" "}
                <a href="/login" className="hover:underline" style={{ color: colors.ink }}>
                  AUTHENTICATE HERE.
                </a>
              </p>
          </form>
        </div>
      </main>
    </div>
  );
}
