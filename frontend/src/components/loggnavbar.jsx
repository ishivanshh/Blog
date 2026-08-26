import React from "react";
import { Link } from "react-router-dom";

// Same tokens as the rest of the Awwwards-themed YOURSPACE components.
const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  faint: "#eeeeec",
  hairline: "#d6d6d3",
  accent: "#e3ff4f",
};

const fonts = {
  mono: "'Space Mono', monospace",
};

const LEFT_LINKS = [
  { label: "HOME", to: "/dashboard" },
  { label: "EXPLORE", to: "/explore" },
];

export default function NavbarCentered({ active = "/home", avatarUrl, onProfileClick }) {
  return (
    <header
      className="relative z-10 grid grid-cols-2 md:grid-cols-3 items-center gap-y-3 px-5 sm:px-8 md:px-14 py-5 md:py-6"
      style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.hairline}` }}
    >
      {/* Left: primary nav */}
      <nav className="flex items-center gap-6 sm:gap-8">
        {LEFT_LINKS.map((item) => {
          const isActive = item.to === active;
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: "0.1em",
                color: isActive ? colors.ink : colors.muted,
                borderBottom: isActive ? `2px solid ${colors.accent}` : "none",
                paddingBottom: 4,
                fontWeight: isActive ? 700 : 400,
              }}
              className="hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Center: wordmark — hidden on the smallest screens to avoid
          crowding, reappears once there's room at md. */}
      <Link
        to="/dashboard"
        className="hidden md:flex justify-center"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", color: colors.ink }}
      >
        YOURSPACE
      </Link>

      {/* Right: start writing + profile */}
      <div className="flex items-center justify-end gap-4 sm:gap-6">
        <Link
          to="/myblog"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 hover:opacity-90 transition-opacity"
          style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", fontWeight: 700, backgroundColor: colors.accent, color: colors.ink }}
        >
          MY BLOGS
        </Link>
        <Link
  to="/profile"
  aria-label="Profile"
  className="w-9 h-9 rounded-full bg-cover bg-center shrink-0 inline-flex items-center justify-center"
  style={{
    backgroundImage: avatarUrl ? `url('${avatarUrl}')` : undefined,
    backgroundColor: colors.faint,
    border: `1px solid ${colors.hairline}`,
  }}
>
  {!avatarUrl && (
    <span
      className="material-symbols-outlined flex items-center justify-center"
      style={{ fontSize: 18, color: colors.muted }}
    >
      person
    </span>
  )}
</Link>
      </div>

      {/* Mobile-only: logo shown inline on the left row when centered
          slot is hidden, so the brand is still visible under md. */}
      <Link
        to="/home"
        className="md:hidden col-span-2 flex justify-center order-last"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em", color: colors.ink, marginTop: 8 }}
      >
        YOURSPACE
      </Link>
    </header>
  );
}