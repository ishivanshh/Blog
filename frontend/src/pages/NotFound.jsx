import React from "react";

const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
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
      className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-center"
      style={{ zIndex: 0 }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: "min(50vw, 620px)",
          color: colors.ink,
          opacity: 0.035,
          lineHeight: 1,
        }}
      >
        404
      </span>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden antialiased flex flex-col" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <Wordmark />

      <header className="relative z-10 flex items-center justify-between px-8 md:px-14 py-6">
        <span style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: "0.14em", color: colors.muted }}>
          YOURSPACE
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
          ERR / LOST
        </span>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">
        <span style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: "0.2em", color: colors.muted, marginBottom: 20 }}>
          COORDINATE UNRESOLVED
        </span>
        <h1
          className="mb-6"
          style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          Off the
          <br />
          Page.
        </h1>
        <p className="mb-12 max-w-md" style={{ fontFamily: fonts.display, fontSize: 18, lineHeight: 1.6, color: colors.muted }}>
          This entry doesn't exist in the archive, or has been unpublished. Retrace your steps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/login"
            className="flex items-center justify-center gap-3 px-8 py-4 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.accent, color: colors.ink }}
          >
            <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>
              RETURN LOGIN
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 15 }}>→</span>
          </a>
          <a
            href="/explore"
            className="flex items-center justify-center gap-3 px-8 py-4 border hover:bg-black hover:text-white transition-colors"
            style={{ borderColor: colors.hairline, color: colors.ink }}
          >
            <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>
              EXPLORE ARCHIVE
            </span>
          </a>
        </div>
      </main>

      <footer className="relative z-10 px-8 md:px-14 py-6" style={{ borderTop: `1px solid ${colors.hairline}` }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.14em", color: colors.muted }}>
          EDITORIAL STANDARDS. DEFINED.
        </span>
      </footer>
    </div>
  );
}