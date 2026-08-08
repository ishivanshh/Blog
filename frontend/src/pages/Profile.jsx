import { useState, useRef } from "react";
import { ArrowRight, Pencil, Camera, Check } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  { label: "Blogs", value: "24" },
  { label: "Views", value: "1.2K" },
  { label: "Likes", value: "350" },
];

const USERNAME = "@shivansh";

const MY_BLOGS = [
  {
    title: "Why edge computing is quietly reshaping how we build products",
    category: "Technology",
    image: "https://picsum.photos/seed/myblog1/500/400",
  },
  {
    title: "The small AI habits that make big teams faster",
    category: "AI",
    image: "https://picsum.photos/seed/myblog2/500/400",
  },
  {
    title: "Reading other people's code is a skill, not a chore",
    category: "Programming",
    image: "https://picsum.photos/seed/myblog3/500/400",
  },
];

const DRAFTS = [
  {
    title: "Notes on building a design system from scratch",
    updated: "Edited 2 days ago",
  },
  {
    title: "What I learned shipping my first side project",
    updated: "Edited 5 days ago",
  },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("Shivansh Saxena");
  const [tagline, setTagline] = useState("Full Stack Developer & Tech Blogger");
  const [about, setAbout] = useState(
    "Full-stack developer interested in AI/ML, web development and system design."
  );
  const fileInputRef = useRef(null);

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* -------- Left: profile card -------- */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative bg-neutral-50 rounded-3xl p-8 text-center">
              {/* Edit toggle — corner icon */}
              <button
                type="button"
                onClick={() => setIsEditing((v) => !v)}
                aria-label={isEditing ? "Save changes" : "Edit profile"}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isEditing
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-white text-neutral-600 hover:bg-neutral-200 shadow-sm"
                }`}
              >
                {isEditing ? <Check size={15} /> : <Pencil size={14} />}
              </button>

              {/* Profile picture */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
                )}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change profile picture"
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <Camera size={18} className="text-white" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="hidden"
                />
              </div>

              {/* Name */}
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl font-bold text-neutral-900 text-center outline-none border-b border-neutral-300 focus:border-neutral-500 bg-transparent mb-1 px-2 py-1 w-full transition-colors"
                />
              ) : (
                <h1 className="text-xl font-bold text-neutral-900">{name}</h1>
              )}

              {/* Username — not editable */}
              <p className="text-sm text-neutral-500 mb-3">{USERNAME}</p>

              {/* Tagline */}
              {isEditing ? (
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="text-sm text-neutral-700 text-center outline-none border-b border-neutral-300 focus:border-neutral-500 bg-transparent mb-8 px-2 py-1 w-full transition-colors"
                />
              ) : (
                <p className="text-neutral-700 text-sm mb-8">"{tagline}"</p>
              )}

              <div className="flex items-center justify-center gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-lg font-bold text-neutral-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About — lives in the sidebar card too */}
            <div className="bg-neutral-50 rounded-3xl p-8 mt-6">
              <h2 className="text-sm font-semibold text-neutral-900 mb-3">
                About
              </h2>
              {isEditing ? (
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="w-full text-sm text-neutral-600 leading-relaxed outline-none border border-neutral-300 focus:border-neutral-500 rounded-2xl px-4 py-3 resize-none bg-white transition-colors"
                />
              ) : (
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {about}
                </p>
              )}
            </div>
          </aside>

          {/* -------- Right: blogs & drafts -------- */}
          <div>
            {/* My blogs */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">
                  My Blogs
                </h2>
                <Link
                  to="/MyBlog"
                  className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  View All
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {MY_BLOGS.map((post) => (
                  <div key={post.title} className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden mb-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide text-neutral-400">
                      {post.category.toUpperCase()}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-900 leading-snug mt-1">
                      {post.title}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-neutral-100 mb-12" />

            {/* Drafts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Drafts</h2>
                <Link
                  to="/drafts"
                  className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  View All
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DRAFTS.map((draft) => (
                  <div
                    key={draft.title}
                    className="bg-neutral-50 hover:bg-neutral-100 rounded-2xl px-6 py-6 cursor-pointer transition-colors"
                  >
                    <h3 className="text-sm font-semibold text-neutral-900 leading-snug mb-2">
                      {draft.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {draft.updated}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}