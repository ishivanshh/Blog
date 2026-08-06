import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import {Link} from "react-router-dom";

const CATEGORIES = ["Politics", "Fashion", "Technology", "Design", "Sports"];

export default function Navbar() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const closeTimer = useRef(null);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setCategoriesOpen(true);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setCategoriesOpen(false), 120);
  };

  return (
    <div className="w-full flex items-center justify-center bg-black py-6 px-4 font-sans">
      <nav className="flex items-center gap-1 bg-neutral-900 rounded-full p-1.5 shadow-xl">
        {/* Logo */}
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-sm text-neutral-900 flex-shrink-0">
          Y
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-0.5 px-1.5">
          <Link
            href="/Home"
            className="text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full px-4 py-2.5 whitespace-nowrap transition-colors"
          >
            Home
          </Link>

          {/* Categories with dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={categoriesOpen}
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

          <a
            href="#"
            className="text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full px-4 py-2.5 whitespace-nowrap transition-colors"
          >
            Search
          </a>
        </div>

        {/* Divider */}
        <div className="w-px h-5.5 bg-white/10 mx-1" />

        {/* Right group */}
        <div className="flex items-center gap-0.5 pr-0.5">
          <Link
            href="/Blog"
            className="text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full px-4 py-2.5 whitespace-nowrap transition-colors"
          >
            Write
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 bg-white text-neutral-900 rounded-full pl-3.5 pr-2 py-1.5 text-sm font-semibold"
          >
            <span className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex-shrink-0" />
            Profile
            <ChevronDown size={14} />
          </button>
        </div>
      </nav>
    </div>
  );
}