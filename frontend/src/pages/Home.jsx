import React, { useState } from "react";
import { Search, ArrowLeft, ArrowRight, Globe, Share2} from "lucide-react";
import BlogCard from "../components/BlogCard";
import { Link } from 'react-router-dom';

const featuredArticle = {
  category: "FEATURED STORY",
  date: "Oct 24",
  title: "The Quiet Revolution of Digital Stillness",
  excerpt:
    "How a new generation of architects is designing spaces specifically to shield the human mind from the persistent noise of the algorithmic age.",
  author: "Shivansh Saxena",
  image:
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",
  readTime: "8 Min Read",
  role: "Full Stack Developer",
};

const articles = [
  {
    category: "TECHNOLOGY",
    date: "Aug 26",
    title: "The Art of Working of Instagram Algorithm",
    excerpt:
      "Examining how machine learning is not just assisting creators, but fundamentally altering the aesthetic DNA of...",
    author: "Julian Thorne",
    image:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80",
  },
  {
    category: "FASHION",
    date: "Jun 22",
    title: "Urban Solitude and the Death of the Third Place",
    excerpt:
      "A deep dive into the sociological shift of city living and the disappearing physical hubs of communal interaction in major...",
    author: "Sarah Jenkins",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  },
  {
    category: "SUSTAINABILITY",
    date: "Oct 18",
    title: "Material Truths: The Future of Responsible Luxury",
    excerpt:
      "Why the world's most exclusive fashion houses are finally turning towards hyper-local, regenerative bio-fabrics.",
    author: "Marcus Wei",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
  },
];

export default function YourSpaceHomepage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-serif">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-10">
            <span className="text-xl font-bold tracking-tight font-serif">
              YOURSPACE
            </span>
            <nav className="flex items-center gap-6 font-sans text-sm">
              <Link
                to="/home"
                className="text-violet-500 border-b-2 border-violet-500 pb-1 font-medium"
              >
                Explore
              </Link>
              <Link
                to="/writeblog"
                className="text-neutral-700 hover:text-neutral-900 pb-1"
              >
                Write
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search stories..."
                className="bg-transparent outline-none text-sm font-sans placeholder:text-neutral-400 w-full"
              />
            </div>
            <button className="font-sans text-sm text-neutral-800 hover:text-neutral-900">
              Login
            </button>
            <button className="font-sans text-sm bg-violet-400 hover:bg-violet-500 transition-colors text-white rounded-full px-5 py-2">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="mt-10">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedArticle(featuredArticle)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedArticle(featuredArticle);
              }
            }}
            className="relative rounded-2xl overflow-hidden min-h-[380px] flex flex-col justify-between p-10 bg-neutral-900 bg-cover bg-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 45%, rgba(20,20,25,0.15) 100%), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80')",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs font-semibold tracking-wide bg-violet-200/80 text-violet-900 rounded-full px-4 py-1.5">
                FEATURED STORY
              </span>
              <span className="font-sans text-xs text-neutral-500">
                8 Min Read
              </span>
            </div>

            <div className="max-w-xl">
              <h1 className="text-5xl leading-[1.05] font-medium mb-5">
                The Quiet Revolution of Digital Stillness
              </h1>
              <p className="font-sans italic text-neutral-700 text-base leading-relaxed mb-6">
                How a new generation of architects is designing spaces
                specifically to shield the human mind from the persistent
                noise of the algorithmic age.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-900" />
                <div className="font-sans text-sm leading-tight">
                  <div className="font-semibold text-neutral-900">
                    By Shivansh Saxena
                  </div>
                  <div className="text-neutral-500 text-xs">
                    Full Stack Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Thoughts */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-medium">Latest Thoughts</h2>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedArticle(article)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedArticle(article);
                  }
                }}
                className="flex flex-col cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-4"
              >
                <div
                  className="w-full aspect-square rounded-xl bg-cover bg-center mb-4"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
                <div className="flex items-center justify-between font-sans text-xs mb-3">
                  <span className="font-semibold tracking-wide text-amber-600">
                    {article.category}
                  </span>
                  <span className="text-neutral-400">{article.date}</span>
                </div>
                <h3 className="text-xl font-medium leading-snug mb-3">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-neutral-500 leading-relaxed mb-5">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-900" />
                  <span className="font-sans text-sm text-neutral-700">
                    {article.author}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16 mb-20">
          <div className="bg-neutral-100 rounded-2xl px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-sm">
              <h3 className="text-3xl font-medium mb-3">
                Deep thoughts, delivered weekly.
              </h3>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                Join 50,000+ thinkers who receive our curated Saturday
                briefing on the intersection of design, technology, and
                philosophy.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="font-sans text-sm bg-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-violet-300 w-64"
                />
                <button className="font-sans text-sm font-medium bg-violet-400 hover:bg-violet-500 transition-colors text-white rounded-lg px-6 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="font-sans text-xs text-neutral-400 mt-2">
                No spam. Ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold tracking-tight">
              YOURSPACE
            </span>
            <p className="font-sans text-xs text-neutral-400 mt-1">
              © 2026 YOURSPACE Editorial. All rights reserved.
            </p>
            <p className="font-sans text-xs text-neutral-400 mt-1">
              Design By Shivansh
              </p>
          </div>

          <nav className="hidden sm:flex items-center gap-6 font-sans text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-900">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-900">
              Terms
            </a>
            <a href="#" className="hover:text-neutral-900">
              About
            </a>
            <a href="#" className="hover:text-neutral-900">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {selectedArticle && (
        <BlogCard
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
