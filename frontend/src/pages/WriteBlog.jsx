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
    <div className="min-h-screen bg-[#F7F8FA] text-neutral-900 font-serif">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight font-serif">
              YOURSPACE
            </span>
            <div className="w-px h-5 bg-neutral-200" />
            <span className="font-sans text-xs font-semibold tracking-widest text-neutral-400">
              DRAFTING
            </span>
          </div>

          <nav className="flex items-center gap-8 font-sans text-sm">
            <Link to="/home" className="text-neutral-600 hover:text-neutral-900">
              Explore
            </Link>
            <a
              href="#"
              className="text-indigo-600 border-b-2 border-indigo-600 pb-1 font-medium"
            >
              Write
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <button className="text-neutral-400 hover:text-neutral-700 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <div
              className="w-9 h-9 rounded-full bg-cover bg-center bg-neutral-800"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80')",
              }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-14 pb-40">
        {/* Floating toolbar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 bg-white rounded-xl shadow-sm border border-neutral-200 px-3 py-2">
            {toolbarButtons.map(({ icon: Icon, label }) => (
              <button
                key={label}
                title={label}
                className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <div className="w-px h-5 bg-neutral-200 mx-1" />
            {toolbarButtons2.map(({ icon: Icon, label }) => (
              <button
                key={label}
                title={label}
                className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <div className="w-px h-5 bg-neutral-200 mx-1" />
            <button
              title="Image"
              className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
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
          className="w-full aspect-[2/1] rounded-2xl border-2 border-dashed border-neutral-300 bg-white/60 hover:bg-white hover:border-neutral-400 transition-colors flex flex-col items-center justify-center gap-3 overflow-hidden"
        >
          {coverPhoto ? (
            <img
              src={coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <Camera className="w-9 h-9 text-neutral-400" strokeWidth={1.5} />
              <span className="font-sans text-xs font-semibold tracking-widest text-neutral-400">
                ADD COVER PHOTO
              </span>
            </>
          )}
        </button>

        {/* Story details */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-sans text-xs font-semibold tracking-widest text-neutral-400">
              STORY DETAILS
            </span>
            <span className="font-sans text-[11px] font-medium bg-neutral-100 text-neutral-500 rounded-md px-2.5 py-1">
              DRAFT
            </span>
            <span className="font-sans text-[11px] font-medium bg-neutral-100 text-neutral-500 rounded-md px-2.5 py-1">
              {wordCount} {wordCount === 1 ? "WORD" : "WORDS"}
            </span>
          </div>
          <div className="border-b border-neutral-200" />
        </div>

        {/* Title + body */}
        <div className="mt-8">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title your story..."
            rows={1}
            className="w-full font-serif text-4xl font-medium placeholder:text-neutral-300 outline-none bg-transparent resize-none overflow-hidden"
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
            className="w-full font-sans text-base leading-relaxed text-neutral-700 placeholder:text-neutral-300 outline-none bg-transparent resize-none mt-6"
          />
        </div>
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-neutral-100 px-6 py-4">
          <div className="flex items-center gap-2 font-sans text-sm text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
            Last saved 2 minutes ago
          </div>

          <div className="flex items-center gap-6">
            <button className="font-sans text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
              Save Draft
            </button>
            <button className="font-sans text-sm font-medium bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-full px-6 py-2.5">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}