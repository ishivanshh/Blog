import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarCentered from "../components/loggnavbar.jsx";
import Footer from "../components/Footer.jsx";
import { getProfile } from "../services/authService";
import { getMyBlogs } from "../services/blogService";
import { getCategories } from "../services/categoryService";
import Navbar from "../components/Navbar.jsx";
import { userNav } from "../utils/navigation.js";



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

const formatBlogDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).toUpperCase()
    : "";

const getReadTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const normalizeBlog = (blog) => ({
  ...blog,
  id: blog._id || blog.id,
  category: typeof blog.category === "string" ? blog.category : blog.category?.name || "UNCATEGORIZED",
  status: blog.status || "Draft",
  date: formatBlogDate(blog.createdAt),
  excerpt: blog.excerpt || blog.subtitle || blog.content?.slice(0, 160) || "",
  image: blog.coverImage || null,
  author: blog.author?.fullName || blog.author?.username || "YOURSPACE",
  readTime: getReadTime(blog.content),
});

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

function WritingStats({ blogs }) {
  const publishedCount = blogs.filter((blog) => blog.status?.toLowerCase() === "published").length;
  const draftCount = blogs.filter((blog) => blog.status?.toLowerCase() === "draft").length;
  const stats = [
    {
      label: "PUBLISHED",
      value: publishedCount.toString().padStart(2, "0"),
      icon: "article",
    },
    {
      label: "DRAFTS",
      value: draftCount.toString().padStart(2, "0"),
      icon: "edit_note",
    },
    {
      label: "TOTAL VIEWS",
      value: "2.4K",
      icon: "visibility",
    },
    {
      label: "READING TIME",
      value: "4.8H",
      icon: "schedule",
    },
  ];

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: `1px solid ${colors.hairline}` }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="p-5 md:p-7"
            style={{
              borderRight:
                index !== stats.length - 1
                  ? `1px solid ${colors.hairline}`
                  : "none",
              borderBottom: `1px solid ${colors.hairline}`,
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 19,
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
                THIS YEAR
              </span>
            </div>

            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                fontSize: 34,
                color: colors.ink,
              }}
            >
              {stat.value}
            </div>

            <div
              className="mt-1"
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
    </section>
  );
}

function ContinueWriting({ blogs }) {
  const drafts = blogs
    .filter((blog) => blog.status?.toLowerCase() === "draft")
    .slice(0, 2)
    .map((blog) => ({
      ...blog,
      category: typeof blog.category === "string" ? blog.category : blog.category?.name || "UNCATEGORIZED",
      progress: Math.min(99, Math.max(1, Math.round((blog.content?.length || 1) / 10))),
      updated: blog.updatedAt ? `Updated ${new Date(blog.updatedAt).toLocaleDateString()}` : "Recently updated",
    }));

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-16">
      <div
        className="flex justify-between items-end mb-6 pb-3"
        style={{ borderBottom: `1px solid ${colors.hairline}` }}
      >
        <div>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.12em",
              color: colors.muted,
            }}
          >
            YOUR WORK
          </span>

          <h3
            className="mt-2"
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 26,
              color: colors.ink,
            }}
          >
            Continue Writing
          </h3>
        </div>

        <a
          href="/myblog"
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: colors.ink,
          }}
        >
          ALL DRAFTS →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {drafts.map((draft) => (
          <a
            href="/writeblog"
            key={draft.title}
            className="p-6 hover:opacity-80 transition-opacity"
            style={{
              border: `1px solid ${colors.hairline}`,
            }}
          >
            <div className="flex justify-between gap-4 mb-5">
              <div>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: colors.muted,
                  }}
                >
                  {draft.category}
                </span>

                <h4
                  className="mt-2"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    fontSize: 21,
                    color: colors.ink,
                  }}
                >
                  {draft.title}
                </h4>
              </div>

              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  color: colors.muted,
                }}
              >
                {draft.progress}%
              </span>
            </div>

            <div
              className="h-1 w-full"
              style={{ backgroundColor: colors.faint }}
            >
              <div
                className="h-full"
                style={{
                  width: `${draft.progress}%`,
                  backgroundColor: colors.accent,
                }}
              />
            </div>

            <div
              className="mt-4"
              style={{
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: "0.05em",
                color: colors.muted,
              }}
            >
              {draft.updated}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function MyRecentBlogs({ blogs }) {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-20">
      <div
        className="flex justify-between items-end mb-6 pb-3"
        style={{ borderBottom: `1px solid ${colors.hairline}` }}
      >
        <div>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.12em",
              color: colors.muted,
            }}
          >
            YOUR WRITING
          </span>

          <h3
            className="mt-2"
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: 26,
            }}
          >
            Recent Blogs
          </h3>
        </div>

        <a
          href="/myblog"
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: "0.08em",
          }}
        >
          VIEW ALL →
        </a>
      </div>

      <div className="space-y-0">
        {blogs.slice(0, 3).map((blog, index) => (
          <a
            href="/myblog"
            key={blog.id || blog.title}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 hover:opacity-70 transition-opacity"
            style={{
              borderBottom: `1px solid ${colors.hairline}`,
            }}
          >
            <div
              className="md:col-span-2"
              style={{
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: "0.1em",
                color: colors.muted,
              }}
            >
              0{index + 1}
            </div>

            <div className="md:col-span-2">
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  color: colors.muted,
                }}
              >
                {blog.category}
              </span>
            </div>

            <div className="md:col-span-5">
              <h4
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 600,
                  fontSize: 21,
                  color: colors.ink,
                }}
              >
                {blog.title}
              </h4>

              <p
                className="mt-2 line-clamp-2"
                style={{
                  fontFamily: fonts.display,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: colors.muted,
                }}
              >
                {blog.excerpt}
              </p>
            </div>

            <div className="md:col-span-3 md:text-right">
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  color:
                    blog.status?.toLowerCase() === "draft"
                      ? colors.ink
                      : colors.muted,
                  backgroundColor:
                    blog.status?.toLowerCase() === "draft"
                      ? colors.accent
                      : "transparent",
                  padding: blog.status?.toLowerCase() === "draft" ? "3px 7px" : 0,
                }}
              >
                {blog.status?.toUpperCase()}
              </span>

              <div
                className="mt-2"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 9,
                  color: colors.muted,
                }}
              >
                {blog.date}
              </div>
            </div>
          </a>
        ))}
      </div>
      {blogs.length === 0 && (
        <p style={{ fontFamily: fonts.display, fontSize: 16, color: colors.muted }}>
          Your recent blogs will appear here.
        </p>
      )}
    </section>
  );
}

// function BottomNavBar() {
//   const items = [
//     { icon: "home", label: "Home", href: "/dashboard" },
//     { icon: "explore", label: "Explore", href: "/explore" },
//     { icon: "edit_square", label: "Write", href: "/writeblog" },
//     { icon: "person", label: "Profile", href: "/profile" },
//   ];

//   return (
//     <nav
//       className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2.5 px-4 z-50 md:hidden"
//       style={{ backgroundColor: colors.bg, borderTop: `1px solid ${colors.hairline}` }}
//     >
//       {items.map((item) => (
//         <NavLink
//           key={item.label}
//           to={item.href}
//           className="flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
//           style={({ isActive }) => ({ color: isActive ? colors.ink : colors.muted })}
//         >
//           {({ isActive }) => (
//             <>
//               <span
//                 className="material-symbols-outlined"
//                 style={{ fontSize: 22, ...(isActive ? { fontVariationSettings: "'FILL' 1" } : {}) }}
//               >
//                 {item.icon}
//               </span>
//               <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: "0.06em" }}>
//                 {item.label.toUpperCase()}
//               </span>
//             </>
//           )}
//         </NavLink>
//       ))}
//     </nav>
//   );
// }

function Hero({ user }) {
  const firstName = user.name?.trim().split(" ")[0] || "Writer";

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-16 max-w-3xl">
      <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.14em", color: colors.muted }}>
        WELCOME BACK
      </span>
      <h1
        className="mt-5 mb-6"
        style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.02em" }}
      >
        {firstName}.
        <br />
        Keep writing.
      </h1>
      <p style={{ fontFamily: fonts.display, fontSize: 19, lineHeight: 1.6, color: colors.muted, maxWidth: 480 }}>
        Your desk on YOURSPACE. New drafts, latest reads, and a quiet place to publish.
      </p>
      <div className="flex items-center gap-4 mt-10">
        <a
          href="/writeblog"
          className="flex items-center gap-3 px-7 py-3.5 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent, color: colors.ink }}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>START WRITING</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 14 }}>→</span>
        </a>
        <a href="/feedback" className="px-7 py-3.5 border" style={{ borderColor: colors.hairline, color: colors.ink }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>Give Feedback</span>
        </a>
      </div>
    </section>
  );
}

function CategoriesFilter({ categories }) {
  const topics = categories.map((category) => category.name);
  const [active, setActive] = React.useState("All");
  const all = ["All", ...topics];

  return (
    <section
      className="relative z-10 px-5 sm:px-8 md:px-14 flex overflow-x-auto gap-2 pb-10 items-center"
      style={{ scrollbarWidth: "none" }}
    >
      <span
        className="uppercase shrink-0 mr-1"
        style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}
      >
        FILTER:
      </span>
      {all.map((topic) => (
        <button
          key={topic}
          type="button"
          onClick={() => setActive(topic)}
          className="px-4 py-1.5 shrink-0 transition-colors"
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: "0.06em",
            border: `1px solid ${active === topic ? colors.ink : colors.hairline}`,
            backgroundColor: active === topic ? colors.ink : "transparent",
            color: active === topic ? colors.bg : colors.muted,
          }}
        >
          {topic.toUpperCase()}
        </button>
      ))}
    </section>
  );
}

function FeaturedPost() {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 mb-16">
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden"
        style={{ border: `1px solid ${colors.hairline}` }}
      >
        <div className="lg:col-span-7 h-[320px] lg:h-[460px]" style={{ backgroundColor: colors.faint }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7j2qiepaKDqRRZIuDgLwFgJX5ZCI-ITo0lkp1zyQFjwpIKVnfvROTxEH2WaAsQYg_3qhYOUf7U18tHQGJzdV8rQOJHiyfDivYr0tGc9CFORqnANb6Kj3Z5vpKRtgNyPdRH46k5ytO7yXK8JTqPOHlcTCjh9s-WzdDI4t4O1sqzhgnE2XV24AY1kTr2Ah7LeSe79EEnrtpncekPdY9dWYthBzF1LId65-U-unxdDWUQeNe_KxUMJi4"
            alt="Digital installation art"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.1em", color: colors.ink, backgroundColor: colors.accent, padding: "3px 8px" }}>
              TECHNOLOGY
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.06em", color: colors.muted }}>
              5 MIN READ
            </span>
          </div>
          <h2
            className="mb-4 leading-snug"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 28, color: colors.ink }}
          >
            The Future of Generative Interfaces in Editorial Design
          </h2>
          <p className="mb-6" style={{ fontFamily: fonts.display, fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
            Exploring how AI-driven layouts are reshaping the way we consume long-form content on the web, blending
            classic typography with dynamic grids.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: colors.faint, border: `1px solid ${colors.hairline}` }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4lk6ijnFk_WHrqQqiS7_7yuFDjUB-xTx9PS2nvpGMhDRIsEOSspKJXnjFBW2es2quQ-Ecbwbl02Q8Ba8rWesikeUktusUR6pb-0fyM1BCIQO-SjZwoEcSY4XVmHk7Jh9RizkbKtnzYlRRdz8FvcfV0j1iUa_b829PVyAD-yfnu2HJAHleIVEanxJn7oG07A5DXw_wJXpBAbZZAIhgvcRhwDHxB3C0T_LpQvBfiiZzIFq7xo7qWAag"
                alt="Sarah Jenkins"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: "0.04em", color: colors.ink }}>
                Sarah Jenkins
              </p>
              <p style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.04em", color: colors.muted }}>
                Oct 24, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ image, category, title, excerpt, author, readTime }) {
  return (
    <article
      className="flex flex-col h-full group"
      style={{ border: `1px solid ${colors.hairline}` }}
    >
      <div
        className="h-44 overflow-hidden"
        style={!image ? { backgroundColor: colors.faint, display: "flex", alignItems: "center", justifyContent: "center" } : undefined}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <span className="material-symbols-outlined" style={{ fontSize: 32, color: colors.muted }}>
            auto_awesome
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span
          className="uppercase mb-2 block"
          style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.1em", color: colors.muted }}
        >
          {category}
        </span>
        <h4
          className="mb-3 leading-tight"
          style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 20, color: colors.ink }}
        >
          {title}
        </h4>
        <p
          className="mb-4 flex-grow line-clamp-3"
          style={{ fontFamily: fonts.display, fontSize: 14, lineHeight: 1.6, color: colors.muted }}
        >
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: `1px solid ${colors.hairline}` }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.04em", color: colors.muted }}>
            By {author}
          </span>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.04em", color: colors.muted }}>
            {readTime}
          </span>
        </div>
      </div>
    </article>
  );
}

function LatestWritings({ blogs }) {
  const posts = blogs.filter((blog) => blog.status?.toLowerCase() === "published").slice(0, 3);

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-20">
      <div className="flex justify-between items-end mb-6 pb-3" style={{ borderBottom: `1px solid ${colors.hairline}` }}>
        <h3 style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: colors.ink }}>
          Latest Writings
        </h3>
        <a
            href="/myblog"
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.08em", color: colors.ink }}
        >
          VIEW ALL <span style={{ fontFamily: fonts.mono, fontSize: 12 }}>→</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.title} {...post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p style={{ fontFamily: fonts.display, fontSize: 16, color: colors.muted }}>
          Published writing will appear here.
        </p>
      )}
    </section>
  );
}

function ContributeSection() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // TODO: connect this to your backend API
    console.log("Contributor email:", email);

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative z-1 px-5 sm:px-8 md:px-14 pb-20">
      <div
        className="relative overflow-hidden p-8 sm:p-10 md:p-14"
        style={{
          backgroundColor: colors.ink,
          color: colors.bg,
        }}
      >
        {/* Decorative word */}
        <span
          className="absolute right-[-20px] bottom-[-45px] pointer-events-none select-none"
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(100px, 18vw, 220px)",
            fontWeight: 600,
            lineHeight: 0.8,
            opacity: 0.06,
          }}
        >
          JOIN
        </span>

        <div className="relative z-10 max-w-2xl">
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.14em",
              color: colors.accent,
            }}
          >
            OPEN INVITATION
          </span>

          <h3
            className="mt-4 mb-5"
            style={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Build YOURSPACE
            <br />
            with us.
          </h3>

          <p
            className="mb-8 max-w-xl"
            style={{
              fontFamily: fonts.display,
              fontSize: 17,
              lineHeight: 1.6,
              color: "#b5b5b5",
            }}
          >
            YOURSPACE is being built as a place for developers and curious
            minds to write, learn, and share ideas. Want to contribute to the
            project or help shape what comes next?
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 px-5 py-3.5 outline-none"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  backgroundColor: colors.bg,
                  color: colors.ink,
                  border: `1px solid ${colors.bg}`,
                }}
              />

              <button
                type="submit"
                className="px-7 py-3.5 hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.ink,
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                JOIN THE PROJECT
                <span>→</span>
              </button>
            </form>
          ) : (
            <div
              className="inline-flex items-center gap-3 px-5 py-4"
              style={{
                backgroundColor: colors.accent,
                color: colors.ink,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                check
              </span>

              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                YOU'RE ON THE LIST.
              </span>
            </div>
          )}

          <p
            className="mt-4"
            style={{
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: "0.05em",
              color: "#777",
            }}
          >
            We&apos;ll reach out when there&apos;s something worth building.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      return {
        name: storedUser?.fullName || "",
        username: storedUser?.username || "",
        avatar: storedUser?.profilePicture || null,
      };
    } catch {
      return { name: "", username: "", avatar: null };
    }
  });
  const [blogs, setBlogs] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profileResponse, blogsResponse, categoriesResponse] = await Promise.all([
          getProfile(),
          getMyBlogs({ limit: 50 }),
          getCategories(),
        ]);
        const profile = profileResponse.data?.user;
        if (profile) {
          setUser({
            name: profile.fullName || "",
            username: profile.username || "",
            avatar: profile.profilePicture || null,
          });
          localStorage.setItem("user", JSON.stringify(profile));
        }
        setBlogs(Array.isArray(blogsResponse.data?.blogs) ? blogsResponse.data.blogs.map(normalizeBlog) : []);
        setCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }
        setError(requestError.response?.data?.message || "Unable to load dashboard data.");
      }
    };

    loadDashboard();
  }, [navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden antialiased pb-16 md:pb-0" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <Wordmark />
      <div className="relative z-10">
        <Navbar
  active="/dashboard"
  authed={true}
  showHome
  showExplore={false}
  showCategories={false}
  showWrite
  showMyBlogs
  showProfile={false}
/>

        <Hero user={user} />

        {error && (
          <p className="px-5 sm:px-8 md:px-14 pb-8" role="alert" style={{ fontFamily: fonts.mono, fontSize: 11, color: "#c23b3b" }}>
            {error}
          </p>
        )}

        <WritingStats blogs={blogs} />

        <ContinueWriting blogs={blogs} />

        <CategoriesFilter categories={categories} />

        <MyRecentBlogs blogs={blogs} />

        <FeaturedPost />

        <LatestWritings blogs={blogs} />

        <ContributeSection />

        <Footer />
      </div>
    
    </div>
  );
}
