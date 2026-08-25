import React from "react";
import { Link, NavLink } from "react-router-dom";

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
const navItems = [{ name: "HOME", path: "/" }, { name: "EXPLORE", path: "/explore" }, { name: "CATEGORIES", path: "/categories" },];
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

function Nav() {
  return (
    <header
      className="relative z-10 flex flex-wrap items-center justify-between gap-y-3 px-5 sm:px-8 md:px-14 py-5 md:py-6"
      style={{ borderBottom: `1px solid ${colors.hairline}` }}
    >
      <Link to="/">
        <span style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: "0.14em", fontWeight: 700, color: colors.ink }}>
          YOURSPACE
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 order-3 md:order-2 w-full md:w-auto justify-center md:justify-start"> {navItems.map((item) => (<NavLink key={item.name} to={item.path} style={({ isActive }) => ({ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: isActive ? colors.ink : colors.muted, borderBottom: isActive ? `1px solid ${colors.ink}` : "none", paddingBottom: 2, })} > {item.name} </NavLink>))} </nav>
      <div className="flex items-center gap-3 sm:gap-6 order-2 md:order-3">
        <a href="/login" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
          LOGIN
        </a>
        <a
          href="/signup"
          className="px-4 sm:px-5 py-2"
          style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", fontWeight: 700, backgroundColor: colors.accent, color: colors.ink }}
        >
          SIGNUP
        </a>
      </div>
    </header>
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

function FeaturedPost() {
  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 h-[240px] sm:h-[340px] lg:h-[440px] overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7j2qiepaKDqRRZIuDgLwFgJX5ZCI-ITo0lkp1zyQFjwpIKVnfvROTxEH2WaAsQYg_3qhYOUf7U18tHQGJzdV8rQOJHiyfDivYr0tGc9CFORqnANb6Kj3Z5vpKRtgNyPdRH46k5ytO7yXK8JTqPOHlcTCjh9s-WzdDI4t4O1sqzhgnE2XV24AY1kTr2Ah7LeSe79EEnrtpncekPdY9dWYthBzF1LId65-U-unxdDWUQeNe_KxUMJi4"
            alt="Featured post"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="lg:col-span-5">
          <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.12em", color: colors.muted }}>
            TECHNOLOGY — 5 MIN READ
          </span>
          <h2
            className="mt-4 mb-5"
            style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, lineHeight: 1.12, color: colors.ink }}
          >
            The Future of Generative Interfaces in Editorial Design
          </h2>
          <p style={{ fontFamily: fonts.display, fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
            Exploring how AI-driven layouts are reshaping the way we consume long-form content on the web.
          </p>
          <div className="flex items-center gap-3 mt-7">
            <div className="w-9 h-9 overflow-hidden rounded-full" style={{ backgroundColor: colors.faint }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4lk6ijnFk_WHrqQqiS7_7yuFDjUB-xTx9PS2nvpGMhDRIsEOSspKJXnjFBW2es2quQ-Ecbwbl02Q8Ba8rWesikeUktusUR6pb-0fyM1BCIQO-SjZwoEcSY4XVmHk7Jh9RizkbKtnzYlRRdz8FvcfV0j1iUa_b829PVyAD-yfnu2HJAHleIVEanxJn7oG07A5DXw_wJXpBAbZZAIhgvcRhwDHxB3C0T_LpQvBfiiZzIFq7xo7qWAag"
                alt="Sarah Jenkins"
                className="w-full h-full object-cover"
              />
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.06em", color: colors.ink }}>
              SARAH JENKINS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostCard({ image, category, title, excerpt, author, readTime, index }) {
  return (
    <article className="group">
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

function LatestWritings() {
  const posts = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBit4PQzXK5SjF-Bn6md18fEidpL7hJye3pUybuQCFsiCWYd3o8lEy1zsmIOCDS6_4L66YjCN9IkrK6HCRFKFIuAhxy_-2xXdJiIVF936VxFTRmslkxpKyBDaUCo1SNHAnbCyEWmSihT-TSTDgyEvBQHCR9eJKjNPm-zqPPxSAYLop2DlXSUH23z3kXBtXasRiaKn3lLaptP-OIEgMNw9egibVbO9yfqfQ5bbTTjYvY8RMqNvvLc1Di",
      category: "Productivity",
      title: "Finding Focus in a World of Noise",
      excerpt: "Practical strategies for deep work and eliminating digital distractions.",
      author: "David Chen",
      readTime: "3 MIN",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9bixrZ-il6igmMG5YTVnkKPVLoy4fLxWcnrR90fkpQpof6yk-IywEUItOWIEzW4blL8ctGLGHHzIBv_pZkg64XBcOP_8Uj7y59C5Eqg1Lnqk9KzH6x_R6wQAKr2wejyEomMDF44Sa3Dojur2bsCa2PEqoOvHqnltlqkvDxIVsc0aGgTX9efS7_W4xbyj3ofAG3YOG6dGapsgD3t6FmGAWSPu4_5-ytfBYNFKs71JulMIlDDHBhfo",
      category: "Web Development",
      title: "The Elegance of Vanilla CSS",
      excerpt: "Why returning to the basics of cascading style sheets leads to cleaner code.",
      author: "Elena Rostova",
      readTime: "7 MIN",
    },
    {
      image: null,
      category: "AI & ML",
      title: "Demystifying Large Language Models",
      excerpt: "A plain-English explanation of how modern AI text generation works under the hood.",
      author: "Marcus Thorne",
      readTime: "12 MIN",
    },
  ];

  return (
    <section className="relative z-10 px-5 sm:px-8 md:px-14 py-12 sm:py-16" style={{ borderTop: `1px solid ${colors.hairline}` }}>
      <div className="flex flex-wrap items-end justify-between gap-y-3 mb-10 sm:mb-12">
        <h3 style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 30, color: colors.ink }}>
          Latest Writings
        </h3>
        <a href="#" className="hover:underline" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.1em", color: colors.muted }}>
          VIEW ALL →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((p, i) => (
          <PostCard key={p.title} {...p} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

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
  return (
    <div className="min-h-screen relative overflow-hidden antialiased" style={{ backgroundColor: colors.bg, color: colors.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Wordmark />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <CategoryStrip />
        <FeaturedPost />
        <LatestWritings />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
