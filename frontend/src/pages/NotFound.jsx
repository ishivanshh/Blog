import React from "react";
import { Compass, ArrowRight, Search } from "lucide-react";

const suggestions = [
  { category: "ARCHITECTURE", title: "The Poetics of Concrete" },
  { category: "TECHNOLOGY", title: "The Aesthetic of Artificial Intelligence" },
  { category: "PHILOSOPHY", title: "Beyond the Digital Veil" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] text-neutral-900 font-serif flex flex-col">
      {/* Header */}
      <header className="bg-[#F7F5F1]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <span className="text-xl font-bold tracking-tight font-serif">
            YOURSPACE
          </span>
          <nav className="flex items-center gap-6 font-sans text-sm">
            <a href="#" className="text-neutral-700 hover:text-neutral-900">
              Explore
            </a>
            <a href="#" className="text-neutral-700 hover:text-neutral-900">
              Write
            </a>
          </nav>
          <button className="font-sans text-sm bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-full px-5 py-2">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center py-16">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
              <Compass
                className="w-9 h-9 text-indigo-700"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="font-sans text-xs font-semibold tracking-widest text-neutral-400 mb-4">
            ERROR 404
          </div>

          <h1 className="text-5xl leading-tight font-medium mb-5">
            This page has wandered off the map.
          </h1>

          <p className="font-sans text-neutral-500 leading-relaxed mb-10 max-w-sm mx-auto">
            The story or page you're looking for may have been moved,
            renamed, or never existed in the first place. Let's get you back
            to solid ground.
          </p>

          <div className="flex items-center justify-center gap-2 bg-white rounded-full px-5 py-3 border border-neutral-200 mb-6 max-w-md mx-auto">
            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search stories..."
              className="bg-transparent outline-none text-sm font-sans placeholder:text-neutral-400 w-full"
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="font-sans text-sm font-medium bg-indigo-700 hover:bg-indigo-800 transition-colors text-white rounded-full px-6 py-3"
            >
              Back to Homepage
            </a>
            <a
              href="#"
              className="font-sans text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors px-4 py-3"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      {/* Suggested reading */}
      <section className="max-w-3xl mx-auto w-full px-6 pb-16">
        <div className="border-t border-neutral-200 pt-8">
          <h2 className="font-sans text-xs font-semibold tracking-widest text-neutral-400 mb-5 text-center">
            OR, EXPLORE SOMETHING NEW
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map((item) => (
              <a
                key={item.title}
                href="#"
                className="group bg-white rounded-xl border border-neutral-200 px-5 py-5 hover:border-indigo-300 transition-colors"
              >
                <div className="font-sans text-[11px] font-semibold tracking-wide text-amber-600 mb-2">
                  {item.category}
                </div>
                <div className="font-serif text-base leading-snug mb-3">
                  {item.title}
                </div>
                <div className="flex items-center gap-1.5 font-sans text-xs text-indigo-700 font-medium">
                  Read story
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-lg font-bold tracking-tight">
              YOURSPACE
            </span>
            <p className="font-sans text-xs text-neutral-400 mt-1">
              © 2024 YOURSPACE. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-6 font-sans text-sm text-neutral-600">
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
        </div>
      </footer>
    </div>
  );
}