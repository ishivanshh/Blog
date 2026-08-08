import { useState } from "react";
import { ArrowRight, ArrowLeft, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = ["Politics", "Fashion", "Technology", "Design", "International"];

const CARD_BLOGS = [
  {
    tag: "SOCIAL ENGAGEMENT",
    title: "ASICS went 1:1 with their Instagram audience on their collaboration with Brain Dead",
    bg: "bg-orange-600",
    text: "text-white",
    badgeBorder: "border-white/40",
    image: "https://picsum.photos/seed/asics1/600/500",
  },
  {
    tag: "GIVE AWAY",
    title: "How a streetwear label ran a giveaway that broke their engagement record",
    bg: "bg-violet-300",
    text: "text-neutral-900",
    badgeBorder: "border-neutral-900/30",
    image: "https://picsum.photos/seed/asics2/600/500",
  },
  {
    tag: "PRODUCT LAUNCH",
    title: "Inside the product drop that sold out in under four minutes",
    bg: "bg-lime-200",
    text: "text-neutral-900",
    badgeBorder: "border-neutral-900/30",
    image: "https://picsum.photos/seed/asics3/600/500",
  },
];

const SLIDER_BLOGS = [
  {
    category: "Technology",
    author: "Shivansh Saxena",
    title: "Why edge computing is quietly reshaping how we build products",
    image: "https://picsum.photos/seed/slide1/800/600",
  },
  {
    category: "AI",
    author: "Meera Kapoor",
    title: "The small AI habits that make big teams faster",
    image: "https://picsum.photos/seed/slide2/800/600",
  },
  {
    category: "Design",
    author: "Aarav Mehta",
    title: "Designing for attention, not just aesthetics",
    image: "https://picsum.photos/seed/slide3/800/600",
  },
  {
    category: "Web Dev",
    author: "Ishita Rao",
    title: "What shipping fast actually costs you later",
    image: "https://picsum.photos/seed/slide4/800/600",
  },
  {
    category: "Programming",
    author: "Devansh Gupta",
    title: "Reading other people's code is a skill, not a chore",
    image: "https://picsum.photos/seed/slide5/800/600",
  },
];

/* ---------------- Navbar (public — Login only) ---------------- */

function NavbarLoggedOut() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav className="flex items-center gap-1 bg-neutral-900 rounded-full p-1.5 shadow-xl">
      <Link
        to="/"
        className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-sm text-neutral-900 flex-shrink-0"
      >
        Y
      </Link>

      <div className="flex items-center gap-0.5 px-1.5">
        <Link
          to="/"
          className="text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full px-4 py-2.5 whitespace-nowrap transition-colors"
        >
          Home
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setCategoriesOpen(true)}
          onMouseLeave={() => setCategoriesOpen(false)}
        >
          <button
            type="button"
            className={`flex items-center gap-1 text-sm font-medium rounded-full px-4 py-2.5 whitespace-nowrap transition-colors ${
              categoriesOpen
                ? "text-white bg-neutral-800"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            Categories
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                categoriesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 min-w-[190px] bg-neutral-900 rounded-2xl p-2 shadow-2xl z-20 transition-all duration-150 ${
              categoriesOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-1 pointer-events-none"
            }`}
          >
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href="#"
                className="block text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg px-3.5 py-2.5 transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-px h-5.5 bg-white/10 mx-1" />

      {/* Only action available when logged out */}
      <div className="pr-0.5">
        <Link
          to="/login"
          className="bg-white text-neutral-900 text-sm font-semibold rounded-full px-6 py-2.5 hover:bg-neutral-200 transition-colors whitespace-nowrap"
        >
          Log in
        </Link>
      </div>
    </nav>
  );
}

/* ---------------- Page ---------------- */

export default function HomePublic() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sliderIndex, setSliderIndex] = useState(0);

  const requireLogin = () => navigate("/login", { state: { from: "/" } });

  const blog = SLIDER_BLOGS[sliderIndex];
  const nextSlide = () => setSliderIndex((i) => (i + 1) % SLIDER_BLOGS.length);
  const prevSlide = () =>
    setSliderIndex((i) => (i - 1 + SLIDER_BLOGS.length) % SLIDER_BLOGS.length);

  return (
    <div className="bg-white font-sans">
      {/* Navbar */}
      <div className="sticky top-4 z-30 flex justify-center px-4">
        <NavbarLoggedOut />
      </div>

      {/* Hero */}
      <section className="min-h-screen bg-black flex flex-col items-center justify-center px-4 -mt-24">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-10">
          hey,
        </h1>
        <button
          type="button"
          onClick={requireLogin}
          className="bg-white text-neutral-900 font-semibold text-sm rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors"
        >
          Write
        </button>
        <p className="text-neutral-500 text-xs mt-5">
          Log in to start writing
        </p>
      </section>

      {/* Blog cards */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
          Latest stories
        </h2>

        <button
          type="button"
          onClick={requireLogin}
          className="flex items-center gap-2 bg-neutral-100 rounded-full px-5 py-4 w-full mb-10 text-left"
        >
          <Search size={16} className="text-neutral-500 flex-shrink-0" />
          <span className="text-sm text-neutral-500">
            Log in to search for a blog
          </span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARD_BLOGS.map((post) => (
            <div
              key={post.title}
              className={`rounded-3xl overflow-hidden flex flex-col ${post.bg}`}
            >
              <div className="p-6 pb-8">
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-[11px] font-semibold tracking-wide border ${post.badgeBorder} rounded-full px-3 py-1.5 ${post.text}`}
                  >
                    {post.tag}
                  </span>
                </div>
                <h3 className={`text-xl font-bold leading-snug ${post.text}`}>
                  {post.title}
                </h3>
              </div>

              <div className="relative flex-1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <span className="text-xs font-semibold tracking-wide text-white/90">
                    VIEW MORE
                  </span>
                  <button
                    type="button"
                    onClick={requireLogin}
                    aria-label="Log in to view more"
                    className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                  >
                    <ArrowRight size={18} className="text-neutral-900" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slider */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-neutral-900 mb-10">
          Featured on Yourspace
        </h2>

        <div className="w-full rounded-3xl overflow-hidden bg-neutral-900">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-72 md:h-[420px] object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block w-fit text-[11px] font-semibold tracking-wide text-neutral-400 border border-white/20 rounded-full px-3 py-1.5 mb-6">
                {blog.category.toUpperCase()}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug mb-5">
                {blog.title}
              </h3>
              <p className="text-neutral-400 text-sm mb-8">By {blog.author}</p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous"
                  className="w-11 h-11 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft size={18} className="text-white" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next"
                  className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
                >
                  <ArrowRight size={18} className="text-neutral-900" />
                </button>

                <div className="flex items-center gap-1.5 ml-3">
                  {SLIDER_BLOGS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === sliderIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-black">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Get the latest updates
          </h2>
          <p className="text-neutral-400 text-sm mb-10">
            Create a free account to get new stories in your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              requireLogin();
            }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-neutral-900 text-white placeholder-neutral-500 text-sm rounded-full px-6 py-4 outline-none border border-white/10 focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 bg-white text-neutral-900 font-semibold text-sm rounded-full px-8 py-4 hover:bg-neutral-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}