import React from "react";
import { Link } from "react-router-dom";

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


const NAV_LINKS = {
  home: { label: "HOME", to: "/" },
  dashboard: { label: "HOME", to: "/dashboard" },
  explore: { label: "EXPLORE", to: "/explore" },
  categories: { label: "CATEGORIES", to: "/categories" },
  write: { label: "WRITE", to: "/writeblog" },
  myBlogs: { label: "MY BLOGS", to: "/my-blogs" },
  profile: { label: "PROFILE", to: "/profile" },
};

export default function Navbar({
  active = "/",
  authed = false,
  avatarUrl,

  // Navigation options
  showHome = true,
  showExplore = true,
  showCategories = true,
  showWrite = false,
  showMyBlogs = false,
  showProfile = false,

  // Authentication options
  showLogin = true,
  showSignup = true,
}) {
  const navItems = [
    authed
      ? showHome && NAV_LINKS.dashboard
      : showHome && NAV_LINKS.home,

    showExplore && NAV_LINKS.explore,
    showCategories && NAV_LINKS.categories,
    showWrite && NAV_LINKS.write,
    showMyBlogs && NAV_LINKS.myBlogs,
    showProfile && NAV_LINKS.profile,
  ].filter(Boolean);

  return (
    <header
      className="relative z-10 flex flex-wrap items-center justify-between gap-y-3 px-5 sm:px-8 md:px-14 py-5 md:py-6"
      style={{
        backgroundColor: colors.bg,
        borderBottom: `1px solid ${colors.hairline}`,
      }}
    >
      {/* LOGO */}
      <Link
        to={authed ? "/dashboard" : "/"}
        style={{
          fontFamily: fonts.mono,
          fontSize: 13,
          letterSpacing: "0.14em",
          fontWeight: 700,
          color: colors.ink,
        }}
      >
        YOURSPACE
      </Link>

      {/* NAVIGATION */}
      {navItems.length > 0 && (
        <nav className="hidden md:flex items-center gap-8 order-3 md:order-2 w-full md:w-auto justify-center md:justify-start">
          {navItems.map((item) => {
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
                  borderBottom: isActive
                    ? `2px solid ${colors.accent}`
                    : "none",
                  paddingBottom: 4,
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 sm:gap-6 order-2 md:order-3">
        {authed ? (
          <div
            className="w-9 h-9 rounded-full bg-cover bg-center shrink-0"
            style={{
              backgroundImage: avatarUrl
                ? `url('${avatarUrl}')`
                : undefined,
              backgroundColor: colors.ink,
              border: `1px solid ${colors.hairline}`,
            }}
          />
        ) : (
          <>
            {showLogin && (
              <Link
                to="/login"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: colors.muted,
                }}
                className="hover:opacity-80 transition-opacity"
              >
                LOGIN
              </Link>
            )}

            {showSignup && (
              <Link
                to="/signup"
                className="px-4 sm:px-5 py-2 hover:opacity-90 transition-opacity"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  backgroundColor: colors.accent,
                  color: colors.ink,
                }}
              >
                SIGNUP
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}