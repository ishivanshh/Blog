import React, { useState, useRef, useMemo } from "react";
import {
  Bold,
  Italic,
  Type,
  Link2,
  Quote,
  List,
  Image as ImageIcon,
  MoreVertical,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";

// Same tokens as HomeAwwwards / LoginAwwwards / SignupAwwwards / NotFoundAwwwards.
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

export default function YourSpaceWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const wordCount = useMemo(() => {
    const text = `${title} ${content}`.trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
  }, [title, content]);

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(URL.createObjectURL(file));
    }
  };

  const toolbarButtons = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Type, label: "Heading" },
  ];

  const toolbarButtons2 = [
    { icon: Link2, label: "Link" },
    { icon: Quote, label: "Quote" },
    { icon: List, label: "List" },
  ];

  return (
    <div className="min-h-screen antialiased" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="border-b" style={{ borderColor: colors.hairline, backgroundColor: colors.bg }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-y-3 px-5 sm:px-8 md:px-14 py-5">
          <div className="flex items-center gap-4">
            <Link to="/">
              <span style={{ fontFamily: fonts.mono, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: colors.ink }}>
                YOURSPACE
              </span>
            </Link>
            <div className="w-px h-5" style={{ backgroundColor: colors.hairline }} />
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: colors.muted }}>
              DRAFTING
            </span>
          </div>

          <nav className="flex items-center gap-8 order-3 md:order-2 w-full md:w-auto justify-center md:justify-start">
            <Link
              to="/explore"
              style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}
              className="hover:opacity-70 transition-opacity"
            >
              EXPLORE
            </Link>
            <Link
              to="/writeblog"
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: "0.1em",
                fontWeight: 700,
                color: colors.ink,
                borderBottom: `2px solid ${colors.accent}`,
                paddingBottom: 4,
              }}
            >
              WRITE
            </Link>
          </nav>

          <div className="flex items-center gap-5 order-2 md:order-3">
            <button style={{ color: colors.muted }} className="hover:opacity-70 transition-opacity">
              <MoreVertical className="w-5 h-5" />
            </button>
            <div
              className="w-9 h-9 rounded-full bg-cover bg-center shrink-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80')",
                backgroundColor: colors.ink,
                border: `1px solid ${colors.hairline}`,
              }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-48">
        {/* Floating toolbar */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div
            className="flex items-center gap-1 px-3 py-2 shrink-0"
            style={{ backgroundColor: "#ffffff", border: `1px solid ${colors.hairline}` }}
          >
            {toolbarButtons.map(({ icon: Icon, label }) => (
              <button
                key={label}
                title={label}
                className="w-8 h-8 flex items-center justify-center transition-colors"
                style={{ color: colors.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <div className="w-px h-5 mx-1" style={{ backgroundColor: colors.hairline }} />
            {toolbarButtons2.map(({ icon: Icon, label }) => (
              <button
                key={label}
                title={label}
                className="w-8 h-8 flex items-center justify-center transition-colors"
                style={{ color: colors.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <div className="w-px h-5 mx-1" style={{ backgroundColor: colors.hairline }} />
            <button
              title="Image"
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: colors.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.muted)}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cover photo */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverPhotoChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-[2/1] border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-3 overflow-hidden"
          style={{ borderColor: colors.hairline, backgroundColor: colors.faint }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.muted)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.hairline)}
        >
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          ) : (
            <>
              <Camera className="w-9 h-9" style={{ color: colors.muted }} strokeWidth={1.5} />
              <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: colors.muted }}>
                ADD COVER PHOTO
              </span>
            </>
          )}
        </button>

        {/* Story details */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: colors.muted }}>
              STORY DETAILS
            </span>
            <span
              className="px-2.5 py-1"
              style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", backgroundColor: colors.faint, color: colors.muted, border: `1px solid ${colors.hairline}` }}
            >
              DRAFT
            </span>
            <span
              className="px-2.5 py-1"
              style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", backgroundColor: colors.faint, color: colors.muted, border: `1px solid ${colors.hairline}` }}
            >
              {wordCount} {wordCount === 1 ? "WORD" : "WORDS"}
            </span>
          </div>
          <div className="border-b" style={{ borderColor: colors.hairline }} />
        </div>

        {/* Title + body */}
        <div className="mt-8">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title your story..."
            rows={1}
            className="w-full outline-none bg-transparent resize-none overflow-hidden"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(28px, 4.5vw, 44px)", lineHeight: 1.15, color: colors.ink }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            rows={10}
            className="w-full outline-none bg-transparent resize-none mt-6"
            style={{ fontFamily: fonts.display, fontSize: 18, lineHeight: 1.7, color: "#3a3a38" }}
          />
        </div>
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-5 sm:px-6">
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-6 py-4"
          style={{ backgroundColor: "#ffffff", border: `1px solid ${colors.hairline}`, boxShadow: "0 12px 32px rgba(20,20,20,0.08)" }}
        >
          <div className="flex items-center gap-2" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.04em", color: colors.muted }}>
            <span className="w-2 h-2 inline-block" style={{ backgroundColor: colors.accent }} />
            LAST SAVED 2 MIN AGO
          </div>

          <div className="flex items-center gap-6">
            <button
              className="transition-opacity hover:opacity-70"
              style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: colors.ink }}
            >
              SAVE DRAFT
            </button>
            <button
              className="px-6 py-2.5 hover:opacity-90 transition-opacity"
              style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", backgroundColor: colors.accent, color: colors.ink }}
            >
              PUBLISH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}