import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import Navbar from "../components/Navbar";
import BlogOverlay from "../components/OpenBlog";
import { normalizeBlogForOverlay } from "../utils/blogOverlay";
const colors = {
  bg: "#fafaf8",
  ink: "#141414",
  muted: "#8f8f8f",
  faint: "#eeeeec",
  card: "#dcdcda",
  hairline: "#d6d6d3",
  accent: "#e3ff4f",
};

const fonts = {
  display: "'Fraunces', serif",
  mono: "'Space Mono', monospace",
};
const getReadTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} MIN`;
};

const normalizeBlog = (blog) => ({
  raw: blog,
  id: blog._id || blog.id,
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

function Hero() {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-16 max-w-3xl">
      <h1
        className="mt-5 mb-6"
        style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(44px, 7vw, 92px)", lineHeight: 0.98, letterSpacing: "-0.02em" }}
      >
        Write.
        <br />
        Publish. Share.
      </h1>
      <p style={{ fontFamily: fonts.display, fontSize: 19, lineHeight: 1.6, color: colors.muted, maxWidth: 480 }}>
        A minimalist space for deep thinkers, storytellers, and avid readers to connect through the written word.
      </p>
      <div className="flex items-center gap-4 mt-10">
        <a
          href="/login"
          className="flex items-center gap-3 px-7 py-3.5 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent, color: colors.ink }}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>START WRITING</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 14 }}>→</span>
        </a>
        <a
          href="/explore"
          className="px-7 py-3.5 border transition-colors"
          style={{ borderColor: colors.hairline, color: colors.ink }}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>EXPLORE BLOGS</span>
        </a>
      </div>
    </section>
  );
}

function CategoryStrip() {
  const topics = ["ALL", "TECHNOLOGY", "AI & ML", "WEB DEV", "DESIGN", "PRODUCTIVITY"];
  return (
    <section
      className="relative z-10 flex gap-6 sm:gap-8 px-5 sm:px-8 md:px-14 py-4 overflow-x-auto"
      style={{ borderTop: `1px solid ${colors.hairline}`, borderBottom: `1px solid ${colors.hairline}` }}
    >
      {topics.map((t, i) => (
        <span
          key={t}
          className="shrink-0"
          style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: i === 0 ? colors.ink : colors.muted, fontWeight: i === 0 ? 700 : 400 }}
        >
          {t}
        </span>
      ))}
    </section>
  );
}

function FeaturedPost({ post, onOpen }) {
  if (!post) return null;

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 py-12 sm:py-16">
      <article
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(event) => openWithKeyboard(event, onOpen)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        <div className="lg:col-span-7 h-[240px] sm:h-[340px] lg:h-[440px] overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.faint }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: "0.1em" }}>NO IMAGE</span>
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.12em", color: colors.muted }}>
            {post.category.toUpperCase()} — {post.readTime} READ
          </span>
          <h2
            className="mt-4 mb-5"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, lineHeight: 1.12, color: colors.ink }}
          >
            {post.title}
          </h2>
          <p style={{ fontFamily: fonts.display, fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-7">
            <div className="w-9 h-9 overflow-hidden rounded-full" style={{ backgroundColor: colors.faint }}>
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.06em", color: colors.ink }}>
              {post.author.toUpperCase()}
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

function PostCard({ image, category, title, excerpt, author, readTime, index, onOpen }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => openWithKeyboard(event, onOpen)}
      className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      <div className="h-52 overflow-hidden mb-5" style={!image ? { backgroundColor: colors.faint, display: "flex", alignItems: "center", justifyContent: "center" } : undefined}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        ) : (
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: "0.1em" }}>NO IMAGE</span>
        )}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.05em", color: colors.muted }}>
          {String(index).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.1em", color: colors.muted }}>
          {category.toUpperCase()}
        </span>
      </div>
      <h4
        className="mb-3 group-hover:opacity-70 transition-opacity"
        style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 21, lineHeight: 1.25, color: colors.ink }}
      >
        {title}
      </h4>
      <p className="mb-5" style={{ fontFamily: fonts.display, fontSize: 15, lineHeight: 1.6, color: colors.muted }}>
        {excerpt}
      </p>
      <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${colors.hairline}` }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.05em", color: colors.muted }}>{author.toUpperCase()}</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.05em", color: colors.muted }}>{readTime}</span>
      </div>
    </article>
  );
}

function LatestWritings({ posts, onOpenPost }) {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 py-12 sm:py-16" style={{ borderTop: `1px solid ${colors.hairline}` }}>
      <div className="flex flex-wrap items-end justify-between gap-y-3 mb-10 sm:mb-12">
        <h3 style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 30, color: colors.ink }}>
          Latest Writings
        </h3>
        <a href="/explore" className="hover:underline" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
          VIEW ALL →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((p, i) => (
          <PostCard key={p.id || p.title} {...p} index={i + 1} onOpen={() => onOpenPost(p)} />
        ))}
      </div>
      {posts.length === 0 && (
        <p style={{ fontFamily: fonts.display, fontSize: 16, color: colors.muted }}>
          Published blogs will appear here.
        </p>
      )}
    </section>
  );
}
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section
      id="newsletter"
      className="relative z-10 px-5 sm:px-8 md:px-14 py-16 sm:py-20"
      style={{ borderTop: `1px solid ${colors.hairline}` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-6">
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.14em", color: colors.muted }}>
            STAY IN THE LOOP
          </span>
          <h3
            className="mt-3 mb-4"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.12, color: colors.ink }}
          >
            Get the latest blogs in your inbox.
          </h3>
          <p style={{ fontFamily: fonts.display, fontSize: 16, lineHeight: 1.6, color: colors.muted, maxWidth: 460 }}>
            Leave your email so new posts land there as soon as they go live. No spam — only writing, never sales pitches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-6">
          <label
            htmlFor="home-newsletter-email"
            className="block mb-2"
            style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.14em", color: colors.muted }}
          >
            YOUR EMAIL
          </label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-stretch">
            <input
              id="home-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-transparent py-3 px-0 sm:px-0 sm:pr-4 focus:outline-none"
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                color: colors.ink,
                borderBottom: `1px solid ${colors.hairline}`,
              }}
            />
            <button
              type="submit"
              className="px-7 py-3.5 hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: colors.accent, color: colors.ink }}
            >
              <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
                SUBSCRIBE
              </span>
            </button>
          </div>
          <p className="mt-4" style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.08em", color: colors.muted }}>
            {submitted
              ? "YOU'RE ON THE LIST. WE'LL ONLY WRITE WHEN THERE'S A NEW POST."
              : "NO SPAM. UNSUBSCRIBE ANYTIME. WE NEVER SHARE YOUR ADDRESS."}
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const links = ["ABOUT", "PRIVACY", "TERMS", "CONTACT", "NEWSLETTER"];
  return (
    <footer className="relative z-10 px-5 sm:px-8 md:px-14 py-10" style={{ borderTop: `1px solid ${colors.hairline}` }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.12em", color: colors.ink, fontWeight: 700 }}>
          YOURSPACE
        </span>
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a key={l} href="#" className="hover:underline" style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.1em", color: colors.muted }}>
              {l}
            </a>
          ))}
        </nav>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.06em", color: colors.muted }}>
          © 2026 YOURSPACE <br />
          Designed:Shivansh Saxena
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getBlogs({ limit: 6, sortBy: "createdAt", order: "desc" });
        setPosts(Array.isArray(response.data?.blogs) ? response.data.blogs.map(normalizeBlog) : []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load blogs.");
      }
    };

    loadBlogs();
  }, []);

  const featuredPost = posts.find((post) => post.image) || posts[0];
  const latestPosts = posts.filter((post) => post.id !== featuredPost?.id).slice(0, 3);
  const openPost = (post) => setSelectedBlog(normalizeBlogForOverlay(post.raw || post));

  return (
    <div className="min-h-screen relative overflow-hidden antialiased" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
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
        <Hero />
        <CategoryStrip />
        {error && (
          <p className="px-5 sm:px-8 md:px-14 pt-8" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
            {error}
          </p>
        )}
        <FeaturedPost post={featuredPost} onOpen={() => openPost(featuredPost)} />
        <LatestWritings posts={latestPosts} onOpenPost={openPost} />
        <Newsletter />
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
