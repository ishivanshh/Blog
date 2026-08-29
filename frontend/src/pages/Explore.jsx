import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { getBlogs } from "../services/blogService";
import BlogOverlay from "../components/OpenBlog";
import { normalizeBlogForOverlay } from "../utils/blogOverlay";

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

const SIZE_SEQUENCE = ["large", "normal", "tall", "normal", "wide", "normal", "normal", "tall", "normal"];

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

const getReadTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} MIN`;
};

const normalizeBlog = (blog, index) => ({
  raw: blog,
  id: blog._id || blog.id,
  size: SIZE_SEQUENCE[index % SIZE_SEQUENCE.length],
  image: blog.coverImage || null,
  category: typeof blog.category === "string" ? blog.category : blog.category?.name || "Uncategorized",
  title: blog.title,
  excerpt: blog.excerpt || blog.subtitle || blog.content?.slice(0, 160) || "",
  author: blog.author?.fullName || blog.author?.username || "YOURSPACE",
  readTime: blog.readingTime ? `${blog.readingTime} MIN` : getReadTime(blog.content),
});

const openWithKeyboard = (event, callback) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
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

function Hero({ total }) {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-10">
      <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.2em", color: colors.muted }}>
        ARCHIVE — {total} ENTRIES
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

function SearchAndFilter({ query, setQuery, category, setCategory, categories }) {
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
        {categories.map((c) => {
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

function PostCard({ post, onOpen }) {
  const isBig = post.size === "large" || post.size === "wide" || post.size === "tall";
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => openWithKeyboard(event, onOpen)}
      className={`group relative flex flex-col justify-end overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${SIZE_CLASSES[post.size]} ${SIZE_HEIGHT[post.size]}`}
      style={{ backgroundColor: colors.faint }}
    >
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
            Loading..
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

// when your search failed and u dont find anything 
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
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getBlogs({ limit: 50, sortBy: "createdAt", order: "desc" });
        setPosts(Array.isArray(response.data?.blogs) ? response.data.blogs.map(normalizeBlog) : []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load blogs.");
      }
    };

    loadBlogs();
  }, []);

  const categories = useMemo(() => {
    const names = posts.map((post) => post.category.toUpperCase());
    return ["ALL", ...Array.from(new Set(names))];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = category === "ALL" || p.category.toUpperCase() === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

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
        <Navbar
  active="/explore"
  showHome
  showExplore
  showCategories={false}
  showWrite={false}
/>

        <Hero total={posts.length} />
        <SearchAndFilter query={query} setQuery={setQuery} category={category} setCategory={setCategory} categories={categories} />
        {error && (
          <p className="px-5 sm:px-8 md:px-14 pb-8" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
            {error}
          </p>
        )}

        <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
          {filtered.length === 0 ? (
            <EmptyState onClear={() => { setQuery(""); setCategory("ALL"); }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:auto-rows-[180px]">
              {filtered.map((post) => (
                <PostCard
                  key={post.id || post.title}
                  post={post}
                  onOpen={() => setSelectedBlog(normalizeBlogForOverlay(post.raw || post))}
                />
              ))}
            </div>
          )}
        </section>

        <Footer />
      </div>
      <BlogOverlay
        blog={selectedBlog}
        isOpen={Boolean(selectedBlog)}
        onClose={() => setSelectedBlog(null)}
      />
    </div>
  );
}
