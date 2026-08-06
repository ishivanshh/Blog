import React from "react";



const LINK_COLUMNS = [
  {
    title: "Quick Links",
    links: ["Home", "Write", "Search", "Dashboard"],
  },
  {
    title: "Categories",
    links: ["Technology", "AI", "Programming", "Web Dev"],
  },
  {
    title: "Resources",
    links: ["About", "Privacy", "Contact", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 px-6 py-14 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Brand */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-sm text-neutral-900 flex-shrink-0">
              N
            </div>
            <span className="text-white font-semibold text-lg">
              Yourspace
            </span>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Write what your heart says!
          </p>
        </div>

        {/* Link columns — horizontal */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">
            © 2026 Yourspace.
          </p>
          <p className="text-xs text-neutral-500">
            Developed by Shivansh Saxena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}