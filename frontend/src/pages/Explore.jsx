import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

// Same tokens as the rest of the Awwwards-themed YOURSPACE pages.
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

const CATEGORIES = ["ALL", "TECHNOLOGY", "AI & ML", "WEB DEVELOPMENT", "DESIGN", "PRODUCTIVITY"];

// "size" controls the bento footprint: large spans 2x2, wide spans 2x1,
// tall spans 1x2, normal is a single cell. Cycled across the list below
// so the grid reads as intentionally uneven rather than random.
const POSTS = [
  {
    size: "large",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7j2qiepaKDqRRZIuDgLwFgJX5ZCI-ITo0lkp1zyQFjwpIKVnfvROTxEH2WaAsQYg_3qhYOUf7U18tHQGJzdV8rQOJHiyfDivYr0tGc9CFORqnANb6Kj3Z5vpKRtgNyPdRH46k5ytO7yXK8JTqPOHlcTCjh9s-WzdDI4t4O1sqzhgnE2XV24AY1kTr2Ah7LeSe79EEnrtpncekPdY9dWYthBzF1LId65-U-unxdDWUQeNe_KxUMJi4",
    category: "Technology",
    title: "The Future of Generative Interfaces in Editorial Design",
    excerpt: "Exploring how AI-driven layouts are reshaping the way we consume long-form content on the web.",
    author: "Sarah Jenkins",
    readTime: "5 MIN",
  },
  {
    size: "normal",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBit4PQzXK5SjF-Bn6md18fEidpL7hJye3pUybuQCFsiCWYd3o8lEy1zsmIOCDS6_4L66YjCN9IkrK6HCRFKFIuAhxy_-2xXdJiIVF936VxFTRmslkxpKyBDaUCo1SNHAnbCyEWmSihT-TSTDgyEvBQHCR9eJKjNPm-zqPPxSAYLop2DlXSUH23z3kXBtXasRiaKn3lLaptP-OIEgMNw9egibVbO9yfqfQ5bbTTjYvY8RMqNvvLc1Di",
    category: "Productivity",
    title: "Finding Focus in a World of Noise",
    excerpt: "Practical strategies for deep work and eliminating digital distractions.",
    author: "David Chen",
    readTime: "3 MIN",
  },
  {
    size: "tall",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9bixrZ-il6igmMG5YTVnkKPVLoy4fLxWcnrR90fkpQpof6yk-IywEUItOWIEzW4blL8ctGLGHHzIBv_pZkg64XBcOP_8Uj7y59C5Eqg1Lnqk9KzH6x_R6wQAKr2wejyEomMDF44Sa3Dojur2bsCa2PEqoOvHqnltlqkvDxIVsc0aGgTX9efS7_W4xbyj3ofAG3YOG6dGapsgD3t6FmGAWSPu4_5-ytfBYNFKs71JulMIlDDHBhfo",
    category: "Web Development",
    title: "The Elegance of Vanilla CSS",
    excerpt: "Why returning to the basics of cascading style sheets leads to cleaner, more maintainable codebases.",
    author: "Elena Rostova",
    readTime: "7 MIN",
  },
  {
    size: "normal",
    image: null,
    category: "AI & ML",
    title: "Demystifying Large Language Models",
    excerpt: "A plain-English explanation of how modern AI text generation works under the hood.",
    author: "Marcus Thorne",
    readTime: "12 MIN",
  },
  {
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80",
    category: "Design",
    title: "Grid Systems for the Post-Screen Era",
    excerpt: "Rethinking layout foundations as reading moves across devices, sizes, and formats.",
    author: "Priya Nair",
    readTime: "6 MIN",
  },
  {
    size: "normal",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",
    category: "Technology",
    title: "Edge Computing, Explained Simply",
    excerpt: "What actually changes when computation moves closer to the user.",
    author: "Owen Blake",
    readTime: "4 MIN",
  },
  {
    size: "normal",
    image: null,
    category: "Productivity",
    title: "The Two-Hour Rule for Deep Work",
    excerpt: "A simple constraint that reshaped how I structure every writing day.",
    author: "Nadia Farouk",
    readTime: "5 MIN",
  },
  {
    size: "tall",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=700&q=80",
    category: "AI & ML",
    title: "Prompt Design as a Craft, Not a Trick",
    excerpt: "Treating prompts like editorial briefs instead of magic incantations.",
    author: "Leo Marsh",
    readTime: "9 MIN",
  },
  {
    size: "normal",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80",
    category: "Design",
    title: "Typography as Interface",
    excerpt: "How type choices quietly do the job of navigation.",
    author: "Iris Wang",
    readTime: "6 MIN",
  },
];

const SIZE_CLASSES = {
  large: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2 sm:row-span-1",
  tall: "sm:col-span-1 sm:row-span-2",
  normal: "sm:col-span-1 sm:row-span-1",
};

const SIZE_HEIGHT = {
  large: "h-[320px] sm:h-full",
  wide: "h-[220px] sm:h-full",
  tall: "h-[260px] sm:h-full",
  normal: "h-[220px] sm:h-full",
};

function Wordmark() {
  return (
    <div
      aria-hidden
      className="absolute top-0 right-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0, width: "60%", height: "70vh" }}
    >
      <span
        style={{
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: "min(30vw, 340px)",
          color: colors.ink,
          opacity: 0.035,
          writingMode: "vertical-rl",
          whiteSpace: "nowrap",
          lineHeight: 1,
          position: "absolute",
          right: 40,
          top: -40,
        }}
      >
        YOURSPACE
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-10">
      <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.2em", color: colors.muted }}>
        ARCHIVE — {POSTS.length} ENTRIES
      </span>
      <h1
        className="mt-4 mb-2"
        style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.02, letterSpacing: "-0.01em" }}
      >
        Explore the Archive.
      </h1>
      <p style={{ fontFamily: fonts.display, fontSize: 17, lineHeight: 1.6, color: colors.muted, maxWidth: 480 }}>
        Every story, sorted your way. Search by title, or narrow it down by category.
      </p>
    </section>
  );
}

function SearchAndFilter({ query, setQuery, category, setCategory }) {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-8">
      <div className="flex items-center gap-3 border-b pb-3 mb-6" style={{ borderColor: colors.hairline }}>
        <span className="material-symbols-outlined" style={{ color: colors.muted, fontSize: 20 }}>
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories, authors, topics..."
          className="w-full bg-transparent focus:outline-none"
          style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.ink }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.08em", color: colors.muted }}
          >
            CLEAR
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((c) => {
          const isActive = c === category;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-4 py-1.5 transition-colors"
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: "0.08em",
                fontWeight: isActive ? 700 : 400,
                backgroundColor: isActive ? colors.accent : "transparent",
                color: colors.ink,
                border: `1px solid ${isActive ? colors.accent : colors.hairline}`,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PostCard({ post }) {
  const isBig = post.size === "large" || post.size === "wide" || post.size === "tall";
  return (
    <article
      className={`group relative flex flex-col justify-end overflow-hidden ${SIZE_CLASSES[post.size]} ${SIZE_HEIGHT[post.size]}`}
      style={{ backgroundColor: colors.faint }}
    >
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
            NO IMAGE
          </span>
        </div>
      )}
      {/* gradient scrim for text legibility over the image */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(20,20,20,0) 40%, rgba(20,20,20,0.75) 100%)" }}
      />
      <div className="relative p-5 sm:p-6">
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.1em", color: colors.accent }}>
          {post.category.toUpperCase()}
        </span>
        <h4
          className="mt-2"
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: isBig ? 24 : 17,
            lineHeight: 1.2,
            color: "#ffffff",
          }}
        >
          {post.title}
        </h4>
        {isBig && (
          <p className="mt-2 hidden sm:block" style={{ fontFamily: fonts.display, fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.8)", maxWidth: 380 }}>
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: "rgba(255,255,255,0.75)" }}>
            {post.author.toUpperCase()}
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: "rgba(255,255,255,0.75)" }}>
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="py-24 text-center">
      <span className="material-symbols-outlined" style={{ color: colors.muted, fontSize: 32 }}>
        search_off
      </span>
      <p className="mt-4" style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 22, color: colors.ink }}>
        No stories found
      </p>
      <p className="mt-2" style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.muted }}>
        Try a different search term or category.
      </p>
      <button
        onClick={onClear}
        className="mt-6 px-6 py-2.5 border hover:bg-black hover:text-white transition-colors"
        style={{ borderColor: colors.hairline, color: colors.ink, fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.08em", fontWeight: 700 }}
      >
        CLEAR FILTERS
      </button>
    </div>
  );
}

export default function Explore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      const matchesCategory = category === "ALL" || p.category.toUpperCase() === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen relative overflow-hidden antialiased" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Wordmark />

      <div className="relative z-10">
        <Navbar active="/explore" />
        <Hero />
        <SearchAndFilter query={query} setQuery={setQuery} category={category} setCategory={setCategory} />

        <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
          {filtered.length === 0 ? (
            <EmptyState onClear={() => { setQuery(""); setCategory("ALL"); }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:auto-rows-[180px]">
              {filtered.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}