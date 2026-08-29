import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyBlogs } from "../services/blogService";
import BlogOverlay from "../components/OpenBlog";
import { normalizeBlogForOverlay } from "../utils/blogOverlay";

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

const openWithKeyboard = (event, callback) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
};

/* -------------------------------------------------------
   Stats
------------------------------------------------------- */

function BlogStats({ blogs }) {
  const total = blogs.length;

  const published = blogs.filter(
    (blog) => blog.status === "Published"
  ).length;

  const drafts = blogs.filter(
    (blog) => blog.status === "Draft"
  ).length;

  const stats = [
    {
      label: "TOTAL WRITTEN",
      value: total,
      icon: "article",
    },
    {
      label: "PUBLISHED",
      value: published,
      icon: "public",
    },
    {
      label: "DRAFTS",
      value: drafts,
      icon: "edit_note",
    },
  ];

  return (
    <section className="px-5 sm:px-8 md:px-14 pb-14">
      <div className="max-w-6xl">
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{
            borderTop: `1px solid ${colors.hairline}`,
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 md:p-8"
              style={{
                borderRight:
                  index !== stats.length - 1
                    ? `1px solid ${colors.hairline}`
                    : "none",
                borderBottom: `1px solid ${colors.hairline}`,
              }}
            >
              <div className="flex items-center justify-between mb-7">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 20,
                    color: colors.muted,
                  }}
                >
                  {stat.icon}
                </span>

                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: colors.muted,
                  }}
                >
                  YOURSPACE
                </span>
              </div>

              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 42,
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {stat.value.toString().padStart(2, "0")}
              </div>

              <div
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: colors.muted,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   Blog Row
------------------------------------------------------- */

function BlogRow({ blog, isDraft, onOpen }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => openWithKeyboard(event, onOpen)}
      className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      style={{
        borderBottom: `1px solid ${colors.hairline}`,
      }}
    >
      {/* Number */}
      <div
        className="md:col-span-1"
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          color: colors.muted,
        }}
      >
        {blog.number}
      </div>

      {/* Main content */}
      <div className="md:col-span-6">
        <div className="flex items-center gap-3 mb-2">
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: "0.1em",
              color: colors.muted,
            }}
          >
            {blog.category}
          </span>

          {isDraft && (
            <span
              className="px-2 py-1"
              style={{
                backgroundColor: colors.accent,
                color: colors.ink,
                fontFamily: fonts.mono,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              DRAFT
            </span>
          )}
        </div>

        <h3
          className="group-hover:opacity-70 transition-opacity"
          style={{
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 23,
            lineHeight: 1.15,
            color: colors.ink,
          }}
        >
          {blog.title}
        </h3>

        <p
          className="mt-2 line-clamp-2"
          style={{
            fontFamily: fonts.display,
            fontSize: 14,
            lineHeight: 1.55,
            color: colors.muted,
          }}
        >
          {blog.excerpt}
        </p>
      </div>

      {/* Date */}
      <div className="md:col-span-2 md:text-right">
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 9,
            letterSpacing: "0.05em",
            color: colors.muted,
          }}
        >
          {blog.date}
        </span>

        {!isDraft && (
          <div
            className="mt-2"
            style={{
              fontFamily: fonts.mono,
              fontSize: 9,
              color: colors.muted,
            }}
          >
            {blog.readTime}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="md:col-span-3 flex md:justify-end items-start gap-4">
        {isDraft ? (
          <>
            <Link
              to={`/editblog/${blog.id}`}
              onClick={(event) => event.stopPropagation()}
              className="hover:opacity-60 transition-opacity"
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.08em",
                color: colors.ink,
              }}
            >
              EDIT →
            </Link>

            <button
              type="button"
              className="hover:opacity-60 transition-opacity"
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.08em",
                color: colors.muted,
              }}
              onClick={(event) => {
                event.stopPropagation();
                // TODO: connect delete draft API
                console.log("Delete draft:", blog.id);
              }}
            >
              DELETE
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpen();
              }}
              className="hover:opacity-60 transition-opacity"
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.08em",
                color: colors.ink,
              }}
            >
              READ →
            </button>

            <Link
              to={`/editblog/${blog.id}`}
              onClick={(event) => event.stopPropagation()}
              className="hover:opacity-60 transition-opacity"
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.08em",
                color: colors.muted,
              }}
            >
              EDIT
            </Link>
          </>
        )}
      </div>
    </article>
  );
}

/* -------------------------------------------------------
   Blog Section
------------------------------------------------------- */

function BlogSection({ title, label, blogs, isDraft, onOpenBlog }) {
  return (
    <section className="px-5 sm:px-8 md:px-14 pb-16">
      <div className="max-w-6xl">
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3"
          style={{
            borderBottom: `1px solid ${colors.hairline}`,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.13em",
                color: colors.muted,
              }}
            >
              {label}
            </span>

            <h2
              className="mt-2"
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 30,
                color: colors.ink,
              }}
            >
              {title}
            </h2>
          </div>

          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: "0.08em",
              color: colors.muted,
            }}
          >
            {blogs.length.toString().padStart(2, "0")} POSTS
          </span>
        </div>

        {blogs.length > 0 ? (
          <div>
            {blogs.map((blog, index) => (
              <BlogRow
                key={blog.id}
                blog={{
                  ...blog,
                  number: (index + 1)
                    .toString()
                    .padStart(2, "0"),
                }}
                isDraft={isDraft}
                onOpen={() => onOpenBlog(blog)}
              />
            ))}
          </div>
        ) : (
          <EmptyState isDraft={isDraft} />
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   Empty State
------------------------------------------------------- */

function EmptyState({ isDraft }) {
  return (
    <div
      className="py-16 text-center"
      style={{
        borderBottom: `1px solid ${colors.hairline}`,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: 34,
          color: colors.muted,
        }}
      >
        {isDraft ? "edit_note" : "article"}
      </span>

      <h3
        className="mt-4"
        style={{
          fontFamily: fonts.display,
          fontSize: 21,
          fontWeight: 600,
        }}
      >
        {isDraft
          ? "No drafts yet."
          : "Nothing published yet."}
      </h3>

      <p
        className="mt-2"
        style={{
          fontFamily: fonts.display,
          fontSize: 15,
          color: colors.muted,
        }}
      >
        {isDraft
          ? "Start writing and save your unfinished ideas here."
          : "Your published blogs will appear here."}
      </p>

      {isDraft && (
        <Link
          to="/writeblog"
          className="inline-flex mt-6 px-6 py-3"
          style={{
            backgroundColor: colors.accent,
            color: colors.ink,
            fontFamily: fonts.mono,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          START WRITING →
        </Link>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   Page
------------------------------------------------------- */

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getMyBlogs({ limit: 50 });
        const results = Array.isArray(response.data?.blogs) ? response.data.blogs : [];
        setBlogs(results.map((blog) => ({
          ...blog,
          id: blog._id,
          category: blog.category?.name || "UNCATEGORIZED",
          status: blog.status === "Published" ? "Published" : "Draft",
          date: blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()
            : "",
          readTime: blog.content ? `${Math.max(1, Math.ceil(blog.content.trim().split(/\s+/).length / 200))} MIN READ` : "",
        })));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load your blogs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "Published"
  );

  const draftBlogs = blogs.filter(
    (blog) => blog.status === "Draft"
  );
  const openBlog = (blog) => setSelectedBlog(normalizeBlogForOverlay(blog));

  return (
    <div
      className="min-h-screen antialiased pb-16"
      style={{
        backgroundColor: colors.bg,
        color: colors.ink,
      }}
    >
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header
        className="flex items-center justify-between px-5 sm:px-8 md:px-14 py-5 md:py-6"
        style={{
          borderBottom: `1px solid ${colors.hairline}`,
        }}
      >
        <Link
          to="/dashboard"
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

        <div className="flex items-center gap-5">
          <Link
            to="/writeblog"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5"
            style={{
              backgroundColor: colors.accent,
              color: colors.ink,
              fontFamily: fonts.mono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            NEW BLOG
            <span>→</span>
          </Link>

          <Link
            to="/dashboard"
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              color: colors.muted,
            }}
          >
            ← DASHBOARD
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 sm:px-8 md:px-14 pt-14 md:pt-20 pb-14">
        <span
          className="absolute right-[-20px] top-0 pointer-events-none select-none"
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(140px, 25vw, 360px)",
            fontWeight: 600,
            lineHeight: 0.8,
            color: colors.ink,
            opacity: 0.025,
          }}
        >
          BLOGS
        </span>

        <div className="relative z-10 max-w-4xl">
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.14em",
              color: colors.muted,
            }}
          >
            YOURSPACE / WRITING
          </span>

          <h1
            className="mt-5 mb-5"
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: "clamp(48px, 7vw, 82px)",
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
            }}
          >
            Your writing.
            <br />
            Your space.
          </h1>

          <p
            className="max-w-xl"
            style={{
              fontFamily: fonts.display,
              fontSize: 18,
              lineHeight: 1.6,
              color: colors.muted,
            }}
          >
            Everything you've written, published, or left unfinished —
            all in one place.
          </p>
        </div>
      </section>

      {/* Stats */}
      <BlogStats blogs={blogs} />

      {isLoading && (
        <p className="px-5 sm:px-8 md:px-14 pb-8" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted }}>
          LOADING BLOGS...
        </p>
      )}
      {error && (
        <p className="px-5 sm:px-8 md:px-14 pb-8" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
          {error}
        </p>
      )}

      {/* Published */}
      <BlogSection
        title="Published Blogs"
        label="LIVE WRITING"
        blogs={publishedBlogs}
        isDraft={false}
        onOpenBlog={openBlog}
      />

      {/* Drafts */}
      <BlogSection
        title="Drafts"
        label="UNFINISHED WRITING"
        blogs={draftBlogs}
        isDraft={true}
        onOpenBlog={openBlog}
      />
      <BlogOverlay
        blog={selectedBlog}
        isOpen={Boolean(selectedBlog)}
        onClose={() => setSelectedBlog(null)}
      />
    </div>
  );
}
