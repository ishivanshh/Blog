import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

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
  display: "'Fraunces', serif",
  mono: "'Space Mono', monospace",
};

/**
 * Full-screen blog reader that slides up from the bottom on open and
 * slides back down on close, driven by GSAP.
 *
 * Props:
 * - blog: { image, category, title, author, authorAvatar, date, readTime, content: string[] } | null
 * - isOpen: boolean — controls the animation direction.
 * - onClose: function — called once the close animation finishes.
 */
export default function BlogOverlay({ blog, isOpen, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const openTimelineRef = useRef(null);
  const closeTimelineRef = useRef(null);

  // Open: fade the backdrop in, then slide the panel up from below the
  // viewport. Close is handled separately in handleClose so it can wait
  // for the animation to finish before telling the parent to unmount.
  useEffect(() => {
    if (!panelRef.current || !backdropRef.current) return;

    if (isOpen) {
      openTimelineRef.current?.kill();
      closeTimelineRef.current?.kill();
      document.body.style.overflow = "hidden";
      gsap.set(panelRef.current, { yPercent: 100 });
      gsap.set(backdropRef.current, { autoAlpha: 0 });

      openTimelineRef.current = gsap.timeline();
      openTimelineRef.current.to(backdropRef.current, { autoAlpha: 1, duration: 0.35, ease: "power1.out" }).to(
        panelRef.current,
        { yPercent: 0, duration: 0.6, ease: "power3.out" },
        "<0.05"
      );
    }

    return () => {
      openTimelineRef.current?.kill();
      closeTimelineRef.current?.kill();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!panelRef.current || !backdropRef.current) {
      onClose?.();
      return;
    }
    openTimelineRef.current?.kill();
    closeTimelineRef.current?.kill();
    closeTimelineRef.current = gsap.timeline({ onComplete: () => onClose?.() });
    closeTimelineRef.current.to(panelRef.current, { yPercent: 100, duration: 0.45, ease: "power2.in" }).to(
      backdropRef.current,
      { autoAlpha: 0, duration: 0.3, ease: "power1.in" },
      "<0.1"
    );
  }, [onClose]);

  // Escape key closes the panel too.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isOpen) handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, isOpen]);

  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-[100]" style={{ pointerEvents: isOpen ? "auto" : "none" }} aria-hidden={!isOpen}>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(20,20,20,0.55)", opacity: 0, visibility: "hidden" }}
      />

      {/* sliding panel */}
      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 top-0 sm:top-8 overflow-y-auto"
        style={{ backgroundColor: colors.bg, boxShadow: "0 -20px 60px rgba(20,20,20,0.25)" }}
      >
        {/* close bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-8 md:px-14 py-4"
          style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.hairline}` }}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.14em", fontWeight: 700, color: colors.ink }}>
            YOURSPACE
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2 hover:opacity-70 transition-opacity"
            style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", fontWeight: 700, color: colors.ink, border: `1px solid ${colors.hairline}` }}
          >
            CLOSE
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              close
            </span>
          </button>
        </div>

        {/* cover image */}
        {blog.image && (
          <div className="h-[220px] sm:h-[360px] md:h-[440px] overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        )}

        {/* article body */}
        <article className="max-w-2xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.12em", color: colors.accent, backgroundColor: colors.ink }} className="inline-block px-2.5 py-1">
            {blog.category?.toUpperCase()}
          </span>

          <h1
            className="mt-6 mb-6"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(30px, 5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: colors.ink }}
          >
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 mb-10 pb-8" style={{ borderBottom: `1px solid ${colors.hairline}` }}>
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: colors.faint }}>
              {blog.authorAvatar && <img src={blog.authorAvatar} alt={blog.author} className="w-full h-full object-cover" />}
            </div>
            <div>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: colors.ink }}>
                {blog.author?.toUpperCase()}
              </p>
              <p style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted }}>
                {blog.date} · {blog.readTime}
              </p>
            </div>
          </div>

          {(blog.content || []).map((paragraph, i) => (
            <p key={i} className="mb-6" style={{ fontFamily: fonts.display, fontSize: 18, lineHeight: 1.75, color: "#2c2c2a" }}>
              {paragraph}
            </p>
          ))}

          <button
            type="button"
            onClick={handleClose}
            className="mt-10 flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", fontWeight: 700, color: colors.muted }}
          >
            ← BACK TO ARCHIVE
          </button>
        </article>
      </div>
    </div>
  );
}
