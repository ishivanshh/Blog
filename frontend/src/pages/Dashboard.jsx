import React from "react";
import { NavLink } from "react-router-dom";

import Footer from "../components/Footer.jsx"

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

function Nav({ user }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header
      className="relative z-10 flex flex-wrap items-center justify-between gap-y-3 px-5 sm:px-8 md:px-14 py-5 md:py-6"
      style={{ borderBottom: `1px solid ${colors.hairline}` }}
    >
      <span style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: "0.14em", fontWeight: 700, color: colors.ink }}>
        YOURSPACE
      </span>
      <nav className="hidden md:flex items-center gap-8 order-3 md:order-2 w-full md:w-auto justify-center md:justify-start">
        {[
          { label: "HOME", href: "/dashboard" },
          { label: "EXPLORE", href: "/explore" },
          { label: "MY BLOGS", href: "/myblog" },
        ].map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            style={({ isActive }) => ({
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: "0.1em",
              color: isActive ? colors.ink : colors.muted,
              borderBottom: isActive
                ? `1px solid ${colors.ink}`
                : "none",
              paddingBottom: 2,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="relative order-2 md:order-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3"
          aria-label="Open profile menu"
        >
          <div className="w-9 h-9 overflow-hidden rounded-full shrink-0" style={{ backgroundColor: colors.faint, border: `1px solid ${colors.hairline}` }}>
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="flex items-center justify-center h-full material-symbols-outlined" style={{ fontSize: 18, color: colors.muted }}>
                person
              </span>
            )}
          </div>
          <span className="hidden sm:block text-left">
            <span className="block" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.08em", color: colors.ink }}>
              {user.name.toUpperCase()}
            </span>
            <span className="block" style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.08em", color: colors.muted }}>
              @{user.username}
            </span>
          </span>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-3 min-w-[180px] py-2"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.hairline}` }}
          >
            <a href="/profile" className="block px-4 py-2" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.ink }}>
              PROFILE
            </a>
            <a href="#" className="block px-4 py-2" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.ink }}>
              EXPLORE
            </a>
            <a href="/writeblog" className="block px-4 py-2" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.ink }}>
              WRITE
            </a>
            <a href="/myblog" className="block px-4 py-2" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.ink }}>
              MY BLOGS
            </a>
            <a href="/" className="block px-4 py-2" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
              LOG OUT
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
function WritingStats() {
  const stats = [
    {
      label: "PUBLISHED",
      value: "12",
      icon: "article",
    },
    {
      label: "DRAFTS",
      value: "03",
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

function ContinueWriting() {
  const drafts = [
    {
      title: "Understanding System Design",
      category: "SYSTEM DESIGN",
      progress: 72,
      updated: "Updated 2 hours ago",
    },
    {
      title: "How Authentication Works",
      category: "WEB DEVELOPMENT",
      progress: 45,
      updated: "Updated yesterday",
    },
  ];

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

function MyRecentBlogs() {
  const blogs = [
    {
      category: "SYSTEM DESIGN",
      title: "Understanding Uber Functionality",
      excerpt:
        "Breaking down the architecture, services, and request flow behind a large-scale ride sharing platform.",
      date: "AUG 20, 2026",
      status: "PUBLISHED",
    },
    {
      category: "WEB DEVELOPMENT",
      title: "Building Authentication with Axios",
      excerpt:
        "Understanding how frontend and backend authentication work together using Axios and protected routes.",
      date: "AUG 12, 2026",
      status: "PUBLISHED",
    },
    {
      category: "REACT",
      title: "Understanding React Router",
      excerpt:
        "A practical look at layouts, nested routes, protected pages, and route-based application architecture.",
      date: "AUG 07, 2026",
      status: "DRAFT",
    },
  ];

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
        {blogs.map((blog, index) => (
          <a
            href="/myblog"
            key={blog.title}
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
                    blog.status === "DRAFT"
                      ? colors.ink
                      : colors.muted,
                  backgroundColor:
                    blog.status === "DRAFT"
                      ? colors.accent
                      : "transparent",
                  padding: blog.status === "DRAFT" ? "3px 7px" : 0,
                }}
              >
                {blog.status}
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
    </section>
  );
}
function BottomNavBar() {
  const items = [
    { icon: "home", label: "Home", active: true, href: "/dashboard" },
    { icon: "explore", label: "Explore", active: false, href: "#" },
    { icon: "edit_square", label: "Write", active: false, href: "/writeblog" },
    { icon: "person", label: "Profile", active: false, href: "/profile" },
  ];
  return (
    <nav
      className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2.5 px-4 z-50 md:hidden"
      style={{ backgroundColor: colors.bg, borderTop: `1px solid ${colors.hairline}` }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
          style={{ color: item.active ? colors.ink : colors.muted }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 22, ...(item.active ? { fontVariationSettings: "'FILL' 1" } : {}) }}
          >
            {item.icon}
          </span>
          <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: "0.06em" }}>
            {item.label.toUpperCase()}
          </span>
        </a>
      ))}
    </nav>
  );
}

function Hero({ user }) {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-16 max-w-3xl">
      <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.14em", color: colors.muted }}>
        WELCOME BACK
      </span>
      <h1
        className="mt-5 mb-6"
        style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.02em" }}
      >
        {user.name.split(" ")[0]}.
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
        <a href="/profile" className="px-7 py-3.5 border" style={{ borderColor: colors.hairline, color: colors.ink }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>VIEW PROFILE</span>
        </a>
      </div>
    </section>
  );
}

function CategoriesFilter() {
  const topics = ["Technology", "AI & ML", "Web Development", "Design", "Productivity"];
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

function LatestWritings() {
  const posts = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBit4PQzXK5SjF-Bn6md18fEidpL7hJye3pUybuQCFsiCWYd3o8lEy1zsmIOCDS6_4L66YjCN9IkrK6HCRFKFIuAhxy_-2xXdJiIVF936VxFTRmslkxpKyBDaUCo1SNHAnbCyEWmSihT-TSTDgyEvBQHCR9eJKjNPm-zqPPxSAYLop2DlXSUH23z3kXBtXasRiaKn3lLaptP-OIEgMNw9egibVbO9yfqfQ5bbTTjYvY8RMqNvvLc1Di",
      category: "Productivity",
      title: "Finding Focus in a World of Noise",
      excerpt: "Practical strategies for deep work and eliminating digital distractions when you need to sit down and actually write.",
      author: "David Chen",
      readTime: "3 min read",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9bixrZ-il6igmMG5YTVnkKPVLoy4fLxWcnrR90fkpQpof6yk-IywEUItOWIEzW4blL8ctGLGHHzIBv_pZkg64XBcOP_8Uj7y59C5Eqg1Lnqk9KzH6x_R6wQAKr2wejyEomMDF44Sa3Dojur2bsCa2PEqoOvHqnltlqkvDxIVsc0aGgTX9efS7_W4xbyj3ofAG3YOG6dGapsgD3t6FmGAWSPu4_5-ytfBYNFKs71JulMIlDDHBhfo",
      category: "Web Development",
      title: "The Elegance of Vanilla CSS",
      excerpt: "Why returning to the basics of cascading style sheets can lead to cleaner, more maintainable codebases without the overhead of heavy frameworks.",
      author: "Elena Rostova",
      readTime: "7 min read",
    },
    {
      image: null,
      category: "AI & ML",
      title: "Demystifying Large Language Models",
      excerpt: "A plain-english explanation of how the underlying architecture of modern AI text generation actually works under the hood.",
      author: "Marcus Thorne",
      readTime: "12 min read",
    },
  ];

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 pb-20">
      <div className="flex justify-between items-end mb-6 pb-3" style={{ borderBottom: `1px solid ${colors.hairline}` }}>
        <h3 style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: colors.ink }}>
          Latest Writings
        </h3>
        <a
          href="#"
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
  const user = {
    name: "Shivansh Saxena",
    username: "shivansh",
    avatar: null, // or a URL
  };
  return (
    <div className="min-h-screen relative overflow-hidden antialiased pb-16 md:pb-0" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <Wordmark />
      <div className="relative z-10">
        <Hero user={user} />

        <WritingStats />

        <ContinueWriting />

        <CategoriesFilter />

        <MyRecentBlogs />

        <FeaturedPost />

        <LatestWritings />

        <ContributeSection />

        <Footer />
      </div>
      <BottomNavBar />
    </div>
  );
}