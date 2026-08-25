import React from "react";
import { Link } from "react-router-dom";

// Same tokens as the rest of the Awwwards-themed YOURSPACE pages
// (Home / Login / Signup / NotFound / Write). Keep in sync if the
// palette or type scale changes.
const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  hairline: "#d6d6d3",
  accent: "#e3ff4f",
};

const fonts = {
  mono: "'Space Mono', monospace",
};

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "EXPLORE", to: "/explore" },
  { label: "CATEGORIES", to: "/notfound" },
  { label: "WRITE", to: "/writeblog" },
];

/**
 * Props:
 * - active: string — matches a NAV_LINKS "to" value to underline it.
 * - authed: boolean — if true, shows an avatar instead of Login/Signup.
 * - avatarUrl: string — background image for the avatar when authed.
 */
export default function Navbar({ active = "/home", authed = false, avatarUrl }) {
  return (
    <header
      className="relative z-10 flex flex-wrap items-center justify-between gap-y-3 px-5 sm:px-8 md:px-14 py-5 md:py-6"
      style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.hairline}` }}
    >
      <Link to="/home" style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: "0.14em", fontWeight: 700, color: colors.ink }}>
        YOURSPACE
      </Link>

      <nav className="hidden md:flex items-center gap-8 order-3 md:order-2 w-full md:w-auto justify-center md:justify-start">
        {NAV_LINKS.map((item) => {
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
              }}
              className="hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 sm:gap-6 order-2 md:order-3">
        {authed ? (
          <div
            className="w-9 h-9 rounded-full bg-cover bg-center shrink-0"
            style={{
              backgroundImage: avatarUrl ? `url('${avatarUrl}')` : undefined,
              backgroundColor: colors.ink,
              border: `1px solid ${colors.hairline}`,
            }}
          />
        ) : (
          <>
            <Link to="/login" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }} className="hover:opacity-80 transition-opacity">
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="px-4 sm:px-5 py-2 hover:opacity-90 transition-opacity"
              style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", fontWeight: 700, backgroundColor: colors.accent, color: colors.ink }}
            >
              SIGNUP
            </Link>
          </>
        )}
      </div>
    </header>
  );
}