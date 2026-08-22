import React from "react";
import { Link } from "react-router-dom";

// Same tokens as Navbar.jsx and the rest of the Awwwards-themed pages.
const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  hairline: "#d6d6d3",
};

const fonts = {
  mono: "'Space Mono', monospace",
};

const FOOTER_LINKS = [
  { label: "ABOUT", to: "/about" },
  { label: "PRIVACY", to: "/privacy" },
  { label: "TERMS", to: "/terms" },
  { label: "CONTACT", to: "/contact" },
  { label: "NEWSLETTER", to: "/newsletter" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 px-5 sm:px-8 md:px-14 py-10"
      style={{ backgroundColor: colors.bg, borderTop: `1px solid ${colors.hairline}` }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.12em", color: colors.ink, fontWeight: 700 }}>
          YOURSPACE
        </span>

        <nav className="flex flex-wrap justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:underline"
              style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.1em", color: colors.muted }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.06em", color: colors.muted }}>
          © {new Date().getFullYear()} YOURSPACE
        </span>
      </div>
    </footer>
  );
}